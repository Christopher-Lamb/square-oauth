// /app/api/square/oauth/start/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.SQUARE_APP_ID!;
  const redirectUri = process.env.SQUARE_REDIRECT_URI!;

  const scopes = [
    "PAYMENTS_WRITE",
    "ORDERS_WRITE",
    "ORDERS_READ",
    "ITEMS_READ",
    "MERCHANT_PROFILE_READ",
    "CUSTOMERS_READ",
    "CUSTOMERS_WRITE",
  ].join("+");
  
  const url = `https://connect.squareup.com/oauth2/authorize?client_id=${clientId}&response_type=code&scope=${scopes}&redirect_uri=${redirectUri}&state=${clientId}`;
  return NextResponse.redirect(url);
}
