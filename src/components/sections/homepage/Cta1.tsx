import Image from "next/image";

const features = [
  {
    icon: "/images/img/bag.svg",
    title: "62+ Destinations",
    desc: "Our expert team handpicked all destinations on this platform.",
  },
  {
    icon: "/images/img/support.svg",
    title: "24/7 Support",
    desc: "We are here to help before, during, and after your trip.",
  },
  {
    icon: "/images/img/price.svg",
    title: "Best Price",
    desc: "Price match within 48 hours of order confirmation.",
  },
  {
    icon: "/images/img/book.svg",
    title: "Fast Booking",
    desc: "Secure booking and payment in minutes.",
  },
];

export default function Cta1() {
  return (
    <section className="py-10 bg-[var(--bg)] border-y border-[var(--border)]">
      <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[var(--bg2)] transition-colors">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--bg2)] flex items-center overflow-hidden justify-center p-0">
                <Image src={icon} alt={title} width={32} height={32} className="object-cover w-full h-full rounded-xl" />
              </div>
              <div>
                <h4 className="font-bold text-[var(--text)] text-sm">{title}</h4>
                <p className="text-xs text-[var(--subtext)] mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
