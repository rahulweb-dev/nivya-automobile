// app/utils/uploadImage.js
"use client";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebaseClient";

/**
 * Uploads an image file to Firebase Storage with progress tracking.
 * Returns { uploadTask, promise } for full control.
 */
export const uploadImageWithTask = (file, onProgress) => {
  if (!file) throw new Error("No file provided");

  // Create a unique path (optional: prefix with /vehicles/)
  const storageRef = ref(storage, `vehicles/${Date.now()}-${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  const promise = new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        onProgress?.(progress);
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ url, path: storageRef.fullPath });
      }
    );
  });

  return { uploadTask, promise };
};
