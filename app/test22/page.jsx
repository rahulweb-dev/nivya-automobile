'use client';
import React, { useState } from 'react';

export default function UploadForm() {
  const [files, setFiles] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert('Please select at least one file');
      return;
    }

    try {
      const uploadedURLs = [];

      for (let file of files) {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
        });

        const res = await fetch('/api/image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: base64, fileName: file.name }),
        });

        const data = await res.json();
        if (res.ok) uploadedURLs.push(data.url);
        else console.error('Upload failed for', file.name, data.error);
      }

      setImageURLs(uploadedURLs);
      console.log('All uploads done:', uploadedURLs);
    } catch (err) {
      console.error('Error uploading files:', err);
    }
  };

  return (
    <form className='container max-w-md mx-auto mt-30' onSubmit={handleSubmit}>
      <input
        type='file'
        multiple
        onChange={(e) => setFiles([...e.target.files])}
        className='p-2 mb-4 border rounded'
      />
      <button type='submit' className='p-2 text-white bg-blue-600 rounded'>
        Upload
      </button>

      {imageURLs.length > 0 && (
        <div className='mt-4'>
          <p>Uploaded Images:</p>
          <div className='flex flex-wrap gap-4 mt-2'>
            {imageURLs.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Uploaded ${i}`}
                className='w-32 h-auto'
              />
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
