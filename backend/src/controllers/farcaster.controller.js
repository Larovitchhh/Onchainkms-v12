// src/controllers/farcaster.controller.js
// Controlador REAL para Farcaster Profile

export const getProfile = async (req, res) => {
  try {
    const fid = req.headers["x-farcaster-user"];

    if (!fid) {
      return res.status(400).json({ error: "Missing x-farcaster-user header" });
    }

    // Respuesta mínima correcta para Farcaster
    return res.json({
      success: true,
      profile: {
        fid,
        username: `user_${fid}`,
        displayName: "OnchainKMS User",
        avatar: "https://onchainkms.baseminiapps.com/logo.png"
      }
    });

  } catch (error) {
    console.error("❌ getProfile error:", error);
    res.status(500).json({ error: "Failed to get profile" });
  }
};
