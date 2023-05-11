import {
  getModelForClass,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../../common/pagination/pagination_configuration";
import { User } from "../user.model";
import { Conversation } from "./conversation.model";

export class Member extends PaginatedModel {
  @prop({ type: Boolean, default: false })
  isMuted!: boolean;

  @prop({ type: Boolean, default: false })
  isAdmin!: boolean;
  @prop({ type: Boolean, default: true })
  isActive!: boolean;
  @prop({ type: Boolean, default: false })
  isBlocked!: boolean;

  @prop({ type: Date, default: Date.now() })
  clearTime!: string;

  @prop({ ref: User })
  user_id!: Ref<User> | null;

  @prop({ ref: User })
  clinic_id!: Ref<User> | null;

  @prop({ ref: User })
  addedby_id!: Ref<User> | null;

  @prop({ ref: Conversation })
  conversation_id!: Ref<Conversation> | null;

  public static async getConversationIds(
    this: ReturnModelType<typeof Member>,
    loggedInUser: any,
    clinic_id: any
  ) {
    return this.find({
      user_id: new mongoose.Types.ObjectId(loggedInUser),
      clinic_id: new mongoose.Types.ObjectId(clinic_id),
    }).distinct("conversation_id");
  }

  public static async getOneToOneConversation(
    this: ReturnModelType<typeof Member>,
    loggedInUser: any,
    clinic_id: any,
    friend_id: any,
    nowTime: any,
    type: any
  ) {
    return this.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(
            loggedInUser
          ),
          clinic_id: new mongoose.Types.ObjectId(clinic_id),
        },
      },

      {
        $lookup: {
          from: "members",
          let: { conversation_id: "$conversation_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [
                    "$conversation_id",
                    "$$conversation_id",
                  ],
                },
                user_id: new mongoose.Types.ObjectId(
                  friend_id
                ),
                clinic_id: new mongoose.Types.ObjectId(
                  clinic_id
                ),
              },
            },
          ],
          as: "exist",
        },
      },

      {
        $match: {
          $expr: { $gt: [{ $size: "$exist" }, 0] },
        },
      },

      {
        $lookup: {
          from: "conversations",
          let: { conversation_id: "$conversation_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$conversation_id"],
                },
              },
            },
          ],
          as: "conversationData",
        },
      },
      {
        $unwind: {
          path: "$conversationData",
          preserveNullAndEmptyArrays: true,
        },
      },

      { $match: { "conversationData.type": type } },

      {
        $lookup: {
          from: "users",
          pipeline: [
            {
              $match: {
                _id: new mongoose.Types.ObjectId(friend_id),
                invitedby_id: new mongoose.Types.ObjectId(
                  clinic_id
                ),
              },
            },
            {
              $project: {
                // firstName: 1,
                // lastName: 1,
                first_name: 1,
                last_name: 1,
                image: 1,
              },
            },
          ],
          as: "friendData",
        },
      },

      {
        $unwind: {
          path: "$friendData",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "messages",
          let: {
            conversation_id: "$conversation_id",
            clearTime: "$clearTime",
          },
          pipeline: [
            {
              $match: {
                clinic_id: new mongoose.Types.ObjectId(
                  clinic_id
                ),
                $expr: {
                  $and: [
                    { $gte: ["$msgTime", "$$clearTime"] },
                    {
                      $gte: [
                        "$conversation_id",
                        "$$conversation_id",
                      ],
                    },
                  ],
                },
              },
            },
            {
              $facet: {
                unReadMsg: [
                  {
                    $match: {
                      "readByRecipients.readByUserId": {
                        $ne: new mongoose.Types.ObjectId(
                          loggedInUser
                        ),
                      },
                    },
                  },
                  { $count: "sum" },
                ],
                lastMessages: [
                  {
                    $project: {
                      message: 1,
                      msgTime: 1,
                      clearTime: "$$clearTime",
                    },
                  },
                  { $sort: { _id: -1 } },
                  { $limit: 1 },
                ],
              },
            },
            {
              $unwind: {
                path: "$unReadMsg",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                lastMessages: 1,
                unReadMsg: {
                  $cond: {
                    if: { $gt: ["$unReadMsg.sum", 0] },
                    then: "$unReadMsg.sum",
                    else: 0,
                  },
                },
              },
            },
          ],
          as: "messagesData",
        },
      },
      {
        $unwind: {
          path: "$messagesData",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $project: {
          // _id: 0,
          isMuted: 1,
          isActive: 1,
          isBlocked: 1,
          // friendData: '$friendData',
          image: "$friendData.image",
          // messagesData: '$messagesData',
          type: "$conversationData.type",
          conversation_id: "$conversation_id",
          unReadMsg: "$messagesData.unReadMsg",
          lastMessages: "$messagesData.lastMessages",
          name: {
            $concat: [
              "$friendData.first_name",
              " ",
              "$friendData.last_name",
            ],
          },
        },
      },
    ]);
  }
}

const MEMBER_DB_MODEL = getModelForClass(Member, {
  schemaOptions: {
    collection: "member",
    timestamps: true,
  },
});

export default MEMBER_DB_MODEL;
