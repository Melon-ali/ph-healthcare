import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { ICloudinaryResponse, IFile } from "../app/interfaces/file";

cloudinary.config({
  cloud_name: "dujtjqjbj",
  api_key: "865348625566696",
  api_secret: "7UFoAeUkqrgaeu6y6SwzisbL4e8",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: IFile): Promise<ICloudinaryResponse | undefined> => {
  console.log(file);
 if (!file) throw new Error("No file provided for upload.");

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });

};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
