const { useState, useEffect } = React;

const generations = [
  {
    id: 1,
    era: "第一代",
    title: "物理模型",
    subtitle: "实体模型",
    slogan: "用实物表示现实",
    icon: "🏛️",
    color: "#C8956C",
    accent: "#E8C4A0",
    bg: "linear-gradient(135deg, #2A1F16 0%, #3D2B1A 100%)",
    representatives: ["古代的地球仪", "军事沙盘", "服装纸样"],
    features: ["直观、可触摸", "精度有限", "无法计算"],
    period: "远古 — 至今",
    symbol: "◆",
  },
  {
    id: 2,
    era: "第二代",
    title: "数学模型",
    subtitle: "符号模型",
    slogan: "用数学语言描述现实",
    icon: "📐",
    color: "#5B8DB8",
    accent: "#8FBFE0",
    bg: "linear-gradient(135deg, #141E2A 0%, #1C2D3F 100%)",
    representatives: ["开普勒椭圆轨道模型", "牛顿万有引力定律"],
    features: ["精确、可计算", "可预测", "需要人工推导"],
    period: "17世纪 —",
    symbol: "∑",
  },
  {
    id: 3,
    era: "第三代",
    title: "计算模型",
    subtitle: "算法模型",
    slogan: "用计算机模拟现实",
    icon: "💻",
    color: "#5BA87B",
    accent: "#88D4A8",
    bg: "linear-gradient(135deg, #142018 0%, #1C3525 100%)",
    representatives: ["数值天气预报", "蒙特卡洛模拟"],
    features: ["可处理复杂系统", "大规模数据", "规则需人工设计"],
    period: "20世纪 —",
    symbol: "{}",
  },
  {
    id: 4,
    era: "第四代",
    title: "AI 模型",
    subtitle: "学习模型",
    slogan: '让机器从数据中"学会"现实',
    icon: "🤖",
    color: "#A87BDB",
    accent: "#CBA8F0",
    bg: "linear-gradient(135deg, #1C142A 0%, #2A1C40 100%)",
    representatives: ["深度学习", "ChatGPT", "AlphaGo"],
    features: ["自动发现规律", "处理高维数据", '内部机制为"黑箱"'],
    period: "21世纪 —",
    symbol: "◎",
  },
];

const PatternBg = ({ color }) => (
  <svg
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      width: "100%",
      height: "100%",
      opacity: 0.04,
      pointerEvents: "none",
    }}
    viewBox="0 0 400 300"
    preserveAspectRatio="xMaxYMid slice"
  >
    {Array.from({ length: 20 }).map((_, i) => (
      <circle
        key={i}
        cx={200 + Math.cos(i * 0.8) * (80 + i * 8)}
        cy={150 + Math.sin(i * 0.8) * (60 + i * 6)}
        r={3 + i * 2}
        fill="none"
        stroke={color}
        strokeWidth="1"
      />
    ))}
  </svg>
);

function GenCard({ gen, index, isVisible }) {
  const isLeft = index % 2 === 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        width: "100%",
        position: "relative",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0)"
          : `translateY(40px)`,
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
      }}
    >
      {/* Connector line to timeline */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          width: 50,
          height: 2,
          background: `linear-gradient(${isLeft ? "to left" : "to right"}, ${gen.color}, transparent)`,
          zIndex: 1,
        }}
      />

      {/* Timeline dot */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: gen.color,
          boxShadow: `0 0 20px ${gen.color}66, 0 0 40px ${gen.color}22`,
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#fff",
          }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          width: "calc(50% - 50px)",
          background: gen.bg,
          borderRadius: 16,
          padding: "28px 28px 24px",
          position: "relative",
          overflow: "hidden",
          border: `1px solid ${gen.color}25`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 ${gen.color}15`,
          marginLeft: isLeft ? 0 : "auto",
          marginRight: isLeft ? "auto" : 0,
        }}
      >
        <PatternBg color={gen.color} />

        {/* Era badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 32 }}>{gen.icon}</span>
          <div>
            <div
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                color: gen.color,
                textTransform: "uppercase",
                marginBottom: 2,
              }}
            >
              {gen.era}
            </div>
            <div
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 22,
                fontWeight: 800,
                color: "#F0EDE8",
                lineHeight: 1.2,
              }}
            >
              {gen.title}
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: gen.accent,
                  marginLeft: 8,
                  opacity: 0.7,
                }}
              >
                {gen.subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Slogan */}
        <div
          style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 14,
            color: gen.accent,
            marginBottom: 18,
            paddingLeft: 12,
            borderLeft: `2px solid ${gen.color}55`,
            lineHeight: 1.6,
          }}
        >
          {gen.slogan}
        </div>

        {/* Representatives */}
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#888",
              marginBottom: 8,
              textTransform: "uppercase",
            }}
          >
            代表
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {gen.representatives.map((r, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Noto Sans SC', sans-serif",
                  fontSize: 12,
                  padding: "4px 10px",
                  borderRadius: 20,
                  background: `${gen.color}18`,
                  color: gen.accent,
                  border: `1px solid ${gen.color}30`,
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <div
            style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#888",
              marginBottom: 8,
              textTransform: "uppercase",
            }}
          >
            特点
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {gen.features.map((f, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Noto Sans SC', sans-serif",
                  fontSize: 12,
                  padding: "4px 10px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.04)",
                  color: "#bbb",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Period tag */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 20,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: gen.color,
            opacity: 0.5,
            letterSpacing: 1,
          }}
        >
          {gen.period}
        </div>

        {/* Large background symbol */}
        <div
          style={{
            position: "absolute",
            bottom: -10,
            right: 10,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 80,
            color: gen.color,
            opacity: 0.04,
            fontWeight: 800,
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          {gen.symbol}
        </div>
      </div>
    </div>
  );
}

export default function ModelEvolution() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0C0A0F 0%, #111018 50%, #0C0A0F 100%)",
        padding: "48px 24px 64px",
        fontFamily: "'Noto Sans SC', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Noto+Sans+SC:wght@300;400;700&family=JetBrains+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "30%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,123,219,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          maxWidth: 700,
          margin: "0 auto 56px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.8s ease",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: 6,
            color: "#666",
            marginBottom: 16,
            textTransform: "uppercase",
          }}
        >
          The Evolution of Models
        </div>
        <h1
          style={{
            fontFamily: "'Noto Serif SC', serif",
            fontSize: 36,
            fontWeight: 900,
            color: "#F0EDE8",
            margin: "0 0 12px",
            lineHeight: 1.3,
            letterSpacing: 2,
          }}
        >
          模型的四代进化历程
        </h1>
        <p
          style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 14,
            color: "#777",
            margin: 0,
            lineHeight: 1.8,
          }}
        >
          从可触摸的实体到不可见的智能，人类建模方式的四次跃迁
        </p>

        {/* Decorative line */}
        <div
          style={{
            width: 60,
            height: 2,
            background: "linear-gradient(90deg, transparent, #A87BDB, transparent)",
            margin: "24px auto 0",
          }}
        />
      </div>

      {/* Timeline container */}
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Central timeline line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 2,
            background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.06) 10%, rgba(255,255,255,0.06) 90%, transparent)",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        />

        {/* Arrow progress */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 2,
            background: visible
              ? "linear-gradient(180deg, #C8956C, #5B8DB8, #5BA87B, #A87BDB)"
              : "transparent",
            transform: "translateX(-50%)",
            zIndex: 2,
            opacity: 0.25,
            transition: "all 1.5s ease 0.5s",
          }}
        />

        {/* Generation cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {generations.map((gen, i) => (
            <GenCard key={gen.id} gen={gen} index={i} isVisible={visible} />
          ))}
        </div>
      </div>

      {/* Footer insight */}
      <div
        style={{
          textAlign: "center",
          maxWidth: 500,
          margin: "56px auto 0",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        <div
          style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 13,
            color: "#555",
            lineHeight: 2,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
          }}
        >
          每一代模型的出现，都标志着人类理解和改造世界能力的一次飞跃
        </div>
      </div>
    </div>
  );
}

// Render the component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ModelEvolution />);
