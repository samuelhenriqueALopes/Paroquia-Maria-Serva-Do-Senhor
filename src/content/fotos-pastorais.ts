// Fotos exibidas no topo da página de cada pastoral, ligadas pelo slug.
// Ficam no código (arquivos em public/images), então valem tanto para as
// pastorais do banco quanto para os valores padrão.

export type FotoPastoral = { src: string; alt: string; largura: number; altura: number };

export const fotosPastorais: Record<string, FotoPastoral> = {
  ministros: {
    src: "/images/ministros.webp",
    alt: "Ministros extraordinários, coroinhas e o bispo reunidos diante do altar da igreja",
    largura: 1320,
    altura: 1319,
  },
};
