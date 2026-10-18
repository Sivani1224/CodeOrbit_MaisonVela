import { useState, useEffect } from "react";
import Bag from "./Bag.jsx";
import "./App.css";

const collections = [
  { id: 1, name: "Marée", note: "Structured totes in deep sea green.", shape: "tote", color: "#123A2E", accent: "#C9A56A", bg: "#CFD9D3" },
  { id: 2, name: "Orage", note: "Satchels cut from storm-grey calf.", shape: "satchel", color: "#3B4150", accent: "#D8D3C8", bg: "#D9DBE0" },
  { id: 3, name: "Brume", note: "Soft buckets in pale sand suede.", shape: "bucket", color: "#B9A58B", accent: "#4A3B2A", bg: "#E8E1D6" },
  { id: 4, name: "Minuit", note: "Evening clutches in midnight blue.", shape: "clutch", color: "#14213D", accent: "#C9A56A", bg: "#C9CFDD" },
];

const products = [
  { id: 1, name: "Marée Grand Tote", type: "tote", price: 24900, color: "#123A2E", accent: "#C9A56A" },
  { id: 2, name: "Marée Day Tote", type: "tote", price: 18900, color: "#7A2E2E", accent: "#D8C7A0" },
  { id: 3, name: "Orage Satchel", type: "satchel", price: 21500, color: "#3B4150", accent: "#D8D3C8" },
  { id: 4, name: "Orage Mini Satchel", type: "satchel", price: 15900, color: "#8A5A3C", accent: "#EAD9B8" },
  { id: 5, name: "Brume Bucket", type: "bucket", price: 17500, color: "#B9A58B", accent: "#4A3B2A" },
  { id: 6, name: "Brume Evening Bucket", type: "bucket", price: 19800, color: "#2F2A28", accent: "#C9A56A" },
  { id: 7, name: "Minuit Clutch", type: "clutch", price: 12900, color: "#14213D", accent: "#C9A56A" },
  { id: 8, name: "Minuit Envelope", type: "clutch", price: 11500, color: "#5B1F2B", accent: "#D8D3C8" },
];

const filters = ["all", "tote", "satchel", "bucket", "clutch"];

const steps = [
  { title: "Cut", text: "Each hide is inspected by hand and cut around its natural grain." },
  { title: "Stitch", text: "Panels are saddle-stitched with waxed thread, eight stitches to the inch." },
  { title: "Edge", text: "Edges are sanded, dyed and burnished until they feel like glass." },
  { title: "Finish", text: "Hardware is fitted and every bag is checked by the artisan who made it." },
];

const rupees = (n) => "₹" + n.toLocaleString("en-IN");

export default function App() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("all");
  const [cart, setCart] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [note, setNote] = useState("");

  const count = cart.reduce((n, i) => n + i.qty, 0);
  const total = cart.reduce((n, i) => n + i.qty * i.price, 0);

  const addToBag = (p) => {
    setNote("");
    setCart((prev) =>
      prev.some((i) => i.id === p.id)
        ? prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...p, qty: 1 }]
    );
  };
  const changeQty = (id, delta) =>
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0));
  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const checkout = () => { setCart([]); setNote("Demo order placed. Thank you!"); };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setBagOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const shown = filter === "all" ? products : products.filter((p) => p.type === filter);

  return (
    <>
      <nav className="nav">
        <button className="burger" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle menu">
          {menu ? "Close" : "Menu"}
        </button>
        <ul className={`links ${menu ? "open" : ""}`}>
          {[["Collections", "#collections"], ["Shop", "#shop"], ["Craft", "#craft"], ["Visit", "#visit"]].map(([label, href]) => (
            <li key={href}><a href={href} onClick={() => setMenu(false)}>{label}</a></li>
          ))}
        </ul>
        <a href="#top" className="logo">Maison Vela</a>
        <button className="bagcount" onClick={() => setBagOpen(true)} aria-label={`Open bag, ${count} items`}>Bag ({count})</button>
      </nav>

      <header className="hero" id="top">
        <div className="hero-copy">
          <h1>Carried,<br />not worn.</h1>
          <p>Handbags made slowly in small batches, designed to outlast the season they were born in.</p>
          <a className="btn" href="#collections">Enter the universe</a>
        </div>
        <div className="hero-art">
          <Bag shape="tote" color="#0D2B22" accent="#C9A56A" className="hero-bag" />
        </div>
      </header>

      <section className="collections" id="collections">
        <div className="section-head">
          <h2>The Vela universe</h2>
          <p>Four collections. Swipe or scroll sideways.</p>
        </div>
        <div className="track">
          {collections.map((c) => (
            <article className="panel" key={c.id} style={{ background: c.bg }}>
              <Bag shape={c.shape} color={c.color} accent={c.accent} className="panel-bag" />
              <div className="panel-text">
                <h3>{c.name}</h3>
                <p>{c.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shop" id="shop">
        <div className="section-head">
          <h2>Shop the bags</h2>
          <div className="filters" role="group" aria-label="Filter by bag type">
            {filters.map((f) => (
              <button key={f} className={f === filter ? "chip active" : "chip"} onClick={() => setFilter(f)} aria-pressed={f === filter}>
                {f === "all" ? "All" : f[0].toUpperCase() + f.slice(1) + "s"}
              </button>
            ))}
          </div>
        </div>
        <div className="grid">
          {shown.map((p) => (
            <article className="item" key={p.id}>
              <div className="item-art">
                <Bag shape={p.type} color={p.color} accent={p.accent} />
              </div>
              <h3>{p.name}</h3>
              <p className="price">{rupees(p.price)}</p>
              <button className="btn outline" onClick={() => addToBag(p)}>Add to bag</button>
            </article>
          ))}
        </div>
      </section>

      <section className="craft" id="craft">
        <div className="craft-intro">
          <h2>Forty hours in one bag</h2>
          <p>Every Vela bag passes through four pairs of hands in our Chennai workshop.</p>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="step-no">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="visit" id="visit">
        <h2>Book a private viewing</h2>
        <p>See the collections in person and have your initials stamped on the bag you choose.</p>
        <a className="btn light" href="mailto:atelier@maisonvela.example">Book a viewing</a>
      </section>

      <div className={bagOpen ? "overlay show" : "overlay"} onClick={() => setBagOpen(false)} />
      <aside className={bagOpen ? "drawer open" : "drawer"} aria-hidden={!bagOpen} aria-label="Your bag">
        <div className="drawer-head">
          <h2>Your bag ({count})</h2>
          <button className="close" onClick={() => setBagOpen(false)}>Close</button>
        </div>
        <div className="drawer-body">
          {cart.length === 0 && <p className="empty">{note || "Your bag is empty. Add a bag from the shop."}</p>}
          {cart.map((i) => (
            <div className="line" key={i.id}>
              <div className="line-art"><Bag shape={i.type} color={i.color} accent={i.accent} /></div>
              <div className="line-info">
                <h3>{i.name}</h3>
                <p>{rupees(i.price)}</p>
                <div className="qty">
                  <button onClick={() => changeQty(i.id, -1)} aria-label={`Decrease ${i.name}`}>−</button>
                  <span>{i.qty}</span>
                  <button onClick={() => changeQty(i.id, 1)} aria-label={`Increase ${i.name}`}>+</button>
                  <button className="remove" onClick={() => removeItem(i.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="total"><span>Total</span><strong>{rupees(total)}</strong></div>
            <button className="btn dark" onClick={checkout}>Checkout</button>
          </div>
        )}
      </aside>

      <footer className="footer">
        <span>Maison Vela</span>
        <span>Fictional brand </span>
      </footer>
    </>
  );
}
