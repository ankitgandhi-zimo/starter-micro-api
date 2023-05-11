import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, { ValidationResult } from "../../common/common-methods";
import {
  AddNewConversationInChatViewmodel,
  BlockUserInChatViewmodel,
  DeleteMessageViewmodel,
  GetConversationAfterNewMessageViewmodel,
} from "../../view-models/chat";
import conversationServices from "./conversation.service";
class ConversationController {
  public blockUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        BlockUserInChatViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: BlockUserInChatViewmodel =
          conversionResult.data as BlockUserInChatViewmodel;
        let updationlResult = await conversationServices.blockUser(
          req,
          model,
          next
        );
        if (updationlResult)
          return res.status(updationlResult.status_code).json({
            status_code: updationlResult.status_code,
            success: updationlResult.success,
            ...(updationlResult.success
              ? { data: updationlResult.data }
              : { errors: updationlResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        DeleteMessageViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: DeleteMessageViewmodel =
          conversionResult.data as DeleteMessageViewmodel;
        let updationlResult = await conversationServices.deleteMessages(
          req,
          model,
          next
        );
        if (updationlResult)
          return res.status(updationlResult.status_code).json({
            status_code: updationlResult.status_code,
            success: updationlResult.success,
            ...(updationlResult.success
              ? { data: updationlResult.data }
              : { errors: updationlResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public startNewConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        AddNewConversationInChatViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddNewConversationInChatViewmodel =
          conversionResult.data as AddNewConversationInChatViewmodel;
        let updationlResult = await conversationServices.startNewConversation(
          req,
          model,
          next
        );
        if (updationlResult)
          return res.status(updationlResult.status_code).json({
            status_code: updationlResult.status_code,
            success: updationlResult.success,
            ...(updationlResult.success
              ? { data: updationlResult.data }
              : { errors: updationlResult.data }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  public getMyConversationDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult = await Utility.ValidateAndConvert(
        GetConversationAfterNewMessageViewmodel,
        req.body
      );

      if (conversionResult.error && conversionResult.error.length > 0) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetConversationAfterNewMessageViewmodel =
          conversionResult.data as GetConversationAfterNewMessageViewmodel;
        let conversationDetailResult =
          await conversationServices.getConversationDetailsAfterNewMsg(
            req,
            model,
            next
          );
        if (conversationDetailResult)
          return res.status(conversationDetailResult.status_code).json({
            status_code: conversationDetailResult.status_code,
            success: conversationDetailResult.success,
            ...(conversationDetailResult.success
              ? { data: conversationDetailResult.data }
              : {
                  errors: conversationDetailResult.data,
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new ConversationController();
