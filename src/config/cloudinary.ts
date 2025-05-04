import { v2 as cloudinary } from 'cloudinary'
import { injectable } from 'inversify'

@injectable()
export class CloudinaryConfig {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  getCloudinary() {
    return cloudinary
  }
}
