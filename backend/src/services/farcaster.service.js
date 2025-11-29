const API_URL = "https://api.neynar.com/v2/farcaster/user";
const API_KEY = process.env.NEYNAR_API_KEY; // add to .env

/**
 * Fetch Farcaster profile by FID
 */
export async function getFarcasterProfile(fid) {
  if (!API_KEY) {
    throw new Error("Missing NEYNAR_API_KEY in environment");
  }

  const url = `${API_URL}?fid=${fid}`;

  const resp = await fetch(url, {
    headers: {
      "accept": "application/json",
      "api_key": API_KEY
    }
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error("Farcaster API error: " + text);
  }

  const data = await resp.json();

  return {
    fid: data.user.fid,
    username: data.user.username,
    displayName: data.user.display_name,
    pfp: data.user.pfp?.url,
    bio: data.user.bio?.text,
    followers: data.user.follower_count,
    following: data.user.following_count
  };
}
