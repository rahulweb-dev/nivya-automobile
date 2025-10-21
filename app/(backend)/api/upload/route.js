import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';
import { ConnectDB } from '@/lib/config/db';
import Image from '@/lib/models/image';

// Increase payload size if needed
export const config = { api: { bodyParser: true, sizeLimit: '5mb' } };

// POST → Upload new image
export async function POST(req) {
  try {
    await ConnectDB();

    const { file, fileName, type = 'general' } = await req.json();

    if (!file || !fileName) {
      return NextResponse.json(
        { error: 'Missing file or filename' },
        { status: 400 }
      );
    }

    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });

    const uploadOptions = { file, fileName };

    const uploadResponse = await imagekit.upload(uploadOptions);

    const saved = await Image.create({
      url: uploadResponse.url,
      fileName: uploadResponse.name,
      type,
    });

    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET → Fetch all images or single by ID
export async function GET(req) {
  try {
    await ConnectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    let data;
    if (id) {
      data = await Image.findById(id);
      if (!data) {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
      }
    } else {
      data = await Image.find().sort({ createdAt: -1 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
