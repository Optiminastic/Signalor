"use client";

import { useState } from "react";
import { Globe2, RotateCw } from "@/features/site/components/icons";
import type { PreviewElement } from "@/features/site/lib/api/content-optimisation";
import { cn } from "@/features/site/lib/utils";

type Props = {
  /** JPEG data URL of the rendered page (full-page screenshot from BE Playwright). */
  previewImage: string;
  /** Bounding boxes for clickable text elements, coords in CSS pixels at viewportWidth. */
  previewElements: PreviewElement[];
  /** CSS-pixel width the screenshot was taken at (1440 by default). */
  viewportWidth: number;
  isLoading: boolean;
  emptyMessage?: string;
  onRetry?: () => void;
  selectedElementId: number | null;
  onSelectElement: (el: PreviewElement | null) => void;
};

/** Wireframe shimmer that reads like a webpage while the screenshot renders. */
function LoadingSkeleton() {
  return (
    <div className="h-full overflow-hidden bg-background px-10 py-8" aria-label="Loading preview">
      <div className="mx-auto flex max-w-3xl animate-pulse flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="h-5 w-24 rounded-md bg-muted" />
          <div className="flex gap-2">
            <div className="h-5 w-14 rounded-md bg-muted/70" />
            <div className="h-5 w-14 rounded-md bg-muted/70" />
            <div className="h-5 w-16 rounded-md bg-muted" />
          </div>
        </div>
        <div className="mt-6 h-9 w-3/5 rounded-md bg-muted" />
        <div className="h-9 w-2/5 rounded-md bg-muted/80" />
        <div className="mt-1 h-3.5 w-4/5 rounded bg-muted/60" />
        <div className="h-3.5 w-3/5 rounded bg-muted/60" />
        <div className="mt-2 flex gap-2">
          <div className="h-8 w-28 rounded-md bg-muted" />
          <div className="h-8 w-24 rounded-md bg-muted/60" />
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="h-28 rounded-lg bg-muted/50" />
          <div className="h-28 rounded-lg bg-muted/50" />
          <div className="h-28 rounded-lg bg-muted/50" />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ emptyMessage, onRetry }: { emptyMessage?: string; onRetry?: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-muted/15 px-8 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-muted/60">
        <Globe2 className="size-5 text-muted-foreground" />
      </span>
      <p className="max-w-sm text-[13px] leading-relaxed text-muted-foreground">
        {emptyMessage || "Select a page from the dropdown above to load a preview."}
      </p>
      {onRetry && emptyMessage ? (
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition hover:bg-muted/50"
        >
          <RotateCw className="size-3.5" />
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function PageIframe({
  previewImage,
  previewElements,
  viewportWidth,
  isLoading,
  emptyMessage,
  onRetry,
  selectedElementId,
  onSelectElement,
}: Props) {
  const [hoverId, setHoverId] = useState<number | null>(null);
  // Natural image height in CSS px, we need it to position bboxes vertically
  // as a percentage of the image's intrinsic height. Captured on image load.
  const [imgNaturalHeight, setImgNaturalHeight] = useState(0);

  if (isLoading) return <LoadingSkeleton />;
  if (!previewImage) return <EmptyState emptyMessage={emptyMessage} onRetry={onRetry} />;

  return (
    <div className="relative h-full w-full overflow-auto bg-background">
      <div className="relative w-full">
        <img
          src={previewImage}
          alt="Page preview"
          className="block h-auto w-full select-none"
          draggable={false}
          onLoad={(e) => setImgNaturalHeight(e.currentTarget.naturalHeight)}
          onClick={() => onSelectElement(null)}
        />
        {/* Overlay layer fills the image's rendered box. We position each
            element's hit-zone with percentages so it scales correctly when
            the panel is resized, left/width relative to viewportWidth (the
            screenshot's intrinsic width), top/height relative to the image's
            intrinsic height. */}
        {imgNaturalHeight > 0 ? (
          <div className="absolute inset-0">
            {previewElements.map((el) => {
              const isSelected = el.id === selectedElementId;
              const isHover = el.id === hoverId;
              const showTag = isSelected || isHover;
              return (
                <button
                  key={el.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectElement(el);
                  }}
                  onMouseEnter={() => setHoverId(el.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className={cn(
                    "absolute cursor-pointer rounded-sm transition-colors",
                    isSelected
                      ? "border-2 border-primary bg-primary/10 shadow-[0_0_0_3px_rgba(224,74,61,0.12)]"
                      : isHover
                        ? "border-2 border-primary/60 bg-primary/5"
                        : "border border-transparent hover:border-primary/40",
                  )}
                  style={{
                    left: `${(el.bbox.x / viewportWidth) * 100}%`,
                    top: `${(el.bbox.y / imgNaturalHeight) * 100}%`,
                    width: `${(el.bbox.w / viewportWidth) * 100}%`,
                    height: `${(el.bbox.h / imgNaturalHeight) * 100}%`,
                  }}
                  title={`${el.tag.toUpperCase()}: ${el.text.slice(0, 80)}`}
                >
                  {showTag ? (
                    <span
                      className={cn(
                        "absolute -top-5 left-0 select-none rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none tracking-wide text-white shadow-sm",
                        isSelected ? "bg-primary" : "bg-primary/70",
                      )}
                    >
                      {el.tag}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
