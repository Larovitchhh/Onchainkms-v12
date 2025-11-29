import * as stravaService from "../../services/strava/strava.service.js";
import {
  saveUser,
  saveActivities,
  getUser,
} from "../../services/data.service.js";

import { computeXpAndAchievements } from "../../services/achievements.service.js";

/**
 * Redirect user to Strava authorization page.
 * Requires Farcaster FID header.
 */
export function authRedirect(req, res) {
  const fid = req.headers["x-farcaster-user"];
  if (!fid) {
    return res
      .status(400)
      .json({ error: "Missing x-farcaster-user header (FID required)" });
  }

  const clientId = process.env.STRAVA_CLIENT_ID;
  const redirectUri = process.env.STRAVA_REDIRECT_URI;
  const scopes = process.env.STRAVA_SCOPES || "read,activity:read";

  if (!clientId || !redirectUri) {
    return res.status(500).json({ error: "Strava configuration missing" });
  }

  const url = stravaService.getAuthUrl({
    clientId,
    redirectUri,
    scopes,
  });

  return res.redirect(url);
}

/**
 * Callback from Strava: ?code=xxxx
 * Users now indexed by Farcaster FID, not Strava ID.
 */
export async function callback(req, res) {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).send("Missing code");

    const fid = req.headers["x-farcaster-user"];
    if (!fid) {
      return res
        .status(400)
        .json({ error: "Missing x-farcaster-user (FID) header" });
    }

    const tokenResp = await stravaService.exchangeCodeForToken({
      clientId: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      code,
      redirectUri: process.env.STRAVA_REDIRECT_URI,
    });

    const athlete = tokenResp.athlete;

    const userData = {
      fid,
      strava_id: athlete.id,
      name: athlete.firstname + " " + athlete.lastname,
      profile: athlete.profile,
      access_token: tokenResp.access_token,
      refresh_token: tokenResp.refresh_token,
      expires_at: tokenResp.expires_at,
      xp: 0,
      badges: [],
    };

    saveUser(fid, userData);

    const userActivities = await stravaService.getActivities({
      accessToken: tokenResp.access_token,
    });

    saveActivities(fid, userActivities);

    const result = computeXpAndAchievements(userActivities);
    userData.xp = result.xp;
    userData.badges = result.achievements;

    saveUser(fid, userData);

    const redirectTo =
      "https://onchainkms.baseminiapps.com/miniapp?strava_connected=1&user=" +
      fid;

    return res.redirect(redirectTo);
  } catch (err) {
    console.error("Strava callback error:", err);
    return res.status(500).send("Strava OAuth error");
  }
}

/**
 * Refresh token endpoint.
 */
export async function refreshToken(req, res) {
  try {
    const refreshToken = req.body.refresh_token;
    if (!refreshToken)
      return res.status(400).json({ error: "refresh_token required" });

    const resp = await stravaService.refreshAccessToken({
      clientId: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      refreshToken,
    });

    res.json(resp);
  } catch (err) {
    console.error("Strava refresh error:", err);
    return res.status(500).json({ error: err.message });
  }
}

/**
 * Fetch activities from Strava.
 */
export async function activities(req, res) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Missing access token" });

    const per_page = parseInt(req.query.per_page || "30", 10);
    const page = parseInt(req.query.page || "1", 10);

    const activities = await stravaService.getActivities({
      accessToken: token,
      per_page,
      page,
    });

    res.json(activities);
  } catch (err) {
    console.error("Strava activities error:", err);
    res.status(500).json({ error: err.message });
  }
}
