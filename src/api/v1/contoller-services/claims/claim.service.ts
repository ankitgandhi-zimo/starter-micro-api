import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";
import moment from "moment";
import Utility, {
  IServiceResult1,
} from "../../common/common-methods";
import errorMessage from "../../common/erros_message";
import DoctorModel, {
  Doctor,
} from "../../models/doctor.model";

import HistoryModel from "../../models/history.model";
import InsuranceModel, {
  Insurance,
} from "../../models/insurance/insurance.model";

import { DocumentType } from "@typegoose/typegoose";
import axios from "axios";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import XlsxPopulate from "xlsx-populate";
import AppointmentModel, {
  Appointment,
} from "../../models/appointment.model";
import BillingCheckoutModel from "../../models/billing_checkout.model";
import ClaimResponseModel from "../../models/claim_response.model";
import { Clinic } from "../../models/clinic.model";
import { EHistoryActivityTypeValues } from "../../models/history.model";
import { InsuranceCompany } from "../../models/insurance/insurance_companies.model";
import { ClinicLocation } from "../../models/location.model";
import { Patients } from "../../models/patient.model";
import { States } from "../../models/state.model";
import SuperBillModel from "../../models/super_bill.model";
import { User } from "../../models/user.model";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";
import {
  GetClaimDetailsViewmodel,
  GetClaimListViewmodel,
  UpdateEditStatusViewmodel,
} from "../../view-models/claims";
import { AddClaimViewmodel } from "../../view-models/claims/add_claim.viewmodel";

export enum EnumRoles {
  SUPERADMIN = "superadmin",
}
class ClaimServices {
  submitClaim = async (
    req: Request,
    model: AddClaimViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;

      //ADDED BY CHARANJIT 12 APR,23
      //checking if a claim is already submitted
      // let claimAlreadySubmitted = await ClaimResponseModel.findOne({
      //   superBillId: model.superBillId,
      // });

      // if (claimAlreadySubmitted) {
      //   return {
      //     status_code: HttpStatus.BAD_REQUEST,
      //     success: false,
      //     data: {
      //       message: errorMessage.CLAIM_ALREADY_SUBMITTED,
      //       error: errorMessage.ON_ADD_ERROR,
      //     },
      //   };
      // }
      ///

      // generate token for submit claim by change helathcare  client credentials
      let tokenCredentialObj: any = {
        client_id: process.env.CLAIM_TOKEN_client_id ?? "",
        client_secret:
          process.env.CLAIM_TOKEN_client_secret ?? "",
        grant_type:
          process.env.CLAIM_TOKEN_grant_type ?? "",
      };
      let genrateClaimToken: any = await axios.post(
        process.env.CLAIM_TOKEN_URL ?? "",
        tokenCredentialObj
      );

      // console.log(genrateClaimToken, "genrateClaimToken");
      if (
        !genrateClaimToken ||
        !genrateClaimToken.data.access_token
      )
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: errorMessage.NOT_AUTHORIZED_FOR_ACTION,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      //make object  for submit claim to change helathcare
      //let control_number = Math.floor(Math.random() * 1000000000);
      let control_number = "595455512";
      // generate 5 digit alphanumeric code for service id and tradingPartnerServiceId
      let serviceId = Math.random()
        .toString(36)
        .substr(2, 5);

      let populatedFeilds = [
        {
          path: "appointment_id",
          select: {
            clinic_id: 1,
            location_id: 1,
            startDateTime: 1,
            endDateTime: 1,

            visitType: 1,
            appointmentType_id: 1,
          },
          populate: [
            {
              path: "clinic_id",
              select: { clinic_name: 1 },
            },
            {
              path: "location_id",
              select: {
                // branchName: 1,
                // mobile_other: 1,
                // state: 1,
              },
              populate: [
                {
                  path: "state",
                  select: { stateCode: 1 },
                },
              ],
            },
          ],
        },

        {
          path: "insurance_id",
          select: {
            insurance_company_id: 1,
            insurance_type: 1,
            insurance_plan_type: 1,
            subscriber_id: 1,
            patient_id: 1,
          },
          populate: [
            {
              path: "insurance_company_id",
              select: {
                city: 1,
                state: 1,
                country: 1,
                postal_code: 1,
                address: 1,
                companyName: 1,
              },
            },
            {
              path: "patient_id",
              select: {
                first_name: 1,
                last_name: 1,
                gender: 1,
                city: 1,
                state: 1,
                address: 1,
                postal_code: 1,
                date_of_birth: 1,
                SSN: 1,
              },
              populate: {
                path: "state",
                select: { stateName: 1, stateCode: 1 },
              },
            },
          ],
        },

        {
          path: "referring_provider_id",
          select: {
            user_id: 1,
            clinic_id: 1,
            npiNo: 1,
            state: 1,
          },
          populate: [
            {
              path: "user_id",
              select: { first_name: 1, last_name: 1 },
            },
            {
              path: "clinic_id",
              select: { clinic_name: 1 },
            },
          ],
        },
        {
          path: "billing_provider_id",
          select: {
            user_id: 1,
            clinic_id: 1,
            state: 1,
            npiNo: 1,
            address: 1,
            city: 1,
            postal_code: 1,
          },
          populate: [
            {
              path: "user_id",
              select: {
                first_name: 1,
                last_name: 1,
                mobile_no: 1,
              },
            },
            { path: "state" },
            {
              path: "clinic_id",
              select: { clinic_name: 1 },
            },
          ],
        },
        {
          path: "rendering_provider_id",
          select: {
            first_name: 1,
            last_name: 1,
            npiNo: 1,
            address: 1,
            middle_name: 1,
          },
          populate: [
            {
              path: "user_id",
              select: { first_name: 1, last_name: 1 },
            },
            {
              path: "clinic_id",
              select: { clinic_name: 1 },
            },
          ],
        },

        {
          path: "cpt.cpt_code_id",
          select: {
            price: 1,
            cptCode: 1,
            description: 1,
          },
        },
      ];

      // getting super bill details
      let foundSuperBillDetails =
        await SuperBillModel.findOne({
          _id: model.superBillId,
        }).populate(populatedFeilds);

      if (!foundSuperBillDetails)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.CLAIM_INFO_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
        };

      console.log(JSON.stringify(foundSuperBillDetails));
      if (
        foundSuperBillDetails &&
        !foundSuperBillDetails.billing_provider_id
      )
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.CLAIM_BILLING_PROVIDER_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
        };

      if (
        foundSuperBillDetails &&
        !foundSuperBillDetails.referring_provider_id
      )
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.CLAIM_Referring_PROVIDER_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
        };

      if (
        foundSuperBillDetails &&
        !foundSuperBillDetails.referring_provider_id
      )
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.CLAIM_Rendering_PROVIDER_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
        };

      let foundDependentDetails = <DocumentType<Insurance>>(
        foundSuperBillDetails!.insurance_id
      );

      let foundBillingProviderDetails = <
        DocumentType<Doctor>
      >foundSuperBillDetails!.billing_provider_id;

      let foundReferringProviderDetails = <
        DocumentType<Doctor>
      >foundSuperBillDetails!.referring_provider_id;

      let foundRenderingProviderDetails = <
        DocumentType<Doctor>
      >foundSuperBillDetails!.rendering_provider_id;

      let foundReceiverDetails: any,
        foundSubscriberDetails: any;
      if (
        foundDependentDetails &&
        foundDependentDetails!.insurance_company_id
      )
        foundReceiverDetails =
          foundDependentDetails.insurance_company_id;
      else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.CLAIM_RECEIVERER_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }

      if (
        foundDependentDetails &&
        foundDependentDetails.patient_id
      )
        foundSubscriberDetails =
          foundDependentDetails.patient_id;
      else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.CLAIM_PATIENT_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }

      let appData = <DocumentType<Appointment>>(
        foundSuperBillDetails!.appointment_id
      );

      let clinicData = <DocumentType<Clinic>>(
        appData.clinic_id
      );
      let locationData = <DocumentType<ClinicLocation>>(
        appData.location_id
      );
      let stateObj: any = <DocumentType<States>>(
        locationData.state
      );
      //let stateNameValue = stateObj.stateName;
      let stateNameValue = stateObj.stateCode;

      let receiverData = <DocumentType<InsuranceCompany>>(
        foundDependentDetails.insurance_company_id
      );

      let subscriberData = <DocumentType<Patients>>(
        foundDependentDetails.patient_id
      );

      let subscriberStateData: any = <DocumentType<States>>(
        subscriberData.state
      );
      let referringProvUserData = <DocumentType<User>>(
        foundReferringProviderDetails.user_id
      );
      let rendringProvUserData = <DocumentType<User>>(
        foundRenderingProviderDetails.user_id
      );

      let billingProvUserData = <DocumentType<User>>(
        foundBillingProviderDetails.user_id
      );

      let billingProvStateDetails: any =
        foundBillingProviderDetails.state;
      let bill_Prov_clinic_details = <DocumentType<Clinic>>(
        foundBillingProviderDetails.clinic_id
      );

      let serviceLineArr: any = [];

      // foundSubscriberDetails.cpt.forEach((obj: any) =>

      foundSuperBillDetails.cpt.forEach((obj: any) => {
        console.log(obj.cpt_code_id.cptCode);
        let temp = {
          serviceDate: Utility.changeDateForClaim(
            appData.startDateTime
          ), //"20050514",
          professionalService: {
            procedureIdentifier: "HC",
            lineItemChargeAmount: obj.cpt_code_id.price,
            procedureCode: obj.cpt_code_id.cptCode,
            measurementUnit: "UN",
            serviceUnitCount: obj.unit,
            compositeDiagnosisCodePointers: {
              diagnosisCodePointers: ["1"], // obj.icd
            },
          },
        };
        serviceLineArr.push(temp);
      });

      let data = {
        controlNumber: control_number.toString(),
        //tradingPartnerServiceId: serviceId,
        tradingPartnerServiceId: "4743",
        submitter: {
          organizationName: clinicData.clinic_name,
          contactInformation: {
            name: locationData.branchName,
            phoneNumber: locationData.mobile_other,
          },
        },
        receiver: {
          organizationName: receiverData.companyName
            ? receiverData.companyName
            : "not found",
        },
        subscriber: {
          memberId: foundDependentDetails.subscriber_id,
          paymentResponsibilityLevelCode: "P",
          firstName: Utility.getDecryptText(
            subscriberData.first_name
          ),
          lastName: Utility.getDecryptText(
            subscriberData.last_name
          ),
          gender: subscriberData.gender,
          dateOfBirth: Utility.changeDateForClaim(
            subscriberData.date_of_birth
          ), //"19800102",
          policyNumber: "00001",
          address: {
            address1: subscriberData.address,
            city: subscriberData.city,
            state: subscriberStateData.stateCode,
            postalCode: subscriberData.postal_code,
          },
        },
        dependent: {
          memberId: foundDependentDetails.subscriber_id,
          paymentResponsibilityLevelCode: "P",
          firstName: Utility.getDecryptText(
            subscriberData.first_name
          ),
          lastName: Utility.getDecryptText(
            subscriberData.last_name
          ),
          gender: subscriberData.gender,
          dateOfBirth: Utility.changeDateForClaim(
            subscriberData.date_of_birth
          ), //"19800102",
          policyNumber: "00002",
          relationshipToSubscriberCode: "01",
          address: {
            address1: subscriberData.address,
            city: subscriberData.city,
            state: subscriberStateData.stateCode,
            postalCode: subscriberData.postal_code,
          },
        },
        providers: [
          {
            providerType: "BillingProvider",
            npi: foundBillingProviderDetails.npiNo,
            employerId: "123456789",
            organizationName:
              bill_Prov_clinic_details.clinic_name,
            address: {
              address1: foundBillingProviderDetails.address,
              city: foundBillingProviderDetails.city,
              state: billingProvStateDetails.stateCode,
              postalCode:
                foundBillingProviderDetails.postal_code,
            },
            contactInformation: {
              name:
                billingProvUserData.first_name +
                " " +
                billingProvUserData.last_name,
              phoneNumber: billingProvUserData.mobile_no,
            },
          },
          // {
          //   providerType: "ReferringProvider",
          //   npi: foundReferringProviderDetails.npiNo,
          //   firstName: referringProvUserData.first_name,
          //   lastName: referringProvUserData.last_name,
          //   employerId: "123456",
          // },
          {
            providerType: "RenderingProvider",
            npi: foundRenderingProviderDetails.npiNo,
            firstName: rendringProvUserData.first_name,
            lastName: rendringProvUserData.last_name,
            middleName:
              foundRenderingProviderDetails.middle_name
                ? foundRenderingProviderDetails.middle_name
                : rendringProvUserData.last_name,
            ssn: subscriberData.SSN
              ? subscriberData.SSN
              : "000000000",
          },
        ],
        claimInformation: {
          claimFilingCode:
            foundDependentDetails.insurance_plan_type,
          //claimFilingCode: "MC",
          patientControlNumber: control_number.toString(),
          claimChargeAmount:
            foundSuperBillDetails.total_amount,
          placeOfServiceCode:
            foundSuperBillDetails.place_of_service,
          // foundSuperBillDetails.place_of_service,
          claimFrequencyCode: "1",
          signatureIndicator: "Y",
          planParticipationCode: "A",
          benefitsAssignmentCertificationIndicator: "Y",
          releaseInformationCode: "Y",
          claimSupplementalInformation: {
            repricedClaimNumber: "00001",
            claimNumber: "12345",
          },
          healthCareCodeInformation: [
            {
              diagnosisTypeCode: "BK",
              diagnosisCode: "496",
            },
            {
              diagnosisTypeCode: "BF",
              diagnosisCode: "25000",
            },
          ],
          serviceFacilityLocation: {
            organizationName: locationData.branchName,
            address: {
              address1: locationData.address,
              city: locationData.city,
              state: stateNameValue,
              postalCode: locationData.postal_code,
            },
          },
          serviceLines: serviceLineArr,
        },
      };

      ////////////////////////////////////////////
      //User dummy data for tetsimg untill use unpaid api--sandbox

      let dummyData: any = {
        controlNumber: "000000001",
        tradingPartnerServiceId: "9496",
        submitter: {
          organizationName: "REGIONAL PPO NETWORK",
          contactInformation: {
            name: "SUBMITTER CONTACT INFO",
            phoneNumber: "123456789",
          },
        },
        receiver: {
          organizationName: "EXTRA HEALTHY INSURANCE",
        },
        subscriber: {
          memberId: "0000000001",
          paymentResponsibilityLevelCode: "P",
          firstName: "johnone",
          lastName: "doeOne",
          gender: "M",
          dateOfBirth: "19800102",
          policyNumber: "00001",
          address: {
            address1: "123 address1",
            city: "city1",
            state: "wa",
            postalCode: "981010000",
          },
        },
        dependent: {
          memberId: "0000000002",
          paymentResponsibilityLevelCode: "P",
          firstName: "janeone",
          lastName: "doeOne",
          gender: "F",
          dateOfBirth: "19800102",
          policyNumber: "00002",
          relationshipToSubscriberCode: "01",
          address: {
            address1: "123 address1",
            city: "city1",
            state: "wa",
            postalCode: "981010000",
          },
        },
        providers: [
          {
            providerType: "BillingProvider",
            npi: "1760854442",
            employerId: "123456789",
            organizationName: "HAPPY DOCTORS GROUPPRACTICE",
            address: {
              address1: "000 address1",
              city: "city2",
              state: "tn",
              postalCode: "372030000",
            },
            contactInformation: {
              name: "janetwo doetwo",
              phoneNumber: "0000000001",
            },
          },
          {
            providerType: "ReferringProvider",
            npi: "1942788757",
            firstName: "johntwo",
            lastName: "doetwo",
            employerId: "123456",
          },
          {
            providerType: "RenderingProvider",
            npi: "1942788757",
            firstName: "janetwo",
            lastName: "doetwo",
            middleName: "middletwo",
            ssn: "000000000",
          },
        ],
        claimInformation: {
          claimFilingCode: "CI",
          patientControlNumber: "12345",
          claimChargeAmount: "28.75",
          placeOfServiceCode: "11",
          claimFrequencyCode: "1",
          signatureIndicator: "Y",
          planParticipationCode: "A",
          benefitsAssignmentCertificationIndicator: "Y",
          releaseInformationCode: "Y",
          claimSupplementalInformation: {
            repricedClaimNumber: "00001",
            claimNumber: "12345",
          },
          healthCareCodeInformation: [
            {
              diagnosisTypeCode: "BK",
              diagnosisCode: "496",
            },
            {
              diagnosisTypeCode: "BF",
              diagnosisCode: "25000",
            },
          ],
          serviceFacilityLocation: {
            organizationName: "HAPPY DOCTORS GROUP",
            address: {
              address1: "000 address1",
              city: "city2",
              state: "tn",
              postalCode: "372030000",
            },
          },
          serviceLines: [
            {
              serviceDate: "20050514",
              professionalService: {
                procedureIdentifier: "HC",
                lineItemChargeAmount: "25",
                procedureCode: "E0570",
                measurementUnit: "UN",
                serviceUnitCount: "1",
                compositeDiagnosisCodePointers: {
                  diagnosisCodePointers: ["1", "2"],
                },
              },
            },
            {
              serviceDate: "20050514",
              professionalService: {
                procedureIdentifier: "HC",
                lineItemChargeAmount: "3.75",
                procedureCode: "A7003",
                measurementUnit: "UN",
                serviceUnitCount: "1",
                compositeDiagnosisCodePointers: {
                  diagnosisCodePointers: ["1"],
                },
              },
            },
          ],
        },
      };

      ////////////////////////////////////////////
      // return {
      //   status_code: HttpStatus.BAD_REQUEST,
      //   success: false,
      //   data: {
      //     message: errorMessage.CLAIM_RECEIVERER_NOT_FOUND,
      //     error: errorMessage.ON_ADD_ERROR,
      //   },
      // };
      console.log(JSON.stringify(data), "claimdata");

      // console.log(dummyData, "dummyData");
      let responseObject = await axios.post(
        process.env.CLAIM_SUBMISSION_URL ?? "",
        //dummyData,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${genrateClaimToken.data.access_token}`,
          },
        }
      );
      console.log(responseObject);
      //////////////////////////////////////////////////////////////////////
      // Add super bill details in claim section

      let ModelToSave: any = { ...responseObject.data };
      ModelToSave.invoice =
        Utility.generateRandomNDigits(5);
      // responseObject.data.superBillId = model.superBillId;
      ModelToSave.clinic_id = clinicData._id ?? null;

      ModelToSave.superBillId = model.superBillId;
      ////////////////////////////////////////////////////////////////////// add new fileds in claim by charnjit

      // ModelToSave.rendering_provider_id = model.superBillId;

      // ModelToSave.billing_provider_id = model.superBillId;

      // ModelToSave.startDateTime = appData.startDateTime;

      // ModelToSave.endDateTime = appData.endDateTime;

      // ModelToSave.location_id = locationData._id;

      // ModelToSave.patient_id = subscriberData._id;
      // ModelToSave.visitType = appData.visitType;

      // ModelToSave.appointmentType_id =
      //   appData.appointmentType_id;

      // let cptCodesValues: any = [];
      // foundSuperBillDetails.cpt.forEach((x) =>
      //   cptCodesValues.push(x.cpt_code_id)
      // );
      // ModelToSave.cptCode = cptCodesValues;

      //////////////////////////////////////////////////////////////////////

      let ClaimSubmissionResponse =
        await ClaimResponseModel.create(
          ModelToSave
          //responseObject.data
        );

      if (ClaimSubmissionResponse) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Claim response added successfully`,
          type: EHistoryActivityTypeValues.CLAIM,
        });

        let updateSuperBill =
          await SuperBillModel.updateOne(
            { _id: model.superBillId },
            {
              ClaimStatusObject: {
                claimStatus: "submitted",

                submitDate: new Date(),
              },
            }
          );

        return {
          status_code: HttpStatus.OK,
          success: true,
          data: ClaimSubmissionResponse,
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ERROR_SUBMIT_CLAIM,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }
    } catch (error) {
      if (error.response.data) {
        console.log(
          error.response.data,
          "ppppppppppppppppppppppppp"
        );
      }
      next(error);
    }
  };

  getClaimDetails = async (
    req: Request,
    model: GetClaimDetailsViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      // generate token for submit claim by change helathcare  client credentials
      let tokenCredentialObj: any = {
        client_id: process.env.CLAIM_TOKEN_client_id ?? "",
        client_secret:
          process.env.CLAIM_TOKEN_client_secret ?? "",
        grant_type:
          process.env.CLAIM_TOKEN_grant_type ?? "",
      };
      let genrateClaimToken: any = await axios.post(
        process.env.CLAIM_TOKEN_URL ?? "",
        tokenCredentialObj
      );

      console.log(genrateClaimToken, "genrateClaimToken");
      if (
        !genrateClaimToken ||
        !genrateClaimToken.data.access_token
      )
        return {
          status_code: HttpStatus.UNAUTHORIZED,
          success: false,
          data: {
            message: errorMessage.NOT_AUTHORIZED_FOR_ACTION,
            error: errorMessage.ON_ADD_ERROR,
          },
        };

      let foundClaimData = await ClaimResponseModel.findOne(
        {
          _id: model.claimId,
        }
      );
      let foundDependentDetails =
        await InsuranceModel.findOne({
          _id: model.dependent,
        }).populate([
          {
            path: "insurance_company_id",
            select: { companyName: 1 },
          },
          {
            path: "patient_id",
            select: {
              first_name: 1,
              last_name: 1,
              date_of_birth: 1,
              state: 1,
              gender: 1,
            },
            populate: { path: "state" },
          },
        ]);

      let foundBillingProviderDetails =
        await DoctorModel.findOne({
          _id: model.billingProvider,
        }).populate([
          { path: "user_id" },
          { path: "state" },
          { path: "clinic_id" },
        ]);

      let foundServiceProviderDetails =
        await DoctorModel.findOne({
          _id: model.serviceProvider,
        }).populate([
          { path: "user_id" },
          { path: "clinic_id" },
        ]);

      let foundAppointmentDetails =
        await AppointmentModel.findOne({
          _id: model.appointmentId,
        }).populate([
          { path: "clinic_id", select: { clinic_name: 1 } },
          {
            path: "location_id",
            select: {
              branchName: 1,
              mobile_other: 1,
              taxonomy: 1,
            },
          },
        ]);

      if (!foundAppointmentDetails)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.apptNotFound,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };

      if (!foundBillingProviderDetails)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.CLAIM_BILLING_PROVIDER_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
        };

      if (!foundServiceProviderDetails)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.CLAIM_Service_PROVIDER_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
        };

      if (!foundClaimData)
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.CLAIM_INFO_NOT_FOUND_THIS_CLAIMID,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };

      let foundReceiverDetails: any,
        foundSubscriberDetails: any;
      if (
        foundDependentDetails &&
        foundDependentDetails!.insurance_company_id
      )
        foundReceiverDetails =
          foundDependentDetails.insurance_company_id;
      else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message:
              errorMessage.CLAIM_RECEIVERER_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }

      if (
        foundDependentDetails &&
        foundDependentDetails.patient_id
      )
        foundSubscriberDetails =
          foundDependentDetails.patient_id;
      else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.CLAIM_PATIENT_NOT_FOUND,
            error: errorMessage.ON_ADD_ERROR,
          },
        };
      }

      let clinicData = <DocumentType<Clinic>>(
        foundAppointmentDetails!.clinic_id
      );
      let location_details = <DocumentType<ClinicLocation>>(
        foundAppointmentDetails!.location_id
      );

      let subscriberData = <DocumentType<Patients>>(
        foundDependentDetails.patient_id
      );

      let ser_Prov_clinic_details = <DocumentType<Clinic>>(
        foundServiceProviderDetails.clinic_id
      );

      let bill_Prov_clinic_details = <DocumentType<Clinic>>(
        foundBillingProviderDetails.clinic_id
      );

      ////////////////////////////////////////////////////

      let data = {
        controlNumber: foundClaimData!.controlNumber,
        tradingPartnerServiceId:
          foundClaimData!.tradingPartnerServiceId,
        providers: [
          {
            organizationName:
              bill_Prov_clinic_details.clinic_name,
            taxId: location_details.taxonomy,

            providerType: "BillingProvider",
          },
          {
            organizationName:
              ser_Prov_clinic_details.clinic_name,
            npi: foundServiceProviderDetails.npiNo,
            providerType: "ServiceProvider",
          },
        ],
        subscriber: {
          memberId: foundDependentDetails.subscriber_id,
          firstName: Utility.getDecryptText(
            subscriberData.first_name
          ),
          lastName: Utility.getDecryptText(
            subscriberData.last_name
          ),
          gender: subscriberData.gender
            .charAt(0)
            .toUpperCase(),
          dateOfBirth: Utility.changeDateForClaim(
            subscriberData.date_of_birth
          ), //"18800102",
          groupNumber: "18800102", //foundDependentDetails.group_number,
        },
        dependent: {
          firstName: Utility.getDecryptText(
            subscriberData.first_name
          ),
          lastName: Utility.getDecryptText(
            subscriberData.last_name
          ),
          gender: subscriberData.gender
            .charAt(0)
            .toUpperCase(),
          dateOfBirth: Utility.changeDateForClaim(
            subscriberData.date_of_birth
          ), // "18800101",
          groupNumber: "18800102", //foundDependentDetails.group_number,
        },
        encounter: {
          beginningDateOfService:
            Utility.changeDateForClaim(
              foundAppointmentDetails.startDateTime
            ),
          endDateOfService: Utility.changeDateForClaim(
            foundAppointmentDetails.endDateTime
          ),
          trackingNumber:
            foundClaimData.claimReference
              .patientControlNumber,
        },
      };

      ///*******use dummy data before use paid apis---sandbox*****************///*/

      let dummyData = {
        controlNumber: "000000001",
        tradingPartnerServiceId: "serviceId",
        providers: [
          {
            organizationName: "TestProvider",
            taxId: "0123456789",
            providerType: "BillingProvider",
          },
          {
            organizationName: "happy doctors group",
            npi: "1760854442",
            providerType: "ServiceProvider",
          },
        ],
        subscriber: {
          memberId: "0000000000",
          firstName: "johnone",
          lastName: "doeone",
          gender: "M",
          dateOfBirth: "18800102",
          groupNumber: "0000000000",
        },
        dependent: {
          firstName: "janeone",
          lastName: "doeone",
          gender: "F",
          dateOfBirth: "18800101",
          groupNumber: "0000000000",
        },
        encounter: {
          beginningDateOfService: "20100101",
          endDateOfService: "20100102",
          trackingNumber: "ABCD",
        },
      };

      // return {
      //   status_code: HttpStatus.OK,
      //   success: true,
      //   data: data,
      // };
      //////////////////////////////////////////////////////////////////
      console.log(data, "data");
      let foundClaimDetails = await axios.post(
        process.env.CLAIM_STATUS_DETAILS_URL ?? "",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${genrateClaimToken.data.access_token}`,
          },
        }
      );

      if (foundClaimDetails) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: foundClaimDetails.data,
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.CLAIM_INFO_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      if (error) {
        // console.log(JSON.stringify(error), "uioo");
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.CLAIM_INFO_NOT_FOUND,
            error: error,
          },
        };
      }
      next(error);
    }
  };

  getClaimData = async (
    req: Request,
    model: CheckMongoIdViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const data = await ClaimResponseModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(
              req.params._id.toString()
            ),
          },
        },

        {
          $lookup: {
            from: "super_bill",
            localField: "superBillId",
            foreignField: "_id",
            pipeline: [
              //{ $match: superBillCondition },

              {
                $lookup: {
                  from: "icts",
                  localField: "icd",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        ictCode: 1,
                        codeCategory: 1,
                        description: 1,
                      },
                    },
                  ],
                  as: "ictData",
                },
              },
              // {
              //   $unwind: {
              //     path: "$ictData",
              //     preserveNullAndEmptyArrays: true,
              //   },
              // },

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
              // {
              //   $unwind: {
              //     path: "$modifierData",
              //     preserveNullAndEmptyArrays: true,
              //   },
              // },

              {
                $lookup: {
                  from: "cpt",
                  localField: "cpt.cpt_code_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        cptCode: 1,
                        description: 1,
                      },
                    },
                  ],
                  as: "cptData",
                },
              },
              // {
              //   $unwind: {
              //     path: "$cptData",
              //     preserveNullAndEmptyArrays: true,
              //   },
              // },

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
                    { $project: { userData: 1 } },
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
                    { $project: { userData: 1 } },
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
                  localField: "referring_provider_id",
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
                    { $project: { userData: 1 } },
                  ],
                  as: "referingProviderData",
                },
              },
              {
                $unwind: {
                  path: "$referingProviderData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $lookup: {
                  from: "patients",
                  localField: "patient_id",
                  foreignField: "_id",

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
                  from: "appointment",
                  localField: "appointment_id",
                  foreignField: "_id",
                  pipeline: [
                    // { $match: appointmentCondition },
                    {
                      $lookup: {
                        from: "appointment_type",
                        localField: "appointmentType_id",
                        foreignField: "_id",
                        pipeline: [
                          { $project: { type: 1 } },
                        ],
                        as: "appointmentTypeData",
                      },
                    },
                    {
                      $unwind: {
                        path: "$appointmentTypeData",
                        preserveNullAndEmptyArrays: true,
                      },
                    },
                    {
                      $lookup: {
                        from: "clinic_locations",
                        localField: "location_id",
                        foreignField: "_id",
                        pipeline: [
                          { $project: { branchName: 1 } },
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
                  from: "insurance",
                  localField: "insurance_id",
                  foreignField: "_id",
                  //pipeline: [{ $match: insuranceCondition }],
                  as: "insuranceData",
                },
              },
              {
                $unwind: {
                  path: "$insuranceData",
                  preserveNullAndEmptyArrays: true,
                },
              },
            ],
            as: "superbillData",
          },
        },
        {
          $unwind: {
            path: "$superbillData",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            _id: 1,

            status: 1,

            controlNumber: 1,
            tradingPartnerServiceId: 1,
            claimReference: 1,
            meta: 1,
            editStatus: 1,
            payer: 1,
            createdAt: 1,
            updatedAt: 1,
            invoice: 1,
            superBillId: 1,
            clinic_id: 1,
            superbillData: 1,
          },
        },
      ]);
      if (data && data.length) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: data[0],
        };
      } else
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.CLAIM_INFO_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  getClaimList = async (
    req: Request,
    model: GetClaimListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      if (!model.clinic_id) {
        return {
          status_code: HttpStatus.OK,
          data: { data: [] },
          success: true,
        };
      }

      const count = model.pageSize ? model.pageSize : 50;
      const page = model.pageNumber ? model.pageNumber : 1;
      const skip = count * (page - 1);

      let condition: any = {
        clinic_id: new mongoose.Types.ObjectId(
          model.clinic_id.toString()
        ),
      };

      let superBillCondition: any = {};
      let appointmentCondition: any = {};
      let insuranceCondition: any = {};

      // if (model.claimSubDateFrom) {
      //   let startTime = new Date(model.claimSubDateFrom);
      //   startTime.setHours(0, 0, 0, 0);
      //   let endTime = new Date(model.claimSubDateFrom);
      //   endTime.setHours(23, 59, 59, 999);
      //   condition.createdAt = {
      //     $gte: startTime,
      //   };
      // }
      // if (model.claimSubDateTo) {
      //   let startTime = new Date(model.claimSubDateTo);
      //   startTime.setHours(0, 0, 0, 0);
      //   let endTime = new Date(model.claimSubDateTo);
      //   endTime.setHours(23, 59, 59, 999);
      //   condition.createdAt = {
      //     $lte: endTime,
      //   };
      // }

      if (model.claimSubDateFrom) {
        let startTime = new Date(model.claimSubDateFrom);
        startTime.setHours(0, 0, 0, 0);
        condition.createdAt = {
          $gte: startTime,
        };
      }
      if (model.claimSubDateTo) {
        let endTime = new Date(model.claimSubDateTo);
        endTime.setHours(23, 59, 59, 999);
        if ("createdAt" in condition)
          condition.createdAt.$lte = endTime;
        else
          condition.createdAt = {
            $lte: endTime,
          };
      }

      if (model.claimId)
        condition = {
          "claimReference.rhclaimNumber": model.claimId,
        };

      if (model.invoice) condition.invoice = model.invoice;

      if (model.payer)
        condition.payer.PayerName = model.payer;

      if (model.billing_provider_id)
        superBillCondition.billing_provider_id =
          new mongoose.Types.ObjectId(
            model.billing_provider_id!.toString()
          );

      if (model.rendering_provider_id)
        superBillCondition.rendering_provider_id =
          new mongoose.Types.ObjectId(
            model.rendering_provider_id!.toString()
          );

      if (model.referring_provider_id)
        superBillCondition.referring_provider_id =
          new mongoose.Types.ObjectId(
            model.referring_provider_id!.toString()
          );

      if (model.patient_id)
        superBillCondition.patient_id =
          new mongoose.Types.ObjectId(
            model.patient_id.toString()
          );

      if (model.insurance_plan_type)
        insuranceCondition.insurance_plan_type =
          model.insurance_plan_type;

      if (model.visitType)
        appointmentCondition.visitType = model.visitType;

      if (model.location_id)
        appointmentCondition.location_id =
          new mongoose.Types.ObjectId(
            model.location_id!.toString()
          );

      if (model.case_type)
        appointmentCondition.appointmentType_id =
          new mongoose.Types.ObjectId(
            model.case_type!.toString()
          );

      // if (model.startDateTime) {
      //   let startTime = new Date(model.startDateTime);
      //   startTime.setHours(0, 0, 0, 0);
      //   let endTime = new Date(model.startDateTime);
      //   endTime.setHours(23, 59, 59, 999);
      //   appointmentCondition.startDateTime = {
      //     $gte: startTime,
      //     //$lte: endTime,
      //   };
      // }
      // if (model.endDateTime) {
      //   let startTime = new Date(model.endDateTime);
      //   startTime.setHours(0, 0, 0, 0);
      //   let endTime = new Date(model.endDateTime);
      //   endTime.setHours(23, 59, 59, 999);
      //   appointmentCondition.endDateTime = {
      //     //$gte: startTime,
      //     $lte: endTime,
      //   };
      // }

      if (model.startDateTime) {
        let startTime = new Date(model.startDateTime);
        startTime.setHours(0, 0, 0, 0);
        appointmentCondition.startDateTime = {
          $gte: startTime,
        };
      }
      if (model.endDateTime) {
        let endTime = new Date(model.endDateTime);
        endTime.setHours(23, 59, 59, 999);
        if ("endDateTime" in appointmentCondition)
          appointmentCondition.endDateTime.$lte = endTime;
        else
          appointmentCondition.endDateTime = {
            $lte: endTime,
          };
      }

      if (model.cpt) {
        superBillCondition.cpt = {
          $elemMatch: {
            cpt_code_id: {
              $eq: new mongoose.Types.ObjectId(
                model.cpt!.toString()
              ),
            },
          },
        };
      }

      if (model.icd)
        superBillCondition.icd =
          new mongoose.Types.ObjectId(
            model.icd!.toString()
          );

      const data = await ClaimResponseModel.aggregate([
        { $match: condition },
        {
          $sort: { createdAt: -1 },
        },

        {
          $lookup: {
            from: "super_bill",
            localField: "superBillId",
            foreignField: "_id",
            pipeline: [
              { $match: superBillCondition },

              {
                $lookup: {
                  from: "icts",
                  localField: "icd",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        ictCode: 1,
                        codeCategory: 1,
                        description: 1,
                      },
                    },
                  ],
                  as: "ictData",
                },
              },
              // {
              //   $unwind: {
              //     path: "$ictData",
              //     preserveNullAndEmptyArrays: true,
              //   },
              // },

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
              // {
              //   $unwind: {
              //     path: "$modifierData",
              //     preserveNullAndEmptyArrays: true,
              //   },
              // },

              {
                $lookup: {
                  from: "cpt",
                  localField: "cpt.cpt_code_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        cptCode: 1,
                        description: 1,
                      },
                    },
                  ],
                  as: "cptData",
                },
              },
              // {
              //   $unwind: {
              //     path: "$cptData",
              //     preserveNullAndEmptyArrays: true,
              //   },
              // },

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
                    { $project: { userData: 1 } },
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
                    { $project: { userData: 1 } },
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
                  localField: "referring_provider_id",
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
                    { $project: { userData: 1 } },
                  ],
                  as: "referingProviderData",
                },
              },
              {
                $unwind: {
                  path: "$referingProviderData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $lookup: {
                  from: "patients",
                  localField: "patient_id",
                  foreignField: "_id",

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
                  from: "billingCheckout",
                  localField: "appointment_id",
                  foreignField: "appointment_id",

                  as: "billingCheckoutData",
                },
              },
              {
                $unwind: {
                  path: "$billingCheckoutData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $lookup: {
                  from: "appointment",
                  localField: "appointment_id",
                  foreignField: "_id",
                  pipeline: [
                    { $match: appointmentCondition },
                    {
                      $lookup: {
                        from: "appointment_type",
                        localField: "appointmentType_id",
                        foreignField: "_id",
                        pipeline: [
                          { $project: { type: 1 } },
                        ],
                        as: "appointmentTypeData",
                      },
                    },
                    {
                      $unwind: {
                        path: "$appointmentTypeData",
                        preserveNullAndEmptyArrays: true,
                      },
                    },
                    {
                      $lookup: {
                        from: "clinic_locations",
                        localField: "location_id",
                        foreignField: "_id",
                        pipeline: [
                          { $project: { branchName: 1 } },
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
                  ],
                  as: "appointmentData",
                },
              },
              {
                $unwind: {
                  path: "$appointmentData",
                  preserveNullAndEmptyArrays: false,
                },
              },
              {
                $lookup: {
                  from: "insurance",
                  localField: "insurance_id",
                  foreignField: "_id",
                  pipeline: [
                    { $match: insuranceCondition },
                  ],
                  as: "insuranceData",
                },
              },
              {
                $unwind: {
                  path: "$insuranceData",
                  preserveNullAndEmptyArrays: false,
                },
              },
            ],
            as: "superbillData",
          },
        },
        {
          $unwind: {
            path: "$superbillData",
            preserveNullAndEmptyArrays: false,
          },
        },

        {
          $facet: {
            totalCount: [{ $count: "sum" }],
            aggregatedData: [
              {
                $project: {
                  _id: 1,

                  status: 1,

                  controlNumber: 1,
                  tradingPartnerServiceId: 1,
                  claimReference: 1,
                  meta: 1,
                  editStatus: 1,
                  payer: 1,
                  createdAt: 1,
                  updatedAt: 1,
                  invoice: 1,
                  superBillId: 1,
                  clinic_id: 1,
                  superbillData: 1,
                  billingCheckoutData: 1,
                },
              },
              { $limit: skip + count },
              { $skip: skip },
            ],
          },
        },
      ]);

      if (!data[0].aggregatedData[0])
        return {
          success: true,
          status_code: HttpStatus.OK,
          data: { data: [] },
        };

      if (data && data[0].aggregatedData.length > 0) {
        let finalResponse: any = [];
        data[0].aggregatedData.forEach((claimObj) => {
          let tempObj1: any = {
            claim_id: claimObj._id,
            superbill_id: claimObj.superbillData._id,
            clinic_id: claimObj.superbillData.clinic_id,
            insurance_id:
              claimObj.superbillData.insurance_id,
            claim_number:
              claimObj.claimReference.rhclaimNumber,
            invoice_number: claimObj.invoice,
            clearing_house: "",
            chart_no:
              claimObj.superbillData.patientData.patientId,
            patient_dob:
              claimObj.superbillData.patientData
                .date_of_birth,
            patientName:
              Utility.getDecryptText(
                claimObj.superbillData.patientData
                  .first_name
              ) +
              Utility.getDecryptText(
                claimObj.superbillData.patientData.last_name
              ),
            billingProvider:
              claimObj.superbillData.billingProviderData
                .userData.first_name +
              " " +
              claimObj.superbillData.billingProviderData
                .userData.last_name,

            referingProvider:
              claimObj.superbillData.referingProviderData
                .userData.first_name +
              " " +
              claimObj.superbillData.referingProviderData
                .userData.last_name,
            renderingProvider:
              claimObj.superbillData.renderingProviderData
                .userData.first_name +
              " " +
              claimObj.superbillData.renderingProviderData
                .userData.last_name,
            payer: claimObj.payer.payerName,
            insurance_plan:
              claimObj.superbillData.insuranceData
                .insurance_plan_type,
            insurance_type:
              claimObj.superbillData.insuranceData.coverage,
            dos: claimObj.superbillData.appointmentData
              .startDateTime,
            dos_end:
              claimObj.superbillData.appointmentData
                .endDateTime,
            claim_submission_date: claimObj.createdAt,
            claim_status: "",
            claim_ack_status: "",
            case_type:
              claimObj.superbillData.appointmentData
                .visitType,
            case_name:
              claimObj.superbillData.appointmentData
                .appointmentTypeData.type,

            id_or_policy: "",
            location:
              claimObj.superbillData.appointmentData
                .locationData.branchName,
            cpt: claimObj!.superbillData.cptData,
            icd: claimObj.superbillData!.ictData,
            modifier: claimObj.superbillData.modifierData,
            charges: claimObj.superbillData!.total_amount,
            payment: 0,
            adjustment: 0,
            patient_balance: 0,
            ins_balance: 0,
            remittance_code: "",
            batch: 0,
            user: "",
            type: "",
            appointment_id:
              claimObj.superbillData.appointment_id,
            checkout_id: claimObj.superbillData
              .billingCheckoutData
              ? claimObj.superbillData.billingCheckoutData
                  ._id
              : null,
          };

          finalResponse.push(tempObj1);
        });

        let obj = {
          data: finalResponse,
          // count: result.totalDocs,
          totalDocs: data[0].totalCount[0].sum,
          // pageNumber: req.body.page,
          // pageSize: count,
          // totalPages: Math.ceil(
          //   data[0].aggregatedData.length / count
          // ),
        };
        return {
          status_code: HttpStatus.OK,
          data: obj,
          success: true,
        };
      } else {
        console.log("-hererehrherh");
        return {
          status_code: HttpStatus.OK,
          data: [],
          success: true,
        };
      }
    } catch (error) {
      next(error);
    }
  };

  updateEdiStatus = async (
    req: Request,
    model: UpdateEditStatusViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let userDetails = <DocumentType<User>>req.user;
      let updatedResult: any;
      await Promise.all(
        model.updateArr.map(async (obj) => {
          updatedResult =
            await BillingCheckoutModel.updateMany(
              { appointment_id: obj.appointment_id },
              {
                "insurance.acknowledgementStatus":
                  obj.acknowledgementStatus,
                "insurance.claimStatus": obj.claimStatus,
              }
            );
        })
      );

      console.log(updatedResult, "");

      if (
        updatedResult &&
        updatedResult.modifiedCount > 0
      ) {
        // Add Activity History
        let addHistory = await HistoryModel.create({
          user_id: userDetails._id,
          description: `Claim status updated successfully`,
          type: EHistoryActivityTypeValues.CLAIM,
        });

        return {
          success: true,
          status_code: HttpStatus.OK,
          data: errorMessage.UPDATE_SUCCESSFULL,
        };
      } else
        return {
          success: false,
          status_code: HttpStatus.BAD_REQUEST,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_UPDATE_ERROR,
          },
        };
    } catch (error) {
      next(error);
    }
  };

  exportClaimList = async (
    req: Request,
    model: GetClaimListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      let claimSheet: any = workbook.sheet("Sheet1");
      let claimSheetHeader = [
        "Claim",
        "Invoice",
        "Clearing House",
        "Chart No.",
        "Patient(DOB)",
        "Patient Name",
        "Billing Provider",
        "Referring Provider",
        "Payer",
        "Insurance Plan",
        "DOS(From-To)",
        "Claim Submission Date",
        "Claim Status",
        "Claim (Ack.)Status",
        "Case Type",
        "Case Name",
        "ID/Policy",

        "Charges($)",
        "Payment($)",
        "Adjusted($)",
        "Patient Bal.($)",
        "Ins.Bal($)",
        "Remittance Code",

        // "Location",
        // "CPT",
        // "ICD",
        // "Modifier($)",

        // "Batch",
        // "User",
        // "Action",
        // "Type",
      ];

      claimSheetHeader.forEach((el: any, i: number) => {
        claimSheet
          .cell(String.fromCharCode(i + 65) + "1")
          .value(el)
          .style({
            border: true,
            fontFamily: "Calibri",
            fill: {
              type: "solid",
              color: { rgb: "d9d9d9" },
            },
          });
      });

      if (!model.clinic_id) {
        return {
          status_code: HttpStatus.OK,
          data: [],
          success: true,
        };
      }

      const count = model.pageSize ? model.pageSize : 50;
      const page = model.pageNumber ? model.pageNumber : 1;
      const skip = count * (page - 1);

      let condition: any = {
        clinic_id: new mongoose.Types.ObjectId(
          model.clinic_id.toString()
        ),
      };

      let superBillCondition: any = {};
      let appointmentCondition: any = {};
      let insuranceCondition: any = {};

      if (model.claimSubDateFrom) {
        let startTime = new Date(model.claimSubDateFrom);
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(model.claimSubDateFrom);
        endTime.setHours(23, 59, 59, 999);
        condition.createdAt = {
          $gte: startTime,
          //$lte: endTime,
        };
      }
      if (model.claimSubDateTo) {
        let startTime = new Date(model.claimSubDateTo);
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(model.claimSubDateTo);
        endTime.setHours(23, 59, 59, 999);
        condition.createdAt = {
          // $gte: startTime,
          $lte: endTime,
        };
      }

      if (model.claimId)
        condition = {
          "claimReference.rhclaimNumber": model.claimId,
        };

      if (model.invoice) condition.invoice = model.invoice;

      if (model.payer)
        condition.payer.PayerName = model.payer;

      if (model.billing_provider_id)
        superBillCondition.billing_provider_id =
          new mongoose.Types.ObjectId(
            model.billing_provider_id!.toString()
          );

      if (model.rendering_provider_id)
        superBillCondition.rendering_provider_id =
          new mongoose.Types.ObjectId(
            model.rendering_provider_id!.toString()
          );

      if (model.referring_provider_id)
        superBillCondition.referring_provider_id =
          new mongoose.Types.ObjectId(
            model.referring_provider_id!.toString()
          );

      if (model.patient_id)
        superBillCondition.patient_id =
          new mongoose.Types.ObjectId(
            model.patient_id.toString()
          );

      if (model.insurance_plan_type)
        insuranceCondition.insurance_plan_type =
          model.insurance_plan_type;

      if (model.visitType)
        appointmentCondition.visitType = model.visitType;

      if (model.location_id)
        appointmentCondition.location_id =
          new mongoose.Types.ObjectId(
            model.location_id!.toString()
          );

      if (model.case_type)
        appointmentCondition.appointmentType_id =
          new mongoose.Types.ObjectId(
            model.case_type!.toString()
          );

      if (model.startDateTime) {
        let startTime = new Date(model.startDateTime);
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(model.startDateTime);
        endTime.setHours(23, 59, 59, 999);
        appointmentCondition.startDateTime = {
          $gte: startTime,
          //$lte: endTime,
        };
      }
      if (model.endDateTime) {
        let startTime = new Date(model.endDateTime);
        startTime.setHours(0, 0, 0, 0);
        let endTime = new Date(model.endDateTime);
        endTime.setHours(23, 59, 59, 999);
        appointmentCondition.endDateTime = {
          //$gte: startTime,
          $lte: endTime,
        };
      }

      const data = await ClaimResponseModel.aggregate([
        { $match: condition },

        {
          $lookup: {
            from: "super_bill",
            localField: "superBillId",
            foreignField: "_id",
            pipeline: [
              { $match: superBillCondition },

              {
                $lookup: {
                  from: "icts",
                  localField: "icd",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        ictCode: 1,
                        codeCategory: 1,
                        description: 1,
                      },
                    },
                  ],
                  as: "ictData",
                },
              },
              // {
              //   $unwind: {
              //     path: "$ictData",
              //     preserveNullAndEmptyArrays: true,
              //   },
              // },

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
              // {
              //   $unwind: {
              //     path: "$modifierData",
              //     preserveNullAndEmptyArrays: true,
              //   },
              // },

              {
                $lookup: {
                  from: "cpt",
                  localField: "cpt.cpt_code_id",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $project: {
                        cptCode: 1,
                        description: 1,
                      },
                    },
                  ],
                  as: "cptData",
                },
              },
              // {
              //   $unwind: {
              //     path: "$cptData",
              //     preserveNullAndEmptyArrays: true,
              //   },
              // },

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
                    { $project: { userData: 1 } },
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
                    { $project: { userData: 1 } },
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
                  localField: "referring_provider_id",
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
                    { $project: { userData: 1 } },
                  ],
                  as: "referingProviderData",
                },
              },
              {
                $unwind: {
                  path: "$referingProviderData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $lookup: {
                  from: "patients",
                  localField: "patient_id",
                  foreignField: "_id",

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
                  from: "billingCheckout",
                  localField: "appointment_id",
                  foreignField: "appointment_id",

                  as: "billingCheckoutData",
                },
              },
              {
                $unwind: {
                  path: "$billingCheckoutData",
                  preserveNullAndEmptyArrays: true,
                },
              },

              {
                $lookup: {
                  from: "appointment",
                  localField: "appointment_id",
                  foreignField: "_id",
                  pipeline: [
                    { $match: appointmentCondition },
                    {
                      $lookup: {
                        from: "appointment_type",
                        localField: "appointmentType_id",
                        foreignField: "_id",
                        pipeline: [
                          { $project: { type: 1 } },
                        ],
                        as: "appointmentTypeData",
                      },
                    },
                    {
                      $unwind: {
                        path: "$appointmentTypeData",
                        preserveNullAndEmptyArrays: true,
                      },
                    },
                    {
                      $lookup: {
                        from: "clinic_locations",
                        localField: "location_id",
                        foreignField: "_id",
                        pipeline: [
                          { $project: { branchName: 1 } },
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
                  ],
                  as: "appointmentData",
                },
              },
              {
                $unwind: {
                  path: "$appointmentData",
                  preserveNullAndEmptyArrays: false,
                },
              },
              {
                $lookup: {
                  from: "insurance",
                  localField: "insurance_id",
                  foreignField: "_id",
                  pipeline: [
                    { $match: insuranceCondition },
                  ],
                  as: "insuranceData",
                },
              },
              {
                $unwind: {
                  path: "$insuranceData",
                  preserveNullAndEmptyArrays: false,
                },
              },
            ],
            as: "superbillData",
          },
        },
        {
          $unwind: {
            path: "$superbillData",
            preserveNullAndEmptyArrays: false,
          },
        },

        {
          $facet: {
            totalCount: [{ $count: "sum" }],
            aggregatedData: [
              {
                $project: {
                  _id: 1,

                  status: 1,

                  controlNumber: 1,
                  tradingPartnerServiceId: 1,
                  claimReference: 1,
                  meta: 1,
                  editStatus: 1,
                  payer: 1,
                  createdAt: 1,
                  updatedAt: 1,
                  invoice: 1,
                  superBillId: 1,
                  clinic_id: 1,
                  superbillData: 1,
                  billingCheckoutData: 1,
                },
              },
              { $limit: skip + count },
              { $skip: skip },
            ],
          },
        },
      ]);

      if (!data[0].aggregatedData[0])
        return {
          success: true,
          status_code: HttpStatus.OK,
          data: [],
        };

      if (data && data[0].aggregatedData.length > 0) {
        let finalResponse: any = [];
        data[0].aggregatedData.forEach((claimObj: any) => {
          let tempObj1: any = {
            claim_id: claimObj._id,
            superbill_id: claimObj.superbillData._id,
            clinic_id: claimObj.superbillData.clinic_id,
            insurance_id:
              claimObj.superbillData.insurance_id,
            claim_number:
              claimObj.claimReference.rhclaimNumber,
            invoice_number: claimObj.invoice,
            clearing_house: "",
            chart_no:
              claimObj.superbillData.patientData.patientId,
            patient_dob:
              claimObj.superbillData.patientData
                .date_of_birth,
            patientName:
              Utility.getDecryptText(
                claimObj.superbillData.patientData
                  .first_name
              ) +
              Utility.getDecryptText(
                claimObj.superbillData.patientData.last_name
              ),
            billingProvider:
              claimObj.superbillData.billingProviderData
                .userData.first_name +
              " " +
              claimObj.superbillData.billingProviderData
                .userData.last_name,

            referingProvider:
              claimObj.superbillData.referingProviderData
                .userData.first_name +
              " " +
              claimObj.superbillData.referingProviderData
                .userData.last_name,
            renderingProvider:
              claimObj.superbillData.renderingProviderData
                .userData.first_name +
              " " +
              claimObj.superbillData.renderingProviderData
                .userData.last_name,
            payer: claimObj.payer.payerName,
            insurance_plan:
              claimObj.superbillData.insuranceData
                .insurance_plan_type,
            insurance_type:
              claimObj.superbillData.insuranceData.coverage,
            dos: claimObj.superbillData.appointmentData
              .startDateTime,
            dos_end:
              claimObj.superbillData.appointmentData
                .endDateTime,
            claim_submission_date: claimObj.createdAt,
            claim_status: "",
            claim_ack_status: "",
            case_type:
              claimObj.superbillData.appointmentData
                .visitType,
            case_name:
              claimObj.superbillData.appointmentData
                .appointmentTypeData.type,

            id_or_policy: "",
            location:
              claimObj.superbillData.appointmentData
                .locationData.branchName,
            cpt: claimObj!.superbillData.cptData,
            icd: claimObj.superbillData!.ictData,
            modifier: claimObj.superbillData.modifierData,
            charges: claimObj.superbillData!.total_amount,
            payment: 0,
            adjustment: 0,
            patient_balance: 0,
            ins_balance: 0,
            remittance_code: "",
            batch: 0,
            user: "",
            type: "",
            appointment_id:
              claimObj.superbillData.appointment_id,
            checkout_id: claimObj.superbillData
              .billingCheckoutData
              ? claimObj.superbillData.billingCheckoutData
                  ._id
              : null,
          };

          finalResponse.push(tempObj1);
        });

        // write data in excel
        let claimData = finalResponse;

        let sheetStyle = {
          border: true,
          fontFamily: "Calibri",
        };

        claimData.forEach((el: any, i: number) => {
          console.log(el);
          // let date = moment(el.startDateTime).format(
          //   "DD-MM-YYYY"
          // );

          claimSheet
            .cell("A" + (i + 2))
            .value(el.claim_number)
            .style(sheetStyle);

          claimSheet
            .cell("B" + (i + 2))
            .value(el.invoice_number)
            .style(sheetStyle);

          claimSheet
            .cell("C" + (i + 2))
            .value(el.clearing_house)
            .style(sheetStyle);

          claimSheet
            .cell("D" + (i + 2))
            .value(el.chart_no)
            .style(sheetStyle);

          claimSheet
            .cell("E" + (i + 2))
            .value(
              moment(el.patient_dob).format("DD-MM-YYYY")
            )
            .style(sheetStyle);
          claimSheet;

          claimSheet
            .cell("F" + (i + 2))
            .value(el.patientName)
            .style(sheetStyle);

          claimSheet
            .cell("G" + (i + 2))
            .value(el.billingProvider)
            .style(sheetStyle);

          claimSheet
            .cell("H" + (i + 2))
            .value(el.referingProvider)
            .style(sheetStyle);

          claimSheet
            .cell("I" + (i + 2))
            .value(el.payer)
            .style(sheetStyle);

          claimSheet
            .cell("J" + (i + 2))
            .value(el.insurance_plan)
            .style(sheetStyle);

          claimSheet
            .cell("K" + (i + 2))
            .value(
              `${moment(el.dos).format(
                "DD-MM-YYYY"
              )} -to -${moment(el.dos_end).format(
                "DD-MM-YYYY"
              )}`
            )
            .style(sheetStyle);

          claimSheet
            .cell("L" + (i + 2))
            .value(el.claim_submission_date)
            .style(sheetStyle);

          claimSheet
            .cell("M" + (i + 2))
            .value(el.claim_status)
            .style(sheetStyle);

          claimSheet
            .cell("N" + (i + 2))
            .value(el.claim_ack_status)
            .style(sheetStyle);

          claimSheet
            .cell("O" + (i + 2))
            .value(el.case_type)
            .style(sheetStyle);

          claimSheet
            .cell("P" + (i + 2))
            .value(el.case_name)
            .style(sheetStyle);

          claimSheet
            .cell("Q" + (i + 2))
            .value(el.id_or_policy)
            .style(sheetStyle);

          claimSheet
            .cell("R" + (i + 2))
            .value(el.charges)
            .style(sheetStyle);

          claimSheet
            .cell("S" + (i + 2))
            .value(el.payment)
            .style(sheetStyle);

          claimSheet
            .cell("T" + (i + 2))
            .value(el.adjustment)
            .style(sheetStyle);

          claimSheet
            .cell("U" + (i + 2))
            .value(el.patient_balance)
            .style(sheetStyle);

          claimSheet
            .cell("V" + (i + 2))
            .value(el.ins_balance)
            .style(sheetStyle);

          claimSheet
            .cell("W" + (i + 2))
            .value(el.remittance_code)
            .style(sheetStyle);

          // claimSheet
          //   .cell("AB" + (i + 2))
          //   .value(el.batch)
          //   .style(sheetStyle);

          // claimSheet
          //   .cell("AC" + (i + 2))
          //   .value(el.user)
          //   .style(sheetStyle);

          // claimSheet
          //   .cell("AD" + (i + 2))
          //   .value(el.type)
          //   .style(sheetStyle);
          // claimSheet
          //   .cell("R" + (i + 2))
          //   .value(el.location)
          //   .style(sheetStyle);

          // claimSheet
          //   .cell("S" + (i + 2))
          //   .value(el.cpt)
          //   .style(sheetStyle);

          // claimSheet
          //   .cell("T" + (i + 2))
          //   .value(el.icd)
          //   .style(sheetStyle);

          // claimSheet
          //   .cell("U" + (i + 2))
          //   .value(el.modifier)
          //   .style(sheetStyle);
        });

        claimSheet.freezePanes(1, 1);

        const excelData: any = await workbook.outputAsync();
        await fs.writeFileSync(
          path.join(
            __dirname,
            "../../../../../public/upload/claims/Claim_Report.xlsx"
          ),
          excelData
        );
        let link = `http://${req.hostname}:${process.env.PORT}/upload/claims/Claim_Report.xlsx`;

        let excelFileName = "Claim_Report.xlsx";
        let response = {
          link,
          name: excelFileName,
        };
        return {
          status_code: HttpStatus.OK,
          data: response, //link,
          success: true,
        };
      } else {
        return {
          status_code: HttpStatus.OK,
          data: [],
          success: true,
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new ClaimServices();
