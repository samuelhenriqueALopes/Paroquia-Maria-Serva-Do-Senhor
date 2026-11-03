import type { Metadata } from "next";
import Image from "next/image";
import { GradeHorarios, ListaAvisos } from "@/components/Blocos";
import { CabecalhoPagina, TituloSecao } from "@/components/Ui";
import { getAvisos, getHorarios, getSite } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { title: "Missas e Avisos", description: `Horários de missa e avisos da ${site.nome}.` };
}

export default async function MissasPage() {
  const [horarios, avisos] = await Promise.all([getHorarios(), getAvisos()]);

  return (
    <>
      <CabecalhoPagina sobretitulo="Celebrações" titulo="Missas e Avisos" subtitulo="Venha celebrar conosco. Confira os horários e fique atento aos avisos da semana." />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <TituloSecao sobretitulo="Semana" titulo="Horários de Missa" />
        <div className="mt-8">
          <GradeHorarios horarios={horarios} />
        </div>
        <p className="mt-6 text-sm text-tinta/60">
          Em dias santos de guarda e festas, os horários podem mudar - confira os avisos abaixo.
        </p>
      </section>

      <section id="avisos" className="bg-mariano-50/70">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-16 lg:grid-cols-[1fr_20rem]">
          <div>
            <TituloSecao sobretitulo="Comunicados" titulo="Avisos" />
            <div className="mt-8">
              <ListaAvisos avisos={avisos} />
            </div>
          </div>
          <figure className="relative mx-auto w-full max-w-xs overflow-hidden rounded-3xl shadow-xl ring-1 ring-mariano-100 lg:sticky lg:top-32">
            <Image src="/images/cruz-ramos.webp" alt="Ramos diante do crucifixo do altar, envolto em tecido roxo" width={720} height={1280}
              sizes="20rem" className="aspect-[3/4] w-full object-cover object-[50%_60%]" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-roxo-900/90 to-transparent px-5 pb-5 pt-16 text-white">
              <p className="font-serif text-xl italic leading-snug">“Bendito o que vem em nome do Senhor!”</p>
              <p className="mt-1 text-xs font-semibold text-ouro-300">Mt 21,9</p>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
