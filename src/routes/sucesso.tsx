import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/sucesso")({
  head: () => ({ meta: [{ title: "Pedido realizado" }] }),
  component: Success,
});

function Success() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] mx-auto max-w-[480px] flex flex-col items-center justify-center p-6 text-center">
      <CheckCircle2 size={80} className="text-[#26aa99]"/>
      <h1 className="text-xl font-semibold mt-4">Pedido realizado!</h1>
      <p className="text-gray-600 mt-2 text-sm">Seu pedido foi recebido e está sendo processado.</p>
      <Link to="/" className="mt-8 bg-[#ee4d2d] text-white px-6 py-3 rounded font-medium">Voltar à loja</Link>
    </div>
  );
}