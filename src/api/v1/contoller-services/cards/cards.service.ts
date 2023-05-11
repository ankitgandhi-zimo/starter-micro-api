import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";

import { DocumentType } from "@typegoose/typegoose";
import PaymentModel from "../../models/billing_payment.model";
import CardsModel from "../../models/cards.model";
import PatientModel, {
  Patients,
} from "../../models/patient.model";
import { User } from "../../models/user.model";
import {
  AddCardViewmodel,
  GetCardDetailsViewmodel,
  GetCardListViewmodel,
  PaymentChargedViewmodel,
} from "../../view-models/cards";
export enum EnumRoles {
  SUPERADMIN = "superadmin",
}
const PRIVATE__STRIPE = require("stripe")(
  process.env.STRIPE_PRIVATE_KEY
);
const PUBLIC__STRIPE = require("stripe")(
  process.env.STRIPE_PUBLIC_KEY
);

class CardsServices {
  addCard = async (
    req: Request,
    model: AddCardViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundpatient = await PatientModel.findById(
        model.patient_id
      );

      if (!foundpatient)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.PATIENT_DETAILS_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      const {
        number,
        exp_year,
        exp_month,
        cardHolderName,
        patient_id,
        clinic_id,
        cvc,
      } = model;

      // check card limit in particular clinic fro specific patients
      const patientCardsCount =
        await CardsModel.countDocuments({
          patient_id: patient_id,
          clinic_id: clinic_id,
        });

      if (patientCardsCount >= errorMessage.cardMsg.limit)
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: errorMessage.cardMsg.limitExceed(
              errorMessage.cardMsg.limit
            ),
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      const {
        id: tokenId,
        card,
        client_ip,
      } = await PUBLIC__STRIPE.tokens.create({
        card: {
          number,
          exp_month,
          exp_year,
          cvc,
          name: cardHolderName,
          metadata: { clinic_id: model.clinic_id },
        },
      });
      let customer = await PRIVATE__STRIPE.customers.create(
        {
          source: tokenId,
          name: patient_id,
        }
      );
      // if (
      //   foundpatient &&
      //   !foundpatient.customer_id_stripe
      // ) {
      //   customer = await PRIVATE__STRIPE.customers.create({
      //     // source: tokenId,
      //     name: patient_id,
      //   });

      //   let updatePatient = await PatientModel.updateOne(
      //     { _id: model.patient_id },
      //     { customer_id_stripe: customer.id }
      //   );
      // } else {
      //   customer = { id: foundpatient!.customer_id_stripe };
      // }

      // const addCard =
      //   await PRIVATE__STRIPE.customers.createSource(
      //     customer.id,
      //     {
      //       source: tokenId,
      //     }
      //   );
      let response = await CardsModel.create({
        client_ip: client_ip,
        patient_id: model.patient_id,
        cardId: card.id, //addCard.id,
        clinic_id: clinic_id,
        createdby_id: userDetails._id,
        token: customer.id,
      });
      if (response) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Card added successfully`,
          type: EHistoryActivityTypeValues.PATIENT,
          type_id: model.patient_id,
        });

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: response,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_ADD_CARD,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  getCardDetails = async (
    req: Request,
    model: GetCardDetailsViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let foundCardDetails = await CardsModel.findOne({
        cardId: model.card_id,
      });
      if (foundCardDetails) {
        const card =
          await PRIVATE__STRIPE.customers.retrieveSource(
            foundCardDetails.token, //patientDoc.customer_id_stripe,
            model.card_id
          );

        if (!card)
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.cardMsg.notFound,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            client_ip: foundCardDetails.client_ip,
            id: card.id,
            brand: card.brand,
            last4: card.last4,
            funding: card.funding,
            cardHolderName: card.name,
            clinic_id: foundCardDetails.clinic_id,
            patient_id: foundCardDetails.patient_id,

            // metadata: card.metadata,
          },
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.cardMsg.notFound,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      console.log(error.response, "liiiii");
      next(error);
    }
  };

  deleteCardDetails = async (
    req: Request,
    model: GetCardDetailsViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundCardDetails = await CardsModel.findOne({
        cardId: model.card_id,
      });

      if (!foundCardDetails)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.cardMsg.notFound,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      else {
        let deletionResult = await CardsModel.deleteOne({
          cardId: model.card_id,
        });

        if (
          deletionResult &&
          deletionResult.deletedCount > 0
        ) {
          let patientDoc = <DocumentType<Patients>>(
            foundCardDetails.patient_id
          );

          const deleted =
            await PRIVATE__STRIPE.customers.deleteSource(
              foundCardDetails.token,
              model.card_id
            );

          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `Card details deleted successfully`,
            type: EHistoryActivityTypeValues.PATIENT,
            type_id: foundCardDetails.patient_id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.cardMsg.deleted,
          };
        } else
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.cardMsg.deletionError,

              error: errorMessage.ON_DELETE_ERROR,
            },
          };
      }
    } catch (error) {
      next(error);
    }
  };

  getCardList = async (
    req: Request,
    model: GetCardListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      // let foundPatient = await PatientModel.findOne(
      //   { _id: model.patient_id },
      //   { customer_id_stripe: 1 }
      // );

      // if (!foundPatient || foundPatient.customer_id_stripe)
      //   return {
      //     status_code: HttpStatus.BAD_REQUEST,
      //     success: false,
      //     data: {
      //       message: errorMessage.PATIENT_DETAILS_NOT_FOUND,
      //       error: errorMessage.ON_FETCH_ERROR,
      //     },
      //   };

      // const cardsList =
      //   await PRIVATE__STRIPE.customers.listSources(
      //     foundPatient!.customer_id_stripe,
      //     { object: "card", limit: 3 }
      //   );

      // if (
      //   cardsList &&
      //   cardsList.data &&
      //   cardsList.data.length
      // )

      const condition = {
        patient_id: model.patient_id,
        clinic_id: model.clinic_id,
      };

      const cardsList = await CardsModel.find(condition);

      if (cardsList && cardsList.length > 0) {
        let response: any = [];

        await Promise.all(
          cardsList.map(async (el: any) => {
            let card =
              await PRIVATE__STRIPE.customers.retrieveSource(
                el.token, //patientDoc.customer_id_stripe,
                el.cardId
              );

            let tempObj: any = {
              id: card.id,
              brand: card.brand,
              last4: card.last4,
              funding: card.funding,
              cardHolderName: card.name,
              // clinic_id: model.clinic_id,
              // patient_id: model.patient_id
            };

            response.push(tempObj);
          })
        );

        return {
          status_code: HttpStatus.OK,
          data: { data: response },
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.cardMsg.CARD_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };

  chargeByPatientCards = async (
    req: Request,
    model: PaymentChargedViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let foundCardDetails = await CardsModel.findOne({
        cardId: model.card_id,
      });

      if (foundCardDetails) {
        if (!foundCardDetails || !foundCardDetails.cardId)
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.cardMsg.notFound,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };

        let chargeObj: any = {};
        chargeObj = {
          customer: foundCardDetails.token,
          amount: model.amount * 100,
          currency: "USD",
          // shipping: {
          //   address: {
          //     line1: "Chennai",
          //     city: "CA",
          //     country: "US",
          //     postal_code: 98140,
          //   },
          //   name: "Dravid Json",
          // },
        };

        console.log(chargeObj, "chargeObj");
        if (model.email)
          chargeObj.receipt_email = model.email;

        /////////////////////////////////////////////////////////////
        let result: any;
        await PRIVATE__STRIPE.charges
          .create(chargeObj)
          .then((data: any) => {
            result = data;
            // console.log(result, "dta");
            return {
              status_code: HttpStatus.OK,
              success: true,
              data: data,
            };
          })
          .catch((error: any) => {
            result = error;

            console.log("result  ", JSON.stringify(error));

            return {
              status_code: HttpStatus.BAD_REQUEST,
              success: false,

              data: {
                messgae: error.raw.message,
                error: errorMessage.ON_UPDATE_ERROR,
              },
            };
          });

        if (result && result.raw && result.raw.message)
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: result.raw.message, // errorMessage.cardMsg.notFound,
              error: errorMessage.ON_FETCH_ERROR,
            },
          };
        else {
          const paymentObj: any = {
            mode: "CARD",
            remark: "",
            amount: model.amount,
            clinic_id: null,
            patient_id: model.patient_id,
            createdby_id: userDetails._id,
            appointment_id: null,
            method: "ADVANCE",
            batchNumber: Date.now(),
            chargeId: result && result.id ? result.id : "",
          };

          let addPaymentRecord = await PaymentModel.create(
            paymentObj
          );
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: result,
          };
        }

        // else {
        //   return {
        //     status_code: HttpStatus.BAD_REQUEST,
        //     success: false,
        //     data: {
        //       message: errorMessage.ERROR_PAYMENT_CARD,
        //       error: errorMessage.ON_UPDATE_ERROR,
        //     },
        //   };
      }
    } catch (error) {
      console.log(error, "herejhjhh");
      next(error);
    }
  };
}
export default new CardsServices();
