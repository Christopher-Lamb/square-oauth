// /app/api/square/oauth/callback/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const clientId = req.nextUrl.searchParams.get("state");
  
  if (!code || !clientId) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  // 🔁 Exchange for tokens
  const tokenRes = await fetch("https://connect.squareup.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.SQUARE_APP_ID,
      client_secret: process.env.SQUARE_APP_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.SQUARE_REDIRECT_URI,
    }),
  });

  const tokenData = await tokenRes.json();

  const { access_token, refresh_token, merchant_id, expires_at } = tokenData;

  // 🔥 Get locationId
  const locRes = await fetch("https://connect.squareup.com/v2/locations", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });

  const locData = await locRes.json();
  const locationId = locData.locations?.[0]?.id;

  // 🧠 Save to MongoDB
  const db = await getDb();

  await db.collection("clients").updateOne(
    { clientId },
    {
      $set: {
        square: {
          accessToken: access_token,
          refreshToken: refresh_token,
          merchantId: merchant_id,
          expiresAt: expires_at,
          locationId,
        },
        updatedAt: new Date(),
      },
    },
    { upsert: true }, // 🔥 creates if not exists
  );

  return NextResponse.redirect(new URL("/success", req.url));
}
