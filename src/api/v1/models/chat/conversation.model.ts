import {
  getModelForClass,
  index,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { PaginatedModel } from "../../common/pagination/pagination_configuration";
import { User } from "../user.model";

export enum ECONVERSATION_TYPES {
  INDIVIDUAL = "INDIVIDUAL",
  GROUP = "GROUP",
  PATIENT = "PATIENT",
}

class SettingObject {
  @prop({ type: Boolean, default: true })
  update!: boolean;

  @prop({ type: Boolean, default: false })
  message!: boolean;

  @prop({ type: Boolean, default: false })
  addOrRemove!: boolean;
}

@index({ name: "text" })
export class Conversation extends PaginatedModel {
  @prop({ type: String, default: null })
  name!: string;

  @prop({ type: String, default: null })
  image!: string;

  @prop({ type: String, default: null })
  notes!: string;

  @prop({ type: Number, default: 1 })
  totalAdmin!: number;

  @prop({ type: Number, default: 2 })
  totalMember!: number;

  @prop({ enum: ECONVERSATION_TYPES })
  type!: ECONVERSATION_TYPES;

  @prop({ ref: User, default: null })
  admin_id!: Ref<User> | null;

  @prop({ ref: User, default: null })
  clinic_id!: Ref<User> | null;

  // !ONLY ADMIN CAN DO

  @prop({
    type: SettingObject,
    default: () => ({}),
    _id: false,
  })
  setting!: SettingObject;

  //Static methods

  public static async getGroupDataWithOneMemberLoggedInUser(
    this: ReturnModelType<typeof Conversation>,
    loggedInUser: any,
    clinic_id: any,

    member_id: any,

    conversation_id: any
  ) {
    return this.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(conversation_id),
          clinic_id: new mongoose.Types.ObjectId(
            clinic_id
          ) /*, type: conversationType*/,
        },
      },
      {
        $lookup: {
          from: "members",
          pipeline: [
            {
              $match: {
                user_id: new mongoose.Types.ObjectId(
                  member_id
                ),
                clinic_id: new mongoose.Types.ObjectId(
                  clinic_id
                ),
                conversation_id:
                  new mongoose.Types.ObjectId(
                    conversation_id
                  ),
              },
            },
            // {
            //   $lookup: {
            //     from: 'users',
            //     let: { user_id: '$user_id' },
            //     pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$user_id'] } } }, { $project: { firstName: 1, lastName: 1, image: 1 } }],
            //     as: 'userData',
            //   },
            // },
            // { $unwind: { path: '$userData', preserveNullAndEmptyArrays: true } },
          ],
          as: "memberData",
        },
      },
      {
        $lookup: {
          from: "members",
          pipeline: [
            {
              $match: {
                user_id: new mongoose.Types.ObjectId(
                  loggedInUser
                ),
                clinic_id: new mongoose.Types.ObjectId(
                  clinic_id
                ),
                conversation_id:
                  new mongoose.Types.ObjectId(
                    conversation_id
                  ),
              },
            },
            // {
            //   $lookup: {
            //     from: 'users',
            //     let: { user_id: '$user_id' },
            //     pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$user_id'] } } }, { $project: { firstName: 1, lastName: 1, image: 1 } }],
            //     as: 'userData',
            //   },
            // },
            // { $unwind: { path: '$userData', preserveNullAndEmptyArrays: true } },
          ],
          as: "loggedInUserData",
        },
      },
    ]);
  }

  public static async getConversationDataForMessage(
    this: ReturnModelType<typeof Conversation>,
    loggedInUser: any,
    clinic_id: any,

    conversation_id: any,

    conversationType: any
  ) {
    const aggregationArr: any = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(conversation_id),
          clinic_id: new mongoose.Types.ObjectId(clinic_id),
        },
      },

      {
        $lookup: {
          from: "members",
          pipeline: [
            {
              $match: {
                conversation_id:
                  new mongoose.Types.ObjectId(
                    conversation_id
                  ),
                user_id: new mongoose.Types.ObjectId(
                  loggedInUser
                ),
                clinic_id: new mongoose.Types.ObjectId(
                  clinic_id
                ),
              },
            },
          ],
          as: "memberData",
        },
      },

      {
        $unwind: {
          path: "$memberData",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    if (conversationType !== ECONVERSATION_TYPES.GROUP) {
      aggregationArr.push(
        {
          $lookup: {
            from: "members",
            pipeline: [
              {
                $match: {
                  conversation_id:
                    new mongoose.Types.ObjectId(
                      conversation_id
                    ),
                  user_id: {
                    $ne: new mongoose.Types.ObjectId(
                      loggedInUser
                    ),
                  },
                  clinic_id: new mongoose.Types.ObjectId(
                    clinic_id
                  ),
                },
              },
            ],
            as: "friendConversationData",
          },
        },
        {
          $unwind: {
            path: "$friendConversationData",
            preserveNullAndEmptyArrays: true,
          },
        }
      );
    }

    // console.log(aggregationArr)

    return this.aggregate(aggregationArr);
  }

  public static async getConversationDetailsAfterNewMsg(
    this: ReturnModelType<typeof Conversation>,
    loggedInUser: any,
    clinic_id: any,

    conversation_id: any,

    conversationType: any,
    roleTitle: any
  ) {
    const aggregationArr: any = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(conversation_id),
          clinic_id: new mongoose.Types.ObjectId(clinic_id),
        },
      },

      {
        $lookup: {
          from: "members",
          // let: { user_id: '$user_id' },
          pipeline: [
            {
              $match: {
                conversation_id:
                  new mongoose.Types.ObjectId(
                    conversation_id
                  ),
                user_id: new mongoose.Types.ObjectId(
                  loggedInUser
                ),
                clinic_id: new mongoose.Types.ObjectId(
                  clinic_id
                ),
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
                      // $expr: { $gte: ['$msgTime', '$$clearTime'] },
                      clinic_id:
                        new mongoose.Types.ObjectId(
                          clinic_id
                        ),
                      $expr: {
                        $and: [
                          {
                            $gte: [
                              "$msgTime",
                              "$$clearTime",
                            ],
                          },
                          {
                            $eq: [
                              "$conversation_id",
                              "$$conversation_id",
                            ],
                          },
                        ],
                      },
                    },
                  },
                  {
                    $lookup: {
                      from: "users",
                      let: { user_id: "$sender_id" },
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $eq: ["$_id", "$$user_id"],
                            },
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
                      as: "userData",
                    },
                  },
                  {
                    $unwind: {
                      path: "$userData",
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                  {
                    $facet: {
                      // unReadMsg: [{ $match: { $expr: { $ne: ['$readByRecipients.readByUserId', mongoose.Types.ObjectId(loggedInUser)] } } }, { $count: 'sum' }],
                      unReadMsg: [
                        {
                          $match: {
                            "readByRecipients.readByUserId":
                              {
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
                            sender_id: 1,
                            userData: 1,
                            document: 1,
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
                          if: {
                            $gt: ["$unReadMsg.sum", 0],
                          },
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
          ],
          as: "memberData",
        },
      },
      {
        $unwind: {
          path: "$memberData",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    if (conversationType !== ECONVERSATION_TYPES.GROUP) {
      const friendCollection =
        roleTitle != "PATIENT" &&
        conversationType == ECONVERSATION_TYPES.PATIENT
          ? "patients"
          : "users";

      aggregationArr.push(
        {
          $lookup: {
            from: "members",
            pipeline: [
              {
                $match: {
                  conversation_id:
                    new mongoose.Types.ObjectId(
                      conversation_id
                    ),
                  user_id: {
                    $ne: new mongoose.Types.ObjectId(
                      loggedInUser
                    ),
                  },
                  clinic_id: new mongoose.Types.ObjectId(
                    clinic_id
                  ),
                },
              },
            ],
            as: "friendConversationData",
          },
        },
        {
          $unwind: {
            path: "$friendConversationData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: friendCollection,
            let: {
              friendId: "$friendConversationData.user_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$friendId"] },
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
        { $project: { friendConversationData: 0 } }
      );
    }

    return this.aggregate(aggregationArr);
  }
}

const CONVERSATION_DB_MODEL = getModelForClass(
  Conversation,
  {
    schemaOptions: {
      collection: "conversation",
      timestamps: true,
    },
  }
);

export default CONVERSATION_DB_MODEL;
