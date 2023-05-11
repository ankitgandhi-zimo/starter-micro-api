"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var user_route_1 = __importDefault(require("../contoller-services/user/user.route"));
//import Lead_Router from "../contoller-services/lead(prospectus)/lead.route"
var passport_1 = __importDefault(require("passport"));
var upload_media_controller_1 = __importDefault(require("../common/upload/upload_media.controller"));
var appointment_route_1 = __importDefault(require("../contoller-services/appointment/appointment.route"));
var appointmentStage_route_1 = __importDefault(require("../contoller-services/appointmentStage/appointmentStage.route"));
var appointmentType_route_1 = __importDefault(require("../contoller-services/appointmentType/appointmentType.route"));
var assignTeam_route_1 = __importDefault(require("../contoller-services/assignTeam/assignTeam.route"));
var availability_route_1 = __importDefault(require("../contoller-services/availability/availability.route"));
var billingPayment_route_1 = __importDefault(require("../contoller-services/billingPayment/billingPayment.route"));
var billingTeam_route_1 = __importDefault(require("../contoller-services/billingTeam/billingTeam.route"));
var cards_route_1 = __importDefault(require("../contoller-services/cards/cards.route"));
var conversation_route_1 = __importDefault(require("../contoller-services/chat/conversation.route"));
var claimFillingPaymentCodes_route_1 = __importDefault(require("../contoller-services/claimFillingPaymentCodes/claimFillingPaymentCodes.route"));
var claim_route_1 = __importDefault(require("../contoller-services/claims/claim.route"));
var clinic_route_1 = __importDefault(require("../contoller-services/clinic/clinic.route"));
var cpt_code_route_1 = __importDefault(require("../contoller-services/code/cpt/cpt_code.route"));
var icd_code_route_1 = __importDefault(require("../contoller-services/code/icd/icd_code.route"));
var modifier_route_1 = __importDefault(require("../contoller-services/code/modifier/modifier.route"));
var country_route_1 = __importDefault(require("../contoller-services/country/country.route"));
var dynamicForm_route_1 = __importDefault(require("../contoller-services/dynamicForm/dynamicForm.route"));
var formCategory_route_1 = __importDefault(require("../contoller-services/dynamicForm/formCategory/formCategory.route"));
var ePriscription_route_1 = __importDefault(require("../contoller-services/epriscription/ePriscription.route"));
var filledDynamicForm_route_1 = __importDefault(require("../contoller-services/filledDynamicForm/filledDynamicForm.route"));
var filledProgressNote_route_1 = __importDefault(require("../contoller-services/filledProgressNote/filledProgressNote.route"));
var filledTreatmentPlan_route_1 = __importDefault(require("../contoller-services/filledTreatmentPlan/filledTreatmentPlan.route"));
var financialClass_route_1 = __importDefault(require("../contoller-services/financialClass/financialClass.route"));
var group_route_1 = __importDefault(require("../contoller-services/group/group.route"));
var insurance_route_1 = __importDefault(require("../contoller-services/insurance/insurance.route"));
var insurancePayments_route_1 = __importDefault(require("../contoller-services/insurancePayments/insurancePayments.route"));
var listCodes_route_1 = __importDefault(require("../contoller-services/listCodes/listCodes.route"));
var notes_route_1 = __importDefault(require("../contoller-services/notes/notes.route"));
var note_type_route_1 = __importDefault(require("../contoller-services/notes/note_type/note_type.route"));
var patient_route_1 = __importDefault(require("../contoller-services/patient/patient.route"));
var paymentGateway_route_1 = __importDefault(require("../contoller-services/paymentGateway/paymentGateway.route"));
var permission_route_1 = __importDefault(require("../contoller-services/permission/permission.route"));
var progressNote_route_1 = __importDefault(require("../contoller-services/progressNote/progressNote.route"));
var provider_route_1 = __importDefault(require("../contoller-services/provider/provider.route"));
var reports_route_1 = __importDefault(require("../contoller-services/reportsSection/reports.route"));
var skill_route_1 = __importDefault(require("../contoller-services/skill/skill.route"));
var state_route_1 = __importDefault(require("../contoller-services/state/state.route"));
var superBill_route_1 = __importDefault(require("../contoller-services/superBill/superBill.route"));
var superBillOtherDetail_route_1 = __importDefault(require("../contoller-services/superBillOtherDetail/superBillOtherDetail.route"));
var treatmentPlan_route_1 = __importDefault(require("../contoller-services/treatmentPlan/treatmentPlan.route"));
var waitingList_route_1 = __importDefault(require("../contoller-services/waitingList/waitingList.route"));
var agingReport_route_1 = __importDefault(require("../contoller-services/agingReport/agingReport.route"));
var announcement_route_1 = __importDefault(require("../contoller-services/announcement/announcement.route"));
var MainRoutes = /** @class */ (function () {
    function MainRoutes() {
        this.router = express.Router();
        this.config();
    }
    MainRoutes.prototype.config = function () {
        this.router.use("/user", user_route_1.default);
        this.router.use("/patient", patient_route_1.default);
        this.router.use("/clinic", clinic_route_1.default);
        this.router.use("/group", group_route_1.default);
        this.router.use("/claim", claim_route_1.default);
        this.router.use("/card", cards_route_1.default);
        this.router.use("/payment_gateway", paymentGateway_route_1.default);
        this.router.use("/reports", reports_route_1.default);
        this.router.use("/payment_gateway", paymentGateway_route_1.default);
        this.router.use("/billing", billingPayment_route_1.default);
        this.router.use("/payment", insurancePayments_route_1.default);
        this.router.use("/conversation", conversation_route_1.default);
        this.router.use("/appointment_type", appointmentType_route_1.default);
        this.router.use("/insurance", insurance_route_1.default);
        this.router.use("/appointment", appointment_route_1.default);
        this.router.use("/financial_class", financialClass_route_1.default);
        this.router.use("/upload_media", passport_1.default.authenticate("jwt", { session: false }), upload_media_controller_1.default.uploadPhotoToCloudinary);
        this.router.use("/uploadToS3", passport_1.default.authenticate("jwt", { session: false }), upload_media_controller_1.default.uploadToS3);
        //charnjit development
        this.router.use("/provider", provider_route_1.default);
        this.router.use("/skill", skill_route_1.default);
        this.router.use("/waiting_list", waitingList_route_1.default);
        this.router.use("/dynamic_form", dynamicForm_route_1.default);
        this.router.use("/treatment_plan", treatmentPlan_route_1.default);
        this.router.use("/progress_note", progressNote_route_1.default);
        this.router.use("/appointment_stage", appointmentStage_route_1.default);
        this.router.use("/filled_dynamic_form", filledDynamicForm_route_1.default);
        this.router.use("/filled_treatment_plan", filledTreatmentPlan_route_1.default);
        this.router.use("/filled_progress_note", filledProgressNote_route_1.default);
        this.router.use("/country", country_route_1.default);
        this.router.use("/state", state_route_1.default);
        this.router.use("/permission", permission_route_1.default);
        this.router.use("/billing_team", billingTeam_route_1.default);
        this.router.use("/assign_team", assignTeam_route_1.default);
        this.router.use("/super_bill", superBill_route_1.default);
        this.router.use("/super_bill_other_detail", superBillOtherDetail_route_1.default);
        this.router.use("/claim_filling_payment_codes", claimFillingPaymentCodes_route_1.default);
        this.router.use("/notes", notes_route_1.default);
        this.router.use("/note_type", note_type_route_1.default);
        this.router.use("/cpt_code", cpt_code_route_1.default);
        this.router.use("/icd_code", icd_code_route_1.default);
        this.router.use("/modifier", modifier_route_1.default);
        this.router.use("/list_code", listCodes_route_1.default);
        this.router.use("/e_priscription", ePriscription_route_1.default);
        this.router.use("/availability", availability_route_1.default);
        this.router.use("/form_category", formCategory_route_1.default);
        this.router.use("/aging_report", agingReport_route_1.default);
        this.router.use("/announcement", announcement_route_1.default);
    };
    return MainRoutes;
}());
exports.default = new MainRoutes().router;
