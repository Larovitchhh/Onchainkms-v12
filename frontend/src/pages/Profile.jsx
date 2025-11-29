import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import TabBar from "../components/TabBar.jsx";

export default function Profile() {
  const [params] = useSearchParams();
  const user = params.get("user");

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/user/${user}`)
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <Layout title="Perfil">
        <p>Cargando...</p>
      </Layout>
    );
  }

  return (
    <Layout title="Perfil">
      <img
        src={data.profile}
        width="120"
        style={{
          borderRadius: "50%",
          marginBottom: "15px",
          border: "3px solid #229FD0"
        }}
      />

      <h2 style={{ marginTop: "0px" }}>{data.name}</h2>

      <p style={{ fontSize: "18px" }}>
        <b>XP total:</b> {data.xp}
      </p>

      <h3 style={{ marginTop: "25px" }}>🎖 Logros</h3>

      {(!data.badges || data.badges.length === 0) && (
        <p>No tienes logros todavía.</p>
      )}

      <ul style={{ paddingLeft: "20px" }}>
        {data.badges?.map((b, i) => (
          <li key={i} style={{ marginBottom: "5px" }}>
            {b}
          </li>
        ))}
      </ul>

      <br />
      <a href="/miniapp" className="btn">Volver</a>

      {/* 🔥 Nueva TabBar inferior con iconos */}
      <TabBar user={user} />
    </Layout>
  );
}
