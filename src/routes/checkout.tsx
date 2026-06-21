import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Ticket, Coins, ChevronRight, HelpCircle, MapPin, CreditCard } from "lucide-react";
import drumImg from "@/assets/7.jpg.jpeg";

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>) => ({ q: Number(s.q) || 1 }),
  head: () => ({ meta: [{ title: "Comprar" }] }),
  component: Checkout,
});

function Checkout() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [pay, setPay] = useState<"pix" | "card" | null>("pix");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [cpf, setCpf] = useState("");

  const unitPix = 99.90;
  const unitFull = 99.90;
  const shipping = 0;
  const subtotal = unitFull * q;
  const pixDiscount = (unitFull - unitPix) * q;
  const total = subtotal + shipping - (pay === "pix" ? pixDiscount : 0);
  const brl = (v: number) => `R$${v.toFixed(2).replace(".", ",")}`;

  const handlePedido = () => {
    if (!name || !cpf || !phone || !email) {
      alert("Preencha nome, email, telefone e CPF para continuar!");
      return;
    }
    if (pay === "pix") {
      navigate({ to: "/pix", search: { total, name, email, cpf, phone, qty: q } });
    } else {
      navigate({ to: "/sucesso" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] mx-auto max-w-[480px] pb-24">
      <div className="sticky top-0 z-10 bg-white flex items-center px-3 py-3 border-b">
        <button onClick={() => navigate({ to: "/" })}><ArrowLeft size={22} className="text-[#ee4d2d]"/></button>
        <h1 className="flex-1 text-center text-lg font-medium pr-6">Comprar</h1>
      </div>

      {/* Endereço + CPF */}
      <div className="bg-white mt-2 px-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={18} className="text-[#ee4d2d]"/>
          <span className="font-medium">Endereço de entrega</span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input value={name} onChange={e => setName(e.target.value)} className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-[#ee4d2d]" placeholder="Nome completo" />
            <input value={phone} onChange={e => setPhone(e.target.value)} className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-[#ee4d2d]" placeholder="(00) 00000-0000" />
          </div>
          <input value={email} onChange={e => setEmail(e.target.value)} className="border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-[#ee4d2d]" placeholder="Email" />
          <input value={street} onChange={e => setStreet(e.target.value)} className="border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-[#ee4d2d]" placeholder="Rua, número" />
          <div className="flex gap-2">
            <input value={city} onChange={e => setCity(e.target.value)} className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-[#ee4d2d]" placeholder="Cidade" />
            <input value={uf} onChange={e => setUf(e.target.value)} className="w-20 border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-[#ee4d2d]" placeholder="UF" />
          </div>
          <input value={cep} onChange={e => setCep(e.target.value)} className="border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-[#ee4d2d]" placeholder="CEP" />
          <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
            <CreditCard size={16} className="text-gray-500"/>
            <input value={cpf} onChange={e => setCpf(e.target.value)} className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:border-[#ee4d2d]" placeholder="CPF (000.000.000-00)" />
          </div>
        </div>
      </div>

      {/* Produto com loja */}
      <div className="bg-white mt-2 px-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#ee4d2d] text-white text-xs px-1.5 py-0.5 rounded">Indicado</span>
          <span className="font-medium">MadeiraMadeira</span>
        </div>
        <div className="flex gap-3">
          <img src={drumImg} alt="" className="w-20 h-20 object-cover rounded bg-gray-100 shrink-0"/>
          <div className="flex-1">
            <div className="text-sm text-gray-700 leading-snug">Box Para Banheiro de PVC 185x130cm Sanfonado Frontal BCF Preto.</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-[#ee4d2d] font-semibold text-sm">R$</span>
              <span className="text-[#ee4d2d] text-xl font-bold">99,90</span>
            </div>
            <div className="text-[11px] text-gray-500">no Pix</div>
          </div>
          <div className="text-sm text-gray-500">x{q}</div>
        </div>
        <div className="mt-3 border-t border-gray-100 pt-3">
          <button className="w-full flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm">Cupom da loja</span>
            <span className="text-gray-400 text-sm flex items-center">Selecione ou insira o código <ChevronRight size={14}/></span>
          </button>
          <button className="w-full flex items-center justify-between py-2">
            <span className="text-sm">Mensagem para o vendedor:</span>
            <span className="text-gray-400 text-sm flex items-center">Digite aqui <ChevronRight size={14}/></span>
          </button>
        </div>
      </div>

      {/* Envio */}
      <div className="bg-white mt-2 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium">Opção de Envio</span>
          <span className="text-sm text-gray-500 flex items-center">Ver Mais <ChevronRight size={14}/></span>
        </div>
        <div className="border border-[#26aa99] rounded-md bg-[#f0faf8] p-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[18px] border-r-[18px] border-t-[#26aa99] border-r-transparent"/>
          <div className="flex justify-between">
            <div className="font-medium">Entrega Expressa</div>
            <div className="font-medium text-[#26aa99] font-semibold">GRÁTIS</div>
          </div>
          <div className="text-xs text-gray-600 mt-1">Chega entre 2 a 4 dias</div>
        </div>
      </div>

      {/* Total itens */}
      <div className="bg-white mt-2 px-4 py-3 flex justify-between">
        <span>Total de {q} {q===1?"item":"itens"}</span>
        <span className="font-medium">{brl(subtotal + shipping)}</span>
      </div>

      {/* Cupom + moedas */}
      <div className="bg-white mt-2">
        <button className="w-full flex items-center justify-between px-4 py-3 border-b">
          <span className="flex items-center gap-2"><Ticket size={18} className="text-[#ee4d2d]"/> Cupom de Desconto</span>
          <span className="text-gray-400 text-sm flex items-center">Selecione ou insira o código <ChevronRight size={14}/></span>
        </button>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="flex items-center gap-2"><Coins size={18} className="text-yellow-500"/> Sem moedas para aplicar <HelpCircle size={14} className="text-gray-400"/></span>
        </div>
      </div>

      {/* Pagamento */}
      <div className="bg-white mt-2 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Métodos de pagamento</span>
          <span className="text-sm text-gray-500 flex items-center">Ver Mais <ChevronRight size={14}/></span>
        </div>
        {[
          { id: "pix", label: "Pix", icon: "💠" },
          { id: "card", label: "Cartão de Crédito", icon: "💳", sub: "Selecionar parcelas" },
        ].map((m) => (
          <button key={m.id} onClick={() => setPay(m.id as "pix"|"card")} className="w-full flex items-center justify-between py-3 border-b last:border-0">
            <div className="flex items-center gap-3">
              <span className="text-xl">{m.icon}</span>
              <div className="text-left">
                <div>{m.label}</div>
                {m.sub && <div className="text-blue-500 text-xs">{m.sub}</div>}
              </div>
            </div>
            <span className={`w-5 h-5 rounded-full border-2 ${pay===m.id?"border-[#ee4d2d]":"border-gray-300"} flex items-center justify-center`}>
              {pay===m.id && <span className="w-2.5 h-2.5 rounded-full bg-[#ee4d2d]"/>}
            </span>
          </button>
        ))}
        <div className="text-right text-xs text-gray-500 mt-2">Processado por <span className="text-[#ee4d2d] font-medium">ShopeePay</span></div>
      </div>

      {/* Detalhes */}
      <div className="bg-white mt-2 px-4 py-3 text-sm">
        <div className="font-medium mb-2">Detalhes de Pagamento</div>
        <Row label="Total dos Produtos" v={brl(subtotal)}/>
        <Row label="Total do Frete" v="GRÁTIS" />
        {pay==="pix" && <Row label="Desconto Pix" v={`-${brl(pixDiscount)}`} red/>}
        <Row label="Pagamento Total" v={brl(total)} bold/>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[480px] bg-white border-t flex items-center justify-between px-4 py-3 z-20">
        <div>
          <div className="text-sm">Total <span className="text-[#ee4d2d] font-bold">{brl(total)}</span></div>
          {pay==="pix" && <div className="text-xs text-[#ee4d2d]">Economizou {brl(pixDiscount)}</div>}
        </div>
        <button onClick={handlePedido} className="bg-[#ee4d2d] text-white px-6 py-3 rounded-full font-medium">
          FAZER PEDIDO
        </button>
      </div>
    </div>
  );
}

function Row({ label, v, bold, red }: { label: string; v: string; bold?: boolean; red?: boolean }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-gray-600">{label}</span>
      <span className={`${bold?"font-semibold":""} ${red?"text-[#ee4d2d]":""}`}>{v}</span>
    </div>
  );
}