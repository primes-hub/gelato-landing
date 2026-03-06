import mapImage from "figma:asset/a38911e755333fe5d3243266b51cf878b107896a.png";

const GOLD = "#c7a865";

const PINS = [
  { id: "seoul", label: "서울", left: 39, top: 30, size: "lg" },
  { id: "incheon", label: "인천", left: 32, top: 32, size: "sm" },
  { id: "suwon", label: "수원", left: 41, top: 35, size: "sm" },
  { id: "pyeongtaek", label: "", left: 40, top: 37, size: "sm" },
  { id: "daejeon", label: "대전", left: 42, top: 48, size: "md" },
  { id: "sejong", label: "", left: 44, top: 48, size: "sm" },
  { id: "cheongju", label: "", left: 47, top: 46, size: "sm" },
  { id: "cheonan", label: "", left: 41, top: 44, size: "sm" },
  { id: "chungju", label: "", left: 50, top: 43, size: "sm" },
  { id: "busan", label: "부산", left: 64, top: 68, size: "lg" },
  { id: "gwangju", label: "광주", left: 31, top: 62, size: "md" },
  { id: "jeonju", label: "전주", left: 37, top: 55, size: "sm" },
  { id: "changwon", label: "창원", left: 58, top: 71, size: "sm" },
  { id: "mokpo", label: "", left: 27, top: 69, size: "sm" },
  { id: "yeosu", label: "", left: 39, top: 71, size: "sm" },
  { id: "jinju", label: "", left: 54, top: 70, size: "sm" },
  { id: "gimhae", label: "", left: 62, top: 70, size: "sm" },
  { id: "gangneung", label: "강릉", left: 72, top: 38, size: "md" },
  { id: "chuncheon", label: "춘천", left: 52, top: 29, size: "md" },
  { id: "wonju", label: "원주", left: 56, top: 33, size: "sm" },
  { id: "sokcho", label: "", left: 70, top: 27, size: "sm" },
  { id: "donghae", label: "", left: 71, top: 45, size: "lg" },
  { id: "samcheok", label: "", left: 69, top: 47, size: "sm" },
  { id: "taebaek", label: "", left: 64, top: 44, size: "sm" },
  { id: "jeongseon", label: "", left: 62, top: 41, size: "sm" },
  { id: "yeongwol", label: "", left: 59, top: 41, size: "sm" },
  { id: "pohang", label: "포항", left: 67, top: 54, size: "sm" },
  { id: "andong", label: "", left: 60, top: 52, size: "sm" },
  { id: "ulsan", label: "울산", left: 66, top: 62, size: "sm" },
  { id: "jeju", label: "제주", left: 28, top: 87, size: "sm" },
];

const SIZES = {
  lg: { mid: 11, inner: 2.8 },
  md: { mid: 6, inner: 1.8 },
  sm: { mid: 3.5, inner: 1 },
};

const REGIONS = [
  { name: "수도권", count: "50+" },
  { name: "중부권", count: "15+" },
  { name: "남부권", count: "25+" },
  { name: "동부권", count: "10+" },
];

const REGION_LABELS = [
  { name: "수도권", x: 38, y: 25 },
  { name: "중부권", x: 42, y: 43 },
  { name: "남부권", x: 45, y: 65 },
  { name: "동부권", x: 70, y: 36 },
];

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <section className="relative overflow-hidden bg-black" style={{ minHeight: "100vh" }}>
        <style>{`
          @keyframes pulseGlow { 0%, 100% { r: 0; opacity: 0.6; } 50% { r: 9; opacity: 0; } }
          @keyframes pulseCore { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
          .glow-ring { animation: pulseGlow 3s ease-out infinite; }
          .pulse-core { animation: pulseCore 2s ease-in-out infinite; }
        `}</style>

        <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
          <div
            className="absolute top-0 bottom-0 right-0 flex items-center"
            style={{ width: "clamp(340px, 58vw, 760px)", transform: "translateX(4%)" }}
          >
            <div className="relative w-full h-full flex items-center">
              <img
                src={mapImage}
                alt="Korea Map"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  opacity: 0.32,
                  filter: "grayscale(70%) brightness(0.75)",
                }}
              />
              <svg
                className="absolute inset-0"
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                style={{ overflow: "visible" }}
              >
                {PINS.map((pin) => {
                  const sz = SIZES[pin.size as keyof typeof SIZES];
                  const rMid = sz.mid / 2;
                  const rInner = sz.inner / 2;
                  const outerOpacity = pin.size === "lg" ? 0.45 : pin.size === "md" ? 0.35 : 0.22;
                  const fillOpacity = pin.size === "lg" ? 1 : pin.size === "md" ? 0.85 : 0.6;

                  return (
                    <g key={pin.id} transform={`translate(${pin.left}, ${pin.top})`}>
                      {pin.size === "lg" && (
                        <>
                          <circle
                            className="glow-ring"
                            fill="none"
                            stroke={GOLD}
                            strokeWidth="0.5"
                            style={{ animationDelay: "0s", filter: "blur(0.3px)" }}
                          />
                          <circle
                            className="glow-ring"
                            fill="none"
                            stroke={GOLD}
                            strokeWidth="0.4"
                            style={{ animationDelay: "1s", filter: "blur(0.3px)" }}
                          />
                          <circle
                            className="glow-ring"
                            fill="none"
                            stroke={GOLD}
                            strokeWidth="0.3"
                            style={{ animationDelay: "2s", filter: "blur(0.3px)" }}
                          />
                          <circle r={rMid * 1.2} fill={GOLD} opacity="0.08" style={{ filter: "blur(1.5px)" }} />
                        </>
                      )}
                      {pin.size === "md" && <circle r={rMid * 1.2} fill={GOLD} opacity="0.04" style={{ filter: "blur(1.5px)" }} />}
                      <circle
                        r={rMid}
                        fill={pin.size === "sm" ? "rgba(199,168,101,0.06)" : "rgba(199,168,101,0.12)"}
                        stroke={GOLD}
                        strokeWidth={pin.size === "lg" ? "0.3" : "0.2"}
                        strokeOpacity={outerOpacity}
                      />
                      <circle
                        r={rInner}
                        fill={GOLD}
                        fillOpacity={fillOpacity}
                        className={pin.size === "lg" ? "pulse-core" : ""}
                        style={pin.size === "lg" ? { filter: "drop-shadow(0 0 2px rgba(199,168,101,0.8))" } : {}}
                      />
                      {pin.size === "lg" && (
                        <text
                          x={rMid + 1.5}
                          y={0.5}
                          fill="#fff"
                          fontSize="2.8"
                          fontWeight="600"
                          dominantBaseline="middle"
                          style={{ letterSpacing: "0.01em", filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.9))" }}
                        >
                          {pin.label}
                        </text>
                      )}
                    </g>
                  );
                })}
                {REGION_LABELS.map((r) => (
                  <text
                    key={r.name}
                    x={r.x}
                    y={r.y}
                    fill={GOLD}
                    fillOpacity="0.5"
                    fontSize="2.2"
                    fontWeight="600"
                    letterSpacing="0.08em"
                    textAnchor="middle"
                  >
                    {r.name}
                  </text>
                ))}
              </svg>
            </div>
          </div>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #000 18%, rgba(0,0,0,0.75) 44%, transparent 100%)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 0%, transparent 24%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-40 flex flex-col justify-between" style={{ minHeight: "100vh" }}>
          <div>
            <p
              className="mb-5"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.16em",
                color: GOLD,
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Network Expansion
            </p>
            <h2
              className="text-white mb-8"
              style={{
                fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              주요 가맹점 현황
            </h2>
            <p className="mb-16" style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "#9ca3af", maxWidth: "24rem" }}>
              전국 주요 거점을 중심으로 빠르게 확장하고 있는 파트너 네트워크입니다.
            </p>
            <div className="mb-16" style={{ width: "3rem", height: "1px", backgroundColor: GOLD, opacity: 0.4 }} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-3xl">
              {REGIONS.map((region) => (
                <div key={region.name} className="flex items-center gap-4">
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: GOLD, flexShrink: 0 }} />
                  <span
                    className="text-white"
                    style={{
                      fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      minWidth: "3.5rem",
                    }}
                  >
                    {region.name}
                  </span>
                  <span
                    className="inline-flex items-center px-3 py-1.5"
                    style={{ backgroundColor: GOLD, color: "#000", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.02em" }}
                  >
                    {region.count} 지점
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-48 md:mt-0 pt-20 md:pt-0">
            <p className="mb-6" style={{ fontSize: "0.75rem", letterSpacing: "0.12em", fontWeight: 500, color: "#6b7280" }}>
              전국 총 가맹점
            </p>
            <div className="flex items-end gap-5">
              <span
                style={{
                  fontSize: "clamp(5rem, 15vw, 9.5rem)",
                  fontWeight: 700,
                  lineHeight: 0.9,
                  letterSpacing: "-0.035em",
                  color: "#fff",
                }}
              >
                100<span style={{ color: GOLD }}>+</span>
              </span>
              <span className="mb-4" style={{ fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)", lineHeight: 1.6, color: "#9ca3af" }}>
                지점 운영중
                <br />
                <span style={{ fontSize: "0.8125rem", color: "#6b7280", letterSpacing: "0.01em" }}>2025년 3월 기준</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
