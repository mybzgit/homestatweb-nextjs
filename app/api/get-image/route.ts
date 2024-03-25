import { readFileSync } from "fs";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')
  try {
    if (url == "") {
      throw new Error();
    }

    const imageBuffer = readFileSync(`public/data/${url}`);

    return new Response(imageBuffer, {
        headers: {
            "Content-Type": "image/jpg"
        }
    })
  } catch (error) {
    return new Response('', {
        status: 404
    })
  }

}