import axios from "axios";
import imageCompression from "browser-image-compression";

function useImage() {
  async function compressImage(file) {
    const originalSize = file.size / 1000 / 1023;
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compress = await imageCompression(file, options);
      return compress;
    } catch (error) {
      console.log("failed to compress", error);
    }
  }

  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned-preset");
    formData.append("cloud_name", "dxigjknfu");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dxigjknfu/image/upload",
        formData
      );
      console.log(res);
      return res.data.secure_url;
    } catch (err) {
      console.error("Upload Error", err);
      return null;
    }
  }

  return {
    compressImage,
    uploadToCloudinary,
  };
}

export default useImage;
