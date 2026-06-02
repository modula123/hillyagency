// Reusable page hero — always dark background, always white text regardless of theme
interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  py?: string;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  overlayOpacity = 0.65,
  py = "py-20",
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden ${py}`}
      style={{ background: "#12151e" }}
    >
      {/* Background image */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.35 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: `rgba(18,21,30,${overlayOpacity})` }}
          />
        </>
      )}

      {/* Decorative gradient blob */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(193,51,33,0.12) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="container mx-auto px-5 xl:px-0 max-w-[1200px] relative z-10">
        {eyebrow && (
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "rgb(251,176,64)" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="font-black leading-tight mb-4"
          style={{
            color: "#ffffff",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-lg max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
