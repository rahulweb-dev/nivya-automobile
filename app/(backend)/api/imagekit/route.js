// app/api/imagekit/route.js
export async function DELETE(request) {
  try {
    const { fileId } = await request.json();

    if (!fileId) {
      return new Response(JSON.stringify({ message: "Missing fileId" }), {
        status: 400,
      });
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("Missing IMAGEKIT_PRIVATE_KEY in environment variables");
    }

    // Encode the key: "privateKey:" → base64
    const authHeader = Buffer.from(`${privateKey}:`).toString("base64");

    const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${authHeader}`,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ message: data.message || "Failed to delete image" }),
        {
          status: response.status,
        }
      );
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    console.error("Server error deleting file:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
