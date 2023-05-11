import { DocumentType, mongoose } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import BILLING_PAYMENT_DB_MODEL from "../../models/billing_payment.model";
import PaymentModel, {
  EBillingModeValues,
} from "../../models/billing_payment.model";
import HistoryModel, {
  EHistoryActivityTypeValues,
} from "../../models/history.model";
import InsurancePaymentModel, {
  ETransactionModeValues,
  InsurancePayment,
} from "../../models/insurance_payment.model";
import { User } from "../../models/user.model";
import {
  AddInsurancePaymentViewmodel,
  ListInsurancePaymentViewmodel,
  UpdateInsurancePaymentViewmodel,
} from "../../view-models/insurancePayments";

class InsurancePaymentServices {
  addInsurancePayment = async (
    req: Request,
    model: AddInsurancePaymentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let addPaymentResult: any;
      if (model.transaction_type == ETransactionModeValues.REFUND) {
        const paymentObj: any = {
          mode: EBillingModeValues.CASH,
          remark: model.notes,
          amount: model.payment_amount,
          clinic_id: model.clinic_id,
          patient_id: model.patient_id ?? null,
          createdby_id: userDetails._id,
          appointment_id: model.appointment_id ?? null,
          receiveDate: model.refrenceDate,
          method: "ADVANCE",
          status: "REFUND",
          batchNumber: Date.now(),
        };
        addPaymentResult = await PaymentModel.create(paymentObj);
      } else {
        let modelToSave = <InsurancePayment>model;

        modelToSave.createdby_id = userDetails._id;
        modelToSave.unapplied_amount = model.payment_amount;
        addPaymentResult = await InsurancePaymentModel.create(modelToSave);
      }

      if (addPaymentResult) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Insurance Payment added successfully`,
          type: EHistoryActivityTypeValues.PAYMENT,
          type_id: userDetails._id,
        });

        return {
          success: true,
          data: errorMessage.paymentMsg.paymentAdded,
          status_code: HttpStatus.OK,
        };
      } else
        return {
          success: false,
          data: {
            message: errorMessage.paymentMsg.ErrorPaymentAdded,
            error: errorMessage.ON_ADD_ERROR,
          },
          status_code: HttpStatus.UNAUTHORIZED,
        };
    } catch (error) {
      next(error);
    }
  };

  updateInsurancePayment = async (
    req: Request,
    model: UpdateInsurancePaymentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      if (model.transaction_type == ETransactionModeValues.REFUND) {
        let updateObj: any = {};
        if (model.notes) updateObj.remark = model.notes;
        if (model.payment_amount) updateObj.amount = model.payment_amount;
        if (model.clinic_id) updateObj.clinic_id = model.clinic_id;
        if (model.patient_id) updateObj.patient_id = model.patient_id;
        if (model.appointment_id)
          updateObj.appointment_id = model.appointment_id;

        let updatePayment = await PaymentModel.updateOne(
          { _id: model._id },
          { $set: updateObj }
        );

        if (updatePayment && updatePayment.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `Insurance Payment updated successfully`,
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
            data: {
              message: errorMessage.PAYMENT_UPDATE_FAILED,
              error: errorMessage.ON_UPDATE_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
      } else {
        // let modelToSave = <InsurancePayment>model;
        // modelToSave.createdby_id = userDetails._id;
        // modelToSave.unapplied_amount = model.payment_amount;
        // addPaymentResult = await InsurancePaymentModel.create(modelToSave);
        let updateObj: any = {};
        if (model.notes) updateObj.notes = model.notes;
        if (model.payment_amount)
          updateObj.payment_amount = model.payment_amount;
        if (model.clinic_id) updateObj.clinic_id = model.clinic_id;
        if (model.patient_id) updateObj.patient_id = model.patient_id;
        if (model.appointment_id)
          updateObj.appointment_id = model.appointment_id;
        if (model.transaction_type)
          updateObj.transaction_type = model.transaction_type;
        if (model.payment_from) updateObj.payment_from = model.payment_from;
        if (model.payment_mode) updateObj.payment_mode = model.payment_mode;
        if (model.credeitCard_mode)
          updateObj.credeitCard_mode = model.credeitCard_mode;
        if (model.insurance_company)
          updateObj.insurance_company = model.insurance_company;
        if (model.transactionId) updateObj.transactionId = model.transactionId;
        if (model.insurance_plan)
          updateObj.insurance_plan = model.insurance_plan;
        if (model.refrence) updateObj.refrence = model.refrence;
        if (model.refrenceDate) updateObj.refrenceDate = model.refrenceDate;
        if (model.bill_charged_amount)
          updateObj.bill_charged_amount = model.bill_charged_amount;
        if (model.adjustment_amount)
          updateObj.adjustment_amount = model.adjustment_amount;
        if (model.document) updateObj.document = model.document;

        let updatePayment = await InsurancePaymentModel.updateOne(
          { _id: model._id },
          { $set: updateObj }
        );

        if (updatePayment && updatePayment.modifiedCount > 0) {
          // Add Activity History
          let addHistory = await HistoryModel.create({
            user_id: userDetails._id,
            description: `Insurance Payment updated successfully`,
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
            data: {
              message: errorMessage.PAYMENT_UPDATE_FAILED,
              error: errorMessage.ON_UPDATE_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
      }
    } catch (error) {
      next(error);
    }
  };
  //updateInsurancePayment
  listInsurancePayment = async (
    req: Request,
    model: ListInsurancePaymentViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      // let userDetails = <DocumentType<User>>req.user;
      // let addPaymentResult: any;
      let defaultPage: number;
      let count: number;
      defaultPage = model.pageNumber ? model.pageNumber : 1;
      count = model.pageSize ? model.pageSize : 50;
      if (model.type != ETransactionModeValues.REFUND) {
        let condition: any = {};
        if (model.clinic_id)
          condition.clinic_id = new mongoose.Types.ObjectId(
            model.clinic_id!.toString()
          );

        if (model.patient_id)
          condition.patient_id = new mongoose.Types.ObjectId(
            model.patient_id!.toString()
          );

        if (model.appointment_id)
          condition.appointment_id = new mongoose.Types.ObjectId(
            model.appointment_id!.toString()
          );

        if (model.insurance_company)
          condition.insurance_company = new mongoose.Types.ObjectId(
            model.insurance_company!.toString()
          );

        //if (model.payment_from) condition.payment_from = model.payment_from;

        if (model.insurance_plan)
          condition.insurance_plan = model.insurance_plan;

        if (model.refrence) condition.refrence = model.refrence;
        if (model.ref_startDateTime) {
          let startTime = new Date(model.ref_startDateTime);
          startTime.setHours(0, 0, 0, 0);
          let endTime = new Date(model.ref_startDateTime);
          endTime.setHours(23, 59, 59, 999);
          condition.refrenceDate = {
            $gte: startTime,
            //$lte: endTime,
          };
        }
        if (model.ref_endDateTime) {
          let startTime = new Date(model.ref_endDateTime);
          startTime.setHours(0, 0, 0, 0);
          let endTime = new Date(model.ref_endDateTime);
          endTime.setHours(23, 59, 59, 999);
          condition.refrenceDate = {
            //$gte: startTime,
            $lte: endTime,
          };
        }

        ////
        if (model.received_startDateTime) {
          let startTime = new Date(model.received_startDateTime);
          startTime.setHours(0, 0, 0, 0);
          let endTime = new Date(model.received_startDateTime);
          endTime.setHours(23, 59, 59, 999);
          condition.createdAt = {
            $gte: startTime,
            //$lte: endTime,
          };
        }
        if (model.received_endDateTime) {
          let startTime = new Date(model.received_endDateTime);
          startTime.setHours(0, 0, 0, 0);
          let endTime = new Date(model.received_endDateTime);
          endTime.setHours(23, 59, 59, 999);
          condition.createdAt = {
            //$gte: startTime,
            $lte: endTime,
          };
        }
        //condition.status = ETransactionModeValues.PAYMENT;
        let result = await InsurancePaymentModel.aggregate([
          { $match: condition },
          {
            $lookup: {
              from: "insurance_companies",
              let: { insurance_company: "$insurance_company" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", "$$insurance_company"],
                    },
                  },
                },
                { $project: { companyName: 1, _id: 1 } },
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
            $facet: {
              count: [{ $count: "count" }],
              data: [
                {
                  $project: {
                    _id: 1,
                    clinic_id: 1,
                    transaction_type: 1,
                    payment_from: 1,
                    payment_mode: 1,
                    credeitCard_mode: 1,
                    transactionId: 1,
                    insurance_company: "$insuranceCompanyData.companyName",
                    insurance_company_id: "$insuranceCompanyData._id",
                    insurance_plan: 1,
                    refrence: 1,
                    refrenceDate: 1,
                    payment_amount: 1,
                    bill_charged_amount: 1,
                    adjustment_amount: 1,
                    excluded_claim: 1,
                    notes: 1,
                    patient_id: 1,
                    appointment_id: 1,
                    document: 1,
                    createdAt: 1,
                  },
                },
                {
                  $sort: { createdAt: -1 },
                },
                { $skip: count * (defaultPage - 1) },
                { $limit: count },
              ],
            },
          },
        ]);
        if (
          result &&
          result.length > 0 &&
          result[0].data &&
          result[0].data.length > 0
        ) {
          let obj = {
            data: result[0].data,
            // count: result.totalDocs,
            totalDocs: result[0].count[0].count,
            pageNumber: defaultPage,
            pageSize: count,
            totalPages: Math.ceil(result[0].count[0].count / count),
          };
          return {
            status_code: HttpStatus.OK,
            data: obj,
            success: true,
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.NO_RECORD_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      } else {
        let condition: any = {};

        if (model.clinic_id)
          condition.clinic_id = new mongoose.Types.ObjectId(
            model.clinic_id!.toString()
          );

        if (model.patient_id)
          condition.patient_id = new mongoose.Types.ObjectId(
            model.patient_id!.toString()
          );

        if (model.appointment_id)
          condition.appointment_id = new mongoose.Types.ObjectId(
            model.appointment_id!.toString()
          );
        if (model.received_startDateTime) {
          let startTime = new Date(model.received_startDateTime);
          startTime.setHours(0, 0, 0, 0);
          let endTime = new Date(model.received_startDateTime);
          endTime.setHours(23, 59, 59, 999);
          condition.receiveDate = {
            $gte: startTime,
            //$lte: endTime,
          };
        }
        if (model.received_endDateTime) {
          let startTime = new Date(model.received_endDateTime);
          startTime.setHours(0, 0, 0, 0);
          let endTime = new Date(model.received_endDateTime);
          endTime.setHours(23, 59, 59, 999);
          condition.receiveDate = {
            //$gte: startTime,
            $lte: endTime,
          };
        }
        condition.status = ETransactionModeValues.REFUND;

        //let result = await PaymentModel.aggregate([{ $match: condition }]);
        let result = await PaymentModel.aggregate([
          { $match: condition },

          {
            $facet: {
              count: [{ $count: "count" }],
              data: [
                {
                  // mode: EBillingModeValues.CASH,
                  // remark: model.notes,

                  // method: "ADVANCE",
                  // status: "REFUND",
                  // batchNumber: Date.now(),

                  $project: {
                    _id: 1,
                    //status: "REFUND",
                    //method: 1,
                    //email: 1,
                    // amount: 1,
                    transactionId: 1,
                    //remark: 1,
                    transaction_type: "REFUND",
                    cheque: 1,
                    payment_from: null,
                    //receiveDate: 1,
                    payment_mode: "$mode",
                    credeitCard_mode: null,
                    insurance_company: null,
                    insurance_company_id: null,
                    insurance_plan: null,
                    refrence: null,
                    refrenceDate: "$receiveDate",
                    payment_amount: "$amount",
                    bill_charged_amount: {
                      $ifNull: [
                        "$bill_charged_amount",
                        "$bill_charged_amount",
                        0,
                      ],
                    },
                    adjustment_amount: {
                      $ifNull: ["$adjustment_amount", "$adjustment_amount", 0],
                    },
                    excluded_claim: null,
                    notes: "$remark",
                    patient_id: 1,
                    appointment_id: 1,
                    document: 1,
                    createdAt: 1,

                    // _id: 1,
                    // clinic_id: 1,
                    // transaction_type: 1,
                    // payment_from: 1,
                    // payment_mode: 1,
                    // credeitCard_mode: 1,
                    // transactionId: 1,
                    // insurance_company: "$insuranceCompanyData.companyName",
                    // insurance_company_id: "$insuranceCompanyData._id",
                    // insurance_plan: 1,
                    // refrence: 1,
                    // refrenceDate: 1,
                    // payment_amount: 1,
                    // bill_charged_amount: 1,
                    // adjustment_amount: 1,
                    // excluded_claim: 1,
                    // notes: 1,
                    // patient_id: 1,
                    // appointment_id: 1,
                    // document: 1,
                    // createdAt: 1,
                  },
                },
                {
                  $sort: { createdAt: -1 },
                },
                { $skip: count * (defaultPage - 1) },
                { $limit: count },
              ],
            },
          },
        ]);
        if (
          result &&
          result.length > 0 &&
          result[0].data &&
          result[0].data.length > 0
        ) {
          let obj = {
            data: result[0].data,
            // count: result.totalDocs,
            totalDocs: result[0].count[0].count,
            pageNumber: defaultPage,
            pageSize: count,
            totalPages: Math.ceil(result[0].count[0].count / count),
          };
          return {
            status_code: HttpStatus.OK,
            data: obj,
            success: true,
          };
        } else {
          return {
            success: false,
            data: {
              message: errorMessage.NO_RECORD_FOUND,
              error: errorMessage.ON_FETCH_ERROR,
            },
            status_code: HttpStatus.BAD_REQUEST,
          };
        }
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new InsurancePaymentServices();
