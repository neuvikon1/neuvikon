"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { RevealCell, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { asset, type ProjectMedia } from "@/lib/content";
import { ui, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * A project's screenshots: a grid of thumbnails, and a viewer that opens over
 * the page when one is clicked.
 *
 * Phone screenshots are tall and narrow, so they sit four to a row on a wide
 * screen; desktop captures (`wide`) take two. In the viewer, the arrow keys
 * and the buttons either side step through the set, and Escape or the
 * backdrop closes it. Videos play in place in the grid instead - a viewer
 * around a player that already has its own controls would be a frame around a
 * frame.
 */
export function MediaGallery({ media, locale }: { media: ProjectMedia[]; locale: Locale }) {
  const t = ui[locale];
  const [open, setOpen] = useState<number | null>(null);
  const images = media.filter((item) => item.kind !== "video");
  const wide = media.some((item) => item.wide);
  const current = open === null ? null : images[open];

  const step = (by: number) =>
    setOpen((index) => (index === null ? null : (index + by + images.length) % images.length));

  return (
    <>
      <RevealGroup
        stagger={0.05}
        className={cn(
          "grid w-full gap-4",
          wide ? "md:grid-cols-2" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
        )}
      >
        {media.map((item) => (
          <RevealCell key={item.src}>
            {item.kind === "video" ? (
              /* No autoplay: several clips running at once is noise, and on
                 a phone it is someone's data plan. */
              <video
                src={asset(item.src)}
                poster={item.poster && asset(item.poster)}
                aria-label={item.alt}
                controls
                playsInline
                preload="metadata"
                className="h-auto w-full overflow-hidden rounded-xl ring-1 ring-foreground/10"
              />
            ) : (
              <button
                type="button"
                onClick={() => setOpen(images.indexOf(item))}
                aria-label={t.galleryOpen(images.indexOf(item) + 1, images.length)}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-shadow duration-500 ease-house outline-none hover:ring-foreground/25 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Image
                  src={asset(item.src)}
                  alt={item.alt ?? ""}
                  width={item.wide ? 1600 : 600}
                  height={item.wide ? 1000 : 1300}
                  className="h-auto w-full transition-transform duration-700 ease-house group-hover:scale-[1.02]"
                />
              </button>
            )}
          </RevealCell>
        ))}
      </RevealGroup>

      <DialogPrimitive.Root open={open !== null} onOpenChange={(next) => !next && setOpen(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-background/85 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <DialogPrimitive.Popup
            // The popup covers the whole screen, so the backdrop never gets
            // the click; a click on the empty space around the image closes.
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(null);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") step(1);
              if (event.key === "ArrowLeft") step(-1);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none transition duration-200 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 md:p-10"
          >
            {current && (
              <figure className="flex max-h-full max-w-full flex-col items-center gap-3">
                <DialogPrimitive.Title className="sr-only">{current.alt ?? ""}</DialogPrimitive.Title>
                <Image
                  src={asset(current.src)}
                  alt={current.alt ?? ""}
                  width={current.wide ? 1600 : 600}
                  height={current.wide ? 1000 : 1300}
                  className="h-auto max-h-[calc(100svh-7rem)] w-auto max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-foreground/10"
                />
                <figcaption className="flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  <span className="tabular-nums">
                    {(open ?? 0) + 1} / {images.length}
                  </span>
                  {current.alt && <span>{current.alt}</span>}
                </figcaption>
              </figure>
            )}

            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={t.galleryPrev}
                  onClick={() => step(-1)}
                  className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full md:left-6"
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={t.galleryNext}
                  onClick={() => step(1)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full md:right-6"
                >
                  <ChevronRight />
                </Button>
              </>
            )}
            <DialogPrimitive.Close
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t.close}
                  className="absolute top-3 right-3 md:top-6 md:right-6"
                />
              }
            >
              <XIcon />
            </DialogPrimitive.Close>
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
