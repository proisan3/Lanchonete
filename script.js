/* ============================================================
   CONFIGURAÇÃO EDITÁVEL
   ============================================================ */
const CONFIG = {
  // Número com código do país e DDD, só dígitos. Ex.: 5511999999999
  whatsapp: "5500000000000",
  whatsappExibicao: "",   // Ex.: "(11) 99999-9999"
  endereco: "",           // Ex.: "Rua Exemplo, 123 - Bairro"
  instagram: "",          // Ex.: "@maonamassa"
  horario: ""             // Ex.: "Ter a Dom, 18h às 23h"
};

/* Hambúrgueres. Edite nome, descrição, ingredientes e preço.
   "destaque: true" faz o item aparecer em "Os mais pedidos". */
const HAMBURGUERES = [
  { nome: "Mão na Massa", descricao: "O clássico da casa.", ingredientes: "Hambúrguer artesanal, queijo, alface, tomate e molho especial.", preco: 25.90, imagem: "assets/images/hamburguer-artesanal.jpg", pos: "center", destaque: true },
  { nome: "Bacon Massa", descricao: "Para quem ama bacon.", ingredientes: "Hambúrguer artesanal, queijo cheddar, bacon crocante e molho especial.", preco: 29.90, imagem: "assets/images/hamburguer-bacon.jpg", pos: "center", destaque: true },
  { nome: "Duplo Massa", descricao: "Dobro de carne, dobro de queijo.", ingredientes: "Dois hambúrgueres artesanais, queijo duplo e molho especial.", preco: 34.90, imagem: "assets/images/hamburguer-chapa.jpg", pos: "center", destaque: true },
  { nome: "Massa Especial", descricao: "O mais completo do cardápio.", ingredientes: "Hambúrguer artesanal, queijo, bacon, cebola caramelizada e molho da casa.", preco: 32.90, imagem: "assets/images/hamburguer-cheddar.jpg", pos: "center", destaque: true },
  { nome: "Cheddar Massa", descricao: "Cremoso e bem servido.", ingredientes: "Hambúrguer artesanal, cheddar cremoso, cebola roxa e molho especial.", preco: 28.90, imagem: "assets/images/hamburguer-bacon.jpg", pos: "top" },
  { nome: "Salada Massa", descricao: "Leve e cheio de frescor.", ingredientes: "Hambúrguer artesanal, queijo, alface, tomate, cebola roxa e molho especial.", preco: 27.90, imagem: "assets/images/hamburguer-preparo.jpg", pos: "center" }
];

/* ============================================================
   CÓDIGO (não precisa editar daqui para baixo)
   ============================================================ */
const brl = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const zapLink = texto => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function cardHTML(h) {
  return `
    <article class="card reveal">
      <img src="${esc(h.imagem)}" alt="Hambúrguer ${esc(h.nome)}" style="object-position:${esc(h.pos || "center")}" loading="lazy" width="780" height="585">
      <div class="card__body">
        <h3>${esc(h.nome)}</h3>
        <p>${esc(h.descricao)}</p>
        <p class="ing">${esc(h.ingredientes)}</p>
        <div class="card__foot">
          <span class="price">${brl(h.preco)}</span>
          <a class="btn btn--red" target="_blank" rel="noopener" href="${zapLink(`Olá! Gostaria de pedir o ${h.nome}.`)}" aria-label="Pedir ${esc(h.nome)} pelo WhatsApp">Pedir</a>
        </div>
      </div>
    </article>`;
}

document.getElementById("destaques").innerHTML = HAMBURGUERES.filter(h => h.destaque).map(cardHTML).join("");
document.getElementById("cardapio-lista").innerHTML = HAMBURGUERES.map(cardHTML).join("");

// Botões gerais de WhatsApp
document.querySelectorAll("[data-whatsapp]").forEach(a => {
  a.href = zapLink("Olá! Gostaria de fazer um pedido.");
  a.target = "_blank";
  a.rel = "noopener";
});

// Campos de contato (mostra aviso se ainda não preenchido)
const vazio = "Em breve";
const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v || vazio; };
set("info-endereco", CONFIG.endereco);
set("info-whatsapp", CONFIG.whatsappExibicao);
set("info-instagram", CONFIG.instagram);
set("info-horario", CONFIG.horario);
set("foot-endereco", CONFIG.endereco);
set("foot-whatsapp", CONFIG.whatsappExibicao);
set("foot-instagram", CONFIG.instagram);

// Menu mobile
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
function toggleMenu(open) {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}
burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("open")));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => toggleMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") toggleMenu(false); });

// Entrada suave dos cards
const els = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  els.forEach(el => io.observe(el));
} else {
  els.forEach(el => el.classList.add("in"));
}
