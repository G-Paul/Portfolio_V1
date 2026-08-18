/* eslint-disable @next/next/no-img-element */
import type { GalleryItem } from "@/lib/projects";

/**
 * Staggered photo/video gallery.
 *
 * CSS multi-column rather than a grid: items keep their natural aspect ratio
 * and pack into whichever column is shortest, so the layout staggers on its
 * own and reflows at any width without measuring anything in JS.
 */
export function MediaGallery({
  items,
  label = "Gallery",
}: {
  items: GalleryItem[];
  label?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div
      aria-label={label}
      className="my-8 columns-2 gap-3 lg:columns-3 [&>*]:mb-3 [&>*]:break-inside-avoid"
    >
      {items.map((item) =>
        item.type === "video" ? (
          <video
            key={item.src}
            src={item.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full border border-border"
          />
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt=""
            loading="lazy"
            className="w-full border border-border"
          />
        ),
      )}
    </div>
  );
}
