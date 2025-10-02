"use client";

import Image from "next/image";
import type { ChangeEvent, DragEvent } from "react";
import { useMemo, useState } from "react";

type LocalAsset = {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
};

function formatFileSize(size: number) {
  if (size === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(size) / Math.log(1024));
  const formatted = size / Math.pow(1024, index);
  return `${formatted.toFixed(formatted >= 10 ? 0 : 1)} ${units[index]}`;
}

export default function MediaLibrary({ existing }: { existing: string[] }) {
  const [localAssets, setLocalAssets] = useState<LocalAsset[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return;

    const mapped: LocalAsset[] = Array.from(files).map((file) => ({
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      name: file.name,
      size: file.size,
      type: file.type || "unknown",
      previewUrl: file.type.startsWith("image") ? URL.createObjectURL(file) : undefined,
    }));

    setLocalAssets((prev) => [...mapped, ...prev]);
  };

  const dropHandlers = useMemo(
    () => ({
      onDragOver: (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
      },
      onDrop: (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        handleFiles(event.dataTransfer.files);
      },
    }),
    []
  );

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/40 p-8 text-center text-sm text-slate-300">
        <label
          className="flex cursor-pointer flex-col items-center gap-3"
          {...dropHandlers}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-700/60 bg-slate-950/60 text-2xl text-blue-200">
            ↑
          </div>
          <div>
            <p className="text-base font-semibold text-white">Upload new assets</p>
            <p className="text-xs text-slate-400">Drag and drop files or select them manually.</p>
          </div>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFiles(event.target.files)}
          />
          <p className="text-[11px] text-slate-500">Accepted formats: PNG, JPG, GIF, MP4, MOV (max 50MB)</p>
        </label>
      </section>

      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Pending uploads</h2>
          {localAssets.length > 0 && (
            <button
              type="button"
              className="rounded-lg border border-slate-700/70 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-slate-500/70 hover:text-white"
              onClick={() => setLocalAssets([])}
            >
              Clear list
            </button>
          )}
        </header>
        {localAssets.length === 0 ? (
          <p className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4 text-xs text-slate-400">
            No files staged yet. Add new assets above to prepare them for publishing.
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {localAssets.map((asset) => (
              <li key={asset.id} className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4 text-left">
                <div className="text-sm font-medium text-white">{asset.name}</div>
                <div className="mt-1 text-xs text-slate-400">{formatFileSize(asset.size)} · {asset.type || "Unknown"}</div>
                {asset.previewUrl && (
                  <div className="mt-3 overflow-hidden rounded-lg border border-slate-800/60">
                    <Image
                      src={asset.previewUrl}
                      alt={asset.name}
                      width={512}
                      height={256}
                      unoptimized
                      className="h-32 w-full object-cover"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Assets referenced on site</h2>
        {existing.length === 0 ? (
          <p className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4 text-xs text-slate-400">
            There are currently no media assets referenced by the marketing site.
          </p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {existing.map((asset) => (
              <li key={asset} className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4 text-left text-xs text-slate-300">
                <div className="text-sm font-semibold text-white">{asset}</div>
                <p className="mt-2 text-[11px] text-slate-500">Stored in the shared /public directory.</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
