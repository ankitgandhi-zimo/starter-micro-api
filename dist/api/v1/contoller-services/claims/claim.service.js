"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumRoles = void 0;
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var moment_1 = __importDefault(require("moment"));
var common_methods_1 = __importDefault(require("../../common/common-methods"));
var erros_message_1 = __importDefault(require("../../common/erros_message"));
var doctor_model_1 = __importDefault(require("../../models/doctor.model"));
var history_model_1 = __importDefault(require("../../models/history.model"));
var insurance_model_1 = __importDefault(require("../../models/insurance/insurance.model"));
var axios_1 = __importDefault(require("axios"));
var fs_1 = __importDefault(require("fs"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var xlsx_populate_1 = __importDefault(require("xlsx-populate"));
var appointment_model_1 = __importDefault(require("../../models/appointment.model"));
var billing_checkout_model_1 = __importDefault(require("../../models/billing_checkout.model"));
var claim_response_model_1 = __importDefault(require("../../models/claim_response.model"));
var history_model_2 = require("../../models/history.model");
var super_bill_model_1 = __importDefault(require("../../models/super_bill.model"));
var EnumRoles;
(function (EnumRoles) {
    EnumRoles["SUPERADMIN"] = "superadmin";
})(EnumRoles = exports.EnumRoles || (exports.EnumRoles = {}));
var ClaimServices = /** @class */ (function () {
    function ClaimServices() {
        var _this = this;
        this.submitClaim = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, tokenCredentialObj, genrateClaimToken, control_number, serviceId, populatedFeilds, foundSuperBillDetails, foundDependentDetails, foundBillingProviderDetails, foundReferringProviderDetails, foundRenderingProviderDetails, foundReceiverDetails, foundSubscriberDetails, appData_1, clinicData, locationData, stateObj, stateNameValue, receiverData, subscriberData, subscriberStateData, referringProvUserData, rendringProvUserData, billingProvUserData, billingProvStateDetails, bill_Prov_clinic_details, serviceLineArr_1, data, dummyData, responseObject, ModelToSave, ClaimSubmissionResponse, addHistory, updateSuperBill, error_1;
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 9, , 10]);
                        userDetails = req.user;
                        tokenCredentialObj = {
                            client_id: (_a = process.env.CLAIM_TOKEN_client_id) !== null && _a !== void 0 ? _a : "",
                            client_secret: (_b = process.env.CLAIM_TOKEN_client_secret) !== null && _b !== void 0 ? _b : "",
                            grant_type: (_c = process.env.CLAIM_TOKEN_grant_type) !== null && _c !== void 0 ? _c : "",
                        };
                        return [4 /*yield*/, axios_1.default.post((_d = process.env.CLAIM_TOKEN_URL) !== null && _d !== void 0 ? _d : "", tokenCredentialObj)];
                    case 1:
                        genrateClaimToken = _g.sent();
                        // console.log(genrateClaimToken, "genrateClaimToken");
                        if (!genrateClaimToken ||
                            !genrateClaimToken.data.access_token)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NOT_AUTHORIZED_FOR_ACTION,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        control_number = "595455512";
                        serviceId = Math.random()
                            .toString(36)
                            .substr(2, 5);
                        populatedFeilds = [
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
                        return [4 /*yield*/, super_bill_model_1.default.findOne({
                                _id: model.superBillId,
                            }).populate(populatedFeilds)];
                    case 2:
                        foundSuperBillDetails = _g.sent();
                        if (!foundSuperBillDetails)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_INFO_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        console.log(JSON.stringify(foundSuperBillDetails));
                        if (foundSuperBillDetails &&
                            !foundSuperBillDetails.billing_provider_id)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_BILLING_PROVIDER_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        if (foundSuperBillDetails &&
                            !foundSuperBillDetails.referring_provider_id)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_Referring_PROVIDER_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        if (foundSuperBillDetails &&
                            !foundSuperBillDetails.referring_provider_id)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_Rendering_PROVIDER_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        foundDependentDetails = (foundSuperBillDetails.insurance_id);
                        foundBillingProviderDetails = foundSuperBillDetails.billing_provider_id;
                        foundReferringProviderDetails = foundSuperBillDetails.referring_provider_id;
                        foundRenderingProviderDetails = foundSuperBillDetails.rendering_provider_id;
                        foundReceiverDetails = void 0, foundSubscriberDetails = void 0;
                        if (foundDependentDetails &&
                            foundDependentDetails.insurance_company_id)
                            foundReceiverDetails =
                                foundDependentDetails.insurance_company_id;
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_RECEIVERER_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        }
                        if (foundDependentDetails &&
                            foundDependentDetails.patient_id)
                            foundSubscriberDetails =
                                foundDependentDetails.patient_id;
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_PATIENT_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        }
                        appData_1 = (foundSuperBillDetails.appointment_id);
                        clinicData = (appData_1.clinic_id);
                        locationData = (appData_1.location_id);
                        stateObj = (locationData.state);
                        stateNameValue = stateObj.stateCode;
                        receiverData = (foundDependentDetails.insurance_company_id);
                        subscriberData = (foundDependentDetails.patient_id);
                        subscriberStateData = (subscriberData.state);
                        referringProvUserData = (foundReferringProviderDetails.user_id);
                        rendringProvUserData = (foundRenderingProviderDetails.user_id);
                        billingProvUserData = (foundBillingProviderDetails.user_id);
                        billingProvStateDetails = foundBillingProviderDetails.state;
                        bill_Prov_clinic_details = (foundBillingProviderDetails.clinic_id);
                        serviceLineArr_1 = [];
                        // foundSubscriberDetails.cpt.forEach((obj: any) =>
                        foundSuperBillDetails.cpt.forEach(function (obj) {
                            console.log(obj.cpt_code_id.cptCode);
                            var temp = {
                                serviceDate: common_methods_1.default.changeDateForClaim(appData_1.startDateTime),
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
                            serviceLineArr_1.push(temp);
                        });
                        data = {
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
                                firstName: common_methods_1.default.getDecryptText(subscriberData.first_name),
                                lastName: common_methods_1.default.getDecryptText(subscriberData.last_name),
                                gender: subscriberData.gender,
                                dateOfBirth: common_methods_1.default.changeDateForClaim(subscriberData.date_of_birth),
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
                                firstName: common_methods_1.default.getDecryptText(subscriberData.first_name),
                                lastName: common_methods_1.default.getDecryptText(subscriberData.last_name),
                                gender: subscriberData.gender,
                                dateOfBirth: common_methods_1.default.changeDateForClaim(subscriberData.date_of_birth),
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
                                    organizationName: bill_Prov_clinic_details.clinic_name,
                                    address: {
                                        address1: foundBillingProviderDetails.address,
                                        city: foundBillingProviderDetails.city,
                                        state: billingProvStateDetails.stateCode,
                                        postalCode: foundBillingProviderDetails.postal_code,
                                    },
                                    contactInformation: {
                                        name: billingProvUserData.first_name +
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
                                    middleName: foundRenderingProviderDetails.middle_name
                                        ? foundRenderingProviderDetails.middle_name
                                        : rendringProvUserData.last_name,
                                    ssn: subscriberData.SSN
                                        ? subscriberData.SSN
                                        : "000000000",
                                },
                            ],
                            claimInformation: {
                                claimFilingCode: foundDependentDetails.insurance_plan_type,
                                //claimFilingCode: "MC",
                                patientControlNumber: control_number.toString(),
                                claimChargeAmount: foundSuperBillDetails.total_amount,
                                placeOfServiceCode: foundSuperBillDetails.place_of_service,
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
                                serviceLines: serviceLineArr_1,
                            },
                        };
                        dummyData = {
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
                        return [4 /*yield*/, axios_1.default.post((_e = process.env.CLAIM_SUBMISSION_URL) !== null && _e !== void 0 ? _e : "", 
                            //dummyData,
                            data, {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer ".concat(genrateClaimToken.data.access_token),
                                },
                            })];
                    case 3:
                        responseObject = _g.sent();
                        console.log(responseObject);
                        ModelToSave = __assign({}, responseObject.data);
                        ModelToSave.invoice =
                            common_methods_1.default.generateRandomNDigits(5);
                        // responseObject.data.superBillId = model.superBillId;
                        ModelToSave.clinic_id = (_f = clinicData._id) !== null && _f !== void 0 ? _f : null;
                        ModelToSave.superBillId = model.superBillId;
                        return [4 /*yield*/, claim_response_model_1.default.create(ModelToSave
                            //responseObject.data
                            )];
                    case 4:
                        ClaimSubmissionResponse = _g.sent();
                        if (!ClaimSubmissionResponse) return [3 /*break*/, 7];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Claim response added successfully",
                                type: history_model_2.EHistoryActivityTypeValues.CLAIM,
                            })];
                    case 5:
                        addHistory = _g.sent();
                        return [4 /*yield*/, super_bill_model_1.default.updateOne({ _id: model.superBillId }, {
                                ClaimStatusObject: {
                                    claimStatus: "submitted",
                                    submitDate: new Date(),
                                },
                            })];
                    case 6:
                        updateSuperBill = _g.sent();
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                success: true,
                                data: ClaimSubmissionResponse,
                            }];
                    case 7: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            success: false,
                            data: {
                                message: erros_message_1.default.ERROR_SUBMIT_CLAIM,
                                error: erros_message_1.default.ON_ADD_ERROR,
                            },
                        }];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_1 = _g.sent();
                        if (error_1.response.data) {
                            console.log(error_1.response.data, "ppppppppppppppppppppppppp");
                        }
                        next(error_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.getClaimDetails = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var tokenCredentialObj, genrateClaimToken, foundClaimData, foundDependentDetails, foundBillingProviderDetails, foundServiceProviderDetails, foundAppointmentDetails, foundReceiverDetails, foundSubscriberDetails, clinicData, location_details, subscriberData, ser_Prov_clinic_details, bill_Prov_clinic_details, data, dummyData, foundClaimDetails, error_2;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 8, , 9]);
                        tokenCredentialObj = {
                            client_id: (_a = process.env.CLAIM_TOKEN_client_id) !== null && _a !== void 0 ? _a : "",
                            client_secret: (_b = process.env.CLAIM_TOKEN_client_secret) !== null && _b !== void 0 ? _b : "",
                            grant_type: (_c = process.env.CLAIM_TOKEN_grant_type) !== null && _c !== void 0 ? _c : "",
                        };
                        return [4 /*yield*/, axios_1.default.post((_d = process.env.CLAIM_TOKEN_URL) !== null && _d !== void 0 ? _d : "", tokenCredentialObj)];
                    case 1:
                        genrateClaimToken = _f.sent();
                        console.log(genrateClaimToken, "genrateClaimToken");
                        if (!genrateClaimToken ||
                            !genrateClaimToken.data.access_token)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.UNAUTHORIZED,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.NOT_AUTHORIZED_FOR_ACTION,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        return [4 /*yield*/, claim_response_model_1.default.findOne({
                                _id: model.claimId,
                            })];
                    case 2:
                        foundClaimData = _f.sent();
                        return [4 /*yield*/, insurance_model_1.default.findOne({
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
                            ])];
                    case 3:
                        foundDependentDetails = _f.sent();
                        return [4 /*yield*/, doctor_model_1.default.findOne({
                                _id: model.billingProvider,
                            }).populate([
                                { path: "user_id" },
                                { path: "state" },
                                { path: "clinic_id" },
                            ])];
                    case 4:
                        foundBillingProviderDetails = _f.sent();
                        return [4 /*yield*/, doctor_model_1.default.findOne({
                                _id: model.serviceProvider,
                            }).populate([
                                { path: "user_id" },
                                { path: "clinic_id" },
                            ])];
                    case 5:
                        foundServiceProviderDetails = _f.sent();
                        return [4 /*yield*/, appointment_model_1.default.findOne({
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
                            ])];
                    case 6:
                        foundAppointmentDetails = _f.sent();
                        if (!foundAppointmentDetails)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.apptNotFound,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        if (!foundBillingProviderDetails)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_BILLING_PROVIDER_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        if (!foundServiceProviderDetails)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_Service_PROVIDER_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        if (!foundClaimData)
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_INFO_NOT_FOUND_THIS_CLAIMID,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        foundReceiverDetails = void 0, foundSubscriberDetails = void 0;
                        if (foundDependentDetails &&
                            foundDependentDetails.insurance_company_id)
                            foundReceiverDetails =
                                foundDependentDetails.insurance_company_id;
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_RECEIVERER_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        }
                        if (foundDependentDetails &&
                            foundDependentDetails.patient_id)
                            foundSubscriberDetails =
                                foundDependentDetails.patient_id;
                        else {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_PATIENT_NOT_FOUND,
                                        error: erros_message_1.default.ON_ADD_ERROR,
                                    },
                                }];
                        }
                        clinicData = (foundAppointmentDetails.clinic_id);
                        location_details = (foundAppointmentDetails.location_id);
                        subscriberData = (foundDependentDetails.patient_id);
                        ser_Prov_clinic_details = (foundServiceProviderDetails.clinic_id);
                        bill_Prov_clinic_details = (foundBillingProviderDetails.clinic_id);
                        data = {
                            controlNumber: foundClaimData.controlNumber,
                            tradingPartnerServiceId: foundClaimData.tradingPartnerServiceId,
                            providers: [
                                {
                                    organizationName: bill_Prov_clinic_details.clinic_name,
                                    taxId: location_details.taxonomy,
                                    providerType: "BillingProvider",
                                },
                                {
                                    organizationName: ser_Prov_clinic_details.clinic_name,
                                    npi: foundServiceProviderDetails.npiNo,
                                    providerType: "ServiceProvider",
                                },
                            ],
                            subscriber: {
                                memberId: foundDependentDetails.subscriber_id,
                                firstName: common_methods_1.default.getDecryptText(subscriberData.first_name),
                                lastName: common_methods_1.default.getDecryptText(subscriberData.last_name),
                                gender: subscriberData.gender
                                    .charAt(0)
                                    .toUpperCase(),
                                dateOfBirth: common_methods_1.default.changeDateForClaim(subscriberData.date_of_birth),
                                groupNumber: "18800102", //foundDependentDetails.group_number,
                            },
                            dependent: {
                                firstName: common_methods_1.default.getDecryptText(subscriberData.first_name),
                                lastName: common_methods_1.default.getDecryptText(subscriberData.last_name),
                                gender: subscriberData.gender
                                    .charAt(0)
                                    .toUpperCase(),
                                dateOfBirth: common_methods_1.default.changeDateForClaim(subscriberData.date_of_birth),
                                groupNumber: "18800102", //foundDependentDetails.group_number,
                            },
                            encounter: {
                                beginningDateOfService: common_methods_1.default.changeDateForClaim(foundAppointmentDetails.startDateTime),
                                endDateOfService: common_methods_1.default.changeDateForClaim(foundAppointmentDetails.endDateTime),
                                trackingNumber: foundClaimData.claimReference
                                    .patientControlNumber,
                            },
                        };
                        dummyData = {
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
                        return [4 /*yield*/, axios_1.default.post((_e = process.env.CLAIM_STATUS_DETAILS_URL) !== null && _e !== void 0 ? _e : "", data, {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer ".concat(genrateClaimToken.data.access_token),
                                },
                            })];
                    case 7:
                        foundClaimDetails = _f.sent();
                        if (foundClaimDetails) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: foundClaimDetails.data,
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_INFO_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _f.sent();
                        if (error_2) {
                            // console.log(JSON.stringify(error), "uioo");
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_INFO_NOT_FOUND,
                                        error: error_2,
                                    },
                                }];
                        }
                        next(error_2);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.getClaimData = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, claim_response_model_1.default.aggregate([
                                {
                                    $match: {
                                        _id: new mongoose_1.default.Types.ObjectId(req.params._id.toString()),
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
                            ])];
                    case 1:
                        data = _a.sent();
                        if (data && data.length) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    success: true,
                                    data: data[0],
                                }];
                        }
                        else
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.BAD_REQUEST,
                                    success: false,
                                    data: {
                                        message: erros_message_1.default.CLAIM_INFO_NOT_FOUND,
                                        error: erros_message_1.default.ON_FETCH_ERROR,
                                    },
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getClaimList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var count, page, skip, condition, superBillCondition, appointmentCondition, insuranceCondition, startTime, endTime, startTime, endTime, data, finalResponse_1, obj, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!model.clinic_id) {
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: { data: [] },
                                    success: true,
                                }];
                        }
                        count = model.pageSize ? model.pageSize : 50;
                        page = model.pageNumber ? model.pageNumber : 1;
                        skip = count * (page - 1);
                        condition = {
                            clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                        };
                        superBillCondition = {};
                        appointmentCondition = {};
                        insuranceCondition = {};
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
                            startTime = new Date(model.claimSubDateFrom);
                            startTime.setHours(0, 0, 0, 0);
                            condition.createdAt = {
                                $gte: startTime,
                            };
                        }
                        if (model.claimSubDateTo) {
                            endTime = new Date(model.claimSubDateTo);
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
                        if (model.invoice)
                            condition.invoice = model.invoice;
                        if (model.payer)
                            condition.payer.PayerName = model.payer;
                        if (model.billing_provider_id)
                            superBillCondition.billing_provider_id =
                                new mongoose_1.default.Types.ObjectId(model.billing_provider_id.toString());
                        if (model.rendering_provider_id)
                            superBillCondition.rendering_provider_id =
                                new mongoose_1.default.Types.ObjectId(model.rendering_provider_id.toString());
                        if (model.referring_provider_id)
                            superBillCondition.referring_provider_id =
                                new mongoose_1.default.Types.ObjectId(model.referring_provider_id.toString());
                        if (model.patient_id)
                            superBillCondition.patient_id =
                                new mongoose_1.default.Types.ObjectId(model.patient_id.toString());
                        if (model.insurance_plan_type)
                            insuranceCondition.insurance_plan_type =
                                model.insurance_plan_type;
                        if (model.visitType)
                            appointmentCondition.visitType = model.visitType;
                        if (model.location_id)
                            appointmentCondition.location_id =
                                new mongoose_1.default.Types.ObjectId(model.location_id.toString());
                        if (model.case_type)
                            appointmentCondition.appointmentType_id =
                                new mongoose_1.default.Types.ObjectId(model.case_type.toString());
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
                            startTime = new Date(model.startDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            appointmentCondition.startDateTime = {
                                $gte: startTime,
                            };
                        }
                        if (model.endDateTime) {
                            endTime = new Date(model.endDateTime);
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
                                        $eq: new mongoose_1.default.Types.ObjectId(model.cpt.toString()),
                                    },
                                },
                            };
                        }
                        if (model.icd)
                            superBillCondition.icd =
                                new mongoose_1.default.Types.ObjectId(model.icd.toString());
                        return [4 /*yield*/, claim_response_model_1.default.aggregate([
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
                            ])];
                    case 1:
                        data = _a.sent();
                        if (!data[0].aggregatedData[0])
                            return [2 /*return*/, {
                                    success: true,
                                    status_code: http_status_codes_1.default.OK,
                                    data: { data: [] },
                                }];
                        if (data && data[0].aggregatedData.length > 0) {
                            finalResponse_1 = [];
                            data[0].aggregatedData.forEach(function (claimObj) {
                                var tempObj1 = {
                                    claim_id: claimObj._id,
                                    superbill_id: claimObj.superbillData._id,
                                    clinic_id: claimObj.superbillData.clinic_id,
                                    insurance_id: claimObj.superbillData.insurance_id,
                                    claim_number: claimObj.claimReference.rhclaimNumber,
                                    invoice_number: claimObj.invoice,
                                    clearing_house: "",
                                    chart_no: claimObj.superbillData.patientData.patientId,
                                    patient_dob: claimObj.superbillData.patientData
                                        .date_of_birth,
                                    patientName: common_methods_1.default.getDecryptText(claimObj.superbillData.patientData
                                        .first_name) +
                                        common_methods_1.default.getDecryptText(claimObj.superbillData.patientData.last_name),
                                    billingProvider: claimObj.superbillData.billingProviderData
                                        .userData.first_name +
                                        " " +
                                        claimObj.superbillData.billingProviderData
                                            .userData.last_name,
                                    referingProvider: claimObj.superbillData.referingProviderData
                                        .userData.first_name +
                                        " " +
                                        claimObj.superbillData.referingProviderData
                                            .userData.last_name,
                                    renderingProvider: claimObj.superbillData.renderingProviderData
                                        .userData.first_name +
                                        " " +
                                        claimObj.superbillData.renderingProviderData
                                            .userData.last_name,
                                    payer: claimObj.payer.payerName,
                                    insurance_plan: claimObj.superbillData.insuranceData
                                        .insurance_plan_type,
                                    insurance_type: claimObj.superbillData.insuranceData.coverage,
                                    dos: claimObj.superbillData.appointmentData
                                        .startDateTime,
                                    dos_end: claimObj.superbillData.appointmentData
                                        .endDateTime,
                                    claim_submission_date: claimObj.createdAt,
                                    claim_status: "",
                                    claim_ack_status: "",
                                    case_type: claimObj.superbillData.appointmentData
                                        .visitType,
                                    case_name: claimObj.superbillData.appointmentData
                                        .appointmentTypeData.type,
                                    id_or_policy: "",
                                    location: claimObj.superbillData.appointmentData
                                        .locationData.branchName,
                                    cpt: claimObj.superbillData.cptData,
                                    icd: claimObj.superbillData.ictData,
                                    modifier: claimObj.superbillData.modifierData,
                                    charges: claimObj.superbillData.total_amount,
                                    payment: 0,
                                    adjustment: 0,
                                    patient_balance: 0,
                                    ins_balance: 0,
                                    remittance_code: "",
                                    batch: 0,
                                    user: "",
                                    type: "",
                                    appointment_id: claimObj.superbillData.appointment_id,
                                    checkout_id: claimObj.superbillData
                                        .billingCheckoutData
                                        ? claimObj.superbillData.billingCheckoutData
                                            ._id
                                        : null,
                                };
                                finalResponse_1.push(tempObj1);
                            });
                            obj = {
                                data: finalResponse_1,
                                // count: result.totalDocs,
                                totalDocs: data[0].totalCount[0].sum,
                                // pageNumber: req.body.page,
                                // pageSize: count,
                                // totalPages: Math.ceil(
                                //   data[0].aggregatedData.length / count
                                // ),
                            };
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: obj,
                                    success: true,
                                }];
                        }
                        else {
                            console.log("-hererehrherh");
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: [],
                                    success: true,
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updateEdiStatus = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDetails, updatedResult_1, addHistory, error_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        userDetails = req.user;
                        return [4 /*yield*/, Promise.all(model.updateArr.map(function (obj) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, billing_checkout_model_1.default.updateMany({ appointment_id: obj.appointment_id }, {
                                                "insurance.acknowledgementStatus": obj.acknowledgementStatus,
                                                "insurance.claimStatus": obj.claimStatus,
                                            })];
                                        case 1:
                                            updatedResult_1 =
                                                _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        console.log(updatedResult_1, "");
                        if (!(updatedResult_1 &&
                            updatedResult_1.modifiedCount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, history_model_1.default.create({
                                user_id: userDetails._id,
                                description: "Claim status updated successfully",
                                type: history_model_2.EHistoryActivityTypeValues.CLAIM,
                            })];
                    case 2:
                        addHistory = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                status_code: http_status_codes_1.default.OK,
                                data: erros_message_1.default.UPDATE_SUCCESSFULL,
                            }];
                    case 3: return [2 /*return*/, {
                            success: false,
                            status_code: http_status_codes_1.default.BAD_REQUEST,
                            data: {
                                message: erros_message_1.default.NO_RECORD_FOUND,
                                error: erros_message_1.default.ON_UPDATE_ERROR,
                            },
                        }];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.exportClaimList = function (req, model, next) { return __awaiter(_this, void 0, void 0, function () {
            var workbook, claimSheet_1, claimSheetHeader, count, page, skip, condition, superBillCondition, appointmentCondition, insuranceCondition, startTime, endTime, startTime, endTime, startTime, endTime, startTime, endTime, data, finalResponse_2, claimData, sheetStyle_1, excelData, link, excelFileName, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, xlsx_populate_1.default.fromBlankAsync()];
                    case 1:
                        workbook = _a.sent();
                        claimSheet_1 = workbook.sheet("Sheet1");
                        claimSheetHeader = [
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
                        claimSheetHeader.forEach(function (el, i) {
                            claimSheet_1
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
                            return [2 /*return*/, {
                                    status_code: http_status_codes_1.default.OK,
                                    data: [],
                                    success: true,
                                }];
                        }
                        count = model.pageSize ? model.pageSize : 50;
                        page = model.pageNumber ? model.pageNumber : 1;
                        skip = count * (page - 1);
                        condition = {
                            clinic_id: new mongoose_1.default.Types.ObjectId(model.clinic_id.toString()),
                        };
                        superBillCondition = {};
                        appointmentCondition = {};
                        insuranceCondition = {};
                        if (model.claimSubDateFrom) {
                            startTime = new Date(model.claimSubDateFrom);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.claimSubDateFrom);
                            endTime.setHours(23, 59, 59, 999);
                            condition.createdAt = {
                                $gte: startTime,
                                //$lte: endTime,
                            };
                        }
                        if (model.claimSubDateTo) {
                            startTime = new Date(model.claimSubDateTo);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.claimSubDateTo);
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
                        if (model.invoice)
                            condition.invoice = model.invoice;
                        if (model.payer)
                            condition.payer.PayerName = model.payer;
                        if (model.billing_provider_id)
                            superBillCondition.billing_provider_id =
                                new mongoose_1.default.Types.ObjectId(model.billing_provider_id.toString());
                        if (model.rendering_provider_id)
                            superBillCondition.rendering_provider_id =
                                new mongoose_1.default.Types.ObjectId(model.rendering_provider_id.toString());
                        if (model.referring_provider_id)
                            superBillCondition.referring_provider_id =
                                new mongoose_1.default.Types.ObjectId(model.referring_provider_id.toString());
                        if (model.patient_id)
                            superBillCondition.patient_id =
                                new mongoose_1.default.Types.ObjectId(model.patient_id.toString());
                        if (model.insurance_plan_type)
                            insuranceCondition.insurance_plan_type =
                                model.insurance_plan_type;
                        if (model.visitType)
                            appointmentCondition.visitType = model.visitType;
                        if (model.location_id)
                            appointmentCondition.location_id =
                                new mongoose_1.default.Types.ObjectId(model.location_id.toString());
                        if (model.case_type)
                            appointmentCondition.appointmentType_id =
                                new mongoose_1.default.Types.ObjectId(model.case_type.toString());
                        if (model.startDateTime) {
                            startTime = new Date(model.startDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.startDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            appointmentCondition.startDateTime = {
                                $gte: startTime,
                                //$lte: endTime,
                            };
                        }
                        if (model.endDateTime) {
                            startTime = new Date(model.endDateTime);
                            startTime.setHours(0, 0, 0, 0);
                            endTime = new Date(model.endDateTime);
                            endTime.setHours(23, 59, 59, 999);
                            appointmentCondition.endDateTime = {
                                //$gte: startTime,
                                $lte: endTime,
                            };
                        }
                        return [4 /*yield*/, claim_response_model_1.default.aggregate([
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
                            ])];
                    case 2:
                        data = _a.sent();
                        if (!data[0].aggregatedData[0])
                            return [2 /*return*/, {
                                    success: true,
                                    status_code: http_status_codes_1.default.OK,
                                    data: [],
                                }];
                        if (!(data && data[0].aggregatedData.length > 0)) return [3 /*break*/, 5];
                        finalResponse_2 = [];
                        data[0].aggregatedData.forEach(function (claimObj) {
                            var tempObj1 = {
                                claim_id: claimObj._id,
                                superbill_id: claimObj.superbillData._id,
                                clinic_id: claimObj.superbillData.clinic_id,
                                insurance_id: claimObj.superbillData.insurance_id,
                                claim_number: claimObj.claimReference.rhclaimNumber,
                                invoice_number: claimObj.invoice,
                                clearing_house: "",
                                chart_no: claimObj.superbillData.patientData.patientId,
                                patient_dob: claimObj.superbillData.patientData
                                    .date_of_birth,
                                patientName: common_methods_1.default.getDecryptText(claimObj.superbillData.patientData
                                    .first_name) +
                                    common_methods_1.default.getDecryptText(claimObj.superbillData.patientData.last_name),
                                billingProvider: claimObj.superbillData.billingProviderData
                                    .userData.first_name +
                                    " " +
                                    claimObj.superbillData.billingProviderData
                                        .userData.last_name,
                                referingProvider: claimObj.superbillData.referingProviderData
                                    .userData.first_name +
                                    " " +
                                    claimObj.superbillData.referingProviderData
                                        .userData.last_name,
                                renderingProvider: claimObj.superbillData.renderingProviderData
                                    .userData.first_name +
                                    " " +
                                    claimObj.superbillData.renderingProviderData
                                        .userData.last_name,
                                payer: claimObj.payer.payerName,
                                insurance_plan: claimObj.superbillData.insuranceData
                                    .insurance_plan_type,
                                insurance_type: claimObj.superbillData.insuranceData.coverage,
                                dos: claimObj.superbillData.appointmentData
                                    .startDateTime,
                                dos_end: claimObj.superbillData.appointmentData
                                    .endDateTime,
                                claim_submission_date: claimObj.createdAt,
                                claim_status: "",
                                claim_ack_status: "",
                                case_type: claimObj.superbillData.appointmentData
                                    .visitType,
                                case_name: claimObj.superbillData.appointmentData
                                    .appointmentTypeData.type,
                                id_or_policy: "",
                                location: claimObj.superbillData.appointmentData
                                    .locationData.branchName,
                                cpt: claimObj.superbillData.cptData,
                                icd: claimObj.superbillData.ictData,
                                modifier: claimObj.superbillData.modifierData,
                                charges: claimObj.superbillData.total_amount,
                                payment: 0,
                                adjustment: 0,
                                patient_balance: 0,
                                ins_balance: 0,
                                remittance_code: "",
                                batch: 0,
                                user: "",
                                type: "",
                                appointment_id: claimObj.superbillData.appointment_id,
                                checkout_id: claimObj.superbillData
                                    .billingCheckoutData
                                    ? claimObj.superbillData.billingCheckoutData
                                        ._id
                                    : null,
                            };
                            finalResponse_2.push(tempObj1);
                        });
                        claimData = finalResponse_2;
                        sheetStyle_1 = {
                            border: true,
                            fontFamily: "Calibri",
                        };
                        claimData.forEach(function (el, i) {
                            console.log(el);
                            // let date = moment(el.startDateTime).format(
                            //   "DD-MM-YYYY"
                            // );
                            claimSheet_1
                                .cell("A" + (i + 2))
                                .value(el.claim_number)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("B" + (i + 2))
                                .value(el.invoice_number)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("C" + (i + 2))
                                .value(el.clearing_house)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("D" + (i + 2))
                                .value(el.chart_no)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("E" + (i + 2))
                                .value((0, moment_1.default)(el.patient_dob).format("DD-MM-YYYY"))
                                .style(sheetStyle_1);
                            claimSheet_1;
                            claimSheet_1
                                .cell("F" + (i + 2))
                                .value(el.patientName)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("G" + (i + 2))
                                .value(el.billingProvider)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("H" + (i + 2))
                                .value(el.referingProvider)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("I" + (i + 2))
                                .value(el.payer)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("J" + (i + 2))
                                .value(el.insurance_plan)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("K" + (i + 2))
                                .value("".concat((0, moment_1.default)(el.dos).format("DD-MM-YYYY"), " -to -").concat((0, moment_1.default)(el.dos_end).format("DD-MM-YYYY")))
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("L" + (i + 2))
                                .value(el.claim_submission_date)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("M" + (i + 2))
                                .value(el.claim_status)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("N" + (i + 2))
                                .value(el.claim_ack_status)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("O" + (i + 2))
                                .value(el.case_type)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("P" + (i + 2))
                                .value(el.case_name)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("Q" + (i + 2))
                                .value(el.id_or_policy)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("R" + (i + 2))
                                .value(el.charges)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("S" + (i + 2))
                                .value(el.payment)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("T" + (i + 2))
                                .value(el.adjustment)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("U" + (i + 2))
                                .value(el.patient_balance)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("V" + (i + 2))
                                .value(el.ins_balance)
                                .style(sheetStyle_1);
                            claimSheet_1
                                .cell("W" + (i + 2))
                                .value(el.remittance_code)
                                .style(sheetStyle_1);
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
                        claimSheet_1.freezePanes(1, 1);
                        return [4 /*yield*/, workbook.outputAsync()];
                    case 3:
                        excelData = _a.sent();
                        return [4 /*yield*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../../../../../public/upload/claims/Claim_Report.xlsx"), excelData)];
                    case 4:
                        _a.sent();
                        link = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/upload/claims/Claim_Report.xlsx");
                        excelFileName = "Claim_Report.xlsx";
                        response = {
                            link: link,
                            name: excelFileName,
                        };
                        return [2 /*return*/, {
                                status_code: http_status_codes_1.default.OK,
                                data: response,
                                success: true,
                            }];
                    case 5: return [2 /*return*/, {
                            status_code: http_status_codes_1.default.OK,
                            data: [],
                            success: true,
                        }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
    }
    return ClaimServices;
}());
exports.default = new ClaimServices();
