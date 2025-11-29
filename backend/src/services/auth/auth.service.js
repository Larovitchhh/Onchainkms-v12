import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const usersDB = [];  
// Luego sustituimos esto por Postgres / tu código real

export async function registerUser({ email, password }) {
  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const exists = usersDB.find(u => u.email === email);
  if (exists) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = {
    id: usersDB.length + 1,
    email,
    password: hashed
  };

  usersDB.push(user);

  return { id: user.id, email: user.email };
}

export async function loginUser({ email, password }) {
  const user = usersDB.find(u => u.email === email);
  if (!user) throw new Error("Invalid email or password");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user: { id: user.id, email: user.email } };
}

export async function getUserProfile(id) {
  const user = usersDB.find(u => u.id === id);
  if (!user) throw new Error("User not found");

  return { id: user.id, email: user.email };
}
