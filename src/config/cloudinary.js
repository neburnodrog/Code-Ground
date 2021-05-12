const cloudinary = await import('cloudinary').v2;
const { CloudinaryStorage } = await import('multer-storage-cloudinary');
const multer = await import('multer');
import process from 'process';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'iron-cream',
    allowed_formats: 'jpg, jpeg, png, gif',
  },
});

const uploader = multer({ storage });

export { uploader, cloudinary };
