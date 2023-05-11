"use strict";

import ErrorMessage from "../../common/erros_message";
import { ECONVERSATION_TYPES } from "../../models/chat/conversation.model";
import MemberModel from "../../models/chat/member.model";
import MessagesModel from "../../models/chat/message.model";

import { app } from "../../../../index";
import ConversationModel from "../../models/chat/conversation.model";

var chatUsers = new Map();
var aciveChatUsers = new Map();
class Conversatio_IO {
  connectChat = (chatIO: any) =>
    chatIO.on("connection", (socket: any) => {
      socket.on(
        ErrorMessage.socketEvents.chat.joinConversation,
        async (data: any) => {
          try {
            const conversationsArr =
              await MemberModel.getConversationIds(
                data.loggedInUser,
                data.clinic_id
              );
            conversationsArr.forEach((el: any) =>
              socket.join(el.toString())
            );
            // socket.data.user_id = data.loggedInUser

            // console.log(data.loggedInUser, socket.id)

            chatUsers.set(data.loggedInUser, socket.id);
          } catch (error) {
            chatIO
              .to(socket.id)
              .emit(
                ErrorMessage.socketEvents.chat
                  .errorJoinConversation
              );

            console.log(
              "****************  CHAT IO ERROR START  **************** "
            );
            console.log(error);
            console.log(
              "****************  CHAT IO ERROR END   **************** "
            );
          }
        }
      );

      socket.on(
        ErrorMessage.socketEvents.chat.sendMessage,
        async (data: any) => {
          // console.log('ErrorMessage.socketEvents.chat.sendMessage  ', socket.id)

          try {
            const {
              loggedInUser,
              clinic_id,
              conversation_id,
              message,
              type,
              nowTime,
              conversationType,
              document,
            } = data;

            let insertObj: any = {};
            insertObj = {
              type: type,
              message: message,
              msgTime: nowTime,
              clinic_id,
              sender_id: loggedInUser,
              conversation_id: conversation_id,
              document,
            };
            insertObj.readByRecipients = [
              {
                readByUserId:
                  loggedInUser /*,readAt: nowTime*/,
              },
            ];

            let conversationData: any =
              await ConversationModel.getConversationDataForMessage(
                conversation_id,
                loggedInUser,
                clinic_id,
                conversationType
              );

            if (!conversationData.length) {
              const socketResponse = {
                code: ErrorMessage.socketCodes.convNotFound,
                message:
                  ErrorMessage.conversationMsg.convNotFound,
              };
              return chatIO
                .to(socket.id)
                .emit(
                  ErrorMessage.socketEvents.chat
                    .receiveMessage,
                  socketResponse
                );
            }

            conversationData = conversationData[0];
            const memberData = conversationData.memberData;

            if (
              conversationData.type ==
              ECONVERSATION_TYPES.INDIVIDUAL
            ) {
              if (!memberData) {
                const socketResponse = {
                  code: ErrorMessage.socketCodes
                    .uRNotMember,
                  message:
                    ErrorMessage.conversationMsg
                      .uRNotMember,
                  data: { conversation_id },
                };
                return chatIO
                  .to(socket.id)
                  .emit(
                    ErrorMessage.socketEvents.chat
                      .receiveMessage,
                    socketResponse
                  );
              }

              if (
                conversationData.setting.message &&
                !memberData.isAdmin
              ) {
                const socketResponse = {
                  code: ErrorMessage.socketCodes
                    .onlyAdminMsg,
                  message:
                    ErrorMessage.conversationMsg
                      .onlyAdminMsg,
                  data: { conversation_id },
                };
                return chatIO
                  .to(socket.id)
                  .emit(
                    ErrorMessage.socketEvents.chat
                      .receiveMessage,
                    socketResponse
                  );
              }
            } else {
              const socketResponse = {
                code: ErrorMessage.socketCodes.uBlocked,
                message:
                  ErrorMessage.conversationMsg.uBlocked,
                data: { conversation_id },
              };
              if (memberData.isBlocked)
                return chatIO
                  .to(socket.id)
                  .emit(
                    ErrorMessage.socketEvents.chat
                      .receiveMessage,
                    socketResponse
                  );

              if (
                conversationData.friendConversationData
                  .isBlocked
              )
                insertObj.onlySender = true;

              if (
                conversationData.friendConversationData
                  .isActive == false
              )
                await MemberModel.findByIdAndUpdate(
                  conversationData.friendConversationData
                    ._id,
                  { isActive: true }
                );
            }

            const messageResponse =
                await MessagesModel.create(insertObj),
              socketResponse = {
                code: ErrorMessage.socketCodes.ok,
                message:
                  ErrorMessage.conversationMsg
                    .sendMessageSucc,
                data: {
                  message_id: messageResponse._id,
                  conversation_id,
                  clinic_id,
                  conversationType,
                  sender_id: insertObj.sender_id,
                },
              };

            if (insertObj.onlySender)
              chatIO
                .to(socket.id)
                .emit(
                  ErrorMessage.socketEvents.chat
                    .receiveMessage,
                  socketResponse
                );
            else
              chatIO
                .in(data.conversation_id)
                .emit(
                  ErrorMessage.socketEvents.chat
                    .receiveMessage,
                  socketResponse
                );
          } catch (error) {
            chatIO
              .in(data.conversation_id)
              .emit(
                ErrorMessage.socketEvents.chat
                  .receiveMessage,
                {
                  code: ErrorMessage.socketCodes
                    .internalservererror,
                }
              );

            console.log(
              "****************  CHAT IO ERROR START  **************** "
            );
            console.log(error);
            console.log(
              "****************  CHAT IO ERROR END   **************** "
            );
          }
        }
      );

      socket.on(
        ErrorMessage.socketEvents.chat.joinNewConversation,
        (data) => {
          // console.log('ErrorMessage.socketEvents.chat.newConversation', data)
          socket.join(data.conversation_id);
        }
      );

      socket[Symbol.for("nodejs.rejection")] = (err) =>
        socket.emit("error", err);
    });

  chatEventEmiter = (
    event: any,
    receiverArr: any,
    data: any
  ) => {
    if (receiverArr && receiverArr.length) {
      receiverArr.forEach((_id) => {
        let toUser = chatUsers.get(_id.toString());

        app.get("chatIO").to(toUser).emit(event, data);
      });
    } else
      process.env.NODE_ENV != "prod" &&
        console.log(
          `\n ***********  Chat IO haven't received array  ************\n`
        );
  };
}

export default new Conversatio_IO();
