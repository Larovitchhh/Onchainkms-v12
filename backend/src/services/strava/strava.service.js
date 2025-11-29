import querystring from "node:querystring";

const AUTH_URL = "https://www.strava.com/oauth/authorize";
const TOKEN_URL = "https://www.strava.com/oauth/token";
const ATHLETE_ACTIVITIES_URL = "https://www.strava.com/api/v3/athlete/activities";

export function getAuthUrl({ clientId, redirectUri, scopes = "read,activity:read" }) {
  const qs = querystring.stringify({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    approval_prompt: "auto",
    scope: scopes
  });
  return AUTH_URL + "?" + qs;
}

export async function exchangeCodeForToken({ clientId, clientSecret, code, redirectUri }) {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri
  };

  const resp = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error("Strava token exchange failed: " + resp.status + " " + text);
  }

  return await resp.json();
}

export async function refreshAccessToken({ clientId, clientSecret, refreshToken }) {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
    refresh_token: refreshToken
  };

  const resp = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error("Strava token refresh failed: " + resp.status + " " + text);
  }

  return await resp.json();
}

export async function getActivities({ accessToken, per_page = 30, page = 1 }) {
  const url = new URL(ATHLETE_ACTIVITIES_URL);
  url.searchParams.set("per_page", per_page);
  url.searchParams.set("page", page);

  const resp = await fetch(url.toString(), {
    headers: { Authorization: "Bearer " + accessToken }
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error("Strava activities request failed: " + resp.status + " " + text);
  }

  return await resp.json();
}
