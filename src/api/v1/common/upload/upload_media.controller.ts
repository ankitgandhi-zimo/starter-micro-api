import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../common/common-methods";
import UploadService from "../../common/upload/upload_media.service";
import { UploadAttachmentViewModel } from "../../common/upload/upload_viewmodel";
class UploadController {
  public uploadPhotoToCloudinary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UploadAttachmentViewModel,
        req.body
      );
      if (
        !req.files ||
        !req.files.image ||
        Object.keys(req.files).length === 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: JSON.parse(
            `{"field":"image","message":"image can not be null or undefined"}`
          ),
        });
      }
      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UploadAttachmentViewModel =
          conversionResult.data as UploadAttachmentViewModel;

        let response = await UploadService.uploadPhotoToCloudinary(req, model);
        if (response && response.status_code === HttpStatus.OK)
          return res.status(HttpStatus.OK).send({
            status_code: HttpStatus.OK,
            success: true,
            data: response.data,
          });
        else
          return res.status(HttpStatus.OK).send({
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            errors: [response.data],
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public uploadToS3 = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        UploadAttachmentViewModel,
        req.body
      );
      if (
        !req.files ||
        !req.files.image ||
        Object.keys(req.files).length === 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: JSON.parse(
            `{"field":"image","message":"image can not be null or undefined"}`
          ),
        });
      }
      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UploadAttachmentViewModel =
          conversionResult.data as UploadAttachmentViewModel;

        let response = await UploadService.uploadToS3(req, model);
        if (response && response.status_code === HttpStatus.OK)
          return res.status(HttpStatus.OK).send({
            status_code: HttpStatus.OK,
            success: true,
            data: response.data,
          });
        else
          return res.status(HttpStatus.OK).send({
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            errors: [response.data],
          });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new UploadController();
