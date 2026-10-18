// Draws a handbag as SVG so the project needs no image files.
export default function Bag({ shape = "tote", color = "#123A2E", accent = "#B08D57", className = "" }) {
  const shade = "rgba(0,0,0,0.22)";
  const light = "rgba(255,255,255,0.14)";
  const shapes = {
    tote: (
      <>
        <path d="M70 84 C70 28 130 28 130 84" fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" />
        <path d="M40 80 H160 L172 172 Q173 182 163 182 H37 Q27 182 28 172 Z" fill={color} />
        <path d="M40 80 H160 L162 98 H38 Z" fill={shade} />
        <path d="M100 80 V182" stroke={light} strokeWidth="2" />
        <rect x="92" y="96" width="16" height="10" rx="2" fill={accent} />
      </>
    ),
    satchel: (
      <>
        <path d="M62 72 C62 34 138 34 138 72" fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" />
        <rect x="28" y="70" width="144" height="108" rx="14" fill={color} />
        <path d="M28 84 Q28 70 42 70 H158 Q172 70 172 84 V114 Q100 146 28 114 Z" fill={shade} />
        <circle cx="100" cy="126" r="8" fill={accent} />
        <circle cx="100" cy="126" r="3" fill={color} />
      </>
    ),
    clutch: (
      <>
        <rect x="18" y="88" width="164" height="84" rx="10" fill={color} />
        <path d="M18 98 Q18 88 28 88 H172 Q182 88 182 98 V112 L100 142 L18 112 Z" fill={shade} />
        <path d="M18 98 Q18 88 28 88 H172 Q182 88 182 98" fill="none" stroke={light} strokeWidth="2" />
        <circle cx="100" cy="140" r="7" fill={accent} />
      </>
    ),
    bucket: (
      <>
        <path d="M52 78 C20 20 180 20 148 78" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" />
        <path d="M44 78 H156 L146 172 Q145 182 135 182 H65 Q55 182 54 172 Z" fill={color} />
        <path d="M44 78 H156 L154 96 H46 Z" fill={shade} />
        <path d="M70 87 Q100 112 130 87" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="106" r="4" fill={accent} />
      </>
    ),
  };
  return (
    <svg className={className} viewBox="0 0 200 200" role="img" aria-label={`${shape} handbag`}>
      <ellipse cx="100" cy="188" rx="64" ry="5" fill="rgba(0,0,0,0.18)" />
      {shapes[shape]}
    </svg>
  );
}
