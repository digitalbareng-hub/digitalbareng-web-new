import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon, FileVideo, Download, X, Copy, Check, Settings, LayoutDashboard, Layers, Tag, Trash2, ChevronDown, ChevronRight, Menu } from 'lucide-react';
import SEO from '../components/SEO';

// Utility functions
const cleanFilename = (filename: string) => {
  let name = filename.replace(/\.[^/.]+$/, "");
  name = name.replace(/^(IMG_|DSC_)?\d+[-_]?/i, ""); // Remove trailing numbers like IMG_1234
  name = name.replace(/[0-9]{4,}/g, ""); // Remove identifiers like 82929
  name = name.replace(/[-_]/g, " ");
  name = name.replace(/\s+/g, " ").trim();
  return name.toLowerCase();
};

const generateSmartKeywords = (cleanedName: string, maxLimit: number = 50) => {
  const words = cleanedName.split(" ").filter(w => w.length > 2);
  const genericKeywords = [
    "design", "graphic", "illustration", "vector", "art", "creative", 
    "modern", "flat", "background", "isolated", "concept", "element",
    "template", "business", "technology", "style", "digital"
  ];
  return [...new Set([...words, ...genericKeywords])].slice(0, maxLimit);
};

const generateSmartTitle = (cleanedName: string) => {
  if (!cleanedName) return "Creative Digital Stock Asset Image";
  const title = cleanedName.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return `${title} - Modern Concept Illustration Background`;
};

const generateSmartDescription = (cleanedName: string) => {
  if (!cleanedName) return "High quality digital asset for commercial use.";
  return `High quality ${cleanedName} illustration for commercial use, perfect for web design, presentation, and marketing materials.`;
};

type ExportPlatform = 'universal' | 'shutterstock' | 'adobestock' | 'vecteezy';

interface FileData {
  id: string;
  file: File;
  previewUrl: string;
  type: 'image' | 'video' | 'vector' | 'unknown';
  cleanedName: string;
  metadata: any;
  generatedTitle: string;
  generatedKeywords: string[];
  generatedDescription: string;
}

const extractVectorThumbnail = async (file: File): Promise<string | null> => {
  return new Promise((resolve) => {
    // Read up to 10MB to find XMP data
    const sizeToRead = Math.min(1024 * 1024 * 10, file.size);
    const slice = file.slice(0, sizeToRead);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const match = text.match(/<(?:xmpGImg|xapGImg):image>([\s\S]*?)<\/(?:xmpGImg|xapGImg):image>/i);
      if (match && match[1]) {
        resolve('data:image/jpeg;base64,' + match[1].replace(/\s/g, ''));
      } else {
        if (file.size > sizeToRead) {
          const endSlice = file.slice(file.size - sizeToRead, file.size);
          const endReader = new FileReader();
          endReader.onload = (e2) => {
            const text2 = e2.target?.result as string;
            const match2 = text2.match(/<(?:xmpGImg|xapGImg):image>([\s\S]*?)<\/(?:xmpGImg|xapGImg):image>/i);
            if (match2 && match2[1]) {
               resolve('data:image/jpeg;base64,' + match2[1].replace(/\s/g, ''));
            } else {
               resolve(null);
            }
          };
          endReader.onerror = () => resolve(null);
          endReader.readAsText(endSlice);
        } else {
          resolve(null);
        }
      }
    };
    reader.onerror = () => resolve(null);
    reader.readAsText(slice);
  });
};

export default function DBMetadata() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getKeywordLimit = (platform: ExportPlatform) => {
    switch (platform) {
      case 'shutterstock': return 50;
      case 'adobestock': return 49;
      case 'vecteezy': return 50;
      default: return 50;
    }
  };

  const processFile = async (file: File) => {
    const id = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    
    let type: 'image' | 'video' | 'vector' | 'unknown' = 'unknown';
    
    if (extension === 'svg' || file.type === 'image/svg+xml') {
      type = 'image';
    } else if (['ai', 'eps'].includes(extension) || file.type === 'application/postscript' || file.type === 'application/illustrator') {
      type = 'vector';
    } else if (file.type.startsWith('video/') || ['mp4', 'mov', 'webm'].includes(extension)) {
      type = 'video';
    } else if (file.type.startsWith('image/')) {
      type = 'image';
    }

    let previewUrl = URL.createObjectURL(file);
    
    if (type === 'vector') {
      const thumb = await extractVectorThumbnail(file);
      if (thumb) {
        previewUrl = thumb;
      }
    }

    const cleanedName = cleanFilename(file.name);
    
    let metadata = {};
    if (type === 'image' || type === 'vector') {
      try {
        const exifr = await import('exifr');
        metadata = await exifr.default.parse(file, { exiv: true, tiff: true, iptc: true, xmp: true }) || {};
      } catch (e) {
        console.warn("Failed to parse EXIF:", e);
      }
    } else if (type === 'video') {
      metadata = await new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          URL.revokeObjectURL(video.src);
          resolve({
            duration: video.duration,
            width: video.videoWidth,
            height: video.videoHeight,
          });
        };
        video.src = previewUrl;
      });
    }

    const rawKeywords = metadata?.subject || metadata?.Keywords || generateSmartKeywords(cleanedName, 50);
    const keywordsArray = Array.isArray(rawKeywords) ? rawKeywords : typeof rawKeywords === 'string' ? rawKeywords.split(',').map(s => s.trim()) : [];

    const newFile: FileData = {
      id,
      file,
      previewUrl,
      type,
      cleanedName,
      metadata,
      generatedTitle: metadata?.title || metadata?.ObjectName || generateSmartTitle(cleanedName),
      generatedKeywords: keywordsArray,
      generatedDescription: metadata?.description || metadata?.Caption || generateSmartDescription(cleanedName),
    };

    setFiles(prev => [...prev, newFile]);
    return id;
  };

  const handleFiles = async (newFiles: FileList | File[]) => {
    setIsProcessing(true);
    const processPromises = Array.from(newFiles).map(processFile);
    const newIds = await Promise.all(processPromises);
    if (!selectedFileId && newIds.length > 0) {
      setSelectedFileId(newIds[0]);
    }
    setIsProcessing(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFiles(prev => {
      const newFiles = prev.filter(f => f.id !== id);
      if (selectedFileId === id) {
        setSelectedFileId(newFiles.length > 0 ? newFiles[0].id : null);
      }
      return newFiles;
    });
  };

  const exportCSV = async (platform: ExportPlatform) => {
    if (files.length === 0) return;
    
    const limit = getKeywordLimit(platform);
    let data: any[] = [];

    files.forEach(f => {
      // Ensure keywords are an array and limit them
      let kwArray = Array.isArray(f.generatedKeywords) ? f.generatedKeywords : 
                   (typeof f.generatedKeywords === 'string' ? f.generatedKeywords.split(',').map((s: string) => s.trim()) : []);
      // Filter out empty strings
      kwArray = kwArray.filter(Boolean);
      kwArray = kwArray.slice(0, limit);
      const kwString = kwArray.join(", ");

      if (platform === 'shutterstock') {
        data.push({
          Filename: f.file.name,
          Description: f.generatedDescription || f.generatedTitle,
          Keywords: kwString,
          Categories: "1",
          Illustration: f.file.type.includes('png') || f.file.type.includes('webp') || f.cleanedName.includes('illustration') || f.cleanedName.includes('vector') ? "Yes" : "No",
          'Mature Content': "No",
          Editorial: "No"
        });
      } else if (platform === 'adobestock') {
        data.push({
          Filename: f.file.name,
          Title: f.generatedTitle || f.generatedDescription,
          Keywords: kwString,
          Category: "1",
          Releases: ""
        });
      } else if (platform === 'vecteezy') {
        data.push({
          Filename: f.file.name,
          Title: f.generatedTitle,
          Description: f.generatedDescription,
          Keywords: kwString,
          License: "Free"
        });
      } else {
        // Universal
        data.push({
          Filename: f.file.name,
          Title: f.generatedTitle,
          Description: f.generatedDescription,
          Keywords: kwString,
          Categories: "1"
        });
      }
    });

    const Papa = (await import('papaparse')).default;
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `metadata_export_${platform}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setShowExportMenu(false);
  };

  const selectedFile = files.find(f => f.id === selectedFileId);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DBMetadata - Stock Upload Assistant",
    "operatingSystem": "Web",
    "applicationCategory": "UtilitiesApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Professional browser-based metadata utility tool for stock contributors. Features smart keyword generation, customized CSV export for Adobe Stock, Shutterstock, and Vecteezy.",
    "url": "https://www.digitalbareng.com/tools/dbmetadata"
  };

  return (
    <div className="pt-20 bg-[#faf9f8] min-h-screen text-slate-800 font-sans">
      <SEO 
        title="DBMetadata - Smart Batch Metadata Tool | Digital Bareng"
        description="Professional browser-based metadata utility for stock contributors. Batch read EXIF, auto-generate keywords, and export to CSV without uploading to any server."
        keywords="stock metadata tool, auto keyword generator, adobe stock csv, shutterstock csv exporter, exifr, exiftool browser"
        type="WebPage"
        schemaMarkup={softwareSchema}
      />
      
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              <Layers className="w-7 h-7 text-orange-600" />
              DBMetadata
            </h1>
            <p className="text-sm text-slate-500 font-medium">Local Browser-based Metadata Dashboard</p>
          </div>
          <div className="flex gap-3 relative w-full sm:w-auto">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 flex-col sm:flex-row flex-1 sm:flex-none"
            >
              <Upload className="w-4 h-4" />
              Add Files
            </button>
            <div className="relative flex-1 sm:flex-none">
              <button 
                onClick={() => setShowExportMenu(!showExportMenu)}
                disabled={files.length === 0}
                className="w-full px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 h-full"
              >
                <Download className="w-4 h-4 text-xs sm:text-sm" />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="inline sm:hidden">Export</span>
                <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
              </button>
              
              {showExportMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowExportMenu(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                    <button 
                      onClick={() => exportCSV('shutterstock')}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 font-medium text-slate-700 hover:text-orange-600 transition-colors"
                    >
                      Untuk Shutterstock
                      <span className="block text-[10px] text-slate-400 font-normal mt-0.5">Max 50 Keywords</span>
                    </button>
                    <button 
                      onClick={() => exportCSV('adobestock')}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 font-medium text-slate-700 hover:text-orange-600 transition-colors border-t border-slate-50"
                    >
                      Untuk Adobe Stock
                      <span className="block text-[10px] text-slate-400 font-normal mt-0.5">Max 49 Keywords</span>
                    </button>
                    <button 
                      onClick={() => exportCSV('vecteezy')}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 font-medium text-slate-700 hover:text-orange-600 transition-colors border-t border-slate-50"
                    >
                      Untuk Vecteezy
                      <span className="block text-[10px] text-slate-400 font-normal mt-0.5">Max 50 Keywords</span>
                    </button>
                    <button 
                      onClick={() => exportCSV('universal')}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 font-medium text-slate-700 hover:text-blue-600 transition-colors border-t border-slate-100 bg-slate-50"
                    >
                      Format Universal
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
          
          {/* Left Sidebar: File List */}
          <div className="lg:col-span-3 lg:col-start-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[300px] lg:h-auto lg:min-h-0 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <span className="font-semibold text-sm text-slate-700">Uploaded Files</span>
              <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full text-xs font-bold">{files.length}</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {files.length === 0 && (
                <div 
                  className={`h-full flex flex-col items-center justify-center p-6 text-center border-2 border-dashed rounded-xl m-2 transition-colors cursor-pointer ${isDragging ? 'border-orange-400 bg-orange-50' : 'border-slate-200 hover:border-slate-300'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                    <Upload className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Drag files here</p>
                  <p className="text-xs text-slate-400">JPG, PNG, WEBP, MP4, MOV, AI, EPS, SVG</p>
                  <input type="file" multiple ref={fileInputRef} onChange={(e) => e.target.files && handleFiles(e.target.files)} className="hidden" />
                </div>
              )}
              
              {files.map(f => (
                <div 
                  key={f.id} 
                  onClick={() => setSelectedFileId(f.id)}
                  className={`group relative flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all ${selectedFileId === f.id ? 'bg-orange-50 ring-1 ring-orange-200' : 'hover:bg-slate-50'}`}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center border border-slate-200">
                    {f.type === 'image' || f.previewUrl.startsWith('data:image/jpeg') ? (
                      <img src={f.previewUrl} alt="prev" className="w-full h-full object-cover" />
                    ) : f.type === 'video' ? (
                      <div className="text-[8px] font-bold text-slate-400">VIDEO</div>
                    ) : f.type === 'vector' ? (
                      <div className="text-[10px] font-bold text-slate-400 uppercase">{f.file.name.split('.').pop()}</div>
                    ) : (
                      <ImageIcon className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{f.file.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium uppercase truncate">{formatBytes(f.file.size)} • {f.type}</p>
                  </div>
                  <button onClick={(e) => removeFile(e, f.id)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-100 hover:text-red-600 text-slate-400 rounded-lg transition-all absolute right-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Metadata & Editor */}
          <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-0 overflow-hidden">
            {selectedFile ? (
              <div className="flex flex-col lg:flex-row h-full lg:overflow-hidden">
                {/* Preview Col */}
                <div className="lg:w-[40%] border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50 p-6 flex flex-col lg:overflow-y-auto">
                  <div className="w-full aspect-square rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 mb-6 flex items-center justify-center shadow-inner relative shrink-0">
                    {selectedFile.type === 'image' || selectedFile.previewUrl.startsWith('data:image/jpeg') ? (
                      <img src={selectedFile.previewUrl} className="w-full h-full object-contain" alt="preview" />
                    ) : selectedFile.type === 'video' ? (
                      <video src={selectedFile.previewUrl} controls className="w-full h-full object-contain" />
                    ) : selectedFile.type === 'vector' && selectedFile.file.name.toLowerCase().endsWith('.ai') ? (
                      <iframe src={URL.createObjectURL(new Blob([selectedFile.file], { type: 'application/pdf' }))} title="Vector Preview" className="w-full h-full bg-slate-100 object-contain text-transparent" />
                    ) : selectedFile.type === 'vector' ? (
                       <div className="flex flex-col items-center justify-center text-slate-400">
                         <Layers className="w-16 h-16 mb-4 text-slate-300" />
                         <span className="font-bold uppercase text-lg">{selectedFile.file.name.split('.').pop()} File</span>
                         <span className="text-sm mt-1">Natively unsupported in browser</span>
                       </div>
                    ) : null}
                  </div>
                  
                  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm shrink-0">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5"><Settings className="w-3.5 h-3.5"/> Raw Properties</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-slate-500">File Type</span><span className="font-semibold text-slate-800">{selectedFile.file.type || 'Unknown'}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Size</span><span className="font-semibold text-slate-800">{formatBytes(selectedFile.file.size)}</span></div>
                      
                      {selectedFile.metadata?.width && (
                        <div className="flex justify-between"><span className="text-slate-500">Resolution</span><span className="font-semibold text-slate-800">{selectedFile.metadata.width} x {selectedFile.metadata.height}</span></div>
                      )}
                      {selectedFile.metadata?.duration && (
                        <div className="flex justify-between"><span className="text-slate-500">Duration</span><span className="font-semibold text-slate-800">{selectedFile.metadata.duration.toFixed(2)}s</span></div>
                      )}
                      {selectedFile.metadata?.camera && (
                        <div className="flex justify-between"><span className="text-slate-500">Camera</span><span className="font-semibold text-slate-800 truncate pl-2">{selectedFile.metadata.camera}</span></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Editor Col */}
                <div className="lg:w-[60%] p-6 lg:overflow-y-auto flex flex-col">
                  <div className="flex items-center gap-2 mb-6 text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg w-fit border border-orange-100">
                    <LayoutDashboard className="w-4 h-4"/> Offline Smart Metadata
                  </div>

                  <div className="space-y-6 flex-1 text-sm">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Stock Title</label>
                      <input 
                        type="text" 
                        value={selectedFile.generatedTitle}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFiles(prev => prev.map(f => f.id === selectedFile.id ? {...f, generatedTitle: val} : f));
                        }}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow font-semibold text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Description</label>
                      <textarea 
                        rows={3}
                        value={selectedFile.generatedDescription}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFiles(prev => prev.map(f => f.id === selectedFile.id ? {...f, generatedDescription: val} : f));
                        }}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow text-slate-700 resize-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5"><Tag className="w-3.5 h-3.5"/> AI Keywords ({selectedFile.generatedKeywords.length})</label>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(Array.isArray(selectedFile.generatedKeywords) ? selectedFile.generatedKeywords.join(", ") : selectedFile.generatedKeywords);
                          }}
                          className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3"/> Copy All
                        </button>
                      </div>
                      
                      <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 min-h-[120px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-orange-500 transition-shadow">
                         {Array.isArray(selectedFile.generatedKeywords) ? (
                           selectedFile.generatedKeywords.map((kw, i) => (
                             <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium shadow-sm">
                               {kw}
                               <button 
                                onClick={() => {
                                  setFiles(prev => prev.map(f => {
                                    if(f.id === selectedFile.id) {
                                      return {...f, generatedKeywords: f.generatedKeywords.filter((_, idx) => idx !== i)};
                                    }
                                    return f;
                                  }));
                                }}
                                className="text-slate-400 hover:text-red-500 ml-1"
                               >
                                <X className="w-3 h-3"/>
                               </button>
                             </span>
                           ))
                         ) : (
                           <span className="text-slate-700">{selectedFile.generatedKeywords}</span>
                         )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium">Keywords are algorithmically extracted from filename & templates. No external APIs used.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <LayoutDashboard className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-600 mb-2">No File Selected</h3>
                <p className="text-sm text-center max-w-sm">Upload images or videos to view raw EXIF properties and generate stock-market ready metadata titles and keywords entirely in your browser.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

