import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
  type?: 'WebPage' | 'Article' | 'FAQPage' | 'SoftwareApplication' | 'CollectionPage';
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  schemaMarkup?: any;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  image, 
  article,
  type = 'WebPage',
  datePublished,
  dateModified,
  authorName = 'Digital Bareng',
  schemaMarkup
}) => {
  const { pathname } = useLocation();
  const siteUrl = 'https://www.digitalbareng.com';
  
  // Normalize pathname: remove trailing slash except for root
  const normalizedPathname = pathname.length > 1 && pathname.endsWith('/') 
    ? pathname.slice(0, -1) 
    : pathname;
    
  const fullUrl = `${siteUrl}${normalizedPathname}`;
  
  const defaultTitle = 'Digital Bareng - Panduan Microstock AI & Tools Kreator';
  const defaultDescription = 'Digital Bareng adalah hub edukasi dan tools untuk kreator microstock. Pelajari cara menghasilkan uang dari stok foto, video, dan aset AI dengan panduan lengkap dan tools otomatis.';
  const defaultImage = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjskHwULPmRQcVE7FW7sCLElHzvCDtb9ziFMYFV_tAeVrm_QoRgpz8_tMb51xXxETXdilfW_-xJDj5OwIAWzWQRcr-4DT0dLJtEdwvMEudzGktBREUgxaJ66FZkM2RjslWTe_Be4vISWFkhHLOyk34MqyF0sNUKhAX8eJ3OM-UIZ25zhg/s1600/ChatGPT%20Image%20May%202,%202026,%2010_45_07%20AM.png';

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: fullUrl,
  };

  const isArticle = article || type === 'Article';

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": seo.url
    },
    "url": seo.url,
    "name": seo.title,
    "headline": seo.title,
    "description": seo.description,
    "image": seo.image,
    "datePublished": datePublished || "2026-05-01T08:00:00+08:00",
    "dateModified": dateModified || datePublished || "2026-05-01T08:00:00+08:00",
    "author": {
      "@type": "Organization",
      "name": authorName,
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Digital Bareng",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": defaultImage
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": pathname.split('/').filter(Boolean).map((path, index, array) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
      "item": `${siteUrl}/${array.slice(0, index + 1).join('/')}`
    }))
  };
  
  if (breadcrumbSchema.itemListElement.length > 0) {
    breadcrumbSchema.itemListElement.unshift({
      "@type": "ListItem",
      "position": 0,
      "name": "Home",
      "item": siteUrl
    });
    // Adjust positions
    breadcrumbSchema.itemListElement.forEach((item, index) => {
      item.position = index + 1;
    });
  }

  const schemaArr = [baseSchema];
  if (breadcrumbSchema.itemListElement.length > 0) {
    schemaArr.push(breadcrumbSchema);
  }
  if (schemaMarkup) {
    schemaArr.push(schemaMarkup);
  }

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
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      <meta property="og:site_name" content="Digital Bareng" />
      <meta property="og:locale" content="id_ID" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaArr.length === 1 ? schemaArr[0] : schemaArr)}
      </script>
    </Helmet>
  );
};

export default SEO;
