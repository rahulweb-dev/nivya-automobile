"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [type, setType] = useState("general");
  const [removeBg, setRemoveBg] = useState(false);

  useEffect(() => {
    fetch("/api/upload")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setAllImages(data.data);
        }
      })
      .catch(console.error);
  }, []);

  const onFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const onUpload = async () => {
    if (!file) return alert("Select a file");

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: base64, fileName: file.name, type, removeBg }),
        });
        const data = await res.json();
        if (data.success && data.data) {
          setUploadedImage(data.data);
          setAllImages((prev) => [data.data, ...prev]);
          setFile(null);
          setPreview(null);
        } else alert("Upload failed: " + (data.error || "Unknown error"));
      } catch (err) {
        console.error(err);
        alert("Upload failed: " + err.message);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">Upload Image</h1>

        <input type="file" accept="image/*" onChange={onFileChange} />
        {preview && <img src={preview} alt="preview" className="object-cover w-40 h-40 mt-4 rounded" />}

        <div className="flex items-center gap-4 mt-2">
          <select value={type} onChange={(e) => setType(e.target.value)} className="p-1 border rounded">
            <option value="general">General</option>
            <option value="showroom">Showroom</option>
          </select>

          <label className="flex items-center gap-1 text-sm">
            <input type="checkbox" checked={removeBg} onChange={(e) => setRemoveBg(e.target.checked)} />
            Remove Background
          </label>
        </div>

        <button onClick={onUpload} className="px-4 py-2 mt-4 text-white bg-blue-600 rounded">
          Upload
        </button>

        {uploadedImage?.url && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Uploaded Image</h2>
            <img src={uploadedImage.url} alt={uploadedImage.fileName || "Uploaded"} className="max-w-full mt-2" />
            <p className="text-sm text-gray-500">Filename: {uploadedImage.fileName || "N/A"}</p>
            <p className="text-sm text-gray-500">Type: {uploadedImage.type}</p>
          </div>
        )}
      </div>

      {/* Gallery */}
      <div className="w-full max-w-3xl mt-10">
        <h2 className="mb-4 text-xl">All Images</h2>
        <div className="grid grid-cols-3 gap-4">
          {allImages
            .filter((img) => img && img.url)
            .map((img) => (
              <div key={img._id || img.url} className="p-2 bg-white border">
                <img src={img.url} alt={img.fileName || "Image"} className="object-cover w-full h-32" />
                <p className="mt-1 text-xs text-gray-600 truncate">
                  {img.fileName || "Unnamed"} ({img.type})
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
