import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TabBar from "../components/TabBar.jsx";
import { useSearchParams } from "react-router-dom";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [params] = useSearchParams();
  const user = params.get("user");

  useEffect(() => {
    fetch(`/api/ranking`)
      .then(r => r.json())
      .then(list => {
        // Ordenar por XP descendente
        list.sort((a, b) => b.xp - a.xp);
        setRanking(list);
      });
  }, []);

  return (
    <Layout title="Ranking">
      <h2 style={{ marginBottom: "20px" }}>🏆 Ranking General</h2>

      {ranking.map((u, i) => (
        <div
          key={i}
          style={{
            background: "white",
            marginBottom: "15px",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          <b style={{ fontSize: "18px" }}>
            {i + 1}. {u.name}
          </b>
          <p style={{ margin: "5px 0 0 0" }}>
            <b>XP:</b> {u.xp}
          </p>
        </div>
      ))}

      {/* Ya no hace falta el botón volver gracias a la TabBar */}
      <TabBar user={user} />
    </Layout>
  );
}
