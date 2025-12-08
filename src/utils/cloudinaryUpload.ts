import cloudinary from "../config/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

/**
 * Upload a file to Cloudinary as public.
 * @param filePathOrBuffer string path or Buffer
 * @param folder folder name in Cloudinary
 */
export const uploadFileToCloudinary = (
  filePathOrBuffer: string | Buffer,
  folder = "documents"
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    if (typeof filePathOrBuffer === "string") {
      // Upload via file path or URL
      cloudinary.uploader
        .upload(filePathOrBuffer, {
          folder,
          resource_type: "auto",
          type: "upload",
        })
        .then(resolve)
        .catch(reject);
    } else {
      // Upload via buffer using upload_stream
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "auto", type: "upload" },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        }
      );

      // Convert buffer to readable and pipe
      const readable = new Readable();
      readable.push(filePathOrBuffer);
      readable.push(null);
      readable.pipe(stream);
    }
  });
};
