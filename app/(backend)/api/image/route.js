import ImageKit from 'imagekit';
import { NextResponse } from 'next/server';

export const config = { api: { bodyParser: true, sizeLimit: '5mb' } };
export async function POST(req) {
  try {
    const { file, fileName } = await req.json();

    if (!file || !fileName) {
      return NextResponse.json(
        { error: 'File and filename are required' },
        { status: 400 }
      );
    }

    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });

    const response = await imagekit.upload({
      file,
      fileName,
    });
    return NextResponse.json(
      { success: true, url: response.url },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
