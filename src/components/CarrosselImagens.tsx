"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const imagens = [
  { src: "/images/altar.png", alt: "Altar da igreja com o crucifixo e tecidos roxos" },
  { src: "/images/foto_1.png", alt: "Nossa comunidade 1" },
  { src: "/images/foto_2.png", alt: "Nossa comunidade 2" },
  { src: "/images/foto_4.png", alt: "Nossa comunidade 3" },
  { src: "/images/foto_5.png", alt: "Nossa comunidade 4" },
];

export function CarrosselImagens() {
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAtual((prev) => (prev + 1) % imagens.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-mariano-100 sm:aspect-4/5">
      {imagens.map((img, index) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`object-cover object-top transition-opacity duration-1000 ease-in-out ${
            index === atual ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0} 
        />
      ))}
      
      {/* Indicadores (bolinhas de navegação) */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {imagens.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setAtual(index)}
            className={`size-2.5 rounded-full transition-colors cursor-pointer ${
              index === atual ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Ir para a imagem ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}