const API = "http://127.0.0.1:8000/api/orders/";
const menuData = [
  {id:1,name:"Espresso Shot",cat:"espresso",price:149},
  {id:2,name:"Cappuccino",cat:"espresso",price:199},
  {id:3,name:"Latte Vanilla",cat:"latte",price:229},
  {id:4,name:"Cold Brew",cat:"cold",price:179},
  {id:5,name:"Mocha Delight",cat:"latte",price:249},
  {id:6,name:"Americano",cat:"espresso",price:129},
  {id:7,name:"Caramel Macchiato",cat:"latte",price:269},
  {id:8,name:"Iced Americano",cat:"cold",price:159},
];

let cart=[], total=0, isPlaying=false, currentSong=0, myFile=null;
const playlist = [
  {name:"Kadalalle - Dear Comrade", online:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"},
  {name:"Cozy Cafe Jazz", online:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"},
  {name:"Lo-fi Beats", online:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"}
];

function loadSong(n){
  currentSong=n;
  let a=document.getElementById("brewMusic");
  if(n==0 && myFile) a.src=URL.createObjectURL(myFile);
  else a.src=playlist[n].online;
  document.getElementById("songName").innerText=playlist[n].name;
  if(isPlaying) a.play();
}
function toggleMusic(){
  let a=document.getElementById("brewMusic");
  if(isPlaying){ a.pause(); document.getElementById("playPauseBtn").innerText="▶️ Play"; isPlaying=false; }
  else{ if(!a.src) loadSong(0); a.play(); document.getElementById("playPauseBtn").innerText="⏸️ Pause"; isPlaying=true; }
}
function nextSong(){ isPlaying=true; loadSong((currentSong+1)%3); }
function prevSong(){ isPlaying=true; loadSong((currentSong-1+3)%3); }
function pickFile(input){ myFile=input.files[0]; loadSong(0); toggleMusic(); toggleMusic(); }

// SEARCH WORKS
function openSearch(){ document.getElementById("searchBox").style.display="block"; }
function doSearch(q){ q=q.toLowerCase(); let h=""; menuData.filter(m=>m.name.toLowerCase().includes(q)).forEach(i=>{ let inC=cart.find(c=>c.id===i.id); h+=`<div class="card"><div class="img">☕</div><div class="info"><h4>${i.name}</h4><div class="price"><b>₹${i.price}</b><button class="add ${inC?'added':''}" onclick="addToCart(${i.id})">${inC?'ADDED':'ADD'}</button></div></div></div>`; }); document.getElementById("menu").innerHTML=h; }

// CART - ITEMS ADDING 100% FIXED
function openCart(){ document.getElementById("cartDrawer").style.display="block"; document.getElementById("overlay").style.display="block"; }
function closeCart(){ document.getElementById("cartDrawer").style.display="none"; document.getElementById("overlay").style.display="none"; }
function renderMenu(f="all"){
  let h="";
  menuData.filter(m=>f==="all"||m.cat===f).forEach(i=>{
    let inCart=cart.find(c=>c.id===i.id);
    h+=`<div class="card"><div class="img">☕</div><div class="info"><h4>${i.name}</h4><div class="price"><b>₹${i.price}</b><button class="add ${inCart?'added':''}" onclick="addToCart(${i.id})">${inCart?'ADDED ✓':'ADD +'}</button></div></div></div>`;
  });
  document.getElementById("menu").innerHTML=h;
}
function filterCat(c){ document.querySelectorAll(".cat").forEach(b=>b.classList.remove("active")); event.target.classList.add("active"); renderMenu(c); }

function addToCart(id){
  let item=menuData.find(m=>m.id===id);
  if(!cart.find(c=>c.id===id)){
    cart.push(item);
    total+=item.price;
    updateCart();
    renderMenu();
    openCart();
    if(!isPlaying) toggleMusic();
  }
}
function updateCart(){
  document.getElementById("cartCount").innerText=cart.length;
  document.getElementById("total").innerText=total;
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(c=>`• ${c.name} - ₹${c.price}`).join("<br>"):"No items";
}

async function placeOrder(){
  if(!cart.length) return alert("First ADD items!");
  let name=document.getElementById("cname").value||"Deepthi";
  let body={customer_name:name, temperature:85, recipe:cart[0].id};
  let r=await fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  if(r.ok){ document.getElementById("msg").innerText="✅ Order Placed!"; cart=[];total=0;updateCart();loadOrders(); }
}
async function loadOrders(){ try{ let r=await fetch(API); let d=await r.json(); document.getElementById("orders").innerHTML=d.slice(-3).map(o=>`☕ ${o.customer_name}`).join("<br>"); }catch(e){} }

renderMenu(); loadSong(0);