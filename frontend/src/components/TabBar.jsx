import { Link, useLocation } from "react-router-dom";

export default function TabBar({ user }) {
  const location = useLocation();
  const path = location.pathname;

  // Función para detectar si un botón está activo
  const active = (segment) =>
    path.includes(segment) ? "#229FD0" : "#8a8a8a";

  const activeBg = (segment) =>
    path.includes(segment) ? "rgba(34,159,208,0.15)" : "transparent";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "65px",
        background: "#fff",
        boxShadow: "0 -2px 6px rgba(0,0,0,0.15)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderTop: "1px solid #eee",
        zIndex: 20
      }}
    >
      {/* HOME */}
      <Link
        to={`/miniapp?user=${user}`}
        style={{
          textAlign: "center",
          flex: 1,
          padding: "8px 0",
          background: activeBg("miniapp"),
          borderRadius: "10px"
        }}
      >
        <div style={{ fontSize: "22px", color: active("miniapp") }}>🏠</div>
        <div style={{ fontSize: "12px", color: active("miniapp") }}>Inicio</div>
      </Link>

      {/* ACTIVIDADES */}
      <Link
        to={`/miniapp/activities?user=${user}`}
        style={{
          textAlign: "center",
          flex: 1,
          padding: "8px 0",
          background: activeBg("activities"),
          borderRadius: "10px"
        }}
      >
        <div style={{ fontSize: "22px", color: active("activities") }}>🚴</div>
        <div style={{ fontSize: "12px", color: active("activities") }}>Actividad</div>
      </Link>

      {/* RANKING */}
      <Link
        to={`/miniapp/ranking`}
        style={{
          textAlign: "center",
          flex: 1,
          padding: "8px 0",
          background: activeBg("ranking"),
          borderRadius: "10px"
        }}
      >
        <div style={{ fontSize: "22px", color: active("ranking") }}>🏅</div>
        <div style={{ fontSize: "12px", color: active("ranking") }}>Ranking</div>
      </Link>

      {/* PERFIL */}
      <Link
        to={`/miniapp/profile?user=${user}`}
        style={{
          textAlign: "center",
          flex: 1,
          padding: "8px 0",
          background: activeBg("profile"),
          borderRadius: "10px"
        }}
      >
        <div style={{ fontSize: "22px", color: active("profile") }}>👤</div>
        <div style={{ fontSize: "12px", color: active("profile") }}>Perfil</div>
      </Link>
    </div>
  );
}
