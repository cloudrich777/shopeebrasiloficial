import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft, Search, MessageCircle, Share2, ShoppingCart, MoreVertical,
  Heart, Truck, Ticket, Trophy, Star, ChevronRight, MessageSquare, X, Minus, Plus,
  ThumbsUp
} from "lucide-react";
import { useState, useEffect } from "react";
import drumImg from "@/assets/bateria1.jfif";
import accImg from "@/assets/bateria2.jfif";
import lifeImg from "@/assets/bateria3.jfif";
import bat4Img from "@/assets/bateria4.jfif";
import bat5Img from "@/assets/bateria5.jfif";
import review1 from "@/assets/review1.jfif";
import review2 from "@/assets/review2.jfif";
import review3 from "@/assets/review3.jfif";
import review4 from "@/assets/review4.jfif";
import review5 from "@/assets/review5.jfif";
import review6 from "@/assets/review6.jfif";
import review7 from "@/assets/review7.jfif";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bateria Eletrônica Musical 9 Pads 6 Drums - AB Shop" },
      { name: "description", content: "Bateria Eletrônica Musical 9 Pads 6 Drums 5 Metal 2 Pedais e 2 Baquetas. Frete grátis com cupom." },
    ],
  }),
  component: ProductPage,
});

const IMAGES = [drumImg, accImg, lifeImg, bat4Img, bat5Img];

function ProductPage() {
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState(600);
  const [imgIdx, setImgIdx] = useState(0);
  const [liked, setLiked] = useState(false);
  const [sheet, setSheet] = useState<null | "buy" | "cart">(null);
  const [qty, setQty] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setVoucher(v => v <= 0 ? 0 : v - 1), 1000);
    return () => clearInterval(id);
  }, []);

  const openSheet = (kind: "buy" | "cart") => { setQty(1); setSheet(kind); };

  const confirm = () => {
    if (sheet === "buy") {
      navigate({ to: "/checkout", search: { q: qty } });
    } else {
      setSheet(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-20 mx-auto max-w-[480px] text-[15px]">
      {/* Top icons overlay */}
      <div className="absolute top-0 left-0 right-0 mx-auto max-w-[480px] z-20 flex items-center justify-between p-3">
        <button onClick={() => history.back()} aria-label="Voltar" className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <button className="relative w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"><MessageCircle size={18}/></button>
          <button className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"><Share2 size={18}/></button>
          <button className="relative w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center">
            <ShoppingCart size={18}/>
            <span className="absolute -top-1 -right-1 bg-[#ee4d2d] text-white text-[10px] rounded-full px-1.5 py-[1px]">99+</span>
          </button>
          <button className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"><MoreVertical size={18}/></button>
        </div>
      </div>

      {/* Image gallery */}
<div
  className="relative bg-white overflow-hidden select-none cursor-grab active:cursor-grabbing"
  onMouseDown={e => {
    const el = e.currentTarget;
    el.dataset.startX = String(e.clientX);
    el.dataset.dragging = "1";
  }}
  onMouseMove={e => {
    if (e.currentTarget.dataset.dragging !== "1") return;
    e.preventDefault();
  }}
  onMouseUp={e => {
    const el = e.currentTarget;
    if (el.dataset.dragging !== "1") return;
    el.dataset.dragging = "0";
    const dx = e.clientX - Number(el.dataset.startX);
    console.log("dx:", dx);
    if (dx < -40) setImgIdx(i => Math.min(i + 1, IMAGES.length - 1));
    if (dx > 40) setImgIdx(i => Math.max(i - 1, 0));
  }}
  onMouseLeave={e => { e.currentTarget.dataset.dragging = "0"; }}
  onTouchStart={e => { e.currentTarget.dataset.startX = String(e.touches[0].clientX); }}
  onTouchMove={e => e.preventDefault()}
  onTouchEnd={e => {
    const dx = e.changedTouches[0].clientX - Number(e.currentTarget.dataset.startX);
    if (dx < -40) setImgIdx(i => Math.min(i + 1, IMAGES.length - 1));
    if (dx > 40) setImgIdx(i => Math.max(i - 1, 0));
  }}
>
  <img
    src={IMAGES[imgIdx]}
    alt="Produto"
    className="w-full aspect-square object-contain pointer-events-none"
    draggable={false}
  />
  <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">{imgIdx+1}/{IMAGES.length}</span>
</div>
{/* Voucher bar */}
<div className="flex items-center justify-between bg-[#ee4d2d] px-4 py-2">
  <div className="flex items-center gap-2">
    <Ticket size={16} className="text-white" />
    <span className="text-white text-sm font-semibold">OFERTA RELÂMPAGO⚡</span>
  </div>
  <div className="flex items-center gap-1">
    {["00", String(Math.floor(voucher/60)).padStart(2,"0"), String(voucher%60).padStart(2,"0")].map((v, i) => (
      <span key={i} className="flex items-center gap-1">
        <span className="bg-black text-white text-xs font-bold px-1.5 py-0.5 rounded">{v}</span>
        {i < 2 && <span className="text-white font-bold">:</span>}
      </span>
    ))}
  </div>
</div>
      {/* Price */}
      <div className="bg-white px-4 pt-3 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[#ee4d2d] text-lg font-semibold">R$</span>
              <span className="text-[#ee4d2d] text-3xl font-bold leading-none">99,90</span>
              <button className="text-[#ee4d2d] text-sm ml-1 flex items-center">no Pix <ChevronRight size={14}/></button>
            </div>
            <button className="text-xs text-gray-600 mt-1 flex items-center">Ou R$149,00 em até 5x R$29,98 <ChevronRight size={12}/></button>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-sm text-gray-700">2mil+ Vendido(s)</span>
            <button onClick={() => setLiked(!liked)} aria-label="Favoritar">
              <Heart size={22} className={liked ? "fill-[#ee4d2d] text-[#ee4d2d]" : "text-gray-500"} />
            </button>
          </div>
        </div>
        <h1 className="mt-2 text-[15px] leading-snug">
          <span className="bg-[#ee4d2d] text-white text-xs px-1.5 py-0.5 rounded mr-1 align-middle">Indicado</span>
          Bateria Eletrônica Musical 9 Pads 6 Drums 5 Metal 2 Pedais e 2 Baquetas
        </h1>
      </div>

      {/* Frete */}
      <div className="mt-2 bg-white">
        <button className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm">
            <Truck size={18} className="text-[#26aa99]" />
            <span className="text-[#26aa99] font-medium">Frete grátis</span>
            <span className="line-through text-gray-400">R$29,94</span>
            <span className="text-gray-700">R$0,00 com cupom</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm">
            <Ticket size={18} className="text-[#ee4d2d]" />
            <span>SParcelado: R$150 OFF em cupons</span>
          </div>
          <ChevronRight size={16} className="text-gray-400"/>
        </button>
        <button className="w-full flex items-center justify-between px-4 py-3 bg-[#fff4f1]">
          <div className="flex items-center gap-2 text-sm text-[#ee4d2d] font-medium">
            <Trophy size={18} />
            <span>No. 1 Mais Vendidos em Bateria Eletrônica Digital</span>
          </div>
          <ChevronRight size={16} className="text-[#ee4d2d]"/>
        </button>
      </div>

      {/* Reviews */}
      <div className="mt-2 bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">4.9</span>
            <Star size={18} className="fill-yellow-400 text-yellow-400" />
            <span className="font-medium">Avaliações do produto</span>
            <span className="text-gray-500 text-sm">(1,1mil)</span>
          </div>
          <button className="text-sm text-gray-500 flex items-center">Ver mais <ChevronRight size={14}/></button>
        </div>

        {[
          {
            name: "deborabelss",
            date: "25-08-2025",
            stars: 5,
            text: "Envio super rápido, no mesmo dia da compra e olha que foi num sábado! Quanto ao material ótimo, som ótimo! Meu filho adorou, já está aprendendo as primeiras batidas. Recomendo demais!",
            images: [review1],
            useful: 902,
          },
          {
            name: "carlos.silva88",
            date: "12-10-2025",
            stars: 5,
            text: "Produto muito bem embalado, chegou antes do prazo. A qualidade dos pads de silicone é surpreendente, responde muito bem ao toque. Os pedais também são firmes. Excelente custo-benefício!",
            images: [review2, review3],
            useful: 634,
          },
          {
            name: "mariana_t",
            date: "28-04-2026",
            stars: 5,
            text: "Comprei para presentear meu sobrinho e ele ficou encantado! A bateria é leve, fácil de transportar e conecta facilmente no celular. O app ajuda bastante nos primeiros passos. Lindo presente!",
            images: [review4],
            useful: 521,
          },
          {
            name: "joao_batera",
            date: "08-03-2026",
            stars: 4,
            text: "Muito boa para praticar em casa sem incomodar os vizinhos. O som é limpo e os timbres são variados. Só acho que o cabo poderia ser um pouco maior, mas nada que atrapalhe. Valeu a pena!",
            images: [review5, review6, review7],
            useful: 418,
          },
        ].map((r, i) => (
          <div key={i} className={`mt-3 pt-3 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                {r.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-[10px] text-gray-400">{r.date}</div>
              </div>
              <button className="text-xs text-gray-500 flex items-center gap-1">
                <ThumbsUp size={12} /> Útil ({r.useful})
              </button>
            </div>
            <div className="flex text-yellow-400">
              {Array.from({length:5}).map((_,si)=><Star key={si} size={12} className={si < r.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}/>)}
            </div>
            <p className="text-sm mt-1.5 text-gray-800 leading-relaxed">{r.text}</p>
            {r.images.length > 0 && (
              <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                {r.images.map((img, ii) => (
                  <img key={ii} src={img} alt="Foto da avaliação" className="w-20 h-20 rounded object-cover bg-gray-100 shrink-0" loading="lazy" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Store */}
      <div className="mt-2 bg-white px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-yellow-400 font-bold text-xs">AB</div>
          <div className="flex-1">
            <div className="font-medium">ABSHOPCOM</div>
            <div className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"/> Online
            </div>
          </div>
          <button className="border border-[#ee4d2d] text-[#ee4d2d] text-sm px-4 py-1.5 rounded">Ver loja</button>
        </div>
        <div className="grid grid-cols-3 mt-4 text-center">
          <div><div className="font-medium">4,9</div><div className="text-xs text-gray-500">Avaliação</div></div>
          <div><div className="font-medium">55</div><div className="text-xs text-gray-500">Produtos</div></div>
          <div><div className="font-medium">100%</div><div className="text-xs text-gray-500">Tempo de resposta</div></div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-2 bg-white px-4 py-4">
        <h2 className="font-medium mb-2">Descrição</h2>
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
{`Bateira Eletrônica 6 Drums 5 Metal Silicone Portátil com Pedal e Baquetas

Alto falante: Não (Sem alto-falante, você precisa conectá-lo com uma caixa de som ou fone de ouvido para aproveitar o som)
1 par de baquetas

Peso e medidas (aproximados)
Medidas do produto: 48 x 30 cm (largura x comprimento)
Comprimento do cabo fone: 1,2 m
Medidas da embalagem: 14 x 33 x 50 cm
Peso: 1,97 Kg

CONTEM:
01 - Bateira Eletrônica 6 Drums 5 Metal Silicone Portátil C Pedal

Itens inclusos: 1 Bateria Eletrônica, 2 Baqueta, 2 Pedal, 1 Fonte de Alimentação, 1 Cabo Usb, 2 Cabo P2, 1 Manual (inglês)`}
        </p>
      </div>

      {/* Bottom bar */}
<div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[480px] bg-white border-t flex z-30">
  <button className="flex-1 flex items-center justify-center py-3 bg-[#26aa99]">
    <MessageSquare size={22} className="text-white"/>
  </button>
  
  <button onClick={() => openSheet("cart")} className="flex-1 flex items-center justify-center py-3 bg-[#26aa99]">
    <ShoppingCart size={22} className="text-white"/>
  </button>
  <button onClick={() => openSheet("buy")} className="flex-[2] bg-[#ee4d2d] text-white flex flex-col items-center justify-center py-1.5">
  <span className="text-xs font-normal">Compre com cupom</span>
  <span className="text-base font-bold leading-tight">R$99,90</span>
</button>
</div>

      {/* Bottom sheet */}
      {sheet && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-end justify-center" onClick={() => setSheet(null)}>
          <div className="bg-white w-full max-w-[480px] rounded-t-2xl p-4 pb-24" onClick={e => e.stopPropagation()}>
            <div className="flex gap-3">
              <img src={drumImg} alt="" className="w-24 h-24 rounded object-cover bg-gray-100" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[#ee4d2d] font-semibold">R$</span>
                      <span className="text-[#ee4d2d] text-2xl font-bold leading-none">99,90</span>
                      <span className="text-[#ee4d2d] text-sm">no Pix</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Ou R$159,90 com outros métodos de pagamento</div>
                  </div>
                  <button onClick={() => setSheet(null)}><X size={20}/></button>
                </div>
                <div className="text-sm text-gray-600 mt-3">Estoque: 775</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <span>Quantidade</span>
              <div className="flex items-center border rounded">
                <button onClick={() => setQty(Math.max(1, qty-1))} className="w-9 h-9 flex items-center justify-center"><Minus size={14}/></button>
                <span className="w-10 text-center border-x py-1">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="w-9 h-9 flex items-center justify-center"><Plus size={14}/></button>
              </div>
            </div>
            <button onClick={confirm} className="fixed bottom-0 left-0 right-0 mx-auto max-w-[480px] bg-[#ee4d2d] text-white py-4 font-medium">
              {sheet === "buy" ? "Compre agora" : "Adicionar ao Carrinho"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
