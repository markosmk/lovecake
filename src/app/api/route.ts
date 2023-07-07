import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const res = await axios.get(`https://docs.google.com/spreadsheets/d/e/${process.env.URL_GOO_SHEET}/pub?output=csv`, {
    responseType: 'blob',
  });
  const data = await res.data;
  return NextResponse.json({ response: data });
}
