"use client";

import Image from "next/image";
import Link from "next/link";
import { DollarSign, ImageOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import QuickBookModal from "@/components/ui/QuickBookModal";

interface GeneralCardProps {
  type: "tours" | "activities" | "hotels" | "restaurants" | "transport" | "rentals";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

function getHref(type: GeneralCardProps["type"], data: GeneralCardProps["data"]): string | null {
  if (type === "tours") return `/tours/${data.slug || data.id}`;
  if (type === "activities") return `/activities/${data.slug || data.id}`;
  return null;
}

export default function GeneralCard({ type, data }: GeneralCardProps) {
  const [imgError, setImgError] = useState(false);
  const [showBook, setShowBook] = useState(false);

  const getTitle = () => data.title || (data.brand && data.model ? `${data.brand} ${data.model}` : "Untitled");
  const getImage = () => data.thumbnail || data.images?.[0] || data.gallery?.[0] || null;
  const getPrice = (): string | null => {
    if (type === "tours" || type === "activities") return data.price ? `$${data.price}` : null;
    if (type === "hotels") return data.price ? `$${data.price} / night` : null;
    if (type === "transport") return data.price ? `$${data.price} / ${data.duration || "day"}` : null;
    if (type === "rentals") return data.price ? `$${data.price} / mo` : null;
    return null;
  };
  const getDesc = (): string => {
    if (type === "transport") return `${data.brand} ${data.model} · ${data.year} · ${data.transmission}`;
    if (data.bio) return data.bio;
    if (data.description) return data.description.replace(/<[^>]+>/g, "").slice(0, 110) + "…";
    return "";
  };

  const price = getPrice();
  const imgSrc = getImage();
  const href = getHref(type, data);
  const isNavigable = !!href;

  const cardInner = (
    <div className={`group flex flex-col rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full ${isNavigable ? "cursor-pointer" : ""}`}>
      {/* Image */}
      <div className="relative overflow-hidden h-44 bg-[var(--bg2)]">
        {imgSrc && !imgError ? (
          <Image
            src={imgSrc}
            alt={getTitle()}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ background: "var(--bg2)" }}>
            <ImageOff size={28} style={{ color: "var(--subtext)", opacity: 0.4 }} />
            <span style={{ fontSize: 11, color: "var(--subtext)", opacity: 0.5 }}>{getTitle()}</span>
          </div>
        )}

        {/* Navigate arrow badge on hoverable items */}
        {isNavigable && (
          <div
            className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ background: "rgb(193,51,33)" }}
          >
            <ArrowRight size={14} style={{ color: "#fff" }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3
          className="font-bold text-[var(--text)] leading-tight"
          style={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          title={getTitle()}
        >
          {getTitle()}
        </h3>
        <p
          className="text-sm text-[var(--subtext)] flex-1"
          style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {getDesc()}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border)] gap-2">
          {price ? (
            <div className="flex items-center gap-0.5 text-[var(--accent)] font-bold text-sm">
              <DollarSign size={13} />
              {price.replace("$", "")}
            </div>
          ) : (
            <span className="text-xs text-[var(--subtext)]">Price on request</span>
          )}

          {/* Action button */}
          {isNavigable ? (
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(193,51,33,0.1)", color: "rgb(193,51,33)" }}
            >
              View →
            </span>
          ) : (
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowBook(true); }}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg"
              style={{ background: "rgb(193,51,33)", color: "#fff" }}
            >
              Enquire
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isNavigable ? (
        <Link href={href!} className="block h-full">
          {cardInner}
        </Link>
      ) : (
        <div className="h-full">{cardInner}</div>
      )}

      {/* Quick book modal for non-navigable types */}
      {showBook && (
        <QuickBookModal
          title={getTitle()}
          subtitle={data.location || type}
          type={type}
          onClose={() => setShowBook(false)}
        />
      )}
    </>
  );
}
