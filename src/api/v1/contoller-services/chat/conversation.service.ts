import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import Utility, {
  IServiceResult1,
} from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import MembersModel from "../../models/chat/member.model";
import { User } from "../../models/user.model";
import {
  AddNewConversationInChatViewmodel,
  BlockUserInChatViewmodel,
  DeleteMessageViewmodel,
  GetConversationAfterNewMessageViewmodel,
} from "../../view-models/chat";
import { EChatActionValues } from "../../view-models/chat/block_user.viewmodel";
import Conversatio_IO from "../chat/conversation_io.service";

import mongoose from "mongoose";
import ConversationModel, {
  ECONVERSATION_TYPES,
} from "../../models/chat/conversation.model";
import MessageModel from "../../models/chat/message.model";
class ConversationServices {
  blockUser = async (
    req: Request,
    model: BlockUserInChatViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let isBlocked: any, msg: string;

      if (model.action == EChatActionValues.BLOCK) {
        isBlocked = true;
        msg = errorMessage.conversationMsg.blockSucc;
      } else if (
        model.action == EChatActionValues.UNBLOCK
      ) {
        isBlocked = false;
        msg = errorMessage.conversationMsg.unblockSucc;
      } else
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: errorMessage.SomeThingWentWrong,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };

      const condition = {
        user_id: userDetails._id,
        clinic_id: model.clinic_id,
        conversation_id: model.conversation_id,
      };

      const isUpdated = await MembersModel.updateOne(
        condition,
        { isBlocked: isBlocked }
      );

      if (isUpdated && isUpdated.modifiedCount > 0)
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: msg,
        };
      else
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: errorMessage.SomeThingWentWrong,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  deleteMessages = async (
    req: Request,
    model: DeleteMessageViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      const condition = {
        user_id: userDetails._id,
        clinic_id: model.clinic_id,
        conversation_id: model.conversation_id,
      };

      const isUpdated = await MembersModel.updateOne(
        condition,
        { isActive: false, clearTime: model.nowTime }
      );

      if (isUpdated && isUpdated.modifiedCount > 0)
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: errorMessage.conversationMsg.deletedSucc,
        };
      else
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: errorMessage.SomeThingWentWrong,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  startNewConversation = async (
    req: Request,
    model: AddNewConversationInChatViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let loggedInUser = userDetails!._id;

      let validateArr = [
        ...model.membersArr,
        loggedInUser.toString(),
      ];
      const {
        clinic_id,
        type,
        membersArr,
        nowTime,
        name,
        image,
      } = model;

      if (
        type === ECONVERSATION_TYPES.INDIVIDUAL ||
        type === ECONVERSATION_TYPES.PATIENT
      ) {
        if (membersArr.length > 1)
          return {
            status_code: HttpStatus.NOT_FOUND,
            success: false,
            data: {
              message:
                errorMessage.conversationMsg
                  .onlyOneMemberInIndividual,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        const hasConversationBefore =
          await MembersModel.getOneToOneConversation(
            clinic_id,
            loggedInUser,
            membersArr[0],
            nowTime,
            type
          );

        // console.log('  hasConversationBefore   ', hasConversationBefore)

        if (hasConversationBefore.length) {
          // console.log('  hasConversationBefore   ')
          if (hasConversationBefore[0].isActive == false)
            await MembersModel.findByIdAndUpdate(
              hasConversationBefore[0]._id,
              { isActive: true }
            );

          hasConversationBefore[0].name = req.body.name;
          hasConversationBefore[0].image = req.body.image
            ? req.body.image
            : null;
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: hasConversationBefore[0],
          };
        }
      }

      // return res.json({ code: 401, message: constants.messages.underDevelopment })

      const conversationObj: any = {
        type,
        clinic_id,
        admin_id: loggedInUser,
      };

      if (type == ECONVERSATION_TYPES.GROUP) {
        conversationObj.name = req.body.name;
        conversationObj.image = req.body.image;
        conversationObj.totalMember = validateArr.length;
      }

      const conversationResult =
        await ConversationModel.create(conversationObj);

      const insertArr: any = membersArr.map((el) => ({
        clearTime: nowTime,
        user_id: el,
        clinic_id,
        addedby_id: loggedInUser,
        conversation_id: conversationResult._id,
      }));

      insertArr.push({
        clearTime: nowTime,
        user_id: loggedInUser,
        clinic_id,
        addedby_id: loggedInUser,
        conversation_id: conversationResult._id,
        isAdmin: true,
      });

      await MembersModel.insertMany(insertArr);

      Conversatio_IO.chatEventEmiter(
        errorMessage.socketEvents.chat
          .newConversationStarted,
        validateArr,
        { conversation_id: conversationResult._id }
      );

      const finalObjToBeReturn: any = {
        name,
        unReadMsg: 0,
        lastMessages: [],
        isMuted: false,
        isBlocked: false,
        conversation_id: conversationResult._id,
        totalMember: conversationResult.totalMember,
      };
      finalObjToBeReturn.type = type;

      image
        ? (finalObjToBeReturn.image = image)
        : (finalObjToBeReturn.image = null);

      return {
        status_code: HttpStatus.OK,
        success: true,
        data: finalObjToBeReturn,
      };
    } catch (error) {
      next(error);
    }
  };

  getConversationDetailsAfterNewMsg = async (
    req: Request,
    model: GetConversationAfterNewMessageViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let loggedInUser = userDetails!._id;
      let sender_id = userDetails!._id;
      const {
        conversation_id,
        clinic_id,
        message_id,
        // sender_id,
        nowTime,
        convOpened,
        conversationType,
        roleTitle,
      } = model;

      let conversationData: any =
        await ConversationModel.getConversationDetailsAfterNewMsg(
          conversation_id,
          loggedInUser,
          clinic_id,
          conversationType,
          roleTitle
        );
      console.log(model, "conversationData");
      if (!conversationData.length)
        return {
          status_code:
            errorMessage.socketCodes.convNotFound,
          success: false,
          data: {
            message:
              errorMessage.conversationMsg.convNotFound,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };

      conversationData = conversationData[0];
      const memberData = conversationData.memberData;

      console.log("conversationData  ", conversationData);

      const finalObjToBeReturn: any = {
        sender_id,
        conversation_id,
        type: conversationType,
        isBlocked: memberData.isBlocked,
        isMuted: memberData.isMuted,
        lastMessages: memberData.messagesData.lastMessages,
        unReadMsg: !convOpened
          ? memberData.messagesData.unReadMsg
          : 0,
      };

      if (
        conversationData.type == ECONVERSATION_TYPES.GROUP
      ) {
        if (!memberData)
          return {
            status_code:
              errorMessage.socketCodes.uRNotMember,
            success: false,
            data: {
              message:
                errorMessage.conversationMsg.uRNotMember,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        finalObjToBeReturn.name = conversationData.name;
        finalObjToBeReturn.image = conversationData.image;
        finalObjToBeReturn.totalMember =
          conversationData.totalMember;

        // if (conversationData.setting.message && !memberData.isAdmin) return res.json(Response(constants.socketCodes.onlyAdminMsg, constants.conversationMsg.onlyAdminMsg, finalObjToBeReturn))
      } else if (
        conversationType == ECONVERSATION_TYPES.INDIVIDUAL
      ) {
        finalObjToBeReturn.name =
          conversationData.friendData.first_name +
          " " +
          conversationData.friendData.last_name;
        finalObjToBeReturn.image =
          conversationData.friendData.image;
      } else if (
        conversationType == ECONVERSATION_TYPES.PATIENT
      ) {
        if (roleTitle != errorMessage.rolename.PATIENT)
          finalObjToBeReturn.name =
            Utility.getDecryptText(
              conversationData.friendData.first_name
            ) +
            " " +
            Utility.getDecryptText(
              conversationData.friendData.last_name
            );
        else
          finalObjToBeReturn.name =
            conversationData.friendData.first_name +
            " " +
            conversationData.friendData.last_name;
        finalObjToBeReturn.image =
          conversationData.friendData.image;
      }

      // console.log(convOpened, sender_id, loggedInUser)

      if (convOpened == true)
        await MessageModel.findByIdAndUpdate(message_id, {
          $addToSet: {
            readByRecipients: {
              readByUserId: new mongoose.Types.ObjectId(
                loggedInUser
              ) /*,readAt: nowTime*/,
            },
          },
        });

      return {
        status_code: HttpStatus.OK,
        success: true,
        data: finalObjToBeReturn,
      };
    } catch (error) {
      next(error);
    }
  };

  // getMessages = async (
  //   req: Request,
  //   model: GetMessageViewmodel,
  //   next: NextFunction
  // ): Promise<IServiceResult1 | void> => {
  //   try {
  //     let userDetails = <DocumentType<User>>req.user;
  //     let loggedInUser = userDetails!._id;

  //     const count =
  //       model.pageSize && model.pageSize < 100
  //         ? req.body.pageSize
  //         : 50;
  //     req.body.page = model.pageNumber
  //       ? model.pageNumber
  //       : 1;
  //     const skip = count * (req.body.page - 1);

  //     const {
  //       clinic_id,
  //       conversationType,
  //       conversation_id,
  //       nowTime,
  //       roleTitle,
  //     } = model;

  //     const memberCond = {
  //         user_id: new mongoose.Types.ObjectId(
  //           loggedInUser
  //         ),
  //         clinic_id: clinic_id,
  //         conversation_id: conversation_id,
  //       },
  //       readMessageCond = {
  //         clinic_id: clinic_id,
  //         conversation_id: conversation_id,
  //       };

  //     const friendCollection =
  //         roleTitle != errorMessage.rolename.PATIENT &&
  //         conversationType == ECONVERSATION_TYPES.PATIENT
  //           ? "patients"
  //           : "users";
  //    const   allMessages :any= [
  //         {
  //           $lookup: {
  //             from: friendCollection,
  //             let: { user_id: "$sender_id" },
  //             pipeline: [
  //               {
  //                 $match: {
  //                   $expr: { $eq: ["$_id", "$$user_id"] },
  //                 },
  //               },
  //               {
  //                 $project: {
  //                   first_name: 1,
  //                   last_name: 1,
  //                   image: 1,
  //                 },
  //               },
  //             ],
  //             as: "userData",
  //           },
  //         },
  //         {
  //           $unwind: {
  //             path: "$userData",
  //             preserveNullAndEmptyArrays: true,
  //           },
  //         },
  //         {
  //           $project: {
  //             _id: 0,
  //             message_id: "$_id",
  //             sender_id: "$sender_id",
  //             message: "$message",
  //             msgTime: "$msgTime",
  //             userData: 1,
  //             document: 1,
  //           },
  //         },
  //         { $sort: { msgTime: -1 } },
  //         { $limit: skip + count },
  //         { $skip: skip },
  //         { $sort: { msgTime: 1 } },
  //       ];

  //     // console.log('friendCollection  ', friendCollection)

  //     const data = await MembersModel.aggregate([
  //       { $match: memberCond },

  //       {
  //         $lookup: {
  //           from: "conversations",
  //           let: { conversation_id: "$conversation_id" },
  //           pipeline: [
  //             {
  //               $match: {
  //                 clinic_id: new mongoose.Types.ObjectId(
  //                   clinic_id!.toString()
  //                 ),
  //                 $expr: {
  //                   $eq: ["$_id", "$$conversation_id"],
  //                 },
  //               },
  //             },
  //           ],
  //           as: "conversationData",
  //         },
  //       },
  //       { $unwind: { path: "$conversationData" } },

  //       {
  //         $lookup: {
  //           from: "messages",
  //           let: {
  //             conversation_id: "$conversation_id",
  //             clearTime: "$clearTime",
  //           },
  //           pipeline: [
  //             {
  //               $match: {
  //                 clinic_id: new mongoose.Types.ObjectId(
  //                   clinic_id!.toString()
  //                 ),
  //                 $expr: {
  //                   $and: [
  //                     { $gte: ["$msgTime", "$$clearTime"] },
  //                     {
  //                       $eq: [
  //                         "$conversation_id",
  //                         "$$conversation_id",
  //                       ],
  //                     },
  //                   ],
  //                 },
  //                 $or: [
  //                   { onlySender: false },
  //                   {
  //                     onlySender: true,
  //                     sender_id:
  //                       new mongoose.Types.ObjectId(
  //                         loggedInUser.toString()
  //                       ),
  //                   },
  //                 ],
  //               },
  //             },
  //             {
  //               $facet: {
  //                 totalMsg: [{ $count: "sum" }],
  //                 allMessages,
  //               },
  //             },
  //             {
  //               $unwind: {
  //                 path: "$totalMsg",
  //                 preserveNullAndEmptyArrays: true,
  //               },
  //             },
  //             {
  //               $project: {
  //                 allMessages: 1,
  //                 totalMsg: {
  //                   $cond: {
  //                     if: { $gt: ["$totalMsg.sum", 0] },
  //                     then: "$totalMsg.sum",
  //                     else: 0,
  //                   },
  //                 },
  //               },
  //             },
  //           ],
  //           as: "messagesData",
  //         },
  //       },
  //       {
  //         $unwind: {
  //           path: "$messagesData",
  //           preserveNullAndEmptyArrays: true,
  //         },
  //       },

  //       {
  //         $project: {
  //           _id: 0,
  //           isMuted: 1,
  //           isAdmin: 1,
  //           user_id: 1,
  //           clinic_id: 1,
  //           addedby_id: 1,
  //           messagesData: 1,
  //           conversation_id: 1,
  //           onlyAdminCanMessage:
  //             "$conversationData.setting.message",
  //         },
  //       },
  //     ]);

  //     if (!data.length)
  //       return res.json(
  //         Response(
  //           constants.statusCode.unauth,
  //           constants.messages.noRecordFound
  //         )
  //       );

  //     await MessageModel.updateMany(
  //       {
  //         ...readMessageCond,
  //         "readByRecipients.readByUserId": {
  //           $ne: new mongoose.Types.ObjectId(
  //             loggedInUser.toString()
  //           ),
  //         },
  //       },
  //       {
  //         $addToSet: {
  //           readByRecipients: {
  //             readByUserId: new mongoose.Types.ObjectId(
  //               loggedInUser.toString()
  //             ) /*,readAt: nowTime*/,
  //           },
  //         },
  //       },
  //       { multi: true }
  //     );

  //     // if (friendCollection == 'patients') {
  //     //   data[0].messagesData.allMessages.forEach((el) => {
  //     //     console.log(el)
  //     //     // el.userData.firstName = utility.getDecryptText(el.userData.firstName)
  //     //     // el.userData.lastName = utility.getDecryptText(el.userData.lastName)
  //     //   })
  //     // }

  //     let finalObjToBeReturn = {
  //       data: data[0],
  //       // count: result.totalDocs,
  //       totalDocs: data[0].messagesData.totalMsg,
  //       // pageNumber: req.body.page,
  //       // pageSize: count,
  //       // totalPages: Math.ceil(
  //       //   data[0].aggregatedData.length / count
  //       // ),
  //     };

  //     return {
  //       status_code: HttpStatus.OK,
  //       success: true,
  //       data: finalObjToBeReturn,
  //     };
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default new ConversationServices();
