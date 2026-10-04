import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, MapPin, Wifi, Utensils, Bath, ShieldCheck, Star, Heart,
  MessageCircle, SlidersHorizontal, Plus, UserRound, ChevronRight,
  X, CheckCircle2, Building2, Navigation, Menu, Sparkles
} from "lucide-react";
import "./styles.css";

const HOSTELS = [
  {
    id: 1, name: "Campus View Boys Hostel", area: "QAU", gender: "Boys",
    rent: 10500, distance: 0.8, rating: 4.7, reviews: 38,
    verified: true, mess: true, wifi: true, bath: true,
    image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1000&q=80",
    phone: "923001234567", address: "Near QAU Main Gate, Islamabad",
    description: "Clean student-focused hostel with WiFi, mess and attached-bath options.",
    food: 4.6, cleanliness: 4.8, wifiRating: 4.7, owner: 4.5,
    menu: "Daal, chicken curry, rice, roti, seasonal vegetables, breakfast & tea."
  },
  {
    id: 2, name: "Scholar's Nest", area: "6th Road", gender: "Boys",
    rent: 12500, distance: 1.4, rating: 4.5, reviews: 24,
    verified: true, mess: true, wifi: true, bath: true,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
    phone: "923111234567", address: "6th Road, Rawalpindi",
    description: "Affordable rooms close to public transport, markets and universities.",
    food: 4.4, cleanliness: 4.5, wifiRating: 4.3, owner: 4.6,
    menu: "Chicken, daal, rice, roti, breakfast, tea and weekend special."
  },
  {
    id: 3, name: "Green Heights Girls Hostel", area: "H-8", gender: "Girls",
    rent: 15000, distance: 1.7, rating: 4.8, reviews: 51,
    verified: true, mess: true, wifi: true, bath: true,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
    phone: "923221234567", address: "H-8, Islamabad",
    description: "Secure girls hostel with furnished rooms, mess and reliable internet.",
    food: 4.8, cleanliness: 4.9, wifiRating: 4.6, owner: 4.8,
    menu: "Paratha/egg breakfast, chicken, daal, rice, salad and dinner."
  },
  {
    id: 4, name: "Student Square Hostel", area: "Faizabad", gender: "Boys",
    rent: 9000, distance: 2.2, rating: 4.2, reviews: 17,
    verified: true, mess: true, wifi: true, bath: false,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    phone: "923331234567", address: "Faizabad, Rawalpindi",
    description: "One of the lower-cost options with shared rooms and student mess.",
    food: 4.1, cleanliness: 4.0, wifiRating: 4.2, owner: 4.4,
    menu: "Daal, chawal, roti, chicken twice weekly, breakfast."
  },
  {
    id: 5, name: "NUST Scholars Residence", area: "H-12", gender: "Boys",
    rent: 18000, distance: 1.1, rating: 4.6, reviews: 63,
    verified: true, mess: true, wifi: true, bath: true,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
    phone: "923441234567", address: "H-12, Islamabad",
    description: "Comfortable furnished accommodation aimed at university students.",
    food: 4.5, cleanliness: 4.7, wifiRating: 4.8, owner: 4.4,
    menu: "Breakfast, lunch and dinner with rotating Pakistani dishes."
  },
  {
    id: 6, name: "Budget Stay 6th Road", area: "6th Road", gender: "Boys",
    rent: 8000, distance: 2.6, rating: 4.0, reviews: 11,
    verified: false, mess: true, wifi: true, bath: false,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
    phone: "923551234567", address: "Near 6th Road Metro, Rawalpindi",
    description: "Basic rooms for students looking for the lowest monthly cost.",
    food: 3.9, cleanliness: 3.8, wifiRating: 4.0, owner: 4.2,
    menu: "Simple home-style meals and breakfast."
  }
];

const seedReviews = [
  { id: 1, hostelId: 1, name: "Ali R.", uni: "QAU", text: "Mess is good for the price and WiFi is stable. Owner responds quickly.", ratings: { cleanliness: 5, food: 4, wifi: 5, owner: 4 }, date: "2 days ago", verified: true },
  { id: 2, hostelId: 1, name: "Hamza K.", uni: "COMSATS", text: "Room was clean and the location saved a lot of commute time.", ratings: { cleanliness: 5, food: 5, wifi: 4, owner: 5 }, date: "1 week ago", verified: true },
  { id: 3, hostelId: 2, name: "Usman A.", uni: "NUST", text: "Good option near transport. Ask about room sharing before booking.", ratings: { cleanliness: 4, food: 4, wifi: 4, owner: 5 }, date: "2 weeks ago", verified: true }
];

function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("All Areas");
  const [gender, setGender] = useState("Any");
  const [maxRent, setMaxRent] = useState(20000);
  const [minRating, setMinRating] = useState(0);
  const [distance, setDistance] = useState(10);
  const [facility, setFacility] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState(seedReviews);
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => HOSTELS.filter(h => {
    const q = query.toLowerCase();
    return (!q || `${h.name} ${h.area} ${h.address}`.toLowerCase().includes(q))
      && (area === "All Areas" || h.area === area)
      && (gender === "Any" || h.gender === gender)
      && h.rent <= maxRent
      && h.rating >= minRating
      && h.distance <= distance
      && (facility === "All" || (facility === "Mess" && h.mess) || (facility === "WiFi" && h.wifi) || (facility === "Attached Bath" && h.bath));
  }), [query, area, gender, maxRent, minRating, distance, facility]);

  function notify(msg) {
    setToast(msg); setTimeout(() => setToast(""), 2600);
  }

  function toggleFavorite(id) {
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  }

  function openHostel(h) {
    setSelected(h); setPage("details"); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitReview(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const hostelId = selected.id;
    const newReview = {
      id: Date.now(), hostelId, name: fd.get("name"), uni: fd.get("uni"),
      text: fd.get("text"), date: "Just now", verified: true,
      ratings: { cleanliness: Number(fd.get("cleanliness")), food: Number(fd.get("food")), wifi: Number(fd.get("wifi")), owner: Number(fd.get("owner")) }
    };
    setReviews(r => [newReview, ...r]);
    e.currentTarget.reset();
    notify("Review submitted for verification.");
  }

  return (
    <div>
      <header className="navbar">
        <div className="nav-inner">
          <button className="brand" onClick={() => setPage("home")}><span className="brand-mark"><Building2 size={21}/></span>HostelCheck<span className="dot">.pk</span></button>
          <nav>
            <button className={page==="home" ? "active" : ""} onClick={() => setPage("home")}>Find Hostels</button>
            <button onClick={() => { setPage("owners"); window.scrollTo({top:0}) }}>List Your Hostel</button>
          </nav>
          <button className="login" onClick={() => notify("Google Login will connect here when Supabase Auth is enabled.")}><UserRound size={17}/> Student Login</button>
        </div>
      </header>

      {page === "home" && <Home query={query} setQuery={setQuery} filtered={filtered} area={area} setArea={setArea} gender={gender} setGender={setGender} maxRent={maxRent} setMaxRent={setMaxRent} minRating={minRating} setMinRating={setMinRating} distance={distance} setDistance={setDistance} facility={facility} setFacility={setFacility} openHostel={openHostel} favorites={favorites} toggleFavorite={toggleFavorite} setPage={setPage}/>}
      {page === "details" && selected && <Details hostel={selected} reviews={reviews.filter(r=>r.hostelId===selected.id)} onBack={() => setPage("home")} submitReview={submitReview} />}
      {page === "owners" && <OwnerPage notify={notify}/>}
      {page === "favorites" && <Favorites favorites={favorites} openHostel={openHostel}/>}

      {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
      <footer><div><b>HostelCheck<span className="dot">.pk</span></b><span>Built by students, for students.</span></div><div>Affordable • Verified • Transparent</div></footer>
    </div>
  );
}

function Home(p) {
  return <main>
    <section className="hero">
      <div className="hero-inner">
        <div className="eyebrow"><ShieldCheck size={15}/> Student-first hostel discovery</div>
        <h1>Find a hostel you can <span>trust.</span></h1>
        <p>Compare real rent, mess quality, WiFi, cleanliness and student reviews near your university.</p>
        <div className="searchbar">
          <Search size={21}/><input value={p.query} onChange={e=>p.setQuery(e.target.value)} placeholder="Search hostel, area or university..." />
          <button onClick={()=>document.getElementById("results")?.scrollIntoView({behavior:"smooth"})}>Search</button>
        </div>
        <div className="quick"><span>Popular:</span><button onClick={()=>p.setArea("QAU")}>QAU</button><button onClick={()=>p.setArea("6th Road")}>6th Road</button><button onClick={()=>p.setArea("Faizabad")}>Faizabad</button><button onClick={()=>p.setArea("H-12")}>H-12</button></div>
      </div>
    </section>

    <section className="trust-strip"><div><ShieldCheck/> <b>Verified reviews</b><small>Student-focused trust</small></div><div><Utensils/><b>Mess transparency</b><small>See food ratings & menus</small></div><div><MapPin/><b>University distance</b><small>Compare commute easily</small></div><div><Sparkles/><b>Budget first</b><small>Options from Rs. 8,000</small></div></section>

    <section className="content" id="results">
      <div className="section-heading"><div><span className="kicker">DISCOVER</span><h2>Hostels near your university</h2><p>{p.filtered.length} results matching your filters</p></div><button className="filter-toggle" onClick={()=>document.getElementById("filters")?.scrollIntoView({behavior:"smooth"})}><SlidersHorizontal size={17}/> Filters</button></div>
      <div className="listing-layout">
        <aside id="filters" className="filters">
          <div className="filter-title"><b>Filter hostels</b><button onClick={()=>{p.setArea("All Areas");p.setGender("Any");p.setMaxRent(20000);p.setMinRating(0);p.setDistance(10);p.setFacility("All");p.setQuery("")}}>Reset</button></div>
          <label>Area</label><select value={p.area} onChange={e=>p.setArea(e.target.value)}><option>All Areas</option><option>QAU</option><option>6th Road</option><option>Faizabad</option><option>H-8</option><option>H-12</option></select>
          <label>Hostel type</label><div className="seg"><button className={p.gender==="Any"?"sel":""} onClick={()=>p.setGender("Any")}>Any</button><button className={p.gender==="Boys"?"sel":""} onClick={()=>p.setGender("Boys")}>Boys</button><button className={p.gender==="Girls"?"sel":""} onClick={()=>p.setGender("Girls")}>Girls</button></div>
          <label>Maximum rent <b>Rs. {p.maxRent.toLocaleString()}</b></label><input type="range" min="8000" max="20000" step="500" value={p.maxRent} onChange={e=>p.setMaxRent(Number(e.target.value))}/>
          <label>Minimum rating <b>{p.minRating || "Any"}</b></label><div className="stars-select">{[0,3.5,4,4.5].map(x=><button className={p.minRating===x?"sel":""} key={x} onClick={()=>p.setMinRating(x)}>{x===0?"Any":`${x}+ ★`}</button>)}</div>
          <label>Distance from university <b>{p.distance} km</b></label><input type="range" min="1" max="10" step="0.5" value={p.distance} onChange={e=>p.setDistance(Number(e.target.value))}/>
          <label>Facilities</label><select value={p.facility} onChange={e=>p.setFacility(e.target.value)}><option>All</option><option>Mess</option><option>WiFi</option><option>Attached Bath</option></select>
          <div className="student-note"><ShieldCheck size={18}/><div><b>Student reviews only</b><p>Reviews are designed to be tied to verified student accounts when real auth is connected.</p></div></div>
        </aside>
        <div className="cards">{p.filtered.length ? p.filtered.map(h=><HostelCard key={h.id} h={h} open={p.openHostel} fav={p.favorites.includes(h.id)} toggle={p.toggleFavorite}/>) : <div className="empty"><Search size={40}/><h3>No hostels found</h3><p>Try increasing your budget or distance.</p></div>}</div>
      </div>
    </section>

    <section className="owner-cta"><div><span className="kicker">HOSTEL OWNERS</span><h2>Have a hostel? Reach students directly.</h2><p>First listing is free. Upgrade later to Rs. 999/month for Featured placement.</p></div><button onClick={()=>p.setPage("owners")}>List your hostel <ChevronRight size={18}/></button></section>
  </main>
}

function HostelCard({h,open,fav,toggle}) {
  return <article className="hostel-card">
    <div className="photo-wrap"><img src={h.image} alt={h.name}/><div className="badges">{h.rent<12000 && <span className="budget">Budget-Friendly</span>}{h.verified && <span className="verified"><ShieldCheck size={13}/> Verified</span>}</div><button className="heart" onClick={()=>toggle(h.id)}><Heart size={18} fill={fav?"currentColor":"none"}/></button></div>
    <div className="card-body"><div className="card-top"><div><h3>{h.name}</h3><p><MapPin size={14}/> {h.area} · {h.distance} km away</p></div><div className="rating"><Star size={15} fill="currentColor"/>{h.rating}<small>({h.reviews})</small></div></div>
      <div className="price">Rs. {h.rent.toLocaleString()} <small>/ month</small></div>
      <div className="features">{h.mess&&<span><Utensils/> Mess</span>}{h.wifi&&<span><Wifi/> WiFi</span>}{h.bath&&<span><Bath/> Attached Bath</span>}</div>
      <div className="card-bottom"><span className="gender">{h.gender} hostel</span><button onClick={()=>open(h)}>View details <ChevronRight size={16}/></button></div>
    </div>
  </article>
}

function Details({hostel:h,reviews,onBack,submitReview}) {
  const [reviewOpen,setReviewOpen]=useState(false);
  return <main className="details-page"><div className="content">
    <button className="back" onClick={onBack}>← Back to hostels</button>
    <div className="detail-hero"><img src={h.image} alt={h.name}/><div className="detail-info"><div className="badges">{h.verified&&<span className="verified"><ShieldCheck size={13}/> Verified listing</span>}{h.rent<12000&&<span className="budget">Budget-Friendly</span>}</div><h1>{h.name}</h1><p><MapPin size={16}/> {h.address} · {h.distance} km from university</p><div className="detail-price">Rs. {h.rent.toLocaleString()} <small>/ month</small></div><p>{h.description}</p><div className="actions"><a href={`https://wa.me/${h.phone}?text=Hi, I found ${encodeURIComponent(h.name)} on HostelCheck.pk. Is a room available?`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp owner</a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.address)}`} target="_blank" rel="noreferrer"><Navigation size={18}/> Open in Maps</a></div></div></div>
    <div className="detail-grid"><div>
      <section className="panel"><h2>Hostel overview</h2><div className="score-grid"><Score label="Cleanliness" value={h.cleanliness}/><Score label="Food" value={h.food}/><Score label="WiFi" value={h.wifiRating}/><Score label="Owner behaviour" value={h.owner}/></div></section>
      <section className="panel"><div className="panel-head"><div><h2>Student reviews</h2><p>{reviews.length || h.reviews} reviews</p></div><button className="outline" onClick={()=>setReviewOpen(!reviewOpen)}><Plus size={16}/> Write review</button></div>{reviewOpen&&<ReviewForm submitReview={submitReview}/>}<div className="review-list">{reviews.length ? reviews.map(r=><Review key={r.id} r={r}/>) : <p>No local demo reviews yet.</p>}</div></section>
    </div><aside><section className="panel sticky"><h3>At a glance</h3><Info icon={<Utensils/>} text="Mess available"/><Info icon={<Wifi/>} text="WiFi available"/><Info icon={<Bath/>} text={h.bath?"Attached bath":"Shared bath"}/><Info icon={<ShieldCheck/>} text={h.verified?"Verified listing":"Verification pending"}/><hr/><b>Mess menu</b><p className="muted">{h.menu}</p></section></aside></div>
  </div></main>
}

function Score({label,value}) { return <div className="score"><div><b>{label}</b><span>{value.toFixed(1)} / 5</span></div><div className="bar"><i style={{width:`${value*20}%`}}/></div></div> }
function Info({icon,text}) { return <div className="info"><span>{icon}</span>{text}<CheckCircle2 size={15}/></div> }
function Review({r}) { return <div className="review"><div className="review-head"><div className="avatar">{r.name[0]}</div><div><b>{r.name}</b><small>{r.uni} · {r.date} {r.verified&&<span>✓ verified</span>}</small></div><span className="review-stars">★ {((r.ratings.cleanliness+r.ratings.food+r.ratings.wifi+r.ratings.owner)/4).toFixed(1)}</span></div><p>{r.text}</p></div> }
function ReviewForm({submitReview}) { return <form className="review-form" onSubmit={submitReview}><div className="form-grid"><input name="name" required placeholder="Your name"/><input name="uni" required placeholder="University"/><select name="cleanliness" defaultValue="5"><option value="5">Cleanliness: 5</option><option value="4">Cleanliness: 4</option><option value="3">Cleanliness: 3</option></select><select name="food" defaultValue="5"><option value="5">Food: 5</option><option value="4">Food: 4</option><option value="3">Food: 3</option></select><select name="wifi" defaultValue="5"><option value="5">WiFi: 5</option><option value="4">WiFi: 4</option><option value="3">WiFi: 3</option></select><select name="owner" defaultValue="5"><option value="5">Owner: 5</option><option value="4">Owner: 4</option><option value="3">Owner: 3</option></select></div><textarea name="text" required placeholder="Share your honest student experience..."/><button>Submit review</button></form> }

function OwnerPage({notify}) {
  const [submitted,setSubmitted]=useState(false);
  function submit(e){e.preventDefault();setSubmitted(true);notify("Listing saved as a demo. Connect Supabase to publish it.");}
  return <main><section className="owner-page"><div className="owner-copy"><span className="kicker">FOR HOSTEL OWNERS</span><h1>List your hostel. <span>Reach students.</span></h1><p>Start free and put your hostel in front of students actively looking for affordable accommodation.</p><div className="owner-points"><div><CheckCircle2/> First listing free</div><div><CheckCircle2/> Update rent & photos</div><div><CheckCircle2/> Featured placement — Rs. 999/month</div></div></div><form className="owner-form" onSubmit={submit}><h2>{submitted?"Listing submitted!":"Create your free listing"}</h2>{submitted?<><p>In production, this form will create an owner account and publish the listing after verification.</p><button type="button" onClick={()=>setSubmitted(false)}>Add another listing</button></>:<><input required placeholder="Hostel name"/><div className="form-grid"><input required placeholder="Owner name"/><input required placeholder="WhatsApp number"/></div><div className="form-grid"><select required><option value="">Hostel type</option><option>Boys</option><option>Girls</option></select><input required type="number" placeholder="Monthly rent"/></div><input required placeholder="Area / address"/><textarea required placeholder="Short description"/><button><Plus size={17}/> Submit free listing</button></>}</form></section></main>
}

function Favorites({favorites,openHostel}) {
 const hs=HOSTELS.filter(h=>favorites.includes(h.id));
 return <main className="content"><div className="section-heading"><div><span className="kicker">SAVED</span><h2>Your favourite hostels</h2></div></div><div className="cards">{hs.length?hs.map(h=><HostelCard key={h.id} h={h} open={openHostel} fav toggle={()=>{}}/>):<div className="empty"><Heart size={40}/><h3>No saved hostels</h3><p>Tap the heart on any hostel to save it.</p></div>}</div></main>
}

createRoot(document.getElementById("root")).render(<App />);