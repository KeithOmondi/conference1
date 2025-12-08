// src/utils/cloudinaryUtils.ts
import cloudinary from "../config/cloudinary";

/**
 * Generate a signed URL for a private PDF or raw file
 * @param publicId - the Cloudinary path, e.g., "documents/Constitution_of_Kenya.pdf"
 * @param expireSeconds - how long the URL is valid (default: 10 minutes)
 * @returns signed URL string
 */
export const generateSignedPdfUrl = (
  publicId: string,
  expireSeconds = 600
): string => {
  return cloudinary.utils.private_download_url(
    publicId,
    "", // empty string means use original format
    {
      resource_type: "raw", // PDFs, docs, etc.
      type: "authenticated",
      expires_at: Math.floor(Date.now() / 1000) + expireSeconds,
    }
  );
};
