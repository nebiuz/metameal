"use client";

import { useCallback, useState, useRef } from "react";
import { motion } from "motion/react";
import { Upload, Camera, Sparkles } from "lucide-react";

interface UploadZoneProps {
  onImageSelect: (base64: string, mimeType: string) => void;
  isAnalyzing: boolean;
  compact?: boolean;
}

export default function UploadZone({ onImageSelect, isAnalyzing, compact }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreview(result);
        // Extract base64 data (remove data:image/xxx;base64, prefix)
        const base64 = result.split(",")[1];
        onImageSelect(base64, file.type);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  if (compact) {
    return (
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
          id="compact-upload"
        />
        {preview ? (
          <div className="relative rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Uploaded meal" className="w-full h-48 object-cover" />
            {!isAnalyzing && (
              <button
                onClick={() => {
                  setPreview(null);
                  fileInputRef.current?.click();
                }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-sm text-white"
              >
                Change image
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="upload-zone w-full h-48 flex flex-col items-center justify-center gap-3 cursor-pointer"
          >
            <Upload className="w-8 h-8 text-[var(--text-muted)]" />
            <span className="text-sm text-[var(--text-secondary)]">Upload meal photo</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-20">
      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12 max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-cyan-dim)] border border-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] text-xs font-medium mb-6">
          <Sparkles className="w-3 h-3" />
          Powered by Google Gemini AI
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-[1.1]">
          See what your food
          <br />
          <span className="text-glow-cyan text-[var(--accent-cyan)]">will do</span> before you eat it
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto">
          Upload a meal photo and watch AI simulate its impact on your energy, focus, hydration, and body — in real time.
        </p>
      </motion.div>

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
          id="hero-upload"
        />

        {preview ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Your meal" className="w-full h-72 sm:h-80 object-cover" />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="scan-line" />
                <div className="text-center">
                  <div className="w-12 h-12 border-2 border-[var(--accent-cyan)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-[var(--accent-cyan)] font-medium">Analyzing your meal...</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Simulating body effects</p>
                </div>
              </div>
            )}
            {!isAnalyzing && (
              <button
                onClick={() => {
                  setPreview(null);
                  fileInputRef.current?.click();
                }}
                className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-white/10 backdrop-blur text-sm text-white hover:bg-white/20 transition"
              >
                Change photo
              </button>
            )}
          </motion.div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`upload-zone cursor-pointer flex flex-col items-center justify-center py-20 sm:py-24 ${
              isDragOver ? "drag-over" : ""
            }`}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-cyan)]/10 to-[var(--accent-purple)]/10 border border-[var(--accent-cyan)]/20 flex items-center justify-center">
                <Upload className="w-7 h-7 text-[var(--accent-cyan)]" />
              </div>
            </motion.div>
            <p className="text-[var(--text-primary)] font-medium mb-1">
              Drop your meal photo here
            </p>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              or click to browse • JPG, PNG, WebP
            </p>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-cyan)] text-black text-sm font-medium hover:brightness-110 transition">
                <Upload className="w-4 h-4" />
                Upload
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-[var(--text-secondary)] text-sm hover:bg-white/10 transition">
                <Camera className="w-4 h-4" />
                Camera
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
