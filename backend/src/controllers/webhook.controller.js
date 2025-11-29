export function webhookGet(req, res) {
  return res.status(200).json({ ok: true, message: "Webhook online" });
}

export function webhookPost(req, res) {
  console.log("Webhook event received:", req.body);
  return res.status(200).json({ received: true });
}

