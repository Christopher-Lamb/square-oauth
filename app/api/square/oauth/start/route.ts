// /app/api/square/oauth/start/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.SQUARE_APP_ID!;
  const redirectUri = process.env.SQUARE_REDIRECT_URI!;

  const url = `https://connect.squareup.com/oauth2/authorize?client_id=${clientId}&response_type=code&scope=PAYMENTS_WRITE+ORDERS_WRITE+MERCHANT_PROFILE_READ&redirect_uri=${redirectUri}&state=${clientId}`;
  return NextResponse.redirect(url);
}
