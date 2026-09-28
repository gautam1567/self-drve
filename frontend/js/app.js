const defaultVehicles=[
{id:1,name:"Hyundai Creta",type:"car",price:2500,location:"Dehradun",fuel:"Diesel",transmission:"Automatic",seats:5,image:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80",lat:30.3165,lng:78.0322,description:"Comfortable SUV for city drives and weekend trips."},
{id:2,name:"Royal Enfield Classic 350",type:"bike",price:1200,location:"Dehradun",fuel:"Petrol",transmission:"Manual",seats:2,image:"https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80",lat:30.3256,lng:78.0435,description:"Classic motorcycle for scenic mountain rides."},
{id:3,name:"Tata Nexon",type:"car",price:1800,location:"Rishikesh",fuel:"Petrol",transmission:"Manual",seats:5,image:"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80",lat:30.0869,lng:78.2676,description:"Compact SUV with practical space for everyday travel."},
{id:4,name:"KTM Duke 250",type:"bike",price:1500,location:"Haridwar",fuel:"Petrol",transmission:"Manual",seats:2,image:"https://images.unsplash.com/photo-1558980394-0c7e9d3c4f7d?auto=format&fit=crop&w=1000&q=80",lat:29.9457,lng:78.1642,description:"Sporty bike for riders who want a lively self-drive experience."}
];

let vehicles=JSON.parse(localStorage.getItem("selfdrveVehicles")||"null")||defaultVehicles;
let map, markers=[];

document.addEventListener("DOMContentLoaded",()=>{
  const today=new Date().toISOString().split("T")[0];
  document.getElementById("pickupInput").value=today;
  const tomorrow=new Date(Date.now()+86400000).toISOString().split("T")[0];
  document.getElementById("returnInput").value=tomorrow;
  renderVehicles(vehicles); initMap();
});

function renderVehicles(list){
 const grid=document.getElementById("vehicleGrid");
 grid.innerHTML=list.length?list.map(v=>`
 <div class="col-md-6 col-lg-3"><div class="vehicle-card">
   <div class="vehicle-img"><img src="${v.image}" alt="${v.name}" onerror="this.style.display='none'"><span class="vehicle-type">${v.type.toUpperCase()}</span></div>
   <div class="vehicle-info">
    <h4>${v.name}</h4><div class="vehicle-meta mb-3"><i class="bi bi-geo-alt"></i> ${v.location} · ${v.transmission}</div>
    <div class="d-flex justify-content-between align-items-center"><div><span class="price">₹${Number(v.price).toLocaleString("en-IN")}</span><small class="text-muted"> / day</small></div><button class="btn btn-dark rounded-pill" onclick="showVehicle(${v.id})">View</button></div>
   </div></div></div>`).join(""):`<div class="col-12"><div class="alert alert-light">No vehicles match your search.</div></div>`;
}

function searchVehicles(){
 const loc=document.getElementById("locationInput").value.trim().toLowerCase();
 const type=document.getElementById("typeInput").value;
 const list=vehicles.filter(v=>(!loc||v.location.toLowerCase().includes(loc)||v.name.toLowerCase().includes(loc))&&(type==="all"||v.type===type));
 renderVehicles(list);
 document.getElementById("vehicles").scrollIntoView({behavior:"smooth"});
}

function showVehicle(id){
 const v=vehicles.find(x=>x.id===id); if(!v)return;
 document.getElementById("vehicleModalContent").innerHTML=`
 <div class="detail-img"><img src="${v.image}" alt="${v.name}"></div>
 <div class="p-4"><div class="d-flex justify-content-between"><div><span class="eyebrow dark">${v.type.toUpperCase()}</span><h3>${v.name}</h3><p class="text-muted">${v.location}</p></div><div class="text-end"><div class="price">₹${Number(v.price).toLocaleString("en-IN")}</div><small>/ day</small></div></div>
 <div class="row g-2 my-3"><div class="col-4"><div class="p-3 bg-light rounded-3"><small>Fuel</small><br><strong>${v.fuel}</strong></div></div><div class="col-4"><div class="p-3 bg-light rounded-3"><small>Gear</small><br><strong>${v.transmission}</strong></div></div><div class="col-4"><div class="p-3 bg-light rounded-3"><small>Seats</small><br><strong>${v.seats}</strong></div></div></div>
 <p>${v.description}</p><div class="d-flex gap-2"><button class="btn btn-outline-dark rounded-pill flex-fill" onclick="enquire(${v.id})">Send enquiry</button><button class="btn btn-dark rounded-pill flex-fill" onclick="bookVehicle(${v.id})">Book now</button></div></div>`;
 new bootstrap.Modal(document.getElementById("vehicleModal")).show();
}

function enquire(id){
 const message=prompt("Enter your enquiry:");
 if(!message)return;
 const enquiries=JSON.parse(localStorage.getItem("selfdrveEnquiries")||"[]");
 enquiries.push({vehicleId:id,message,date:new Date().toISOString()});
 localStorage.setItem("selfdrveEnquiries",JSON.stringify(enquiries));
 alert("Enquiry submitted. The owner can respond from the dealer dashboard.");
}

function bookVehicle(id){
 const v=vehicles.find(x=>x.id===id); const pickup=document.getElementById("pickupInput").value; const ret=document.getElementById("returnInput").value;
 if(!pickup||!ret){alert("Please select pickup and return dates.");return}
 const days=Math.max(1,Math.ceil((new Date(ret)-new Date(pickup))/86400000));
 const total=days*v.price;
 const bookings=JSON.parse(localStorage.getItem("selfdrveBookings")||"[]");
 bookings.push({vehicleId:id,pickup,returnDate:ret,total,status:"Pending",createdAt:new Date().toISOString()});
 localStorage.setItem("selfdrveBookings",JSON.stringify(bookings));
 alert(`Booking request submitted for ${v.name}. Estimated total: ₹${total.toLocaleString("en-IN")}`);
}

function loginDemo(){
 const name=document.getElementById("authName").value.trim();
 const email=document.getElementById("authEmail").value.trim();
 if(!name||!email){alert("Please enter your name and email.");return}
 localStorage.setItem("selfdrveUser",JSON.stringify({name,email}));
 bootstrap.Modal.getInstance(document.getElementById("authModal")).hide();
 alert(`Welcome, ${name}! Demo login successful.`);
}

function listVehicle(){
 const v={id:Date.now(),name:document.getElementById("ownerVehicle").value,type:document.getElementById("ownerType").value,price:Number(document.getElementById("ownerPrice").value),location:document.getElementById("ownerLocation").value||"Dehradun",fuel:"Petrol",transmission:"Manual",seats:2,image:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80",lat:30.3165,lng:78.0322,description:document.getElementById("ownerDescription").value||"Owner listed vehicle."};
 if(!v.name||!v.price){alert("Vehicle name and price are required.");return}
 vehicles.push(v);localStorage.setItem("selfdrveVehicles",JSON.stringify(vehicles));renderVehicles(vehicles);bootstrap.Modal.getInstance(document.getElementById("listModal")).hide();alert("Vehicle listing added to the demo marketplace.");
}

function initMap(){
 map=L.map("mapBox").setView([30.3165,78.0322],9);
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(map);
 refreshMarkers(vehicles);
}
function refreshMarkers(list){
 markers.forEach(m=>m.remove());markers=[];
 list.forEach(v=>{const m=L.marker([v.lat,v.lng]).addTo(map).bindPopup(`<strong>${v.name}</strong><br>₹${v.price}/day<br>${v.location}<br><button class="btn btn-sm btn-dark mt-2" onclick="showVehicle(${v.id})">View</button>`);markers.push(m)});
}
