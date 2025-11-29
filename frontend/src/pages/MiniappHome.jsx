import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import TabBar from "../components/TabBar.jsx";

// Warpcast sends window.FarcasterWarpcast
// We extract user.fid from there
export default function MiniappHome() {
  const [fid, setFid] = useState(null);

  useEffect(() => {
    try {
      const wc = window.FarcasterWarpcast;
      if (wc && wc.user && wc.user.fid) {
        setFid(wc.user.fid.toString());
      }
    } catch (e) {
      console.warn("Warpcast SDK no detectado aún");
    }
  }, []);

  return (
    <Layout title="OnchainKMS">
      {fid ? (
        <>
          <p style={{ fontSize: "18px", marginBottom: "10px" }}>
            👋 Bienvenido farcaster user #{fid}
          </p>

          <p style={{ fontSize: "16px" }}>
            <b>FID:</b> {fid}
          </p>

          <div
            style={{
              marginTop: "25px",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}
          >
            <Link className="btn" to={`/miniapp/profile?user=${fid}`}>
              Ver Perfil
            </Link>

            <Link className="btn" to={`/miniapp/activities?user=${fid}`}>
              Ver Actividades
            </Link>

            <Link className="btn" to={`/miniapp/ranking`}>
              Ver Ranking
            </Link>

            <a
              className="btn"
              style={{ background: "#FC5200" }}
              href="https://onchainkms.baseminiapps.com/api/strava/auth"
            >
              Conectar Strava ↗
            </a>
          </div>
        </>
      ) : (
        <>
          <p style={{ marginBottom: "20px" }}>
            Esperando autorización de Farcaster…
          </p>
        </>
      )}

      {fid && <TabBar user={fid} />}
    </Layout>
  );
}
