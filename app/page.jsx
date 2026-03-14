"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Karla:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --ink:#07071A; --deep:#0C0C28; --panel:#111130; --card:#161640;
      --edge:#1F1F52; --soft:#2A2A68; --indigo:#5B52F5; --violet:#7C74FF;
      --lilac:#A8A3FF; --gold:#F5A623; --amber:#FFD47A; --jade:#12C98E;
      --coral:#FF6B6B; --sky:#60BDFF; --white:#FFFFFF; --fog:#9898C8; --ghost:#4A4A80;
    }
    html { scroll-behavior: smooth; }
    body { background:var(--ink); color:var(--white); font-family:'Karla',sans-serif; font-size:16px; line-height:1.6; overflow-x:hidden; }
    .syne { font-family:'Syne',sans-serif; }
    ::-webkit-scrollbar{width:4px;height:4px} ::-webkit-scrollbar-track{background:var(--deep)} ::-webkit-scrollbar-thumb{background:var(--soft);border-radius:2px}
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
    @keyframes float{0%,100%{transform:translateY(0px)}50%{transform:translateY(-10px)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes ping{0%{transform:scale(1);opacity:.8}100%{transform:scale(2.4);opacity:0}}
    @keyframes typeDot{0%,60%,100%{transform:scale(.7);opacity:.4}30%{transform:scale(1);opacity:1}}
    .afu{animation:fadeUp .6s ease both} .afi{animation:fadeIn .4s ease both} .asi{animation:slideIn .35s ease both} .afl{animation:float 5s ease-in-out infinite}
    .d1{animation-delay:.1s} .d2{animation-delay:.2s} .d3{animation-delay:.3s} .d4{animation-delay:.4s}
    .tdot{width:7px;height:7px;border-radius:50%;background:var(--fog);display:inline-block;animation:typeDot 1.2s ease-in-out infinite}
    .tdot:nth-child(2){animation-delay:.15s} .tdot:nth-child(3){animation-delay:.3s}
    input,textarea,select{font-family:'Karla',sans-serif}
    .inp{width:100%;background:rgba(255,255,255,.04);border:1px solid var(--edge);border-radius:10px;padding:13px 16px;color:var(--white);font-size:15px;outline:none;transition:border-color .2s,background .2s,box-shadow .2s}
    .inp:focus{border-color:var(--indigo);background:rgba(91,82,245,.06);box-shadow:0 0 0 3px rgba(91,82,245,.12)}
    .inp::placeholder{color:var(--ghost)}
    .btn{font-family:'Karla',sans-serif;font-weight:600;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;border-radius:10px;white-space:nowrap}
    .btn:disabled{opacity:.5;cursor:not-allowed}
    .bp{background:var(--indigo);color:white;padding:13px 26px;font-size:15px}
    .bp:not(:disabled):hover{background:var(--violet);transform:translateY(-1px);box-shadow:0 8px 24px rgba(91,82,245,.4)}
    .bg{background:var(--gold);color:var(--ink);padding:13px 26px;font-size:15px;font-weight:700}
    .bg:not(:disabled):hover{background:var(--amber);transform:translateY(-1px);box-shadow:0 8px 24px rgba(245,166,35,.35)}
    .bh{background:transparent;color:var(--fog);border:1px solid var(--edge);padding:12px 22px;font-size:15px}
    .bh:not(:disabled):hover{border-color:var(--indigo);color:white}
    .bsm{padding:8px 14px!important;font-size:13px!important;border-radius:8px!important}
    .bxs{padding:5px 10px!important;font-size:12px!important;border-radius:6px!important}
    .card{background:var(--card);border:1px solid var(--edge);border-radius:16px}
    .panel{background:var(--panel);border:1px solid var(--edge);border-radius:12px}
    .tag{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:20px;font-size:12px;font-weight:600;letter-spacing:.03em}
    .tg{background:rgba(245,166,35,.12);color:var(--gold);border:1px solid rgba(245,166,35,.25)}
    .ti{background:rgba(91,82,245,.12);color:var(--lilac);border:1px solid rgba(91,82,245,.25)}
    .tj{background:rgba(18,201,142,.12);color:var(--jade);border:1px solid rgba(18,201,142,.25)}
    .tc{background:rgba(255,107,107,.12);color:var(--coral);border:1px solid rgba(255,107,107,.25)}
    .mesh{background:radial-gradient(ellipse 70% 50% at 15% 15%,rgba(91,82,245,.18) 0%,transparent 65%),radial-gradient(ellipse 50% 40% at 85% 80%,rgba(245,166,35,.1) 0%,transparent 55%),var(--ink)}
    .glass{background:rgba(17,17,48,.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(31,31,82,.8)}
    table{width:100%;border-collapse:collapse}
    thead th{padding:11px 14px;text-align:left;font-size:11px;font-weight:600;color:var(--ghost);letter-spacing:.06em;border-bottom:1px solid var(--edge)}
    tbody tr{border-bottom:1px solid rgba(31,31,82,.5);transition:background .15s}
    tbody tr:hover{background:rgba(91,82,245,.04)}
    tbody td{padding:11px 14px;font-size:14px}
    tbody tr:last-child{border-bottom:none}
  `}</style>
);

const STORE = {
  name: "Nana Aba Collections",
  products: [
    { id:1, name:"Kente Wrap Dress",  price:280, sizes:["XS","S","M","L","XL"], stock:{XS:2,S:3,M:5,L:2,XL:1} },
    { id:2, name:"Ankara Blazer",     price:350, sizes:["S","M","L"],           stock:{S:2,M:4,L:3} },
    { id:3, name:"Adire Print Set",   price:220, sizes:["M","L","XL"],          stock:{M:6,L:4,XL:2} },
    { id:4, name:"Dashiki Crop Top",  price:120, sizes:["XS","S","M","L"],      stock:{XS:4,S:5,M:3,L:2} },
  ]
};

const buildSystem = (name, products) => `You are Sarah, AI sales agent for ${name}'s Christmas Sale 🎄

PERSONALITY: Warm, natural Ghanaian sales rep. Light Pidgin OK ("No wahala!", "Sharp sharp!"). Max 3 sentences UNLESS listing items.

INVENTORY:
${products.map(p=>`• ${p.name} — GH₵${p.price} | ${p.sizes.map(s=>`${s}(${p.stock[s]} left)`).join(", ")}`).join("\n")}

STRICT 6-STEP FLOW — always move forward, never stay stuck:
STEP 1 — GREET: Welcome warmly, mention Christmas sale 🎁, ask what they want.
STEP 2 — BROWSE: If they ask what's available, list ALL products with prices and sizes. Always end with "Which one catches your eye? ✨"
STEP 3 — CONFIRM: When they pick something, confirm item + price, then ask "What size do you need?"
STEP 4 — ADDRESS: After size is confirmed, say "Perfect! 🎉 What area should we deliver to?"
STEP 5 — PAYMENT: After they give address, say "Here's your payment link 👉 sarahsales.ai/pay/[6 random alphanumeric] — valid 30 mins! GH₵[price] via mobile money, card or bank 💳"
STEP 6 — RECEIPT: When they say paid / done / confirmed payment, respond warmly AND output on a new line:
RECEIPT_JSON:{"item":"[name]","size":"[size]","qty":1,"price":[number],"delivery":"[address]","token":"GH-[6 uppercase chars]","payMethod":"Mobile Money"}

CRITICAL RULES:
- After EVERY reply, always move to the next step or ask the next needed question — never end a reply without a question or next action
- Never confirm unavailable stock — suggest alternatives
- Never say you are AI, a demo, or a chatbot
- MUST output RECEIPT_JSON when payment is confirmed — this is non-negotiable`;

async function callSarah(msgs, name, products) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      system: buildSystem(name, products),
      messages: msgs
    })
  });
  const d = await r.json();
  return d.content?.[0]?.text || "Ei! Try again 😅";
}


// async function callSarah(msgs, name, products) {
//   const r = await fetch("https://api.anthropic.com/v1/messages", {
//     method:"POST", headers:{"Content-Type":"application/json"},
//     body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:500, system:buildSystem(name,products), messages:msgs })
//   });
//   const d = await r.json();
//   return d.content?.[0]?.text || "Sorry, try again! 😅";
// }

const Sp = ({sz=18,col="var(--indigo)"}) => <div style={{width:sz,height:sz,border:`2px solid transparent`,borderTop:`2px solid ${col}`,borderRadius:"50%",animation:"spin .75s linear infinite",flexShrink:0}}/>;
const Av = ({ch,sz=38,gr="135deg,#5B52F5,#12C98E"}) => <div style={{width:sz,height:sz,borderRadius:"50%",background:`linear-gradient(${gr})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:sz*.42,fontWeight:700,color:"white",fontFamily:"'Syne',sans-serif",flexShrink:0}}>{ch}</div>;

const IC = ({n,s=18,c="currentColor"}) => {
  const P = {width:s,height:s,fill:"none",stroke:c,strokeWidth:1.8,viewBox:"0 0 24 24",strokeLinecap:"round",strokeLinejoin:"round"};
  const m = {
    send:   <svg {...P}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
    check:  <svg {...P} strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>,
    eye:    <svg {...P}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    eyeoff: <svg {...P}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>,
    plus:   <svg {...P}><path d="M12 5v14M5 12h14"/></svg>,
    trash:  <svg {...P}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>,
    copy:   <svg {...P}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
    link:   <svg {...P}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
    grid:   <svg {...P}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
    box:    <svg {...P}><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>,
    chart:  <svg {...P}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    bot:    <svg {...P}><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/><circle cx="9.5" cy="15.5" r="1" fill={c}/><circle cx="14.5" cy="15.5" r="1" fill={c}/></svg>,
    zap:    <svg {...P}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    shield: <svg {...P}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    star:   <svg {...P}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    logout: <svg {...P}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
    users:  <svg {...P}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    inv:    <svg {...P}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    settings:<svg {...P}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06-.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  };
  return m[n] || null;
};


function ReceiptCard({ r }) {
  const total = (r.price * (r.qty || 1)) + 30;
  const today = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });
  const rows = [
    ["Item",          r.item],
    ["Size",          r.size],
    ["Qty",           String(r.qty || 1)],
    ["Unit Price",    `GH₵${r.price.toLocaleString()}`],
    ["Delivery to",   r.delivery],
    ["Delivery fee",  "GH₵30"],
    ["Payment via",   r.payMethod || "Mobile Money"],
  ];
  return (
    <div style={{ maxWidth:"85%", borderRadius:14, overflow:"hidden", border:"1px solid var(--edge)", alignSelf:"flex-start", animation:"slideIn .4s ease both" }}>
      <div style={{ padding:"12px 16px", background:"linear-gradient(135deg,rgba(91,82,245,.3),rgba(18,201,142,.2))", borderBottom:"1px solid var(--edge)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
          <span style={{ fontSize:16 }}>🎄</span>
          <div>
            <div className="syne" style={{ fontSize:13, fontWeight:800, color:"white" }}>Order Confirmed!</div>
            <div style={{ fontSize:11, color:"var(--jade)" }}>✓ Payment received</div>
          </div>
        </div>
        <div style={{ fontSize:11, color:"var(--fog)", marginTop:2 }}>{today}</div>
      </div>
      <div style={{ padding:"12px 16px", background:"var(--card)" }}>
        <div style={{ fontSize:10, fontWeight:600, color:"var(--ghost)", letterSpacing:".06em", marginBottom:8 }}>ORDER SUMMARY</div>
        {rows.map(([label, val]) => (
          <div key={label} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid rgba(31,31,82,.4)", fontSize:12 }}>
            <span style={{ color:"var(--fog)" }}>{label}</span>
            <span style={{ color:"white", fontWeight:600, textAlign:"right", maxWidth:"60%", wordBreak:"break-word" }}>{val}</span>
          </div>
        ))}
        <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 6px", fontSize:14, fontWeight:700 }}>
          <span style={{ color:"white" }}>Total Paid</span>
          <span style={{ color:"var(--gold)" }}>GH₵{total.toLocaleString()}</span>
        </div>
        <div style={{ background:"rgba(18,201,142,.1)", border:"1px dashed rgba(18,201,142,.4)", borderRadius:9, padding:"10px 13px", marginTop:6, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:10, color:"var(--fog)", fontWeight:600, letterSpacing:".05em", marginBottom:2 }}>COLLECTION TOKEN</div>
            <div className="syne" style={{ fontSize:18, fontWeight:800, color:"var(--jade)", letterSpacing:".06em" }}>{r.token}</div>
          </div>
          <div style={{ fontSize:10, color:"var(--fog)", textAlign:"right", lineHeight:1.5 }}>Show this<br/>when collecting</div>
        </div>
        <div style={{ fontSize:11, color:"var(--ghost)", textAlign:"center", marginTop:9 }}>Estimated delivery: 1–3 business days 🎁</div>
      </div>
    </div>
  );
}



function NavBar({page,setPage,user,setUser}){
  return(
    <nav className="glass" style={{position:"fixed",top:0,left:0,right:0,zIndex:500,height:62,padding:"0 36px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <button onClick={()=>setPage("landing")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#5B52F5,#7C74FF)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <IC n="bot" s={18} c="white"/>
        </div>
        <span className="syne" style={{fontSize:20,fontWeight:800,color:"white",letterSpacing:"-.02em"}}>Sarah</span>
        <span style={{fontSize:10,fontWeight:600,color:"var(--gold)",letterSpacing:".12em"}}>THE SALES AI</span>
      </button>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {user?(
          <>
            <span style={{color:"var(--fog)",fontSize:14}}>Hey, <strong style={{color:"white"}}>{user.business}</strong> 👋</span>
            <button className="btn bh bsm" onClick={()=>{setUser(null);setPage("landing");}}><IC n="logout" s={13}/>Sign out</button>
          </>
        ):page!=="signup"&&(
          <>
            <button className="btn bh bsm" onClick={()=>setPage("signup")}>Log in</button>
            <button className="btn bp bsm" onClick={()=>setPage("signup")}>Get Started →</button>
          </>
        )}
      </div>
    </nav>
  );
}

// // Receipt parser helpers
// function parseReceipt(text) {
//   const match = text.match(/RECEIPT_JSON:(\{.*?\})/s);
//   if (!match) return null;
//   try { return JSON.parse(match[1]); } catch { return null; }
// }

// function stripReceiptJson(text) {
//   return text.replace(/RECEIPT_JSON:\{.*?\}/s, '').trim();
// }

// function ReceiptCard({ r }) {
//   const subtotal = r.price * (r.qty || 1);
//   const deliveryFee = 30;
//   const total = subtotal + deliveryFee;
//   const today = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });

//   return (
//     <div style={{ maxWidth:"82%", borderRadius:14, overflow:"hidden", border:"1px solid var(--edge)", alignSelf:"flex-start" }}>
//       {/* Header */}
//       <div style={{ padding:"13px 16px", background:"linear-gradient(135deg,rgba(91,82,245,.25),rgba(18,201,142,.15))", borderBottom:"1px solid var(--edge)" }}>
//         <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:4 }}>
//           <span style={{ fontSize:18 }}>🎄</span>
//           <div>
//             <div className="syne" style={{ fontSize:13, fontWeight:800, color:"white", letterSpacing:"-.01em" }}>Nana Aba Collections</div>
//             <div style={{ fontSize:11, color:"var(--jade)" }}>Order Confirmed ✓</div>
//           </div>
//         </div>
//         <div style={{ fontSize:11, color:"var(--fog)" }}>{today}</div>
//       </div>

//       {/* Body */}
//       <div style={{ padding:"13px 16px", background:"var(--card)" }}>
//         <div style={{ fontSize:11, fontWeight:600, color:"var(--ghost)", letterSpacing:".05em", marginBottom:9 }}>ORDER DETAILS</div>

//         {[
//           ["Item",         r.item],
//           ["Size",         r.size],
//           ["Qty",          r.qty || 1],
//           ["Unit Price",   `GH₵${r.price.toLocaleString()}`],
//           ["Delivery To",  r.delivery],
//           ["Delivery Fee", `GH₵${deliveryFee}`],
//           ["Payment",      r.payMethod || "Mobile Money"],
//         ].map(([label, val]) => (
//           <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom:"1px solid rgba(31,31,82,.5)", fontSize:13 }}>
//             <span style={{ color:"var(--fog)" }}>{label}</span>
//             <span style={{ color:"white", fontWeight:600, textAlign:"right", maxWidth:"58%" }}>{val}</span>
//           </div>
//         ))}

//         {/* Total */}
//         <div style={{ display:"flex", justifyContent:"space-between", padding:"11px 0 4px", fontSize:15, fontWeight:700 }}>
//           <span style={{ color:"white" }}>Total Paid</span>
//           <span style={{ color:"var(--gold)" }}>GH₵{total.toLocaleString()}</span>
//         </div>

//         {/* Token */}
//         <div style={{ background:"rgba(18,201,142,.1)", border:"1px dashed rgba(18,201,142,.4)", borderRadius:8, padding:"10px 13px", marginTop:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//           <div>
//             <div style={{ fontSize:10, color:"var(--fog)", fontWeight:600, letterSpacing:".05em", marginBottom:3 }}>COLLECTION TOKEN</div>
//             <div className="syne" style={{ fontSize:18, fontWeight:800, color:"var(--jade)", letterSpacing:".04em" }}>{r.token}</div>
//           </div>
//           <div style={{ textAlign:"right" }}>
//             <div style={{ fontSize:10, color:"var(--fog)" }}>Show this code</div>
//             <div style={{ fontSize:10, color:"var(--fog)" }}>when collecting</div>
//           </div>
//         </div>

//         <div style={{ fontSize:11, color:"var(--ghost)", marginTop:10, textAlign:"center" }}>
//           Estimated delivery: 1–3 business days 🎁
//         </div>
//       </div>
//     </div>
//   );
// }

function SarahChat({ storeName=STORE.name, products=STORE.products, compact=false }) {
  const [msgs, setMsgs] = useState([]);        // full history sent to API
  const [display, setDisplay] = useState([]);  // what gets rendered (includes receipt cards)
  const [inp, setInp] = useState("");
  const [busy, setBusy] = useState(false);
  const [started, setStarted] = useState(false);
  const endRef = useRef(null);
  const inpRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [display, busy]);

  const send = useCallback(async (txt) => {
    const t = (txt || inp).trim();
    if (!t || busy) return;
    setInp("");
    setBusy(true);
    setStarted(true);

    // Add user message to both histories
    const userMsg = { role:"user", content:t };
    const newMsgs = [...msgs, userMsg];
    setMsgs(newMsgs);
    setDisplay(d => [...d, { type:"user", content:t }]);

    try {
      const raw = await callSarah(newMsgs, storeName, products);
      const receipt = parseReceipt(raw);
      const cleanText = stripReceiptJson(raw);

      // API history always gets the raw response
      const assistantMsg = { role:"assistant", content:raw };
      setMsgs(m => [...m, assistantMsg]);

      // Display gets clean text + optional receipt card
      setDisplay(d => {
        const next = [...d];
        if (cleanText) next.push({ type:"sarah", content:cleanText });
        if (receipt)   next.push({ type:"receipt", receipt });
        return next;
      });

    } catch {
      setMsgs(m => [...m, { role:"assistant", content:"Ei! Connection issue 😅 Try again?" }]);
      setDisplay(d => [...d, { type:"sarah", content:"Ei! Connection issue 😅 Try again?" }]);
    }

    setBusy(false);
    setTimeout(() => inpRef.current?.focus(), 80);
  }, [msgs, inp, busy, storeName, products]);

  const starters = [
    "Hi! What's available? 👋",
    "I want the Kente Wrap Dress 🎁",
    "What are your Christmas prices? ✨"
  ];

  return (
    <div className="card afl" style={{ display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"0 32px 72px rgba(0,0,0,.55)" }}>
      {/* Header */}
      <div style={{ padding:"14px 18px", background:"rgba(91,82,245,.15)", borderBottom:"1px solid var(--edge)", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ position:"relative" }}>
          <Av ch="S" sz={40}/>
          <div style={{ position:"absolute", bottom:1, right:1, width:10, height:10, borderRadius:"50%", background:"var(--jade)", border:"2px solid var(--card)" }}/>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, fontSize:14, color:"white" }}>Sarah · {storeName}</div>
          <div style={{ fontSize:11, color:"var(--jade)", display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--jade)", display:"inline-block", animation:"pulse 2s ease-in-out infinite" }}/>
            Christmas Sale — LIVE NOW
          </div>
        </div>
        <div className="tag tg" style={{ fontSize:10 }}>🎄 Live Demo</div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"16px 14px", height:compact?340:420, display:"flex", flexDirection:"column", gap:10 }}>

        {!started && (
          <div style={{ margin:"auto", textAlign:"center", padding:"20px 12px" }}>
            <div style={{ fontSize:42, marginBottom:12 }}>🎁</div>
            <p style={{ color:"var(--fog)", fontSize:14, lineHeight:1.7, marginBottom:20 }}>
              You're a customer DMing during<br/>a live Christmas sale. Try Sarah!
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {starters.map(q => (
                <button key={q} className="btn bh bsm" onClick={() => send(q)} style={{ justifyContent:"flex-start", fontSize:13 }}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {display.map((m, i) => {
          if (m.type === "receipt") {
            return <ReceiptCard key={i} r={m.receipt} />;
          }
          return (
            <div key={i} className="asi" style={{ display:"flex", justifyContent:m.type==="user"?"flex-end":"flex-start", gap:8, alignItems:"flex-end" }}>
              {m.type === "sarah" && <Av ch="S" sz={26}/>}
              <div style={{
                maxWidth:"78%", padding:"10px 14px", fontSize:14, lineHeight:1.6, color:"white",
                whiteSpace:"pre-wrap", wordBreak:"break-word",
                borderRadius: m.type==="user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: m.type==="user" ? "var(--indigo)" : "var(--soft)",
                border: m.type==="user" ? "none" : "1px solid var(--edge)"
              }}>
                {m.content}
              </div>
            </div>
          );
        })}

        {busy && (
          <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
            <Av ch="S" sz={26}/>
            <div className="panel" style={{ padding:"10px 14px", display:"flex", gap:5, alignItems:"center" }}>
              <span className="tdot"/><span className="tdot"/><span className="tdot"/>
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>

      {/* Input */}
      <div style={{ padding:"12px 14px", borderTop:"1px solid var(--edge)", display:"flex", gap:8 }}>
        <input ref={inpRef} className="inp" value={inp} onChange={e => setInp(e.target.value)}
          onKeyDown={e => e.key==="Enter" && !e.shiftKey && (e.preventDefault(), send())}
          placeholder="Message Sarah…" style={{ borderRadius:24, padding:"10px 16px", fontSize:14 }}/>
        <button className="btn bp" onClick={() => send()} disabled={!inp.trim() || busy}
          style={{ borderRadius:24, padding:"10px 16px", minWidth:44 }}>
          {busy ? <Sp sz={16} col="white"/> : <IC n="send" s={16} c="white"/>}
        </button>
      </div>
    </div>
  );
}

function Landing({setPage}){
  const feats=[
    {i:"bot",   c:"var(--indigo)",t:"AI Sales Agent",     d:"Handles every DM from first hello to confirmed order. Zero human typing required."},
    {i:"zap",   c:"var(--gold)",  t:"Inventory Lock",     d:"Atomic locking means two customers can never buy the same last item. Overselling is impossible."},
    {i:"shield",c:"var(--jade)",  t:"Zero Fake Receipts", d:"Sarah only confirms orders via verified Paystack webhooks. Fake screenshots don't work."},
    {i:"chart", c:"var(--lilac)", t:"Live Dashboard",     d:"Real-time order feed, inventory heatmap, revenue ticker. Every sale visible live."},
    {i:"box",   c:"var(--gold)",  t:"Order Tokens",       d:"Every order gets a unique GH-XXXXXX code. No code, no package. No wrong-person mix-ups."},
    {i:"star",  c:"var(--jade)",  t:"Post-Sale Analytics",d:"Revenue, missed demand, conversion funnels and AI recommendations after every event."},
  ];
  const steps=[
    {n:"01",c:"var(--indigo)",t:"Create your store",   d:"Upload products, set prices, choose Sarah's tone. Ready in under 5 minutes."},
    {n:"02",c:"var(--gold)",  t:"Post your sale",      d:"Share on Instagram or WhatsApp as normal. Add your Sarah link. Done."},
    {n:"03",c:"var(--jade)",  t:"Sarah does the rest", d:"Every customer DM handled automatically. You pack and ship."},
  ];
  return(
    <div style={{paddingTop:62}}>
      <section className="mesh" style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"72px 40px 60px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"5%",right:"2%",width:520,height:520,borderRadius:"50%",background:"radial-gradient(circle,rgba(91,82,245,.2) 0%,transparent 68%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"8%",left:"-6%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(245,166,35,.11) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:1160,margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center",position:"relative",zIndex:1}}>
          <div>
            <div className="tag tg afu" style={{marginBottom:24}}>🇬🇭 Built for Ghana · Scaling across Africa</div>
            <h1 className="syne afu d1" style={{fontSize:"clamp(38px,4.8vw,60px)",lineHeight:1.07,fontWeight:800,marginBottom:20,color:"white",letterSpacing:"-.02em"}}>
              Your sales event.<br/><span style={{color:"var(--gold)"}}>Zero chaos.</span><br/>Every order confirmed.
            </h1>
            <p className="afu d2" style={{fontSize:18,color:"var(--fog)",maxWidth:480,lineHeight:1.75,marginBottom:32}}>
              Sarah is an AI agent that handles every customer DM during your Instagram, WhatsApp, and Snapchat sale events — from first hello to confirmed order with receipt and collection token.
            </p>
            <div className="afu d3" style={{display:"flex",gap:12,marginBottom:48,flexWrap:"wrap"}}>
              <button className="btn bg" onClick={()=>setPage("signup")} style={{fontSize:16,padding:"16px 36px"}}>Start Free Trial →</button>
              <button className="btn bh" style={{fontSize:15}}>See how it works ↓</button>
            </div>
            <div className="afu d4" style={{display:"flex",gap:40,paddingTop:28,borderTop:"1px solid var(--edge)",flexWrap:"wrap"}}>
              {[["3,000+","DMs per sale event"],["8 steps","automated per order"],["0","fake receipts accepted"]].map(([n,l])=>(
                <div key={l}><div className="syne" style={{fontSize:28,fontWeight:800,color:"var(--gold)"}}>{n}</div><div style={{fontSize:12,color:"var(--ghost)",marginTop:2}}>{l}</div></div>
              ))}
            </div>
          </div>
          <div className="afu d2"><SarahChat/></div>
        </div>
      </section>

      <div style={{background:"var(--panel)",borderTop:"1px solid var(--edge)",borderBottom:"1px solid var(--edge)",padding:"20px 40px"}}>
        <div style={{maxWidth:1160,margin:"0 auto",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
          <span style={{color:"var(--ghost)",fontSize:13,marginRight:6}}>Today's problems:</span>
          {["Overselling","Fake receipts","Lost DMs","Mixed-up orders","Zero post-sale data"].map(p=><div key={p} className="tag tc" style={{fontSize:12}}>✕ {p}</div>)}
          <span style={{color:"var(--ghost)",fontSize:22}}>→</span>
          <div className="tag tj" style={{fontSize:12,fontWeight:700}}>✓ Sarah solves all of this</div>
        </div>
      </div>

      <section style={{padding:"90px 40px",maxWidth:1160,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <div className="tag ti" style={{marginBottom:16}}>Dead simple</div>
          <h2 className="syne" style={{fontSize:"clamp(28px,4vw,48px)",fontWeight:800,color:"white",letterSpacing:"-.02em",marginBottom:14}}>Three steps for you.<br/>Everything else is Sarah.</h2>
          <p style={{color:"var(--fog)",fontSize:17,maxWidth:500,margin:"0 auto"}}>Set up once. Sarah runs every sale from there.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
          {steps.map((s,i)=>(
            <div key={i} className="card" style={{padding:30,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:14,right:18,fontFamily:"'Syne',sans-serif",fontSize:76,fontWeight:800,color:s.c,opacity:.07,lineHeight:1,pointerEvents:"none"}}>{s.n}</div>
              <div style={{width:46,height:46,borderRadius:12,background:s.c,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20,fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:s.c==="var(--gold)"?"var(--ink)":"white"}}>{s.n}</div>
              <h3 className="syne" style={{fontWeight:700,fontSize:20,color:"white",marginBottom:10,letterSpacing:"-.01em"}}>{s.t}</h3>
              <p style={{color:"var(--fog)",fontSize:15,lineHeight:1.7}}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:"72px 40px",background:"var(--panel)",borderTop:"1px solid var(--edge)",borderBottom:"1px solid var(--edge)"}}>
        <div style={{maxWidth:1160,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <div className="tag tg" style={{marginBottom:16}}>Complete platform</div>
            <h2 className="syne" style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:800,color:"white",letterSpacing:"-.02em"}}>Six features. One platform.</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
            {feats.map((f,i)=>(
              <div key={i} className="panel" style={{padding:24,borderLeft:`3px solid ${f.c}`,transition:"transform .2s,box-shadow .2s",cursor:"default"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,.3)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
                <div style={{width:40,height:40,borderRadius:10,background:`${f.c}20`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14}}><IC n={f.i} s={20} c={f.c}/></div>
                <h4 className="syne" style={{fontWeight:700,fontSize:16,color:"white",marginBottom:8,letterSpacing:"-.01em"}}>{f.t}</h4>
                <p style={{color:"var(--fog)",fontSize:14,lineHeight:1.7}}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:"100px 40px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:300,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(91,82,245,.16) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1,maxWidth:580,margin:"0 auto"}}>
          <div style={{fontSize:52,marginBottom:16}}>🇬🇭</div>
          <h2 className="syne" style={{fontSize:"clamp(32px,5vw,54px)",fontWeight:800,color:"white",lineHeight:1.1,marginBottom:18,letterSpacing:"-.03em"}}>
            Your next sale starts<br/><span style={{color:"var(--gold)"}}>right here.</span>
          </h2>
          <p style={{color:"var(--fog)",fontSize:18,marginBottom:36,lineHeight:1.7}}>Join Ghanaian online businesses running flawless sale events with Sarah. No chaos. No missed orders. Just revenue.</p>
          <button className="btn bg" onClick={()=>setPage("signup")} style={{fontSize:17,padding:"18px 46px",borderRadius:12}}>Create Your Free Account →</button>
          <div style={{marginTop:18,color:"var(--ghost)",fontSize:13}}>No credit card required · Free to start · Cancel anytime</div>
        </div>
      </section>
    </div>
  );
}

function Auth({setPage,setUser}){
  const [mode,setMode]=useState("signup");
  const [form,setForm]=useState({email:"",password:"",confirm:"",business:"",phone:""});
  const [showPw,setShowPw]=useState(false);
  const [busy,setBusy]=useState(false);
  const [errs,setErrs]=useState({});
  const set=(k,v)=>{setForm(p=>({...p,[k]:v}));setErrs(p=>({...p,[k]:""}));};
  const validate=()=>{
    const e={};
    if(!form.email.includes("@"))e.email="Valid email required";
    if(form.password.length<6)e.password="Min 6 characters";
    if(mode==="signup"&&form.password!==form.confirm)e.confirm="Passwords don't match";
    if(mode==="signup"&&!form.business.trim())e.business="Required";
    return e;
  };
  const submit=async()=>{
    const e=validate();
    if(Object.keys(e).length){setErrs(e);return;}
    setBusy(true);
    await new Promise(r=>setTimeout(r,1200));
    setUser({email:form.email,business:form.business||"My Business",phone:form.phone});
    setPage("onboarding");
  };
  const Field=({label,field,type="text",ph})=>(
    <div style={{marginBottom:18}}>
      <label style={{display:"block",color:"var(--fog)",fontSize:12,fontWeight:600,marginBottom:7,letterSpacing:".04em"}}>{label}</label>
      <div style={{position:"relative"}}>
        <input className="inp" type={(field==="password"||field==="confirm")?(showPw?"text":"password"):type}
          placeholder={ph} value={form[field]} onChange={e=>set(field,e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
        {(field==="password"||field==="confirm")&&(
          <button onClick={()=>setShowPw(s=>!s)} style={{position:"absolute",right:13,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer"}}>
            <IC n={showPw?"eyeoff":"eye"} s={16} c="var(--ghost)"/>
          </button>
        )}
      </div>
      {errs[field]&&<div style={{color:"var(--coral)",fontSize:12,marginTop:5}}>⚠ {errs[field]}</div>}
    </div>
  );
  return(
    <div className="mesh" style={{minHeight:"100vh",paddingTop:62,display:"flex",alignItems:"center",justifyContent:"center",padding:"80px 20px"}}>
      <div style={{width:"100%",maxWidth:440}}>
        <div className="card" style={{padding:"36px 32px"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{width:52,height:52,borderRadius:14,background:"linear-gradient(135deg,#5B52F5,#7C74FF)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}><IC n="bot" s={24} c="white"/></div>
            <h2 className="syne" style={{fontSize:26,fontWeight:800,color:"white",marginBottom:6,letterSpacing:"-.02em"}}>{mode==="signup"?"Start selling smarter":"Welcome back"}</h2>
            <p style={{color:"var(--fog)",fontSize:14}}>{mode==="signup"?"Create your free Sarah account":"Sign in to your account"}</p>
          </div>
          <div style={{display:"flex",background:"var(--deep)",borderRadius:10,padding:4,marginBottom:24,gap:4}}>
            {["signup","login"].map(m=>(
              <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"9px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"'Karla',sans-serif",fontSize:14,fontWeight:600,transition:"all .2s",background:mode===m?"var(--indigo)":"transparent",color:mode===m?"white":"var(--ghost)"}}>
                {m==="signup"?"Create Account":"Log In"}
              </button>
            ))}
          </div>
          <Field label="EMAIL" field="email" type="email" ph="you@example.com"/>
          {mode==="signup"&&<Field label="BUSINESS NAME" field="business" ph="e.g. Nana Aba Collections"/>}
          {mode==="signup"&&<Field label="WHATSAPP NUMBER" field="phone" type="tel" ph="+233 XX XXX XXXX"/>}
          <Field label="PASSWORD" field="password" ph="Min 6 characters"/>
          {mode==="signup"&&<Field label="CONFIRM PASSWORD" field="confirm" ph="Repeat password"/>}
          <button className="btn bp" onClick={submit} disabled={busy} style={{width:"100%",padding:"14px",fontSize:15,borderRadius:10,marginTop:4}}>
            {busy?<><Sp sz={16} col="white"/>Processing…</>:mode==="signup"?"Create My Account →":"Sign In →"}
          </button>
          {mode==="signup"&&<p style={{textAlign:"center",color:"var(--ghost)",fontSize:12,marginTop:16}}>Free to start — no credit card needed.</p>}
          <div style={{textAlign:"center",marginTop:18,fontSize:13,color:"var(--fog)"}}>
            {mode==="signup"?<>Have an account? <button onClick={()=>setMode("login")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--lilac)",fontWeight:600,fontSize:13}}>Log in</button></>:<>No account? <button onClick={()=>setMode("signup")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--lilac)",fontWeight:600,fontSize:13}}>Sign up free</button></>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Onboarding({user,setPage,setUser}){
  const [step,setStep]=useState(1);
  const [brand,setBrand]=useState({name:user?.business||"",tone:"friendly",lang:"english",greeting:""});
  const [prods,setProds]=useState([{name:"",price:"",sizes:"S,M,L",stock:""}]);
  const [busy,setBusy]=useState(false);
  const link=useRef(`sarahsales.ai/s/${Math.random().toString(36).slice(2,8).toUpperCase()}`);
  const tones=[{id:"friendly",e:"😊",t:"Friendly",d:"Warm, casual — feels like a friend"},{id:"professional",e:"💼",t:"Professional",d:"Polished, brand-forward, clean English"},{id:"playful",e:"🔥",t:"Playful",d:"Fun, energetic — heavy Pidgin vibes"}];
  const langs=[{id:"english",f:"🇬🇧",t:"English"},{id:"pidgin",f:"🇬🇭",t:"English + Pidgin"},{id:"twi",f:"🌍",t:"Twi",dis:true}];
  const addP=()=>setProds(p=>[...p,{name:"",price:"",sizes:"S,M,L",stock:""}]);
  const delP=i=>setProds(p=>p.filter((_,j)=>j!==i));
  const updP=(i,k,v)=>setProds(p=>p.map((x,j)=>j===i?{...x,[k]:v}:x));
  const finish=async()=>{
    setBusy(true);
    await new Promise(r=>setTimeout(r,1500));
    setUser(u=>({...u,business:brand.name||u.business,onboarded:true,saleLink:link.current}));
    setPage("dashboard");
  };
  const Node=({n})=>(
    <div style={{width:32,height:32,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,fontFamily:"'Syne',sans-serif",transition:"all .3s",
      background:step===n?"var(--indigo)":step>n?"var(--jade)":"var(--soft)",
      color:step>=n?"white":"var(--ghost)",
      border:`2px solid ${step===n?"var(--violet)":step>n?"var(--jade)":"var(--edge)"}`,
      boxShadow:step===n?"0 0 16px rgba(91,82,245,.4)":"none"}}>
      {step>n?<IC n="check" s={14} c="white"/>:n}
    </div>
  );
  return(
    <div className="mesh" style={{minHeight:"100vh",paddingTop:62,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"80px 20px"}}>
      <div style={{width:"100%",maxWidth:560}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:6}}>
          {[1,2,3].map((n,i)=>(
            <div key={n} style={{display:"flex",alignItems:"center",gap:8}}>
              <Node n={n}/>
              {i<2&&<div style={{width:60,height:2,borderRadius:1,transition:"background .4s",background:step>n?"var(--jade)":"var(--edge)"}}/>}
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",color:"var(--ghost)",fontSize:12,marginBottom:24}}>Step {step} of 3</div>
        <div className="card" style={{padding:"34px 32px"}}>
          {step===1&&(
            <div className="afi">
              <h2 className="syne" style={{fontSize:24,fontWeight:800,color:"white",marginBottom:6,letterSpacing:"-.02em"}}>Set up your brand</h2>
              <p style={{color:"var(--fog)",fontSize:14,marginBottom:26}}>Sarah will speak on behalf of your business. Make her sound like you.</p>
              <label style={{display:"block",color:"var(--fog)",fontSize:12,fontWeight:600,marginBottom:7,letterSpacing:".04em"}}>BUSINESS NAME</label>
              <input className="inp" value={brand.name} onChange={e=>setBrand(b=>({...b,name:e.target.value}))} placeholder="e.g. Nana Aba Collections" style={{marginBottom:24}}/>
              <label style={{display:"block",color:"var(--fog)",fontSize:12,fontWeight:600,marginBottom:12,letterSpacing:".04em"}}>SARAH'S TONE</label>
              <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:24}}>
                {tones.map(t=>(
                  <div key={t.id} onClick={()=>setBrand(b=>({...b,tone:t.id}))} style={{padding:"13px 16px",borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",gap:12,transition:"all .15s",border:`1px solid ${brand.tone===t.id?"var(--indigo)":"var(--edge)"}`,background:brand.tone===t.id?"rgba(91,82,245,.1)":"transparent"}}>
                    <span style={{fontSize:20}}>{t.e}</span>
                    <div><div style={{fontWeight:600,fontSize:14,color:"white"}}>{t.t}</div><div style={{color:"var(--fog)",fontSize:12}}>{t.d}</div></div>
                    <div style={{marginLeft:"auto",width:20,height:20,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${brand.tone===t.id?"var(--indigo)":"var(--edge)"}`,background:brand.tone===t.id?"var(--indigo)":"transparent"}}>
                      {brand.tone===t.id&&<IC n="check" s={10} c="white"/>}
                    </div>
                  </div>
                ))}
              </div>
              <label style={{display:"block",color:"var(--fog)",fontSize:12,fontWeight:600,marginBottom:7}}>CUSTOM GREETING (optional)</label>
              <input className="inp" value={brand.greeting} onChange={e=>setBrand(b=>({...b,greeting:e.target.value}))} placeholder={`"Welcome to our Christmas Sale! I'm Sarah 🎁"`}/>
              <div style={{color:"var(--ghost)",fontSize:12,marginTop:6}}>Leave blank for Sarah's default greeting</div>
            </div>
          )}
          {step===2&&(
            <div className="afi">
              <h2 className="syne" style={{fontSize:24,fontWeight:800,color:"white",marginBottom:6,letterSpacing:"-.02em"}}>Language settings</h2>
              <p style={{color:"var(--fog)",fontSize:14,marginBottom:26}}>Choose how Sarah communicates with your customers.</p>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:26}}>
                {langs.map(l=>(
                  <div key={l.id} onClick={()=>!l.dis&&setBrand(b=>({...b,lang:l.id}))} style={{padding:"15px 16px",borderRadius:10,cursor:l.dis?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:12,transition:"all .15s",opacity:l.dis?.5:1,border:`1px solid ${brand.lang===l.id?"var(--indigo)":"var(--edge)"}`,background:brand.lang===l.id?"rgba(91,82,245,.1)":"transparent"}}>
                    <span style={{fontSize:24}}>{l.f}</span>
                    <div style={{fontWeight:600,fontSize:15,color:"white"}}>{l.t}</div>
                    {l.dis?<div className="tag ti" style={{fontSize:10,marginLeft:"auto"}}>V2</div>:
                    <div style={{marginLeft:"auto",width:20,height:20,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${brand.lang===l.id?"var(--indigo)":"var(--edge)"}`,background:brand.lang===l.id?"var(--indigo)":"transparent"}}>
                      {brand.lang===l.id&&<IC n="check" s={10} c="white"/>}
                    </div>}
                  </div>
                ))}
              </div>
              <div className="panel" style={{padding:16,borderLeft:"3px solid var(--gold)"}}>
                <div style={{display:"flex",gap:10}}>
                  <span style={{fontSize:20,flexShrink:0}}>🎤</span>
                  <div>
                    <div style={{fontWeight:600,color:"white",fontSize:14,marginBottom:4}}>Voice Note Support — included</div>
                    <div style={{color:"var(--fog)",fontSize:13,lineHeight:1.6}}>Sarah transcribes voice notes via Whisper AI and responds in text. Every customer supported, regardless of how they message.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step===3&&(
            <div className="afi">
              <h2 className="syne" style={{fontSize:24,fontWeight:800,color:"white",marginBottom:6,letterSpacing:"-.02em"}}>Add your products</h2>
              <p style={{color:"var(--fog)",fontSize:14,marginBottom:20}}>Sarah needs your inventory to sell. Add at least one product to launch.</p>
              <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:14,maxHeight:320,overflowY:"auto"}}>
                {prods.map((p,i)=>(
                  <div key={i} className="panel" style={{padding:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <span style={{color:"var(--fog)",fontSize:11,fontWeight:600,letterSpacing:".05em"}}>PRODUCT {i+1}</span>
                      {prods.length>1&&<button className="btn bxs" onClick={()=>delP(i)} style={{background:"rgba(255,107,107,.12)",color:"var(--coral)",border:"1px solid rgba(255,107,107,.2)",gap:4}}><IC n="trash" s={11} c="var(--coral)"/>Remove</button>}
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                      <div><div style={{color:"var(--ghost)",fontSize:11,marginBottom:3}}>Name</div><input className="inp" value={p.name} onChange={e=>updP(i,"name",e.target.value)} placeholder="e.g. Kente Wrap Dress" style={{fontSize:13,padding:"8px 11px"}}/></div>
                      <div><div style={{color:"var(--ghost)",fontSize:11,marginBottom:3}}>Price (GH₵)</div><input className="inp" type="number" value={p.price} onChange={e=>updP(i,"price",e.target.value)} placeholder="280" style={{fontSize:13,padding:"8px 11px"}}/></div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      <div><div style={{color:"var(--ghost)",fontSize:11,marginBottom:3}}>Sizes (comma-separated)</div><input className="inp" value={p.sizes} onChange={e=>updP(i,"sizes",e.target.value)} placeholder="S,M,L,XL" style={{fontSize:13,padding:"8px 11px"}}/></div>
                      <div><div style={{color:"var(--ghost)",fontSize:11,marginBottom:3}}>Stock per size</div><input className="inp" value={p.stock} onChange={e=>updP(i,"stock",e.target.value)} placeholder="5,8,6,3" style={{fontSize:13,padding:"8px 11px"}}/></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn bh bsm" onClick={addP} style={{width:"100%",marginBottom:4}}><IC n="plus" s={14}/>Add another product</button>
            </div>
          )}
          <div style={{display:"flex",justifyContent:"space-between",marginTop:26,gap:10}}>
            {step>1?<button className="btn bh" onClick={()=>setStep(s=>s-1)}>← Back</button>:<div/>}
            {step<3?<button className="btn bp" onClick={()=>setStep(s=>s+1)}>Continue →</button>:
            <button className="btn bg" onClick={finish} disabled={busy}>
              {busy?<><Sp sz={15} col="var(--ink)"/>Launching Sarah…</>:"🚀 Launch Sarah →"}
            </button>}
          </div>
        </div>
        <div style={{textAlign:"center",marginTop:18,color:"var(--ghost)",fontSize:12}}>Everything can be edited later from your dashboard</div>
      </div>
    </div>
  );
}

function Dashboard({user}){
  const [tab,setTab]=useState("overview");
  const [live,setLive]=useState(false);
  const [orders,setOrders]=useState([]);
  const [copied,setCopied]=useState(false);
  const saleLink=user?.saleLink||"sarahsales.ai/s/DEMO01";
  const products=STORE.products;

  useEffect(()=>{
    if(!live)return;
    const NAMES=["Adjoa K.","Efua M.","Kojo A.","Ama S.","Kwame B.","Abena T.","Yaw O.","Akosua P.","Nana E.","Kofi D.","Serwa A.","Dede M."];
    const iv=setInterval(()=>{
      setOrders(prev=>{
        if(prev.length>=16)return prev;
        const p=products[Math.floor(Math.random()*products.length)];
        const sz=p.sizes[Math.floor(Math.random()*p.sizes.length)];
        return[{id:`GH-${Math.random().toString(36).slice(2,8).toUpperCase()}`,customer:NAMES[Math.floor(Math.random()*NAMES.length)],item:`${p.name} (${sz})`,price:p.price,status:Math.random()>.28?"confirmed":"pending",pidx:products.indexOf(p)},...prev];
      });
    },2600);
    return()=>clearInterval(iv);
  },[live]);

  const confirmed=orders.filter(o=>o.status==="confirmed");
  const pending=orders.filter(o=>o.status==="pending");
  const revenue=confirmed.reduce((s,o)=>s+o.price,0);
  const copy=()=>{setCopied(true);setTimeout(()=>setCopied(false),2200);};

  const TABS=[
    {id:"overview",l:"Overview",i:"grid"},
    {id:"orders",l:"Orders",i:"box"},
    {id:"inventory",l:"Inventory",i:"inv"},
    {id:"analytics",l:"Analytics",i:"chart"},
    {id:"preview",l:"Preview Sarah",i:"bot"},
  ];
  const MET=[
    {l:"Revenue",v:`GH₵${revenue.toLocaleString()}`,s:`${confirmed.length} confirmed`,c:"var(--jade)",i:"chart"},
    {l:"Orders",v:orders.length,s:`${pending.length} pending`,c:"var(--indigo)",i:"box"},
    {l:"Customers",v:orders.length,s:"handled by Sarah",c:"var(--gold)",i:"users"},
    {l:"Conv. Rate",v:orders.length?`${Math.round(confirmed.length/orders.length*100)}%`:"—",s:"DM → paid order",c:"var(--lilac)",i:"zap"},
  ];

  return(
    <div style={{minHeight:"100vh",paddingTop:62,background:"var(--ink)"}}>
      <div style={{background:"var(--panel)",borderBottom:"1px solid var(--edge)",padding:"0 28px",display:"flex",alignItems:"center",gap:2,overflowX:"auto"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"14px 18px",background:"none",border:"none",cursor:"pointer",fontFamily:"'Karla',sans-serif",fontSize:14,fontWeight:600,display:"flex",alignItems:"center",gap:7,whiteSpace:"nowrap",flexShrink:0,transition:"all .15s",color:tab===t.id?"white":"var(--ghost)",borderBottom:`2px solid ${tab===t.id?"var(--indigo)":"transparent"}`}}>
            <IC n={t.i} s={15} c={tab===t.id?"var(--indigo)":"var(--ghost)"}/>{t.l}
          </button>
        ))}
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:10,padding:"8px 0",flexShrink:0}}>
          {live?(
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{position:"relative",width:10,height:10}}>
                <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"var(--jade)",opacity:.4,animation:"ping 1.5s cubic-bezier(0,0,.2,1) infinite"}}/>
                <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"var(--jade)"}}/>
              </div>
              <span style={{color:"var(--jade)",fontSize:13,fontWeight:700}}>SALE LIVE</span>
              <button className="btn bxs" onClick={()=>setLive(false)} style={{background:"rgba(255,107,107,.12)",color:"var(--coral)",border:"1px solid rgba(255,107,107,.25)",borderRadius:6}}>End Sale</button>
            </div>
          ):<button className="btn bg bsm" onClick={()=>setLive(true)}>⚡ Start Sale Event</button>}
        </div>
      </div>

      <div style={{maxWidth:1160,margin:"0 auto",padding:"26px 28px"}}>
        {tab==="overview"&&(
          <div className="afi">
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:24,gap:16,flexWrap:"wrap"}}>
              <div>
                <h2 className="syne" style={{fontSize:24,fontWeight:800,color:"white",marginBottom:4,letterSpacing:"-.02em"}}>Welcome back, {user?.business} 👋</h2>
                <p style={{color:"var(--fog)",fontSize:14}}>{live?"🔴 Your sale is live — Sarah is handling every incoming DM automatically.":"Press ⚡ Start Sale Event to go live. Sarah takes over instantly."}</p>
              </div>
              <div className="card" style={{padding:"13px 18px",display:"flex",alignItems:"center",gap:14,flexShrink:0}}>
                <div><div style={{color:"var(--ghost)",fontSize:10,fontWeight:600,letterSpacing:".06em",marginBottom:2}}>YOUR SARAH LINK</div><div style={{color:"var(--lilac)",fontSize:14,fontWeight:600}}>{saleLink}</div></div>
                <button className="btn bxs" onClick={copy} style={{background:copied?"rgba(18,201,142,.12)":"rgba(91,82,245,.12)",color:copied?"var(--jade)":"var(--lilac)",border:`1px solid ${copied?"rgba(18,201,142,.3)":"rgba(91,82,245,.3)"}`,borderRadius:7,gap:5}}>
                  <IC n={copied?"check":"copy"} s={12} c={copied?"var(--jade)":"var(--lilac)"}/>{copied?"Copied!":"Copy"}
                </button>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
              {MET.map((m,i)=>(
                <div key={i} className="card" style={{padding:"18px 16px",borderTop:`2px solid ${m.c}`}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                    <div style={{color:"var(--ghost)",fontSize:11,fontWeight:600,letterSpacing:".05em"}}>{m.l.toUpperCase()}</div>
                    <div style={{width:30,height:30,borderRadius:8,background:`${m.c}18`,display:"flex",alignItems:"center",justifyContent:"center"}}><IC n={m.i} s={15} c={m.c}/></div>
                  </div>
                  <div className="syne" style={{fontSize:26,fontWeight:800,color:"white",lineHeight:1}}>{m.v}</div>
                  <div style={{color:"var(--ghost)",fontSize:11,marginTop:6}}>{m.s}</div>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr",gap:18}}>
              <div className="card" style={{padding:20}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
                  <h3 className="syne" style={{fontWeight:700,color:"white",fontSize:16,letterSpacing:"-.01em"}}>Live Order Feed</h3>
                  {live&&<div className="tag tj" style={{fontSize:10}}>● LIVE</div>}
                </div>
                {orders.length===0?(
                  <div style={{textAlign:"center",padding:"40px 20px",color:"var(--ghost)"}}>
                    <div style={{fontSize:36,marginBottom:12}}>{live?"⏳":"🚀"}</div>
                    <div style={{fontSize:13,lineHeight:1.6}}>{live?"Sarah is live — waiting for customers to DM in…":"Start a sale event to see real-time orders appear here."}</div>
                  </div>
                ):(
                  <div style={{display:"flex",flexDirection:"column",gap:7,maxHeight:320,overflowY:"auto"}}>
                    {orders.map((o,i)=>(
                      <div key={i} className="asi panel" style={{padding:"11px 13px",display:"flex",alignItems:"center",gap:11}}>
                        <Av ch={o.customer.charAt(0)} sz={34} gr={`135deg,${["#5B52F5","#F5A623","#12C98E","#60BDFF"][o.pidx%4]},${["#7C74FF","#FFD47A","#0EA570","#3AA4E8"][o.pidx%4]}`}/>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontWeight:600,fontSize:14,color:"white"}}>{o.customer}</div>
                          <div style={{color:"var(--fog)",fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{o.item}</div>
                        </div>
                        <div style={{textAlign:"right",flexShrink:0}}>
                          <div style={{fontWeight:700,color:"var(--gold)",fontSize:14}}>GH₵{o.price}</div>
                          <div style={{fontSize:11,fontWeight:600,color:o.status==="confirmed"?"var(--jade)":"var(--gold)"}}>{o.status==="confirmed"?"✓ Confirmed":"⏳ Pending"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <div className="card" style={{padding:18}}>
                  <h3 className="syne" style={{fontWeight:700,color:"white",fontSize:15,letterSpacing:"-.01em",marginBottom:14}}>Inventory Snapshot</h3>
                  {products.map((p,i)=>{
                    const total=Object.values(p.stock).reduce((a,b)=>a+b,0);
                    const sold=Math.min(Math.round(confirmed.length*[.4,.3,.2,.1][i]),total);
                    const pct=total?Math.round(sold/total*100):0;
                    return(
                      <div key={i} style={{marginBottom:11}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:"white",fontWeight:500}}>{p.name}</span><span style={{fontSize:11,color:"var(--ghost)"}}>{total-sold}/{total}</span></div>
                        <div style={{height:5,background:"var(--edge)",borderRadius:3}}><div style={{height:"100%",width:`${pct}%`,borderRadius:3,transition:"width .6s",background:pct>70?"var(--coral)":pct>40?"var(--gold)":"var(--jade)"}}/></div>
                      </div>
                    );
                  })}
                </div>
                <div className="card" style={{padding:18}}>
                  <h3 className="syne" style={{fontWeight:700,color:"white",fontSize:15,letterSpacing:"-.01em",marginBottom:12}}>Quick Actions</h3>
                  <div style={{display:"flex",flexDirection:"column",gap:7}}>
                    {[{i:"link",l:"Share sale link",c:"var(--indigo)",a:copy},{i:"box",l:"View all orders",c:"var(--gold)",a:()=>setTab("orders")},{i:"inv",l:"Manage inventory",c:"var(--jade)",a:()=>setTab("inventory")},{i:"bot",l:"Preview Sarah",c:"var(--lilac)",a:()=>setTab("preview")}].map((a,j)=>(
                      <button key={j} className="btn" onClick={a.a} style={{background:"var(--panel)",border:"1px solid var(--edge)",borderRadius:9,padding:"10px 13px",color:"white",fontSize:13,justifyContent:"flex-start",gap:9,width:"100%"}}
                        onMouseEnter={e=>e.currentTarget.style.borderColor="var(--soft)"} onMouseLeave={e=>e.currentTarget.style.borderColor="var(--edge)"}>
                        <div style={{width:28,height:28,borderRadius:7,background:`${a.c}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><IC n={a.i} s={14} c={a.c}/></div>{a.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab==="orders"&&(
          <div className="afi">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
              <div><h2 className="syne" style={{fontSize:22,fontWeight:800,color:"white",letterSpacing:"-.02em",marginBottom:3}}>Orders</h2><p style={{color:"var(--fog)",fontSize:13}}>{orders.length} total · GH₵{revenue.toLocaleString()} confirmed</p></div>
              <div style={{display:"flex",gap:8}}><div className="tag tj">{confirmed.length} Confirmed</div><div className="tag tg">{pending.length} Pending</div></div>
            </div>
            <div className="card" style={{overflow:"hidden"}}>
              <table>
                <thead><tr>{["Token","Customer","Item","Amount","Status","Action"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                  {orders.length===0&&<tr><td colSpan={6} style={{textAlign:"center",padding:"52px 20px",color:"var(--ghost)",fontSize:13}}>No orders yet — start a sale event from the Overview tab</td></tr>}
                  {orders.map((o,i)=>(
                    <tr key={i} className="asi">
                      <td><code style={{color:"var(--lilac)",fontSize:12,background:"rgba(91,82,245,.1)",padding:"2px 7px",borderRadius:5}}>{o.id}</code></td>
                      <td style={{color:"white",fontWeight:500}}>{o.customer}</td>
                      <td style={{color:"var(--fog)"}}>{o.item}</td>
                      <td style={{color:"var(--gold)",fontWeight:700}}>GH₵{o.price}</td>
                      <td><div className="tag" style={{fontSize:11,background:o.status==="confirmed"?"rgba(18,201,142,.12)":"rgba(245,166,35,.12)",color:o.status==="confirmed"?"var(--jade)":"var(--gold)",border:`1px solid ${o.status==="confirmed"?"rgba(18,201,142,.28)":"rgba(245,166,35,.28)"}`}}>{o.status==="confirmed"?"✓ Confirmed":"⏳ Pending"}</div></td>
                      <td><button className="btn bh bxs">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="inventory"&&(
          <div className="afi">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,gap:12,flexWrap:"wrap"}}>
              <div><h2 className="syne" style={{fontSize:22,fontWeight:800,color:"white",letterSpacing:"-.02em",marginBottom:3}}>Inventory</h2><p style={{color:"var(--fog)",fontSize:13}}>Manage your products and live stock</p></div>
              <button className="btn bp bsm"><IC n="plus" s={14} c="white"/>Add Product</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
              {products.map((p,i)=>{
                const total=Object.values(p.stock).reduce((a,b)=>a+b,0);
                return(
                  <div key={i} className="card" style={{padding:22}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
                      <div><h4 className="syne" style={{fontWeight:700,fontSize:16,color:"white",marginBottom:4,letterSpacing:"-.01em"}}>{p.name}</h4><div className="syne" style={{fontSize:22,fontWeight:800,color:"var(--gold)"}}>GH₵{p.price}</div></div>
                      <button className="btn bh bxs">Edit</button>
                    </div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
                      {p.sizes.map(s=>(
                        <div key={s} style={{padding:"6px 12px",borderRadius:8,background:"var(--panel)",textAlign:"center",border:`1px solid ${p.stock[s]<3?"rgba(255,107,107,.4)":p.stock[s]<5?"rgba(245,166,35,.4)":"var(--edge)"}`}}>
                          <div style={{fontSize:12,fontWeight:700,color:"white"}}>{s}</div>
                          <div style={{fontSize:10,color:p.stock[s]<3?"var(--coral)":p.stock[s]<5?"var(--gold)":"var(--jade)"}}>{p.stock[s]} left</div>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 13px",background:"var(--panel)",borderRadius:9}}><span style={{color:"var(--fog)",fontSize:12}}>Total units</span><span style={{fontWeight:700,color:"white",fontSize:14}}>{total}</span></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab==="analytics"&&(
          <div className="afi">
            <div style={{marginBottom:22}}><h2 className="syne" style={{fontSize:22,fontWeight:800,color:"white",letterSpacing:"-.02em",marginBottom:3}}>Analytics</h2><p style={{color:"var(--fog)",fontSize:13}}>Performance breakdown for your current event</p></div>
            {orders.length===0?(
              <div className="card" style={{padding:"56px 36px",textAlign:"center"}}>
                <div style={{fontSize:46,marginBottom:14}}>📊</div>
                <h3 className="syne" style={{fontSize:20,color:"white",marginBottom:8,letterSpacing:"-.01em"}}>No data yet</h3>
                <p style={{color:"var(--fog)",maxWidth:380,margin:"0 auto 24px",lineHeight:1.7,fontSize:14}}>Start a sale event and let Sarah handle some orders. Analytics appear here in real time.</p>
                <button className="btn bp bsm" onClick={()=>setTab("overview")}>← Back to Overview</button>
              </div>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
                <div className="card" style={{padding:20,gridColumn:"span 2",borderTop:"2px solid var(--jade)"}}>
                  <h4 className="syne" style={{fontWeight:700,color:"white",fontSize:14,marginBottom:18,letterSpacing:"-.01em"}}>Revenue Summary</h4>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                    {[{l:"Confirmed",v:`GH₵${revenue.toLocaleString()}`,c:"var(--jade)"},{l:"Pending",v:`GH₵${pending.reduce((s,o)=>s+o.price,0).toLocaleString()}`,c:"var(--gold)"},{l:"Orders",v:orders.length,c:"var(--indigo)"}].map((s,i)=>(
                      <div key={i} style={{padding:14,background:"var(--panel)",borderRadius:10,textAlign:"center"}}>
                        <div className="syne" style={{fontSize:24,fontWeight:800,color:s.c}}>{s.v}</div>
                        <div style={{color:"var(--ghost)",fontSize:11,marginTop:4}}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card" style={{padding:20,borderTop:"2px solid var(--indigo)"}}>
                  <h4 className="syne" style={{fontWeight:700,color:"white",fontSize:14,marginBottom:16,letterSpacing:"-.01em"}}>Conversion Funnel</h4>
                  {[{l:"DMs received",v:orders.length*4,p:100,c:"var(--lilac)"},{l:"Items browsed",v:orders.length*3,p:75,c:"var(--indigo)"},{l:"Orders placed",v:orders.length,p:25,c:"var(--gold)"},{l:"Confirmed paid",v:confirmed.length,p:Math.round(confirmed.length/(orders.length||1)*25),c:"var(--jade)"}].map((f,i)=>(
                    <div key={i} style={{marginBottom:11}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:"var(--fog)"}}>{f.l}</span><span style={{fontSize:11,color:"white",fontWeight:600}}>{f.v}</span></div>
                      <div style={{height:4,background:"var(--edge)",borderRadius:2}}><div style={{height:"100%",width:`${f.p}%`,background:f.c,borderRadius:2}}/></div>
                    </div>
                  ))}
                </div>
                <div className="card" style={{padding:20,gridColumn:"span 2",borderTop:"2px solid var(--gold)"}}>
                  <h4 className="syne" style={{fontWeight:700,color:"white",fontSize:14,marginBottom:16,letterSpacing:"-.01em"}}>Product Performance</h4>
                  {products.map((p,i)=>{
                    const sold=Math.max(1,Math.round(confirmed.length*[.4,.3,.2,.1][i]));
                    return(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:11,marginBottom:9,padding:"9px 11px",background:"var(--panel)",borderRadius:9}}>
                        <div style={{width:8,height:8,borderRadius:"50%",background:["var(--jade)","var(--indigo)","var(--gold)","var(--lilac)"][i],flexShrink:0}}/>
                        <div style={{flex:1}}><div style={{fontSize:13,color:"white",fontWeight:500}}>{p.name}</div><div style={{fontSize:11,color:"var(--ghost)"}}>{sold} sold · GH₵{p.price} each</div></div>
                        <div className="syne" style={{fontSize:17,fontWeight:700,color:"var(--gold)"}}>GH₵{(p.price*sold).toLocaleString()}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="card" style={{padding:20,borderTop:"2px solid var(--lilac)"}}>
                  <h4 className="syne" style={{fontWeight:700,color:"white",fontSize:14,marginBottom:14,letterSpacing:"-.01em"}}>💡 Sarah's Insights</h4>
                  {["Kente Wrap Dress M is your fastest-selling item — restock before your next event.","3 customers asked about Twi. Enabling it in V2 could significantly lift conversion.","Peak conversion happens in your first 2 hours. Consider flash deals to sustain momentum."].map((tip,i)=>(
                    <div key={i} style={{display:"flex",gap:9,marginBottom:10,padding:"9px 10px",background:"var(--panel)",borderRadius:9}}>
                      <span style={{fontSize:14,flexShrink:0}}>💡</span>
                      <p style={{color:"var(--fog)",fontSize:12,lineHeight:1.6}}>{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab==="preview"&&(
          <div className="afi" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:18}}>
            <div style={{textAlign:"center"}}>
              <h2 className="syne" style={{fontSize:22,fontWeight:800,color:"white",letterSpacing:"-.02em",marginBottom:6}}>Preview Sarah</h2>
              <p style={{color:"var(--fog)",fontSize:14,maxWidth:480,margin:"0 auto"}}>This is exactly what your customers experience when they DM during your sale. The chat below is live AI.</p>
            </div>
            <div style={{width:"100%",maxWidth:440}}><SarahChat storeName={user?.business||STORE.name} products={STORE.products} compact/></div>
            <div className="panel" style={{padding:"14px 20px",borderLeft:"3px solid var(--gold)",maxWidth:440,width:"100%"}}>
              <div style={{fontWeight:600,color:"white",fontSize:14,marginBottom:4}}>Your live Sarah link 🔗</div>
              <div style={{color:"var(--lilac)",fontWeight:600,fontSize:15,marginBottom:8}}>{saleLink}</div>
              <div style={{color:"var(--fog)",fontSize:13}}>Share this in your next Instagram or WhatsApp sale post. Every customer who messages gets routed directly to Sarah.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App(){
  const [page,setPage]=useState("landing");
  const [user,setUser]=useState(null);
  return(
    <>
      <Styles/>
      <NavBar page={page} setPage={setPage} user={user} setUser={setUser}/>
      {page==="landing"    && <Landing    setPage={setPage}/>}
      {page==="signup"     && <Auth       setPage={setPage} setUser={setUser}/>}
      {page==="onboarding" && <Onboarding setPage={setPage} setUser={setUser} user={user}/>}
      {page==="dashboard"  && <Dashboard  user={user}/>}
    </>
  );
}