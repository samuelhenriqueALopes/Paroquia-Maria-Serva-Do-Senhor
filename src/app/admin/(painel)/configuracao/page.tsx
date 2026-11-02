import type { Metadata } from "next";
import { salvarConfiguracoes } from "@/app/admin/actions";
import { Campo, BotaoEnviar } from "@/components/admin/Comuns";
import { estilo } from "@/components/admin/estilo";
import { MensagemOk, Tela, TituloPainel } from "@/components/admin/Layout";
import { exigirAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Configurações do site" };

type Configuracoes = {
  nome: string; nome_curto: string; lema: string; lema_referencia: string; divisa: string | null;
  arquidiocese: string; logradouro: string; bairro: string; cidade: string; cep: string; maps_url: string | null;
  telefone: string; email: string; whatsapp_secretaria: string; mensagem_whatsapp: string; secretaria_horario: string;
  instagram_url: string | null; facebook_url: string | null; youtube_url: string | null;
  dizimo_chave_pix: string; dizimo_favorecido: string;
};

const secoes = "rounded-xl border border-slate-200 bg-white shadow-sm";
const tituloSecao = "border-b border-slate-100 px-5 py-4 font-semibold text-slate-900";
const grade = "grid gap-4 p-5 sm:grid-cols-2";

function CampoTexto({ nome, rotulo, valor, maxLength, tipo = "text", dica }: {
  nome: keyof Configuracoes; rotulo: string; valor: string; maxLength?: number; tipo?: string; dica?: string;
}) {
  return <Campo id={nome} rotulo={rotulo} dica={dica}>
    <input id={nome} name={nome} type={tipo} maxLength={maxLength} defaultValue={valor} className={estilo.campo} />
  </Campo>;
}

function CampoArea({ nome, rotulo, valor, maxLength, linhas = 3 }: {
  nome: keyof Configuracoes; rotulo: string; valor: string; maxLength?: number; linhas?: number;
}) {
  return <Campo id={nome} rotulo={rotulo}>
    <textarea id={nome} name={nome} maxLength={maxLength} rows={linhas} defaultValue={valor} className={estilo.campo} />
  </Campo>;
}

async function Conteudo({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { supabase } = await exigirAdmin();
  const sp = await searchParams;
  const ok = typeof sp.ok === "string" ? sp.ok : undefined;
  const erro = typeof sp.erro === "string" ? sp.erro : undefined;

  const { data, error } = await supabase.from("configuracoes_site").select("*").eq("id", 1).maybeSingle<Configuracoes>();
  if (error) console.error("Painel: erro ao carregar configurações:", error.message);

  const c: Configuracoes = data ?? {
    nome: "", nome_curto: "", lema: "", lema_referencia: "", divisa: "", arquidiocese: "",
    logradouro: "", bairro: "", cidade: "", cep: "", maps_url: "", telefone: "", email: "",
    whatsapp_secretaria: "", mensagem_whatsapp: "Olá! Vim pelo site da paróquia.", secretaria_horario: "",
    instagram_url: "", facebook_url: "", youtube_url: "", dizimo_chave_pix: "", dizimo_favorecido: "",
  };

  const v = (campo: keyof Configuracoes) => c[campo] ?? "";

  return <>
    <MensagemOk ok={ok} />
    {erro && <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{erro === "validacao" ? "Confira os campos: há informações inválidas ou fora do limite permitido." : "Não foi possível salvar as configurações. Verifique os dados e tente novamente."}</p>}
    {!data && <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">As configurações base ainda não foram criadas. Clique em salvar para ativá-las no site.</p>}

    <form action={salvarConfiguracoes} className="space-y-6">
      
      <section className={secoes}>
        <h2 className={tituloSecao}>Identidade da Paróquia</h2>
        <div className={grade}>
          <CampoTexto nome="nome" rotulo="Nome completo *" valor={v("nome")} maxLength={120} />
          <CampoTexto nome="nome_curto" rotulo="Nome curto *" valor={v("nome_curto")} maxLength={80} dica="Usado no logotipo do topo." />
          <CampoTexto nome="arquidiocese" rotulo="Arquidiocese *" valor={v("arquidiocese")} maxLength={120} />
          <CampoTexto nome="divisa" rotulo="Divisa / Frase do rodapé" valor={v("divisa")} maxLength={120} />
          <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
            <CampoTexto nome="lema" rotulo="Lema *" valor={v("lema")} maxLength={300} />
            <CampoTexto nome="lema_referencia" rotulo="Referência Bíblica do Lema *" valor={v("lema_referencia")} maxLength={60} />
          </div>
        </div>
      </section>

      <section className={secoes}>
        <h2 className={tituloSecao}>Endereço</h2>
        <div className={grade}>
          <CampoTexto nome="logradouro" rotulo="Logradouro *" valor={v("logradouro")} maxLength={160} />
          <CampoTexto nome="bairro" rotulo="Bairro *" valor={v("bairro")} maxLength={120} />
          <CampoTexto nome="cidade" rotulo="Cidade e Estado *" valor={v("cidade")} maxLength={120} />
          <CampoTexto nome="cep" rotulo="CEP *" valor={v("cep")} maxLength={20} />
          <div className="sm:col-span-2">
            <CampoTexto nome="maps_url" rotulo="Link do Google Maps" valor={v("maps_url")} tipo="url" maxLength={500} dica="Cole o link exato gerado pelo Google Maps." />
          </div>
        </div>
      </section>

      <section className={secoes}>
        <h2 className={tituloSecao}>Contato e Atendimento</h2>
        <div className={grade}>
          <CampoTexto nome="telefone" rotulo="Telefone *" valor={v("telefone")} maxLength={30} />
          <CampoTexto nome="email" rotulo="E-mail *" valor={v("email")} tipo="email" maxLength={160} />
          <CampoTexto nome="whatsapp_secretaria" rotulo="WhatsApp *" valor={v("whatsapp_secretaria")} maxLength={20} dica="Ex.: 5531900000000 (Sem traços, com 55 e DDD)" />
          <CampoTexto nome="secretaria_horario" rotulo="Horário da Secretaria *" valor={v("secretaria_horario")} maxLength={200} />
          <div className="sm:col-span-2">
            <CampoArea nome="mensagem_whatsapp" rotulo="Mensagem padrão no WhatsApp *" valor={v("mensagem_whatsapp")} maxLength={300} linhas={2} />
          </div>
        </div>
      </section>

      <section className={secoes}>
        <h2 className={tituloSecao}>Redes Sociais (Opcional)</h2>
        <div className={grade}>
          <CampoTexto nome="instagram_url" rotulo="Instagram" valor={v("instagram_url")} tipo="url" maxLength={500} />
          <CampoTexto nome="facebook_url" rotulo="Facebook" valor={v("facebook_url")} tipo="url" maxLength={500} />
          <CampoTexto nome="youtube_url" rotulo="YouTube" valor={v("youtube_url")} tipo="url" maxLength={500} />
        </div>
      </section>

      <section className={secoes}>
        <h2 className={tituloSecao}>Dízimo (PIX)</h2>
        <div className={grade}>
          <CampoTexto nome="dizimo_chave_pix" rotulo="Chave PIX *" valor={v("dizimo_chave_pix")} maxLength={120} />
          <CampoTexto nome="dizimo_favorecido" rotulo="Favorecido (Nome que aparece no banco) *" valor={v("dizimo_favorecido")} maxLength={160} />
        </div>
      </section>

      <div className="flex justify-end pb-8">
        <BotaoEnviar texto="Salvar configurações" textoPendente="Salvando..." />
      </div>

    </form>
  </>;
}

export default function ConfiguracaoAdminPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  return (
    <>
      <TituloPainel titulo="Configurações do Site" descricao="Altere informações gerais da paróquia. Elas serão atualizadas no site imediatamente." />
      <Tela><Conteudo searchParams={props.searchParams} /></Tela>
    </>
  );
}