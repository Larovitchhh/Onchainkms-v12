import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import TabBar from "../components/TabBar.jsx";

export default function Activities() {
  const [params] = useSearchParams();
  const user = params.get("user");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/user/${user}/activities`)
      .then((r) => r.json())
      .then(setData);
  }, []);

  return (
    <Layout title="Actividades">
      {data.map((a, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          <b style={{ fontSize: "17px" }}>{a.name}</b><br />
          <span style={{ color: "#229FD0", fontWeight: "bold" }}>
            {(a.distance / 1000).toFixed(2)} km
          </span>{" "}
          — {a.type}<br />
          Tiempo: {Math.round(a.moving_time / 60)} min<br />
          Elevación: {a.total_elevation_gain} m<br />
          <small style={{ opacity: 0.7 }}>{a.start_date_local}</small>
        </div>
      ))}

      <TabBar user={user} />
    </Layout>
  );
}
