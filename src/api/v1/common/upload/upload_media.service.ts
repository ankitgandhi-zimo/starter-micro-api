import { DocumentType } from "@typegoose/typegoose";
import { v2 } from "cloudinary";
import { Request } from "express";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import HttpStatus from "http-status-codes";
import { User } from "../../models/user.model";
import { IServiceResult } from "../common-methods";
import { UploadAttachmentViewModel } from "./upload_viewmodel";
var AWS = require("aws-sdk");

export const remove = require("fs-extra").remove;
const cloudinary = v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
class UploadService {
  public uploadPhotoToCloudinary = async (
    req: Request,
    model: UploadAttachmentViewModel
  ): Promise<IServiceResult> => {
    let file: UploadedFile = <UploadedFile>req.files!.image;

    let user = <DocumentType<User>>req.user;
    if (!user) {
      let user = { _id: 1234 };
    }
    let uploadedUrl: any = await cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: `Pictures/${user?._id}/images`,
      }
    );

    remove(file.tempFilePath);
    if (uploadedUrl)
      return {
        status_code: HttpStatus.OK,
        data: uploadedUrl.secure_url,
      };
    else
      return {
        status_code: HttpStatus.BAD_REQUEST,
        data: {
          message:
            "An error occurred while uploading image",
          field: "image",
        },
      };
  };

  public uploadToS3 = async (
    req: Request,
    model: UploadAttachmentViewModel
  ): Promise<IServiceResult> => {
    try {
      let sampleFile: UploadedFile = <UploadedFile>(
        req.files?.image
      );

      sampleFile.name = sampleFile.name.replace(/ /g, "");
      // let filePath = path1.resolve(
      //   "public/attachments",
      //   `customer_meeting_${sampleFile.name}`
      // );

      const fileContent = fs.readFileSync(
        sampleFile.tempFilePath
      );

      const params = {
        Bucket: process.env.BUCKET_NAME ?? "",
        Key: sampleFile.name,
        Body: fileContent,
      };

      AWS.config.update({
        aws_access_key_id:
          process.env.AWS_ACCESS_KEY_ID ?? " ", // Access key ID
        aws_secret_access_key:
          process.env.AWS_SECRET_ACCESS_KEY ?? "", // Secret access key
        region: process.env.REGION, //Region
      });

      const s3 = new AWS.S3();

      let result = await s3.upload(params).promise();

      if (result)
        return {
          status_code: HttpStatus.OK,
          data: result.Location,
        };
      else
        return {
          status_code: HttpStatus.BAD_REQUEST,

          data: { message: "Unable to Upload the file" },
        };
    } catch (error) {
      return {
        status_code: HttpStatus.BAD_REQUEST,

        data: {
          message: "Unalbe to access this file",
          error: error,
        },
      };
    }
  };
}

export default new UploadService();
