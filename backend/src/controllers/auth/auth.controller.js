import { registerUser, loginUser, getUserProfile } from "../../services/auth/auth.service.js";

export async function register(req, res) {
  try {
    const user = await registerUser(req.body);
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const data = await loginUser(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function profile(req, res) {
  try {
    const user = await getUserProfile(req.userId);
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
