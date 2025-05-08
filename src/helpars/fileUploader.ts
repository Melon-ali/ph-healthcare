import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

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

const uploadToCloudinary = async (file: Express.Multer.File) => {
    cloudinary.uploader.upload(
        "\projects\ph-healthcare/uploads/audio.png",
        {
          public_id: "audio",
        }
      );
}

export const fileUploader = { 
    upload 
};
