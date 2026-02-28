import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // cursor langsung nempel (no delay)
      setPos({ x, y });

      // bikin spark kecil
      const newSpark = {
        id: Date.now() + Math.random(),
        x,
        y,
        life: 1,
      };

      setSparks((prev) => [...prev.slice(-15), newSpark]);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // animasi fade out spark
  useEffect(() => {
    const interval = setInterval(() => {
      setSparks((prev) =>
        prev
          .map((s) => ({ ...s, life: s.life - 0.05 }))
          .filter((s) => s.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* CURSOR UTAMA */}
      <div
        style={{
          position: "fixed",
          left: pos.x - 6,
          top: pos.y - 6,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#7dd3fc", // biru muda
          pointerEvents: "none",
          zIndex: 9999,
          boxShadow: "0 0 10px #7dd3fc, 0 0 20px #38bdf8, 0 0 40px #0ea5e9",
        }}
      />

      {/* SPARK TRAIL */}
      {sparks.map((s) => (
        <div
          key={s.id}
          style={{
            position: "fixed",
            left: s.x - 3,
            top: s.y - 3,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#bae6fd",
            opacity: s.life,
            transform: `scale(${s.life})`,
            pointerEvents: "none",
            zIndex: 9998,
            boxShadow: "0 0 6px #7dd3fc, 0 0 12px #38bdf8",
          }}
        />
      ))}
    </>
  );
}