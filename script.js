// NEXTYSTUDIO store settings — edit these values for your real shop.
const WHATSAPP_NUMBER = "6283165222486"; // WhatsApp NEXTYSTUDIO

const products = [
  {id:"acc-level-5",category:"account",type:"ACCOUNT",name:"Pixel Worlds Account Level 5",description:"Level 5 account • Gmail included.",price:"Rp10.000",badge:"AVAILABLE",icon:"◈"},
  {id:"byte-coin",category:"bytecoin",type:"BYTE COIN",name:"Byte Coin",description:"Harga per 1K Byte Coin.",price:"Rp2.500–Rp3.000 / 1K",badge:"AVAILABLE",icon:"✧"},
  {id:"level-1-account",category:"account",type:"ACCOUNT",name:"Pixel Worlds Account Level 1",description:"Level 1 account.",price:"Rp7.000",badge:"AVAILABLE",icon:"▣"}
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
let activeCategory = "all";
const quantities = Object.fromEntries(products.map(p => [p.id, 1]));

function renderProducts(){
  const q = searchInput.value.trim().toLowerCase();
  const visible = products.filter(p => (activeCategory==="all" || p.category===activeCategory) &&
    (p.name+" "+p.description+" "+p.type).toLowerCase().includes(q));
  grid.innerHTML = visible.length ? visible.map((p,i)=>`
    <article class="product-card" style="animation-delay:${i*80}ms">
      <div class="product-top"><span class="product-type">${p.type}</span><span class="product-badge">${p.badge}</span></div>
      <div class="product-icon">${p.icon}</div><h3>${p.name}</h3><p>${p.description}</p>
      <div class="product-price">PRICE : ${p.price}</div>
      <div class="product-bottom">
        <div class="quantity-control" aria-label="Jumlah produk">
          <button class="quantity-button" data-qty-minus="${p.id}" aria-label="Kurangi jumlah">−</button>
          <span class="quantity-value">${quantities[p.id]}</span>
          <button class="quantity-button" data-qty-plus="${p.id}" aria-label="Tambah jumlah">+</button>
        </div>
        <button class="order-button" data-order="${p.id}">ORDER NOW ↗</button>
      </div>
    </article>`).join("") : `<div class="empty-state">No products found. Try another search.</div>`;
}

function orderProduct(id){
  const p = products.find(item=>item.id===id);
  if(!p) return;
  const message = `Halo, saya mau beli ${quantities[id]} ${p.name}.`;
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
grid.addEventListener("click",e=>{
  const plus=e.target.closest("[data-qty-plus]");
  const minus=e.target.closest("[data-qty-minus]");
  const order=e.target.closest("[data-order]");
  if(plus){const id=plus.dataset.qtyPlus;quantities[id]=Math.min(99,quantities[id]+1);renderProducts();return;}
  if(minus){const id=minus.dataset.qtyMinus;quantities[id]=Math.max(1,quantities[id]-1);renderProducts();return;}
  if(order)orderProduct(order.dataset.order);
});
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
