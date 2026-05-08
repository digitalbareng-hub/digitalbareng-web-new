import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  image, 
  article 
}) => {
  const { pathname } = useLocation();
  const siteUrl = 'https://www.digitalbareng.com';
  
  // Normalize pathname: remove trailing slash except for root
  const normalizedPathname = pathname.length > 1 && pathname.endsWith('/') 
    ? pathname.slice(0, -1) 
    : pathname;
    
  const fullUrl = `${siteUrl}${normalizedPathname}`;
  
  const defaultTitle = 'Digital Bareng - Panduan Microstock AI & Tools Kreator';
  const defaultDescription = 'Digital Bareng adalah hub edukasi dan tools untuk kreator microstock. Pelajari cara menghasilkan uang dari stok foto, video, dan aset AI.';
  const defaultImage = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjskHwULPmRQcVE7FW7sCLElHzvCDtb9ziFMYFV_tAeVrm_QoRgpz8_tMb51xXxETXdilfW_-xJDj5OwIAWzWQRcr-4DT0dLJtEdwvMEudzGktBREUgxaJ66FZkM2RjslWTe_Be4vISWFkhHLOyk34MqyF0sNUKhAX8eJ3OM-UIZ25zhg/s1600/ChatGPT%20Image%20May%202,%202026,%2010_45_07%20AM.png';

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: fullUrl,
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={seo.url} />
      
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      {article && <meta property="og:type" content="article" />}
      {!article && <meta property="og:type" content="website" />}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <meta name="robots" content="index, follow" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": article ? "Article" : "WebSite",
          "url": seo.url,
          "name": seo.title,
          "description": seo.description,
          "image": seo.image,
          "author": {
            "@type": "Organization",
            "name": "Digital Bareng"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Digital Bareng",
            "logo": {
              "@type": "ImageObject",
              "url": defaultImage
            }
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
