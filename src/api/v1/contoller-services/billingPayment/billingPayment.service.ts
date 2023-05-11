import { DocumentType } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import fs from "fs";
import HttpStatus from "http-status-codes";
import _ from "lodash";
import moment from "moment";
import mongoose from "mongoose";
import path from "path";
import { v4 } from "uuid";
import Utility, { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import AppointmentModel from "../../models/appointment.model";
import PaymentModel, {
  BillingPayment,
  EBillingModeValues,
  EBillingStatusValues,
} from "../../models/billing_payment.model";
const momentTimeZone = require("moment-timezone");

import BillingPostPaymentModel, {
  BillingPostPayment,
  EPostBillingStatusValues,
} from "../../models/billing_post_payment.model";
import cardModel from "../../models/cards.model";
import CLAIM_RESPONSE_DB_MODEL from "../../models/claim_response.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import INSURANCE_DB_MODEL from "../../models/insurance/insurance.model";
import PatientModel, { Patients } from "../../models/patient.model";
import PAYMENT_GATEWAY_MODEL from "../../models/payment_gateway.model";
import SuperBillModel from "../../models/super_bill.model";
import { User } from "../../models/user.model";
import {
  AddPostPaymentViewmodel,
  DisabledPaymentLinkViewmodel,
  GetSuperBillListForPostPaymentViewmodel,
  MakeAndGetCMS1500Viewmodel,
  ReceivedPaymentViewmodel,
  UpdateBillingPaymentViewmodel,
  UpdatePostPaymentViewmodel,
} from "../../view-models/billingPayment";
import { GetPostPaymentListViewmodel } from "../../view-models/billingPayment/get_post_payment_list.viewmodel";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";

import cardServices from "../cards/cards.service";
const sendGridMailer = require("@sendgrid/mail").setApiKey(
    process.env.sendGrid_API_KEY
  ),
  { PDFDocument, createPDFAcroFields, PDFName } = require("pdf-lib");
class BillingPaymentServices {
  receivePayment = async (
    req: Request,
    model: ReceivedPaymentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let createdby_id = userDetails._id;
      const {
        cvc,
        mode,
        email,
        cheque,
        amount,
        remark,
        nowTime,
        card_id,
        saveCard,
        exp_year,
        exp_month,
        clinic_id,
        cardNumber,
        patient_id,
        receiveDate,

        appointment_id,
        cardHolderName,
      } = model;

      const paymentObj: any = {
        mode,
        remark,
        amount,
        clinic_id,
        patient_id,
        createdby_id,
        appointment_id,
        method: "ADVANCE",
        batchNumber: Date.now(),
      };

      // find stripe payment gateway detailsof this clinic
      const clinicStripeDetails = await PAYMENT_GATEWAY_MODEL.findOne({
        clinic_id: model.clinic_id,
      });

      if (!clinicStripeDetails)
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: errorMessage.NO_STRIPE_PAYMENT_GATEWAY_ACCESS,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      const PUBLIC__STRIPE = require("stripe")(clinicStripeDetails!.public_key);

      const PRIVATE__STRIPE = require("stripe")(
        clinicStripeDetails!.secret_key
      );

      const patientData = await PatientModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(patient_id!.toString()),
          },
        },
      ]);

      switch (mode) {
        case EBillingModeValues.CASH:
          paymentObj.status = "RECEIVED";
          paymentObj.receiveDate = receiveDate;

          // return res.json({ code: 401, message: constants.messages.underDevelopment, paymentObj })

          await PaymentModel.create(paymentObj);
          return {
            success: true,
            data: errorMessage.appointmentMsg.paymentReceivedOnly(amount),
            status_code: HttpStatus.OK,
          };

        case EBillingModeValues.CARD:
          if (card_id) {
            const patientEmail = patientData[0].email
              ? Utility.getDecryptText(patientData[0].email)
              : "";
            const cardModel = {
                amount: parseFloat(amount),
                card_id: card_id,
                email: patientEmail,
                patient_id: patient_id,
              },
              cardChargeResponse = await cardServices.chargeByPatientCards(
                req,
                cardModel,
                next
              );

            // cardChargeResponse.data &&
            //   (paymentObj.chargeId =
            //     cardChargeResponse.data.id);

            if (
              cardChargeResponse &&
              cardChargeResponse.status_code == 200 &&
              cardChargeResponse.data
            ) {
              paymentObj.status = "RECEIVED";
              paymentObj.receiveDate = nowTime;
              paymentObj.chargeId = cardChargeResponse.data.id;
            } else paymentObj.status = "FAILED";

            await PaymentModel.create(paymentObj);

            return {
              success: true,
              data: errorMessage.appointmentMsg.paymentReceivedOnly(amount),
              status_code: HttpStatus.OK,
            };
          } else {
            let tokenData = await PUBLIC__STRIPE.tokens.create({
              card: {
                number: cardNumber,
                exp_month,
                exp_year,
                cvc,
              },
            });
            // .then(async (tokenData: any) =>

            if (tokenData && !("error" in tokenData)) {
              const firstName = patientData[0].first_name
                  ? Utility.getDecryptText(patientData[0].first_name)
                  : "",
                lastName = patientData[0].last_name
                  ? Utility.getDecryptText(patientData[0].last_name)
                  : "",
                email = patientData[0].email
                  ? Utility.getDecryptText(patientData[0].email)
                  : "",
                { card, client_ip } = tokenData,
                stripeObj = {
                  amount,
                  tokenId: tokenData.id,
                  email,
                  name: firstName + " " + lastName,
                };

              // start task on 10 feb---Ankit
              const paymentData =
                // await query.stripePayment(stripeObj);
                await Utility.stripePayment(
                  stripeObj,
                  clinicStripeDetails!.secret_key
                );

              // const paymentData: any = {};
              paymentData.data && (paymentObj.chargeId = paymentData.data.id);
              paymentObj.remark = paymentData.message;

              if (paymentData.status == true && paymentData.data) {
                paymentObj.status = "RECEIVED";
                paymentObj.receiveDate = nowTime;
              } else paymentObj.status = "FAILED";

              await PaymentModel.create(paymentObj);

              if (!paymentData.status || !paymentData.data)
                return {
                  success: false,
                  data: {
                    message: errorMessage.subscriptionMsg.paymentDataErr,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                  status_code: errorMessage.paymentFail,
                };

              if (saveCard == true) {
                const patientCardsCount = await cardModel.countDocuments({
                  patient_id: new mongoose.Types.ObjectId(
                    patient_id!.toString()
                  ),
                  clinic_id: new mongoose.Types.ObjectId(clinic_id!.toString()),
                });

                if (
                  patientCardsCount &&
                  patientCardsCount >= errorMessage.cardMsg.limit
                )
                  return {
                    success: false,
                    data: {
                      message: `${
                        errorMessage.appointmentMsg.paymentReceivedOnly(
                          amount
                        ) +
                        ". but ," +
                        errorMessage.cardMsg.limitExceed(
                          errorMessage.cardMsg.limit
                        )
                      }`,
                      error: errorMessage.ON_ADD_ERROR,
                    },
                    status_code: HttpStatus.UNAUTHORIZED,
                  };

                let tokenData = await PUBLIC__STRIPE.tokens.create({
                  card: {
                    number: cardNumber,
                    exp_month,
                    exp_year,
                    cvc,
                  },
                });

                if (tokenData) {
                  let customerAdd = await PRIVATE__STRIPE.customers.create({
                    source: tokenData.id,
                    name: patient_id,
                  });

                  {
                    const insertObj = {
                      client_ip: client_ip,
                      clinic_id: clinic_id,
                      patient_id: patient_id,
                      createdby_id: createdby_id,
                      cardId: card.id,

                      token: customerAdd.id,
                    };

                    let addCard = await cardModel.create(insertObj);

                    return {
                      success: true,
                      data: errorMessage.appointmentMsg.paymentReceivedOnly(
                        amount
                      ),
                      status_code: HttpStatus.OK,
                    };
                  }
                } else {
                  if (
                    tokenData.error.type &&
                    tokenData.error.type.includes("Stripe")
                  )
                    return {
                      success: false,
                      data: {
                        message: tokenData.error.raw.message,
                        error: errorMessage.ON_ADD_ERROR,
                      },
                      status_code: HttpStatus.UNAUTHORIZED,
                    };
                  else
                    return {
                      success: false,
                      data: {
                        message: errorMessage.INTERNAL_SERVER_ERROR,
                        error: errorMessage.ON_ADD_ERROR,
                      },
                      status_code: HttpStatus.INTERNAL_SERVER_ERROR,
                    };
                }
              } else
                return {
                  success: true,
                  data: errorMessage.appointmentMsg.paymentReceivedOnly(amount),
                  status_code: HttpStatus.OK,
                };
            } else {
              if (
                tokenData.error.type &&
                tokenData.error.type.includes("Stripe")
              )
                return {
                  success: false,
                  data: {
                    message: tokenData.error.raw.message,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                  status_code: HttpStatus.UNAUTHORIZED,
                };
              else
                return {
                  success: false,
                  data: {
                    message: errorMessage.INTERNAL_SERVER_ERROR,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                  status_code: HttpStatus.INTERNAL_SERVER_ERROR,
                };
            }
          }

          break;

        // case EBillingModeValues.CHEQUE:
        //   return res.json({
        //     code: 401,
        //     message: constants.messages.underDevelopment,
        //   });

        //   await receiveChequePaymentValidation.validateAsync(
        //     {
        //       checkout_id,
        //       clinic_id,
        //       received: { amount: amountReceived },
        //     }
        //   );
        //   break;

        case EBillingModeValues.LINK:
          const previousCheckCondition = {
            patient_id: new mongoose.Types.ObjectId(patient_id!.toString()),
            clinic_id: new mongoose.Types.ObjectId(clinic_id!.toString()),
            amount: parseInt(amount),
            status: { $in: ["EXPECTED"] },
          };
          const checkPreviousSentLink = await PaymentModel.aggregate([
            { $match: previousCheckCondition },
            { $sort: { createdAt: -1 } },
          ]);

          if (
            !checkPreviousSentLink.length ||
            (checkPreviousSentLink.length && !checkPreviousSentLink[0].link.url)
          ) {
            const paymentObj = {
              mode: mode,
              method: "FULL",
              amount: amount,
              status: "EXPECTED",
              clinic_id: new mongoose.Types.ObjectId(clinic_id!.toString()),
              patient_id: new mongoose.Types.ObjectId(patient_id!.toString()),
              createdby_id: new mongoose.Types.ObjectId(createdby_id),
              email: email
                ? email
                : Utility.getDecryptText(patientData[0].email),
            };

            // Create payment to link with stripe Object
            const paymentData = await PaymentModel.create(paymentObj);

            if (!paymentData)
              return {
                success: false,
                data: {
                  message: `${errorMessage.SomeThingWentWrong} Try again later`,
                  error: errorMessage.ON_ADD_ERROR,
                },
                status_code: HttpStatus.UNAUTHORIZED,
              };

            const productObj = {
                name: `Due Payment ${moment(nowTime).format("YYYY-MM-DD")} - ${
                  patientData[0].patientId
                }`,
                metadata: {
                  id: paymentData._id.toString(),
                },
              },
              product = await PRIVATE__STRIPE.products.create(productObj),
              price = await PRIVATE__STRIPE.prices.create({
                unit_amount: parseFloat(amount) * 100,
                currency: "usd",
                product: product.id,
              }),
              //   resetKey = Utility.uuid.v1() + "1",
              resetKey = v4(),
              redirectUrl =
                // config.baseUrl +
                "http://192.168.1.114:3000/" +
                `payment-success/${resetKey}/${clinic_id}/${paymentData._id.toString()}/${patient_id}/DUE`,
              paymentLink = await PRIVATE__STRIPE.paymentLinks.create({
                line_items: [{ price: price.id, quantity: 1 }],
                after_completion: {
                  type: "redirect",
                  redirect: { url: redirectUrl },
                },
              });

            // Update Payment with stripe links and ID
            const updateObj = {
              link: {
                url: paymentLink.url,
                id: paymentLink.id,
                resetKey,
              },
            };
            await PaymentModel.updateOne({ _id: paymentData._id }, updateObj);

            const printContents = {
              amount: amount,
              paymentLink: paymentLink.url,
              lastName: patientData[0].last_name
                ? Utility.getDecryptText(patientData[0].last_name)
                : "",
              firstName: patientData[0].first_name
                ? Utility.getDecryptText(patientData[0].first_name)
                : "",
            };

            let paymentLinkEmailsToBeSend: any = [];
            paymentLinkEmailsToBeSend.push({
              to: email ? email : Utility.getDecryptText(patientData[0].email),
              from: `Payment link <${process.env.SMTP_ClientEmail}>`,
              subject: errorMessage.mailSubject.shareLinkPayment,
              html: Utility.shareLinkPaymentEmailForAmountDue(printContents),
            });

            sendGridMailer
              .send(paymentLinkEmailsToBeSend)
              .then(async () => {
                // Add Activity History
                let addHistory = await HistoryModel.create({
                  user_id: userDetails._id,
                  description: `Billing Payment added successfully`,
                  type: EHistoryActivityTypeValues.PAYMENT,
                  type_id: userDetails._id,
                });
                return {
                  success: true,
                  data: errorMessage.billingMsg.successLinkSend,
                  status_code: HttpStatus.OK,
                };
              })
              .catch((error: any) => {
                return {
                  success: false,
                  data: {
                    message: errorMessage.billingMsg.emailSentError,
                    error: errorMessage.ON_ADD_ERROR,
                  },
                  status_code: HttpStatus.UNAUTHORIZED,
                };
              });
          } else {
            const printContents = {
              amount: checkPreviousSentLink[0].amount,
              paymentLink: checkPreviousSentLink[0].link.url,
              lastName: patientData[0].last_name
                ? Utility.getDecryptText(patientData[0].last_name)
                : "",
              firstName: patientData[0].first_name
                ? Utility.getDecryptText(patientData[0].first_name)
                : "",
            };

            let paymentLinkEmailsToBeSend: any = [];
            paymentLinkEmailsToBeSend.push({
              to: email ? email : Utility.getDecryptText(patientData[0].email),
              from: `Payment link <${process.env.sendGrid_ClientEmail}>`,
              subject: errorMessage.mailSubject.shareLinkPayment,
              html: Utility.shareLinkPaymentEmailForAmountDue(printContents),
            });

            let sendMessage = await sendGridMailer.send(
              paymentLinkEmailsToBeSend
            );

            console.log(JSON.stringify(sendMessage), "sendMessage");
            // .then(() => {
            if (sendMessage)
              return {
                success: true,
                data: errorMessage.billingMsg.successLinkSend,
                status_code: HttpStatus.OK,
              };
            // })
            // .catch((error: any) => {
            // console.log(error);
            else
              return {
                success: false,
                data: {
                  message: errorMessage.billingMsg.emailSentError,
                  error: errorMessage.ON_ADD_ERROR,
                },
                status_code: HttpStatus.UNAUTHORIZED,
              };
            // });
          }
      }
    } catch (error) {
      next(error);
    }
  };

  disablePaymentLink = async (
    req: Request,
    model: DisabledPaymentLinkViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      const { clinic_id, patient_id, payment_id } = req.body;

      const condition = {
        _id: payment_id,
        patient_id: patient_id,
        clinic_id: clinic_id,
      };
      var updateObj: any = {};

      updateObj["link.url"] = null;
      updateObj["link.resetKey"] = null;

      // Payment entry updated
      const updateStatus = await PaymentModel.findOneAndUpdate(
        condition,
        updateObj
      );
      if (!updateStatus)
        return {
          success: false,
          data: {
            message: errorMessage.billingMsg.paymentNotfound,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };

      if (!updateStatus.link.url)
        return {
          success: false,
          data: {
            message: errorMessage.billingMsg.alreadylinkDisabledSucc,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };

      // !! stripe link disabled
      const clinicStripeDetails = await PAYMENT_GATEWAY_MODEL.findOne({
        clinic_id: model.clinic_id,
      });

      if (!clinicStripeDetails)
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: errorMessage.NO_STRIPE_PAYMENT_GATEWAY_ACCESS,
            error: errorMessage.ON_ADD_ERROR,
          },
        };

      const PRIVATE__STRIPE = require("stripe")(
        clinicStripeDetails!.secret_key
      );

      const paymentLink = await PRIVATE__STRIPE.paymentLinks.update(
        updateStatus.link.id,
        { active: false }
      );

      if (paymentLink) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Payment link disabled successfully`,
          type: EHistoryActivityTypeValues.PAYMENT,
          type_id: userDetails._id,
        });

        return {
          success: true,
          data: errorMessage.billingMsg.linkDisabledSucc,
          status_code: HttpStatus.OK,
        };
      } else
        return {
          success: false,
          data: {
            message: errorMessage.INTERNAL_SERVER_ERROR,
            error: errorMessage.ON_UPDATE_ERROR,
          },
          status_code: HttpStatus.BAD_REQUEST,
        };
    } catch (error) {
      next(error);
    }
  };

  updateDuePayment = async (
    req: Request,
    model: UpdateBillingPaymentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundPaymentDoc = await PaymentModel.findOne({
        _id: model._id,
      });

      if (!foundPaymentDoc) {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.billingMsg.paymentDetailsNotFound,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
      } else {
        if (foundPaymentDoc.status != EBillingStatusValues.DUE)
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.billingMsg.onlyDuePaymentUpdated,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        let modelToSave = <BillingPayment>model;
        let updatePaymentDetails = await PaymentModel.updateOne(
          { _id: foundPaymentDoc._id },
          modelToSave
        );

        if (updatePaymentDetails && updatePaymentDetails.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `Payment  details under status due updated successfully`,
            type: EHistoryActivityTypeValues.PAYMENT,
            type_id: userDetails._id,
          });
          return {
            status_code: HttpStatus.OK,
            success: true,
            data: errorMessage.billingMsg.paymentDetailsUpdated,
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };
  // post payment section
  addPostPayment = async (
    req: Request,
    model: AddPostPaymentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let createdby_id = userDetails._id;

      const {
        checkout_id,
        clinic_id,
        copay,
        allowed_amount,
        insurance_paid,
        secondary_balance_due,
        appointment_id,
        patient_id,
        deductible,
        adjustment,
        co_insurance,
        due_amount,
        superbill_id,
      } = model;

      let superBillDetails = await SuperBillModel.findById(model.superbill_id);

      if (!superBillDetails)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.Not_FOUND_CHARGE_AMOUNT,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      let charge_amount = superBillDetails!.total_amount;
      const insertObj = {
        copay,
        allowed_amount,
        insurance_paid,
        secondary_balance_due,
        clinic_id,
        patient_id,
        appointment_id,
        createdby_id,
        checkout_id,
        deductible,
        adjustment,
        co_insurance,
        due_amount,
        status: EPostBillingStatusValues.POSTED,
        charge_amount,
        superbill_id,
      };

      if (model.due_amount && model.due_amount > 0) {
        const billingPaymentObj: any = {
          patient_id,
          appointment_id,
          clinic_id,
          status: EBillingStatusValues.DUE,
          mode: EBillingModeValues.CASH,
          createdby_id,

          amount: due_amount,
        };

        let addBillingPaymentEntry = await PaymentModel.create(
          billingPaymentObj
        );
      }

      const data = await BillingPostPaymentModel.create(insertObj);

      if (data) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Post Payment details added successfully`,
          type: EHistoryActivityTypeValues.PAYMENT,
          type_id: userDetails._id,
        });
        return {
          success: true,
          data: errorMessage.UPDATE_SUCCESSFULL,
          status_code: HttpStatus.OK,
        };
      } else
        return {
          success: false,
          status_code: HttpStatus.BAD_REQUEST,
          data: errorMessage.billingMsg.errorOccuredMakePayment,
        };
    } catch (error) {
      next(error);
    }
  };

  getPostPaymentDetails = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let populatedFeilds = [
        {
          path: "clinic_id",
          select: { clinic_name: 1, clinic_type: 1 },
        },

        {
          path: "patient_id",
          select: { first_name: 1, last_name: 1 },
        },
        {
          path: "appointment_id",
          select: {},
        },
      ];
      const postPaymentDetailResult = await BillingPostPaymentModel.findById(
        model._id
      ).populate(populatedFeilds);

      if (postPaymentDetailResult && postPaymentDetailResult.patient_id) {
        let patientDoc = <DocumentType<Patients>>(
          postPaymentDetailResult.patient_id
        );
        patientDoc.first_name = Utility.getDecryptText(patientDoc.first_name);

        patientDoc.last_name = Utility.getDecryptText(patientDoc.last_name);
      }

      if (postPaymentDetailResult) {
        return {
          success: true,
          data: postPaymentDetailResult,
          status_code: HttpStatus.OK,
        };
      } else
        return {
          success: false,
          status_code: HttpStatus.BAD_REQUEST,
          data: errorMessage.billingMsg.PostPaymentNotFound,
        };
    } catch (error) {
      next(error);
    }
  };

  getPostPaymentList = async (
    req: Request,
    model: GetPostPaymentListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let populatedFeilds = [
        {
          path: "clinic_id",
          select: { clinic_name: 1, clinic_type: 1 },
        },

        {
          path: "patient_id",
          select: { first_name: 1, last_name: 1 },
        },
        {
          path: "appointment_id",
          select: {},
        },
      ];

      let condition: any = {
        appointment_id: model.appointment_id,
        patient_id: model.patient_id,
      };

      const postPaymentDetailResult = await BillingPostPaymentModel.find(
        condition
      ).populate(populatedFeilds);
      if (postPaymentDetailResult && postPaymentDetailResult.length > 0) {
        postPaymentDetailResult.forEach((obj) => {
          if (obj.patient_id) {
            let patientDoc = <DocumentType<Patients>>obj.patient_id;
            patientDoc.first_name = Utility.getDecryptText(
              patientDoc.first_name
            );

            patientDoc.last_name = Utility.getDecryptText(patientDoc.last_name);
          }
        });

        if (postPaymentDetailResult) {
          return {
            success: true,
            data: postPaymentDetailResult,
            status_code: HttpStatus.OK,
          };
        }
      } else
        return {
          success: false,
          status_code: HttpStatus.BAD_REQUEST,
          data: errorMessage.billingMsg.PostPaymentListNotFound,
        };
    } catch (error) {
      next(error);
    }
  };

  updatePostPayment = async (
    req: Request,
    model: UpdatePostPaymentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let modelToSave = <DocumentType<BillingPostPayment>>model;

      let foundPostPaymentDetails = await BillingPostPaymentModel.findById(
        model._id
      );

      if (!foundPostPaymentDetails)
        return {
          success: false,
          status_code: HttpStatus.BAD_REQUEST,
          data: {
            message: errorMessage.billingMsg.PostPaymentNotFound,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };

      modelToSave.appointment_id = foundPostPaymentDetails.appointment_id;
      modelToSave.patient_id = foundPostPaymentDetails.patient_id;
      modelToSave.checkout_id = foundPostPaymentDetails.checkout_id;
      modelToSave.clinic_id = foundPostPaymentDetails.clinic_id;
      modelToSave.charge_amount = foundPostPaymentDetails.charge_amount;
      modelToSave.createdby_id = foundPostPaymentDetails.createdby_id;

      if (model.status === EPostBillingStatusValues.PUBLISHED) {
        const billingPaymentObj: any = {
          patient_id: foundPostPaymentDetails.patient_id,
          appointment_id: foundPostPaymentDetails.appointment_id,
          clinic_id: foundPostPaymentDetails.clinic_id,
          status: EBillingStatusValues.DUE,
          mode: EBillingModeValues.CASH,
          createdby_id: foundPostPaymentDetails.createdby_id,

          amount: model.due_amount
            ? model.due_amount
            : foundPostPaymentDetails.due_amount,
        };

        let addBillingPaymentEntry = await PaymentModel.create(
          billingPaymentObj
        );
      }

      let updationResult = await BillingPostPaymentModel.updateOne(
        { _id: model._id },
        modelToSave
      );

      if (updationResult && updationResult.modifiedCount > 0) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Post Payment details updated successfully`,
          type: EHistoryActivityTypeValues.PAYMENT,
          type_id: userDetails._id,
        });
        return {
          success: true,
          data: errorMessage.UPDATE_SUCCESSFULL,
          status_code: HttpStatus.OK,
        };
      } else
        return {
          success: false,
          status_code: HttpStatus.BAD_REQUEST,
          data: errorMessage.billingMsg.errorOccuredUpdatePostPayment,
        };
    } catch (error) {
      next(error);
    }
  };

  getSuperBillListForPostPayment = async (
    req: Request,
    model: GetSuperBillListForPostPaymentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      let foundSuperBillList: any;
      let condition: any = {};

      if (model.patient_id) condition.patient_id = model.patient_id;

      if (model.startDateTime || model.endDateTime || model.appt_number) {
        let apptCondition: any = {};

        if (model.appt_number)
          apptCondition.appointment_number = model.appt_number;
        if (model.startDateTime) {
          let startTime = new Date(model.startDateTime);
          startTime.setHours(0, 0, 0, 0);
          let endTime = new Date(model.startDateTime);
          endTime.setHours(23, 59, 59, 999);
          apptCondition.startDateTime = {
            $gte: startTime,
            $lte: endTime,
          };
        }
        if (model.endDateTime) {
          let startTime = new Date(model.endDateTime);
          startTime.setHours(0, 0, 0, 0);
          let endTime = new Date(model.endDateTime);
          endTime.setHours(23, 59, 59, 999);
          apptCondition.endDateTime = {
            $gte: startTime,
            $lte: endTime,
          };
        }
        if (model.patient_id) {
          apptCondition.patient_id = model.patient_id;
        }

        let findAppointmentList = await AppointmentModel.find(apptCondition);

        let allApptIds: any = [];
        findAppointmentList.forEach((x) => {
          allApptIds.push(x._id.toString());
        });

        foundSuperBillList = await SuperBillModel.find({
          appointment_id: { $in: allApptIds },
        });
      }

      foundSuperBillList = await SuperBillModel.find(condition);

      if (model.claim_id) {
        foundSuperBillList = await CLAIM_RESPONSE_DB_MODEL.find(
          {
            _id: model.claim_id,
          },
          { _id: 0, superBillId: 1 }
        ).populate({
          path: "superBillId",
        });

        foundSuperBillList = _.map(
          foundSuperBillList,
          _.property(["superBillId"])
        );
      }

      if (foundSuperBillList && foundSuperBillList.length > 0) {
        return {
          success: true,
          data: foundSuperBillList,
          status_code: HttpStatus.OK,
        };
      } else
        return {
          success: false,
          status_code: HttpStatus.BAD_REQUEST,
          data: {
            message: errorMessage.SUPER_BILL_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  makeCMS1500Form = async (
    req: Request,
    model: MakeAndGetCMS1500Viewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let createdby_id = userDetails._id;

      //      const { checkout_id, clinic_id, appointment_id } = model;

      const { clinic_id, appointment_id } = model;

      let condition = {
        clinic_id: new mongoose.Types.ObjectId(clinic_id!.toString()),
        appointment_id: new mongoose.Types.ObjectId(appointment_id!.toString()),
        // _id: new mongoose.Types.ObjectId(checkout_id!.toString()),
      };

      //const data = await BillingCheckoutModel.aggregate([
      const data = await SuperBillModel.aggregate([
        { $match: condition },

        {
          $lookup: {
            from: "appointment",
            let: { appointment_id: "$appointment_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$appointment_id"],
                  },
                },
              },
            ],
            as: "appointmentData",
          },
        },
        {
          $unwind: {
            path: "$appointmentData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "clinic_locations",
            let: {
              location_id: "$appointmentData.location_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$location_id"],
                  },
                },
              },
              {
                $lookup: {
                  from: "states",
                  let: { state_id: "$state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    { $project: { stateCode: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  city: 1,
                  fed_id: 1,
                  branchName: 1,
                  address: 1,
                  taxonomy: 1,
                  npiNo: 1,
                  mobile_other: 1,
                  postal_code: 1,
                  state: "$stateData.stateCode",
                },
              },
            ],
            as: "locationData",
          },
        },
        {
          $unwind: {
            path: "$locationData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "patients",
            let: { patient_id: "$patient_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$patient_id"],
                  },
                },
              },
              {
                $lookup: {
                  from: "states",
                  let: { state_id: "$state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    { $project: { stateCode: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  city: 1,
                  gender: 1,
                  address: 1,
                  contact: 1,
                  last_name: 1,
                  first_name: 1,
                  patientId: 1,
                  SSN: 1,
                  // patientId: 1,
                  middle_name: 1,
                  postal_code: 1,
                  date_of_birth: 1,
                  responsible_person: 1,
                  state: "$stateData.stateCode",
                },
              },
            ],
            as: "patientData",
          },
        },
        {
          $unwind: {
            path: "$patientData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "doctor",
            localField: "billing_provider_id",
            foreignField: "_id",
            pipeline: [
              {
                $lookup: {
                  from: "users",
                  localField: "user_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        first_name: 1,
                        last_name: 1,
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
                $lookup: {
                  from: "states",
                  let: { state_id: "$state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    { $project: { stateCode: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  first_name: "$userData.first_name",
                  last_name: "$userData.last_name",
                  npiNo: 1,
                  taxonomy: 1,
                  stateCode: "$stateData.stateCode",
                  address: 1,
                  //mobile_home: 1,
                  city: 1,

                  postal_code: 1,
                },
              },
            ],
            as: "billingProviderData",
          },
        },
        {
          $unwind: {
            path: "$billingProviderData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "doctor",
            localField: "rendering_provider_id",
            foreignField: "_id",
            pipeline: [
              {
                $lookup: {
                  from: "users",
                  localField: "user_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        first_name: 1,
                        last_name: 1,
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
                $lookup: {
                  from: "states",
                  let: { state_id: "$state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    { $project: { stateCode: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  first_name: "$userData.first_name",
                  last_name: "$userData.last_name",
                  npiNo: 1,
                  taxonomy: 1,
                  stateCode: "$stateData.stateCode",
                  address: 1,
                  //mobile_home: 1,
                  city: 1,

                  postal_code: 1,
                },
              },
            ],
            as: "renderingProviderData",
          },
        },
        {
          $unwind: {
            path: "$renderingProviderData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "doctor",
            let: { doctor_id: "$referring_provider_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$doctor_id"],
                  },
                },
              },
              {
                $lookup: {
                  from: "states",
                  let: { state_id: "$state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    { $project: { stateCode: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  npiNo: 1,
                  user_id: 1,
                  address: 1,
                  //taxonomy: { $ifNull: ["$taxonomy", ""] },
                  //mobile_home: 1,
                  city: 1,
                  stateCode: "$stateData.stateCode",
                  postal_code: 1,
                },
              },
            ],
            as: "doctorCollectionData",
          },
        },
        {
          $unwind: {
            path: "$doctorCollectionData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "users",
            let: {
              user_id: "$doctorCollectionData.user_id",
              npiNo: "$doctorCollectionData.npiNo",
              city: "$doctorCollectionData.city",
              stateCode: "$doctorCollectionData.stateCode",
              postal_code: "$doctorCollectionData.postal_code",
              address: "$doctorCollectionData.address",
              //taxonomy: "$doctorCollectionData.taxonomy",
              //mobile_home: "$doctorCollectionData.mobile_home",
            },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$user_id"] },
                },
              },

              {
                $project: {
                  first_name: 1,
                  last_name: 1,
                  mobile_no: 1,
                  image: 1,
                  npiNo: "$$npiNo",
                  address: "$$address",
                  city: "$$city",
                  //mobile_no: 1,
                  //mobile_home: "$$mobile_home",
                  //state: "$stateData.stateCode",
                  state: "$$stateCode",
                  postal_code: "$$postal_code",
                  // city: 1,
                },
              },
            ],
            as: "doctorData",
          },
        },
        {
          $unwind: {
            path: "$doctorData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "insurance",
            let: {
              //patient_id: "$patient_id",
              insurance_id: "$insurance_id",
              //coverage: "$insurance.coverage",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$_id", "$$insurance_id"],
                      },
                      // {
                      //   $eq: ["$coverage", "$$coverage"],
                      // },
                    ],
                  },
                },
              },
              {
                $lookup: {
                  from: "insurance_companies",
                  localField: "insurance_company_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        companyName: 1,
                      },
                    },
                  ],
                  as: "insuranceCompanyData",
                },
              },
              {
                $unwind: {
                  path: "$insuranceCompanyData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "eap",
                  localField: "patient_id",
                  foreignField: "patient_id",
                  pipeline: [
                    {
                      $project: {
                        authNumber: 1,
                      },
                    },
                  ],
                  as: "eapData",
                },
              },
              {
                $unwind: {
                  path: "$eapData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "states",
                  let: { state_id: "$insurance_state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    //{ $project: { stateCode: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              //{ $project: { codes: 0, stateData: 1 } },
            ],
            as: "insuranceData",
          },
        },
        {
          $unwind: {
            path: "$insuranceData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "icts",
            let: { code_id: "$icd" },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ["$_id", "$$code_id"] },
                },
              },
              { $project: { ictCode: 1 } },
            ],
            as: "ICD_10",
          },
        },

        {
          $lookup: {
            from: "cpt",
            let: { code_id: "$cpt.cpt_code_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ["$_id", "$$code_id"] },
                },
              },
              { $project: { cptCode: 1, price: 1 } },
            ],
            as: "cptCodeData",
          },
        },

        {
          $lookup: {
            from: "clinic",
            localField: "clinic_id",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  clinic_name: 1,
                  mobile_no: 1,
                },
              },
            ],
            as: "clinicData",
          },
        },
        {
          $unwind: {
            path: "$clinicData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "super_bill_other_detail",
            localField: "_id",
            foreignField: "super_bill_id",
            pipeline: [
              {
                $project: {
                  additional_cliam_info: 1,
                  original_ref_no: 1,
                  resubmission_no: 1,
                },
              },
            ],
            as: "superBillOtherDetail",
          },
        },
        {
          $unwind: {
            path: "$superBillOtherDetail",
            preserveNullAndEmptyArrays: true,
          },
        },

        //superBillOtherDetail
        {
          $lookup: {
            from: "modifiers",
            localField: "cpt.modifier",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  modifierCode: 1,
                  description: 1,
                },
              },
            ],
            as: "modifierData",
          },
        },

        {
          $project: {
            _id: 0,
            paper: 1,
            ICD_10: 1,
            doctorData: 1,
            cptCodeData: 1,
            patientData: 1,
            locationData: 1,
            orignalRefNo: 1,
            typeOfService: 1,
            insuranceData: 1,
            place_of_service: 1,
            // typeOfService: 1,
            placeOfService: 1,
            // appointment_id: 1,
            accept_assignment: 1,
            resubmissionCode: 1,
            // acceptAssignment: 1,
            checkout_id: "$_id",
            financialClass_id: 1,
            checkoutTime: "$checkoutTime",
            //appliedCptCodes: "$codes.cptCode",
            appliedCptCodes: "$cpt",
            appointment_id: "$appointment_id",
            //insurancePortion: "$insurance.amount",
            insurancePortion: "$total_amount",
            endDateTime: "$appointmentData.endDateTime",
            checkInTime: "$appointmentData.startDateTime",
            startDateTime: "$appointmentData.startDateTime",
            appointment_number: "$appointmentData.appointment_number",
            billingProviderData: 1,
            renderingProviderData: 1,
            clinicData: 1,
            modifierData: 1,
            additional_cliam_info:
              "$superBillOtherDetail.additional_cliam_info",
            original_ref_no: "$superBillOtherDetail.original_ref_no",
            resubmission_no: "$superBillOtherDetail.resubmission_no",
          },
        },
      ]);

      if (data.length) {
        const dataForCMS1500 = data[0];

        if (!dataForCMS1500.ICD_10.length)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.appointmentMsg.checkoutCodeReq,
            },
          };

        dataForCMS1500.patientData.SSN = dataForCMS1500.patientData.SSN
          ? dataForCMS1500.patientData.SSN
          : "";
        dataForCMS1500.patientData.city = dataForCMS1500.patientData.city
          ? dataForCMS1500.patientData.city.toUpperCase()
          : "";
        dataForCMS1500.patientData.gender = dataForCMS1500.patientData.gender
          ? dataForCMS1500.patientData.gender.toUpperCase()
          : "";
        dataForCMS1500.patientData.address = dataForCMS1500.patientData.address
          ? dataForCMS1500.patientData.address.toUpperCase()
          : "";
        dataForCMS1500.patientData.last_name = dataForCMS1500.patientData
          .last_name
          ? Utility.getDecryptText(dataForCMS1500.patientData.last_name)
          : "";
        dataForCMS1500.patientData.first_name = dataForCMS1500.patientData
          .first_name
          ? Utility.getDecryptText(dataForCMS1500.patientData.first_name)
          : "";
        dataForCMS1500.patientData.middle_name = dataForCMS1500.patientData
          .middle_name
          ? Utility.getDecryptText(dataForCMS1500.patientData.middle_name)
          : "";
        dataForCMS1500.patientData.postal_code = dataForCMS1500.patientData
          .postal_code
          ? dataForCMS1500.patientData.postal_code
          : "";

        let preferedMobileNumber = "",
          preferedMobileAreaCode = "";
        if (dataForCMS1500.patientData.contact.prefered.mobileNo) {
          // const encrytedText = Utility.getDecryptText(
          //   dataForCMS1500.patientData.contact.prefered.mobileNo
          // );

          const encrytedText =
            dataForCMS1500.patientData.contact.prefered.mobileNo;
          preferedMobileNumber = `${encrytedText.substring(
            3,
            6
          )}-${encrytedText.substring(6)}`;
          preferedMobileAreaCode = encrytedText.substring(0, 3);
        }
        console.log(__dirname + "/healthform", "  __dirname");

        //require("../../../../../healthform/EDI_TEXT");

        const formPdfBytes = fs.readFileSync(
            path.join(
              __dirname,
              "../../../../../healthform",
              "form-cms1500.pdf"
            )
          ),
          pdfDoc = await PDFDocument.load(formPdfBytes),
          form = pdfDoc.getForm();

        if (!dataForCMS1500.patientData)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.NOT_FOUND,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        if (!dataForCMS1500.insuranceData)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.insuranceMsg.notFound,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        // Header
        const insurance_name =
            dataForCMS1500.insuranceData.insuranceCompanyData.companyName.toUpperCase(),
          insurance_address =
            dataForCMS1500.insuranceData.insurance_address.toUpperCase(),
          insurance_address2 = "",
          insurance_city_state_zip = `${dataForCMS1500.insuranceData.insurance_city.toUpperCase()}, ${dataForCMS1500.insuranceData.stateData.stateCode.toUpperCase()} ${dataForCMS1500.insuranceData.insurance_zip_code.toUpperCase()}`,
          insurance_id = dataForCMS1500.insuranceData.subscriber_id,
          pt_name = `${dataForCMS1500.patientData.last_name},${dataForCMS1500.patientData.first_name}`,
          patient_dob_split =
            dataForCMS1500.patientData.date_of_birth.split("/"),
          // birth_mm = moment(dataForCMS1500.patientData.date_of_birth).format(
          //   "MM"
          // ),
          // birth_dd = moment(dataForCMS1500.patientData.date_of_birth).format(
          //   "DD"
          // ),
          // birth_yy = moment(dataForCMS1500.patientData.date_of_birth).format(
          //   "YY"
          // ),
          birth_mm = patient_dob_split[0],
          birth_dd = patient_dob_split[1],
          birth_yy = patient_dob_split[2],
          ins_name = `${dataForCMS1500.insuranceData.subscriber_last_name.toUpperCase()},${dataForCMS1500.insuranceData.subscriber_first_name.toUpperCase()}`,
          pt_zip = dataForCMS1500.patientData.postal_code,
          pt_city = dataForCMS1500.patientData.city.toUpperCase(),
          pt_state = dataForCMS1500.patientData.state.toUpperCase(),
          pt_phone = preferedMobileNumber,
          pt_street = dataForCMS1500.patientData.address.toUpperCase(),
          pt_AreaCode = preferedMobileAreaCode,
          ins_zip =
            dataForCMS1500.insuranceData.subscriber_zip_code.toUpperCase(),
          ins_city = dataForCMS1500.insuranceData.subscriber_city.toUpperCase(),
          ins_state =
            dataForCMS1500.insuranceData.stateData.stateCode.toUpperCase(),
          ins_phone = preferedMobileNumber,
          ins_street =
            dataForCMS1500.insuranceData.subscriber_address.toUpperCase(),
          // ins_phone_area = dataForCMS1500.insuranceData.mobile_no.substring(
          //   0,
          //   3
          // ),
          ins_phone_area = preferedMobileAreaCode,
          //preferedMobileNumber, preferedMobileAreaCode;
          ins_dob_split = dataForCMS1500.insuranceData.date_of_birth.split("/"),
          ins_dob_mm = ins_dob_split[0],
          ins_dob_dd = ins_dob_split[1],
          ins_dob_yy = ins_dob_split[2],
          // ins_dob_mm = moment(
          //   dataForCMS1500.insuranceData.date_of_birth
          // ).format("MM"),
          // ins_dob_dd = moment(
          //   dataForCMS1500.insuranceData.date_of_birth
          // ).format("DD"),
          // ins_dob_yy = moment(
          //   dataForCMS1500.insuranceData.date_of_birth
          // ).format("YY"),
          pt_date = moment(new Date()).format("MM-DD-YY"),
          amt_paid = "00  00",
          [a, b] = dataForCMS1500.insurancePortion
            .toFixed(2)
            .toString()
            .split("."),
          t_charge = a + "  " + b,
          physician_signature =
            dataForCMS1500.renderingProviderData.first_name +
            " " +
            dataForCMS1500.renderingProviderData.last_name,
          doc_name =
            dataForCMS1500.billingProviderData.last_name +
            " " +
            dataForCMS1500.billingProviderData.first_name,
          clinic_name = dataForCMS1500.clinicData.clinic_name,
          // clinic_location =
          //   dataForCMS1500.clinicData.city && dataForCMS1500.clinicData.state
          //     ? `${
          //         dataForCMS1500.clinicData.city
          //           ? dataForCMS1500.clinicData.city
          //           : ""
          //       }, ${
          //         dataForCMS1500.clinicData.state
          //           ? dataForCMS1500.clinicData.state
          //           : ""
          //       } ${
          //         dataForCMS1500.clinicData.postal_code
          //           ? dataForCMS1500.clinicData.postal_code
          //           : ""
          //       }`
          //     : "",
          // clinic_street = dataForCMS1500.clinicData.address
          //   ? dataForCMS1500.clinicData.address
          //   : "",
          // clinic_npi = dataForCMS1500.clinicData.npiNo
          //   ? dataForCMS1500.clinicData.npiNo
          //   : "",
          location_phone_area = dataForCMS1500.locationData.mobile_other
            ? dataForCMS1500.locationData.mobile_other.substr(0, 3)
            : "",
          location_phone = dataForCMS1500.locationData.mobile_other
            ? dataForCMS1500.locationData.mobile_other.substr(3, 9)
            : "",
          physician_date = pt_date,
          fac_street = dataForCMS1500.locationData.address,
          fac_name = dataForCMS1500.locationData.branchName,
          fac_location = `${dataForCMS1500.locationData.city}, ${dataForCMS1500.locationData.state} ${dataForCMS1500.locationData.postal_code}`,
          doc_street = dataForCMS1500.billingProviderData.address,
          doc_location = `${dataForCMS1500.billingProviderData.city}, ${dataForCMS1500.billingProviderData.stateCode} ${dataForCMS1500.billingProviderData.postal_code}`,
          pin1 = dataForCMS1500.doctorData.npiNo,
          doc_phone_area = dataForCMS1500.billingProviderData.mobile_no
            ? dataForCMS1500.billingProviderData.mobile_no
                .toString()
                .substr(0, 3)
            : "",
          doc_phone = dataForCMS1500.billingProviderData.mobile_no
            ? dataForCMS1500.billingProviderData.mobile_no
                .toString()
                .substr(3, 9)
            : "",
          pin = dataForCMS1500.locationData.npiNo,
          tax_id = dataForCMS1500.locationData.fed_id,
          pt_account = dataForCMS1500.patientData.patientId,
          medicaid_resub = dataForCMS1500.resubmission_no
            ? dataForCMS1500.resubmission_no
            : 1,
          original_ref = dataForCMS1500.original_ref_no
            ? dataForCMS1500.original_ref_no
            : "",
          pt_signature = "Signature on file",
          ins_signature = "Signature on file",
          additional_claim_info = dataForCMS1500.additional_cliam_info
            ? dataForCMS1500.additional_cliam_info
            : "";
        //pt_signature = `${dataForCMS1500.patientData.first_name} ${dataForCMS1500.patientData.last_name}`,
        //ins_signature = `${dataForCMS1500.insuranceData.subscriber_first_name} ${dataForCMS1500.insuranceData.subscriber_last_name}`;

        // console.log(
        //   "dataForCMS1500.doctorData  ",
        //   dataForCMS1500.doctorData.mobile_no.toString().substr(3, 9)
        // );

        // const fields = form.getFields();
        // fields.forEach((field: any) => {
        //   const type = field.constructor.name;
        //   const name = field.getName();
        //   //console.log(name, type);
        //   if (type == "PDFTextField") {
        //     console.log(name, type);
        //     form.getTextField(name).setText(name.substring(0, 2));
        //   }
        // });

        form.getTextField("insurance_name").setText(insurance_name);
        form.getTextField("insurance_address").setText(insurance_address);
        form.getTextField("insurance_address2").setText(insurance_address2);
        form
          .getTextField("insurance_city_state_zip")
          .setText(insurance_city_state_zip);
        form.getTextField("insurance_id").setText(insurance_id);
        form.getTextField("pt_name").setText(pt_name);
        form.getTextField("birth_mm").setText(birth_mm);
        form.getTextField("birth_dd").setText(birth_dd);
        form.getTextField("birth_yy").setText(birth_yy);
        form.getTextField("ins_name").setText(ins_name);
        form.getTextField("pt_zip").setText(pt_zip);
        form.getTextField("pt_city").setText(pt_city);
        form.getTextField("pt_state").setText(pt_state);
        form.getTextField("pt_phone").setText(pt_phone);
        form.getTextField("pt_street").setText(pt_street);
        form.getTextField("pt_AreaCode").setText(pt_AreaCode);
        form.getTextField("ins_zip").setText(ins_zip);
        form.getTextField("ins_city").setText(ins_city);
        form.getTextField("ins_state").setText(ins_state);
        form.getTextField("ins_phone").setText(ins_phone);
        form.getTextField("ins_street").setText(ins_street);
        form.getTextField("ins_phone area").setText(ins_phone_area);
        form.getTextField("ins_dob_mm").setText(ins_dob_mm);
        form.getTextField("ins_dob_dd").setText(ins_dob_dd);
        form.getTextField("ins_dob_yy").setText(ins_dob_yy);
        form.getTextField("ins_plan_name").setText(insurance_name);
        form.getTextField("pt_signature").setText(pt_signature);
        form.getTextField("ins_signature").setText(ins_signature);
        form.getTextField("pt_date").setText(pt_date);
        form.getTextField("96").setText(additional_claim_info); //additional claim info

        //refering fields 17

        form.getTextField("85").setText("DN");
        form
          .getTextField("ref_physician")
          .setText(
            dataForCMS1500.doctorData.first_name.toUpperCase() +
              " " +
              dataForCMS1500.doctorData.last_name.toUpperCase()
          );

        form
          .getTextField("id_physician")
          .setText(dataForCMS1500.doctorData.npiNo.toUpperCase());

        let rendering_provider_taxonomy =
          "taxonomy" in dataForCMS1500.locationData
            ? dataForCMS1500.locationData.taxonomy.toUpperCase()
            : "";
        if (rendering_provider_taxonomy != "") {
          form.getTextField("physician number 17a1").setText("ZZ");

          form
            .getTextField("physician number 17a")
            .setText(rendering_provider_taxonomy);
        }

        ////////////////////

        // form.getTextField("grp").setText("12123423432");
        // form.getTextField("Suppl").setText("32234234334");

        // form.getTextField("ch1").setText("ch");

        // form.getTextField("local1a").setText("loc");

        //form.getTextField("276").setText("loc");
        // form.getTextField("245").setText("loc");

        // form.getTextField("223").setText("223");
        // form.getTextField("201").setText("201");
        // form.getTextField("179").setText("179");
        // form.getTextField("157").setText("157");
        // form.getTextField("135").setText("135");
        dataForCMS1500.ICD_10.forEach((el: any, i: any) =>
          form
            .getTextField("diagnosis" + (i + 1))
            .setText(el.ictCode.replace(".", ""))
        );
        const [fm, fd, fy] = moment(dataForCMS1500.startDateTime)
            .format("MM-DD-YY")
            .split("-"),
          [tm, td, ty] = moment(dataForCMS1500.endDateTime)
            .format("MM-DD-YY")
            .split("-");

        let upperLineBillingProvider = ""; //PRV*BI*PXC*100000000X~
        let lowerLineRenderingProvider = "";

        dataForCMS1500.appliedCptCodes.forEach((el, i) => {
          i = (i + 1).toString();
          const fromMonth = "sv" + i + "_mm_from",
            fromDate = "sv" + i + "_dd_from",
            fromYear = "sv" + i + "_yy_from",
            toMonth = "sv" + i + "_mm_end",
            toDate = "sv" + i + "_dd_end",
            toYear = "sv" + i + "_yy_end",
            placeOfService = "place" + i,
            //placeOfService = dataForCMS1500.place_of_service,
            pointer = "diag" + i,
            cptCode = "cpt" + i,
            local = "local" + i,
            charge = "ch" + i,
            unit = "day" + i;
          //emg = "emg" + i;

          //modifier = "mod" + i + "a";
          el.modifier.forEach((m, j) => {
            //m.toString();

            let foundModifier = dataForCMS1500.modifierData.find(
              (o) => o._id.toString() == m.toString()
            );
            if (j < 3) {
              if (j == 0)
                form
                  .getTextField("mod" + i + "a")
                  .setText(foundModifier.modifierCode);
              if (j == 1)
                form
                  .getTextField("mod" + i + "b")
                  .setText(foundModifier.modifierCode);
              if (j == 2)
                form
                  .getTextField("mod" + i + "c")
                  .setText(foundModifier.modifierCode);
            }
          });

          form.getTextField(fromMonth).setText(fm);
          form.getTextField(fromDate).setText(fd);
          form.getTextField(fromYear).setText(fy);
          form.getTextField(toMonth).setText(tm);
          form.getTextField(toDate).setText(td);
          form.getTextField(toYear).setText(ty);
          //form.getTextField(modifier).setText("95");
          form
            .getTextField(placeOfService)
            .setText(
              dataForCMS1500.place_of_service
                ? dataForCMS1500.place_of_service
                : placeOfService
            );
          const cptCodeEl = dataForCMS1500.cptCodeData.filter(
            (el1) => el1._id.toString() == el.cpt_code_id.toString()
          )[0];
          el.cptCodeEl = cptCodeEl;

          let pointerValue = "";
          form.getTextField(cptCode).setText(cptCodeEl.cptCode);
          // dataForCMS1500.ICD_10.forEach((data, i) => {
          //   console.log(data, "_________", i, JSON.stringify(el.icd));
          //   el.icd.includes(i) &&
          //     (pointerValue += String.fromCharCode(i + 1 + 64));
          // });
          el.icd.forEach((data, i) => {
            pointerValue += String.fromCharCode(data + 1 + 64);
          });
          form.getTextField(pointer).setText(pointerValue);
          const [a, b] = (cptCodeEl.price * el.unit)
              .toFixed(2)
              .toString()
              .split("."),
            chargeString = a + "  " + b;
          form.getTextField(charge).setText(chargeString);
          form.getTextField(unit).setText(el.unit.toString());

          form
            .getTextField(local)
            .setText(dataForCMS1500.renderingProviderData.npiNo.toUpperCase());

          // form.getTextField('local1a').setText('1N')
        });

        //CHECKING IF INSURANCE TYPE IS MEDICAD
        if (
          dataForCMS1500.insuranceData.insurance_plan_type == "MC" &&
          (dataForCMS1500.insuranceData.coverage == "Primary" ||
            dataForCMS1500.insuranceData.coverage == "Secondary")
        ) {
          let rendering_taxonomy =
            "taxonomy" in dataForCMS1500.locationData
              ? dataForCMS1500.locationData.taxonomy
              : "";

          let billing_taxonomy = "ZZ";
          billing_taxonomy +=
            "taxonomy" in dataForCMS1500.locationData
              ? dataForCMS1500.locationData.taxonomy
              : "";

          form.getTextField("grp").setText(billing_taxonomy);

          form.getTextField("emg1").setText("ZZ");
          form.getTextField("local1a").setText(rendering_taxonomy);

          upperLineBillingProvider = `PRV*BI*PXC*${
            "taxonomy" in dataForCMS1500.locationData
              ? dataForCMS1500.locationData.taxonomy
              : ""
          }~`;

          lowerLineRenderingProvider = `PRV*PE*PXC*${
            "taxonomy" in dataForCMS1500.locationData
              ? dataForCMS1500.locationData.taxonomy
              : ""
          }~`;

          // form.getTextField("local1").setText("a");
          // form.getTextField("local2a").setText("v");
          // form.getTextField("local2").setText("c");
          // form.getTextField("local3a").setText("d");
          // form.getTextField("local4a").setText("e");
          // form.getTextField("local3").setText("f");

          // form.getTextField("local5a").setText("g");
          // form.getTextField("local5").setText("h");
          // form.getTextField("local6a").setText("u");
          // form.getTextField("local6").setText("k");
        }

        form.getTextField("tax_id").setText(tax_id);
        form.getTextField("pt_account").setText(pt_account);
        form.getTextField("amt_paid").setText(amt_paid);
        form.getTextField("t_charge").setText(t_charge);
        form.getTextField("physician_signature").setText(physician_signature);
        form.getTextField("physician_date").setText(physician_date);
        form.getTextField("fac_street").setText(fac_street);
        form.getTextField("fac_location").setText(fac_location);
        form
          .getTextField("pin1")
          .setText(dataForCMS1500.renderingProviderData.npiNo.toUpperCase());
        // form.getTextField('doc_phone area').setText('2Z')
        // form.getTextField('doc_phone').setText('4P')
        form.getTextField("doc_street").setText(fac_street);
        form.getTextField("doc_location").setText(fac_location);
        form.getTextField("pin").setText(pin);
        //form.getTextField("pin").setText(pin);
        form.getTextField("original_ref").setText(original_ref);
        form.getTextField("doc_name").setText(clinic_name);
        form.getTextField("fac_name").setText(fac_name);

        form
          .getTextField("doc_phone area")
          .setText(location_phone_area.toString());
        form.getTextField("doc_phone").setText(location_phone.toString());
        form.getTextField("99icd").setText("0");

        if (medicaid_resub != 1 || medicaid_resub != "1") {
          form.getTextField("medicaid_resub").setText(medicaid_resub);

          if (
            dataForCMS1500.insuranceData.eapData &&
            "authNumber" in dataForCMS1500.insuranceData.eapData
          ) {
            form
              .getTextField("prior_auth")
              .setText(dataForCMS1500.insuranceData.eapData.authNumber);
          }
        }

        // if (dataForCMS1500.insuranceData.eapData) {
        // } else {
        // }
        // ? DUMMY VALUES START
        // form.getCheckBox('276').check()
        // form.getCheckBox('sex').check() // '/M', '/F'
        // form.getCheckBox('lab').check() // '/YES', '/NO'
        // form.getCheckBox('ssn').check() // '/SSN', '/EIN'
        // form.getCheckBox('employment').check() // '/YES', '/NO'
        // form.getCheckBox('ins_sex').check() // '/MALE', '/FEMALE'
        // form.getCheckBox('assignment').check('NO') // '/YES', '/NO'
        // form.getCheckBox('other_accident').check() // '/YES', '/NO'
        // form.getCheckBox('pt_auto_accident').check() // '/YES', '/NO'
        // form.getCheckBox('ins_benefit_plan').check() // '/YES', '/NO'
        // form.getCheckBox('rel_to_ins').check() // '/S', '/M', '/C', 'O'
        // form.getCheckBox('insurance_type').check() // '/Medicare', '/Medicaid', '/Tricare', '/Champva', '/Group', '/Feca', '/Other'
        // ? DUMMY VALUES END

        // form.getCheckBox('insurance_type').check()

        const insuranceType_box = createPDFAcroFields(
            form.getCheckBox("insurance_type").acroField.Kids()
          ).map((_) => _[0]),
          insuranceType_value =
            dataForCMS1500.insuranceData.insurance_plan_type;

        insuranceTypeLoop: for (let i = 0; i < insuranceType_box.length; i++) {
          const checkBox = insuranceType_box[i];

          if (
            insuranceType_value == "MB" &&
            checkBox.getOnValue().encodedName === "/Medicare"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break insuranceTypeLoop;
          }

          // console.log(
          //   "insuranceType_value == MC ",
          //   checkBox.getOnValue().encodedName
          // );

          if (
            insuranceType_value == "MC" &&
            checkBox.getOnValue().encodedName === "/Medicaid"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break insuranceTypeLoop;
          }

          if (
            insuranceType_value == "CI" &&
            checkBox.getOnValue().encodedName === "/Other"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break insuranceTypeLoop;
          }
        }

        const assignment_box = createPDFAcroFields(
            form.getCheckBox("assignment").acroField.Kids()
          ).map((_) => _[0]),
          assignment_value = dataForCMS1500.accept_assignment ? "A" : "C";

        assignmentLoop: for (let i = 0; i < assignment_box.length; i++) {
          const checkBox = assignment_box[i];

          if (
            assignment_value == "A" &&
            checkBox.getOnValue().encodedName === "/YES"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break assignmentLoop;
          }

          if (
            assignment_value == "C" &&
            checkBox.getOnValue().encodedName === "/NO"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break assignmentLoop;
          }
        }

        const subscriber_gender_box = createPDFAcroFields(
            form.getCheckBox("ins_sex").acroField.Kids()
          ).map((_) => _[0]),
          subscriber_gender_value =
            dataForCMS1500.insuranceData.subscriber_gender == "M"
              ? "Male"
              : "Female";

        subGenderLoop: for (let i = 0; i < subscriber_gender_box.length; i++) {
          const checkBox = subscriber_gender_box[i];

          if (
            subscriber_gender_value == "Male" &&
            checkBox.getOnValue().encodedName === "/MALE"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break subGenderLoop;
          }

          if (
            subscriber_gender_value == "Female" &&
            checkBox.getOnValue().encodedName === "/FEMALE"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break subGenderLoop;
          }
        }

        const ssn_box = createPDFAcroFields(
          form.getCheckBox("ssn").acroField.Kids()
        ).map((_) => _[0]);
        ssn_box[1].setValue(ssn_box[1].getOnValue());

        const rel_to_ins_box = createPDFAcroFields(
            form.getCheckBox("rel_to_ins").acroField.Kids()
          ).map((_) => _[0]),
          rel_to_ins_value = dataForCMS1500.insuranceData.relationship;
        //console.log(rel_to_ins_value, "rel to insures");

        rel_to_insLoop: for (let i = 0; i < rel_to_ins_box.length; i++) {
          const checkBox = rel_to_ins_box[i];
          //18,01,19
          if (
            rel_to_ins_value == "Self" &&
            checkBox.getOnValue().encodedName === "/S"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break rel_to_insLoop;
          }

          if (
            rel_to_ins_value == "Spouse" &&
            checkBox.getOnValue().encodedName === "/M"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break rel_to_insLoop;
          }

          if (
            rel_to_ins_value == "Child" &&
            checkBox.getOnValue().encodedName === "/C"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break rel_to_insLoop;
          }

          if (checkBox.getOnValue().encodedName === "/O") {
            checkBox.setValue(checkBox.getOnValue());
            break rel_to_insLoop;
          }
        }

        const patient_gender_box = createPDFAcroFields(
            form.getCheckBox("sex").acroField.Kids()
          ).map((_) => _[0]),
          patient_gender_value =
            dataForCMS1500.patientData.gender == "M" ? "Male" : "Female";

        patientGenderLoop: for (let i = 0; i < patient_gender_box.length; i++) {
          const checkBox = patient_gender_box[i];

          if (
            patient_gender_value == "Male" &&
            checkBox.getOnValue().encodedName === "/M"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break patientGenderLoop;
          }

          if (
            patient_gender_value == "Female" &&
            checkBox.getOnValue().encodedName === "/F"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break patientGenderLoop;
          }
        }

        const employment_box = createPDFAcroFields(
          form.getCheckBox("employment").acroField.Kids()
        ).map((_) => _[0]);

        for (let i = 0; i < employment_box.length; i++) {
          if (employment_box[i].getOnValue().encodedName === "/NO") {
            employment_box[i].setValue(employment_box[i].getOnValue());
          }
        }

        const other_accident_box = createPDFAcroFields(
          form.getCheckBox("other_accident").acroField.Kids()
        ).map((_) => _[0]);

        for (let i = 0; i < other_accident_box.length; i++) {
          if (other_accident_box[i].getOnValue().encodedName === "/NO") {
            other_accident_box[i].setValue(other_accident_box[i].getOnValue());
          }
        }

        const pt_auto_accident_box = createPDFAcroFields(
          form.getCheckBox("pt_auto_accident").acroField.Kids()
        ).map((_) => _[0]);

        for (let i = 0; i < pt_auto_accident_box.length; i++) {
          if (pt_auto_accident_box[i].getOnValue().encodedName === "/NO") {
            pt_auto_accident_box[i].setValue(
              pt_auto_accident_box[i].getOnValue()
            );
          }
        }

        /**
            ? Code by Charanjit
            const kids = createPDFAcroFields(form.getCheckBox('insurance_type').acroField. Kids()).map((_) => _[0])
            kids.forEach((kid) => {
              console.log(kid.getOnValue().encodedName)
              if (kid.getOnValue().encodedName === '/Tricare') {
                //console.log('in true')
                kid.setValue(kid.getOnValue()) // Check that particular checkbox.
              } else {
                kid.setValue(PDFName.of('Off')) // Uncheck the checkbox
              }
            })
          */

        form.getFields().forEach((field) => field.enableReadOnly());

        const pdfBytes = await pdfDoc.save();

        await fs.writeFileSync(
          path.join(
            __dirname,
            `../../../../../public/upload/billing/CMS/CMS_${dataForCMS1500.appointment_id.toString()}.pdf`
          ),
          pdfBytes
        );

        // ! EDI FILES

        // ? DUMMY DATA START
        // const ediDataObject = {
        //   applicationReceiverId: '030240928',
        //   interchangeDateYYMMDD: '220120',
        //   interchangeDate: '20220120',
        //   interchangeTime: '1210',
        //   interchangeControlNumber: '369852970',
        //   providerFN: 'MCKINLEY',
        //   providerLN: 'MIYUME',
        //   providerAddress: '302 W. 5th St., Suite 308',
        //   providerCity: 'SAN PEDRO',
        //   providerStateCode: 'CA',
        //   providerZipCode: '907312750',
        //   locationFedID: '475303589',
        //   insurancePlanType: 'MC',
        //   subscriberRelationship: '1',
        //   patientSSN: 'SEY361A73265',
        //   subscriberLN: 'BESS',
        //   subscriberFN: 'SHIRLAN',
        //   insuranceType: 'P',
        //   subscriberAddress: '712 S PEARL AVE',
        //   subscriberCity: 'COMPTON',
        //   insuranceCity: 'LOS ANGELES',
        //   subscriberStateCode: 'CA',
        //   subscriberZipCode: '90221',
        //   subscriberDOB: '19790722',
        //   subscriberGender: 'M',
        //   subscriberPayerId: '47198',
        //   insuranceName: 'ANTHEM BLUE CROSS',
        //   insuranceAddress: 'P O BOX 60007',
        //   insuranceStateCode: 'P O BOX 60007',
        //   insuranceStateCode: 'CA',
        //   insuranceZipCode: '90060',
        //   patientLN: 'BESS',
        //   patientFN: 'AKILAH',
        //   patientMN: '',
        //   patientAddress: '712 S PEARL AVE',
        //   patientCity: 'COMPTON',
        //   patientStateCode: 'CA',
        //   patientZipCode: '90221',
        //   patientDOB: '19810928',
        //   patientGender: 'F',
        // }
        // ? DUMMY DATA START

        const getGender = (value) => {
          let gender;

          switch (value) {
            case "Male":
              gender = "M";
              break;
            case "Female":
              gender = "F";
              break;
            default:
              gender = "O";
              break;
          }

          return gender;
        };

        let stirngAfterClaim = "";

        if (
          dataForCMS1500.insuranceData.eapData &&
          "authNumber" in dataForCMS1500.insuranceData.eapData &&
          (medicaid_resub != 1 || medicaid_resub != "1")
        ) {
          //stirngAfterClaim = `REF*G1*${dataForCMS1500.insuranceData.eapData.authNumber}`;
          stirngAfterClaim =
            `CLM*${pt_account}*${dataForCMS1500.insurancePortion}***${
              dataForCMS1500.place_of_service
            }:B:${medicaid_resub}*Y*${
              dataForCMS1500.accept_assignment ? "A" : "C"
            }*Y*Y~` +
            "\n" +
            `REF*G1*${dataForCMS1500.insuranceData.eapData.authNumber}~` +
            "\n" +
            `REF*F8*${dataForCMS1500.original_ref_no}~`;
        } else if (medicaid_resub != 1 || medicaid_resub != "1") {
          stirngAfterClaim =
            `CLM*${pt_account}*${dataForCMS1500.insurancePortion}***${
              dataForCMS1500.place_of_service
            }:B:${medicaid_resub}*Y*${
              dataForCMS1500.accept_assignment ? "A" : "C"
            }*Y*Y~` +
            "\n" +
            `REF*F8*${dataForCMS1500.original_ref_no}~`;
        } else {
          //stirngAfterClaim = `REF*F8*${dataForCMS1500.original_ref_no}`;

          stirngAfterClaim = `CLM*${pt_account}*${
            dataForCMS1500.insurancePortion
          }***${dataForCMS1500.place_of_service}:B:${medicaid_resub}*Y*${
            dataForCMS1500.accept_assignment ? "A" : "C"
          }*Y*Y~`;
        }

        let cptArray: string[] = [];
        //"${el.cptCodeEl.cptCode}*${el.cptCodeEl.price}*UN*${el.unit}";
        ///////////////////////

        //el.modifier.forEach((m, j) => {

        //////////////////////////
        let pointer_string_arr: string[] = [];
        dataForCMS1500.appliedCptCodes.forEach((el, i) => {
          let cptLine = "";
          let cptCodeEl = dataForCMS1500.cptCodeData.filter(
            (el1) => el1._id.toString() == el.cpt_code_id.toString()
          )[0];
          el.cptCodeEl = cptCodeEl;
          cptLine += cptCodeEl.cptCode;
          el.modifier.forEach((m, j) => {
            //m.toString();

            let foundModifier = dataForCMS1500.modifierData.find(
              (o) => o._id.toString() == m.toString()
            );
            //console.log(foundModifier);
            if (foundModifier) {
              //if (j > 0)
              cptLine += ":" + foundModifier.modifierCode;
              // else
              //   cptLine += cptCodeEl.cptCode + ":" + foundModifier.modifierCode;
            }
          });

          cptLine += "*" + cptCodeEl.price + "*UN*" + el.unit;
          cptLine.replace(",", "");
          cptArray.push(cptLine);

          let pointer_string = "";
          el.icd.forEach((data, i) => {
            if (i == 0 && i != el.icd.length - 1)
              pointer_string += "" + (data + 1);
            else pointer_string += ":" + (data + 1);
          });

          pointer_string_arr.push(pointer_string);
          // cptLine +=
          //   cptCodeEl.cptCode +
          //   ":" +
          //   foundModifier.modifierCode +
          //   "*" +
          //   cptCodeEl.price +
          //   "*UN*" +
          //   cptCodeEl.unit;

          //cptCodeForEDI.push(cptLine);
        });

        let modifiedcpt = "";

        cptArray.forEach((e, i) => {
          modifiedcpt +=
            `LX*${i + 1}~` +
            "\n" +
            "SV1*HC:" +
            e +
            `***${pointer_string_arr[i]}~` +
            "\n" +
            "DTP*472*D8*" +
            momentTimeZone
              .tz(dataForCMS1500.startDateTime, "America/Los_Angeles")
              .format("YYYYMMDD");
          if (i != cptArray.length - 1) modifiedcpt += "~" + "\n";
        });

        // ${dataObj.cptArray.map(
        //   (el) => `LX*1~
        // SV1*HC:${el}***1~
        // DTP*472*D8*${dataObj.DOS}~`
        // )}

        //cptCodeForEDI;
        // let subscriberGender = getGender(
        //   dataForCMS1500.insuranceData.subscriberGender
        // );

        let subscriberGender = dataForCMS1500.insuranceData.subscriber_gender;
        let icdCodes = "";
        dataForCMS1500.ICD_10.forEach((el, i) => {
          icdCodes +=
            i == 0
              ? "ABK:" + el.ictCode.replace(".", "")
              : "*ABF:" + el.ictCode.replace(".", "");
        });
        console.log(icdCodes);
        icdCodes.replace(",", "");

        let relationshipEDI = "18";
        if (dataForCMS1500.insuranceData.relationship == "Self") {
          relationshipEDI = "18";
        } else if (dataForCMS1500.insuranceData.relationship == "Spouse") {
          relationshipEDI = "01";
        } else if (dataForCMS1500.insuranceData.relationship == "Child") {
          relationshipEDI = "19";
        } else {
          relationshipEDI = "G8";
        }
        // let upperLineBillingProvider = ""; //PRV*BI*PXC*100000000X~
        // let lowerLineRenderingProvider = "";

        let NM1_85_line = "";
        if (upperLineBillingProvider != "") {
          NM1_85_line =
            upperLineBillingProvider +
            "\n" +
            `NM1*85*2*${dataForCMS1500.clinicData.clinic_name}*****XX*${pin}`;
        } else {
          NM1_85_line = `NM1*85*2*${dataForCMS1500.clinicData.clinic_name}*****XX*${pin}`;
        }

        let NM1_82_line = "";
        if (lowerLineRenderingProvider != "") {
          //NM1*DN*1* Last Name*First name****XX*NPI~doctorData
          NM1_82_line =
            `NM1*DN*1*${dataForCMS1500.doctorData.last_name.toUpperCase()}*${dataForCMS1500.doctorData.first_name.toUpperCase()}****XX*${dataForCMS1500.doctorData.npiNo.toUpperCase()}~` +
            "\n" +
            `NM1*82*1*${dataForCMS1500.renderingProviderData.last_name.toUpperCase()}*${dataForCMS1500.renderingProviderData.first_name.toUpperCase()}****XX*${dataForCMS1500.renderingProviderData.npiNo.toUpperCase()}~` +
            "\n" +
            lowerLineRenderingProvider;
        } else {
          NM1_82_line =
            `NM1*DN*1*${dataForCMS1500.doctorData.last_name.toUpperCase()}*${dataForCMS1500.doctorData.first_name.toUpperCase()}****XX*${dataForCMS1500.doctorData.npiNo.toUpperCase()}~` +
            "\n" +
            `NM1*82*1*${dataForCMS1500.renderingProviderData.last_name.toUpperCase()}*${dataForCMS1500.renderingProviderData.first_name.toUpperCase()}****XX*${dataForCMS1500.renderingProviderData.npiNo.toUpperCase()}~`;
        }

        const // providerZipCode = dataForCMS1500.doctorData.postal_code.toUpperCase(),
          // providerStateCode = dataForCMS1500.doctorData.state.toUpperCase(),
          // providerAddress = dataForCMS1500.doctorData.address.toUpperCase(),

          locationZipCode =
            dataForCMS1500.locationData.postal_code.toUpperCase(),
          locationStateCode = dataForCMS1500.locationData.state.toUpperCase(),
          locationAddress = dataForCMS1500.locationData.address.toUpperCase(),
          locationCity = dataForCMS1500.locationData.city.toUpperCase(),
          providerFN =
            dataForCMS1500.renderingProviderData.first_name.toUpperCase(),
          providerLN =
            dataForCMS1500.renderingProviderData.last_name.toUpperCase(),
          providerCity = dataForCMS1500.doctorData.city.toUpperCase(),
          subscriberPayerId =
            dataForCMS1500.insuranceData.payer_id.toUpperCase(),
          ediDataObject = {
            applicationReceiverId: "ECGCLAIMS",
            groupControlNumber: generateRandomNumber(9),

            // 'EPIPHANY COUNSELING CONSULTING AND TREATMENT SERVICES'

            // interchange
            interchangeDateYYMMDD: moment(new Date()).format("YYMMDD"),
            interchangeDate: moment(new Date()).format("YYYYMMDD"),
            interchangeTime: moment(new Date()).format("hhmm"),
            //interchangeControlNumber: Math.floor(Math.random() * 1000000000),
            interchangeControlNumber: generateRandomNumber(9),

            // provider
            providerFN,
            providerLN,
            providerNPI:
              dataForCMS1500.renderingProviderData.npiNo.toUpperCase(),
            NM1_85_line,
            NM1_82_line,

            // providerAddress,
            // providerCity,
            // providerStateCode,
            // providerZipCode,

            // location
            locationCity,
            locationZipCode,
            locationAddress,
            locationNPI: pin,
            locationStateCode,
            locationFedID: tax_id,
            stirngAfterClaim,

            // subscriber
            subscriberRelationship: relationshipEDI,
            subscriberLN:
              dataForCMS1500.insuranceData.subscriber_last_name.toUpperCase(),
            subscriberFN:
              dataForCMS1500.insuranceData.subscriber_first_name.toUpperCase(),
            subscriberAddress:
              dataForCMS1500.insuranceData.subscriber_address.toUpperCase(),
            subscriberCity:
              dataForCMS1500.insuranceData.subscriber_city.toUpperCase(),
            subscriberStateCode:
              dataForCMS1500.insuranceData.stateData.stateCode.toUpperCase(),
            subscriberZipCode:
              dataForCMS1500.insuranceData.subscriber_zip_code.toUpperCase(),
            //subscriberZipCode: "HH",
            // subscriberDOB: moment(
            //   dataForCMS1500.insuranceData.date_of_birth
            // ).format("YYYYMMDD"),

            subscriberDOB:
              ins_dob_split[2] + ins_dob_split[0] + ins_dob_split[1],
            subscriberGender,
            subscriberPayerId,

            // insurance
            insuranceType: dataForCMS1500.insuranceData.coverage.substring(
              0,
              1
            ),
            insurancePlanType: dataForCMS1500.insuranceData.insurance_plan_type,
            insuranceName: insurance_name,
            insuranceAddress: insurance_address,
            insuranceCity:
              dataForCMS1500.insuranceData.insurance_city.toUpperCase(),
            insuranceStateCode:
              dataForCMS1500.insuranceData.stateData.stateCode.toUpperCase(),
            insuranceZipCode:
              dataForCMS1500.insuranceData.insurance_zip_code.toUpperCase(),

            // patient
            patientID: pt_account,
            patientLN: dataForCMS1500.patientData.last_name,
            patientSSN: dataForCMS1500.patientData.SSN,
            patientFN: dataForCMS1500.patientData.first_name,
            patientMN: dataForCMS1500.patientData.middle_name,
            patientAddress: pt_street,
            patientCity: pt_city,
            patientStateCode: pt_state,
            patientZipCode: pt_zip,
            patientDOB: moment(dataForCMS1500.patientData.date_of_birth).format(
              "YYYYMMDD"
            ),
            // patientGender: getGender(
            //   dataForCMS1500.patientData.gender == "M" ? "Male" : "Female"
            // ),
            patientGender: dataForCMS1500.patientData.gender,

            // Appointment
            DOS: momentTimeZone
              .tz(dataForCMS1500.startDateTime, "America/Los_Angeles")
              .format("YYYYMMDD"),

            // Other
            orignalRefNo: original_ref,
            icdCodes,
            cptArray,
            modifiedcpt,
            //let cptArray: string[] = [];,
            //icdCodes: dataForCMS1500.ICD_10,

            resubmissionCode: medicaid_resub,
            cptCodes: dataForCMS1500.appliedCptCodes,
            placeOfService: dataForCMS1500.place_of_service,
            acceptAssignment: dataForCMS1500.accept_assignment ? "A" : "C",
            totalChargeAmount: dataForCMS1500.insurancePortion,
            billingProvider:
              dataForCMS1500.locationData.branchName.toUpperCase(),
            clinic_name: dataForCMS1500.clinicData.clinic_name,
            clinicContact: dataForCMS1500.locationData.mobile_other,
          };

        // totalChargeAmount

        let ediString =
          require("../../../../../healthform/EDI_TEXT").ediTemplateText(
            ediDataObject
          );
        ediString = ediString.replace(
          "{{LINES_COUNT}}",
          ediString.split("\n").length - 4
        );

        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/billing/EDI/EDI_" +
              dataForCMS1500.appointment_id.toString()
          ),
          ediString
        );

        return {
          success: true,
          data: {
            EDI:
              `http://${req.host}:${process.env.PORT}` +
              "/upload/billing/EDI/EDI_" +
              dataForCMS1500.appointment_id,
            CMS:
              `http://${req.host}:${process.env.PORT}` +
              "/upload/billing/CMS/CMS_" +
              dataForCMS1500.appointment_id +
              ".pdf",
          },
          status_code: HttpStatus.OK,
        };
      } else
        return {
          success: false,
          status_code: HttpStatus.NOT_FOUND,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };
  /////////////////////****************************************************************///////////////////////////////////////// */
  makeCMS1500FormForSecondaryInsurance = async (
    req: Request,
    model: MakeAndGetCMS1500Viewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let createdby_id = userDetails._id;

      const { clinic_id, appointment_id } = model;
      //Find patient details
      let appointmentDetails = await AppointmentModel.findOne({
        _id: new mongoose.Types.ObjectId(model.appointment_id!.toString()),
      });

      //find  secondary insurance details
      if (appointmentDetails) {
        let insuranceDetails = await INSURANCE_DB_MODEL.findOne({
          patient_id: appointmentDetails!.patient_id,
          coverage: "Secondary",
        });

        if (!insuranceDetails)
          return {
            status_code: HttpStatus.BAD_REQUEST,
            success: false,
            data: {
              message: errorMessage.NO_SECONDARY_INSURANCE,
            },
          };
      }

      //find PrimaryInsurance details
      let primaryInsuranceDetails = await INSURANCE_DB_MODEL.findOne({
        patient_id: appointmentDetails?.patient_id,
        coverage: "Primary",
      }).populate([
        {
          path: "insurance_company_id",
          select: { companyName: 1 },
        },
        {
          path: "patient_id",
          select: { first_name: 1, last_name: 1 },
        },
      ]);

      let condition = {
        clinic_id: new mongoose.Types.ObjectId(clinic_id!.toString()),
        appointment_id: new mongoose.Types.ObjectId(appointment_id!.toString()),
        // _id: new mongoose.Types.ObjectId(checkout_id!.toString()),
      };

      //const data = await BillingCheckoutModel.aggregate([
      const data = await SuperBillModel.aggregate([
        { $match: condition },

        {
          $lookup: {
            from: "appointment",
            let: { appointment_id: "$appointment_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$appointment_id"],
                  },
                },
              },
            ],
            as: "appointmentData",
          },
        },
        {
          $unwind: {
            path: "$appointmentData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "clinic_locations",
            let: {
              location_id: "$appointmentData.location_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$location_id"],
                  },
                },
              },
              {
                $lookup: {
                  from: "states",
                  let: { state_id: "$state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    { $project: { stateCode: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  city: 1,
                  fed_id: 1,
                  branchName: 1,
                  address: 1,
                  taxonomy: 1,
                  npiNo: 1,
                  postal_code: 1,
                  state: "$stateData.stateCode",
                },
              },
            ],
            as: "locationData",
          },
        },
        {
          $unwind: {
            path: "$locationData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "patients",
            let: { patient_id: "$patient_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$patient_id"],
                  },
                },
              },
              {
                $lookup: {
                  from: "states",
                  let: { state_id: "$state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    { $project: { stateCode: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  city: 1,
                  gender: 1,
                  address: 1,
                  contact: 1,
                  last_name: 1,
                  first_name: 1,
                  patientId: 1,
                  SSN: 1,
                  // patientId: 1,
                  middle_name: 1,
                  postal_code: 1,
                  date_of_birth: 1,
                  responsible_person: 1,
                  state: "$stateData.stateCode",
                },
              },
            ],
            as: "patientData",
          },
        },
        {
          $unwind: {
            path: "$patientData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "doctor",
            localField: "billing_provider_id",
            foreignField: "_id",
            pipeline: [
              {
                $lookup: {
                  from: "users",
                  localField: "user_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        first_name: 1,
                        last_name: 1,
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
                $lookup: {
                  from: "states",
                  let: { state_id: "$state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    { $project: { stateCode: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  first_name: "$userData.first_name",
                  last_name: "$userData.last_name",
                  npiNo: 1,
                  taxonomy: 1,
                  stateCode: "$stateData.stateCode",
                  address: 1,
                  //mobile_home: 1,
                  city: 1,

                  postal_code: 1,
                },
              },
            ],
            as: "billingProviderData",
          },
        },
        {
          $unwind: {
            path: "$billingProviderData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "doctor",
            localField: "rendering_provider_id",
            foreignField: "_id",
            pipeline: [
              {
                $lookup: {
                  from: "users",
                  localField: "user_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        first_name: 1,
                        last_name: 1,
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
                $lookup: {
                  from: "states",
                  let: { state_id: "$state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    { $project: { stateCode: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  first_name: "$userData.first_name",
                  last_name: "$userData.last_name",
                  npiNo: 1,
                  taxonomy: 1,
                  stateCode: "$stateData.stateCode",
                  address: 1,
                  //mobile_home: 1,
                  city: 1,

                  postal_code: 1,
                },
              },
            ],
            as: "renderingProviderData",
          },
        },
        {
          $unwind: {
            path: "$renderingProviderData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "doctor",
            let: { doctor_id: "$referring_provider_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$doctor_id"],
                  },
                },
              },
              {
                $lookup: {
                  from: "states",
                  let: { state_id: "$state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    { $project: { stateCode: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  npiNo: 1,
                  user_id: 1,
                  address: 1,
                  //mobile_home: 1,
                  city: 1,
                  stateCode: "$stateData.stateCode",
                  postal_code: 1,
                },
              },
            ],
            as: "doctorCollectionData",
          },
        },
        {
          $unwind: {
            path: "$doctorCollectionData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "users",
            let: {
              user_id: "$doctorCollectionData.user_id",
              npiNo: "$doctorCollectionData.npiNo",
              city: "$doctorCollectionData.city",
              stateCode: "$doctorCollectionData.stateCode",
              postal_code: "$doctorCollectionData.postal_code",
              address: "$doctorCollectionData.address",
              //mobile_home: "$doctorCollectionData.mobile_home",
            },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$user_id"] },
                },
              },

              {
                $project: {
                  first_name: 1,
                  last_name: 1,
                  mobile_no: 1,
                  image: 1,
                  npiNo: "$$npiNo",
                  address: "$$address",
                  city: "$$city",
                  //mobile_no: 1,
                  //mobile_home: "$$mobile_home",
                  //state: "$stateData.stateCode",
                  state: "$$stateCode",
                  postal_code: "$$postal_code",
                  // city: 1,
                },
              },
            ],
            as: "doctorData",
          },
        },
        {
          $unwind: {
            path: "$doctorData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "insurance",
            let: {
              patient_id: "$patient_id",
              //insurance_id: "$insurance_id",
              coverage: "Secondary",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$patient_id", "$$patient_id"],
                      },
                      {
                        $eq: ["$coverage", "$$coverage"],
                      },
                    ],
                  },
                },
              },
              {
                $lookup: {
                  from: "insurance_companies",
                  localField: "insurance_company_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        companyName: 1,
                      },
                    },
                  ],
                  as: "insuranceCompanyData",
                },
              },
              {
                $unwind: {
                  path: "$insuranceCompanyData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "eap",
                  localField: "patient_id",
                  foreignField: "patient_id",
                  pipeline: [
                    {
                      $project: {
                        authNumber: 1,
                      },
                    },
                  ],
                  as: "eapData",
                },
              },
              {
                $unwind: {
                  path: "$eapData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $lookup: {
                  from: "states",
                  let: { state_id: "$insurance_state" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ["$_id", "$$state_id"],
                        },
                      },
                    },
                    //{ $project: { stateCode: 1 } },
                  ],
                  as: "stateData",
                },
              },
              {
                $unwind: {
                  path: "$stateData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              //{ $project: { codes: 0, stateData: 1 } },
            ],
            as: "insuranceData",
          },
        },
        {
          $unwind: {
            path: "$insuranceData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "icts",
            let: { code_id: "$icd" },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ["$_id", "$$code_id"] },
                },
              },
              { $project: { ictCode: 1 } },
            ],
            as: "ICD_10",
          },
        },

        {
          $lookup: {
            from: "cpt",
            let: { code_id: "$cpt.cpt_code_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ["$_id", "$$code_id"] },
                },
              },
              { $project: { cptCode: 1, price: 1 } },
            ],
            as: "cptCodeData",
          },
        },

        {
          $lookup: {
            from: "clinic",
            localField: "clinic_id",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  clinic_name: 1,
                },
              },
            ],
            as: "clinicData",
          },
        },
        {
          $unwind: {
            path: "$clinicData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: "super_bill_other_detail",
            localField: "_id",
            foreignField: "super_bill_id",
            pipeline: [
              {
                $project: {
                  additional_cliam_info: 1,
                  original_ref_no: 1,
                  resubmission_no: 1,
                },
              },
            ],
            as: "superBillOtherDetail",
          },
        },
        {
          $unwind: {
            path: "$superBillOtherDetail",
            preserveNullAndEmptyArrays: true,
          },
        },

        //superBillOtherDetail
        {
          $lookup: {
            from: "modifiers",
            localField: "cpt.modifier",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  modifierCode: 1,
                  description: 1,
                },
              },
            ],
            as: "modifierData",
          },
        },

        {
          $project: {
            _id: 0,
            paper: 1,
            ICD_10: 1,
            doctorData: 1,
            cptCodeData: 1,
            patientData: 1,
            locationData: 1,
            orignalRefNo: 1,
            typeOfService: 1,
            insuranceData: 1,
            place_of_service: 1,
            // typeOfService: 1,
            placeOfService: 1,
            // appointment_id: 1,
            accept_assignment: 1,
            resubmissionCode: 1,
            // acceptAssignment: 1,
            checkout_id: "$_id",
            financialClass_id: 1,
            checkoutTime: "$checkoutTime",
            //appliedCptCodes: "$codes.cptCode",
            appliedCptCodes: "$cpt",
            appointment_id: "$appointment_id",
            //insurancePortion: "$insurance.amount",
            insurancePortion: "$total_amount",
            endDateTime: "$appointmentData.endDateTime",
            checkInTime: "$appointmentData.startDateTime",
            startDateTime: "$appointmentData.startDateTime",
            appointment_number: "$appointmentData.appointment_number",
            billingProviderData: 1,
            renderingProviderData: 1,
            clinicData: 1,
            modifierData: 1,
            additional_cliam_info:
              "$superBillOtherDetail.additional_cliam_info",
            original_ref_no: "$superBillOtherDetail.original_ref_no",
            resubmission_no: "$superBillOtherDetail.resubmission_no",
          },
        },
      ]);

      if (data.length) {
        const dataForCMS1500 = data[0];

        if (!dataForCMS1500.ICD_10.length)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.appointmentMsg.checkoutCodeReq,
            },
          };

        dataForCMS1500.patientData.SSN = dataForCMS1500.patientData.SSN
          ? dataForCMS1500.patientData.SSN
          : "";
        dataForCMS1500.patientData.city = dataForCMS1500.patientData.city
          ? dataForCMS1500.patientData.city.toUpperCase()
          : "";
        dataForCMS1500.patientData.gender = dataForCMS1500.patientData.gender
          ? dataForCMS1500.patientData.gender.toUpperCase()
          : "";
        dataForCMS1500.patientData.address = dataForCMS1500.patientData.address
          ? dataForCMS1500.patientData.address.toUpperCase()
          : "";
        dataForCMS1500.patientData.last_name = dataForCMS1500.patientData
          .last_name
          ? Utility.getDecryptText(dataForCMS1500.patientData.last_name)
          : "";
        dataForCMS1500.patientData.first_name = dataForCMS1500.patientData
          .first_name
          ? Utility.getDecryptText(dataForCMS1500.patientData.first_name)
          : "";
        dataForCMS1500.patientData.middle_name = dataForCMS1500.patientData
          .middle_name
          ? Utility.getDecryptText(dataForCMS1500.patientData.middle_name)
          : "";
        dataForCMS1500.patientData.postal_code = dataForCMS1500.patientData
          .postal_code
          ? dataForCMS1500.patientData.postal_code
          : "";

        let preferedMobileNumber = "",
          preferedMobileAreaCode = "";
        if (dataForCMS1500.patientData.contact.prefered.mobileNo) {
          // const encrytedText = Utility.getDecryptText(
          //   dataForCMS1500.patientData.contact.prefered.mobileNo
          // );
          const encrytedText =
            dataForCMS1500.patientData.contact.prefered.mobileNo;
          preferedMobileNumber = `${encrytedText.substring(
            3,
            6
          )}-${encrytedText.substring(6)}`;
          preferedMobileAreaCode = encrytedText.substring(0, 3);
        }
        console.log(__dirname + "/healthform", "  __dirname");

        //require("../../../../../healthform/EDI_TEXT");

        const formPdfBytes = fs.readFileSync(
            path.join(
              __dirname,
              "../../../../../healthform",
              "form-cms1500.pdf"
            )
          ),
          pdfDoc = await PDFDocument.load(formPdfBytes),
          form = pdfDoc.getForm();

        if (!dataForCMS1500.patientData)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.NOT_FOUND,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        if (!dataForCMS1500.insuranceData)
          return {
            status_code: HttpStatus.UNAUTHORIZED,
            success: false,
            data: {
              message: errorMessage.insuranceMsg.notFound,
              error: errorMessage.ON_UPDATE_ERROR,
            },
          };

        // Header
        const insurance_name =
            dataForCMS1500.insuranceData.insuranceCompanyData.companyName.toUpperCase(),
          insurance_address =
            dataForCMS1500.insuranceData.insurance_address.toUpperCase(),
          insurance_address2 = "",
          insurance_city_state_zip = `${dataForCMS1500.insuranceData.insurance_city.toUpperCase()}, ${dataForCMS1500.insuranceData.stateData.stateCode.toUpperCase()} ${dataForCMS1500.insuranceData.insurance_zip_code.toUpperCase()}`,
          insurance_id = dataForCMS1500.insuranceData.subscriber_id,
          pt_name = `${dataForCMS1500.patientData.last_name},${dataForCMS1500.patientData.first_name}`,
          birth_mm = moment(dataForCMS1500.patientData.date_of_birth).format(
            "MM"
          ),
          birth_dd = moment(dataForCMS1500.patientData.date_of_birth).format(
            "DD"
          ),
          birth_yy = moment(dataForCMS1500.patientData.date_of_birth).format(
            "YY"
          ),
          ins_name = `${dataForCMS1500.insuranceData.subscriber_last_name.toUpperCase()},${dataForCMS1500.insuranceData.subscriber_first_name.toUpperCase()}`,
          pt_zip = dataForCMS1500.patientData.postal_code,
          pt_city = dataForCMS1500.patientData.city.toUpperCase(),
          pt_state = dataForCMS1500.patientData.state.toUpperCase(),
          pt_phone = preferedMobileNumber,
          pt_street = dataForCMS1500.patientData.address.toUpperCase(),
          pt_AreaCode = preferedMobileAreaCode,
          ins_zip =
            dataForCMS1500.insuranceData.subscriber_zip_code.toUpperCase(),
          ins_city = dataForCMS1500.insuranceData.subscriber_city.toUpperCase(),
          ins_state =
            dataForCMS1500.insuranceData.stateData.stateCode.toUpperCase(),
          ins_phone = `${dataForCMS1500.insuranceData.mobile_no.substring(
            3,
            6
          )}-${dataForCMS1500.insuranceData.mobile_no.substring(6)}`,
          ins_street =
            dataForCMS1500.insuranceData.subscriber_address.toUpperCase(),
          ins_phone_area = dataForCMS1500.insuranceData.mobile_no.substring(
            0,
            3
          ),
          ins_dob_mm = moment(
            dataForCMS1500.insuranceData.date_of_birth
          ).format("MM"),
          ins_dob_dd = moment(
            dataForCMS1500.insuranceData.date_of_birth
          ).format("DD"),
          ins_dob_yy = moment(
            dataForCMS1500.insuranceData.date_of_birth
          ).format("YY"),
          ////

          pt_date = moment(new Date()).format("MM-DD-YY"),
          amt_paid = "00  00",
          [a, b] = dataForCMS1500.insurancePortion
            .toFixed(2)
            .toString()
            .split("."),
          t_charge = a + "  " + b,
          physician_signature =
            dataForCMS1500.renderingProviderData.first_name +
            " " +
            dataForCMS1500.renderingProviderData.last_name,
          doc_name =
            dataForCMS1500.billingProviderData.last_name +
            " " +
            dataForCMS1500.billingProviderData.first_name,
          physician_date = pt_date,
          fac_street = dataForCMS1500.locationData.address,
          fac_name = dataForCMS1500.locationData.branchName,
          fac_location = `${dataForCMS1500.locationData.city}, ${dataForCMS1500.locationData.state} ${dataForCMS1500.locationData.postal_code}`,
          doc_street = dataForCMS1500.billingProviderData.address,
          doc_location = `${dataForCMS1500.billingProviderData.city}, ${dataForCMS1500.billingProviderData.stateCode} ${dataForCMS1500.billingProviderData.postal_code}`,
          pin1 = dataForCMS1500.doctorData.npiNo,
          doc_phone_area = dataForCMS1500.billingProviderData.mobile_no
            ? dataForCMS1500.billingProviderData.mobile_no
                .toString()
                .substr(0, 3)
            : "",
          doc_phone = dataForCMS1500.billingProviderData.mobile_no
            ? dataForCMS1500.billingProviderData.mobile_no
                .toString()
                .substr(3, 9)
            : "",
          pin = dataForCMS1500.locationData.npiNo,
          tax_id = dataForCMS1500.locationData.fed_id,
          pt_account = dataForCMS1500.patientData.patientId,
          medicaid_resub = dataForCMS1500.resubmission_no
            ? dataForCMS1500.resubmission_no
            : 1,
          original_ref = dataForCMS1500.original_ref_no
            ? dataForCMS1500.original_ref_no
            : "",
          pt_signature = "Signature on file",
          ins_signature = "Signature on file",
          additional_claim_info = dataForCMS1500.additional_cliam_info
            ? dataForCMS1500.additional_cliam_info
            : "";
        //pt_signature = `${dataForCMS1500.patientData.first_name} ${dataForCMS1500.patientData.last_name}`,
        //ins_signature = `${dataForCMS1500.insuranceData.subscriber_first_name} ${dataForCMS1500.insuranceData.subscriber_last_name}`;

        // console.log(
        //   "dataForCMS1500.doctorData  ",
        //   dataForCMS1500.doctorData.mobile_no.toString().substr(3, 9)
        // );

        // const fields = form.getFields();
        // fields.forEach((field) => {
        //   const type = field.constructor.name;
        //   const name = field.getName();
        //   console.log(name);
        //   if (type == "PDFTextField") {
        //     form.getTextField(name).setText(name.substring(0, 2));
        //   }
        // });

        //////////////////////////////////////////////////////////////
        //Ankit Changes ---28-04-2023

        let patientDoc = <DocumentType<Patients>>(
          primaryInsuranceDetails!.patient_id
        );
        let primaryInsuranceName =
          Utility.getDecryptText(patientDoc!.first_name) +
          " " +
          Utility.getDecryptText(patientDoc!.last_name);
        form
          .getTextField("other_ins_name") //9
          .setText(primaryInsuranceName);
        form
          .getTextField("other_ins_policy") //9a
          .setText(primaryInsuranceDetails!.subscriber_id);
        // form
        //   .getTextField("other_accident")
        //   .setText("other_accident");
        form
          .getTextField("other_ins_plan_name") //9d
          .setText(
            primaryInsuranceDetails!.subscriber_first_name +
              " " +
              primaryInsuranceDetails!.subscriber_last_name
          );
        ///////***************************************** */

        // SET 11 D VALUE yes
        const assignment_box1 = createPDFAcroFields(
            form.getCheckBox("ins_benefit_plan").acroField.Kids()
          ).map((_) => _[0]),
          assignment_value1 = "C";

        assignmentLoop: for (let i = 0; i < assignment_box1.length; i++) {
          const checkBox = assignment_box1[i];

          checkBox.setValue(checkBox.getOnValue());
          break assignmentLoop;
        }

        /////////////////////////////////////////////////////////////////////

        form.getTextField("insurance_name").setText(insurance_name);
        form.getTextField("insurance_address").setText(insurance_address);
        form.getTextField("insurance_address2").setText(insurance_address2);
        form
          .getTextField("insurance_city_state_zip")
          .setText(insurance_city_state_zip);
        form.getTextField("insurance_id").setText(insurance_id);

        //**************************************************************************** */
        form.getTextField("pt_name").setText(pt_name);
        form.getTextField("birth_mm").setText(birth_mm);
        form.getTextField("birth_dd").setText(birth_dd);
        form.getTextField("birth_yy").setText(birth_yy);
        form.getTextField("ins_name").setText(ins_name);
        form.getTextField("pt_zip").setText(pt_zip);
        form.getTextField("pt_city").setText(pt_city);
        form.getTextField("pt_state").setText(pt_state);
        form.getTextField("pt_phone").setText(pt_phone);
        form.getTextField("pt_street").setText(pt_street);
        form.getTextField("pt_AreaCode").setText(pt_AreaCode);
        form.getTextField("ins_zip").setText(ins_zip);
        form.getTextField("ins_city").setText(ins_city);
        form.getTextField("ins_state").setText(ins_state);
        form.getTextField("ins_phone").setText(ins_phone);
        form.getTextField("ins_street").setText(ins_street);
        form.getTextField("ins_phone area").setText(ins_phone_area);
        form.getTextField("ins_dob_mm").setText(ins_dob_mm);
        form.getTextField("ins_dob_dd").setText(ins_dob_dd);
        form.getTextField("ins_dob_yy").setText(ins_dob_yy);
        form.getTextField("ins_plan_name").setText(insurance_name);
        form.getTextField("pt_signature").setText(pt_signature);
        form.getTextField("ins_signature").setText(ins_signature);
        form.getTextField("pt_date").setText(pt_date);
        form.getTextField("96").setText(additional_claim_info); //additional claim info

        // form.getTextField("grp").setText("12123423432");
        // form.getTextField("Suppl").setText("32234234334");

        // form.getTextField("ch1").setText("ch");

        // form.getTextField("local1a").setText("loc");

        //form.getTextField("276").setText("loc");
        // form.getTextField("245").setText("loc");

        // form.getTextField("223").setText("223");
        // form.getTextField("201").setText("201");
        // form.getTextField("179").setText("179");
        // form.getTextField("157").setText("157");
        // form.getTextField("135").setText("135");
        dataForCMS1500.ICD_10.forEach((el: any, i: any) =>
          form
            .getTextField("diagnosis" + (i + 1))
            .setText(el.ictCode.replace(".", ""))
        );
        const [fm, fd, fy] = moment(dataForCMS1500.startDateTime)
            .format("MM-DD-YY")
            .split("-"),
          [tm, td, ty] = moment(dataForCMS1500.endDateTime)
            .format("MM-DD-YY")
            .split("-");

        let upperLineBillingProvider = ""; //PRV*BI*PXC*100000000X~
        let lowerLineRenderingProvider = "";

        dataForCMS1500.appliedCptCodes.forEach((el, i) => {
          i = (i + 1).toString();
          const fromMonth = "sv" + i + "_mm_from",
            fromDate = "sv" + i + "_dd_from",
            fromYear = "sv" + i + "_yy_from",
            toMonth = "sv" + i + "_mm_end",
            toDate = "sv" + i + "_dd_end",
            toYear = "sv" + i + "_yy_end",
            placeOfService = "place" + i,
            //placeOfService = dataForCMS1500.place_of_service,
            pointer = "diag" + i,
            cptCode = "cpt" + i,
            local = "local" + i,
            charge = "ch" + i,
            unit = "day" + i;
          //emg = "emg" + i;

          //modifier = "mod" + i + "a";
          el.modifier.forEach((m, j) => {
            //m.toString();

            let foundModifier = dataForCMS1500.modifierData.find(
              (o) => o._id.toString() == m.toString()
            );
            if (j < 3) {
              if (j == 0)
                form
                  .getTextField("mod" + i + "a")
                  .setText(foundModifier.modifierCode);
              if (j == 1)
                form
                  .getTextField("mod" + i + "b")
                  .setText(foundModifier.modifierCode);
              if (j == 2)
                form
                  .getTextField("mod" + i + "c")
                  .setText(foundModifier.modifierCode);
            }
          });

          form.getTextField(fromMonth).setText(fm);
          form.getTextField(fromDate).setText(fd);
          form.getTextField(fromYear).setText(fy);
          form.getTextField(toMonth).setText(tm);
          form.getTextField(toDate).setText(td);
          form.getTextField(toYear).setText(ty);
          //form.getTextField(modifier).setText("95");
          form
            .getTextField(placeOfService)
            .setText(
              dataForCMS1500.place_of_service
                ? dataForCMS1500.place_of_service
                : placeOfService
            );
          const cptCodeEl = dataForCMS1500.cptCodeData.filter(
            (el1) => el1._id.toString() == el.cpt_code_id.toString()
          )[0];
          el.cptCodeEl = cptCodeEl;

          let pointerValue = "";
          form.getTextField(cptCode).setText(cptCodeEl.cptCode);
          // dataForCMS1500.ICD_10.forEach((data, i) => {
          //   console.log(data, "_________", i, JSON.stringify(el.icd));
          //   el.icd.includes(i) &&
          //     (pointerValue += String.fromCharCode(i + 1 + 64));
          // });
          el.icd.forEach((data, i) => {
            pointerValue += String.fromCharCode(data + 1 + 64);
          });
          form.getTextField(pointer).setText(pointerValue);
          const [a, b] = (cptCodeEl.price * el.unit)
              .toFixed(2)
              .toString()
              .split("."),
            chargeString = a + "  " + b;
          form.getTextField(charge).setText(chargeString);
          form.getTextField(unit).setText(el.unit.toString());

          form
            .getTextField(local)
            .setText(dataForCMS1500.renderingProviderData.npiNo.toUpperCase());

          // form.getTextField('local1a').setText('1N')
        });

        //CHECKING IF INSURANCE TYPE IS MEDICAD
        if (
          dataForCMS1500.insuranceData.insurance_plan_type == "MC" &&
          (dataForCMS1500.insuranceData.coverage == "Primary" ||
            dataForCMS1500.insuranceData.coverage == "Secondary")
        ) {
          let rendering_taxonomy =
            "taxonomy" in dataForCMS1500.renderingProviderData
              ? dataForCMS1500.renderingProviderData.taxonomy
              : "";

          let billing_taxonomy = "ZZ";
          billing_taxonomy +=
            "taxonomy" in dataForCMS1500.billingProviderData
              ? dataForCMS1500.billingProviderData.taxonomy
              : "";

          form.getTextField("grp").setText(billing_taxonomy);

          form.getTextField("emg1").setText("ZZ");
          form.getTextField("local1a").setText(rendering_taxonomy);

          upperLineBillingProvider = `PRV*BI*PXC*${
            "taxonomy" in dataForCMS1500.billingProviderData
              ? dataForCMS1500.billingProviderData.taxonomy
              : ""
          }~`;

          lowerLineRenderingProvider = `PRV*PE*PXC*${
            "taxonomy" in dataForCMS1500.renderingProviderData
              ? dataForCMS1500.renderingProviderData.taxonomy
              : ""
          }~`;

          // form.getTextField("local1").setText("a");
          // form.getTextField("local2a").setText("v");
          // form.getTextField("local2").setText("c");
          // form.getTextField("local3a").setText("d");
          // form.getTextField("local4a").setText("e");
          // form.getTextField("local3").setText("f");

          // form.getTextField("local5a").setText("g");
          // form.getTextField("local5").setText("h");
          // form.getTextField("local6a").setText("u");
          // form.getTextField("local6").setText("k");
        }

        form.getTextField("tax_id").setText(tax_id);
        form.getTextField("pt_account").setText(pt_account);
        form.getTextField("amt_paid").setText(amt_paid);
        form.getTextField("t_charge").setText(t_charge);
        form.getTextField("physician_signature").setText(physician_signature);
        form.getTextField("physician_date").setText(physician_date);
        form.getTextField("fac_street").setText(fac_street);
        form.getTextField("fac_location").setText(fac_location);
        form
          .getTextField("pin1")
          .setText(dataForCMS1500.renderingProviderData.npiNo.toUpperCase());
        // form.getTextField('doc_phone area').setText('2Z')
        // form.getTextField('doc_phone').setText('4P')
        form.getTextField("doc_street").setText(doc_street);
        form.getTextField("doc_location").setText(doc_location);
        form
          .getTextField("pin")
          .setText(dataForCMS1500.billingProviderData.npiNo.toUpperCase());
        //form.getTextField("pin").setText(pin);
        form.getTextField("original_ref").setText(original_ref);
        form.getTextField("doc_name").setText(doc_name);
        form.getTextField("fac_name").setText(fac_name);

        form.getTextField("doc_phone area").setText(doc_phone_area.toString());
        form.getTextField("doc_phone").setText(doc_phone.toString());
        form.getTextField("99icd").setText("0");

        if (medicaid_resub != 1 || medicaid_resub != "1") {
          form.getTextField("medicaid_resub").setText(medicaid_resub);

          if (
            dataForCMS1500.insuranceData.eapData &&
            "authNumber" in dataForCMS1500.insuranceData.eapData
          ) {
            form
              .getTextField("prior_auth")
              .setText(dataForCMS1500.insuranceData.eapData.authNumber);
          }
        }

        // if (dataForCMS1500.insuranceData.eapData) {
        // } else {
        // }
        // ? DUMMY VALUES START
        // form.getCheckBox('276').check()
        // form.getCheckBox('sex').check() // '/M', '/F'
        // form.getCheckBox('lab').check() // '/YES', '/NO'
        // form.getCheckBox('ssn').check() // '/SSN', '/EIN'
        // form.getCheckBox('employment').check() // '/YES', '/NO'
        // form.getCheckBox('ins_sex').check() // '/MALE', '/FEMALE'
        // form.getCheckBox('assignment').check('NO') // '/YES', '/NO'
        // form.getCheckBox('other_accident').check() // '/YES', '/NO'
        // form.getCheckBox('pt_auto_accident').check() // '/YES', '/NO'
        // form.getCheckBox('ins_benefit_plan').check() // '/YES', '/NO'
        // form.getCheckBox('rel_to_ins').check() // '/S', '/M', '/C', 'O'
        // form.getCheckBox('insurance_type').check() // '/Medicare', '/Medicaid', '/Tricare', '/Champva', '/Group', '/Feca', '/Other'
        // ? DUMMY VALUES END

        // form.getCheckBox('insurance_type').check()

        console.log(
          "!!!!!!!!!!!!!!!",
          dataForCMS1500.insuranceData.insurance_plan_type
        );

        const insuranceType_box = createPDFAcroFields(
            form.getCheckBox("insurance_type").acroField.Kids()
          ).map((_) => _[0]),
          insuranceType_value =
            dataForCMS1500.insuranceData.insurance_plan_type;

        insuranceTypeLoop: for (let i = 0; i < insuranceType_box.length; i++) {
          const checkBox = insuranceType_box[i];

          if (
            insuranceType_value == "MB" &&
            checkBox.getOnValue().encodedName === "/Medicare"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break insuranceTypeLoop;
          }

          console.log(
            "insuranceType_value == MC ",
            checkBox.getOnValue().encodedName
          );

          if (
            insuranceType_value == "MC" &&
            checkBox.getOnValue().encodedName === "/Medicaid"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break insuranceTypeLoop;
          }

          if (
            insuranceType_value == "CI" &&
            checkBox.getOnValue().encodedName === "/Other"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break insuranceTypeLoop;
          }
        }

        const assignment_box = createPDFAcroFields(
            form.getCheckBox("assignment").acroField.Kids()
          ).map((_) => _[0]),
          assignment_value = dataForCMS1500.accept_assignment ? "A" : "C";

        assignmentLoop: for (let i = 0; i < assignment_box.length; i++) {
          const checkBox = assignment_box[i];

          if (
            assignment_value == "A" &&
            checkBox.getOnValue().encodedName === "/YES"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break assignmentLoop;
          }

          if (
            assignment_value == "C" &&
            checkBox.getOnValue().encodedName === "/NO"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break assignmentLoop;
          }
        }

        const subscriber_gender_box = createPDFAcroFields(
            form.getCheckBox("ins_sex").acroField.Kids()
          ).map((_) => _[0]),
          subscriber_gender_value =
            dataForCMS1500.insuranceData.subscriber_gender == "M"
              ? "Male"
              : "Female";

        subGenderLoop: for (let i = 0; i < subscriber_gender_box.length; i++) {
          const checkBox = subscriber_gender_box[i];

          if (
            subscriber_gender_value == "Male" &&
            checkBox.getOnValue().encodedName === "/MALE"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break subGenderLoop;
          }

          if (
            subscriber_gender_value == "Female" &&
            checkBox.getOnValue().encodedName === "/FEMALE"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break subGenderLoop;
          }
        }

        const ssn_box = createPDFAcroFields(
          form.getCheckBox("ssn").acroField.Kids()
        ).map((_) => _[0]);
        ssn_box[1].setValue(ssn_box[1].getOnValue());

        const rel_to_ins_box = createPDFAcroFields(
            form.getCheckBox("rel_to_ins").acroField.Kids()
          ).map((_) => _[0]),
          rel_to_ins_value = dataForCMS1500.insuranceData.relationship;
        console.log(rel_to_ins_value, "rel to insures");

        rel_to_insLoop: for (let i = 0; i < rel_to_ins_box.length; i++) {
          const checkBox = rel_to_ins_box[i];
          //18,01,19
          if (
            rel_to_ins_value == "Self" &&
            checkBox.getOnValue().encodedName === "/S"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break rel_to_insLoop;
          }

          if (
            rel_to_ins_value == "Spouse" &&
            checkBox.getOnValue().encodedName === "/M"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break rel_to_insLoop;
          }

          if (
            rel_to_ins_value == "Child" &&
            checkBox.getOnValue().encodedName === "/C"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break rel_to_insLoop;
          }

          if (checkBox.getOnValue().encodedName === "/O") {
            checkBox.setValue(checkBox.getOnValue());
            break rel_to_insLoop;
          }
        }

        const patient_gender_box = createPDFAcroFields(
            form.getCheckBox("sex").acroField.Kids()
          ).map((_) => _[0]),
          patient_gender_value =
            dataForCMS1500.patientData.gender == "M" ? "Male" : "Female";

        patientGenderLoop: for (let i = 0; i < patient_gender_box.length; i++) {
          const checkBox = patient_gender_box[i];

          if (
            patient_gender_value == "Male" &&
            checkBox.getOnValue().encodedName === "/M"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break patientGenderLoop;
          }

          if (
            patient_gender_value == "Female" &&
            checkBox.getOnValue().encodedName === "/F"
          ) {
            checkBox.setValue(checkBox.getOnValue());
            break patientGenderLoop;
          }
        }

        const employment_box = createPDFAcroFields(
          form.getCheckBox("employment").acroField.Kids()
        ).map((_) => _[0]);

        for (let i = 0; i < employment_box.length; i++) {
          if (employment_box[i].getOnValue().encodedName === "/NO") {
            employment_box[i].setValue(employment_box[i].getOnValue());
          }
        }

        const other_accident_box = createPDFAcroFields(
          form.getCheckBox("other_accident").acroField.Kids()
        ).map((_) => _[0]);

        for (let i = 0; i < other_accident_box.length; i++) {
          if (other_accident_box[i].getOnValue().encodedName === "/NO") {
            other_accident_box[i].setValue(other_accident_box[i].getOnValue());
          }
        }

        const pt_auto_accident_box = createPDFAcroFields(
          form.getCheckBox("pt_auto_accident").acroField.Kids()
        ).map((_) => _[0]);

        for (let i = 0; i < pt_auto_accident_box.length; i++) {
          if (pt_auto_accident_box[i].getOnValue().encodedName === "/NO") {
            pt_auto_accident_box[i].setValue(
              pt_auto_accident_box[i].getOnValue()
            );
          }
        }

        /**
            ? Code by Charanjit
            const kids = createPDFAcroFields(form.getCheckBox('insurance_type').acroField. Kids()).map((_) => _[0])
            kids.forEach((kid) => {
              console.log(kid.getOnValue().encodedName)
              if (kid.getOnValue().encodedName === '/Tricare') {
                //console.log('in true')
                kid.setValue(kid.getOnValue()) // Check that particular checkbox.
              } else {
                kid.setValue(PDFName.of('Off')) // Uncheck the checkbox
              }
            })
          */

        form.getFields().forEach((field) => field.enableReadOnly());

        const pdfBytes = await pdfDoc.save();

        await fs.writeFileSync(
          path.join(
            __dirname,
            `../../../../../public/upload/billing/CMS/CMS_${dataForCMS1500.appointment_id.toString()}.pdf`
          ),
          pdfBytes
        );

        // ! EDI FILES

        // ? DUMMY DATA START
        // const ediDataObject = {
        //   applicationReceiverId: '030240928',
        //   interchangeDateYYMMDD: '220120',
        //   interchangeDate: '20220120',
        //   interchangeTime: '1210',
        //   interchangeControlNumber: '369852970',
        //   providerFN: 'MCKINLEY',
        //   providerLN: 'MIYUME',
        //   providerAddress: '302 W. 5th St., Suite 308',
        //   providerCity: 'SAN PEDRO',
        //   providerStateCode: 'CA',
        //   providerZipCode: '907312750',
        //   locationFedID: '475303589',
        //   insurancePlanType: 'MC',
        //   subscriberRelationship: '1',
        //   patientSSN: 'SEY361A73265',
        //   subscriberLN: 'BESS',
        //   subscriberFN: 'SHIRLAN',
        //   insuranceType: 'P',
        //   subscriberAddress: '712 S PEARL AVE',
        //   subscriberCity: 'COMPTON',
        //   insuranceCity: 'LOS ANGELES',
        //   subscriberStateCode: 'CA',
        //   subscriberZipCode: '90221',
        //   subscriberDOB: '19790722',
        //   subscriberGender: 'M',
        //   subscriberPayerId: '47198',
        //   insuranceName: 'ANTHEM BLUE CROSS',
        //   insuranceAddress: 'P O BOX 60007',
        //   insuranceStateCode: 'P O BOX 60007',
        //   insuranceStateCode: 'CA',
        //   insuranceZipCode: '90060',
        //   patientLN: 'BESS',
        //   patientFN: 'AKILAH',
        //   patientMN: '',
        //   patientAddress: '712 S PEARL AVE',
        //   patientCity: 'COMPTON',
        //   patientStateCode: 'CA',
        //   patientZipCode: '90221',
        //   patientDOB: '19810928',
        //   patientGender: 'F',
        // }
        // ? DUMMY DATA START

        const getGender = (value) => {
          let gender;

          switch (value) {
            case "Male":
              gender = "M";
              break;
            case "Female":
              gender = "F";
              break;
            default:
              gender = "O";
              break;
          }

          return gender;
        };

        let stirngAfterClaim = "";

        if (
          dataForCMS1500.insuranceData.eapData &&
          "authNumber" in dataForCMS1500.insuranceData.eapData &&
          (medicaid_resub != 1 || medicaid_resub != "1")
        ) {
          //stirngAfterClaim = `REF*G1*${dataForCMS1500.insuranceData.eapData.authNumber}`;
          stirngAfterClaim =
            `CLM*${pt_account}*${dataForCMS1500.insurancePortion}***${
              dataForCMS1500.place_of_service
            }:B:${medicaid_resub}*Y*${
              dataForCMS1500.accept_assignment ? "A" : "C"
            }*Y*Y~` +
            "\n" +
            `REF*G1*${dataForCMS1500.insuranceData.eapData.authNumber}~` +
            "\n" +
            `REF*F8*${dataForCMS1500.original_ref_no}~`;
        } else if (medicaid_resub != 1 || medicaid_resub != "1") {
          stirngAfterClaim =
            `CLM*${pt_account}*${dataForCMS1500.insurancePortion}***${
              dataForCMS1500.place_of_service
            }:B:${medicaid_resub}*Y*${
              dataForCMS1500.accept_assignment ? "A" : "C"
            }*Y*Y~` +
            "\n" +
            `REF*F8*${dataForCMS1500.original_ref_no}~`;
        } else {
          //stirngAfterClaim = `REF*F8*${dataForCMS1500.original_ref_no}`;

          stirngAfterClaim = `CLM*${pt_account}*${
            dataForCMS1500.insurancePortion
          }***${dataForCMS1500.place_of_service}:B:${medicaid_resub}*Y*${
            dataForCMS1500.accept_assignment ? "A" : "C"
          }*Y*Y~`;
        }

        let cptArray: string[] = [];
        //"${el.cptCodeEl.cptCode}*${el.cptCodeEl.price}*UN*${el.unit}";
        ///////////////////////

        //el.modifier.forEach((m, j) => {

        //////////////////////////

        dataForCMS1500.appliedCptCodes.forEach((el, i) => {
          let cptLine = "";
          let cptCodeEl = dataForCMS1500.cptCodeData.filter(
            (el1) => el1._id.toString() == el.cpt_code_id.toString()
          )[0];
          el.cptCodeEl = cptCodeEl;
          cptLine += cptCodeEl.cptCode;
          el.modifier.forEach((m, j) => {
            //m.toString();

            let foundModifier = dataForCMS1500.modifierData.find(
              (o) => o._id.toString() == m.toString()
            );
            //console.log(foundModifier);
            if (foundModifier) {
              //if (j > 0)
              cptLine += ":" + foundModifier.modifierCode;
              // else
              //   cptLine += cptCodeEl.cptCode + ":" + foundModifier.modifierCode;
            }
          });

          cptLine += "*" + cptCodeEl.price + "*UN*" + el.unit;
          cptLine.replace(",", "");
          cptArray.push(cptLine);
          // cptLine +=
          //   cptCodeEl.cptCode +
          //   ":" +
          //   foundModifier.modifierCode +
          //   "*" +
          //   cptCodeEl.price +
          //   "*UN*" +
          //   cptCodeEl.unit;

          //cptCodeForEDI.push(cptLine);
        });

        let modifiedcpt = "";
        cptArray.forEach((e, i) => {
          modifiedcpt +=
            `LX*${i + 1}~` +
            "\n" +
            "SV1*HC:" +
            e +
            "***1~" +
            "\n" +
            "DTP*472*D8*" +
            momentTimeZone
              .tz(dataForCMS1500.startDateTime, "America/Los_Angeles")
              .format("YYYYMMDD");
          if (i != cptArray.length - 1) modifiedcpt += "~" + "\n";
        });

        // ${dataObj.cptArray.map(
        //   (el) => `LX*1~
        // SV1*HC:${el}***1~
        // DTP*472*D8*${dataObj.DOS}~`
        // )}

        //cptCodeForEDI;
        // let subscriberGender = getGender(
        //   dataForCMS1500.insuranceData.subscriberGender
        // );

        let subscriberGender = dataForCMS1500.insuranceData.subscriber_gender;
        let icdCodes = "";
        dataForCMS1500.ICD_10.forEach((el, i) => {
          icdCodes +=
            i == 0
              ? "ABK:" + el.ictCode.replace(".", "")
              : "*ABF:" + el.ictCode.replace(".", "");
        });
        console.log(icdCodes);
        icdCodes.replace(",", "");

        let relationshipEDI = "18";
        if (dataForCMS1500.insuranceData.relationship == "Self") {
          relationshipEDI = "18";
        } else if (dataForCMS1500.insuranceData.relationship == "Spouse") {
          relationshipEDI = "01";
        } else if (dataForCMS1500.insuranceData.relationship == "Child") {
          relationshipEDI = "19";
        } else {
          relationshipEDI = "G8";
        }
        // let upperLineBillingProvider = ""; //PRV*BI*PXC*100000000X~
        // let lowerLineRenderingProvider = "";

        let NM1_85_line = "";
        if (upperLineBillingProvider != "") {
          NM1_85_line =
            upperLineBillingProvider +
            "\n" +
            `NM1*85*2*${dataForCMS1500.clinicData.clinic_name}*****XX*${pin}`;
        } else {
          NM1_85_line = `NM1*85*2*${dataForCMS1500.clinicData.clinic_name}*****XX*${pin}`;
        }

        let NM1_82_line = "";
        if (lowerLineRenderingProvider != "") {
          NM1_82_line =
            `NM1*DN*1*${dataForCMS1500.doctorData.last_name.toUpperCase()}*${dataForCMS1500.doctorData.first_name.toUpperCase()}****XX*${dataForCMS1500.doctorData.npiNo.toUpperCase()}~` +
            "\n" +
            `NM1*82*1*${dataForCMS1500.renderingProviderData.last_name.toUpperCase()}*${dataForCMS1500.renderingProviderData.first_name.toUpperCase()}****XX*${dataForCMS1500.renderingProviderData.npiNo.toUpperCase()}~` +
            "\n" +
            lowerLineRenderingProvider;
        } else {
          NM1_82_line =
            `NM1*DN*1*${dataForCMS1500.doctorData.last_name.toUpperCase()}*${dataForCMS1500.doctorData.first_name.toUpperCase()}****XX*${dataForCMS1500.doctorData.npiNo.toUpperCase()}~` +
            "\n" +
            `NM1*82*1*${dataForCMS1500.renderingProviderData.last_name.toUpperCase()}*${dataForCMS1500.renderingProviderData.first_name.toUpperCase()}****XX*${dataForCMS1500.renderingProviderData.npiNo.toUpperCase()}~`;
        }

        const // providerZipCode = dataForCMS1500.doctorData.postal_code.toUpperCase(),
          // providerStateCode = dataForCMS1500.doctorData.state.toUpperCase(),
          // providerAddress = dataForCMS1500.doctorData.address.toUpperCase(),

          locationZipCode =
            dataForCMS1500.locationData.postal_code.toUpperCase(),
          locationStateCode = dataForCMS1500.locationData.state.toUpperCase(),
          locationAddress = dataForCMS1500.locationData.address.toUpperCase(),
          locationCity = dataForCMS1500.locationData.city.toUpperCase(),
          providerFN =
            dataForCMS1500.renderingProviderData.first_name.toUpperCase(),
          providerLN =
            dataForCMS1500.renderingProviderData.last_name.toUpperCase(),
          providerCity = dataForCMS1500.doctorData.city.toUpperCase(),
          subscriberPayerId =
            dataForCMS1500.insuranceData.payer_id.toUpperCase(),
          ediDataObject = {
            applicationReceiverId: "ECGCLAIMS",
            groupControlNumber: generateRandomNumber(9),

            // 'EPIPHANY COUNSELING CONSULTING AND TREATMENT SERVICES'

            // interchange
            interchangeDateYYMMDD: moment(new Date()).format("YYMMDD"),
            interchangeDate: moment(new Date()).format("YYYYMMDD"),
            interchangeTime: moment(new Date()).format("hhmm"),
            //interchangeControlNumber: Math.floor(Math.random() * 1000000000),
            interchangeControlNumber: generateRandomNumber(9),

            // provider
            providerFN,
            providerLN,
            providerNPI:
              dataForCMS1500.renderingProviderData.npiNo.toUpperCase(),
            NM1_85_line,
            NM1_82_line,

            // providerAddress,
            // providerCity,
            // providerStateCode,
            // providerZipCode,

            // location
            locationCity,
            locationZipCode,
            locationAddress,
            locationNPI: pin,
            locationStateCode,
            locationFedID: tax_id,
            stirngAfterClaim,

            // subscriber
            subscriberRelationship: relationshipEDI,
            subscriberLN:
              dataForCMS1500.insuranceData.subscriber_last_name.toUpperCase(),
            subscriberFN:
              dataForCMS1500.insuranceData.subscriber_first_name.toUpperCase(),
            subscriberAddress:
              dataForCMS1500.insuranceData.subscriber_address.toUpperCase(),
            subscriberCity:
              dataForCMS1500.insuranceData.subscriber_city.toUpperCase(),
            subscriberStateCode:
              dataForCMS1500.insuranceData.stateData.stateCode.toUpperCase(),
            subscriberZipCode:
              dataForCMS1500.insuranceData.subscriber_zip_code.toUpperCase(),
            //subscriberZipCode: "HH",
            subscriberDOB: moment(
              dataForCMS1500.insuranceData.date_of_birth
            ).format("YYYYMMDD"),
            subscriberGender,
            subscriberPayerId,

            // insurance
            insuranceType: dataForCMS1500.insuranceData.coverage.substring(
              0,
              1
            ),
            insurancePlanType: dataForCMS1500.insuranceData.insurance_plan_type,
            insuranceName: insurance_name,
            insuranceAddress: insurance_address,
            insuranceCity:
              dataForCMS1500.insuranceData.insurance_city.toUpperCase(),
            insuranceStateCode:
              dataForCMS1500.insuranceData.stateData.stateCode.toUpperCase(),
            insuranceZipCode:
              dataForCMS1500.insuranceData.insurance_zip_code.toUpperCase(),

            // patient
            patientID: pt_account,
            patientLN: dataForCMS1500.patientData.last_name,
            patientSSN: dataForCMS1500.patientData.SSN,
            patientFN: dataForCMS1500.patientData.first_name,
            patientMN: dataForCMS1500.patientData.middle_name,
            patientAddress: pt_street,
            patientCity: pt_city,
            patientStateCode: pt_state,
            patientZipCode: pt_zip,
            patientDOB: moment(dataForCMS1500.patientData.date_of_birth).format(
              "YYYYMMDD"
            ),
            // patientGender: getGender(
            //   dataForCMS1500.patientData.gender == "M" ? "Male" : "Female"
            // ),
            patientGender: dataForCMS1500.patientData.gender,

            // Appointment
            DOS: momentTimeZone
              .tz(dataForCMS1500.startDateTime, "America/Los_Angeles")
              .format("YYYYMMDD"),

            // Other
            orignalRefNo: original_ref,
            icdCodes,
            cptArray,
            modifiedcpt,
            //let cptArray: string[] = [];,
            //icdCodes: dataForCMS1500.ICD_10,

            resubmissionCode: medicaid_resub,
            cptCodes: dataForCMS1500.appliedCptCodes,
            placeOfService: dataForCMS1500.place_of_service,
            acceptAssignment: dataForCMS1500.accept_assignment ? "A" : "C",
            totalChargeAmount: dataForCMS1500.insurancePortion,
            billingProvider:
              dataForCMS1500.billingProviderData.first_name.toUpperCase() +
              " " +
              dataForCMS1500.billingProviderData.last_name.toUpperCase(),
            clinic_name: dataForCMS1500.clinicData.clinic_name,
          };

        // totalChargeAmount

        let ediString =
          require("../../../../../healthform/EDI_TEXT").ediTemplateText(
            ediDataObject
          );
        ediString = ediString.replace(
          "{{LINES_COUNT}}",
          ediString.split("\n").length - 4
        );

        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/billing/EDI/EDI_" +
              dataForCMS1500.appointment_id.toString()
          ),
          ediString
        );

        return {
          success: true,
          data: {
            EDI:
              `http://${req.host}:${process.env.PORT}` +
              "/upload/billing/EDI/EDI_" +
              dataForCMS1500.appointment_id,
            CMS:
              `http://${req.host}:${process.env.PORT}` +
              "/upload/billing/CMS/CMS_" +
              dataForCMS1500.appointment_id +
              ".pdf",
          },
          status_code: HttpStatus.OK,
        };
      } else
        return {
          success: false,
          status_code: HttpStatus.NOT_FOUND,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };
}

function generateRandomNumber(length: any) {
  let number = Math.floor(Math.random() * 1000000000);
  var str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }

  return str;
}

export default new BillingPaymentServices();
