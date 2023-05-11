import * as express from "express";
import User_Router from "../contoller-services/user/user.route";
//import Lead_Router from "../contoller-services/lead(prospectus)/lead.route"
import passport from "passport";
import UploadController from "../common/upload/upload_media.controller";
import Appointment_Router from "../contoller-services/appointment/appointment.route";
import AppointmentStage_Router from "../contoller-services/appointmentStage/appointmentStage.route";
import AppointmentType_Router from "../contoller-services/appointmentType/appointmentType.route";
import AssignTeam_Router from "../contoller-services/assignTeam/assignTeam.route";
import Availability_Router from "../contoller-services/availability/availability.route";
import Billing_Payment_Router from "../contoller-services/billingPayment/billingPayment.route";
import BillingTeam_Router from "../contoller-services/billingTeam/billingTeam.route";
import Card_Router from "../contoller-services/cards/cards.route";
import Conversation_Router from "../contoller-services/chat/conversation.route";
import ClaimFillingPaymentCodes_Router from "../contoller-services/claimFillingPaymentCodes/claimFillingPaymentCodes.route";
import Claim_Router from "../contoller-services/claims/claim.route";
import Clinic_Router from "../contoller-services/clinic/clinic.route";
import CptCode_Router from "../contoller-services/code/cpt/cpt_code.route";
import IcdCode_Router from "../contoller-services/code/icd/icd_code.route";
import Modifier_Router from "../contoller-services/code/modifier/modifier.route";
import Country_Router from "../contoller-services/country/country.route";
import DynamicForm_Router from "../contoller-services/dynamicForm/dynamicForm.route";
import FormCategory_Router from "../contoller-services/dynamicForm/formCategory/formCategory.route";
import EPriscription_Router from "../contoller-services/epriscription/ePriscription.route";
import FilledDynamicForm_Router from "../contoller-services/filledDynamicForm/filledDynamicForm.route";
import FilledProgressNote_Router from "../contoller-services/filledProgressNote/filledProgressNote.route";
import FilledTreatmentPlan_Router from "../contoller-services/filledTreatmentPlan/filledTreatmentPlan.route";
import Financial_Class_Router from "../contoller-services/financialClass/financialClass.route";
import Group_Router from "../contoller-services/group/group.route";
import Insurance_Router from "../contoller-services/insurance/insurance.route";
import Insurance_Payment_Router from "../contoller-services/insurancePayments/insurancePayments.route";
import ListCodes_Router from "../contoller-services/listCodes/listCodes.route";
import Notes_Router from "../contoller-services/notes/notes.route";
import NoteType_Router from "../contoller-services/notes/note_type/note_type.route";
import Patient_Router from "../contoller-services/patient/patient.route";
import Payment_Gateway_Router from "../contoller-services/paymentGateway/paymentGateway.route";
import Permission_Router from "../contoller-services/permission/permission.route";
import ProgressNote_Router from "../contoller-services/progressNote/progressNote.route";
import Provider_Router from "../contoller-services/provider/provider.route";
import Report_Router from "../contoller-services/reportsSection/reports.route";
import Skill_Router from "../contoller-services/skill/skill.route";
import State_Router from "../contoller-services/state/state.route";
import SuperBill_Router from "../contoller-services/superBill/superBill.route";
import SuperBillOtherDetail_Router from "../contoller-services/superBillOtherDetail/superBillOtherDetail.route";
import TreatmentPlan_Router from "../contoller-services/treatmentPlan/treatmentPlan.route";
import WaitingList_Router from "../contoller-services/waitingList/waitingList.route";
import AgingReport_Router from "../contoller-services/agingReport/agingReport.route";
import Announcement_Router from "../contoller-services/announcement/announcement.route";

class MainRoutes {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.use("/user", User_Router);
    this.router.use("/patient", Patient_Router);
    this.router.use("/clinic", Clinic_Router);
    this.router.use("/group", Group_Router);
    this.router.use("/claim", Claim_Router);
    this.router.use("/card", Card_Router);
    this.router.use("/payment_gateway", Payment_Gateway_Router);
    this.router.use("/reports", Report_Router);

    this.router.use("/payment_gateway", Payment_Gateway_Router);
    this.router.use("/billing", Billing_Payment_Router);

    this.router.use("/payment", Insurance_Payment_Router);

    this.router.use("/conversation", Conversation_Router);

    this.router.use("/appointment_type", AppointmentType_Router);
    this.router.use("/insurance", Insurance_Router);
    this.router.use("/appointment", Appointment_Router);
    this.router.use("/financial_class", Financial_Class_Router);

    this.router.use(
      "/upload_media",
      passport.authenticate("jwt", { session: false }),
      UploadController.uploadPhotoToCloudinary
    );

    this.router.use(
      "/uploadToS3",
      passport.authenticate("jwt", { session: false }),
      UploadController.uploadToS3
    );

    //charnjit development

    this.router.use("/provider", Provider_Router);
    this.router.use("/skill", Skill_Router);
    this.router.use("/waiting_list", WaitingList_Router);
    this.router.use("/dynamic_form", DynamicForm_Router);
    this.router.use("/treatment_plan", TreatmentPlan_Router);
    this.router.use("/progress_note", ProgressNote_Router);
    this.router.use("/appointment_stage", AppointmentStage_Router);
    this.router.use("/filled_dynamic_form", FilledDynamicForm_Router);
    this.router.use("/filled_treatment_plan", FilledTreatmentPlan_Router);
    this.router.use("/filled_progress_note", FilledProgressNote_Router);
    this.router.use("/country", Country_Router);
    this.router.use("/state", State_Router);
    this.router.use("/permission", Permission_Router);
    this.router.use("/billing_team", BillingTeam_Router);
    this.router.use("/assign_team", AssignTeam_Router);
    this.router.use("/super_bill", SuperBill_Router);
    this.router.use("/super_bill_other_detail", SuperBillOtherDetail_Router);
    this.router.use(
      "/claim_filling_payment_codes",
      ClaimFillingPaymentCodes_Router
    );
    this.router.use("/notes", Notes_Router);
    this.router.use("/note_type", NoteType_Router);
    this.router.use("/cpt_code", CptCode_Router);
    this.router.use("/icd_code", IcdCode_Router);
    this.router.use("/modifier", Modifier_Router);
    this.router.use("/list_code", ListCodes_Router);
    this.router.use("/e_priscription", EPriscription_Router);
    this.router.use("/availability", Availability_Router);
    this.router.use("/form_category", FormCategory_Router);
    this.router.use("/aging_report", AgingReport_Router);
    this.router.use("/announcement", Announcement_Router);
  }
}

export default new MainRoutes().router;
