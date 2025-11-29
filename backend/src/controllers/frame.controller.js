// /srv/onchainkms/backend/src/controllers/frame.controller.js

/**
 * Controller: handleFrame
 * Este controlador responde a POST /api/fc/frame
 * Está diseñado para no romper el servidor aunque la request sea vacía o incorrecta.
 */

export const handleFrame = async (req, res) => {
  try {
    console.log("📩 [Frame] Request recibida:");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    // Respuesta estándar básica
    const response = {
      success: true,
      message: "Frame request received successfully",
      data: req.body || {},
      timestamp: new Date().toISOString(),
    };

    return res.status(200).json(response);

  } catch (error) {
    console.error("❌ Error en handleFrame:", error);

    return res.status(500).json({
      success: false,
      error: "Internal error processing frame",
      details: error.message,
    });
  }
};
