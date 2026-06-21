import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/pix")({
  validateSearch: (s: Record<string, unknown>) => ({
    total: Number(s.total) || 0,
    name: String(s.name || ""),
    email: String(s.email || ""),
    cpf: String(s.cpf || ""),
    phone: String(s.phone || ""),
    qty: Number(s.qty) || 1,
  }),
  head: () => ({ meta: [{ title: "Pagamento" }] }),
  component: PixPage,
});

const WORKER_URL = "https://skalepay-worker.cloudrich777.workers.dev";

function PixPage() {
  const { total, name, email, cpf, phone, qty } = Route.useSearch();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(600);
  const [pixCode, setPixCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const brl = (v: number) => `R$${v.toFixed(2).replace(".", ",")}`;

  const vencimento = new Date(Date.now() + 600000).toLocaleString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
  });

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s <= 0 ? 0 : s - 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const gerarPix = async () => {
      try {
        setLoading(true);
        const res = await fetch(WORKER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            cpf,
            phone,
            amount: total,
            items: [{ title: "Bateria Eletrônica Musical", quantity: qty, unit_price: Math.round((total / qty) * 100) }],
          }),
        });
        const data = await res.json();
        if (data?.pix?.qrcode) {
            setPixCode(data.pix.qrcode);
        } else {
          setError("Erro ao gerar Pix. Tente novamente.");
        }
      } catch {
        setError("Erro de conexão. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };
    gerarPix();
  }, []);

  const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const copy = () => {
    navigator.clipboard.writeText(pixCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] mx-auto max-w-[480px] pb-24">
      <div className="sticky top-0 z-10 bg-white flex items-center px-3 py-3 border-b">
        <button onClick={() => navigate({ to: "/checkout", search: { q: qty } })}><ArrowLeft size={22} className="text-[#ee4d2d]"/></button>
        <h1 className="flex-1 text-center text-lg font-medium pr-6">Pagamento</h1>
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
          <span className="text-gray-700">Pagamento Total</span>
          <span className="text-[#ee4d2d] font-bold text-lg">{brl(total)}</span>
        </div>
        <div className="flex items-start justify-between">
          <span className="text-gray-700">Pague em até</span>
          <div className="text-right">
            <div className="text-[#ee4d2d] font-medium">{hh} horas {mm} minutos {ss} segundos</div>
            <div className="text-gray-500 text-xs mt-0.5">Vencimento em {vencimento}</div>
          </div>
        </div>
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">💠</span>
          <span className="font-medium text-lg">Pix</span>
        </div>
        <div className="text-center mb-4">
          <p className="text-gray-700 font-medium mb-3">Código Pix</p>

          {loading && (
            <div className="py-6 text-gray-400 text-sm">Gerando código Pix...</div>
          )}

          {error && (
            <div className="py-4 text-red-500 text-sm">{error}</div>
          )}

          {!loading && !error && pixCode && (
            <>
              <div className="bg-gray-100 rounded px-4 py-3 text-sm text-gray-500 break-all text-center">
                {pixCode.slice(0, 40)}....
              </div>
              <button onClick={copy} className={`mt-3 w-full border-2 py-3 rounded font-medium transition-colors ${copied ? "border-[#26aa99] text-[#26aa99]" : "border-[#ee4d2d] text-[#ee4d2d]"}`}>
                {copied ? "✅ Código Copiado!" : "Copiar Código Pix"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white mt-2 px-4 py-4">
        <p className="font-semibold mb-4">Por favor siga as instruções</p>
        {[
          "Copie o código Pix acima.",
          "Acesse o app do seu banco ou internet banking de preferência.",
          "Escolha pagar com o Pix, cole o código e finalize o pagamento.",
          "Seu pagamento será aprovado em alguns segundos.",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3 mb-4">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs text-gray-400 shrink-0 mt-0.5">{i + 1}</div>
            <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}