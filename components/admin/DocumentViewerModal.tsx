"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Download,
  FileText,
  FileSpreadsheet,
  Maximize2,
  Minimize2,
  Loader2,
  AlertCircle,
  File,
  Eye,
  FileCheck,
} from "lucide-react";

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
  fileSize?: string;
  fileType?: string;
  downloadUrl?: string;
}

export default function DocumentViewerModal({
  isOpen,
  onClose,
  fileUrl,
  fileName,
  fileSize,
  fileType,
  downloadUrl,
}: DocumentViewerModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const ext = (fileName.split(".").pop() || "").toLowerCase();
  const isDocx = ext === "docx" || ext === "doc";
  const isPdf = ext === "pdf";
  const isImage = ["png", "jpg", "jpeg", "webp", "svg", "gif"].includes(ext);
  const isText = ["txt", "csv", "json", "log", "xml", "md"].includes(ext);

  const getDocTypeLabel = () => {
    if (isDocx) return "Microsoft Word (.docx)";
    if (isPdf) return "PDF Document";
    if (isImage) return "Image Preview";
    if (isText) return "Text / Data";
    if (ext === "dwg" || ext === "dxf") return "CAD Drawing File";
    if (ext === "zip" || ext === "rar") return "Archive Package";
    return `${ext.toUpperCase()} File`;
  };

  useEffect(() => {
    if (!isOpen || !fileUrl) return;

    let isMounted = true;
    setLoading(true);
    setError(null);
    setTextContent(null);

    async function loadDoc() {
      try {
        if (isDocx) {
          const docxModule = await import("docx-preview");
          const res = await fetch(fileUrl);
          if (!res.ok) {
            throw new Error(`Failed to load document (${res.status} ${res.statusText})`);
          }
          const blob = await res.blob();
          if (!isMounted) return;

          if (containerRef.current) {
            containerRef.current.innerHTML = "";
            await docxModule.renderAsync(blob, containerRef.current, undefined, {
              className: "docx-render-container",
              inWrapper: true,
              ignoreWidth: false,
              ignoreHeight: false,
              breakPages: true,
            });
          }
          if (isMounted) setLoading(false);
        } else if (isText) {
          const res = await fetch(fileUrl);
          if (!res.ok) throw new Error("Failed to fetch text content");
          const text = await res.text();
          if (isMounted) {
            setTextContent(text);
            setLoading(false);
          }
        } else {
          // PDF, Image, etc. handled by iframe / img tag directly
          if (isMounted) setLoading(false);
        }
      } catch (err) {
        console.error("Document preview error:", err);
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to render document in browser preview."
          );
          setLoading(false);
        }
      }
    }

    loadDoc();

    return () => {
      isMounted = false;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [isOpen, fileUrl, isDocx, isText]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actualDownloadUrl = downloadUrl || fileUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4 md:p-6 backdrop-blur-md">
      <div
        className={`relative flex flex-col rounded-2xl border border-white/10 bg-[#0d1522] shadow-2xl transition-all duration-300 overflow-hidden ${
          isFullScreen
            ? "h-full w-full"
            : "h-[92vh] w-full max-w-6xl"
        }`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#111c2e] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-copper-500/15 border border-copper-500/30 text-copper-400">
              {isDocx ? (
                <FileText size={18} />
              ) : isPdf ? (
                <FileCheck size={18} />
              ) : isText ? (
                <FileSpreadsheet size={18} />
              ) : (
                <File size={18} />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-semibold text-white text-sm sm:text-base" title={fileName}>
                  {fileName}
                </h3>
                <span className="hidden sm:inline-block rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-copper-300 shrink-0">
                  {getDocTypeLabel()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-steel-400">
                {fileSize && <span>{fileSize}</span>}
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <Eye size={11} /> Live In-Browser View
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={actualDownloadUrl}
              download={fileName}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-copper-500 hover:border-copper-500 transition-all shadow-sm"
              title="Download file"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download</span>
            </a>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="rounded-lg p-2 text-steel-400 hover:bg-white/10 hover:text-white transition-colors"
              title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-steel-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
              title="Close viewer (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Document Content View Area */}
        <div className="relative flex-1 overflow-auto bg-[#0a0f18] p-2 sm:p-4">
          {/* Loading State */}
          {loading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0a0f18]/90 backdrop-blur-sm">
              <Loader2 className="h-9 w-9 animate-spin text-copper-400" />
              <p className="mt-3 text-xs uppercase tracking-wider font-mono text-steel-300">
                Rendering {fileName}...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
                <AlertCircle size={28} />
              </div>
              <h4 className="font-display text-lg uppercase text-white font-bold">
                Direct Preview Notice
              </h4>
              <p className="mt-2 text-sm text-steel-300 max-w-md">
                {error}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href={actualDownloadUrl}
                  download={fileName}
                  className="inline-flex items-center gap-2 rounded-xl bg-copper-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-copper-600 transition-all shadow-lg shadow-copper-500/20"
                >
                  <Download size={14} />
                  <span>Download Document</span>
                </a>
              </div>
            </div>
          )}

          {/* 1. Word Document Preview Container */}
          {isDocx && !error && (
            <div className="mx-auto max-w-4xl py-4 flex flex-col items-center w-full">
              <style>{`
                .docx-render-container-wrapper {
                  background: transparent !important;
                  padding: 0 !important;
                  display: flex !important;
                  flex-direction: column !important;
                  align-items: center !important;
                  width: 100% !important;
                }
                .docx-render-container-wrapper > section.docx-render-container {
                  background: #ffffff !important;
                  color: #111827 !important;
                  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2) !important;
                  border-radius: 8px !important;
                  margin-bottom: 24px !important;
                  max-width: 100% !important;
                }
                .docx-render-container table {
                  border-collapse: collapse !important;
                }
              `}</style>
              <div
                ref={containerRef}
                className="docx-viewer-content w-full flex flex-col items-center min-h-[400px]"
                style={{
                  fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
                }}
              />
            </div>
          )}

          {/* 2. PDF Document Preview */}
          {isPdf && !error && (
            <div className="h-full w-full rounded-xl overflow-hidden bg-white shadow-xl">
              <iframe
                src={`${fileUrl}#toolbar=1`}
                className="h-full w-full border-0"
                title={fileName}
              />
            </div>
          )}

          {/* 3. Image Preview */}
          {isImage && !error && (
            <div className="flex h-full items-center justify-center p-4">
              <img
                src={fileUrl}
                alt={fileName}
                className="max-h-full max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
              />
            </div>
          )}

          {/* 4. Text / CSV Preview */}
          {isText && !error && textContent && (
            <div className="mx-auto max-w-5xl rounded-xl bg-[#111827] border border-white/10 p-6 shadow-xl">
              <pre className="font-mono text-xs text-steel-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {textContent}
              </pre>
            </div>
          )}

          {/* 5. CAD / Unsupported format fallback preview card */}
          {!isDocx && !isPdf && !isImage && !isText && !error && (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-copper-500/10 text-copper-400 border border-copper-500/20 mb-4">
                <FileText size={32} />
              </div>
              <h4 className="font-display text-xl uppercase text-white font-bold">
                {getDocTypeLabel()}
              </h4>
              <p className="mt-2 text-sm text-steel-300 max-w-md">
                This is a specialized engineering drawing or archive package ({fileName}). You can open it in your local CAD software or download it directly below.
              </p>
              <div className="mt-6">
                <a
                  href={actualDownloadUrl}
                  download={fileName}
                  className="inline-flex items-center gap-2 rounded-xl bg-copper-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-copper-600 transition-all shadow-lg shadow-copper-500/20"
                >
                  <Download size={14} />
                  <span>Download {fileName}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
