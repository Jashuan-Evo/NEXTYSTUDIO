// NEXTYSTUDIO store settings — edit these values for your real shop.
const WHATSAPP_NUMBER = "6283165222486"; // WhatsApp NEXTYSTUDIO

const products = [
  {id:"acc-level-5",category:"account",type:"ACCOUNT",name:"Pixel Worlds Account",description:"Level 5 account • Gmail included.",price:"SET PRICE",badge:"AVAILABLE",icon:"◈"},
  {id:"byte-coin",category:"bytecoin",type:"BYTE COIN",name:"Byte Coin",description:"Pixel Worlds Byte Coin. Ask for current stock.",price:"SET PRICE",badge:"AVAILABLE",icon:"✧"},
  {id:"bulk-account",category:"account",type:"ACCOUNT",name:"Bulk Account Stock",description:"Multiple accounts available. Contact us for details.",price:"SET PRICE",badge:"BULK STOCK",icon:"▣"}
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
let activeCategory = "all";

function renderProducts(){
  const q = searchInput.value.trim().toLowerCase();
  const visible = products.filter(p => (activeCategory==="all" || p.category===activeCategory) &&
    (p.name+" "+p.description+" "+p.type).toLowerCase().includes(q));
  grid.innerHTML = visible.length ? visible.map((p,i)=>`
    <article class="product-card" style="animation-delay:${i*80}ms">
      <div class="product-top"><span class="product-type">${p.type}</span><span class="product-badge">${p.badge}</span></div>
      <div class="product-icon">${p.icon}</div><h3>${p.name}</h3><p>${p.description}</p>
      <div class="product-bottom"><span class="product-price">PRICE : ${p.price}</span><button class="order-button" data-order="${p.id}">ORDER NOW ↗</button></div>
    </article>`).join("") : `<div class="empty-state">No products found. Try another search.</div>`;
}

function orderProduct(id){
  const p = products.find(item=>item.id===id);
  if(!p) return;
  const message = `Hello NEXTYSTUDIO, I'm interested in:\nProduct: ${p.name}\nCategory: ${p.type}\nPlease send me the details and price.`;
  if(!WHATSAPP_NUMBER){
    showToast("Set your WhatsApp number in script.js to activate orders.");
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");
}
function showToast(message){
  const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");
  clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),3200);
}
grid.addEventListener("click",e=>{const btn=e.target.closest("[data-order]");if(btn)orderProduct(btn.dataset.order)});
document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  btn.classList.add("active");activeCategory=btn.dataset.category;renderProducts();
}));
searchInput.addEventListener("input",renderProducts);
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
renderProducts();
