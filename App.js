import { useState } from "react";

const COLORS = {
  bg: "#0a0f0d",
  surface: "#111a14",
  card: "#162019",
  border: "#1e3024",
  accent: "#3ddc68",
  accentDim: "#2aad4a",
  accentGlow: "rgba(61,220,104,0.15)",
  text: "#e8f5eb",
  muted: "#6b8f74",
  danger: "#ff5a5a",
  warn: "#f5a623",
  blue: "#4db8ff",
};

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; overflow: hidden; }
  body { background: ${COLORS.bg}; color: ${COLORS.text}; font-family: 'Space Grotesk', sans-serif; -webkit-tap-highlight-color: transparent; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; }
  input, select { font-family: 'Space Grotesk', sans-serif; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  .fade-in { animation: fadeIn 0.35s ease forwards; }
  .progress-bar { height:8px; background:${COLORS.border}; border-radius:99px; overflow:hidden; }
  .progress-fill { height:100%; border-radius:99px; transition: width 0.7s cubic-bezier(0.34,1.56,0.64,1); }
  .tab-btn { background:none; border:none; color:${COLORS.muted}; cursor:pointer; padding:8px 14px; border-radius:10px; font-family:'Space Grotesk',sans-serif; font-size:13px; font-weight:500; transition:all 0.2s; white-space:nowrap; display:flex; flex-direction:column; align-items:center; gap:2px; min-width:56px; }
  .tab-btn:hover { color:${COLORS.text}; }
  .tab-btn.active { color:${COLORS.accent}; }
  .tab-btn .tab-icon { font-size:20px; }
  .tab-btn .tab-label { font-size:10px; }
  .btn-primary { background:${COLORS.accent}; color:#0a0f0d; border:none; border-radius:12px; padding:13px 24px; font-weight:700; font-size:15px; cursor:pointer; font-family:'Space Grotesk',sans-serif; transition:all 0.2s; -webkit-tap-highlight-color:transparent; }
  .btn-primary:active { transform:scale(0.97); }
  .btn-secondary { background:${COLORS.card}; color:${COLORS.text}; border:1px solid ${COLORS.border}; border-radius:12px; padding:10px 18px; font-weight:500; font-size:14px; cursor:pointer; font-family:'Space Grotesk',sans-serif; transition:all 0.2s; -webkit-tap-highlight-color:transparent; }
  .btn-secondary:active { transform:scale(0.97); }
  .input-field { width:100%; background:${COLORS.bg}; border:1px solid ${COLORS.border}; border-radius:10px; padding:13px 16px; color:${COLORS.text}; font-size:16px; outline:none; transition:border 0.2s; -webkit-appearance:none; }
  .input-field:focus { border-color:${COLORS.accent}; }
  .input-field::placeholder { color:${COLORS.muted}; }
  select.input-field option { background:${COLORS.bg}; }
  .card { background:${COLORS.card}; border:1px solid ${COLORS.border}; border-radius:16px; padding:18px; }
  .tag { display:inline-flex; align-items:center; background:${COLORS.accentGlow}; color:${COLORS.accent}; border:1px solid rgba(61,220,104,0.2); border-radius:99px; padding:4px 10px; font-size:11px; font-weight:600; }
  .tag.warn { background:rgba(245,166,35,0.1); color:${COLORS.warn}; border-color:rgba(245,166,35,0.2); }
  .tag.blue { background:rgba(77,184,255,0.1); color:${COLORS.blue}; border-color:rgba(77,184,255,0.2); }
  .chip { display:flex; align-items:center; gap:6px; background:${COLORS.surface}; border:1.5px solid ${COLORS.border}; border-radius:10px; padding:10px 14px; font-size:14px; cursor:pointer; transition:all 0.2s; user-select:none; -webkit-tap-highlight-color:transparent; }
  .chip:active { transform:scale(0.98); }
  .chip.selected { background:${COLORS.accentGlow}; border-color:${COLORS.accent}; color:${COLORS.accent}; font-weight:600; }
  .mono { font-family:'DM Mono', monospace; }
  #root { height: 100%; display: flex; flex-direction: column; }
  .app-shell { display: flex; flex-direction: column; height: 100%; overflow: hidden; }
  .content-area { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: env(safe-area-inset-top, 0) 0 0 0; }
  .bottom-nav { border-top: 1px solid ${COLORS.border}; background: ${COLORS.surface}; padding: 6px 0 calc(6px + env(safe-area-inset-bottom, 0)); display: flex; justify-content: space-around; flex-shrink: 0; }
`;

// ---------- DATA ----------
const FOOD_DB = [
  { name:"Œuf entier", cal:78, p:6, g:0.6, l:5, unit:"pièce" },
  { name:"Blanc de poulet (100g)", cal:165, p:31, g:0, l:3.6, unit:"100g" },
  { name:"Riz blanc cuit (100g)", cal:130, p:2.7, g:28, l:0.3, unit:"100g" },
  { name:"Flocons d'avoine (40g)", cal:150, p:5, g:27, l:2.5, unit:"40g" },
  { name:"Banane", cal:89, p:1.1, g:23, l:0.3, unit:"pièce" },
  { name:"Pomme", cal:52, p:0.3, g:14, l:0.2, unit:"pièce" },
  { name:"Yaourt grec (170g)", cal:130, p:17, g:6, l:4, unit:"pot" },
  { name:"Fromage blanc 0% (100g)", cal:48, p:8, g:4, l:0.1, unit:"100g" },
  { name:"Saumon (100g)", cal:208, p:20, g:0, l:13, unit:"100g" },
  { name:"Thon en boîte (100g)", cal:109, p:25, g:0, l:1, unit:"100g" },
  { name:"Brocoli (100g)", cal:34, p:2.8, g:7, l:0.4, unit:"100g" },
  { name:"Épinards (100g)", cal:23, p:2.9, g:3.6, l:0.4, unit:"100g" },
  { name:"Lentilles cuites (100g)", cal:116, p:9, g:20, l:0.4, unit:"100g" },
  { name:"Pain complet (tranche)", cal:74, p:3.6, g:14, l:0.9, unit:"tranche" },
  { name:"Amandes (30g)", cal:173, p:6, g:6, l:15, unit:"30g" },
  { name:"Huile d'olive (1 c.s.)", cal:119, p:0, g:0, l:14, unit:"c.s." },
  { name:"Lait demi-écrémé (250ml)", cal:120, p:8, g:12, l:4, unit:"verre" },
  { name:"Protéines whey (30g)", cal:120, p:24, g:3, l:1.5, unit:"dose" },
  { name:"Avocat (100g)", cal:160, p:2, g:9, l:15, unit:"100g" },
  { name:"Pâtes complètes cuites (100g)", cal:157, p:5.5, g:30, l:1, unit:"100g" },
  { name:"Patate douce (100g)", cal:86, p:1.6, g:20, l:0.1, unit:"100g" },
  { name:"Steak haché 5% (100g)", cal:135, p:22, g:0, l:5, unit:"100g" },
];

const GYM_EXERCISES = [
  { name:"Développé couché", muscles:"Pectoraux, Triceps", met:5 },
  { name:"Squat barre", muscles:"Quadriceps, Fessiers", met:6 },
  { name:"Soulevé de terre", muscles:"Dos, Ischio-jambiers", met:6 },
  { name:"Tractions", muscles:"Dos, Biceps", met:5 },
  { name:"Presse à cuisses", muscles:"Quadriceps", met:4.5 },
  { name:"Rowing barre", muscles:"Dos large", met:5 },
  { name:"Développé militaire", muscles:"Épaules, Triceps", met:5 },
  { name:"Leg curl", muscles:"Ischio-jambiers", met:4 },
  { name:"Tirage poulie haute", muscles:"Dos, Biceps", met:4.5 },
  { name:"Curl biceps", muscles:"Biceps", met:3.5 },
  { name:"Dips", muscles:"Triceps, Pectoraux", met:5 },
  { name:"Tapis de course 8km/h", muscles:"Cardio", met:8 },
  { name:"Vélo elliptique", muscles:"Cardio full body", met:7 },
  { name:"Rameur", muscles:"Full body cardio", met:7 },
];

const HOME_EXERCISES = [
  { name:"Pompes classiques", muscles:"Pectoraux, Triceps", met:5 },
  { name:"Pompes déclinées", muscles:"Pectoraux haut", met:5 },
  { name:"Squats poids de corps", muscles:"Quadriceps, Fessiers", met:5 },
  { name:"Fentes avant", muscles:"Quadriceps, Fessiers", met:5 },
  { name:"Hip thrust sol", muscles:"Fessiers", met:4.5 },
  { name:"Gainage planche", muscles:"Abdominaux", met:4 },
  { name:"Mountain climbers", muscles:"Full body HIIT", met:8 },
  { name:"Burpees", muscles:"Full body HIIT", met:9 },
  { name:"Jumping jacks", muscles:"Cardio", met:7 },
  { name:"Abdos crunchs", muscles:"Abdominaux", met:3.5 },
  { name:"Superman", muscles:"Dorsaux", met:3.5 },
  { name:"Dips chaise", muscles:"Triceps", met:4 },
  { name:"Corde à sauter", muscles:"Cardio", met:10 },
  { name:"Yoga flow 30min", muscles:"Souplesse", met:3 },
];

function calcBMR(p) {
  if (p.sex === "H") return 88.36 + 13.4*p.weight + 4.8*p.height - 5.7*p.age;
  return 447.6 + 9.2*p.weight + 3.1*p.height - 4.3*p.age;
}
function calcTDEE(p) {
  const act = { sedentaire:1.2, leger:1.375, modere:1.55, actif:1.725, tres_actif:1.9 };
  return Math.round(calcBMR(p) * (act[p.activity] || 1.375));
}
function calcBMI(p) { const h=p.height/100; return (p.weight/(h*h)).toFixed(1); }
function targetCal(p) {
  const def = { lent:-300, modere:-500, agressif:-750 };
  return calcTDEE(p) + (def[p.pace] || -500);
}
function weeklyLoss(p) { return ((calcTDEE(p)-targetCal(p))*7/7700).toFixed(2); }
function projectionWeeks(p) {
  const loss = parseFloat(weeklyLoss(p));
  const total = p.weight - p.targetWeight;
  if (loss <= 0 || total <= 0) return [];
  const weeks = []; let w = p.weight;
  for (let i=1; i<=Math.min(Math.ceil(total/loss)+2,52); i++) {
    w = Math.max(w-loss, p.targetWeight);
    weeks.push({ week:i, weight:parseFloat(w.toFixed(1)) });
    if (w <= p.targetWeight) break;
  }
  return weeks;
}
function dateStr(d=new Date()) { return d.toISOString().split("T")[0]; }
function useStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { const s=localStorage.getItem(key); return s?JSON.parse(s):init; } catch { return init; }
  });
  const set = v => { setVal(v); try { localStorage.setItem(key,JSON.stringify(v)); } catch {} };
  return [val, set];
}

export default function App() {
  const [profile, setProfile] = useStorage("ft_profile", null);
  const [tab, setTab] = useState("dashboard");
  const [log, setLog] = useStorage("ft_log", {});
  const [weightLog, setWeightLog] = useStorage("ft_weightlog", []);
  const today = dateStr();
  const todayLog = log[today] || { foods:[], exercises:[], water:0 };

  function updateTodayLog(updates) {
    setLog({ ...log, [today]: { ...todayLog, ...updates } });
  }

  if (!profile) return <SetupScreen onDone={setProfile} />;

  const targets = {
    cal: targetCal(profile),
    protein: Math.round(profile.weight * 2),
    water: Math.round(profile.weight * 0.033 * 10) / 10,
  };
  const consumed = todayLog.foods.reduce((a,f)=>({cal:a.cal+f.cal,p:a.p+f.p,g:a.g+f.g,l:a.l+f.l}),{cal:0,p:0,g:0,l:0});
  const burned = todayLog.exercises.reduce((a,e)=>a+e.cal,0);
  const netCal = consumed.cal - burned;
  const remainCal = targets.cal - netCal;

  const tabs = [
    { id:"dashboard", icon:"⚡", label:"Accueil" },
    { id:"nutrition", icon:"🥗", label:"Nutrition" },
    { id:"sport", icon:"💪", label:"Sport" },
    { id:"progress", icon:"📈", label:"Progrès" },
    { id:"profile", icon:"👤", label:"Profil" },
  ];

  return (
    <div className="app-shell">
      <style>{fonts}{css}</style>

      {/* Top header */}
      <div style={{ background:COLORS.surface, borderBottom:`1px solid ${COLORS.border}`, padding:`calc(env(safe-area-inset-top, 14px) + 10px) 20px 12px`, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:30, height:30, background:COLORS.accent, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🔥</div>
          <span style={{ fontWeight:700, fontSize:17 }}>FitTrack</span>
        </div>
        <span className="tag">{new Date().toLocaleDateString("fr-FR",{weekday:"short",day:"numeric",month:"short"})}</span>
      </div>

      {/* Scrollable content */}
      <div className="content-area">
        <div style={{ maxWidth:600, margin:"0 auto", padding:"16px 14px 24px" }}>
          {tab==="dashboard" && <Dashboard profile={profile} consumed={consumed} burned={burned} netCal={netCal} remainCal={remainCal} targets={targets} todayLog={todayLog} updateTodayLog={updateTodayLog} />}
          {tab==="nutrition" && <Nutrition profile={profile} todayLog={todayLog} updateTodayLog={updateTodayLog} targets={targets} consumed={consumed} />}
          {tab==="sport" && <Sport profile={profile} todayLog={todayLog} updateTodayLog={updateTodayLog} />}
          {tab==="progress" && <Progress profile={profile} weightLog={weightLog} setWeightLog={setWeightLog} log={log} />}
          {tab==="profile" && <ProfileView profile={profile} setProfile={setProfile} />}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="bottom-nav">
        {tabs.map(t => (
          <button key={t.id} className={`tab-btn ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>
            <span className="tab-icon">{t.icon}</span>
            <span className="tab-label">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- SETUP ----------
function SetupScreen({ onDone }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name:"", sex:"H", age:"", weight:"", height:"", targetWeight:"", activity:"modere", pace:"modere", gymAccess:"both" });
  const set = (k,v) => setData(p=>({...p,[k]:v}));

  const steps = [
    {
      title:"Bienvenue 👋", sub:"Créons ton programme personnalisé",
      content:(
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div>
            <label style={{fontSize:13,color:COLORS.muted,marginBottom:6,display:"block"}}>Ton prénom</label>
            <input className="input-field" placeholder="Ex: Alex" value={data.name} onChange={e=>set("name",e.target.value)} />
          </div>
          <div>
            <label style={{fontSize:13,color:COLORS.muted,marginBottom:8,display:"block"}}>Sexe</label>
            <div style={{display:"flex",gap:10}}>
              {[["H","Homme 👨"],["F","Femme 👩"]].map(([v,l])=>(
                <div key={v} className={`chip ${data.sex===v?"selected":""}`} style={{flex:1,justifyContent:"center",padding:"16px"}} onClick={()=>set("sex",v)}>{l}</div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title:"Tes données 📏", sub:"Pour calculer tes besoins exacts",
      content:(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[["age","Âge","ans"],["weight","Poids actuel","kg"],["height","Taille","cm"],["targetWeight","Poids cible","kg"]].map(([k,l,u])=>(
            <div key={k}>
              <label style={{fontSize:13,color:COLORS.muted,marginBottom:5,display:"block"}}>{l}</label>
              <div style={{position:"relative"}}>
                <input className="input-field" type="number" inputMode="decimal" placeholder={`En ${u}`} value={data[k]} onChange={e=>set(k,e.target.value)} style={{paddingRight:50}} />
                <span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",color:COLORS.muted,fontSize:13}}>{u}</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title:"Activité quotidienne 🏃", sub:"Hors séances de sport",
      content:(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[["sedentaire","Sédentaire","Bureau, peu de marche"],["leger","Légèrement actif","Quelques marches/jour"],["modere","Modérément actif","Marche régulière"],["actif","Actif","Travail physique / beaucoup de marche"],["tres_actif","Très actif","Travail physique intense"]].map(([v,l,d])=>(
            <div key={v} className={`chip ${data.activity===v?"selected":""}`} style={{flexDirection:"column",alignItems:"flex-start"}} onClick={()=>set("activity",v)}>
              <span style={{fontWeight:600}}>{l}</span>
              <span style={{fontSize:12,color:COLORS.muted}}>{d}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      title:"Ton rythme 🎯", sub:"Vitesse de perte de poids souhaitée",
      content:(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[["lent","🐢 Progressif","-0.3 kg/sem — Doux, préserve le muscle"],["modere","⚖️ Équilibré","-0.5 kg/sem — Meilleur rapport résultat/confort"],["agressif","🔥 Rapide","-0.75 kg/sem — Déficit important"]].map(([v,l,d])=>(
            <div key={v} className={`chip ${data.pace===v?"selected":""}`} style={{flexDirection:"column",alignItems:"flex-start",padding:"14px 16px"}} onClick={()=>set("pace",v)}>
              <span style={{fontWeight:700,fontSize:15}}>{l}</span>
              <span style={{fontSize:12,color:COLORS.muted,marginTop:3}}>{d}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      title:"Environnement sport 🏋️", sub:"Tes équipements disponibles",
      content:(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[["gym","🏋️ Salle de sport","Accès à tous les équipements"],["home","🏠 À domicile","Poids de corps, équipements légers"],["both","⚡ Les deux","Je m'adapte selon les jours"]].map(([v,l,d])=>(
            <div key={v} className={`chip ${data.gymAccess===v?"selected":""}`} style={{flexDirection:"column",alignItems:"flex-start",padding:"14px 16px"}} onClick={()=>set("gymAccess",v)}>
              <span style={{fontWeight:700,fontSize:15}}>{l}</span>
              <span style={{fontSize:12,color:COLORS.muted,marginTop:3}}>{d}</span>
            </div>
          ))}
        </div>
      )
    },
  ];

  const cur = steps[step];
  const canNext = step===0?data.name:step===1?data.age&&data.weight&&data.height&&data.targetWeight:true;

  function finish() {
    onDone({ ...data, age:+data.age, weight:+data.weight, height:+data.height, targetWeight:+data.targetWeight, startWeight:+data.weight, startDate:dateStr() });
  }

  return (
    <div style={{minHeight:"100vh",background:COLORS.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{fonts}{css}</style>
      <div style={{width:"100%",maxWidth:440}}>
        <div style={{display:"flex",gap:5,marginBottom:28,justifyContent:"center"}}>
          {steps.map((_,i)=>(
            <div key={i} style={{width:i===step?22:7,height:7,borderRadius:99,background:i<=step?COLORS.accent:COLORS.border,transition:"all 0.3s"}} />
          ))}
        </div>
        <div className="card" style={{padding:24}}>
          <div style={{marginBottom:20}}>
            <h2 style={{fontSize:21,fontWeight:700,marginBottom:3}}>{cur.title}</h2>
            <p style={{color:COLORS.muted,fontSize:13}}>{cur.sub}</p>
          </div>
          {cur.content}
          <div style={{display:"flex",gap:10,marginTop:24}}>
            {step>0&&<button className="btn-secondary" onClick={()=>setStep(s=>s-1)}>← Retour</button>}
            <button className="btn-primary" style={{flex:1}} disabled={!canNext}
              onClick={()=>step<steps.length-1?setStep(s=>s+1):finish()}>
              {step===steps.length-1?"🚀 Créer mon programme":"Continuer →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- DASHBOARD ----------
function Dashboard({ profile, consumed, burned, netCal, remainCal, targets, todayLog, updateTodayLog }) {
  const calPct = Math.min((netCal/targets.cal)*100,100);
  const waterPct = Math.min((todayLog.water/targets.water)*100,100);
  const proj = projectionWeeks(profile);
  const weeksLeft = proj.length;
  const eta = new Date(); eta.setDate(eta.getDate()+weeksLeft*7);

  return (
    <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:14}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(135deg,${COLORS.card},${COLORS.surface})`,border:`1px solid ${COLORS.border}`,borderRadius:20,padding:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:100,height:100,background:COLORS.accentGlow,borderRadius:"50%",filter:"blur(30px)"}} />
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
          <div>
            <p style={{color:COLORS.muted,fontSize:12,marginBottom:3}}>Bonjour {profile.name} 👋</p>
            <h1 style={{fontSize:22,fontWeight:800,letterSpacing:"-0.5px",marginBottom:4}}>
              <span style={{color:remainCal>0?COLORS.accent:COLORS.danger}}>{Math.abs(remainCal)} kcal</span>
            </h1>
            <p style={{fontSize:12,color:COLORS.muted}}>{remainCal>0?"à consommer encore":"au-dessus de l'objectif"}</p>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:24,fontWeight:800,color:COLORS.accent}} className="mono">{profile.weight}<span style={{fontSize:12}}>kg</span></div>
            <div style={{fontSize:12,color:COLORS.muted}}>→ {profile.targetWeight}kg</div>
          </div>
        </div>
        <div style={{marginTop:16}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:COLORS.muted,marginBottom:5}}>
            <span>Net: <b style={{color:COLORS.text}}>{netCal} kcal</b></span>
            <span>Objectif: <b style={{color:COLORS.text}}>{targets.cal} kcal</b></span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{width:`${calPct}%`,background:calPct>100?COLORS.danger:COLORS.accent}} />
          </div>
        </div>
      </div>

      {/* 3 stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        {[{icon:"🍽️",label:"Mangé",val:consumed.cal,unit:"kcal",c:COLORS.blue},{icon:"🔥",label:"Brûlé",val:burned,unit:"kcal",c:COLORS.warn},{icon:"💧",label:"Eau",val:todayLog.water,unit:`/${targets.water}L`,c:COLORS.accent}].map(s=>(
          <div key={s.label} className="card" style={{textAlign:"center",padding:12}}>
            <div style={{fontSize:20,marginBottom:2}}>{s.icon}</div>
            <div style={{fontSize:17,fontWeight:800,color:s.c}} className="mono">{s.val}</div>
            <div style={{fontSize:10,color:COLORS.muted}}>{s.unit}</div>
            <div style={{fontSize:10,color:COLORS.muted}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Water */}
      <div className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontWeight:600,fontSize:14}}>💧 Hydratation</span>
          <span style={{color:COLORS.muted,fontSize:12}}>{todayLog.water}L / {targets.water}L</span>
        </div>
        <div className="progress-bar" style={{marginBottom:10}}>
          <div className="progress-fill" style={{width:`${waterPct}%`,background:COLORS.blue}} />
        </div>
        <div style={{display:"flex",gap:6}}>
          {[0.25,0.33,0.5].map(v=>(
            <button key={v} className="btn-secondary" style={{flex:1,fontSize:12,padding:"8px 4px"}}
              onClick={()=>updateTodayLog({water:Math.round((todayLog.water+v)*100)/100})}>+{v}L</button>
          ))}
          <button className="btn-secondary" style={{flex:1,fontSize:12,padding:"8px 4px"}}
            onClick={()=>updateTodayLog({water:Math.max(0,Math.round((todayLog.water-0.25)*100)/100)})}>-</button>
        </div>
      </div>

      {/* Macros */}
      <div className="card">
        <div style={{fontWeight:600,marginBottom:12,fontSize:14}}>🥩 Macros du jour</div>
        {[{label:"Protéines",val:consumed.p,target:targets.protein,unit:"g",c:COLORS.blue},{label:"Glucides",val:consumed.g,target:Math.round(targets.cal*0.45/4),unit:"g",c:COLORS.warn},{label:"Lipides",val:consumed.l,target:Math.round(targets.cal*0.25/9),unit:"g",c:"#a78bfa"}].map(m=>(
          <div key={m.label} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
              <span style={{color:COLORS.muted}}>{m.label}</span>
              <span style={{color:m.c,fontWeight:600}}>{Math.round(m.val)}{m.unit} <span style={{color:COLORS.muted,fontWeight:400}}>/ {m.target}{m.unit}</span></span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width:`${Math.min((m.val/m.target)*100,100)}%`,background:m.c}} />
            </div>
          </div>
        ))}
      </div>

      {/* Projection */}
      <div className="card" style={{background:`linear-gradient(135deg,#0d1f12,${COLORS.card})`}}>
        <div style={{fontWeight:600,marginBottom:12,fontSize:14}}>🎯 Projection objectif</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[{icon:"📅",label:"Semaines restantes",val:`${weeksLeft} sem.`,c:COLORS.accent},{icon:"🗓️",label:"Date estimée",val:eta.toLocaleDateString("fr-FR",{month:"short",year:"numeric"}),c:COLORS.text},{icon:"📉",label:"Perte par semaine",val:`${weeklyLoss(profile)} kg`,c:COLORS.warn},{icon:"🏁",label:"Total à perdre",val:`${(profile.weight-profile.targetWeight).toFixed(1)} kg`,c:COLORS.blue}].map(s=>(
            <div key={s.label} style={{background:COLORS.bg,borderRadius:12,padding:12,textAlign:"center"}}>
              <div style={{fontSize:18,marginBottom:2}}>{s.icon}</div>
              <div style={{fontSize:15,fontWeight:800,color:s.c}} className="mono">{s.val}</div>
              <div style={{fontSize:10,color:COLORS.muted,marginTop:2}}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:12,padding:10,background:COLORS.accentGlow,borderRadius:10,fontSize:12,color:COLORS.muted}}>
          💡 Déficit de <b style={{color:COLORS.accent}}>{calcTDEE(profile)-targetCal(profile)} kcal/jour</b> pour atteindre ton objectif.
        </div>
      </div>
    </div>
  );
}

// ---------- NUTRITION ----------
function Nutrition({ profile, todayLog, updateTodayLog, targets, consumed }) {
  const [search, setSearch] = useState("");
  const [qty, setQty] = useState({});
  const filtered = FOOD_DB.filter(f=>f.name.toLowerCase().includes(search.toLowerCase()));

  function addFood(food) {
    const q = parseFloat(qty[food.name])||1;
    const item = { ...food, cal:Math.round(food.cal*q), p:Math.round(food.p*q*10)/10, g:Math.round(food.g*q*10)/10, l:Math.round(food.l*q*10)/10, qty:q, id:Date.now() };
    updateTodayLog({ foods:[...todayLog.foods,item] });
    setQty(q2=>({...q2,[food.name]:""}));
  }

  function removeFood(id) { updateTodayLog({ foods:todayLog.foods.filter(f=>f.id!==id) }); }

  const [showPlan, setShowPlan] = useState(false);
  const plan = [
    { meal:"🌅 Petit-déjeuner",time:"7h-8h",items:"Flocons d'avoine · Yaourt grec · Banane",cal:Math.round(targetCal(profile)*0.25),note:"Glucides complexes pour l'énergie" },
    { meal:"🍎 Collation matin",time:"10h",items:"Pomme · Amandes (30g)",cal:Math.round(targetCal(profile)*0.10),note:"Maintien de la glycémie" },
    { meal:"🍽️ Déjeuner",time:"12h-13h",items:"Poulet · Riz · Brocoli",cal:Math.round(targetCal(profile)*0.35),note:"Repas principal: protéines + glucides" },
    { meal:"💪 Post-sport",time:"Après entraînement",items:"Whey · Banane",cal:Math.round(targetCal(profile)*0.10),note:"Fenêtre anabolique" },
    { meal:"🌙 Dîner",time:"19h-20h",items:"Saumon · Patate douce · Épinards",cal:Math.round(targetCal(profile)*0.20),note:"Protéines + légumes légers" },
  ];

  return (
    <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:14}}>
      <div className="card">
        <div style={{fontWeight:700,fontSize:15,marginBottom:3}}>🥗 Journal alimentaire</div>
        <div style={{fontSize:12,color:COLORS.muted}}>Objectif: {targets.cal} kcal • {targets.protein}g protéines</div>
      </div>

      {todayLog.foods.length>0&&(
        <div className="card">
          <div style={{fontWeight:600,marginBottom:10,fontSize:14}}>Aujourd'hui</div>
          {todayLog.foods.map(f=>(
            <div key={f.id} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 0",borderBottom:`1px solid ${COLORS.border}`}}>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500}}>{f.name} <span style={{color:COLORS.muted}}>×{f.qty}</span></div>
                <div style={{fontSize:11,color:COLORS.muted}}>P:{f.p}g G:{f.g}g L:{f.l}g</div>
              </div>
              <span style={{color:COLORS.accent,fontWeight:700,fontSize:13}} className="mono">{f.cal}</span>
              <span style={{color:COLORS.muted,fontSize:11}}>kcal</span>
              <button onClick={()=>removeFood(f.id)} style={{background:"none",border:"none",color:COLORS.muted,cursor:"pointer",fontSize:18,padding:"2px 6px"}}>×</button>
            </div>
          ))}
          <div style={{paddingTop:8,display:"flex",justifyContent:"space-between"}}>
            <span style={{fontWeight:600,fontSize:13}}>Total</span>
            <span style={{color:COLORS.accent,fontWeight:800,fontSize:14}} className="mono">{consumed.cal} kcal</span>
          </div>
        </div>
      )}

      <div className="card">
        <div style={{fontWeight:600,marginBottom:10,fontSize:14}}>➕ Ajouter un aliment</div>
        <input className="input-field" placeholder="🔍 Rechercher..." value={search} onChange={e=>setSearch(e.target.value)} style={{marginBottom:10}} />
        <div style={{maxHeight:320,overflowY:"auto",display:"flex",flexDirection:"column",gap:6}}>
          {filtered.map(f=>(
            <div key={f.name} style={{background:COLORS.bg,border:`1px solid ${COLORS.border}`,borderRadius:10,padding:"10px 12px",display:"flex",alignItems:"center",gap:8}}>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500}}>{f.name}</div>
                <div style={{fontSize:11,color:COLORS.muted}}>{f.cal} kcal · P:{f.p}g</div>
              </div>
              <input type="number" inputMode="decimal" min="0.5" step="0.5" placeholder="Qté"
                value={qty[f.name]||""} onChange={e=>setQty(q=>({...q,[f.name]:e.target.value}))}
                style={{width:54,background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:"7px 6px",color:COLORS.text,fontSize:13,textAlign:"center",outline:"none"}} />
              <button className="btn-primary" style={{padding:"8px 12px",fontSize:13}} onClick={()=>addFood(f)}>+</button>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:showPlan?12:0}}>
          <div>
            <div style={{fontWeight:600,fontSize:14}}>📋 Plan nutritionnel type</div>
            <div style={{fontSize:11,color:COLORS.muted}}>Basé sur {targetCal(profile)} kcal/jour</div>
          </div>
          <button className="btn-secondary" style={{fontSize:12,padding:"8px 14px"}} onClick={()=>setShowPlan(s=>!s)}>{showPlan?"Masquer":"Voir"}</button>
        </div>
        {showPlan&&plan.map(m=>(
          <div key={m.meal} style={{background:COLORS.bg,borderRadius:10,padding:12,marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span style={{fontWeight:600,fontSize:13}}>{m.meal}</span>
              <div style={{display:"flex",gap:4}}>
                <span className="tag blue" style={{fontSize:10}}>{m.time}</span>
                <span className="tag" style={{fontSize:10}}>{m.cal} kcal</span>
              </div>
            </div>
            <div style={{fontSize:12,color:COLORS.muted,marginBottom:3}}>{m.items}</div>
            <div style={{fontSize:11,color:COLORS.accentDim}}>💡 {m.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- SPORT ----------
function Sport({ profile, todayLog, updateTodayLog }) {
  const [mode, setMode] = useState(profile.gymAccess==="home"?"home":"gym");
  const [duration, setDuration] = useState({});
  const [showPlan, setShowPlan] = useState(false);

  function addEx(ex) {
    const dur = parseFloat(duration[ex.name])||30;
    const cal = Math.round(ex.met*profile.weight*(dur/60));
    updateTodayLog({ exercises:[...todayLog.exercises,{ ...ex, duration:dur, cal, id:Date.now() }] });
    setDuration(d=>({...d,[ex.name]:""}));
  }
  function removeEx(id) { updateTodayLog({ exercises:todayLog.exercises.filter(e=>e.id!==id) }); }

  const totalBurned = todayLog.exercises.reduce((a,e)=>a+e.cal,0);
  const exercises = mode==="gym"?GYM_EXERCISES:HOME_EXERCISES;
  const showBoth = profile.gymAccess==="both";

  const gymPlan = [
    {day:"Lundi",focus:"Pectoraux + Triceps",exs:"Développé couché · Dips · Tractions",type:"Muscu",c:COLORS.blue},
    {day:"Mardi",focus:"Dos + Biceps",exs:"Tirage poulie · Rowing · Curl biceps",type:"Muscu",c:COLORS.blue},
    {day:"Mercredi",focus:"Cardio HIIT",exs:"Tapis · Rameur · Elliptique",type:"Cardio 🔥",c:COLORS.warn},
    {day:"Jeudi",focus:"Jambes + Fessiers",exs:"Squat · Leg curl · Presse",type:"Muscu",c:COLORS.blue},
    {day:"Vendredi",focus:"Épaules + Full body",exs:"Développé militaire · Soulevé de terre",type:"Muscu",c:COLORS.blue},
    {day:"Samedi",focus:"Repos actif",exs:"Marche 45min · Étirements",type:"Récup 💚",c:COLORS.accent},
    {day:"Dimanche",focus:"Repos complet",exs:"Récupération",type:"Repos",c:COLORS.muted},
  ];
  const homePlan = [
    {day:"Lundi",focus:"Haut du corps",exs:"Pompes · Pompes déclinées · Dips chaise",type:"Muscu",c:COLORS.blue},
    {day:"Mardi",focus:"Cardio HIIT",exs:"Burpees · Mountain climbers · Jumping jacks",type:"Cardio 🔥",c:COLORS.warn},
    {day:"Mercredi",focus:"Jambes + Fessiers",exs:"Squats · Fentes · Hip thrust",type:"Muscu",c:COLORS.blue},
    {day:"Jeudi",focus:"Repos actif",exs:"Yoga flow · Gainage",type:"Récup 💚",c:COLORS.accent},
    {day:"Vendredi",focus:"Full body",exs:"Burpees · Pompes · Squats · Abdos",type:"Full body 🔥",c:COLORS.danger},
    {day:"Samedi",focus:"Cardio",exs:"Corde à sauter · Mountain climbers",type:"Cardio",c:COLORS.warn},
    {day:"Dimanche",focus:"Repos",exs:"Récupération",type:"Repos",c:COLORS.muted},
  ];
  const weekPlan = mode==="gym"?gymPlan:homePlan;

  return (
    <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:14}}>
      <div className="card">
        <div style={{fontWeight:700,fontSize:15,marginBottom:3}}>💪 Journal sportif</div>
        <div style={{fontSize:12,color:COLORS.muted}}>Brûlé aujourd'hui: <b style={{color:COLORS.warn}}>{totalBurned} kcal 🔥</b></div>
      </div>

      {showBoth&&(
        <div style={{display:"flex",gap:8}}>
          <button className={`chip ${mode==="gym"?"selected":""}`} style={{flex:1,justifyContent:"center"}} onClick={()=>setMode("gym")}>🏋️ Salle</button>
          <button className={`chip ${mode==="home"?"selected":""}`} style={{flex:1,justifyContent:"center"}} onClick={()=>setMode("home")}>🏠 Maison</button>
        </div>
      )}

      {todayLog.exercises.length>0&&(
        <div className="card">
          <div style={{fontWeight:600,marginBottom:10,fontSize:14}}>Séance du jour 🔥</div>
          {todayLog.exercises.map(e=>(
            <div key={e.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:`1px solid ${COLORS.border}`}}>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500}}>{e.name}</div>
                <div style={{fontSize:11,color:COLORS.muted}}>{e.muscles} · {e.duration} min</div>
              </div>
              <span style={{color:COLORS.warn,fontWeight:700,fontSize:13}} className="mono">{e.cal}</span>
              <button onClick={()=>removeEx(e.id)} style={{background:"none",border:"none",color:COLORS.muted,cursor:"pointer",fontSize:18,padding:"2px 6px"}}>×</button>
            </div>
          ))}
        </div>
      )}

      <div className="card">
        <div style={{fontWeight:600,marginBottom:10,fontSize:14}}>➕ Ajouter un exercice</div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {exercises.map(ex=>(
            <div key={ex.name} style={{background:COLORS.bg,border:`1px solid ${COLORS.border}`,borderRadius:10,padding:"10px 12px",display:"flex",alignItems:"center",gap:8}}>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500}}>{ex.name}</div>
                <div style={{fontSize:11,color:COLORS.muted}}>{ex.muscles}</div>
              </div>
              <input type="number" inputMode="numeric" min="5" step="5" placeholder="min"
                value={duration[ex.name]||""} onChange={e=>setDuration(d=>({...d,[ex.name]:e.target.value}))}
                style={{width:54,background:COLORS.card,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:"7px 6px",color:COLORS.text,fontSize:13,textAlign:"center",outline:"none"}} />
              <button className="btn-primary" style={{padding:"8px 12px",fontSize:13}} onClick={()=>addEx(ex)}>+</button>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:showPlan?12:0}}>
          <div>
            <div style={{fontWeight:600,fontSize:14}}>📅 Programme hebdomadaire</div>
            <div style={{fontSize:11,color:COLORS.muted}}>Plan 7 jours optimisé</div>
          </div>
          <button className="btn-secondary" style={{fontSize:12,padding:"8px 14px"}} onClick={()=>setShowPlan(s=>!s)}>{showPlan?"Masquer":"Voir"}</button>
        </div>
        {showPlan&&weekPlan.map(d=>(
          <div key={d.day} style={{background:COLORS.bg,borderRadius:10,padding:"10px 12px",marginBottom:6,display:"flex",gap:10,alignItems:"center"}}>
            <div style={{minWidth:72}}>
              <div style={{fontWeight:700,fontSize:13}}>{d.day}</div>
              <span style={{fontSize:10,color:d.c,fontWeight:600}}>{d.type}</span>
            </div>
            <div>
              <div style={{fontWeight:600,fontSize:12,marginBottom:2}}>{d.focus}</div>
              <div style={{fontSize:11,color:COLORS.muted}}>{d.exs}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- PROGRESS ----------
function Progress({ profile, weightLog, setWeightLog, log }) {
  const [newW, setNewW] = useState("");
  const proj = projectionWeeks(profile);
  const lastW = weightLog.length>0?weightLog[weightLog.length-1].weight:profile.weight;
  const totalLost = profile.startWeight - lastW;
  const remaining = lastW - profile.targetWeight;
  const pct = Math.min(Math.max((totalLost/(profile.startWeight-profile.targetWeight))*100,0),100).toFixed(0);

  function addWeight() {
    if (!newW) return;
    const entry = { date:dateStr(), weight:parseFloat(newW) };
    setWeightLog([...weightLog.filter(w=>w.date!==entry.date),entry].sort((a,b)=>a.date.localeCompare(b.date)));
    setNewW("");
  }

  const last7 = [...Array(7)].map((_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-i);
    const key=dateStr(d); const l=log[key];
    return { day:d.toLocaleDateString("fr-FR",{weekday:"short"}), foods:l?.foods?.length||0, exercises:l?.exercises?.length||0 };
  }).reverse();

  return (
    <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:14}}>
      <div className="card" style={{background:`linear-gradient(135deg,#0d1f12,${COLORS.card})`}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:14}}>📈 Progression globale</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
          {[{icon:"📉",label:"Perdu",val:`${totalLost.toFixed(1)}kg`,c:COLORS.accent},{icon:"🎯",label:"Restant",val:`${remaining.toFixed(1)}kg`,c:COLORS.warn},{icon:"⚡",label:"Avancement",val:`${pct}%`,c:COLORS.blue}].map(s=>(
            <div key={s.label} style={{background:COLORS.bg,borderRadius:12,padding:12,textAlign:"center"}}>
              <div style={{fontSize:18}}>{s.icon}</div>
              <div style={{fontSize:16,fontWeight:800,color:s.c}} className="mono">{s.val}</div>
              <div style={{fontSize:10,color:COLORS.muted}}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:11,display:"flex",justifyContent:"space-between",marginBottom:5,color:COLORS.muted}}>
          <span>{profile.startWeight}kg</span><span style={{color:COLORS.accent,fontWeight:600}}>{pct}%</span><span>{profile.targetWeight}kg</span>
        </div>
        <div className="progress-bar" style={{height:10}}>
          <div className="progress-fill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${COLORS.accentDim},${COLORS.accent})`}} />
        </div>
      </div>

      <div className="card">
        <div style={{fontWeight:600,marginBottom:10,fontSize:14}}>⚖️ Enregistrer mon poids</div>
        <div style={{display:"flex",gap:8}}>
          <div style={{position:"relative",flex:1}}>
            <input className="input-field" type="number" inputMode="decimal" step="0.1" placeholder="Ex: 78.5" value={newW} onChange={e=>setNewW(e.target.value)} style={{paddingRight:40}} />
            <span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",color:COLORS.muted,fontSize:13}}>kg</span>
          </div>
          <button className="btn-primary" onClick={addWeight}>Enregistrer</button>
        </div>
      </div>

      {weightLog.length>0&&(
        <div className="card">
          <div style={{fontWeight:600,marginBottom:10,fontSize:14}}>📊 Historique du poids</div>
          <div style={{maxHeight:220,overflowY:"auto",display:"flex",flexDirection:"column",gap:5}}>
            {[...weightLog].reverse().map((w,i)=>{
              const prev=[...weightLog].reverse()[i+1];
              const diff=prev?(w.weight-prev.weight).toFixed(1):null;
              return (
                <div key={w.date} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:COLORS.bg,borderRadius:8}}>
                  <span style={{color:COLORS.muted,fontSize:12}}>{new Date(w.date).toLocaleDateString("fr-FR",{day:"numeric",month:"short"})}</span>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    {diff&&<span style={{fontSize:11,color:parseFloat(diff)<0?COLORS.accent:COLORS.danger}}>{parseFloat(diff)<0?"▼":"▲"} {Math.abs(diff)}kg</span>}
                    <span style={{fontWeight:700,fontSize:14}} className="mono">{w.weight} kg</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="card">
        <div style={{fontWeight:600,marginBottom:10,fontSize:14}}>📅 Activité — 7 derniers jours</div>
        <div style={{display:"flex",gap:4,justifyContent:"space-between"}}>
          {last7.map((d,i)=>(
            <div key={i} style={{flex:1,textAlign:"center"}}>
              <div style={{minHeight:52,background:COLORS.bg,borderRadius:8,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1,padding:"4px 2px",border:`1px solid ${d.foods>0||d.exercises>0?COLORS.accent:COLORS.border}`}}>
                {d.foods>0&&<span style={{fontSize:9}}>🍽️{d.foods}</span>}
                {d.exercises>0&&<span style={{fontSize:9}}>💪{d.exercises}</span>}
                {d.foods===0&&d.exercises===0&&<span style={{fontSize:14,opacity:0.3}}>·</span>}
              </div>
              <div style={{fontSize:9,color:COLORS.muted,marginTop:3}}>{d.day}</div>
            </div>
          ))}
        </div>
      </div>

      {proj.length>0&&(
        <div className="card">
          <div style={{fontWeight:600,marginBottom:10,fontSize:14}}>🗓️ Projection semaine par semaine</div>
          <div style={{maxHeight:260,overflowY:"auto",display:"flex",flexDirection:"column",gap:4}}>
            {proj.map((p,i)=>{
              const d=new Date(); d.setDate(d.getDate()+p.week*7);
              const pct2=Math.min(((profile.startWeight-p.weight)/(profile.startWeight-profile.targetWeight))*100,100);
              return (
                <div key={i} style={{background:COLORS.bg,borderRadius:8,padding:"8px 10px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:12,color:COLORS.muted}}>Sem. {p.week} — {d.toLocaleDateString("fr-FR",{day:"numeric",month:"short"})}</span>
                    <span style={{fontWeight:700,fontSize:13}} className="mono">{p.weight} kg</span>
                  </div>
                  <div style={{height:4,background:COLORS.border,borderRadius:99}}>
                    <div style={{height:"100%",width:`${pct2}%`,background:COLORS.accent,borderRadius:99}} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- PROFILE ----------
function ProfileView({ profile, setProfile }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  function save() { setProfile({...form,age:+form.age,weight:+form.weight,height:+form.height,targetWeight:+form.targetWeight}); setEdit(false); }

  const bmi = calcBMI(form);
  const tdee = calcTDEE({...form,age:+form.age,weight:+form.weight,height:+form.height});
  const bmiLabel = bmi<18.5?"Insuffisance pondérale":bmi<25?"Poids normal ✓":bmi<30?"Surpoids":"Obésité";
  const bmiColor = bmi<18.5?COLORS.blue:bmi<25?COLORS.accent:bmi<30?COLORS.warn:COLORS.danger;

  return (
    <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:14}}>
      <div className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div>
            <h2 style={{fontSize:18,fontWeight:800}}>{profile.name} {profile.sex==="H"?"👨":"👩"}</h2>
            <p style={{color:COLORS.muted,fontSize:12}}>Depuis le {new Date(profile.startDate).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"})}</p>
          </div>
          <button className="btn-secondary" style={{fontSize:13}} onClick={()=>setEdit(e=>!e)}>{edit?"Annuler":"✏️ Modifier"}</button>
        </div>
        {edit?(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[["weight","Poids actuel","kg"],["targetWeight","Poids cible","kg"],["height","Taille","cm"],["age","Âge","ans"]].map(([k,l,u])=>(
              <div key={k}>
                <label style={{fontSize:12,color:COLORS.muted,marginBottom:4,display:"block"}}>{l}</label>
                <div style={{position:"relative"}}>
                  <input className="input-field" type="number" inputMode="decimal" value={form[k]} onChange={e=>set(k,e.target.value)} style={{paddingRight:40}} />
                  <span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",color:COLORS.muted,fontSize:13}}>{u}</span>
                </div>
              </div>
            ))}
            <div>
              <label style={{fontSize:12,color:COLORS.muted,marginBottom:4,display:"block"}}>Activité</label>
              <select className="input-field" value={form.activity} onChange={e=>set("activity",e.target.value)}>
                <option value="sedentaire">Sédentaire</option>
                <option value="leger">Légèrement actif</option>
                <option value="modere">Modérément actif</option>
                <option value="actif">Actif</option>
                <option value="tres_actif">Très actif</option>
              </select>
            </div>
            <div>
              <label style={{fontSize:12,color:COLORS.muted,marginBottom:4,display:"block"}}>Rythme</label>
              <select className="input-field" value={form.pace} onChange={e=>set("pace",e.target.value)}>
                <option value="lent">Progressif (-0.3kg/sem)</option>
                <option value="modere">Équilibré (-0.5kg/sem)</option>
                <option value="agressif">Rapide (-0.75kg/sem)</option>
              </select>
            </div>
            <button className="btn-primary" onClick={save}>💾 Sauvegarder</button>
          </div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[["Poids actuel",`${profile.weight} kg`,COLORS.text],["Poids cible",`${profile.targetWeight} kg`,COLORS.accent],["Taille",`${profile.height} cm`,COLORS.text],["Âge",`${profile.age} ans`,COLORS.text]].map(([l,v,c])=>(
              <div key={l} style={{background:COLORS.bg,borderRadius:10,padding:12}}>
                <div style={{fontSize:11,color:COLORS.muted,marginBottom:3}}>{l}</div>
                <div style={{fontSize:16,fontWeight:700,color:c}}>{v}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <div style={{fontWeight:600,marginBottom:12,fontSize:14}}>📊 Mes statistiques</div>
        {[
          {label:"IMC",val:bmi,sub:bmiLabel,c:bmiColor},
          {label:"Métabolisme de base (BMR)",val:`${Math.round(calcBMR(profile))} kcal`,sub:"Calories au repos"},
          {label:"Dépense quotidienne (TDEE)",val:`${tdee} kcal`,sub:"Avec ton activité"},
          {label:"Objectif calorique",val:`${targetCal(profile)} kcal`,sub:`Déficit ${tdee-targetCal(profile)} kcal/j`,c:COLORS.accent},
          {label:"Protéines cibles",val:`${Math.round(profile.weight*2)} g/j`,sub:"Préservation musculaire"},
          {label:"Perte estimée",val:`${weeklyLoss(profile)} kg/sem`,sub:`${(weeklyLoss(profile)*4).toFixed(1)} kg/mois`},
        ].map(s=>(
          <div key={s.label} style={{background:COLORS.bg,borderRadius:10,padding:"11px 12px",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:12,fontWeight:500}}>{s.label}</div>
              <div style={{fontSize:10,color:COLORS.muted}}>{s.sub}</div>
            </div>
            <div style={{fontWeight:800,fontSize:14,color:s.c||COLORS.text}} className="mono">{s.val}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{textAlign:"center"}}>
        <div style={{fontSize:12,color:COLORS.muted,marginBottom:10}}>Réinitialiser toutes les données ?</div>
        <button className="btn-secondary" style={{color:COLORS.danger,borderColor:COLORS.danger}}
          onClick={()=>{if(window.confirm("Réinitialiser ?")){ localStorage.clear(); window.location.reload(); }}}>
          🗑️ Réinitialiser le profil
        </button>
      </div>
    </div>
  );
}
