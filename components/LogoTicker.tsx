import Image from "next/image";

const logos = Array.from({ length: 13 }, (_, i) => `/logos/logo-${i + 1}.svg`);

export default function LogoTicker() {
  // Duplicate for seamless loop
  const track = [...logos, ...logos];

  return (
    <div className="overflow-hidden py-10">
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-8 px-8">
        Professional collaborations over the years…
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#fafaf9] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#fafaf9] to-transparent" />

        <div className="flex animate-ticker gap-16 items-center w-max">
          {track.map((src, i) => (
            <div key={i} className="shrink-0 flex items-center justify-center h-8">
              <Image
                src={src}
                alt=""
                width={120}
                height={32}
                className="h-6 w-auto object-contain opacity-40 grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
