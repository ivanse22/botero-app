import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════ */
const T = {
  bgBase:        "#0C0A09",
  bgCard:        "#151210",
  bgCardRaised:  "#1C1814",
  bgGlass:       "rgba(12,10,9,0.82)",
  bgOmni:        "#1E1A16",
  brandPrimary:  "#C0392B",
  brandPrimaryDim:"rgba(192,57,43,0.15)",
  brandGlow:     "rgba(192,57,43,0.35)",
  brandGreen:    "#27AE60",
  textPrimary:   "#F0EBE3",
  textSecondary: "#9A8F84",
  textDisabled:  "#4A4440",
  textAccent:    "#C0392B",
  borderSubtle:  "rgba(255,255,255,0.07)",
  borderMedium:  "rgba(255,255,255,0.12)",
  rSm:8, rMd:16, rLg:24, rXl:32, rFull:999,
  fontDisplay:   "'Playfair Display', Georgia, serif",
  fontUI:        "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
  fontMono:      "'DM Mono', 'Courier New', monospace",
};

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const OBRAS = [
  // ── Piso 1 ──────────────────────────────────────────────────────────────
  {
    id:"01", titulo:"Mona Lisa", año:"1977", tecnica:"Óleo sobre lienzo", sala:"Sala 1A", piso:1,
    img: "/monalisa.jpg",
    desc:"La interpretación más volumétrica y sensual del mito de Da Vinci. Botero transforma el icono universal en una figura colombiana de cuerpo monumental.",
    iaRespuesta:"Esta obra pertenece al Figurativismo colombiano, el lenguaje propio de Fernando Botero. El estilo se caracteriza por figuras de proporciones exageradas que subvierten el original renacentista con humor e ironía. La paleta cálida de tierras y ocres es inconfundiblemente latinoamericana. Botero no imita a Da Vinci: lo comenta, lo cuestiona y lo apropia.",
  },
  {
    id:"02", titulo:"Mujer con espejo", año:"1994", tecnica:"Óleo sobre lienzo", sala:"Sala 2", piso:1,
    desc:"Una reflexión sobre la vanidad y la belleza. La figura envolvente se contempla a sí misma con la candidez propia del universo Botero.",
    iaRespuesta:"El estilo es el Figurativismo volumétrico característico de Botero. La composición dialoga con la tradición barroca de la vanitas, pero la ironía suaviza toda moralización. La figura redonda y simétrica ocupa casi todo el plano pictórico, eliminando jerarquías. El tratamiento de la luz es suave y difuso, heredero del claroscuro italiano.",
  },
  {
    id:"03", titulo:"La familia", año:"1999", tecnica:"Óleo sobre lienzo", sala:"Sala 3", piso:1,
    desc:"Retrato colectivo de la familia latinoamericana. Cuerpos exuberantes que transmiten calor, humor y una mirada tierna sobre la vida cotidiana.",
    iaRespuesta:"Obra del Figurativismo colombiano con raíces en el retrato de familia renacentista. Botero adopta la estructura compositiva del retrato grupal flamenco pero lo rellena de cuerpos que desbordan el marco. La paleta es intensa y terrosa. Temáticamente es una celebración de la vida doméstica latinoamericana, sin idealización pero con genuino afecto.",
  },
  {
    id:"04", titulo:"Naturaleza muerta", año:"1980", tecnica:"Óleo sobre lienzo", sala:"Sala 4", piso:1,
    desc:"Frutas, instrumentos y objetos cotidianos elevados a monumentos. La escala y el volumen transforman lo ordinario en extraordinario.",
    iaRespuesta:"El género es la naturaleza muerta, pero Botero lo transforma radicalmente: los objetos adquieren una escala monumental que los convierte en protagonistas casi arquitectónicos. El estilo recuerda a Cézanne en la atención a la geometría, pero el resultado es propio: voluminoso, sensual y deliberadamente exagerado.",
  },
  {
    id:"05", titulo:"La bailarina", año:"1987", tecnica:"Óleo sobre lienzo", sala:"Sala 5", piso:1,
    desc:"La gracia en toda su contradicción: una figura colosal que danza con una ligereza sorprendente. El movimiento capturado en la quietud de la pintura.",
    iaRespuesta:"Botero retoma el tema de la bailarina, popularizado por Degas, y lo reinventa desde el Figurativismo. La tensión central es formal: una figura de peso monumental representada en una postura de extrema ligereza. Este oxímoron visual es el núcleo conceptual de la obra. La técnica al óleo es precisa, de acabado suave y superficie uniforme.",
  },
  {
    id:"06", titulo:"El presidente", año:"1967", tecnica:"Óleo sobre lienzo", sala:"Sala 5A", piso:1,
    desc:"Sátira política con maestría técnica. La figura de autoridad hinchada de poder, retratada con la ironía característica del Maestro.",
    iaRespuesta:"Es una de las obras más abiertamente políticas de Botero. El estilo sigue el Figurativismo volumétrico, pero aquí la exageración tiene una función satírica explícita: la inflación física del cuerpo es metáfora directa de la corrupción y el abuso de poder. La composición es frontal y solemne, parodiando el retrato oficial.",
  },
  {
    id:"07", titulo:"Venus", año:"1990", tecnica:"Mármol blanco", sala:"Patio Central", piso:1,
    desc:"Escultura de mármol blanco italiano que reinterpreta el clásico desnudo femenino. La voluptuosidad elevada a ideal de belleza universal.",
    iaRespuesta:"Escultura en mármol de Carrara que dialoga directamente con la Venus de Milo y la tradición clásica europea. El estilo translada el Figurativismo de Botero al volumen tridimensional: la superficie pulida y los contornos suaves amplifican la sensación de masa. Es una de sus piezas más universales en cuanto a referentes culturales.",
  },
  {
    id:"08", titulo:"Hombre a caballo", año:"1992", tecnica:"Bronce patinado", sala:"Patio Central", piso:1,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Fernando_Botero_-_Hombre_a_caballo_-_Jerusalen_-_Israel.jpg/800px-Fernando_Botero_-_Hombre_a_caballo_-_Jerusalen_-_Israel.jpg",
    desc:"Bronce monumental que evoca la tradición ecuestre latinoamericana. Jinete y animal se funden en una masa poderosa y serena.",
    iaRespuesta:"Escultura en bronce de escala heroica que dialoga con la estatuaria ecuestre barroca y renacentista. Botero retoma el símbolo del poder político latinoamericano, el general a caballo, y lo despoja de agresividad: la monumentalidad se torna cómica y cercana. La textura del bronce patinado oscurece y enriquece la superficie.",
  },
  // ── Piso 2 ──────────────────────────────────────────────────────────────
  {
    id:"09", titulo:"Pedro Páramo", año:"1989", tecnica:"Óleo sobre lienzo", sala:"Sala 7", piso:2,
    desc:"Homenaje al universo de Juan Rulfo. Los habitantes de Comala toman cuerpo en la paleta cálida y espesa del Maestro.",
    iaRespuesta:"Obra de intertextualidad literaria: Botero toma como punto de partida la novela de Juan Rulfo y construye una visualización plástica de sus personajes. El estilo mantiene el Figurativismo pero con una paleta más seca y polvorienta, consonante con el paisaje árido de Comala. Es una obra que demuestra la relación de Botero con la literatura latinoamericana.",
  },
  {
    id:"10", titulo:"La corrida", año:"1984", tecnica:"Óleo sobre lienzo", sala:"Sala 7A", piso:2,
    desc:"La tauromaquia como ritual y tragedia. Botero captura el drama del ruedo con una paleta de tierra y sangre que hipnotiza.",
    iaRespuesta:"Botero abordó la tauromaquia en múltiples obras a lo largo de su carrera. El estilo aquí es más dinámico que en sus composiciones estáticas habituales: hay tensión en la composición, frente al estatismo habitual del Figurativismo. La paleta, de ocres, rojos y sombras, intensifica el drama ritual. Es una obra que conecta con la tradición española de Goya y la escuela sevillana.",
  },
  {
    id:"11", titulo:"Los músicos", año:"1979", tecnica:"Óleo sobre lienzo", sala:"Sala 8", piso:2,
    desc:"Una celebración de la música popular latinoamericana. Los intérpretes de cuerpos amplios generan una armonía visual y sonora a la vez.",
    iaRespuesta:"Obra del período maduro de Botero, con una composición grupal que recuerda a las escenas de género flamencas del siglo XVII. Los músicos son populares, no virtuosos académicos: el acordeón y la guitarra sitúan la escena en el folclor colombiano. El Figurativismo aquí tiene una dimensión festiva y comunitaria, diferente a las obras de crítica política.",
  },
  {
    id:"12", titulo:"El senador", año:"1994", tecnica:"Óleo sobre lienzo", sala:"Sala 9", piso:2,
    desc:"Retrato de poder y corrupción. La figura del político engorda de privilegios en la mirada crítica y humorística de Botero.",
    iaRespuesta:"Continuación temática de 'El presidente', con la misma función satírica. El senador está representado con todos los atributos del poder: el traje, la postura, la gordura. El Figurativismo amplifica estos signos hasta hacerlos caricatura. Es una obra que pertenece al diálogo que Botero mantiene permanentemente con el poder político latinoamericano.",
  },
  {
    id:"13", titulo:"La colombiana", año:"2001", tecnica:"Óleo sobre lienzo", sala:"Sala 10", piso:2,
    desc:"Celebración de la femineidad latinoamericana. La mujer protagonista de esta obra irradia presencia, orgullo y sensualidad.",
    iaRespuesta:"Retrato femenino individual del período tardío de Botero. La obra condensa muchos de los temas recurrentes del artista: la mujer latinoamericana, la sensualidad, el color y la presencia física. El fondo neutro y la postura frontal recogen la tradición del retrato renacentista. La paleta es más saturada que en obras anteriores, reflejo de la madurez colorística de Botero.",
  },
  {
    id:"14", titulo:"Naturaleza viva", año:"1998", tecnica:"Acrílico sobre tela", sala:"Sala 11", piso:2,
    desc:"Flores y objetos que palpitan con vida propia. Una exploración del color y el volumen que desafía la quietud del género.",
    iaRespuesta:"Botero emplea aquí el acrílico, inusual en su práctica habitual de gama oleosa. El resultado es un cromatismo más luminoso y saturado. El género es la naturaleza muerta floral, pero las flores de Botero tienen una carnalidad casi animal: son seres vivos que irradian presencia. Es una de sus obras más próximas al expresionismo colorístico.",
  },
  {
    id:"15", titulo:"El desfile", año:"2003", tecnica:"Óleo sobre lienzo", sala:"Sala 11A", piso:2,
    desc:"Una procesión festiva de figuras monumentales. Botero captura la tradición popular colombiana con humor y afecto.",
    iaRespuesta:"Composición horizontal de escena procesional, deudora de los murales mexicanos de Diego Rivera. Botero comparte con los muralistas el interés por la vida popular y la identidad latinoamericana, pero abandona el énfasis ideológico. El desfile es festivo, comunitario, entrañable. El Figurativismo aquí deja paso a una narración coral y horizontal.",
  },
  {
    id:"16", titulo:"Retrato de familia", año:"2002", tecnica:"Óleo sobre lienzo", sala:"Sala 12", piso:2,
    desc:"La familia como microcosmos social. Una composición que equilibra la ternura y la sátira en la tradición del retrato clásico.",
    iaRespuesta:"Retrato grupal del período tardío que sintetiza décadas de exploración del tema familiar. La composición es más compleja que en 'La familia' de 1999: hay mayor diferenciación entre los personajes y una gestualidad más rica. El estilo mantiene el Figurativismo volumétrico pero con una pincelada más suelta y una paleta más refinada, propio de la madurez del artista.",
  },
];

const RUTAS_MAPA = [
  { id:"esenciales",  label:"Las Imprescindibles", color:"#C0392B", obras:["01","03","07","12","11"] },
  { id:"sinbarrera",  label:"Sin Barreras",         color:"#27AE60", obras:["01","02","07","08","04"] },
  { id:"forma",       label:"Volumen y Forma",       color:"#D4A017", obras:["07","08","01","05","06"] },
  { id:"completo",    label:"Recorrido Completo",    color:"#5B8CDB", obras:["01","02","03","07","09","11","13","16"] },
];

// Pin positions — Piso 1 (viewBox 0 0 340 280)
const PINS_P1 = [
  { id:"01", x:94,  y:205, sala:"Sala 1A"       },
  { id:"02", x:94,  y:145, sala:"Sala 2"         },
  { id:"03", x:144, y:86,  sala:"Sala 3"         },
  { id:"04", x:194, y:86,  sala:"Sala 4"         },
  { id:"05", x:244, y:145, sala:"Sala 5"         },
  { id:"06", x:244, y:205, sala:"Sala 5A"        },
  { id:"07", x:155, y:155, sala:"Patio Central"  },
  { id:"08", x:185, y:155, sala:"Patio Central"  },
];
// Pin positions — Piso 2 (viewBox 0 0 340 280)
const PINS_P2 = [
  { id:"09", x:85,  y:185, sala:"Sala 7"  },
  { id:"10", x:85,  y:126, sala:"Sala 7A" },
  { id:"11", x:85,  y:67,  sala:"Sala 8"  },
  { id:"12", x:166, y:67,  sala:"Sala 9"  },
  { id:"13", x:252, y:67,  sala:"Sala 10" },
  { id:"14", x:255, y:126, sala:"Sala 11" },
  { id:"15", x:255, y:185, sala:"Sala 11A"},
  { id:"16", x:250, y:240, sala:"Sala 12" },
];

// Route paths for 2D plan (SVG d= strings, same viewBox)
const ROUTE_PATHS = {
  express:   "M 155 195 L 155 160 L 175 130 L 165 220",
  accesible: "M 155 195 L 155 160 L 165 220 L 195 215",
  bronce:    "M 165 220 L 195 215 L 155 160 L 210 125",
};

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
    * { box-sizing:border-box; margin:0; padding:0; -webkit-tap-highlight-color:transparent; }
    ::-webkit-scrollbar { display:none; }

    @keyframes breathe {
      0%,100% { transform:scale(1); opacity:0.5; }
      50%      { transform:scale(1.55); opacity:0; }
    }
    @keyframes breathe2 {
      0%,100% { transform:scale(1); opacity:0.3; }
      50%      { transform:scale(1.85); opacity:0; }
    }
    @keyframes sonar-1 {
      0%   { transform:scale(1);   opacity:0.8; }
      100% { transform:scale(2.4); opacity:0; }
    }
    @keyframes sonar-2 {
      0%   { transform:scale(1);   opacity:0.5; }
      100% { transform:scale(3.2); opacity:0; }
    }
    @keyframes fadeSlideUp {
      from { opacity:0; transform:translateY(14px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position:-200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes route-flow {
      0%   { stroke-dashoffset:0; }
      100% { stroke-dashoffset:-32; }
    }
    @keyframes scan-pulse {
      0%,100% { opacity:0.9; transform:scaleX(1); }
      50%      { opacity:0.4; transform:scaleX(0.92); }
    }
    @keyframes scan-line {
      0%   { top:12%; }
      50%  { top:84%; }
      100% { top:12%; }
    }
    @keyframes audio-bar {
      0%,100% { transform:scaleY(0.3); }
      50%      { transform:scaleY(1); }
    }
    @keyframes spin {
      to { transform:rotate(360deg); }
    }
    @keyframes iso-enter {
      from { opacity:0; transform:scale(0.97) translateY(6px); }
      to   { opacity:1; transform:scale(1)    translateY(0); }
    }
    @keyframes sheet-snap {
      from { transform:translateY(20px); opacity:0.6; }
      to   { transform:translateY(0);    opacity:1; }
    }

    .fade-up   { animation: fadeSlideUp 0.55s cubic-bezier(.22,.68,0,1.2) both; }
    .fade-up-1 { animation-delay:0.05s; }
    .fade-up-2 { animation-delay:0.12s; }
    .fade-up-3 { animation-delay:0.20s; }
    .fade-up-4 { animation-delay:0.30s; }
    .fade-up-5 { animation-delay:0.40s; }
    .fade-up-6 { animation-delay:0.50s; }

    .iso-map   { animation: iso-enter 0.45s cubic-bezier(.22,.68,0,1.1) both; }
    .sheet-in  { animation: sheet-snap 0.3s cubic-bezier(.22,.68,0,1.1) both; }

    .omni-tap:active   { transform:scale(0.985); }
    .card-tap:active   { opacity:0.82; transform:scale(0.985); }
    .route-card        { transition:transform 0.18s ease; cursor:pointer; }
    .route-card:active { transform:scale(0.96); }
    .bento-block       { transition:transform 0.18s ease; cursor:pointer; }
    .bento-block:active{ transform:scale(0.97); }
    .nav-btn:active    { opacity:0.6; }
    .pin-tap:active    { transform:scale(0.88); }
    .ctrl-tap:active   { opacity:0.65; transform:scale(0.92); }
    .btn-tap:active    { opacity:0.7; transform:scale(0.94); }
  `}</style>
);

/* ═══════════════════════════════════════════════════════
   SHARED ATOMS
═══════════════════════════════════════════════════════ */
function LiveDot() {
  return (
    <span style={{ position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center", width:8, height:8, marginRight:6 }}>
      <span style={{ position:"absolute", width:"100%", height:"100%", borderRadius:"50%", backgroundColor:T.brandGreen, animation:"breathe 2s ease-out infinite" }}/>
      <span style={{ width:7, height:7, borderRadius:"50%", backgroundColor:T.brandGreen, display:"block" }}/>
    </span>
  );
}

function MicButton({ onPress, isListening }) {
  return (
    <button onMouseDown={onPress} style={{
      width:48, height:48, borderRadius:"50%",
      backgroundColor:T.brandPrimary, border:"none", cursor:"pointer",
      display:"flex", alignItems:"center", justifyContent:"center",
      position:"relative", flexShrink:0, transition:"transform 0.15s ease",
    }}>
      <span style={{ position:"absolute", inset:-4, borderRadius:"50%", border:`1.5px solid ${T.brandPrimary}`,
        animation: isListening ? "breathe 1.2s ease-out infinite" : "breathe 2.4s ease-out infinite", opacity:0.6 }}/>
      <span style={{ position:"absolute", inset:-10, borderRadius:"50%", border:`1px solid ${T.brandPrimary}`,
        animation: isListening ? "breathe2 1.2s ease-out infinite 0.2s" : "breathe2 2.4s ease-out infinite 0.4s", opacity:0.3 }}/>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="11" rx="3"/>
        <path d="M5 10a7 7 0 0 0 14 0"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
        <line x1="8" y1="22" x2="16" y2="22"/>
      </svg>
    </button>
  );
}

function Toast({ message, type, visible }) {
  return (
    <div style={{
      position:"absolute", bottom:100, left:24, right:24, zIndex:200,
      backgroundColor: type==="error" ? "#2D1010" : "#0F2318",
      border:`1px solid ${type==="error" ? "rgba(192,57,43,0.4)" : "rgba(39,174,96,0.4)"}`,
      borderRadius:T.rMd, padding:"14px 18px",
      display:"flex", alignItems:"flex-start", gap:12,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(10px)",
      transition:"opacity 0.25s ease, transform 0.25s ease",
      pointerEvents:"none",
    }}>
      <span style={{ fontSize:18, flexShrink:0 }}>{type==="error" ? "⚠" : "📡"}</span>
      <div>
        <p style={{ fontFamily:T.fontUI, fontSize:13, fontWeight:500, color:T.textPrimary, lineHeight:1.3 }}>{message.title}</p>
        <p style={{ fontFamily:T.fontUI, fontSize:12, color:T.textSecondary, marginTop:3, lineHeight:1.4 }}>{message.body}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BOTTOM NAV — shared, fully interactive
═══════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id:"home",       label:"Inicio",
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id:"mapa",       label:"Mapa",
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg> },
  { id:"escanear",   label:"Escanear", center:true,
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><rect x="19" y="14" width="2" height="2"/><rect x="14" y="19" width="2" height="2"/><rect x="19" y="19" width="2" height="2"/></svg> },
  { id:"coleccion",  label:"Colección",
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { id:"perfil",     label:"Perfil",
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
];

function BottomNav({ activeTab, onTab }) {
  return (
    <div style={{
      flexShrink:0,
      backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
      backgroundColor:"rgba(12,10,9,0.9)",
      borderTop:`1px solid ${T.borderSubtle}`,
      display:"flex", alignItems:"center",
      padding:"8px 0 14px", zIndex:60,
    }}>
      {NAV_ITEMS.map(item => {
        const isActive = activeTab === item.id;
        return (
          <button key={item.id} onClick={() => onTab(item.id)} className="nav-btn"
            style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4,
              position:"relative", paddingTop: item.center ? 0 : 4,
              background:"none", border:"none", cursor:"pointer" }}>
            {isActive && !item.center && (
              <div style={{ position:"absolute", top:-8, left:"50%", transform:"translateX(-50%)",
                width:18, height:2, borderRadius:1, backgroundColor:T.brandPrimary }}/>
            )}
            {item.center ? (
              <div style={{ width:48, height:48, borderRadius:"50%", backgroundColor:T.brandPrimary,
                display:"flex", alignItems:"center", justifyContent:"center", marginTop:-16,
                boxShadow:`0 0 20px ${T.brandGlow}` }}>{item.icon}</div>
            ) : (
              <div style={{ color: isActive ? T.brandPrimary : T.textDisabled }}>{item.icon}</div>
            )}
            <span style={{ fontFamily:T.fontUI, fontSize:9.5, letterSpacing:"0.05em",
              color: isActive ? T.brandPrimary : T.textDisabled, marginTop: item.center ? 2 : 0 }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   NUMPAD MODAL
═══════════════════════════════════════════════════════ */
function NumpadModal({ onClose, onFind }) {
  const [val, setVal] = useState("");
  const [shakeError, setShakeError] = useState(false);

  const handleKey = (k) => {
    if (k === "⌫") { setVal(v => v.slice(0,-1)); setShakeError(false); }
    else if (k === "OK") {
      const found = OBRAS.find(o => o.id === val.padStart(2,"0"));
      if (!found) { setShakeError(true); setTimeout(() => setShakeError(false), 600); }
      else { onFind(found); }
    } else if (val.length < 2) { setVal(v => v+k); setShakeError(false); }
  };

  return (
    <div style={{ position:"absolute", inset:0, zIndex:200, backgroundColor:"rgba(12,10,9,0.94)", backdropFilter:"blur(12px)", display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", justifyContent:"center", paddingTop:16 }}>
        <div style={{ width:36, height:4, borderRadius:2, backgroundColor:T.borderMedium }}/>
      </div>
      <div style={{ flex:1, padding:"24px 28px 0", display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <p style={{ fontFamily:T.fontUI, fontSize:11, letterSpacing:"0.2em", color:T.textSecondary, textTransform:"uppercase" }}>Número de obra</p>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div style={{ backgroundColor:T.bgCardRaised, borderRadius:T.rSm, padding:"10px 14px", marginBottom:20, display:"flex", alignItems:"center", gap:10, border:`1px solid ${T.borderSubtle}` }}>
          <div style={{ width:32, height:32, borderRadius:6, backgroundColor:T.bgOmni, border:`1px solid ${T.borderMedium}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontFamily:"monospace", fontSize:13, fontWeight:700, color:T.textPrimary }}>14</span>
          </div>
          <p style={{ fontFamily:T.fontUI, fontSize:12, color:T.textSecondary, lineHeight:"145%", flex:1 }}>Busca la placa numerada junto al marco de cada obra.</p>
        </div>
        <div style={{ backgroundColor:T.bgCard, border:`1px solid ${shakeError ? T.brandPrimary : T.borderMedium}`, borderRadius:T.rMd, padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"center", marginBottom: shakeError ? 0 : 24, transition:"border-color 0.2s ease" }}>
          <span style={{ fontFamily:T.fontDisplay, fontSize:48, fontWeight:400, color: val ? T.textPrimary : T.textDisabled, letterSpacing:"0.12em" }}>
            {val ? val.padStart(2,"0") : "_ _"}
          </span>
        </div>
        {shakeError && <p style={{ fontFamily:T.fontUI, fontSize:12, color:T.brandPrimary, textAlign:"center", marginBottom:16, marginTop:8 }}>Obra no encontrada. Verifica el número en la placa.</p>}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, flex:1, alignContent:"start" }}>
          {["1","2","3","4","5","6","7","8","9","⌫","0","OK"].map(k => (
            <button key={k} onClick={() => handleKey(k)} style={{
              height:56, borderRadius:T.rMd,
              backgroundColor: k==="OK" ? T.brandPrimary : k==="⌫" ? T.bgCardRaised : T.bgCard,
              border:`1px solid ${k==="OK" ? "transparent" : T.borderSubtle}`,
              color: k==="⌫" ? T.textSecondary : T.textPrimary,
              fontFamily: k==="OK" ? T.fontUI : T.fontDisplay,
              fontSize: k==="OK" ? 11 : k==="⌫" ? 20 : 22,
              fontWeight: k==="OK" ? 500 : 400,
              letterSpacing: k==="OK" ? "0.15em" : "normal",
              cursor:"pointer", transition:"transform 0.1s ease",
            }}>{k==="OK" ? "BUSCAR" : k}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HOME SCREEN — 100% original
═══════════════════════════════════════════════════════ */
const ROUTES_HOME = [
  { id:"express",    title:"Visita Express",   subtitle:"Las 10 obras maestras esenciales del Maestro en un recorrido sin rodeos.", tag:"30 min", tagIcon:"⏱", gradient:["#1A0D0D","#2D1510"], accentColor:"#C0392B", rooms:"10 obras · 4 salas",
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { id:"accessible", title:"Ruta Accesible",   subtitle:"Recorrido optimizado en planta baja. Cero escaleras, máxima experiencia.", tag:"Accesibilidad total", tagIcon:"♿", gradient:["#0A1A10","#0F2318"], accentColor:"#27AE60", rooms:"8 obras · 2 salas",
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><path d="m3 12 4-2 5 2 2-4"/><path d="M12 12v5l3 3"/><path d="M9 17H6a2 2 0 0 1-2-2v-1"/></svg> },
  { id:"bronze",     title:"El Bronce Manda",  subtitle:"Explora la escultura monumental de Botero. Volúmenes que desafían el espacio.", tag:"Audio IA Inmersivo", tagIcon:"🎧", gradient:["#120D06","#1E1508"], accentColor:"#D4A017", rooms:"6 esculturas · Patio Central",
    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 3-2 5.5-5 7.5C9 12.5 7 10 7 7a5 5 0 0 1 5-5z"/><path d="M12 14.5V22M9 22h6"/></svg> },
];

const BENTO = [
  { id:"international", size:"large", title:"Colección Internacional", sub:"Picasso, Dalí, Monet y más", gradient:["#0F0A0A","#1A1010"], accent:"#C0392B", badge:"87 obras",
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { id:"sketches",      size:"square", title:"Bocetos y Dibujos",      sub:"El proceso del Maestro",    gradient:["#0A0C10","#10141E"], accent:"#5B8CDB", badge:"34 piezas",
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> },
  { id:"donation",      size:"wide",   title:"Historia de la Donación", sub:"El gesto que cambió Bogotá", gradient:["#0A0A0C","#12101A"], accent:"#9B59B6", badge:"Documental",
    icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
];

const UTILS = [
  { id:"cafe",  label:"Café del Museo",     tag:"Piso 1",  icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
  { id:"shop",  label:"Tienda y Souvenirs", tag:"Piso 1",  icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
  { id:"wc",    label:"Baños más cercanos", tag:"Ver mapa", icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="5" r="3"/><path d="M12 8v5M9 11l-2 7h10l-2-7"/></svg> },
];

function HomeScreen({ onNavigate, onNumpad, onMic, isListening, networkError, onQR }) {
  return (
    <div style={{ flex:1, overflowY:"auto", overflowX:"hidden", scrollbarWidth:"none", msOverflowStyle:"none", position:"relative" }}>
      {/* MODULE 1 — Editorial Masthead Header */}
      <div style={{ position:"sticky", top:0, zIndex:40, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", backgroundColor:"rgba(12,10,9,0.75)", borderBottom:`1px solid ${T.borderSubtle}`, padding:"max(12px, env(safe-area-inset-top, 12px)) 24px 14px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        
        {/* Left: Avatar */}
        <div style={{ flex:1, display:"flex", justifyContent:"flex-start" }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,#8B4513,#C0392B)`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", border:"1px solid rgba(255,255,255,0.1)", boxShadow:`0 2px 10px rgba(192,57,43,0.2)` }}>
            <span style={{ fontFamily:T.fontUI, fontSize:12, fontWeight:500, color:"white" }}>IV</span>
          </div>
        </div>

        {/* Center: Editorial Title & Status */}
        <div style={{ flex:2, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <h1 style={{ fontFamily:T.fontDisplay, fontSize:18, fontWeight:400, color:T.textPrimary, letterSpacing:"0.18em", margin:0, padding:0 }}>
            BOTERO
          </h1>
          <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:2, opacity:0.8 }}>
            <LiveDot />
            <span style={{ fontFamily:T.fontUI, fontSize:9, color:T.textSecondary, letterSpacing:"0.06em", textTransform:"uppercase" }}>
              Abierto · Sala 1 activa
            </span>
          </div>
        </div>

        {/* Right: Mi Pase / QR Button */}
        <div style={{ flex:1, display:"flex", justifyContent:"flex-end" }}>
          <button onClick={onQR} style={{ height:32, padding:"0 12px", borderRadius:16, backgroundColor:T.bgCardRaised, border:`1px solid ${T.borderSubtle}`, display:"flex", alignItems:"center", gap:6, cursor:"pointer" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h16a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V9a2 2 0 0 1 2-2z"/>
              <line x1="9" y1="7" x2="9" y2="17"/>
              <line x1="15" y1="7" x2="15" y2="17"/>
            </svg>
            <span style={{ fontFamily:T.fontUI, fontSize:11, fontWeight:500, color:T.textPrimary }}>Pase</span>
          </button>
        </div>
      </div>

      {/* ── TOP FOLD (Hero + OmniBar) ── */}
      <div style={{ minHeight:"calc(90vh - 65px)", display:"flex", flexDirection:"column", position:"relative", borderBottom:`1px solid ${T.borderSubtle}`, background:`linear-gradient(180deg, rgba(192,57,43,0.06) 0%, transparent 100%)`, marginBottom:36, overflow:"hidden" }}>
        
        {/* Fondo Mona Lisa (Solo Top Fold) */}
        <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none" }}>
          <img src="/monalisa.jpg" alt="Fondo" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }} />
          <div style={{ position:"absolute", inset:0, backgroundColor:T.bgBase, opacity:0.85 }} />
        </div>

        <div style={{ position:"relative", zIndex:1, flex:1, display:"flex", flexDirection:"column" }}>

        {/* Soft Botero-esque radial glow in the background */}
        <div style={{ position:"absolute", top:"10%", right:"-10%", width:"70%", height:"60%", background:"radial-gradient(ellipse at center, rgba(212,160,23,0.06) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }}/>

        {/* MODULE 2 — Hero Greeting */}
        <div style={{ flex:1, padding:"40px 24px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <p className="fade-up fade-up-1" style={{ fontFamily:T.fontUI, fontSize:11, fontWeight:500, letterSpacing:"0.22em", color:T.textAccent, textTransform:"uppercase", marginBottom:14 }}>
            Colección Permanente · 2026
          </p>
          <h1 className="fade-up fade-up-2" style={{ fontFamily:T.fontDisplay, fontSize:50, fontWeight:400, color:T.textPrimary, lineHeight:"108%", letterSpacing:"-0.01em", marginBottom:16 }}>
            Descubre el volumen<br/>
            <em style={{ fontStyle:"italic", fontWeight:400, color:T.textSecondary }}>y la forma.</em>
          </h1>
          <p className="fade-up fade-up-3" style={{ fontFamily:T.fontUI, fontSize:16, fontWeight:300, color:T.textSecondary, lineHeight:"150%", maxWidth:"90%" }}>
            Hola <span style={{ color:T.textPrimary, fontWeight:400 }}>Iván</span>, bienvenido al legado del Maestro.
          </p>
        </div>

        {/* Demo toggle */}
        <div style={{ padding:"0 24px", marginBottom:24 }}>
          <button onClick={() => {}} style={{ fontFamily:T.fontUI, fontSize:11, color:networkError ? T.brandGreen : T.textDisabled, background:"rgba(0,0,0,0.2)", border:`1px solid ${networkError ? "#27AE6040":"rgba(255,255,255,0.08)"}`, borderRadius:T.rFull, padding:"8px 18px", cursor:"pointer", letterSpacing:"0.06em", transition:"all 0.2s ease" }}>
            {networkError ? "✓ Modo offline activo" : "Simular sin conexión"}
          </button>
        </div>

        {/* MODULE 3 — Omni Bar */}
        <div className="fade-up fade-up-4" style={{ padding:"0 24px", marginBottom:40 }}>
          <div className="omni-tap" onClick={onNumpad} style={{ backgroundColor:"rgba(18,15,13,0.85)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", border:`1px solid ${T.borderMedium}`, borderRadius:T.rFull, padding:"16px 16px 16px 22px", display:"flex", alignItems:"center", gap:14, boxShadow:`0 16px 40px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`, cursor:"pointer", transition:"transform 0.15s ease" }}>
            <div style={{ flexShrink:0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="1.8" strokeLinecap="round">
                <rect x="3" y="3" width="4" height="4" rx="1"/><rect x="10" y="3" width="4" height="4" rx="1"/><rect x="17" y="3" width="4" height="4" rx="1"/>
                <rect x="3" y="10" width="4" height="4" rx="1"/><rect x="10" y="10" width="4" height="4" rx="1"/><rect x="17" y="10" width="4" height="4" rx="1"/>
                <rect x="3" y="17" width="4" height="4" rx="1"/><rect x="10" y="17" width="4" height="4" rx="1"/><rect x="17" y="17" width="4" height="4" rx="1"/>
              </svg>
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:T.fontUI, fontSize:15, color:T.textDisabled, fontWeight:300 }}>Ingresa el número de la obra...</p>
            </div>
            <MicButton onPress={(e) => { e.stopPropagation(); onMic(); }} isListening={isListening}/>
          </div>
          <p style={{ fontFamily:T.fontUI, fontSize:11, color:T.textDisabled, textAlign:"center", marginTop:16, letterSpacing:"0.04em", opacity:0.8 }}>
            {networkError ? "⚡ Modo sin conexión · Guías de audio pre-descargadas disponibles" : "Toca para digitar · Mantén el micrófono para buscar por voz con IA"}
          </p>
        </div>
        </div>
      </div>

      {/* MODULE 4 — Routes Carousel */}
      <div className="fade-up fade-up-5" style={{ marginBottom:36 }}>
        <div style={{ padding:"0 24px 16px", display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
          <p style={{ fontFamily:T.fontUI, fontSize:11, fontWeight:500, letterSpacing:"0.2em", color:T.textSecondary, textTransform:"uppercase" }}>Rutas Curadas</p>
          <button onClick={() => onNavigate("mapa")} style={{ fontFamily:T.fontUI, fontSize:12, color:T.textAccent, background:"none", border:"none", cursor:"pointer" }}>Ver todas</button>
        </div>
        <div style={{ display:"flex", gap:12, overflowX:"auto", paddingLeft:24, paddingRight:24, scrollPaddingLeft:24, scrollPaddingRight:24, scrollSnapType:"x mandatory", scrollbarWidth:"none" }}>
          {ROUTES_HOME.map((route, i) => (
            <div key={route.id} style={{ scrollSnapAlign:"start" }} onClick={() => onNavigate("mapa")}>
              <div className="route-card" style={{ animationDelay:`${0.45+i*0.08}s`, width:272, flexShrink:0, background:`linear-gradient(145deg,${route.gradient[0]},${route.gradient[1]})`, border:`1px solid ${T.borderSubtle}`, borderRadius:T.rLg, padding:22, display:"flex", flexDirection:"column", justifyContent:"space-between", height:220, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", inset:0, borderRadius:T.rLg, background:`radial-gradient(circle at 80% 20%,${route.accentColor}12 0%,transparent 60%)`, pointerEvents:"none" }}/>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ color:route.accentColor }}>{route.icon}</div>
                  <span style={{ fontFamily:T.fontUI, fontSize:11, fontWeight:500, color:route.accentColor, letterSpacing:"0.08em", backgroundColor:`${route.accentColor}18`, border:`1px solid ${route.accentColor}30`, padding:"4px 10px", borderRadius:T.rFull }}>
                    {route.tag}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily:T.fontDisplay, fontSize:20, fontWeight:500, color:T.textPrimary, lineHeight:"120%", marginBottom:6 }}>{route.title}</h3>
                  <p style={{ fontFamily:T.fontUI, fontSize:12, fontWeight:300, color:T.textSecondary, lineHeight:"145%", marginBottom:12 }}>{route.subtitle}</p>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontFamily:T.fontUI, fontSize:11, color:T.textDisabled }}>{route.rooms}</span>
                    <div style={{ width:28, height:28, borderRadius:"50%", backgroundColor:`${route.accentColor}20`, border:`1px solid ${route.accentColor}40`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={route.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODULE 5 — Bento Grid */}
      <div className="fade-up fade-up-6" style={{ padding:"0 24px", marginBottom:36 }}>
        <p style={{ fontFamily:T.fontUI, fontSize:11, fontWeight:500, letterSpacing:"0.2em", color:T.textSecondary, textTransform:"uppercase", marginBottom:16 }}>Exploración Libre</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {BENTO.map(block => {
            const isLarge = block.size === "large";
            return (
              <div key={block.id} className="bento-block" style={{ gridColumn: isLarge ? "span 2" : "span 1", background:`linear-gradient(135deg,${block.gradient[0]},${block.gradient[1]})`, border:`1px solid ${T.borderSubtle}`, borderRadius:T.rMd, padding:18, minHeight: isLarge ? 160 : 130, display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-20, right:-20, width:80, height:80, borderRadius:"50%", background:`radial-gradient(circle,${block.accent}20 0%,transparent 70%)`, pointerEvents:"none" }}/>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ color:block.accent }}>{block.icon}</div>
                  <span style={{ fontFamily:T.fontUI, fontSize:10, fontWeight:500, color:block.accent, letterSpacing:"0.08em", backgroundColor:`${block.accent}15`, border:`1px solid ${block.accent}25`, padding:"3px 8px", borderRadius:T.rFull }}>{block.badge}</span>
                </div>
                <div>
                  <h4 style={{ fontFamily:T.fontDisplay, fontSize: isLarge ? 17 : 15, fontWeight:500, color:T.textPrimary, lineHeight:"120%", marginBottom:4 }}>{block.title}</h4>
                  <p style={{ fontFamily:T.fontUI, fontSize:11, fontWeight:300, color:T.textSecondary, lineHeight:"140%" }}>{block.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODULE 6 — Utility List */}
      <div style={{ padding:"0 24px", marginBottom:36 }}>
        <p style={{ fontFamily:T.fontUI, fontSize:11, fontWeight:500, letterSpacing:"0.2em", color:T.textSecondary, textTransform:"uppercase", marginBottom:16 }}>En el Museo</p>
        <div style={{ backgroundColor:T.bgCard, border:`1px solid ${T.borderSubtle}`, borderRadius:T.rMd, overflow:"hidden" }}>
          {UTILS.map((item, i) => (
            <div key={item.id} className="card-tap" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", borderBottom: i < UTILS.length-1 ? `1px solid ${T.borderSubtle}` : "none", cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:32, height:32, borderRadius:8, backgroundColor:T.bgCardRaised, display:"flex", alignItems:"center", justifyContent:"center", color:T.textSecondary }}>{item.icon}</div>
                <span style={{ fontFamily:T.fontUI, fontSize:14, fontWeight:300, color:T.textPrimary }}>{item.label}</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontFamily:T.fontUI, fontSize:11, color: item.id==="wc" ? T.textAccent : T.textDisabled, letterSpacing:"0.04em" }}>{item.tag}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textDisabled} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botero quote */}
      <div style={{ padding:"0 24px 32px" }}>
        <div style={{ backgroundColor:T.bgCard, border:`1px solid ${T.borderSubtle}`, borderLeft:`3px solid ${T.brandPrimary}`, borderRadius:`0 ${T.rMd}px ${T.rMd}px 0`, padding:"18px 18px 18px 20px" }}>
          <p style={{ fontFamily:T.fontDisplay, fontSize:15, fontWeight:400, fontStyle:"italic", color:T.textPrimary, lineHeight:"155%", marginBottom:10 }}>
            "Lo que me interesa en la pintura es la sensualidad de la forma, no la sensualidad del tema."
          </p>
          <p style={{ fontFamily:T.fontUI, fontSize:10, color:T.textDisabled, letterSpacing:"0.12em", textTransform:"uppercase" }}>— Fernando Botero · Medellín, 1932</p>
        </div>
      </div>
      <div style={{ height:72 }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAPA SCREEN — Isometric SVG + Bottom Sheet
═══════════════════════════════════════════════════════ */
function FloorPlan2D({ piso, rutaId, obraActiva, onPinClick, visitadas }) {
  const rutaColor = RUTAS_MAPA.find(r => r.id === rutaId)?.color || T.brandPrimary;
  const pins = piso === 1 ? PINS_P1 : PINS_P2;

  // Botero: strong amber. Surroundings: ghost-quiet.
  const boteroFill   = "rgba(200,130,50,0.22)";
  const boteroStroke = "rgba(210,155,75,0.65)";
  const ghostFill    = "rgba(255,255,255,0.02)";
  const ghostStroke  = "rgba(255,255,255,0.07)";
  const ghostText    = "rgba(255,255,255,0.1)";
  const labelColor   = "rgba(255,255,255,0.35)";

  // Museo Botero sala layout — centered in viewBox 0 0 340 280
  // Central courtyard building with U-shape of salas around a patio
  const SALAS = [
    { id:"s2",  x:72,  y:110, w:44, h:70, label:"2",  name:"Sala 2"  },
    { id:"s3",  x:72,  y:66,  w:44, h:40, label:"3",  name:"Sala 3"  },
    { id:"s4",  x:122, y:66,  w:44, h:40, label:"4",  name:"Sala 4"  },
    { id:"s5",  x:172, y:66,  w:44, h:40, label:"5",  name:"Sala 5"  },
    { id:"s6",  x:222, y:110, w:44, h:70, label:"6",  name:"Sala 6"  },
    { id:"s1a", x:72,  y:186, w:44, h:38, label:"1A", name:"Sala 1A" },
    { id:"s7",  x:122, y:186, w:44, h:38, label:"7",  name:"Sala 7"  },
    { id:"s8",  x:172, y:186, w:44, h:38, label:"8",  name:"Sala 8"  },
    { id:"s5a", x:222, y:186, w:44, h:38, label:"5A", name:"Sala 5A" },
  ];

  // Update PINS_P1 to match this new layout
  const BOTERO_PINS = [
    { id:"01", x:94,  y:218, sala:"Sala 1A" },   // Sala 1A (maps to Mona Lisa)
    { id:"02", x:94,  y:148, sala:"Sala 2"  },
    { id:"03", x:144, y:87,  sala:"Sala 3"  },
    { id:"04", x:194, y:87,  sala:"Sala 4"  },
    { id:"07", x:144, y:205, sala:"Sala 7"  },
    { id:"08", x:244, y:148, sala:"Sala 6"  },
  ];
  const activePins = piso === 1 ? BOTERO_PINS : PINS_P2;

  return (
    <svg viewBox="0 0 340 280" width="100%" height="100%" style={{ display:"block" }} className="iso-map">
      <defs>
        <pattern id="grid" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5"/>
        </pattern>
        {/* Vignette to fade surroundings */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
          <stop offset="45%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#0A0806" stopOpacity="0.88"/>
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="340" height="280" fill="#0A0806"/>
      <rect width="340" height="280" fill="url(#grid)" opacity="1"/>

      {piso === 1 && (
        <>
          {/* ─────────────────────────────────────────
              GHOST CONTEXT — surrounding buildings
              Very faint. Just enough to feel the city
              ───────────────────────────────────────── */}

          {/* Left: Talleres + Plazoleta MAMU */}
          <rect x="2" y="90" width="62" height="130" rx="3"
            fill={ghostFill} stroke={ghostStroke} strokeWidth="0.8"/>
          <text x="33" y="158" textAnchor="middle"
            fill={ghostText} fontSize="5" fontFamily={T.fontMono} letterSpacing="0.5">MAMU</text>

          {/* Top: MAMU Exposiciones */}
          <rect x="72" y="8" width="90" height="52" rx="3"
            fill={ghostFill} stroke={ghostStroke} strokeWidth="0.8"/>
          <text x="117" y="38" textAnchor="middle"
            fill={ghostText} fontSize="5" fontFamily={T.fontMono}>MAMU · Exp. Temp.</text>

          {/* Right: Colección Permanente */}
          <rect x="272" y="60" width="64" height="100" rx="3"
            fill={ghostFill} stroke={ghostStroke} strokeWidth="0.8"/>
          <text x="304" y="114" textAnchor="middle"
            fill={ghostText} fontSize="5" fontFamily={T.fontMono}
            transform="rotate(90,304,114)" letterSpacing="0.5">COL. PERMANENTE</text>

          {/* Bottom-right: Casa de la Moneda */}
          <rect x="272" y="168" width="64" height="86" rx="3"
            fill={ghostFill} stroke={ghostStroke} strokeWidth="0.8"/>
          <text x="304" y="214" textAnchor="middle"
            fill={ghostText} fontSize="4.5" fontFamily={T.fontMono}
            transform="rotate(90,304,214)" letterSpacing="0.3">CASA MONEDA</text>

          {/* Street ghost lines */}
          <line x1="0" y1="6" x2="340" y2="6" stroke={ghostStroke} strokeWidth="0.5"/>
          <line x1="0" y1="274" x2="340" y2="274" stroke={ghostStroke} strokeWidth="0.5"/>
          <text x="170" y="277" textAnchor="middle"
            fill={ghostText} fontSize="4.5" fontFamily={T.fontMono} letterSpacing="1">CALLE 11</text>

          {/* ─────────────────────────────────────────
              MUSEO BOTERO — the clear focus
              ───────────────────────────────────────── */}

          {/* Subtle outer glow / halo around the complex */}
          <rect x="66" y="60" width="206" height="170" rx="8"
            fill="rgba(200,130,50,0.04)" stroke="rgba(210,155,75,0.18)" strokeWidth="1.5"/>

          {/* Salas */}
          {SALAS.map(s => (
            <g key={s.id}>
              <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="3"
                fill={boteroFill} stroke={boteroStroke} strokeWidth="1"/>
              <text x={s.x + s.w/2} y={s.y + s.h/2 + 3}
                textAnchor="middle" fill={labelColor}
                fontSize="8" fontFamily={T.fontMono} fontWeight="400">{s.label}</text>
            </g>
          ))}

          {/* Patio Central — hollow courtyard */}
          <rect x="122" y="110" width="94" height="72" rx="4"
            fill="rgba(0,0,0,0.45)"
            stroke="rgba(210,155,75,0.3)" strokeWidth="0.8" strokeDasharray="4 3"/>
          <text x="169" y="143" textAnchor="middle"
            fill="rgba(210,155,75,0.3)" fontSize="6" fontFamily={T.fontMono} letterSpacing="1">PATIO</text>
          <text x="169" y="153" textAnchor="middle"
            fill="rgba(210,155,75,0.25)" fontSize="5" fontFamily={T.fontMono} letterSpacing="0.5">CENTRAL</text>

          {/* Sala 1 — Entrance bar at the bottom */}
          <rect x="72" y="228" width="194" height="26" rx="3"
            fill={boteroFill} stroke={boteroStroke} strokeWidth="1.2"/>
          <text x="169" y="244" textAnchor="middle"
            fill={labelColor} fontSize="7.5" fontFamily={T.fontMono} letterSpacing="0.5">SALA 1 · ENTRADA PRINCIPAL</text>

          {/* Museum name badge — top center */}
          <rect x="108" y="24" width="124" height="20" rx="4"
            fill="rgba(200,130,50,0.12)" stroke="rgba(210,155,75,0.35)" strokeWidth="0.8"/>
          <text x="170" y="38" textAnchor="middle"
            fill="rgba(210,155,75,0.7)" fontSize="7.5" fontFamily={T.fontMono} letterSpacing="1.5">MUSEO BOTERO</text>

          {/* Compass */}
          <text x="316" y="26" textAnchor="middle"
            fill="rgba(255,255,255,0.18)" fontSize="8" fontFamily={T.fontMono}>N</text>
          <line x1="316" y1="29" x2="316" y2="40"
            stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
          <polygon points="316,27 313,37 319,37" fill="rgba(255,255,255,0.18)"/>

          {/* Vignette overlay — fades the edges */}
          <rect width="340" height="280" fill="url(#vignette)" pointerEvents="none"/>
        </>
      )}

      {piso === 2 && (
        <>
          {/* Badge */}
          <rect x="108" y="14" width="124" height="18" rx="4"
            fill="rgba(200,130,50,0.12)" stroke="rgba(210,155,75,0.3)" strokeWidth="0.8"/>
          <text x="170" y="26" textAnchor="middle"
            fill="rgba(210,155,75,0.6)" fontSize="7" fontFamily={T.fontMono} letterSpacing="1.2">MUSEO BOTERO · PISO 2</text>

          {/* Outer halo */}
          <rect x="48" y="36" width="244" height="228" rx="8"
            fill="rgba(200,130,50,0.03)" stroke="rgba(210,155,75,0.14)" strokeWidth="1.2"/>

          {/* ── Left wing ── */}
          {/* Sala 8 (top-left) */}
          <rect x="50" y="38" width="70" height="58" rx="3"
            fill={boteroFill} stroke={boteroStroke} strokeWidth="1"/>
          <text x="85" y="70" textAnchor="middle" fill={labelColor} fontSize="8" fontFamily={T.fontMono}>8</text>
          {/* Sala 7A (mid-left) */}
          <rect x="50" y="100" width="70" height="52" rx="3"
            fill={boteroFill} stroke={boteroStroke} strokeWidth="1"/>
          <text x="85" y="129" textAnchor="middle" fill={labelColor} fontSize="8" fontFamily={T.fontMono}>7A</text>
          {/* Sala 7 (bottom-left) */}
          <rect x="50" y="156" width="70" height="58" rx="3"
            fill={boteroFill} stroke={boteroStroke} strokeWidth="1"/>
          <text x="85" y="188" textAnchor="middle" fill={labelColor} fontSize="8" fontFamily={T.fontMono}>7</text>

          {/* ── Top wing ── */}
          {/* Sala 9 (top-left) */}
          <rect x="124" y="38" width="84" height="58" rx="3"
            fill={boteroFill} stroke={boteroStroke} strokeWidth="1"/>
          <text x="166" y="70" textAnchor="middle" fill={labelColor} fontSize="8" fontFamily={T.fontMono}>9</text>
          {/* Sala 10 (top-right) */}
          <rect x="212" y="38" width="80" height="58" rx="3"
            fill={boteroFill} stroke={boteroStroke} strokeWidth="1"/>
          <text x="252" y="70" textAnchor="middle" fill={labelColor} fontSize="8" fontFamily={T.fontMono}>10</text>

          {/* ── Right wing ── */}
          {/* Sala 11 (mid-right) */}
          <rect x="220" y="100" width="70" height="52" rx="3"
            fill={boteroFill} stroke={boteroStroke} strokeWidth="1"/>
          <text x="255" y="129" textAnchor="middle" fill={labelColor} fontSize="8" fontFamily={T.fontMono}>11</text>
          {/* Sala 11A (bottom-right) */}
          <rect x="220" y="156" width="70" height="58" rx="3"
            fill={boteroFill} stroke={boteroStroke} strokeWidth="1"/>
          <text x="255" y="188" textAnchor="middle" fill={labelColor} fontSize="8" fontFamily={T.fontMono}>11A</text>

          {/* ── Bottom wing ── */}
          {/* Sala 6A (center-bottom) */}
          <rect x="124" y="218" width="84" height="44" rx="3"
            fill={boteroFill} stroke={boteroStroke} strokeWidth="1"/>
          <text x="166" y="243" textAnchor="middle" fill={labelColor} fontSize="8" fontFamily={T.fontMono}>6A</text>
          {/* Sala 12 (right-bottom) — matches reference */}
          <rect x="212" y="218" width="76" height="44" rx="3"
            fill={boteroFill} stroke={boteroStroke} strokeWidth="1"/>
          <text x="250" y="243" textAnchor="middle" fill={labelColor} fontSize="8" fontFamily={T.fontMono}>12</text>

          {/* ── Central hollow patio ── */}
          <rect x="124" y="100" width="92" height="114" rx="4"
            fill="rgba(0,0,0,0.45)"
            stroke="rgba(210,155,75,0.22)" strokeWidth="0.8" strokeDasharray="4 3"/>
          <text x="170" y="153" textAnchor="middle"
            fill="rgba(210,155,75,0.25)" fontSize="6" fontFamily={T.fontMono} letterSpacing="1">PATIO</text>
          <text x="170" y="163" textAnchor="middle"
            fill="rgba(210,155,75,0.2)" fontSize="5" fontFamily={T.fontMono} letterSpacing="0.5">CENTRAL</text>

          {/* ── Staircase icons (top-left & top-right portals) ── */}
          {[{cx:124,cy:96},{cx:216,cy:96}].map((s,i) => (
            <g key={i}>
              <circle cx={s.cx} cy={s.cy} r="8"
                fill="rgba(60,50,40,0.9)" stroke="rgba(210,155,75,0.4)" strokeWidth="0.8"/>
              <path d={`M${s.cx-4},${s.cy+3} L${s.cx},${s.cy-3} L${s.cx+4},${s.cy+3}`}
                fill="none" stroke="rgba(210,155,75,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1={s.cx-3} y1={s.cy+1} x2={s.cx+3} y2={s.cy+1}
                stroke="rgba(210,155,75,0.4)" strokeWidth="0.7"/>
            </g>
          ))}

          {/* ── Elevator indicator ── */}
          <rect x="156" y="214" width="28" height="20" rx="5"
            fill="rgba(200,130,50,0.18)" stroke="rgba(210,155,75,0.5)" strokeWidth="1"/>
          <text x="170" y="227" textAnchor="middle"
            fill="rgba(210,155,75,0.7)" fontSize="6.5" fontFamily={T.fontMono} fontWeight="600">Elev</text>

          {/* ── WC / Info dots (center-south patio wall) ── */}
          {[{cx:152,cy:198,lbl:"WC"},{cx:170,cy:204,lbl:"i"}].map((d,i) => (
            <g key={i}>
              <circle cx={d.cx} cy={d.cy} r="6"
                fill="rgba(30,26,22,0.95)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7"/>
              <text x={d.cx} y={d.cy+2.5} textAnchor="middle"
                fill="rgba(255,255,255,0.35)" fontSize="5.5" fontFamily={T.fontUI}>{d.lbl}</text>
            </g>
          ))}

          {/* Compass */}
          <text x="316" y="26" textAnchor="middle"
            fill="rgba(255,255,255,0.15)" fontSize="8" fontFamily={T.fontMono}>N</text>
          <line x1="316" y1="29" x2="316" y2="40"
            stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
          <polygon points="316,27 313,37 319,37" fill="rgba(255,255,255,0.15)"/>

          {/* Vignette */}
          <rect width="340" height="280" fill="url(#vignette)" pointerEvents="none"/>
        </>
      )}

      {/* ── Route path overlay ── */}
      {rutaId && ROUTE_PATHS[rutaId] && (
        <>
          <path d={ROUTE_PATHS[rutaId]} fill="none" stroke={rutaColor}
            strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity="0.06"/>
          <path d={ROUTE_PATHS[rutaId]} fill="none" stroke={rutaColor}
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="6 5" opacity="0.9"
            style={{ animation:"route-flow 1.2s linear infinite" }}/>
        </>
      )}

      {/* ── Artwork pins ── */}
      {activePins.map(pin => {
        const isActive  = obraActiva === pin.id;
        const isVisited = visitadas.includes(pin.id);
        const inRuta    = rutaId ? RUTAS_MAPA.find(r=>r.id===rutaId)?.obras.includes(pin.id) : true;
        const pinColor  = isVisited ? T.brandGreen : isActive ? rutaColor : inRuta ? "#F0EBE3" : "#4A4440";
        const bgColor   = isActive ? rutaColor : isVisited ? "#0F2318" : "#1C1814";
        return (
          <g key={pin.id} className="pin-tap"
            onClick={() => onPinClick(pin.id)}
            style={{ cursor:"pointer", transformOrigin:`${pin.x}px ${pin.y}px` }}>
            {isActive && (<>
              <circle cx={pin.x} cy={pin.y} r="18" fill="none" stroke={rutaColor} strokeWidth="1"
                style={{ animation:"sonar-1 1.6s ease-out infinite", transformOrigin:`${pin.x}px ${pin.y}px` }}/>
              <circle cx={pin.x} cy={pin.y} r="18" fill="none" stroke={rutaColor} strokeWidth="0.5"
                style={{ animation:"sonar-2 1.6s ease-out infinite 0.4s", transformOrigin:`${pin.x}px ${pin.y}px` }}/>
            </>)}
            <circle cx={pin.x} cy={pin.y} r={isActive ? 12 : 9}
              fill={bgColor} stroke={pinColor} strokeWidth={isActive ? 2 : 1.4}/>
            {isVisited
              ? <text x={pin.x} y={pin.y+3.5} textAnchor="middle"
                  fill={T.brandGreen} fontSize="10" fontFamily={T.fontMono} fontWeight="600">✓</text>
              : <text x={pin.x} y={pin.y+3.5} textAnchor="middle"
                  fill={pinColor} fontSize="8" fontFamily={T.fontMono} fontWeight="500">{pin.id}</text>
            }
          </g>
        );
      })}

      {/* ── Visitor location — near Sala 1 entrance ── */}
      {piso === 1 && (
        <g>
          <circle cx="169" cy="252" r="14" fill="none" stroke={T.brandPrimary} strokeWidth="1"
            style={{ animation:"sonar-1 2s ease-out infinite", transformOrigin:"169px 252px" }} opacity="0.7"/>
          <circle cx="169" cy="252" r="14" fill="none" stroke={T.brandPrimary} strokeWidth="0.5"
            style={{ animation:"sonar-2 2s ease-out infinite 0.6s", transformOrigin:"169px 252px" }} opacity="0.35"/>
          <circle cx="169" cy="252" r="5" fill={T.brandPrimary}/>
          <circle cx="169" cy="252" r="2.5" fill="white" opacity="0.95"/>
          <rect x="178" y="245" width="56" height="14" rx="4" fill="rgba(12,10,9,0.9)"/>
          <text x="206" y="255" textAnchor="middle"
            fill={T.textPrimary} fontSize="6.5" fontFamily={T.fontUI} fontWeight="500">Tú estás aquí</text>
        </g>
      )}
    </svg>
  );
}

function MapaBottomSheet({ obraActiva, rutaId, onObraChange, visitadas, onVisitar, onDetalleObra }) {
  const [sheetState, setSheetState] = useState("collapsed");
  const startY = useRef(null);
  const HEIGHTS = { collapsed:88, mid:300, full:540 };
  const obra = OBRAS.find(o => o.id === obraActiva);
  const ruta = RUTAS_MAPA.find(r => r.id === rutaId);
  const proximaId = ruta?.obras.filter(id => !visitadas.includes(id))[0];
  const proximaObra = OBRAS.find(o => o.id === proximaId);

  const onDragStart = (e) => { startY.current = e.touches ? e.touches[0].clientY : e.clientY; };
  const onDragEnd   = (e) => {
    const endY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const diff = startY.current - endY;
    if (diff > 40)       setSheetState(s => s==="collapsed" ? "mid" : "full");
    else if (diff < -40) setSheetState(s => s==="full" ? "mid" : "collapsed");
  };

  return (
    <div className="sheet-in" onMouseDown={onDragStart} onMouseUp={onDragEnd} onTouchStart={onDragStart} onTouchEnd={onDragEnd}
      style={{ position:"absolute", bottom:64, left:0, right:0, height:HEIGHTS[sheetState], backgroundColor:T.bgCard, borderRadius:"20px 20px 0 0", borderTop:`1px solid ${T.borderMedium}`, borderLeft:`1px solid ${T.borderSubtle}`, borderRight:`1px solid ${T.borderSubtle}`, transition:"height 0.32s cubic-bezier(.22,.68,0,1.1)", zIndex:40, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:10, paddingBottom:6, flexShrink:0, cursor:"grab" }}>
        <div style={{ width:36, height:4, borderRadius:2, backgroundColor:T.borderMedium }}/>
      </div>
      {sheetState === "collapsed" && (
        <div style={{ padding:"4px 20px 0", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer" }} onClick={() => setSheetState("mid")}>
          <div style={{ flex:1 }}>
            {proximaObra ? (
              <>
                <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.18em", color:T.textDisabled, textTransform:"uppercase", marginBottom:3 }}>Próxima obra</p>
                <p style={{ fontFamily:T.fontDisplay, fontSize:15, color:T.textPrimary, fontWeight:400 }}>#{proximaObra.id} · {proximaObra.titulo}</p>
                <p style={{ fontFamily:T.fontUI, fontSize:11, color:T.textSecondary, marginTop:2 }}>{proximaObra.sala} · ~2 min caminando</p>
              </>
            ) : (
              <p style={{ fontFamily:T.fontUI, fontSize:13, color:T.textSecondary }}>{rutaId ? "✓ Ruta completada" : "Toca un pin para ver detalles"}</p>
            )}
          </div>
          <div style={{ width:32, height:32, borderRadius:"50%", backgroundColor:T.bgCardRaised, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
          </div>
        </div>
      )}
      {(sheetState === "mid" || sheetState === "full") && (
        <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"2px 20px 14px", flexShrink:0 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.2em", color:ruta ? ruta.color : T.textDisabled, textTransform:"uppercase", marginBottom:4 }}>{ruta ? ruta.label : "Exploración libre"}</p>
                {obra ? (
                  <>
                    <h3 style={{ fontFamily:T.fontDisplay, fontSize:20, color:T.textPrimary, fontWeight:400, lineHeight:"120%", marginBottom:3 }}>{obra.titulo}</h3>
                    <p style={{ fontFamily:T.fontUI, fontSize:12, color:T.textSecondary }}>{obra.año} · {obra.tecnica} · {obra.sala}</p>
                  </>
                ) : <p style={{ fontFamily:T.fontUI, fontSize:14, color:T.textSecondary }}>Toca un pin para ver detalles</p>}
              </div>
              {obra && <div style={{ width:48, height:48, borderRadius:10, backgroundColor:T.bgCardRaised, border:`1px solid ${T.borderSubtle}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontFamily:T.fontMono, fontSize:13, fontWeight:500, color:T.textDisabled }}>#{obra.id}</span>
              </div>}
            </div>
            {obra && (
              <div style={{ display:"flex", gap:8, marginTop:14 }}>
                <button className="btn-tap" onClick={() => onVisitar(obra.id)} style={{ flex:1, height:44, borderRadius:12, backgroundColor: visitadas.includes(obra.id) ? "#0F2318" : T.brandPrimary, border: visitadas.includes(obra.id) ? `1px solid ${T.brandGreen}` : "none", color:"white", fontFamily:T.fontUI, fontSize:13, fontWeight:500, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, letterSpacing:"0.04em" }}>
                  {visitadas.includes(obra.id) ? <><span style={{color:T.brandGreen}}>✓</span> Visitada</> : <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>Iniciar guía IA</>}
                </button>
                <button className="btn-tap" onClick={() => onDetalleObra && onDetalleObra(obra.id)} style={{ width:44, height:44, borderRadius:12, backgroundColor:T.bgCardRaised, border:`1px solid ${T.borderSubtle}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="1.8" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </button>
              </div>
            )}
          </div>
          <div style={{ height:1, backgroundColor:T.borderSubtle, flexShrink:0 }}/>
          {sheetState === "full" && ruta && (
            <div style={{ flex:1, overflowY:"auto", padding:"12px 0" }}>
              <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.2em", color:T.textDisabled, textTransform:"uppercase", padding:"0 20px", marginBottom:10 }}>Secuencia · {ruta.obras.length} obras</p>
              {ruta.obras.map((id, idx) => {
                const o = OBRAS.find(ob => ob.id === id);
                const done = visitadas.includes(id);
                const isCurrent = obraActiva === id;
                return (
                  <div key={id} onClick={() => onObraChange(id)} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 20px", backgroundColor: isCurrent ? `${ruta.color}10` : "transparent", borderLeft: isCurrent ? `3px solid ${ruta.color}` : "3px solid transparent", cursor:"pointer" }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0, backgroundColor: done ? "#0F2318" : isCurrent ? ruta.color : T.bgCardRaised, border:`1.5px solid ${done ? T.brandGreen : isCurrent ? ruta.color : T.borderSubtle}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {done ? <span style={{ fontSize:12, color:T.brandGreen }}>✓</span> : <span style={{ fontFamily:T.fontMono, fontSize:10, color: isCurrent ? "white" : T.textDisabled, fontWeight:"500" }}>{String(idx+1).padStart(2,"0")}</span>}
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontFamily:T.fontDisplay, fontSize:14, color: done ? T.textDisabled : T.textPrimary, fontWeight:400 }}>{o?.titulo}</p>
                      <p style={{ fontFamily:T.fontUI, fontSize:11, color:T.textDisabled, marginTop:1 }}>{o?.sala} · ~{(idx+1)*3} min acumulado</p>
                    </div>
                    {!done && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textDisabled} strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>}
                  </div>
                );
              })}
            </div>
          )}
          {sheetState === "mid" && ruta && (
            <div style={{ flex:1, overflowY:"auto", padding:"12px 20px" }}>
              <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.18em", color:T.textDisabled, textTransform:"uppercase", marginBottom:10 }}>Siguientes en ruta</p>
              {ruta.obras.slice(0,3).map((id, idx) => {
                const o = OBRAS.find(ob => ob.id === id);
                const done = visitadas.includes(id);
                return (
                  <div key={id} onClick={() => onObraChange(id)} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${T.borderSubtle}`, cursor:"pointer", opacity: done ? 0.45 : 1 }}>
                    <span style={{ fontFamily:T.fontMono, fontSize:10, color:T.textDisabled, minWidth:20 }}>{done ? "✓" : `0${idx+1}`}</span>
                    <div style={{ flex:1 }}>
                      <p style={{ fontFamily:T.fontUI, fontSize:13, color:T.textPrimary, fontWeight:300 }}>{o?.titulo}</p>
                      <p style={{ fontFamily:T.fontUI, fontSize:10, color:T.textDisabled }}>{o?.sala}</p>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.textDisabled} strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                );
              })}
              <button onClick={() => setSheetState("full")} style={{ marginTop:12, fontFamily:T.fontUI, fontSize:12, color:ruta?.color || T.textAccent, background:"none", border:"none", cursor:"pointer", padding:0 }}>Ver todas las obras →</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   EXPERIENCIAS SHEET — Fase 2
═══════════════════════════════════════════════════════ */
// SVG icon helpers (no emoji)
const IcoFlash  = (p={}) => <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IcoAccess = (p={}) => <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><circle cx="8" cy="18" r="5"/></svg>;
const IcoSculpt = (p={}) => <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2a5 5 0 0 1 5 5c0 3-2 5.5-5 7.5C9 12.5 7 10 7 7a5 5 0 0 1 5-5z"/><path d="M12 14.5V22M9 22h6"/></svg>;
const IcoMap    = (p={}) => <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>;
const IcoSearch = (p={}) => <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IcoClock  = (p={}) => <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IcoCheck  = (p={}) => <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>;

const RUTAS_DETALLE = [
  {
    id:      "esenciales",
    label:   "Las Imprescindibles",
    tiempo:  "25 min",
    pisos:   "Piso 1 + Piso 2",
    obras:   ["01","03","07","12","11"],
    color:   "#C0392B",
    desc:    "Las 5 obras más icónicas de Botero en un recorrido por ambos pisos. La Mona Lisa, La familia, Venus y dos joyas de la colección permanente.",
    tag:     "Más popular",
    icon:    <IcoFlash/>,
  },
  {
    id:      "sinbarrera",
    label:   "Sin Barreras",
    tiempo:  "35 min",
    pisos:   "Solo Piso 1",
    obras:   ["01","02","07","08","04"],
    color:   "#27AE60",
    desc:    "Recorrido completo en planta baja. Cero escaleras. Ascensor disponible. Incluye el Patio Central con esculturas en bronce y mármol.",
    tag:     "Accesible",
    icon:    <IcoAccess/>,
  },
  {
    id:      "forma",
    label:   "Volumen y Forma",
    tiempo:  "40 min",
    pisos:   "Piso 1",
    obras:   ["07","08","01","05","06"],
    color:   "#D4A017",
    desc:    "La escultura como protagonista. Del Patio Central a las salas con las piezas más volumétricas de Botero. Para quienes quieran sentir la forma.",
    tag:     "Guía IA",
    icon:    <IcoSculpt/>,
  },
  {
    id:      "completo",
    label:   "Recorrido Completo",
    tiempo:  "75 min",
    pisos:   "Piso 1 + Piso 2",
    obras:   ["01","02","03","07","09","11","13","16"],
    color:   "#5B8CDB",
    desc:    "Los dos pisos en un solo recorrido sistemático. Desde la entrada hasta las salas altas. La colección completa del Maestro.",
    tag:     "Completo",
    icon:    <IcoMap/>,
  },
];

const MODE_OBRA = "obra";

function ExperienciasSheet({ onSelect, onSelectObra, onClose, rutaActiva }) {
  const [mode, setMode] = useState("routes"); // "routes" | "obra"
  const [query, setQuery] = useState("");

  const obrasFiltradas = query.trim()
    ? OBRAS.filter(o =>
        o.titulo.toLowerCase().includes(query.toLowerCase()) ||
        o.sala.toLowerCase().includes(query.toLowerCase())
      )
    : OBRAS;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position:"absolute", inset:0, zIndex:50, backgroundColor:"rgba(0,0,0,0.55)", backdropFilter:"blur(4px)", WebkitBackdropFilter:"blur(4px)" }}/>

      {/* Sheet */}
      <div className="sheet-in" style={{ position:"absolute", bottom:64, left:0, right:0, zIndex:55, backgroundColor:T.bgCard, borderRadius:"20px 20px 0 0", borderTop:`1px solid ${T.borderMedium}`, borderLeft:`1px solid ${T.borderSubtle}`, borderRight:`1px solid ${T.borderSubtle}`, maxHeight:"80vh", display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* Handle */}
        <div style={{ display:"flex", justifyContent:"center", paddingTop:12, paddingBottom:4, flexShrink:0 }}>
          <div style={{ width:36, height:4, borderRadius:2, backgroundColor:T.borderMedium }}/>
        </div>

        {/* Header */}
        <div style={{ padding:"8px 20px 12px", display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexShrink:0 }}>
          <div>
            <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.2em", color:T.textDisabled, textTransform:"uppercase", marginBottom:4 }}>Experiencia de Visita</p>
            <h2 style={{ fontFamily:T.fontDisplay, fontSize:21, fontWeight:400, color:T.textPrimary }}>Elige tu recorrido</h2>
          </div>
          <button onClick={onClose} aria-label="Cerrar" style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.textDisabled} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Mode tabs */}
        <div style={{ display:"flex", gap:6, padding:"0 16px 12px", flexShrink:0 }}>
          {[
            { id:"routes", label:"Rutas curadas",  icon:<IcoMap size={13}/> },
            { id:"obra",   label:"Obra específica", icon:<IcoSearch size={13}/> },
          ].map(tab => (
            <button key={tab.id} onClick={() => { setMode(tab.id); setQuery(""); }}
              aria-pressed={mode === tab.id}
              style={{ display:"flex", alignItems:"center", gap:6, height:34, paddingLeft:12, paddingRight:14, borderRadius:99, border:`1px solid ${mode===tab.id ? T.borderMedium : T.borderSubtle}`, backgroundColor: mode===tab.id ? T.bgCardRaised : "transparent", fontFamily:T.fontUI, fontSize:11, fontWeight:500, color: mode===tab.id ? T.textPrimary : T.textDisabled, cursor:"pointer", transition:"all 0.18s ease" }}>
              <span style={{ color: mode===tab.id ? T.brandPrimary : T.textDisabled }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", minHeight:0 }}>

          {/* ── Rutas curadas ── */}
          {mode === "routes" && (
            <div style={{ padding:"0 16px 20px", display:"flex", flexDirection:"column", gap:10 }}>
              {RUTAS_DETALLE.map(ruta => {
                const isActive = rutaActiva === ruta.id;
                return (
                  <button key={ruta.id} className="card-tap" onClick={() => onSelect(ruta.id)}
                    aria-pressed={isActive}
                    style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"14px 16px", backgroundColor: isActive ? `${ruta.color}14` : T.bgCardRaised, border:`1px solid ${isActive ? ruta.color+"55" : T.borderSubtle}`, borderRadius:14, cursor:"pointer", textAlign:"left", width:"100%" }}>
                    {/* Icon */}
                    <div style={{ width:40, height:40, borderRadius:11, flexShrink:0, backgroundColor:`${ruta.color}18`, border:`1px solid ${ruta.color}30`, display:"flex", alignItems:"center", justifyContent:"center", color:ruta.color }}>{ruta.icon}</div>
                    {/* Body */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:2 }}>
                        <h3 style={{ fontFamily:T.fontDisplay, fontSize:15, fontWeight:400, color:T.textPrimary }}>{ruta.label}</h3>
                        {isActive && <span style={{ fontFamily:T.fontUI, fontSize:9, color:ruta.color, letterSpacing:"0.12em", textTransform:"uppercase" }}>Activa</span>}
                      </div>
                      <p style={{ fontFamily:T.fontUI, fontSize:11, fontWeight:300, color:T.textSecondary, lineHeight:"145%", marginBottom:8 }}>{ruta.desc}</p>
                      <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                        <span style={{ fontFamily:T.fontUI, fontSize:10, color:ruta.color, backgroundColor:`${ruta.color}14`, border:`1px solid ${ruta.color}28`, padding:"2px 8px", borderRadius:99 }}>{ruta.tag}</span>
                        <span style={{ display:"flex", alignItems:"center", gap:4, fontFamily:T.fontMono, fontSize:10, color:T.textDisabled }}><IcoClock/>{ruta.tiempo}</span>
                        <span style={{ fontFamily:T.fontMono, fontSize:10, color:T.textDisabled }}>{ruta.obras.length} obras</span>
                        <span style={{ fontFamily:T.fontMono, fontSize:10, color:T.textDisabled }}>{ruta.pisos}</span>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div style={{ flexShrink:0, display:"flex", alignItems:"center", paddingTop:8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isActive ? ruta.color : T.textDisabled} strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Obra específica ── */}
          {mode === "obra" && (
            <div style={{ padding:"0 16px 20px" }}>
              {/* Search input */}
              <div style={{ position:"relative", marginBottom:12 }}>
                <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:T.textDisabled, pointerEvents:"none" }}><IcoSearch size={15}/></div>
                <input
                  type="text"
                  placeholder="Busca por título o sala..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  aria-label="Buscar obra por nombre o sala"
                  style={{ width:"100%", height:42, paddingLeft:36, paddingRight:14, backgroundColor:T.bgCardRaised, border:`1px solid ${T.borderSubtle}`, borderRadius:12, fontFamily:T.fontUI, fontSize:13, color:T.textPrimary, outline:"none", boxSizing:"border-box" }}
                />
              </div>
              {/* Piso headers */}
              {[1,2].map(piso => {
                const obras = obrasFiltradas.filter(o => o.piso === piso);
                if (!obras.length) return null;
                return (
                  <div key={piso} style={{ marginBottom:8 }}>
                    <p style={{ fontFamily:T.fontUI, fontSize:9, letterSpacing:"0.18em", color:T.textDisabled, textTransform:"uppercase", marginBottom:6, paddingLeft:4 }}>Piso {piso}</p>
                    <div style={{ backgroundColor:T.bgCardRaised, borderRadius:12, border:`1px solid ${T.borderSubtle}`, overflow:"hidden" }}>
                      {obras.map((obra, i) => (
                        <button key={obra.id} onClick={() => onSelectObra(obra.id)}
                          aria-label={`Navegar a ${obra.titulo}, ${obra.sala}`}
                          style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:"12px 14px", backgroundColor:"transparent", border:"none", borderBottom: i < obras.length-1 ? `1px solid ${T.borderSubtle}` : "none", cursor:"pointer", textAlign:"left" }}>
                          <div style={{ width:28, height:28, borderRadius:8, backgroundColor:T.bgCard, border:`1px solid ${T.borderSubtle}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <span style={{ fontFamily:T.fontMono, fontSize:9, color:T.textDisabled }}>{obra.id}</span>
                          </div>
                          <div style={{ flex:1 }}>
                            <p style={{ fontFamily:T.fontDisplay, fontSize:13, color:T.textPrimary, fontWeight:400 }}>{obra.titulo}</p>
                            <p style={{ fontFamily:T.fontUI, fontSize:10, color:T.textDisabled, marginTop:1 }}>{obra.sala} · {obra.año}</p>
                          </div>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.textDisabled} strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   FASE 4 — DesvioModal + LlegadaScreen
═══════════════════════════════════════════════════════ */
function DesvioModal({ onRecalcular, onIgnorar, distSim }) {
  return (
    <div role="alertdialog" aria-modal="true" aria-label="Alerta de desvío"
      style={{ position:"absolute", inset:0, zIndex:90, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={onIgnorar}
        style={{ position:"absolute", inset:0, backgroundColor:"rgba(0,0,0,0.6)", backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)" }}/>
      <div className="sheet-in" style={{ position:"relative", backgroundColor:T.bgCard, borderRadius:"20px 20px 0 0",
        borderTop:`1px solid rgba(212,160,23,0.4)`, padding:"24px 24px 32px", display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
        {/* Icon */}
        <div style={{ width:52, height:52, borderRadius:16, backgroundColor:"rgba(212,160,23,0.12)", border:`1px solid rgba(212,160,23,0.3)`,
          display:"flex", alignItems:"center", justifyContent:"center", color:"#D4A017" }}>
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div style={{ textAlign:"center" }}>
          <h2 style={{ fontFamily:T.fontDisplay, fontSize:20, fontWeight:400, color:T.textPrimary, marginBottom:6 }}>Parece que te saliste del camino</h2>
          <p style={{ fontFamily:T.fontUI, fontSize:13, color:T.textSecondary, lineHeight:"148%" }}>
            Estás a aproximadamente <strong style={{ color:"#D4A017" }}>{distSim} m</strong> de la ruta. ¿Quieres que recalculemos el trayecto?
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10, width:"100%", marginTop:4 }}>
          <button onClick={onRecalcular} aria-label="Recalcular la ruta desde tu posición actual"
            style={{ height:50, borderRadius:14, backgroundColor:"#D4A017", border:"none", cursor:"pointer",
              fontFamily:T.fontUI, fontSize:14, fontWeight:500, color:"white",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
              boxShadow:"0 4px 16px rgba(212,160,23,0.3)" }}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Recalcular ruta
          </button>
          <button onClick={onIgnorar} aria-label="Continuar sin recalcular"
            style={{ height:44, borderRadius:14, backgroundColor:"transparent", border:`1px solid ${T.borderSubtle}`,
              cursor:"pointer", fontFamily:T.fontUI, fontSize:13, color:T.textSecondary }}>
            Seguir solo
          </button>
        </div>
      </div>
    </div>
  );
}

function LlegadaScreen({ obra, ruta, visitadas, onSiguiente, onElegirRuta, onVerMapa }) {
  const obrasTotales  = ruta?.obras || [];
  const visitadasRuta = visitadas.filter(id => obrasTotales.includes(id));
  const isUltimaRuta  = visitadasRuta.length >= obrasTotales.length;
  const progreso      = obrasTotales.length ? visitadasRuta.length / obrasTotales.length : 1;
  const rutaColor     = ruta?.color || T.brandGreen;

  return (
    <div role="main" aria-label={`Llegaste a ${obra?.titulo}`}
      style={{ position:"absolute", inset:0, zIndex:80, backgroundColor:T.bgBase,
        display:"flex", flexDirection:"column", animation:"fadeSlideUp 0.35s cubic-bezier(.22,.68,0,1.1) both" }}>

      {/* Success header */}
      <div style={{ flexShrink:0, padding:"32px 24px 24px", display:"flex", flexDirection:"column", alignItems:"center", gap:16,
        background:`linear-gradient(180deg, ${rutaColor}18 0%, transparent 100%)` }}>
        <div style={{ width:64, height:64, borderRadius:20, backgroundColor:`${rutaColor}20`,
          border:`1.5px solid ${rutaColor}50`, display:"flex", alignItems:"center", justifyContent:"center", color:rutaColor }}>
          <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div style={{ textAlign:"center" }}>
          <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.2em", color:T.textDisabled, textTransform:"uppercase", marginBottom:6 }}>Llegaste a</p>
          <h1 style={{ fontFamily:T.fontDisplay, fontSize:26, fontWeight:400, color:T.textPrimary, marginBottom:4 }}>{obra?.titulo}</h1>
          <p style={{ fontFamily:T.fontUI, fontSize:12, color:T.textSecondary }}>{obra?.sala} · Piso {obra?.piso} · {obra?.año}</p>
        </div>
      </div>

      {/* Obra description */}
      <div style={{ flex:1, overflowY:"auto", padding:"0 24px" }}>
        <p style={{ fontFamily:T.fontUI, fontSize:13, color:T.textSecondary, lineHeight:"160%", marginBottom:20 }}>{obra?.desc}</p>
        <p style={{ fontFamily:T.fontUI, fontSize:11, color:T.textDisabled, marginBottom:6 }}>{obra?.tecnica}</p>

        {/* Route progress */}
        {ruta && (
          <div style={{ backgroundColor:T.bgCard, border:`1px solid ${T.borderSubtle}`, borderRadius:14, padding:"14px 16px", marginBottom:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <p style={{ fontFamily:T.fontUI, fontSize:11, color:T.textDisabled }}>{ruta.label}</p>
              <p style={{ fontFamily:T.fontMono, fontSize:11, color:rutaColor }}>{visitadasRuta.length}/{obrasTotales.length} obras</p>
            </div>
            <div style={{ height:4, borderRadius:2, backgroundColor:"rgba(255,255,255,0.07)", overflow:"hidden" }}>
              <div style={{ width:`${progreso*100}%`, height:"100%", borderRadius:2, backgroundColor:rutaColor, transition:"width 0.6s ease" }}/>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ flexShrink:0, padding:"16px 24px 28px", display:"flex", flexDirection:"column", gap:10,
        borderTop:`1px solid ${T.borderSubtle}` }}>
        {!isUltimaRuta && ruta ? (
          <button onClick={onSiguiente} aria-label="Navegar a la siguiente obra de la ruta"
            style={{ height:52, borderRadius:16, backgroundColor:rutaColor, border:"none", cursor:"pointer",
              fontFamily:T.fontUI, fontSize:14, fontWeight:500, color:"white",
              display:"flex", alignItems:"center", justifyContent:"center", gap:10,
              boxShadow:`0 4px 20px ${rutaColor}40` }}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            Siguiente obra
          </button>
         ) : ruta ? (
          <>
            <p style={{ fontFamily:T.fontDisplay, fontSize:17, fontWeight:400, color:T.textPrimary, textAlign:"center", marginBottom:4 }}>Completaste la ruta</p>
            <button onClick={onElegirRuta} aria-label="Elegir una nueva ruta"
              style={{ height:52, borderRadius:16, backgroundColor:rutaColor, border:"none", cursor:"pointer",
                fontFamily:T.fontUI, fontSize:14, fontWeight:500, color:"white",
                display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                boxShadow:`0 4px 20px ${rutaColor}40` }}>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
              </svg>
              Elegir nueva ruta
            </button>
          </>
        ) : null}
        <button onClick={onVerMapa} aria-label="Ver ubicación en el mapa"
          style={{ height:44, borderRadius:14, backgroundColor:T.bgCardRaised, border:`1px solid ${T.borderSubtle}`,
            cursor:"pointer", fontFamily:T.fontUI, fontSize:13, color:T.textSecondary }}>
          Ver en el mapa
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   GUIA ACTIVO — Fase 3
═══════════════════════════════════════════════════════ */
const PASOS_NAVEGACION = {
  "01": [
    { tipo:"start",       texto:"Entras por Sala 1 — Entrada Principal",                distancia:"Estás aquí" },
    { tipo:"turn",        texto:"Gira a la izquierda hacia el pasillo de Sala 1A",     distancia:"~5 m"       },
    { tipo:"straight",    texto:"Avanza hasta el fondo de la sala (pared norte)",       distancia:"~10 m"      },
    { tipo:"destination", texto:"La Mona Lisa está frente a ti, pared del fondo",       distancia:"·"          },
  ],
  "02": [
    { tipo:"start",       texto:"Desde Sala 1A avanza por el corredor izquierdo",      distancia:"Estás aquí" },
    { tipo:"straight",    texto:"Sube por la rampa al ala de Sala 2",                   distancia:"~8 m"       },
    { tipo:"destination", texto:"Mujer con espejo está en la pared central",            distancia:"·"          },
  ],
  "03": [
    { tipo:"start",       texto:"Desde la entrada sube al ala superior izquierda",     distancia:"Estás aquí" },
    { tipo:"straight",    texto:"Avanza por el corredor norte hacia Sala 3",            distancia:"~14 m"      },
    { tipo:"destination", texto:"La familia ocupa la pared longitudinal principal",     distancia:"·"          },
  ],
  "04": [
    { tipo:"start",       texto:"Desde Sala 3 continúa hacia la derecha",              distancia:"Estás aquí" },
    { tipo:"straight",    texto:"Avanza por el corredor norte hasta Sala 4",            distancia:"~10 m"      },
    { tipo:"destination", texto:"Naturaleza muerta cuelga en la pared este de Sala 4", distancia:"·"          },
  ],
  "05": [
    { tipo:"start",       texto:"Desde Sala 4 gira hacia el ala derecha del museo",  distancia:"Estás aquí" },
    { tipo:"turn",        texto:"Baja por el pasillo hacia Sala 5",                    distancia:"~12 m"      },
    { tipo:"destination", texto:"La bailarina está al fondo de Sala 5",               distancia:"·"          },
  ],
  "06": [
    { tipo:"start",       texto:"Desde Sala 5 desciendes hacia Sala 5A",              distancia:"Estás aquí" },
    { tipo:"destination", texto:"El presidente te espera en la pared principal",       distancia:"~6 m"       },
  ],
  "07": [
    { tipo:"start",       texto:"Sal por la puerta derecha hacia el Patio Central",   distancia:"Estás aquí" },
    { tipo:"straight",    texto:"Atraviesa el arco principal hacia el patio abierto",  distancia:"~12 m"      },
    { tipo:"destination", texto:"Venus está al centro del Patio Central",              distancia:"·"          },
  ],
  "08": [
    { tipo:"start",       texto:"Sal al Patio Central por la puerta este",             distancia:"Estás aquí" },
    { tipo:"destination", texto:"Hombre a caballo está al fondo derecho del patio",   distancia:"~8 m"       },
  ],
  // Piso 2
  "09": [
    { tipo:"start",       texto:"Sube al Piso 2 por las escaleras o el ascensor",      distancia:"Estás aquí" },
    { tipo:"turn",        texto:"Gira a la izquierda y avanza hacia Sala 7",            distancia:"~10 m"      },
    { tipo:"destination", texto:"Pedro Páramo ocupa la pared principal de Sala 7",     distancia:"·"          },
  ],
  "10": [
    { tipo:"start",       texto:"En Piso 2, ubica Sala 7A en el ala oeste",            distancia:"Estás aquí" },
    { tipo:"straight",    texto:"Avanza por el corredor izquierdo hasta Sala 7A",       distancia:"~8 m"       },
    { tipo:"destination", texto:"La corrida está frente a ti en la pared del fondo",   distancia:"·"          },
  ],
  "11": [
    { tipo:"start",       texto:"Desde la escalera principal sube a Sala 8",           distancia:"Estás aquí" },
    { tipo:"destination", texto:"Los músicos te reciben en la pared norte de Sala 8",  distancia:"~6 m"       },
  ],
  "12": [
    { tipo:"start",       texto:"Sube al Piso 2 y avanza hacia Sala 9 en el eje norte",distancia:"Estás aquí" },
    { tipo:"straight",    texto:"Atraviesa el corredor superior hasta Sala 9",          distancia:"~16 m"      },
    { tipo:"destination", texto:"El senador te espera en la pared principal de Sala 9", distancia:"·"         },
  ],
  "13": [
    { tipo:"start",       texto:"Desde Sala 9 continúa por el eje norte hacia Sala 10",distancia:"Estás aquí" },
    { tipo:"straight",    texto:"Avanza por el pasillo superior derecho",               distancia:"~10 m"      },
    { tipo:"destination", texto:"La colombiana está en la pared este de Sala 10",       distancia:"·"          },
  ],
  "14": [
    { tipo:"start",       texto:"Ubica Sala 11 en el ala derecha del Piso 2",          distancia:"Estás aquí" },
    { tipo:"destination", texto:"Naturaleza viva ocupa la pared central de Sala 11",   distancia:"~8 m"       },
  ],
  "15": [
    { tipo:"start",       texto:"Desde Sala 11 desciendes hacia Sala 11A",             distancia:"Estás aquí" },
    { tipo:"destination", texto:"El desfile te espera en el frente de Sala 11A",       distancia:"~6 m"       },
  ],
  "16": [
    { tipo:"start",       texto:"Baja al eje sur del Piso 2, ala derecha",             distancia:"Estás aquí" },
    { tipo:"straight",    texto:"Avanza por el pasillo inférior hasta Sala 12",         distancia:"~12 m"      },
    { tipo:"destination", texto:"Retrato de familia está en la pared principal",        distancia:"·"          },
  ],
};

const TIPO_ICONO = {
  start: <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>,
  turn:  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/><path d="M15 12H3"/><path d="M15 6v6"/></svg>,
  straight: <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  destination: <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
};

function GuiaActivoScreen({ rutaId, obraDestinoId, visitadas, onClose, onLlegue, onDesvio }) {
  const [pasoIdx, setPasoIdx]     = useState(0);
  const [simPaused, setSimPaused] = useState(false);
  const obra      = OBRAS.find(o => o.id === obraDestinoId);
  const rutaDet   = RUTAS_DETALLE.find(r => r.id === rutaId);
  const isAcces   = rutaId === "sinbarrera";
  const pasos     = PASOS_NAVEGACION[obraDestinoId] || PASOS_NAVEGACION["01"];
  const paso      = pasos[pasoIdx];
  const esUltimo  = pasoIdx === pasos.length - 1;
  const rutaColor = rutaDet?.color || T.brandPrimary;

  // Simulated position tracker — fires a random desvío every ~12s
  useEffect(() => {
    if (simPaused) return;
    const id = setInterval(() => {
      if (Math.random() < 0.30) onDesvio(Math.floor(10 + Math.random()*20));
    }, 12000);
    return () => clearInterval(id);
  }, [simPaused, onDesvio]);

  const handleSiguiente = () => {
    if (!esUltimo) setPasoIdx(p => p + 1);
    else onLlegue(obraDestinoId);
  };

  return (
    <div role="main" aria-label={`Guía hacia ${obra?.titulo || "la obra"}`}
      style={{ position:"absolute", inset:0, zIndex:70, backgroundColor:T.bgBase, display:"flex", flexDirection:"column", animation:"fadeSlideUp 0.3s cubic-bezier(.22,.68,0,1.1) both" }}>

      {/* Header */}
      <header role="banner" style={{ flexShrink:0, display:"flex", alignItems:"center", gap:12, padding:"14px 20px 12px", borderBottom:`1px solid ${T.borderSubtle}` }}>
        <button onClick={onClose} aria-label="Cerrar guía y volver al mapa"
          style={{ width:44, height:44, borderRadius:12, flexShrink:0, backgroundColor:T.bgCardRaised, border:`1px solid ${T.borderSubtle}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.16em", color:T.textDisabled, textTransform:"uppercase", marginBottom:1 }}>
            {rutaDet ? `Navegando · ${rutaDet.label}` : "Obra específica"}
          </p>
          <h1 style={{ fontFamily:T.fontDisplay, fontSize:17, fontWeight:400, color:T.textPrimary, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{obra?.titulo}</h1>
        </div>
        {isAcces && (
          <span role="status" aria-label="Ruta sin barreras arquitectónicas"
            style={{ flexShrink:0, display:"flex", alignItems:"center", gap:5, fontFamily:T.fontUI, fontSize:10, fontWeight:500, color:T.brandGreen, backgroundColor:"rgba(39,174,96,0.12)", border:`1px solid rgba(39,174,96,0.3)`, borderRadius:99, padding:"4px 10px" }}>
            <IcoAccess size={12}/> Sin barreras
          </span>
        )}
        {/* Dev: simulate desvío */}
        <button onClick={() => { setSimPaused(true); onDesvio(Math.floor(10+Math.random()*20)); }}
          title="[DEV] Simular desvío"
          style={{ width:32, height:32, borderRadius:8, flexShrink:0, backgroundColor:"rgba(212,160,23,0.1)", border:`1px solid rgba(212,160,23,0.25)`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </button>
      </header>

      {/* Mini floor plan */}
      <div aria-hidden="true" style={{ flexShrink:0, height:136, backgroundColor:"#0A0806", borderBottom:`1px solid ${T.borderSubtle}`, overflow:"hidden" }}>
        <svg viewBox="0 0 340 136" width="100%" height="100%" style={{ display:"block" }}>
          <defs><pattern id="mg" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5"/></pattern></defs>
          <rect width="340" height="136" fill="#0A0806"/><rect width="340" height="136" fill="url(#mg)"/>
          <rect x="86" y="10" width="168" height="116" rx="6" fill="rgba(200,130,50,0.05)" stroke="rgba(210,155,75,0.18)" strokeWidth="1"/>
          {[
            { x:88,y:12,w:38,h:44,lbl:"2",   hl:false },
            { x:88,y:60,w:38,h:30,lbl:"1A",  hl: ["01","02"].includes(obraDestinoId) },
            { x:130,y:12,w:38,h:36,lbl:"3",  hl: obraDestinoId==="03" },
            { x:172,y:12,w:38,h:36,lbl:"4",  hl: false },
            { x:214,y:12,w:38,h:44,lbl:"5",  hl: false },
            { x:214,y:60,w:38,h:30,lbl:"5A", hl: false },
            { x:88,y:94,w:164,h:28,lbl:"1 · ENTRADA", hl: false },
          ].map(s => (
            <g key={s.lbl}>
              <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="2"
                fill={s.hl ? `${rutaColor}26` : "rgba(200,130,50,0.08)"}
                stroke={s.hl ? rutaColor : "rgba(210,155,75,0.25)"} strokeWidth={s.hl ? 1.2 : 0.6}/>
              <text x={s.x+s.w/2} y={s.y+s.h/2+2.5} textAnchor="middle"
                fill={s.hl ? rutaColor : "rgba(255,255,255,0.18)"} fontSize="6.5" fontFamily={T.fontMono}>{s.lbl}</text>
            </g>
          ))}
          <rect x="130" y="60" width="80" height="30" rx="2" fill="rgba(0,0,0,0.4)" stroke="rgba(210,155,75,0.1)" strokeWidth="0.5" strokeDasharray="3 2"/>
          <text x="170" y="79" textAnchor="middle" fill="rgba(210,155,75,0.18)" fontSize="5.5" fontFamily={T.fontMono}>PATIO</text>
          {/* Path */}
          <line x1="170" y1="112" x2="170" y2="80"
            stroke={rutaColor} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.7"/>
          <line x1="170" y1="80" x2="107" y2="80"
            stroke={rutaColor} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.7"/>
          {/* User */}
          <circle cx="170" cy="112" r="5" fill={T.brandPrimary}/>
          <circle cx="170" cy="112" r="2.5" fill="white" opacity="0.9"/>
          <rect x="178" y="106" width="44" height="11" rx="3" fill="rgba(12,10,9,0.9)"/>
          <text x="200" y="115" textAnchor="middle" fill={T.textPrimary} fontSize="5" fontFamily={T.fontUI}>Tú estás aquí</text>
          {/* Destination */}
          <circle cx="107" cy="80" r="7" fill={rutaColor} opacity="0.9"/>
          <text x="107" y="83.5" textAnchor="middle" fill="white" fontSize="7" fontFamily={T.fontMono}>{obraDestinoId}</text>
          <text x="170" y="9" textAnchor="middle" fill="rgba(210,155,75,0.35)" fontSize="5" fontFamily={T.fontMono} letterSpacing="1">MUSEO BOTERO</text>
        </svg>
      </div>

      {/* Body */}
      <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column" }}>

        {/* Progress */}
        <div role="progressbar" aria-label={`Paso ${pasoIdx+1} de ${pasos.length}`}
          aria-valuenow={pasoIdx+1} aria-valuemin={1} aria-valuemax={pasos.length}
          style={{ display:"flex", gap:4, padding:"14px 20px 2px" }}>
          {pasos.map((_,i) => (
            <div key={i} style={{ flex:1, height:3, borderRadius:2, backgroundColor: i<=pasoIdx ? rutaColor : "rgba(255,255,255,0.08)", transition:"background-color 0.3s ease" }}/>
          ))}
        </div>
        <p style={{ fontFamily:T.fontMono, fontSize:10, color:T.textDisabled, padding:"4px 20px 0", letterSpacing:"0.06em" }}>Paso {pasoIdx+1} de {pasos.length}</p>

        {/* Current step */}
        <div role="region" aria-live="polite" aria-label={`Instrucción: ${paso.texto}`}
          style={{ margin:"12px 16px", backgroundColor:T.bgCard, border:`1px solid ${T.borderSubtle}`, borderLeft:`3px solid ${rutaColor}`, borderRadius:14, padding:"16px", display:"flex", alignItems:"flex-start", gap:14 }}>
          <div aria-hidden="true"
            style={{ width:44, height:44, borderRadius:12, flexShrink:0, backgroundColor:`${rutaColor}16`, border:`1px solid ${rutaColor}28`, display:"flex", alignItems:"center", justifyContent:"center", color:rutaColor }}>
            {TIPO_ICONO[paso.tipo] || TIPO_ICONO.straight}
          </div>
          <div style={{ flex:1 }}>
            <p style={{ fontFamily:T.fontUI, fontSize:14, color:T.textPrimary, lineHeight:"148%" }}>{paso.texto}</p>
            {paso.distancia !== "·" && (
              <p style={{ fontFamily:T.fontMono, fontSize:11, color:T.textDisabled, marginTop:5 }}>{paso.distancia}</p>
            )}
          </div>
        </div>

        {/* Destination info */}
        <div role="region" aria-label={`Destino: ${obra?.titulo}`}
          style={{ margin:"0 16px", backgroundColor:T.bgCardRaised, border:`1px solid ${T.borderSubtle}`, borderRadius:14, padding:"14px 16px" }}>
          <p style={{ fontFamily:T.fontUI, fontSize:9, letterSpacing:"0.2em", color:T.textDisabled, textTransform:"uppercase", marginBottom:5 }}>Destino</p>
          <h2 style={{ fontFamily:T.fontDisplay, fontSize:20, fontWeight:400, color:T.textPrimary, marginBottom:3 }}>{obra?.titulo}</h2>
          <p style={{ fontFamily:T.fontUI, fontSize:12, color:T.textSecondary }}>{obra?.sala} · Piso {obra?.piso} · {obra?.año}</p>
          <p style={{ fontFamily:T.fontUI, fontSize:11, color:T.textDisabled, marginTop:2 }}>{obra?.tecnica}</p>
        </div>

        {/* Accessibility panel */}
        {isAcces && (
          <div role="note" aria-label="Información de accesibilidad"
            style={{ margin:"10px 16px 0", backgroundColor:"rgba(39,174,96,0.07)", border:`1px solid rgba(39,174,96,0.2)`, borderRadius:12, padding:"11px 14px", display:"flex", alignItems:"center", gap:10 }}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.brandGreen} strokeWidth="1.8" strokeLinecap="round">
              <circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><circle cx="8" cy="18" r="5"/>
            </svg>
            <p style={{ fontFamily:T.fontUI, fontSize:11, color:T.brandGreen, lineHeight:"145%" }}>Rampa disponible · Sin escaleras · Ascensor en el ala este</p>
          </div>
        )}

        <div style={{ flex:1 }}/>

        {/* Actions */}
        <div role="group" aria-label="Acciones de navegación"
          style={{ padding:"16px", display:"flex", gap:10, flexShrink:0, borderTop:`1px solid ${T.borderSubtle}` }}>
          <button onClick={onClose}
            aria-label="Salir de la guía y volver al mapa"
            style={{ height:50, paddingLeft:18, paddingRight:18, borderRadius:14, backgroundColor:T.bgCardRaised, border:`1px solid ${T.borderSubtle}`, fontFamily:T.fontUI, fontSize:13, color:T.textSecondary, cursor:"pointer" }}>
            Salir
          </button>
          <button onClick={handleSiguiente}
            aria-label={esUltimo ? `Confirmar llegada a ${obra?.titulo}` : "Avanzar al siguiente paso"}
            style={{ flex:1, height:50, borderRadius:14, backgroundColor: esUltimo ? T.brandGreen : rutaColor, border:"none", cursor:"pointer", fontFamily:T.fontUI, fontSize:14, fontWeight:500, color:"white", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow: esUltimo ? "0 4px 16px rgba(39,174,96,0.3)" : `0 4px 16px ${rutaColor}30`, transition:"background-color 0.25s ease" }}>
            {esUltimo ? (
              <><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>¡Llegúe!</>
            ) : (
              <>Siguiente <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function MapaScreen({ onDetalleObra }) {
  const [piso, setPiso]             = useState(1);
  const [rutaId, setRutaId]         = useState(null);
  const [obraActiva, setObraActiva] = useState(null);
  const [visitadas, setVisitadas]   = useState([]);
  const [mapScale, setMapScale]     = useState(1);
  const [zoom, setZoom]             = useState(1);
  const [showSheet, setShowSheet]   = useState(false);
  const [showGuide, setShowGuide]   = useState(false);
  const [desvioInfo, setDesvioInfo] = useState(null);  // null | { dist }
  const [llegadaObra, setLlegadaObra] = useState(null); // null | obraId

  const handleSelectRuta = (id) => {
    setRutaId(id);
    const ruta = RUTAS_MAPA.find(r => r.id === id);
    if (ruta) setObraActiva(ruta.obras[0]);
    setShowSheet(false);
  };

  const handleSelectObra = (obraId) => {
    const obra = OBRAS.find(o => o.id === obraId);
    if (obra) setPiso(obra.piso);
    setObraActiva(obraId);
    setRutaId(null);
    setShowSheet(false);
    onDetalleObra && onDetalleObra(obraId);
  };

  const handleLlegue = (obraId) => {
    const updatedVisitadas = visitadas.includes(obraId) ? visitadas : [...visitadas, obraId];
    setVisitadas(updatedVisitadas);
    setShowGuide(false);
    setLlegadaObra(obraId);
  };

  const handleDesvio = (dist) => {
    setDesvioInfo({ dist });
  };

  const handleRecalcular = () => {
    setDesvioInfo(null);
    // Simulation: just dismiss and continue guide from current step
  };

  const handleSiguienteObra = () => {
    setLlegadaObra(null);
    const ruta = RUTAS_MAPA.find(r => r.id === rutaId);
    const updatedVisitadas = visitadas;
    const next = ruta?.obras.find(id => !updatedVisitadas.includes(id));
    if (next) {
      const obraNext = OBRAS.find(o => o.id === next);
      if (obraNext) setPiso(obraNext.piso);
      setObraActiva(next);
      setShowGuide(true);
    }
  };

  const handleElegirRuta = () => {
    setLlegadaObra(null);
    setRutaId(null);
    setObraActiva(null);
    setVisitadas([]);
    setShowSheet(true);
  };

  const handleVerMapa = () => {
    setLlegadaObra(null);
  };

  const handleZoom = (dir) => {
    setZoom(z => Math.min(3, Math.max(1, z+dir)));
    setMapScale(s => Math.min(2.0, Math.max(0.7, s+dir*0.2)));
  };

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minHeight:0 }}>
      {/* Map Header */}
      <div style={{ flexShrink:0, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", backgroundColor:T.bgGlass, borderBottom:`1px solid ${T.borderSubtle}`, padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", zIndex:60 }}>
        <div>
          <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.2em", color:T.textDisabled, textTransform:"uppercase", marginBottom:2 }}>Museo Botero</p>
          <h2 style={{ fontFamily:T.fontDisplay, fontSize:18, fontWeight:400, color:T.textPrimary }}>Mapa del Museo</h2>
        </div>
        <div style={{ display:"flex", backgroundColor:T.bgCardRaised, border:`1px solid ${T.borderSubtle}`, borderRadius:10, overflow:"hidden", padding:2, gap:2 }}>
          {[1,2].map(p => (
            <button key={p} onClick={() => setPiso(p)} className="btn-tap" style={{ width:40, height:28, borderRadius:7, backgroundColor: piso===p ? T.brandPrimary : "transparent", border:"none", cursor:"pointer", fontFamily:T.fontUI, fontSize:11, fontWeight:500, color: piso===p ? "white" : T.textDisabled, transition:"background-color 0.2s ease" }}>P{p}</button>
          ))}
        </div>
      </div>

      {/* Map area */}
      <div style={{ flex:1, position:"relative", overflow:"hidden", backgroundColor:"#0A0806" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)`, backgroundSize:"24px 24px", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", transform:`scale(${mapScale})`, transition:"transform 0.35s cubic-bezier(.22,.68,0,1.1)", transformOrigin:"center center" }}>
          <FloorPlan2D piso={piso} rutaId={rutaId} obraActiva={obraActiva} onPinClick={(id) => { setObraActiva(id); onDetalleObra && onDetalleObra(id); }} visitadas={visitadas}/>
        </div>

        {/* Ruta chips */}
        <div style={{ position:"absolute", top:14, left:0, right:56, paddingLeft:14, zIndex:30, display:"flex", gap:6, overflowX:"auto", WebkitOverflowScrolling:"touch", paddingRight: 14 }}>
          {[{id:null,label:"Libre"}, ...RUTAS_MAPA].map(r => (
            <button key={r.id||"libre"} onClick={() => setRutaId(r.id)} className="ctrl-tap" style={{ flexShrink:0, height:30, padding:"0 10px", borderRadius:T.rFull, backgroundColor: rutaId===r.id ? `${r.color||T.textPrimary}22` : "rgba(28,24,20,0.88)", border:`1px solid ${rutaId===r.id ? (r.color||T.textPrimary)+"55" : T.borderSubtle}`, backdropFilter:"blur(12px)", fontFamily:T.fontUI, fontSize:10, fontWeight:500, color: rutaId===r.id ? (r.color||T.textPrimary) : T.textDisabled, letterSpacing:"0.08em", cursor:"pointer", whiteSpace:"nowrap" }}>
              {r.label}
            </button>
          ))}
        </div>

        {/* Zoom controls */}
        <div style={{ position:"absolute", right:14, top:14, display:"flex", flexDirection:"column", gap:6, zIndex:30 }}>
          {[{label:"+",dir:1},{label:"−",dir:-1}].map(b => (
            <button key={b.label} onClick={() => handleZoom(b.dir)} className="ctrl-tap" style={{ width:36, height:36, borderRadius:10, backgroundColor:"rgba(28,24,20,0.9)", border:`1px solid ${T.borderMedium}`, backdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontFamily:T.fontMono, fontSize:18, color:T.textSecondary }}>{b.label}</button>
          ))}
          <button onClick={() => { setMapScale(1); setZoom(1); }} className="ctrl-tap" style={{ width:36, height:36, borderRadius:10, backgroundColor:`rgba(192,57,43,0.15)`, border:`1px solid rgba(192,57,43,0.3)`, backdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.brandPrimary} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>
          </button>
        </div>

        {/* Progress badge */}
        <div style={{ position:"absolute", bottom:100, left:14, backgroundColor:"rgba(12,10,9,0.88)", backdropFilter:"blur(12px)", border:`1px solid ${T.borderSubtle}`, borderRadius:12, padding:"8px 12px", display:"flex", flexDirection:"column", gap:4 }}>
          <p style={{ fontFamily:T.fontUI, fontSize:9, letterSpacing:"0.16em", color:T.textDisabled, textTransform:"uppercase" }}>Progreso</p>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:70, height:3, borderRadius:2, backgroundColor:"rgba(255,255,255,0.08)", overflow:"hidden" }}>
              <div style={{ width:`${(visitadas.length/(RUTAS_MAPA.find(r=>r.id===rutaId)?.obras.length||OBRAS.length))*100}%`, height:"100%", borderRadius:2, backgroundColor:RUTAS_MAPA.find(r=>r.id===rutaId)?.color||T.brandPrimary, transition:"width 0.4s ease" }}/>
            </div>
            <span style={{ fontFamily:T.fontMono, fontSize:10, color:T.textSecondary }}>{visitadas.length}/{RUTAS_MAPA.find(r=>r.id===rutaId)?.obras.length||OBRAS.length}</span>
          </div>
        </div>

        {/* FABs — hidden when sheets are open */}
        {!showSheet && !showGuide && (
          <div style={{ position:"absolute", bottom:100, right:14, zIndex:40, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
            {rutaId && (
              <button
                onClick={() => setShowGuide(true)}
                aria-label={`Iniciar guía de navegación: ${RUTAS_DETALLE.find(r=>r.id===rutaId)?.label}`}
                className="btn-tap"
                style={{
                  height:44, paddingLeft:16, paddingRight:18, borderRadius:22,
                  backgroundColor: RUTAS_DETALLE.find(r=>r.id===rutaId)?.color || T.brandPrimary,
                  border:"none", cursor:"pointer",
                  display:"flex", alignItems:"center", gap:8,
                  boxShadow:`0 4px 20px ${RUTAS_DETALLE.find(r=>r.id===rutaId)?.color || T.brandPrimary}44`,
                }}
              >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <span style={{ fontFamily:T.fontUI, fontSize:12, fontWeight:500, color:"white", letterSpacing:"0.04em" }}>Comenzar</span>
              </button>
            )}
            <button
              onClick={() => setShowSheet(true)}
              aria-label={rutaId ? "Cambiar ruta seleccionada" : "Seleccionar una ruta de recorrido"}
              className="btn-tap"
              style={{
                height:38, paddingLeft:14, paddingRight:16, borderRadius:19,
                backgroundColor:"rgba(28,24,20,0.92)",
                border:`1px solid ${T.borderMedium}`,
                backdropFilter:"blur(12px)",
                display:"flex", alignItems:"center", gap:7,
                cursor:"pointer",
              }}
            >
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2.5" strokeLinecap="round">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
              </svg>
              <span style={{ fontFamily:T.fontUI, fontSize:11, color:T.textSecondary, letterSpacing:"0.04em" }}>
                {rutaId ? "Cambiar ruta" : "Iniciar Ruta"}
              </span>
            </button>
          </div>
        )}

        {/* Guía Activo overlay */}
        {showGuide && (
          <GuiaActivoScreen
            rutaId={rutaId}
            obraDestinoId={obraActiva}
            visitadas={visitadas}
            onClose={() => setShowGuide(false)}
            onLlegue={handleLlegue}
            onDesvio={handleDesvio}
          />
        )}

        {/* DesvioModal [M06] — rendered above GuiaActivo */}
        {desvioInfo && showGuide && (
          <DesvioModal
            distSim={desvioInfo.dist}
            onRecalcular={handleRecalcular}
            onIgnorar={() => setDesvioInfo(null)}
          />
        )}

        {/* LlegadaScreen [M11] */}
        {llegadaObra && (
          <LlegadaScreen
            obra={OBRAS.find(o => o.id === llegadaObra)}
            ruta={RUTAS_DETALLE.find(r => r.id === rutaId)}
            visitadas={visitadas}
            onSiguiente={handleSiguienteObra}
            onElegirRuta={handleElegirRuta}
            onVerMapa={handleVerMapa}
          />
        )}

        {/* Experiencias Sheet */}
        {showSheet && (
          <ExperienciasSheet
            rutaActiva={rutaId}
            onSelect={handleSelectRuta}
            onSelectObra={handleSelectObra}
            onClose={() => setShowSheet(false)}
          />
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PLACEHOLDER
═══════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════
/* ═══════════════════════════════════════════════════════
   [P03] FichaObraScreen  +  [D02] PreguntarIASheet
═══════════════════════════════════════════════════════ */

// [SYS02] + [P03] — Ficha de Obra con skeleton loader
function FichaObraScreen({ obraId, onClose, onPreguntarIA, onHome, onSelectObra, onColeccion, isSaved, onToggleColeccion }) {
  const obra = OBRAS.find(o => o.id === obraId);
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setIsExpanded(false);
    setIsPlaying(false);
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, [obraId]);

  if (!obra) return null;

  // Obras similares del mismo piso
  const similarObras = OBRAS.filter(o => o.id !== obraId && o.piso === obra.piso).slice(0, 3);

  // Shared icon button style
  const iconBtn = (extra={}) => ({
    width:40, height:40, borderRadius:12,
    backgroundColor:"rgba(12,10,9,0.5)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
    border:`1px solid rgba(255,255,255,0.1)`,
    display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
    position:"absolute", top:"max(16px, env(safe-area-inset-top, 16px))", zIndex: 10, ...extra,
  });

  return (
    <div role="main" aria-label={`Ficha: ${obra.titulo}`}
      style={{ position:"absolute", inset:0, zIndex:75, backgroundColor:T.bgBase, display:"flex", flexDirection:"column", animation:"fadeSlideUp 0.3s cubic-bezier(.22,.68,0,1.1) both" }}>
      
      {/* ── MAIN SCROLLABLE AREA ── */}
      <div style={{ flex:1, overflowY:"auto", overflowX:"hidden", scrollbarWidth:"none", msOverflowStyle:"none" }}>
        <div style={{ paddingBottom: 110 }}>
          
          {/* Phase 1: Hero Image Full-Bleed (45vh) */}
          <div style={{ width: "100%", height: "45vh", background:"linear-gradient(160deg,#2A1A0E 0%,#1A0E06 100%)", position:"relative", overflow:"hidden" }}>
            {!loaded && (
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(200,130,50,0.04) 25%,rgba(200,130,50,0.10) 50%,rgba(200,130,50,0.04) 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.6s infinite" }}/>
            )}
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
              opacity: loaded ? 1 : 0, transition:"opacity 0.5s ease" }}>
              {obra.img ? (
                <img src={obra.img} alt={obra.titulo} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center" }} />
              ) : (
                <div style={{ width:"100%", height:"100%", backgroundColor:"rgba(200,130,50,0.09)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg aria-hidden="true" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(200,130,50,0.35)" strokeWidth="1" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              )}
            </div>
            
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:60, background:`linear-gradient(to bottom, transparent, ${T.bgBase})` }}/>

            {/* Navigation Controls */}
            <button onClick={onClose} aria-label="Volver al mapa" style={iconBtn({ left:20 })}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button onClick={onHome} aria-label="Ir al inicio" style={iconBtn({ right:20 })}>
              <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </button>
          </div>

          <div style={{ padding:"16px 24px 0", opacity: loaded ? 1 : 0, transition:"opacity 0.4s ease 0.1s" }}>
            
            {/* Title Area */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
              <h1 style={{ fontFamily:T.fontDisplay, fontSize:34, fontWeight:400, color:T.textPrimary, lineHeight:"110%", letterSpacing:"-0.01em", maxWidth:"85%" }}>
                {obra.titulo}
              </h1>
              <button onClick={() => onToggleColeccion()} style={{ background:"none", border:"none", cursor:"pointer", padding:4, marginTop:4, transition:"transform 0.2s ease" }} aria-label={isSaved ? "Quitar de favoritos" : "Añadir a favoritos"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill={isSaved ? T.brandPrimary : "none"} stroke={T.brandPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Phase 2: Bento Stats */}
            <div style={{ display:"flex", backgroundColor:"rgba(255,255,255,0.03)", border:`1px solid ${T.borderSubtle}`, borderRadius:T.rMd, padding:"16px 0", marginBottom:24 }}>
              <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", borderRight:`1px solid ${T.borderSubtle}` }}>
                <span style={{ fontFamily:T.fontUI, fontSize:10, color:T.textDisabled, marginBottom:6, letterSpacing:"0.05em" }}>Año</span>
                <span style={{ fontFamily:T.fontUI, fontSize:14, fontWeight:500, color:T.textPrimary }}>{obra.año}</span>
              </div>
              <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", borderRight:`1px solid ${T.borderSubtle}` }}>
                <span style={{ fontFamily:T.fontUI, fontSize:10, color:T.textDisabled, marginBottom:6, letterSpacing:"0.05em" }}>Autor</span>
                <span style={{ fontFamily:T.fontUI, fontSize:14, fontWeight:500, color:T.textPrimary }}>F. Botero</span>
              </div>
              <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center" }}>
                <span style={{ fontFamily:T.fontUI, fontSize:10, color:T.textDisabled, marginBottom:6, letterSpacing:"0.05em" }}>Piso</span>
                <span style={{ fontFamily:T.fontUI, fontSize:14, fontWeight:500, color:T.textPrimary }}>{obra.sala}</span>
              </div>
            </div>

            {/* Audio Inmersivo */}
            <div style={{ marginBottom:36 }}>
              <p style={{ fontFamily:T.fontUI, fontSize:11, fontWeight:500, letterSpacing:"0.05em", color:T.textDisabled, marginBottom:12, textTransform:"uppercase" }}>Escuchar Guía</p>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{ width:44, height:44, borderRadius:"50%", backgroundColor:"white", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
                  {isPlaying ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0C0A09"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0C0A09" style={{ marginLeft:3 }}><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  )}
                </button>
                <span style={{ fontFamily:T.fontUI, fontSize:13, fontWeight:500, color:T.textSecondary, fontVariantNumeric:"tabular-nums" }}>1:14</span>
                <div style={{ flex:1, display:"flex", alignItems:"center", gap:3, height:24 }}>
                  {[...Array(30)].map((_, i) => (
                    <div key={i} style={{ 
                      flex:1, 
                      backgroundColor: i < 8 ? T.textPrimary : T.borderMedium, 
                      height: isPlaying ? `${Math.max(15, Math.random() * 100)}%` : `${[10,20,40,70,30,50,90,60,30,20,40,70,100,80,40,30,60,80,50,20,40,70,40,20,50,30,70,40,20,10][i]}%`,
                      borderRadius:2,
                      transition:"height 0.2s ease"
                    }}/>
                  ))}
                </div>
              </div>
            </div>

            {/* Phase 3: Descripción Histórica */}
            <div style={{ marginBottom:40 }}>
              <p style={{ fontFamily:T.fontUI, fontSize:11, fontWeight:500, letterSpacing:"0.05em", color:T.textDisabled, marginBottom:10, textTransform:"uppercase" }}>Descripción</p>
              <p style={{ fontFamily:T.fontUI, fontSize:14, color:T.textSecondary, lineHeight:"160%", fontWeight:300 }}>
                {isExpanded ? obra.desc : obra.desc.slice(0, 110) + "... "}
                {!isExpanded && (
                  <span onClick={() => setIsExpanded(true)} style={{ color:T.brandPrimary, fontWeight:500, cursor:"pointer" }}>
                    Leer más
                  </span>
                )}
              </p>
            </div>

            {/* Phase 5: Obras Similares */}
            <div style={{ marginBottom:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:16 }}>
                <p style={{ fontFamily:T.fontDisplay, fontSize:18, fontWeight:400, color:T.textPrimary }}>Obras Similares</p>
                <button onClick={onColeccion} style={{ fontFamily:T.fontUI, fontSize:12, color:T.textDisabled, background:"none", border:"none", cursor:"pointer" }}>Ver todas</button>
              </div>
              <div style={{ display:"flex", gap:12, overflowX:"auto", margin:"0 -24px", padding:"0 24px", scrollbarWidth:"none" }}>
                {similarObras.map((so) => (
                  <div key={so.id} onClick={() => onSelectObra && onSelectObra(so.id)} style={{ width:140, flexShrink:0, display:"flex", flexDirection:"column", cursor:"pointer" }}>
                    <div style={{ width:"100%", height:140, borderRadius:12, background:`linear-gradient(135deg, ${T.bgCardRaised}, ${T.bgCard})`, marginBottom:10, position:"relative", overflow:"hidden" }}>
                      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <svg width="24" height="24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                      </div>
                    </div>
                    <h4 style={{ fontFamily:T.fontDisplay, fontSize:14, fontWeight:500, color:T.textPrimary, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", marginBottom:2 }}>{so.titulo}</h4>
                    <p style={{ fontFamily:T.fontUI, fontSize:11, color:T.textDisabled }}>{so.sala}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PHASE 4: STICKY AI CTA (FLOW 02) ── */}
      <div style={{ 
        position:"absolute", bottom:0, left:0, right:0, 
        padding:"16px 24px 32px", 
        background:`linear-gradient(to top, rgba(12,10,9,1) 40%, rgba(12,10,9,0.8) 75%, transparent 100%)`,
        pointerEvents:"none" 
      }}>
        <button onClick={onPreguntarIA} disabled={!loaded}
          aria-label="Preguntar a la IA sobre esta obra"
          style={{ 
            pointerEvents:"auto",
            width:"100%", height:58, borderRadius:T.rFull,
            backgroundColor: loaded ? "rgba(18,15,13,0.85)" : "rgba(18,15,13,0.4)",
            backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
            border:`1px solid ${loaded ? T.borderMedium : T.borderSubtle}`, 
            cursor: loaded ? "pointer" : "default",
            display:"flex", alignItems:"center", padding:"0 20px 0 10px", gap:14,
            boxShadow: loaded ? `0 16px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)` : "none",
            transform: loaded ? "translateY(0)" : "translateY(10px)",
            opacity: loaded ? 1 : 0,
            transition:"all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" 
          }}>
          <div style={{ 
            width:40, height:40, borderRadius:"50%", 
            background: `linear-gradient(135deg, ${T.brandPrimary}, ${T.brandGlow})`,
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 
          }}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"center" }}>
            <span style={{ fontFamily:T.fontUI, fontSize:14, fontWeight:400, color:"white" }}>Preguntarle a la IA</span>
            <span style={{ fontFamily:T.fontUI, fontSize:11, color:T.textDisabled, marginTop:1 }}>Mantén para usar voz</span>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
// [D02] Red disponible? → dos ramas: offline o con conexión
function PreguntarIASheet({ obra, networkError, onClose, onEnviar, onHome }) {
  const [pregunta, setPregunta] = useState("¿Cuál es el estilo de esta obra?");
  return (
    <div role="dialog" aria-modal="true" aria-label="Preguntar a la IA"
      style={{ position:"absolute", inset:0, zIndex:90, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      {/* Backdrop */}
      <div onClick={onClose}
        style={{ position:"absolute", inset:0, backgroundColor:"rgba(0,0,0,0.65)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)" }}/>
      {/* Sheet */}
      <div className="sheet-in" style={{ position:"relative", backgroundColor:T.bgCard,
        borderRadius:"22px 22px 0 0", borderTop:`1px solid ${T.borderSubtle}`,
        padding:"16px 22px 32px", display:"flex", flexDirection:"column", gap:16 }}>

        {/* Handle + nav row */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          {/* Back */}
          <button onClick={onClose} aria-label="Volver a la ficha de la obra"
            style={{ width:36, height:36, borderRadius:10, backgroundColor:T.bgCardRaised,
              border:`1px solid ${T.borderSubtle}`, display:"flex", alignItems:"center",
              justifyContent:"center", cursor:"pointer" }}>
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          {/* Handle */}
          <div style={{ width:36, height:4, borderRadius:2, backgroundColor:T.borderMedium }}/>
          {/* Home */}
          <button onClick={onHome} aria-label="Ir al inicio"
            style={{ width:36, height:36, borderRadius:10, backgroundColor:T.bgCardRaised,
              border:`1px solid ${T.borderSubtle}`, display:"flex", alignItems:"center",
              justifyContent:"center", cursor:"pointer" }}>
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </button>
        </div>

        {/* Red indicator */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:8, height:8, borderRadius:"50%",
            backgroundColor: networkError ? "#D4A017" : T.brandGreen,
            boxShadow: networkError ? "0 0 8px #D4A01766" : "0 0 8px rgba(39,174,96,0.5)" }}/>
          <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase",
            color: networkError ? "#D4A017" : T.brandGreen }}>
            {networkError ? "Sin conexión · Usando audio básico" : "Conectado · IA disponible"}
          </p>
        </div>

        {/* Obra eyebrow */}
        <div>
          <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.16em", color:T.textDisabled,
            textTransform:"uppercase", marginBottom:3 }}>Sobre</p>
          <p style={{ fontFamily:T.fontDisplay, fontSize:18, fontWeight:400, color:T.textPrimary }}>{obra?.titulo}</p>
        </div>

        {networkError ? (
          <>
            <div style={{ backgroundColor:"rgba(212,160,23,0.08)", border:"1px solid rgba(212,160,23,0.25)",
              borderRadius:14, padding:"14px 16px", display:"flex", gap:12, alignItems:"flex-start" }}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="1.8" strokeLinecap="round" style={{ flexShrink:0, marginTop:1 }}>
                <line x1="1" y1="1" x2="23" y2="23"/>
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
                <path d="M10.71 5.05A16 16 0 0 1 22.56 9"/>
                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                <line x1="12" y1="20" x2="12.01" y2="20"/>
              </svg>
              <div>
                <p style={{ fontFamily:T.fontUI, fontSize:12, fontWeight:500, color:"#D4A017", marginBottom:3 }}>Modo sin conexión</p>
                <p style={{ fontFamily:T.fontUI, fontSize:11, color:T.textSecondary, lineHeight:"148%" }}>
                  Tu guía de audio pre-descargada estará disponible. La respuesta de IA en vivo no está disponible.
                </p>
              </div>
            </div>
            <button onClick={() => onEnviar("offline")}
              aria-label="Escuchar audio básico de la obra"
              style={{ height:52, borderRadius:16, backgroundColor:"#D4A017", border:"none", cursor:"pointer",
                fontFamily:T.fontUI, fontSize:14, fontWeight:500, color:"white",
                display:"flex", alignItems:"center", justifyContent:"center", gap:9,
                boxShadow:"0 4px 18px rgba(212,160,23,0.35)" }}>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
              Escuchar audio básico
            </button>
          </>
        ) : (
          <>
            <div>
              <p style={{ fontFamily:T.fontUI, fontSize:11, color:T.textDisabled, marginBottom:8 }}>Pregunta sugerida</p>
              <textarea
                value={pregunta}
                onChange={e => setPregunta(e.target.value)}
                rows={3}
                aria-label="Escribe tu pregunta para la IA"
                style={{ width:"100%", padding:"12px 14px", backgroundColor:T.bgCardRaised,
                  border:`1px solid ${T.borderMedium}`, borderRadius:14,
                  fontFamily:T.fontUI, fontSize:13, color:T.textPrimary, lineHeight:"150%",
                  resize:"none", outline:"none", boxSizing:"border-box" }}/>
            </div>
            <button onClick={() => onEnviar("online", pregunta)}
              aria-label="Enviar pregunta a la IA"
              style={{ height:52, borderRadius:16, backgroundColor:T.brandPrimary, border:"none", cursor:"pointer",
                fontFamily:T.fontUI, fontSize:14, fontWeight:500, color:"white",
                display:"flex", alignItems:"center", justifyContent:"center", gap:9,
                boxShadow:`0 4px 18px ${T.brandGlow}` }}>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Enviar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   [SYS03] NLPLoadingScreen  +  [P04+N02] GuiaIAScreen
═══════════════════════════════════════════════════════ */

// [SYS03] — NLP Processing animation (~2s)
function NLPLoadingScreen({ obra, onDone, onCancel }) {
  const [dots, setDots] = useState(1);
  useEffect(() => {
    const d = setInterval(() => setDots(n => (n % 3) + 1), 500);
    const t = setTimeout(onDone, 2200);
    return () => { clearInterval(d); clearTimeout(t); };
  }, [onDone]);
  const labels = ["Analizando composición", "Identificando estilo", "Generando respuesta"];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 700);
    const t2 = setTimeout(() => setStep(2), 1450);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div role="status" aria-live="polite" aria-label="Procesando consulta"
      style={{ position:"absolute", inset:0, zIndex:95, backgroundColor:T.bgBase,
        display:"flex", flexDirection:"column", animation:"fadeSlideUp 0.25s ease both" }}>

      {/* Nav bar */}
      <div style={{ flexShrink:0, display:"flex", justifyContent:"space-between",
        padding:"14px 20px 10px", borderBottom:`1px solid ${T.borderSubtle}` }}>
        <button onClick={onCancel} aria-label="Cancelar y volver a la ficha"
          style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none",
            cursor:"pointer", fontFamily:T.fontUI, fontSize:12, color:T.textSecondary }}>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          Cancelar
        </button>
        <p style={{ fontFamily:T.fontUI, fontSize:11, color:T.textDisabled, alignSelf:"center" }}>
          {obra?.titulo}
        </p>
        <div style={{ width:64 }}/> {/* spacer */}
      </div>

      {/* Centered content */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28 }}>
        {/* Pulsing rings */}
        <div style={{ position:"relative", width:80, height:80, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:`1.5px solid ${T.brandPrimary}`,
            opacity:0.15, animation:"breathe 1.4s ease-out infinite" }}/>
          <div style={{ position:"absolute", inset:-14, borderRadius:"50%", border:`1px solid ${T.brandPrimary}`,
            opacity:0.08, animation:"breathe2 1.4s ease-out infinite 0.2s" }}/>
          <div style={{ width:48, height:48, borderRadius:"50%", backgroundColor:`${T.brandPrimary}18`,
            border:`1.5px solid ${T.brandPrimary}55`,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.brandPrimary} strokeWidth="2" strokeLinecap="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
        </div>
        {/* Step list */}
        <div style={{ display:"flex", flexDirection:"column", gap:10, alignItems:"center" }}>
          {labels.map((l, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8,
              opacity: i <= step ? 1 : 0.25, transition:"opacity 0.35s ease" }}>
              {i < step ? (
                <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.brandGreen} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : i === step ? (
                <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.brandPrimary} strokeWidth="2" strokeLinecap="round"
                  style={{ animation:"spin 1s linear infinite" }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
              ) : (
                <div style={{ width:13, height:13, borderRadius:"50%", border:`1.5px solid ${T.borderMedium}` }}/>
              )}
              <span style={{ fontFamily:T.fontUI, fontSize:12,
                color: i < step ? T.brandGreen : i === step ? T.textPrimary : T.textDisabled,
                transition:"color 0.35s ease" }}>{l}{i === step ? ".".repeat(dots) : ""}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// [P04 + N02] — Guía IA Activa con typewriter y wave bars
function GuiaIAScreen({ obra, mode, onClose }) {
  const texto = obra?.iaRespuesta || "";
  const [displayed, setDisplayed] = useState("");
  const [audioPlaying, setAudioPlaying] = useState(false); // user controls audio
  const [textDone, setTextDone]         = useState(false);
  const idxRef = useRef(0);
  const timerRef = useRef(null);

  // Typewriter runs automatically, independent of audio
  useEffect(() => {
    setDisplayed(""); idxRef.current = 0; setTextDone(false); setAudioPlaying(false);
    timerRef.current = setInterval(() => {
      idxRef.current += 1;
      setDisplayed(texto.slice(0, idxRef.current));
      if (idxRef.current >= texto.length) {
        clearInterval(timerRef.current);
        setTextDone(true);
      }
    }, 18);
    return () => clearInterval(timerRef.current);
  }, [obra?.id]);

  const toggleAudio = () => setAudioPlaying(p => !p);

  const isOnline = mode === "online";
  const accentColor = isOnline ? T.brandPrimary : "#D4A017";

  return (
    <div role="main" aria-label="Guía IA activa"
      style={{ position:"absolute", inset:0, zIndex:95, backgroundColor:T.bgBase,
        display:"flex", flexDirection:"column", animation:"fadeSlideUp 0.3s cubic-bezier(.22,.68,0,1.1) both" }}>

      {/* Header */}
      <div style={{ flexShrink:0, padding:"14px 20px 12px", borderBottom:`1px solid ${T.borderSubtle}`,
        display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={onClose} aria-label="Cerrar y regresar al mapa"
          style={{ width:40, height:40, borderRadius:12, backgroundColor:T.bgCardRaised,
            border:`1px solid ${T.borderSubtle}`, display:"flex", alignItems:"center",
            justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:2 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", backgroundColor:accentColor,
              boxShadow:`0 0 7px ${accentColor}88`,
              animation: audioPlaying ? "breathe 1.2s ease-out infinite" : "none" }}/>
            <span style={{ fontFamily:T.fontUI, fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase",
              color:accentColor }}>
              {isOnline ? "IA en vivo" : "Modo offline"}
            </span>
          </div>
          <p style={{ fontFamily:T.fontDisplay, fontSize:15, fontWeight:400, color:T.textPrimary, lineHeight:"120%" }}>{obra?.titulo}</p>
        </div>
      </div>

      {/* Wave bars [N02] + Play/Pause control */}
      <div style={{ flexShrink:0, padding:"10px 20px", borderBottom:`1px solid ${T.borderSubtle}`,
        display:"flex", alignItems:"center", gap:14 }}>
        {/* Play / Pause button */}
        <button onClick={toggleAudio}
          aria-label={audioPlaying ? "Pausar audio" : "Reproducir audio"}
          style={{ flexShrink:0, width:40, height:40, borderRadius:12,
            backgroundColor: audioPlaying ? `${accentColor}20` : T.bgCardRaised,
            border:`1px solid ${audioPlaying ? accentColor+"55" : T.borderSubtle}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", transition:"all 0.2s ease" }}>
          {audioPlaying ? (
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round">
              <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2.5" strokeLinecap="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          )}
        </button>
        {/* Wave bars */}
        <div style={{ flex:1, display:"flex", alignItems:"flex-end", gap:2.5, height:36, overflow:"hidden" }}>
          {[...Array(28)].map((_,i) => (
            <div key={i} style={{
              flex:1, borderRadius:2,
              backgroundColor: audioPlaying ? accentColor : T.borderMedium,
              height:`${8 + Math.abs(Math.sin(i * 0.65)) * 22}px`,
              transformOrigin:"bottom",
              animation: audioPlaying ? `audio-bar ${0.3+i*0.04}s ease-in-out infinite alternate` : "none",
              transition:"background-color 0.3s ease",
            }}/>
          ))}
        </div>
      </div>

      {/* Typewriter response text */}
      <div style={{ flex:1, overflowY:"auto", padding:"20px 22px" }}>
        <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.16em",
          textTransform:"uppercase", color:T.textDisabled, marginBottom:10 }}>Respuesta</p>
        <p style={{ fontFamily:T.fontUI, fontSize:13.5, color:T.textSecondary, lineHeight:"168%" }}>
          {displayed}
          {!textDone && (
            <span style={{ display:"inline-block", width:2, height:14,
              backgroundColor:accentColor, marginLeft:2, verticalAlign:"middle",
              animation:"breathe 0.8s ease-out infinite" }}/>
          )}
        </p>
        {textDone && (
          <p style={{ fontFamily:T.fontUI, fontSize:10, color:T.textDisabled,
            marginTop:18, letterSpacing:"0.06em", animation:"fadeSlideUp 0.4s ease both" }}>
            {isOnline ? "Generado por IA · Botero Museum Guide" : "Audio básico pre-descargado"}
          </p>
        )}
      </div>

      {/* F01 — Cerrar → Mapa */}
      <div style={{ flexShrink:0, padding:"12px 20px 22px", borderTop:`1px solid ${T.borderSubtle}` }}>
        <button onClick={onClose} aria-label="Cerrar y regresar al mapa"
          style={{ width:"100%", height:52, borderRadius:16,
            backgroundColor:T.bgCardRaised, border:`1px solid ${T.borderMedium}`,
            cursor:"pointer", fontFamily:T.fontUI, fontSize:14, fontWeight:500,
            color:T.textPrimary, display:"flex", alignItems:"center",
            justifyContent:"center", gap:9 }}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round">
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
            <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
          </svg>
          Cerrar · Regresar al mapa
        </button>
      </div>
    </div>
  );
}
function EscanerScreen({ obraId, onClose, onSuccess }) {
  const [phase, setPhase] = useState("scanning"); // scanning | detected
  const obra = OBRAS.find(o => o.id === obraId);
  useEffect(() => {
    const t = setTimeout(() => setPhase("detected"), 1800);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (phase === "detected") {
      const t = setTimeout(onSuccess, 1200);
      return () => clearTimeout(t);
    }
  }, [phase, onSuccess]);
  return (
    <div role="main" aria-label="Escaneando obra"
      style={{ position:"absolute", inset:0, zIndex:80, backgroundColor:"#050302", display:"flex", flexDirection:"column" }}>
      {/* Fake camera */}
      <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center,#111008 0%,#030201 100%)" }}/>
        {/* Grid overlay */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(200,130,50,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,130,50,0.04) 1px,transparent 1px)", backgroundSize:"32px 32px" }}/>
        {/* Viewfinder */}
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:240, height:240, position:"relative" }}>
            {[{t:0,l:0,bt:"none",bb:"none"},{t:0,r:0,bl:"none",bb:"none"},{b:0,l:0,bt:"none",br:"none"},{b:0,r:0,bt:"none",bl:"none"}].map((c,i)=>(
              <div key={i} style={{ position:"absolute", width:28, height:28, ...Object.fromEntries(Object.entries(c).map(([k,v])=>[k==="t"?"top":k==="b"?"bottom":k==="l"?"left":k==="r"?"right":k,v===0?"0":v])), borderTop:c.bt!=="none"?`2.5px solid ${phase==="detected"?"#27AE60":T.brandPrimary}`:"none", borderBottom:c.bb!=="none"?`2.5px solid ${phase==="detected"?"#27AE60":T.brandPrimary}`:"none", borderLeft:c.bl!=="none"?`2.5px solid ${phase==="detected"?"#27AE60":T.brandPrimary}`:"none", borderRight:c.br!=="none"?`2.5px solid ${phase==="detected"?"#27AE60":T.brandPrimary}`:"none", transition:"border-color 0.4s ease" }}/>
            ))}
            {/* Scan line */}
            {phase==="scanning" && (
              <div style={{ position:"absolute", left:0, right:0, height:1.5, backgroundColor:T.brandPrimary, opacity:0.7, animation:"scan-line 2s ease-in-out infinite", boxShadow:`0 0 8px ${T.brandPrimary}` }}/>
            )}
            {/* Detected check */}
            {phase==="detected" && (
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:56, height:56, borderRadius:"50%", backgroundColor:"rgba(39,174,96,0.2)", border:"2px solid #27AE60", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Status */}
        <div style={{ position:"absolute", bottom:32, left:0, right:0, textAlign:"center" }}>
          <p style={{ fontFamily:T.fontUI, fontSize:13, color: phase==="detected" ? "#27AE60" : T.textSecondary, letterSpacing:"0.04em", transition:"color 0.4s ease" }}>
            {phase==="scanning" ? "Apunta al código junto a la obra…" : `¡${obra?.titulo} reconocida!`}
          </p>
        </div>
        {/* Close */}
        <button onClick={onClose} aria-label="Cancelar escaneo"
          style={{ position:"absolute", top:16, left:16, width:40, height:40, borderRadius:12, backgroundColor:"rgba(12,10,9,0.75)", border:`1px solid ${T.borderSubtle}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        {/* Eyebrow */}
        <div style={{ position:"absolute", top:16, left:0, right:0, textAlign:"center" }}>
          <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.18em", color:T.textDisabled, textTransform:"uppercase" }}>Verificar presencia</p>
        </div>
      </div>
    </div>
  );
}

function AudioGuiaModal({ obra, rutaColor, onClose }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalSec = 42;
  const timerRef = useRef(null);
  const toggle = () => {
    if (playing) { clearInterval(timerRef.current); setPlaying(false); }
    else {
      setPlaying(true);
      timerRef.current = setInterval(() => {
        setProgress(p => { if (p >= 100) { clearInterval(timerRef.current); setPlaying(false); return 100; } return p + (100/(totalSec*10)); });
      }, 100);
    }
  };
  useEffect(() => () => clearInterval(timerRef.current), []);
  const elapsed = Math.round(progress / 100 * totalSec);
  return (
    <div role="dialog" aria-modal="true" aria-label="Audio guía"
      style={{ position:"absolute", inset:0, zIndex:95, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0, backgroundColor:"rgba(0,0,0,0.6)", backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)" }}/>
      <div className="sheet-in" style={{ position:"relative", backgroundColor:T.bgCard, borderRadius:"20px 20px 0 0", borderTop:`1px solid ${rutaColor}44`, padding:"24px 24px 36px" }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
          <div style={{ width:36, height:4, borderRadius:2, backgroundColor:T.borderMedium }}/>
        </div>
        <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.18em", color:T.textDisabled, textTransform:"uppercase", marginBottom:4 }}>Audio Guía</p>
        <h2 style={{ fontFamily:T.fontDisplay, fontSize:20, fontWeight:400, color:T.textPrimary, marginBottom:16 }}>{obra?.titulo}</h2>
        {/* Bars visualizer */}
        <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:32, marginBottom:16, justifyContent:"center" }}>
          {[...Array(18)].map((_,i)=>(
            <div key={i} style={{ width:3, borderRadius:2, backgroundColor: playing ? rutaColor : T.borderMedium, height:`${20+Math.sin(i*0.8)*14}px`, transformOrigin:"bottom", animation: playing ? `audio-bar ${0.4+i*0.06}s ease-in-out infinite alternate` : "none", transition:"background-color 0.3s ease" }}/>
          ))}
        </div>
        {/* Progress */}
        <div style={{ height:3, borderRadius:2, backgroundColor:"rgba(255,255,255,0.08)", overflow:"hidden", marginBottom:8 }}>
          <div style={{ width:`${progress}%`, height:"100%", borderRadius:2, backgroundColor:rutaColor, transition:"width 0.1s linear" }}/>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
          <span style={{ fontFamily:T.fontMono, fontSize:10, color:T.textDisabled }}>{`${Math.floor(elapsed/60)}:${String(elapsed%60).padStart(2,"0")}`}</span>
          <span style={{ fontFamily:T.fontMono, fontSize:10, color:T.textDisabled }}>{`0:${totalSec}`}</span>
        </div>
        {/* Play button */}
        <button onClick={toggle} aria-label={playing ? "Pausar" : "Reproducir audio guía"}
          style={{ width:"100%", height:52, borderRadius:16, backgroundColor: rutaColor, border:"none", cursor:"pointer", fontFamily:T.fontUI, fontSize:14, fontWeight:500, color:"white", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:`0 4px 20px ${rutaColor}44` }}>
          {playing
            ? <><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pausar</>
            : <><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> Reproducir</>
          }
        </button>
      </div>
    </div>
  );
}

function ArExperienciaScreen({ obraId, onClose, onColeccion }) {
  const [showAudio, setShowAudio] = useState(false);
  const obra = OBRAS.find(o => o.id === obraId);
  const rutaColor = T.brandPrimary;
  return (
    <div role="main" aria-label={`Experiencia: ${obra?.titulo}`}
      style={{ position:"absolute", inset:0, zIndex:85, backgroundColor:"#050302", display:"flex", flexDirection:"column", animation:"fadeSlideUp 0.35s cubic-bezier(.22,.68,0,1.1) both" }}>
      {/* Full-bleed artwork backdrop */}
      <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 60% 40%,#2A1508 0%,#0A0504 70%)" }}/>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 65% 38%,rgba(200,130,50,0.08) 0%,transparent 60%)" }}/>
        {/* Artwork placeholder frame */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-52%)", width:200, height:220, borderRadius:8, backgroundColor:"rgba(200,130,50,0.07)", border:"1px solid rgba(200,130,50,0.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg aria-hidden="true" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(200,130,50,0.3)" strokeWidth="1" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </div>
        {/* AR floating tags */}
        {[
          { text:obra?.titulo||"", sub:"Fernando Botero", x:"8%", y:"18%" },
          { text:obra?.año||"", sub:"Año de creación", x:"62%", y:"68%" },
          { text:obra?.sala||"", sub:"Ubicación actual", x:"10%", y:"72%" },
        ].map((tag,i)=>(
          <div key={i} style={{ position:"absolute", left:tag.x, top:tag.y, backgroundColor:"rgba(12,10,9,0.82)", backdropFilter:"blur(10px)", border:`1px solid rgba(200,130,50,0.22)`, borderRadius:10, padding:"7px 11px", animation:`fadeSlideUp 0.4s ${0.1+i*0.12}s cubic-bezier(.22,.68,0,1.1) both` }}>
            <p style={{ fontFamily:T.fontDisplay, fontSize:11, color:T.textPrimary }}>{tag.text}</p>
            <p style={{ fontFamily:T.fontUI, fontSize:9, color:T.textDisabled, marginTop:1 }}>{tag.sub}</p>
          </div>
        ))}
        {/* Close */}
        <button onClick={onClose} aria-label="Cerrar experiencia"
          style={{ position:"absolute", top:14, left:14, width:40, height:40, borderRadius:12, backgroundColor:"rgba(12,10,9,0.8)", border:`1px solid ${T.borderSubtle}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={T.textSecondary} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div style={{ position:"absolute", top:16, left:0, right:0, textAlign:"center" }}>
          <p style={{ fontFamily:T.fontUI, fontSize:9, letterSpacing:"0.2em", color:"rgba(200,130,50,0.5)", textTransform:"uppercase" }}>Experiencia Inmersiva · AR</p>
        </div>
      </div>
      {/* Bottom panel */}
      <div style={{ flexShrink:0, backgroundColor:T.bgCard, borderTop:`1px solid ${T.borderSubtle}`, padding:"16px 20px 20px" }}>
        <p style={{ fontFamily:T.fontUI, fontSize:12, color:T.textSecondary, lineHeight:"152%", marginBottom:14 }}>{obra?.desc?.slice(0,90)}…</p>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={() => setShowAudio(true)} aria-label="Abrir audio guía"
            style={{ flex:1, height:46, borderRadius:13, backgroundColor:`${rutaColor}18`, border:`1px solid ${rutaColor}30`, cursor:"pointer", fontFamily:T.fontUI, fontSize:12, fontWeight:500, color:rutaColor, display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            Audio guía
          </button>
          <button onClick={() => onColeccion(obraId)} aria-label="Guardar en Mi Colección"
            style={{ flex:1, height:46, borderRadius:13, backgroundColor:rutaColor, border:"none", cursor:"pointer", fontFamily:T.fontUI, fontSize:12, fontWeight:500, color:"white", display:"flex", alignItems:"center", justifyContent:"center", gap:7, boxShadow:`0 4px 16px ${T.brandGlow}` }}>
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            A Mi Colección
          </button>
        </div>
      </div>
      {showAudio && <AudioGuiaModal obra={obra} rutaColor={rutaColor} onClose={() => setShowAudio(false)}/>}
    </div>
  );
}

function ColeccionScreen({ coleccion, onDetalleObra, onToggleColeccion }) {
  const [tab, setTab] = useState("coleccion"); // "coleccion" | "listas" | "todas"
  const [tecnicaFilter, setTecnicaFilter] = useState("Todas");

  const getCat = (tecnica) => {
    const low = tecnica.toLowerCase();
    if (low.includes("mármol") || low.includes("bronce")) return "Esculturas";
    if (low.includes("óleo") || low.includes("acrílico")) return "Pinturas";
    return "Dibujos";
  };
  const categorias = ["Todas", "Pinturas", "Esculturas", "Dibujos"];

  const miObras = OBRAS.filter(o => coleccion.includes(o.id));
  let displayObras = tab === "coleccion" ? miObras : OBRAS;

  if (tecnicaFilter !== "Todas") {
    displayObras = displayObras.filter(o => getCat(o.tecnica) === tecnicaFilter);
  }

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ flexShrink:0, paddingTop:14, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", backgroundColor:T.bgGlass, borderBottom:`1px solid ${T.borderSubtle}` }}>
        <div style={{ padding:"0 20px" }}>
          <p style={{ fontFamily:T.fontUI, fontSize:10, letterSpacing:"0.2em", color:T.textDisabled, textTransform:"uppercase", marginBottom:2 }}>Museo Botero</p>
          <h2 style={{ fontFamily:T.fontDisplay, fontSize:24, fontWeight:400, color:T.textPrimary, marginBottom:16 }}>
            {tab === "coleccion" ? "Tu Colección" : tab === "listas" ? "Tus Listas" : "Las Obras"}
          </h2>
        </div>
        
        {/* Tabs: Mi Coleccion / Listas / Todas */}
        <div style={{ display:"flex", gap:0, padding:"0 20px" }}>
          {[{id:"coleccion",label:`Guardadas (${miObras.length})`},{id:"listas",label:"Listas"},{id:"todas",label:"Catálogo"}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{ flex:1, height:36, background:"none", border:"none", borderBottom:`2px solid ${tab===t.id?T.brandPrimary:"transparent"}`, cursor:"pointer", fontFamily:T.fontUI, fontSize:12, fontWeight:500, color:tab===t.id?T.textPrimary:T.textDisabled, transition:"all 0.2s ease", paddingBottom:2 }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Filtro por Técnica (Pills Slider) - Sólo visible si no estamos en listas */}
        {tab !== "listas" && (
          <div style={{ display:"flex", overflowX:"auto", gap:8, padding:"16px 20px", msOverflowStyle:"none", scrollbarWidth:"none" }}>
            {categorias.map(c => {
              const isActive = tecnicaFilter === c;
              return (
                <button key={c} onClick={()=>setTecnicaFilter(c)}
                  style={{ flexShrink:0, padding:"8px 16px", borderRadius:40, backgroundColor: isActive ? T.brandPrimary : "rgba(255,255,255,0.05)", border:`1px solid ${isActive ? T.brandPrimary : T.borderSubtle}`, color: isActive ? "white" : T.textSecondary, fontFamily:T.fontUI, fontSize:13, fontWeight:isActive ? 600 : 400, cursor:"pointer", transition:"all 0.2s ease" }}>
                  {c}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Grid / Listas */}
      <div style={{ flex:1, overflowY:"auto", padding:16 }}>
        {tab === "listas" ? (
          <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeIn 0.4s ease" }}>
            <button onClick={() => alert("¡Próximamente! Podrás crear listas como: 'Esculturas para ver', 'Mis óleos favoritos', etc.")} style={{ padding:"20px", borderRadius:16, backgroundColor:"rgba(255,255,255,0.03)", border:`1px dashed ${T.borderSubtle}`, color:T.textPrimary, fontFamily:T.fontUI, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, transition:"background 0.2s ease" }} className="card-tap">
              <div style={{ width:24, height:24, borderRadius:12, backgroundColor:T.bgCardRaised, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
              <span style={{ fontWeight:500 }}>Crear lista de favoritos</span>
            </button>
            <div style={{ padding:"40px 20px", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={T.textDisabled} strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
              <p style={{ fontFamily:T.fontUI, fontSize:13, color:T.textDisabled }}>No tienes listas personalizadas aún</p>
            </div>
          </div>
        ) : displayObras.length === 0 ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:12 }}>
            <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={T.textDisabled} strokeWidth="1" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <p style={{ fontFamily:T.fontDisplay, fontSize:16, color:T.textSecondary, fontWeight:400 }}>No se encontraron obras</p>
            {tab === "coleccion" && <p style={{ fontFamily:T.fontUI, fontSize:12, color:T.textDisabled, textAlign:"center" }}>Guarda algunas obras mientras exploras el museo.</p>}
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(150px, 1fr))", gap:12 }}>
            {displayObras.map((obra, idx) => {
              const cat = getCat(obra.tecnica);
              const isEscultura = cat === "Esculturas";
              // Bento Logic: make some prominent works larger. E.g. Mona Lisa or Hombre a caballo.
              const isFeatured = (obra.id === "01" || obra.id === "08") && idx === 0;

              return (
                <button key={obra.id} onClick={()=>onDetalleObra(obra.id)}
                  className="card-tap"
                  style={{ display:"flex", flexDirection:"column", backgroundColor:T.bgCard, border:`1px solid ${coleccion.includes(obra.id)?"rgba(211,47,47,0.3)":T.borderSubtle}`, borderRadius:16, overflow:"hidden", cursor:"pointer", textAlign:"left", gridColumn: isFeatured ? "1 / -1" : "auto", boxShadow:"0 4px 12px rgba(0,0,0,0.2)" }}>
                  
                  {/* Visor de Obra (Thumbnail) */}
                  <div style={{ height: isFeatured ? 180 : 120, backgroundColor: isEscultura ? "#12100E" : "rgba(200,130,50,0.06)", display:"flex", alignItems:"center", justifyContent:"center", borderBottom:`1px solid ${T.borderSubtle}`, position:"relative", overflow:"hidden" }}>
                    {isEscultura && <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at center, rgba(200,150,80,0.1) 0%, transparent 70%)" }}/>}
                    {obra.img ? (
                      <img src={obra.img} alt={obra.titulo} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", opacity:0.9 }}/>
                    ) : (
                      <svg aria-hidden="true" width={isFeatured?40:28} height={isFeatured?40:28} viewBox="0 0 24 24" fill="none" stroke={isEscultura ? "rgba(255,255,255,0.15)" : "rgba(200,130,50,0.25)"} strokeWidth="1" strokeLinecap="round">
                        {isEscultura ? <path d="M12 2L2 22h20L12 2z"/> : <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>}
                      </svg>
                    )}
                    
                    {/* Tags en imagen - Funcionalidad Quitar Favorito */}
                    {coleccion.includes(obra.id) && (
                      <button onClick={(e) => { e.stopPropagation(); onToggleColeccion(obra.id); }} style={{ position:"absolute", top:8, right:8, width:28, height:28, borderRadius:"50%", backgroundColor:"rgba(211,47,47,0.8)", border:"1px solid rgba(255,255,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(4px)", cursor:"pointer", zIndex:2 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      </button>
                    )}
                    {obra.id === "01" && (
                      <div style={{ position:"absolute", bottom:8, right:8, padding:"2px 6px", borderRadius:4, backgroundColor:"rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", gap:4 }}>
                        <div style={{ width:6, height:6, borderRadius:"50%", backgroundColor:"#27AE60", boxShadow:"0 0 4px #27AE60" }}/>
                        <span style={{ fontSize:9, color:"white", fontFamily:T.fontMono, fontWeight:600 }}>AR</span>
                      </div>
                    )}
                  </div>

                  {/* Metadatos */}
                  <div style={{ padding:"12px", display:"flex", flexDirection:"column", flex:1 }}>
                    <h3 style={{ fontFamily:T.fontDisplay, fontSize: isFeatured ? 16 : 14, color:T.textPrimary, marginBottom:4, lineHeight:"130%", flex:1 }}>{obra.titulo}</h3>
                    <p style={{ fontFamily:T.fontUI, fontSize:11, color:T.textSecondary, marginBottom:4 }}>{obra.tecnica}</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"auto" }}>
                      <p style={{ fontFamily:T.fontUI, fontSize:10, color:T.textDisabled }}>{obra.sala}</p>
                      <p style={{ fontFamily:T.fontMono, fontSize:10, color:T.textDisabled }}>{obra.año}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
        {tab==="todas" && displayObras.length > 0 && (
          <p style={{ fontFamily:T.fontUI, fontSize:11, color:T.textDisabled, textAlign:"center", marginTop:24, marginBottom:24, letterSpacing:"0.04em" }}>Fin de la colección actual</p>
        )}
      </div>
    </div>
  );
}

function PlaceholderScreen({ label }) {
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12 }}>
      <div style={{ width:48, height:48, borderRadius:14, backgroundColor:T.bgCardRaised, border:`1px solid ${T.borderSubtle}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.textDisabled} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
      </div>
      <p style={{ fontFamily:T.fontDisplay, fontSize:18, color:T.textSecondary, fontWeight:400 }}>{label}</p>
      <p style={{ fontFamily:T.fontUI, fontSize:12, color:T.textDisabled }}>Próximamente</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PASE MODAL (TICKET VIP)
═══════════════════════════════════════════════════════ */
function PaseModal({ onClose }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div role="dialog" aria-modal="true" aria-label="Tu Pase Digital"
      style={{ position:"absolute", inset:0, zIndex:200, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      {/* Backdrop */}
      <div onClick={onClose}
        style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", animation:"fadeIn 0.3s ease both" }}/>

      {/* Ticket Modal */}
      <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", paddingBottom:40, animation:"fadeSlideUp 0.4s cubic-bezier(0.2,0.8,0.2,1) both" }}>
        
        {/* Close Button */}
        <button onClick={onClose} style={{ width:40, height:40, borderRadius:"50%", backgroundColor:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, cursor:"pointer", color:"white" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* The Ticket Card */}
        <div style={{ width:320, backgroundColor:"#F5F2ED", borderRadius:24, overflow:"hidden", boxShadow:"0 20px 50px rgba(0,0,0,0.5)", position:"relative" }}>
          
          {/* Top Section */}
          <div style={{ padding:"32px 24px 24px", display:"flex", flexDirection:"column", alignItems:"center", borderBottom:"2px dashed rgba(0,0,0,0.15)", position:"relative" }}>
            <h2 style={{ fontFamily:T.fontDisplay, fontSize:22, fontWeight:400, color:"#1A1A1A", letterSpacing:"0.15em", textTransform:"uppercase", margin:0 }}>Botero</h2>
            <p style={{ fontFamily:T.fontUI, fontSize:10, color:"#666", letterSpacing:"0.1em", marginTop:4, textTransform:"uppercase" }}>Museo del Banco de la República</p>
            
            <div style={{ marginTop:24, width:180, height:180, backgroundColor:"white", borderRadius:16, padding:14, boxShadow:"inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
              {/* Fake QR using SVG paths */}
              <svg viewBox="0 0 100 100" width="100%" height="100%" fill="#1A1A1A">
                <rect x="5" y="5" width="25" height="25" fill="none" stroke="#1A1A1A" strokeWidth="3"/>
                <rect x="10" y="10" width="15" height="15"/>
                <rect x="70" y="5" width="25" height="25" fill="none" stroke="#1A1A1A" strokeWidth="3"/>
                <rect x="75" y="10" width="15" height="15"/>
                <rect x="5" y="70" width="25" height="25" fill="none" stroke="#1A1A1A" strokeWidth="3"/>
                <rect x="10" y="75" width="15" height="15"/>
                <rect x="40" y="5" width="10" height="10"/><rect x="55" y="5" width="10" height="10"/><rect x="40" y="20" width="25" height="10"/><rect x="70" y="40" width="10" height="25"/><rect x="85" y="40" width="10" height="10"/><rect x="5" y="40" width="25" height="10"/><rect x="5" y="55" width="10" height="10"/><rect x="20" y="55" width="10" height="10"/><rect x="40" y="40" width="20" height="20"/><rect x="40" y="70" width="10" height="25"/><rect x="55" y="70" width="10" height="10"/><rect x="55" y="85" width="20" height="10"/><rect x="70" y="70" width="25" height="10"/><rect x="85" y="85" width="10" height="10"/>
              </svg>
            </div>
            
            <p style={{ fontFamily:T.fontUI, fontSize:11, color:"#888", marginTop:16, fontWeight:500 }} className={loaded ? "pulse-text" : ""}>Sube el brillo de tu pantalla</p>
            
            {/* Cutout circles for the perforated effect */}
            <div style={{ position:"absolute", bottom:-12, left:-12, width:24, height:24, borderRadius:"50%", backgroundColor:"rgba(20,15,12,0.95)", boxShadow:"inset -2px 0 5px rgba(0,0,0,0.1)" }}/>
            <div style={{ position:"absolute", bottom:-12, right:-12, width:24, height:24, borderRadius:"50%", backgroundColor:"rgba(20,15,12,0.95)", boxShadow:"inset 2px 0 5px rgba(0,0,0,0.1)" }}/>
          </div>

          {/* Bottom Section */}
          <div style={{ padding:"24px", backgroundColor:"white" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
              <div>
                <p style={{ fontFamily:T.fontUI, fontSize:10, color:"#888", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em" }}>Visitante</p>
                <p style={{ fontFamily:T.fontUI, fontSize:15, color:"#1A1A1A", fontWeight:600 }}>Iván</p>
              </div>
              <div style={{ textAlign:"right" }}>
                <p style={{ fontFamily:T.fontUI, fontSize:10, color:"#888", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em" }}>Acceso</p>
                <p style={{ fontFamily:T.fontUI, fontSize:15, color:T.brandPrimary, fontWeight:600 }}>Gratuito</p>
              </div>
            </div>
            <div>
              <p style={{ fontFamily:T.fontUI, fontSize:10, color:"#888", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em" }}>Puerta</p>
              <p style={{ fontFamily:T.fontUI, fontSize:15, color:"#1A1A1A", fontWeight:600 }}>Entrada Principal, Calle 11</p>
            </div>
          </div>
        </div>

        {/* Add to Wallet Button */}
        <button style={{ marginTop:24, width:200, height:44, borderRadius:22, backgroundColor:"rgba(0,0,0,0.4)", border:"1px solid rgba(255,255,255,0.15)", backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)", padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"center", gap:8, cursor:"pointer" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.3 14h-6.6a1.5 1.5 0 0 1-1.5-1.5V9.5A1.5 1.5 0 0 1 8.7 8h6.6A1.5 1.5 0 0 1 16.8 9.5v5a1.5 1.5 0 0 1-1.5 1.5z"/>
          </svg>
          <span style={{ fontFamily:T.fontUI, fontSize:13, fontWeight:500, color:"white" }}>Añadir a Wallet</span>
        </button>

        {/* Rules Icons */}
        <div style={{ display:"flex", gap:24, marginTop:24 }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
            <div style={{ width:40, height:40, borderRadius:"50%", backgroundColor:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {/* Flash Off SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16 16 21M16 16l5 5M12 18H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h4l2 3h3a2 2 0 0 1 2 2v3"/><circle cx="12" cy="13" r="3"/></svg>
            </div>
            <span style={{ fontFamily:T.fontUI, fontSize:10, color:"rgba(255,255,255,0.6)" }}>Sin Flash</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
            <div style={{ width:40, height:40, borderRadius:"50%", backgroundColor:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {/* Backpack Off / Lock SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.86 5.16A2 2 0 0 1 12 5h0a2 2 0 0 1 2 2v1"/><path d="M19.46 14.54A2.08 2.08 0 0 0 20 13V9a2 2 0 0 0-2-2h-1M5.5 5.5 4 9v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9"/><path d="M22 22 2 2M16 22H8a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h8"/><path d="m14 18-2-2m2 0-2 2"/></svg>
            </div>
            <span style={{ fontFamily:T.fontUI, fontSize:10, color:"rgba(255,255,255,0.6)" }}>Sin mochilas</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
            <div style={{ width:40, height:40, borderRadius:"50%", backgroundColor:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {/* Low Volume SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/></svg>
            </div>
            <span style={{ fontFamily:T.fontUI, fontSize:10, color:"rgba(255,255,255,0.6)" }}>Tono bajo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VoiceSearchOverlay({ onClose, onSearch }) {
  const [phase, setPhase] = useState("idle");
  useEffect(() => {
    setPhase("listening");
    const t1 = setTimeout(() => setPhase("processing"), 3000);
    const t2 = setTimeout(() => {
      onSearch(OBRAS[0]); // mock finding first obra
    }, 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onSearch]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Búsqueda por voz"
      style={{ position:"absolute", inset:0, zIndex:100, backgroundColor:"rgba(0,0,0,0.85)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", animation:"fadeSlideUp 0.35s cubic-bezier(.22,.68,0,1.1) both" }}>
      
      <button onClick={onClose} aria-label="Cancelar búsqueda"
        style={{ position:"absolute", top:"max(16px, env(safe-area-inset-top, 16px))", left:16, width:40, height:40, borderRadius:12, backgroundColor:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"white", zIndex:2 }}>
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <h2 style={{ fontFamily:T.fontDisplay, fontSize:24, color:"white", marginBottom:8, transition:"opacity 0.3s ease" }}>
        {phase === "listening" ? "Habla ahora..." : phase === "processing" ? "Procesando..." : ""}
      </h2>
      <p style={{ fontFamily:T.fontUI, fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:60, opacity: phase==="listening"?1:0, transition:"opacity 0.3s ease" }}>
        Prueba decir "Muéstrame la Mano de Botero"
      </p>

      <div style={{ position:"relative", width:160, height:160, display:"flex", alignItems:"center", justifyContent:"center" }}>
        {(phase === "listening" || phase === "processing") && (
          <>
            <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:"2px solid #D32F2F", opacity:0.6, animation:"breathe 1.5s ease-out infinite" }}/>
            <div style={{ position:"absolute", inset:-30, borderRadius:"50%", border:"1px solid #D32F2F", opacity:0.3, animation:"breathe2 1.5s ease-out infinite 0.3s" }}/>
            <div style={{ position:"absolute", inset:-60, borderRadius:"50%", border:"1px solid #D32F2F", opacity:0.1, animation:"breathe2 1.5s ease-out infinite 0.6s" }}/>
          </>
        )}
        
        <div style={{ width:100, height:100, borderRadius:"50%", backgroundColor:"#D32F2F", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 32px rgba(211,47,47,0.4)", zIndex:2, transition:"transform 0.2s ease", transform: phase === "processing" ? "scale(0.95)" : "scale(1)" }}>
          {phase === "processing" ? (
            <svg aria-hidden="true" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" style={{ animation:"spin 1s linear infinite" }}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
          ) : (
            <svg aria-hidden="true" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/><line x1="8" x2="16" y1="22" y2="22"/>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

function GlobalScanOverlay({ onClose, onSuccess }) {
  const [phase, setPhase] = useState("idle"); // idle -> scanning -> detected -> mapping -> ar_active
  const [targetObra, setTargetObra] = useState(null);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const startScan = () => {
    setPhase("scanning");
    setTimeout(() => {
      const baseObra = OBRAS[1]; // default to Mona Lisa
      const obraWithAR = {
        ...baseObra,
        img: "/monalisa.jpg", // Mona Lisa, Age 12 by Fernando Botero
        hotspots: [
          { id: 1, x: 45, y: 30, title: "Proporciones Desfasadas", text: "La cabeza hipertrofiada reduce el torso a un bloque, subvirtiendo la simetría original." },
          { id: 2, x: 62, y: 55, title: "Manos Diminutas", text: "El rasgo más distintivo del volumen de Botero: extremidades ínfimas para exagerar monumentalmente el cuerpo." },
          { id: 3, x: 35, y: 22, title: "Paisaje Volcánico", text: "El fondo humeante inspirado en los Andes colombianos reemplaza el paisaje italiano original." }
        ]
      };
      setTargetObra(obraWithAR);
      setPhase("detected");
    }, 2000);
  };

  useEffect(() => {
    if (phase === "detected") {
      const t = setTimeout(() => setPhase("mapping"), 1200);
      return () => clearTimeout(t);
    }
    if (phase === "mapping") {
      const t = setTimeout(() => setPhase("ar_active"), 1000); // Malla animada por 1 seg
      return () => clearTimeout(t);
    }
  }, [phase]);

  const isAR = phase === "ar_active" || phase === "mapping";

  return (
    <div role="main" aria-label="Escaneando obra"
      style={{ position:"absolute", inset:0, zIndex:100, backgroundColor:"#050302", display:"flex", flexDirection:"column", animation:"fadeSlideUp 0.35s cubic-bezier(.22,.68,0,1.1) both" }}>
      <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
        
        {/* FONDO BASE DEL ESCÁNER (solo antes del AR) */}
        {!isAR && (
          <>
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center,#1A1812 0%,#030201 100%)" }}/>
            <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)" }}/>
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(200,130,50,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(200,130,50,0.06) 1px,transparent 1px)", backgroundSize:"32px 32px" }}/>
          </>
        )}

        {/* FONDO MODO AR (Pintura reconocida ocupando la cámara) */}
        {isAR && targetObra && (
          <div style={{ position:"absolute", inset:0, animation:"fadeIn 0.5s ease both" }}>
            <img src={targetObra.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", filter: phase === "mapping" ? "brightness(0.6) sepia(0.3) hue-rotate(-20deg)" : "brightness(0.85)" }}/>
            
            {/* Overlay Malla (fase mapping) */}
            {phase === "mapping" && (
              <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(39,174,96,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(39,174,96,0.3) 1px,transparent 1px)", backgroundSize:"40px 40px", animation:"pulse 0.4s infinite alternate, scan-line 1.2s ease-in-out infinite" }}/>
            )}
            
            {/* Capa de Hotspots */}
            {phase === "ar_active" && targetObra.hotspots.map((hs, i) => (
              <div key={hs.id} style={{ position:"absolute", top:`${hs.y}%`, left:`${hs.x}%`, transform:"translate(-50%,-50%)", zIndex:10 }}>
                <button onClick={() => setActiveHotspot(hs)} aria-label={`Ver detalle: ${hs.title}`} style={{ width:44, height:44, borderRadius:"50%", backgroundColor:"rgba(20,15,12,0.5)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", border:`1px solid ${activeHotspot?.id === hs.id ? T.brandPrimary : "rgba(255,255,255,0.3)"}`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow: activeHotspot?.id === hs.id ? `0 0 20px ${T.brandPrimary}80` : "0 4px 12px rgba(0,0,0,0.4)", animation:`bounceIn 0.4s ${i*0.15}s both`, cursor:"pointer", position:"relative", transition:"all 0.3s ease" }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", backgroundColor:T.brandPrimary, boxShadow:`0 0 12px 2px ${T.brandPrimary}`, transition:"transform 0.3s ease", transform: activeHotspot?.id === hs.id ? "scale(1.4)" : "scale(1)" }}/>
                  {activeHotspot?.id !== hs.id && (
                    <div style={{ position:"absolute", inset:-6, borderRadius:"50%", border:`1px solid ${T.brandPrimary}80`, animation:"breathe2 2s infinite ease-out" }}/>
                  )}
                </button>
              </div>
            ))}

            {/* Tarjeta de Información Glassmorphism (cuando tocas un pin) */}
            {phase === "ar_active" && activeHotspot && (
              <div style={{ position:"absolute", bottom:110, left:20, right:20, backgroundColor:"rgba(12,10,9,0.55)", backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderRadius:24, border:`1px solid rgba(255,255,255,0.12)`, borderTop:`1px solid rgba(255,255,255,0.25)`, padding:"24px 24px 28px", animation:"fadeSlideUp 0.3s cubic-bezier(.22,.68,0,1.1) both", zIndex:20, boxShadow:"0 16px 40px rgba(0,0,0,0.5)" }}>
                <button onClick={() => setActiveHotspot(null)} style={{ position:"absolute", top:16, right:16, background:"none", border:"none", color:"rgba(255,255,255,0.6)", cursor:"pointer", padding:4 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div style={{ marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:4, height:18, borderRadius:2, backgroundColor:T.brandPrimary }} />
                  <h4 style={{ fontFamily:T.fontDisplay, fontSize:22, color:"white", margin:0, paddingRight:24 }}>{activeHotspot.title}</h4>
                </div>
                <p style={{ fontFamily:T.fontUI, fontSize:15, color:"rgba(255,255,255,0.85)", lineHeight:1.6, margin:0 }}>{activeHotspot.text}</p>
              </div>
            )}
          </div>
        )}

        {/* UI DEL VISOR RETÍCULA (sólo antes del AR) */}
        {!isAR && (
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", paddingBottom:"15vh" }}>
            <div style={{ width:260, height:260, position:"relative" }}>
              <div style={{ position:"absolute", inset:0, boxShadow:"0 0 0 9999px rgba(0,0,0,0.5)", borderRadius:16 }}/>
              {[{t:0,l:0,bt:"none",bb:"none"},{t:0,r:0,bl:"none",bb:"none"},{b:0,l:0,bt:"none",br:"none"},{b:0,r:0,bt:"none",bl:"none"}].map((c,i)=>(
                <div key={i} style={{ position:"absolute", width:32, height:32, ...Object.fromEntries(Object.entries(c).map(([k,v])=>[k==="t"?"top":k==="b"?"bottom":k==="l"?"left":k==="r"?"right":k,v===0?"0":v])), borderTop:c.bt!=="none"?`3px solid ${phase==="detected"?"#27AE60":"#fff"}`:"none", borderBottom:c.bb!=="none"?`3px solid ${phase==="detected"?"#27AE60":"#fff"}`:"none", borderLeft:c.bl!=="none"?`3px solid ${phase==="detected"?"#27AE60":"#fff"}`:"none", borderRight:c.br!=="none"?`3px solid ${phase==="detected"?"#27AE60":"#fff"}`:"none", transition:"border-color 0.4s ease", borderTopLeftRadius: i===0?16:0, borderTopRightRadius: i===1?16:0, borderBottomLeftRadius: i===2?16:0, borderBottomRightRadius: i===3?16:0, zIndex:2 }}/>
              ))}
              {phase==="scanning" && (
                <div style={{ position:"absolute", left:6, right:6, height:2, backgroundColor:T.brandPrimary, opacity:0.8, animation:"scan-line 2s ease-in-out infinite", boxShadow:`0 0 12px ${T.brandPrimary}`, zIndex:2, borderRadius:2 }}/>
              )}
              {phase==="detected" && (
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
                  <div style={{ width:64, height:64, borderRadius:"50%", backgroundColor:"rgba(39,174,96,0.2)", border:"2px solid #27AE60", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(4px)" }}>
                    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MENSAJES DE ESTADO TOP */}
        <div style={{ position:"absolute", top:"20%", left:0, right:0, textAlign:"center", zIndex:12 }}>
          {phase === "ar_active" && !activeHotspot && (
            <div style={{ display:"inline-block", backgroundColor:"rgba(0,0,0,0.6)", padding:"8px 16px", borderRadius:20, backdropFilter:"blur(12px)", animation:"fadeIn 0.5s 0.2s both" }}>
              <p style={{ fontFamily:T.fontUI, fontSize:14, color:"white", letterSpacing:"0.02em", margin:0 }}>
                Toca los puntos para explorar la obra
              </p>
            </div>
          )}
          {!isAR && (
            <p style={{ fontFamily:T.fontUI, fontSize:14, color: phase==="detected" ? "#27AE60" : "white", fontWeight:500, letterSpacing:"0.02em", transition:"color 0.4s ease", textShadow:"0 2px 4px rgba(0,0,0,0.5)" }}>
              {phase==="idle" ? "Encuadra el código o la obra" : phase==="scanning" ? "Buscando coincidencias..." : `¡${targetObra?.titulo} reconocida!`}
            </p>
          )}
        </div>

        {/* ZONA INFERIOR / BOTONES */}
        {!isAR && (
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"25vh", background:"linear-gradient(to top, rgba(0,0,0,0.9), transparent)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", paddingBottom:40, zIndex:2 }}>
            {phase === "idle" && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
                <button onClick={startScan} aria-label="Escanear ahora" className="card-tap"
                  style={{ width:80, height:80, borderRadius:"50%", backgroundColor:"#D32F2F", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow:"0 6px 20px rgba(211,47,47,0.3)" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h6v6h-6z"/><path d="M14 20h.01"/><path d="M20 14h.01"/><path d="M20 20h.01"/><path d="M14 17h.01"/><path d="M17 14h.01"/><path d="M17 17h.01"/><path d="M20 17h.01"/><path d="M17 20h.01"/>
                  </svg>
                </button>
                <p style={{ fontFamily:T.fontUI, fontSize:13, color:"white", letterSpacing:"0.05em" }}>Escanear</p>
              </div>
            )}
            {phase === "scanning" && (
              <div style={{ height:80, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <p style={{ fontFamily:T.fontUI, color:"white", opacity:0.7, fontSize:12 }}>Analizando el encuadre...</p>
              </div>
            )}
          </div>
        )}

        {phase === "ar_active" && (
           <div style={{ position:"absolute", bottom:40, left:0, right:0, display:"flex", justifyContent:"center", zIndex:15, animation:"fadeIn 0.6s 0.3s both" }}>
             <button onClick={() => onSuccess(targetObra)} style={{ backgroundColor:T.brandPrimary, padding:"14px 28px", borderRadius:30, display:"flex", alignItems:"center", gap:10, cursor:"pointer", border:"none", boxShadow:`0 6px 20px ${T.brandPrimary}60, 0 2px 4px rgba(0,0,0,0.2)` }}>
               <span style={{ fontFamily:T.fontUI, fontSize:15, fontWeight:600, color:"white", letterSpacing:"0.02em" }}>Ver Ficha Completa</span>
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
             </button>
           </div>
        )}

        {/* NAVEGACIÓN GLOBAL ESCÁNER */}
        <button onClick={onClose} aria-label="Cerrar escáner"
          style={{ position:"absolute", top:"max(16px, env(safe-area-inset-top, 16px))", left:16, width:40, height:40, borderRadius:12, backgroundColor: phase==="ar_active" ? "rgba(12,10,9,0.5)" : "rgba(0,0,0,0.5)", backdropFilter:"blur(12px)", border:`1px solid rgba(255,255,255,0.2)`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", zIndex:30, color:"white" }}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {!isAR && (
          <div style={{ position:"absolute", top:"max(16px, env(safe-area-inset-top, 16px))", right:16, zIndex:30 }}>
            <button style={{ width:40, height:40, borderRadius:12, backgroundColor:"rgba(0,0,0,0.5)", border:`1px solid rgba(255,255,255,0.2)`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"white" }}>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════ */
export default function App() {
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [activeTab, setActiveTab]       = useState("home");
  const [showNumpad, setShowNumpad]     = useState(false);
  const [showPase, setShowPase]         = useState(false);
  const [isListening, setIsListening]   = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [toast, setToast]               = useState({ visible:false, message:{}, type:"" });
  // Flow 2 state
  const [coleccion, setColeccion] = useState([]);
  const [detalleId, setDetalleId]  = useState(null);
  const [showIA, setShowIA]        = useState(false);
  const [showNLP, setShowNLP]      = useState(false);
  const [showGuia, setShowGuia]    = useState(false);
  const [iaMode, setIaMode]        = useState("online");

  const toggleColeccion = (obraId) => {
    setColeccion(c => c.includes(obraId) ? c.filter(id => id !== obraId) : [...c, obraId]);
  };
  const isSaved = (obraId) => coleccion.includes(obraId);

  const openDetalle = (obraId) => { setDetalleId(obraId); setShowIA(false); setShowNLP(false); setShowGuia(false); };
  const closeDetalle = () => { setDetalleId(null); setShowIA(false); setShowNLP(false); setShowGuia(false); };

  const showToast = (message, type, duration=3200) => {
    setToast({ visible:true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible:false })), duration);
  };

  const handleMic = () => {
    if (networkError) {
      showToast({ title:"Sin conexión detectada", body:"Usando guías de audio pre-descargadas." }, "offline");
    } else {
      setShowVoiceSearch(true);
    }
  };

  const handleFind = (obra) => {
    setShowNumpad(false);
    openDetalle(obra.id);
  };

  const renderScreen = () => {
    switch(activeTab) {
      case "home": return (
        <HomeScreen
          onNavigate={setActiveTab}
          onNumpad={() => setShowNumpad(true)}
          onMic={handleMic}
          isListening={isListening}
          networkError={networkError}
          onQR={() => setShowPase(true)}
        />
      );
      case "mapa":      return <MapaScreen onDetalleObra={openDetalle}/>;
      case "escanear":  return <GlobalScanOverlay onClose={() => setActiveTab("home")} onSuccess={(o) => { setActiveTab("home"); handleFind(o); }}/>;
      case "coleccion": return <ColeccionScreen coleccion={coleccion} onDetalleObra={openDetalle} onToggleColeccion={toggleColeccion}/>;
      case "perfil":    return <PlaceholderScreen label="Perfil"/>;
      default:          return null;
    }
  };

  return (
    <div style={{ width:"100vw", height:"100dvh", backgroundColor:T.bgBase,
      display:"flex", flexDirection:"column", position:"relative",
      overflow:"hidden", fontFamily:T.fontUI }}>
      <GlobalStyles/>

      {/* Screen */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minHeight:0 }}>
        {renderScreen()}
      </div>

      {/* Bottom nav */}
      <BottomNav activeTab={activeTab} onTab={setActiveTab}/>

      {/* Flow 2 overlays */}
      {detalleId && !showIA && !showNLP && !showGuia && (
        <FichaObraScreen
          obraId={detalleId}
          onClose={closeDetalle}
          onPreguntarIA={() => setShowIA(true)}
          onHome={() => { closeDetalle(); setActiveTab("home"); }}
          onSelectObra={openDetalle}
          onColeccion={() => { closeDetalle(); setActiveTab("coleccion"); }}
          isSaved={isSaved(detalleId)}
          onToggleColeccion={() => toggleColeccion(detalleId)}
        />
      )}
      {detalleId && showIA && !showNLP && !showGuia && (
        <PreguntarIASheet
          obra={OBRAS.find(o => o.id === detalleId)}
          networkError={networkError}
          onClose={() => setShowIA(false)}
          onHome={() => { closeDetalle(); setActiveTab("home"); }}
          onEnviar={(mode) => {
            setIaMode(mode); setShowIA(false);
            if (mode === "online") setShowNLP(true); else setShowGuia(true);
          }}
        />
      )}
      {detalleId && showNLP && (
        <NLPLoadingScreen
          obra={OBRAS.find(o => o.id === detalleId)}
          onDone={() => { setShowNLP(false); setShowGuia(true); }}
          onCancel={() => setShowNLP(false)}
        />
      )}
      {detalleId && showGuia && (
        <GuiaIAScreen obra={OBRAS.find(o => o.id === detalleId)} mode={iaMode} onClose={() => { closeDetalle(); setActiveTab("mapa"); }}/>
      )}

      {showNumpad && <NumpadModal onClose={() => setShowNumpad(false)} onFind={handleFind}/>}
      {showVoiceSearch && <VoiceSearchOverlay onClose={() => setShowVoiceSearch(false)} onSearch={(obra) => { setShowVoiceSearch(false); handleFind(obra); }}/>}
      {showPase && <PaseModal onClose={() => setShowPase(false)}/>}
      <Toast message={toast.message} type={toast.type} visible={toast.visible}/>
    </div>
  );
}
