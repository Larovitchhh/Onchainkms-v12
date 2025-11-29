import { useEffect, useState } from "react";

export default function Miniapp() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function start() {
      try {
        if (!window.FarcasterMiniApp) {
          console.error("SDK NO CARGADO");
          return;
        }

        const app = new window.FarcasterMiniApp();

        const ctx = await app.init();
        console.log("Miniapp init:", ctx);

        app.ready(); // <-- ELIMINA “Ready not called”

        setReady(true);

        if (ctx?.user) setUser(ctx.user);

      } catch (err) {
        console.error("Error inicializando Miniapp:", err);
      }
    }

    start();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>OnchainKMS Miniapp</h1>

      {!ready && <p>⏳ Inicializando miniapp...</p>}

      {ready && (
        <>
          <p style={{ color: "green" }}>✔ Miniapp lista</p>
          {user ? (
            <p>Usuario FID: {user.fid}</p>
          ) : (
            <p>No hay usuario (Developer Mode)</p>
          )}
        </>
      )}
    </div>
  );
}
