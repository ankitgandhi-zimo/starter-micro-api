"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
var ErrorMessage = /** @class */ (function () {
    function ErrorMessage() {
        this.UNAUTHORIZED = "You are not authorized";
        this.NOT_FOUND = "User not found";
        this.ON_ADD_ERROR = "On add error";
        this.ON_DELETE_ERROR = "On archive error";
        this.ON_UPDATE_ERROR = "On update error";
        this.ON_FETCH_ERROR = "On fetch error";
        this.ExecutedSuccessfully = "Data fetch Successfully";
        this.NO_SECONDARY_INSURANCE = "Patient has no secondary insurance";
        /** Pagination settings */
        this.count = 10;
        this.defaultPageNo = 1;
        /** Pagination settings */
        this.ON_FORGOT_PASSWORD_ERROR = "On forgot reset password error";
        this.LOGIN = "On LogIn Error";
        this.WRONG_PASSWORD = "Incorrect Password";
        this.TOKEN_NOT_RECEIVED = "Authentication token not received";
        this.AUTH_ERROR = "On authorization error";
        this.NOT_AUTHORIZED_FOR_ACTION = "You are not authorized to perform this action";
        this.TOKEN_EXPIRED = "Token expired";
        this.ROLE_LIST_NOT_FOUND = "Role list not found";
        this.TOKEN_NOT_FOUND = "Token not found";
        this.LIMIT_EXCEED_TRY_AFTER_24_HOURS = "Today limit exceed. pls try after 24 hours";
        this.NOT_AUTHORIZED_RESET_PASSWORD = "You are not authorized for reset password";
        this.NON_EMPTY_FIRST_NAME = "First name can not be empty or undefined";
        this.NON_EMPTY_CLINIC_NAME = "Clinic name can not be empty or undefined";
        this.NON_EMPTY_GROUP_NAME = "Group name can not be empty or undefined";
        this.INTERNAL_SERVER_ERROR = "An internal server error occurred";
        this.EMAIL_NOT_SEND = "Email not send";
        this.WRONG_ACTION_PERFORMED = "You are trying to permform  an incorrect action";
        this.ForgotPasswordTitle = "Forget password mail";
        this.LINK_SEND_TO_EMAIL = "Link sent to your email id";
        // user
        this.HISTORY_NOT_FOUND = "History details Not Found";
        this.USER_NOT_FOUND = "User Not Found";
        this.ROLE_NOT_FOUND = "Role details not found";
        this.ADD_USER_NOT_AUTORIZED = "You are not authorized for add user";
        this.NOT_AUTORIZED_UPDATE_ROLE = "You are not authorized for update role";
        this.NOT_AUTORIZED_UPDATE_ACTIVATE_STATUS = "You are not authorized for update activate status";
        this.NOT_AUTORIZED_DELETE_STATUS = "You are not authorized for archiving user";
        this.ADD_TEAM_ADMIN_USER_NOT_AUTORIZED = "You are not authorized for add user with team admin role";
        this.ALREADY_ASSOCIATED_EMAIL = "This email already associated with another account";
        this.ERROR_ADD_USER = "An Error Occurred While Adding User";
        this.USER_PROFILE_UPDATED = "User profile updated successfully";
        this.ERROR_ON_UPDATE_USER = "An error occurred while updating user";
        this.USER_LIST_NOT_FOUND = "User list not found";
        this.USER_DELETE_SUCCESS = "User archived succesfully";
        this.ERROR_ON_DELETE_USER = "An error occurred while archiving user";
        //////Added by charanjit ////
        this.INCORRECT_TIME_ZONE = "Timezone is not correct";
        this.SELECTED_APPOINTMENT_TYPE_NOT_ACCEPTED = "Selected appointment type is not accepted";
        this.ERROR_ON_ADD_PROVIDER = "An error occurred while adding provider";
        this.ERROR_ON_UPDATE_PROVIDER = "An error occurred while updating provider";
        this.ERROR_ON_DELETE_PROVIDER = "An error occurred while archiving provider";
        this.ERROR_ON_FETCHING_PROVIDER = "An error occurred while getting provider";
        this.ERROR_ON_ADD_SKILL = "An error occurred while adding skill";
        this.ERROR_ON_UPDATE_SKILL = "An error occurred while updating skill";
        this.ERROR_ON_DELETE_SKILL = "An error occurred while archiving skill";
        this.ERROR_ON_FETCHING_SKILL = "An error occurred while getting skill";
        this.ALREADY_EXIST_SKILL = "Skill already exists";
        this.ALREADY_EXIST_APPOINTMENTTYPE = "Appointment type already exists";
        this.APPOINTMENT_TYPE_NOT_FOUND = "Appointment type does not exist";
        this.ERROR_ON_ADD_APPOINTMENTTYPE = "An error occurred while adding appointment type";
        this.ERROR_ON_UPDATE_APPOINTMENTTYPE = "An error occurred while updating appointment type";
        this.ERROR_ON_DELETE_APPOINTMENTTYPE = "An error occurred while archiving appointment type";
        this.ERROR_ON_FETCHING_APPOINTMENTTYPE = "An error occurred while getting appointment type";
        this.UPDATE_ASSIGNED_APPT_TYPE_SUCCESSFULL = "Assigned appointment type updated .Also please update availability for this appointment type";
        this.ERROR_ON_ADD_WAITING_LIST = "An error occurred while adding waiting list";
        this.ERROR_ON_UPDATE_WAITING_LIST = "An error occurred while updating waiting list";
        this.ERROR_ON_DELETE_WAITING_LIST = "An error occurred while archiving waiting list";
        this.ERROR_ON_FETCHING_WAITING_LIST = "An error occurred while getting waiting list";
        this.ALREADY_EXIST_WAITING_LIST = "Waiting list already exist";
        this.ERROR_UPDATE_USER = "An error occurred while updating user";
        this.ERROR_ADD_USER_ROLE = "An error occurred while adding user role";
        this.ERROR_UPDATE_USER_ROLE = "An error occurred while updating user role";
        this.ROLE_TITLE_ALREADY_ASSIGNED = "This role title already assigned assigned to another  role";
        this.ROLE_NAME_ALREADY_ASSIGNED = "This role name already assigned assigned to another  role";
        this.NON_EMPTY_APPOINTMENTTYPE = "Appointment type can not be empty";
        this.PROVIDER_LIST_NOT_FOUND = "No providers found";
        this.SKILL_LIST_NOT_FOUND = "No skills found";
        this.APPOINTMENT_TYPE_LIST_NOT_FOUND = "Appointment type list not found";
        this.WAITING_LIST_NOT_FOUND = "Waiting list not found";
        this.ALREADY_EXIST_APPOINTMENT_TYPE = "Appointment type already exist";
        this.ERROR_ON_ADD_APPOINTMENT_TYPE = "An error occurred while adding appointment type";
        this.ERROR_ON_REMOVE_APPOINTMENT_TYPE = "Error on removing appointment type";
        this.ERROR_ON_ADD_LOCATION = "An error occurred while adding location";
        this.ERROR_ON_REMOVE_LOCATION = "Error on removing location";
        this.ALREADY_EXIST_DYNAMIC_FORM = "Form already exists";
        this.ERROR_ON_UPDATE_DYNAMIC_FORM = "Error on updating form";
        this.ERROR_ON_ADD_DYNAMIC_FORM = "Error on adding form";
        this.ERROR_ON_GET_DYNAMIC_FORM = "Error on fetching form";
        this.ERROR_ON_DELETE_DYNAMIC_FORM = "Error on archiving form";
        this.ERROR_ON_LIST_DYNAMIC_FORM = "Error on fetching form list";
        this.DYNAMIC_FORM_LIST_NOT_FOUND = "No dynamic form found";
        this.NON_EMPTY_SKILL_NAME = "Skill name can not be empty";
        this.FORM_SHARED_SUCCESS = "Form shared successfully";
        this.FORM_SHARED_FAILED = "Error in sharing form";
        this.FORM_ASSIGNED_SUCCESS = "Form(s) assigned Successfully";
        this.FORM_ASSIGNED_FAILED = "Form(s) assigned Failed";
        this.DYNAMIC_FORM_IMPORT_SUCCESSFULL = "Form imported successfully";
        this.DYNAMIC_FORM_IMPORT_FAILED = "Error on importing form";
        this.PROGRESS_NOTE_IMPORT_SUCCESSFULL = "Progress note imported successfully";
        this.PROGRESS_NOTE_IMPORT_FAILED = "Error on importing progress note";
        this.TREATMENT_PLAN_IMPORT_SUCCESSFULL = "Treatment plan imported successfully";
        this.TREATMENT_PLAN_IMPORT_FAILED = "Error on importing treatment plan";
        this.NO_TREATMENT_PLAN_FILLED = "Please fill treatment plan first";
        //FORM CATEGORY
        this.ALREADY_EXIST_FORM_CATEGORY = "Form categorey already exists";
        this.ERROR_ON_UPDATE_FORM_CATEGORY = "Error on updating form category";
        this.ERROR_ON_ADD_FORM_CATEGORY = "Error on adding form category";
        this.ERROR_ON_GET_FORM_CATEGORY = "Error on fetching form category";
        this.ERROR_ON_DELETE_FORM_CATEGORY = "Error on deleting form category";
        this.ERROR_ON_LIST_FORM_CATEGORY = "Error on fetching form category list";
        this.FORM_CATEGORY_LIST_NOT_FOUND = "No form category found";
        //TREATMENT PLAN
        this.ALREADY_EXIST_TREATMENT_PLAN = "Treatment plan with title already exists";
        this.ERROR_ON_UPDATE_TREATMENT_PLAN = "Error on updating treatment plan";
        this.ERROR_ON_ADD_TREATMENT_PLAN = "Error on adding treatment plan";
        this.ERROR_ON_GET_TREATMENT_PLAN = "Error on fetching treatment plan";
        this.ERROR_ON_DELETE_TREATMENT_PLAN = "Error on archiving treatment plan";
        this.ERROR_ON_LIST_TREATMENT_PLAN = "Error on fetching treatment plan list";
        this.TREATMENT_PLAN_LIST_NOT_FOUND = "No treatment plan found";
        //appointment stage
        this.ALREADY_EXIST_APPOINTMENTSTAGE = "Appointment stage already exists";
        this.ERROR_ON_UPDATE_APPOINTMENTSTAGE = "Error on updating appointment stage";
        this.ERROR_ON_ADD_APPOINTMENTSTAGE = "Error on adding appointment stage";
        this.ERROR_ON_GET_APPOINTMENTSTAGE = "Error on fetching appointment stage";
        this.ERROR_ON_DELETE_APPOINTMENTSTAGE = "Error on archiving appointment stage";
        this.ERROR_ON_LIST_APPOINTMENTSTAGE = "Error on fetching appointment stage list";
        this.APPOINTMENTSTAGE_LIST_NOT_FOUND = "Appointment stage list not found";
        //PROGRESS NOTES
        this.ALREADY_EXIST_PROGRESS_NOTE = "Progress note with title already exists";
        this.ERROR_ON_UPDATE_PROGRESS_NOTE = "Error on updating progress note";
        this.ERROR_ON_ADD_PROGRESS_NOTE = "Error on adding progress note";
        this.ERROR_ON_GET_PROGRESS_NOTE = "Error on fetching progress note";
        this.ERROR_ON_DELETE_PROGRESS_NOTE = "Error on archiving progress note";
        this.ERROR_ON_LIST_PROGRESS_NOTE = "Error on fetching progress note list";
        this.PROGRESS_NOTE_LIST_NOT_FOUND = "No progress note found";
        //FILLED DYNAMIC FORM
        this.ALREADY_EXIST_FILLED_DYNAMIC_FORM = "Form already exists";
        this.ERROR_ON_UPDATE_FILLED_DYNAMIC_FORM = "Error on updating form";
        this.ERROR_ON_ADD_FILLED_DYNAMIC_FORM = "Error on adding form";
        this.ERROR_ON_GET_FILLED_DYNAMIC_FORM = "Error on fetching form";
        this.ERROR_ON_DELETE_FILLED_DYNAMIC_FORM = "Error on archiving form";
        this.ERROR_ON_LIST_FILLED_DYNAMIC_FORM = "Error on fetching form list";
        this.FILLED_DYNAMIC_FORM_LIST_NOT_FOUND = "No forms found";
        //filled treatmentPlan
        this.ALREADY_EXIST_FILLED_TREATMENT_PLAN = "Treatment plan already exists";
        this.ERROR_ON_UPDATE_FILLED_TREATMENT_PLAN = "Error on updating treatment plan";
        this.ERROR_ON_ADD_FILLED_TREATMENT_PLAN = "Error on adding treatment plan";
        this.ERROR_ON_GET_FILLED_TREATMENT_PLAN = "Error on fetching treatment plan";
        this.ERROR_ON_DELETE_FILLED_TREATMENT_PLAN = "Error on archiving treatment plan";
        this.ERROR_ON_LIST_FILLED_TREATMENT_PLAN = "Error on fetching treatment plan list";
        this.FILLED_TREATMENT_PLAN_LIST_NOT_FOUND = "No treatment plan found";
        //filled progress note
        this.ALREADY_EXIST_FILLED_PROGRESS_NOTE = "Progress note already exists";
        this.ERROR_ON_UPDATE_FILLED_PROGRESS_NOTE = "Error on updating progress note";
        this.ERROR_ON_ADD_FILLED_PROGRESS_NOTE = "Error on adding progress note";
        this.ERROR_ON_GET_FILLED_PROGRESS_NOTE = "Error on fetching progress note";
        this.ERROR_ON_DELETE_FILLED_PROGRESS_NOTE = "Error on archiving progress note";
        this.ERROR_ON_LIST_FILLED_PROGRESS_NOTE = "Error on fetching progress note list";
        this.FILLED_PROGRESS_NOTE_LIST_NOT_FOUND = "No progress note found";
        //country
        this.ALREADY_EXIST_COUNTRY = "Country already exists";
        this.ERROR_ON_UPDATE_COUNTRY = "Error on updating country";
        this.ERROR_ON_ADD_COUNTRY = "Error on adding country";
        this.ERROR_ON_GET_COUNTRY = "Error on fetching country";
        this.ERROR_ON_DELETE_COUNTRY = "Error on archiving country";
        this.ERROR_ON_LIST_COUNTRY = "Error on fetching country list";
        this.COUNTRY_LIST_NOT_FOUND = "No countries found";
        this.NON_EMPTY_SEARCH = "Search can not be empty";
        //permission
        this.ALREADY_EXIST_PERMISSION = "Permission already exists";
        this.ERROR_ON_UPDATE_PERMISSION = "Error on updating permission";
        this.ERROR_ON_ADD_PERMISSION = "Error on adding permission";
        this.ERROR_ON_GET_PERMISSION = "Error on fetching permission";
        this.ERROR_ON_DELETE_PERMISSION = "Error on archiving permission";
        this.ERROR_ON_LIST_PERMISSION = "Error on fetching permission list";
        this.PERMISSION_LIST_NOT_FOUND = "Permission not found";
        //state
        this.ALREADY_EXIST_STATE = "State already exists";
        this.ERROR_ON_UPDATE_STATE = "Error on updating state";
        this.ERROR_ON_ADD_STATE = "Error on adding state";
        this.ERROR_ON_GET_STATE = "Error on fetching state";
        this.ERROR_ON_DELETE_STATE = "Error on archiving state";
        this.ERROR_ON_LIST_STATE = "Error on fetching state list";
        this.STATE_LIST_NOT_FOUND = "No states found";
        //BILLING TEAM
        this.ALREADY_EXIST_BILLING_TEAM = "Billing team already exists";
        this.ERROR_ON_UPDATE_BILLING_TEAM = "Error on updating billing team";
        this.ERROR_ON_ADD_BILLING_TEAM = "Error on adding billing team";
        this.ERROR_ON_GET_BILLING_TEAM = "Error on fetching billing team";
        this.ERROR_ON_DELETE_BILLING_TEAM = "Error on archiving billing team";
        this.ERROR_ON_LIST_BILLING_TEAM = "Error on fetching billing team list";
        this.BILLING_TEAM_LIST_NOT_FOUND = "Billing team not found";
        this.ERROR_ON_ASSIGNING_BILLING_TEAM = "Error on assinging team member";
        this.TEAM_MEMBER_ASSIGN_SUCCESSFULL = "Team member assigned successfully";
        this.BILLING_TEAM_MEMBER_LIST_NOT_FOUND = "No billing team members found";
        this.BILLING_TEAM_CLINICS_LIST_NOT_FOUND = "Billing team has no assigned clinics";
        this.CLINIC_ALREADY_ADDED_BILLING_TEAM = "Clinic already added to this billing team";
        this.ERROR_ON_ASSIGN_CLINIC_TO_TEAM = "An  error occurred while try to assign clinic to billing team";
        this.ERROR_ON_UN_ASSIGN_CLINIC_TO_TEAM = "An  error occurred while try to un-assign clinic to billing team";
        //BILLING PAYMENT
        this.ALREADY_EXIST_BILLING_PAYMENT = "Billing payment already exists";
        this.ERROR_ON_UPDATE_BILLING_PAYMENT = "Error on updating billing payment";
        this.ERROR_ON_ADD_BILLING_PAYMENT = "Error on adding billing payment";
        this.ERROR_ON_GET_BILLING_PAYMENT = "Error on fetching billing payment";
        this.ERROR_ON_DELETE_BILLING_PAYMENT = "Error on archiving billing payment";
        this.ERROR_ON_LIST_BILLING_PAYMENT = "Error on fetching billing payment list";
        this.BILLING_PAYMENT_LIST_NOT_FOUND = "Billing payment not found";
        this.PAYMENT_UPDATE_FAILED = "Payment update failed";
        //assign team member
        this.ALREADY_EXIST_ASSIGNED_TEAM_MEMBER = "Assigned team member already exists";
        this.ERROR_ON_UPDATE_ASSIGNED_TEAM_MEMBER = "Error on updating assigned team";
        this.ERROR_ON_ADD_ASSIGNED_TEAM_MEMBER = "Error on adding team member";
        this.ERROR_ON_GET_ASSIGNED_TEAM_MEMBER = "Error on getting team member";
        this.ERROR_ON_DELETE_ASSIGNED_TEAM_MEMBER = "Error on archiving team member";
        this.ERROR_ON_LIST_ASSIGNED_TEAM_MEMBER = "Error on fetching team member list";
        this.ASSIGNED_TEAM_MEMBER_LIST_NOT_FOUND = "No Assigned team member found";
        this.ASSIGNED_TEAM_MEMBER_SUCCESS = "Memeber assigned to team";
        this.ASSIGNED_TEAM_MEMBER_FAILED = "Failed to assign memeber to team";
        this.TEAM_MEMBER_NOT_ASSIGNED = "Team member not assigned to this team";
        this.UPDATE_ASSIGNED_TEAM_MEMBER_FAILED = "An error occurred while try to update team member association with team";
        this.UPDATE_ASSIGNED_TEAM_MEMBER_Successfully = " Team member association updated successfully";
        this.ASSIGNED_TEAM_MEMBER_REMOVE_FAILED = "Failed to remove memeber from team";
        this.ASSIGNED_TEAM_MEMBER_REMOVE_SUCCESS = "Member removed from team";
        //NOC CODES
        this.NOC_CODES_LIST_NOT_FOUND = "No Noc codes found";
        this.ICD_CODES_LIST_NOT_FOUND = "No icd codes found";
        this.MODIFIERS_CODES_LIST_NOT_FOUND = "No modifiers found";
        //PAYMENT CODES
        this.PAYMENT_CODES_LIST_NOT_FOUND = "No claim filling payment codes found";
        //generate super bill
        this.ALREADY_EXIST_SUPER_BILL = "Super bill already exists";
        this.ERROR_ON_UPDATE_SUPER_BILL = "Error on updating super bill";
        this.ERROR_ON_UPDATE_PRINT_STATUS = "Error on marking as print";
        this.ERROR_ON_ADD_SUPER_BILL = "Error on adding super bill";
        this.ERROR_ON_GET_SUPER_BILL = "Error on getting super bill";
        this.Not_FOUND_CHARGE_AMOUNT = "Charge amount details not found";
        this.ERROR_ON_DELETE_SUPER_BILL = "Error on archiving super bill";
        this.ERROR_ON_LIST_SUPER_BILL = "Error on fetching super bill list";
        this.SUPER_BILL_LIST_NOT_FOUND = "No super bill found";
        this.SUPER_BILL_ASSIGNMENT_HISTORY = "Assignment history not found for this super bill ";
        this.SUPER_BILL_ASSIGNMENT_ERROR = " An error occurred while trying to assign super bill ";
        //Notes
        this.ALREADY_EXIST_NOTES = "Notes already exists";
        this.ERROR_ON_UPDATE_NOTES = "Error on updating notes";
        this.ERROR_ON_ADD_NOTES = "Error on adding notes";
        this.ERROR_ON_GET_NOTES = "Error on getting notes";
        this.ERROR_ON_DELETE_NOTES = "Error on archiving notes";
        this.ERROR_ON_LIST_NOTES = "Error on fetching notes list";
        this.NOTES_LIST_NOT_FOUND = "No notes found";
        //Notes type
        this.ALREADY_EXIST_NOTE_TYPE = "Note type already exists";
        this.ERROR_ON_UPDATE_NOTE_TYPE = "Error on updating note type";
        this.ERROR_ON_ADD_NOTE_TYPE = "Error on adding note type";
        this.ERROR_ON_GET_NOTE_TYPE = "Error on getting note type";
        this.ERROR_ON_DELETE_NOTE_TYPE = "Error on archiving note type";
        this.ERROR_ON_LIST_NOTE_TYPE = "Error on fetching note type list";
        this.NOTE_TYPE_LIST_NOT_FOUND = "No note types found";
        //cpt
        this.ALREADY_EXIST_CPT_CODE = "Cpt code already exists";
        this.ERROR_ON_UPDATE_CPT_CODE = "Error on updating cpt code";
        this.ERROR_ON_ADD_CPT_CODE = "Error on adding cpt code";
        this.ERROR_ON_GET_CPT_CODE = "Error on getting cpt code";
        this.ERROR_ON_DELETE_CPT_CODE = "Error on archiving cpt code";
        this.ERROR_ON_LIST_CPT_CODE = "Error on fetching cpt code list";
        this.CPT_CODE_LIST_NOT_FOUND = "No cpt codes found";
        //icd
        this.ALREADY_EXIST_ICD_CODE = "ICD code already exists";
        this.ERROR_ON_UPDATE_ICD_CODE = "Error on updating Icd code";
        this.ERROR_ON_ADD_ICD_CODE = "Error on adding Icd code";
        this.ERROR_ON_GET_ICD_CODE = "Error on getting Icd code";
        this.ERROR_ON_DELETE_ICD_CODE = "Error on archiving Icd code";
        this.ERROR_ON_LIST_ICD_CODE = "Error on fetching Icd code list";
        this.ICD_CODE_LIST_NOT_FOUND = "No Icd codes found";
        //modifier
        this.ALREADY_EXIST_MODIFIER = "Modifier already exists";
        this.ERROR_ON_UPDATE_MODIFIER = "Error on updating modifier";
        this.ERROR_ON_ADD_MODIFIER = "Error on adding modifier";
        this.ERROR_ON_GET_MODIFIER = "Error on getting modifier";
        this.ERROR_ON_DELETE_MODIFIER = "Error on archiving modifier";
        this.ERROR_ON_LIST_MODIFIER = "Error on fetching modifier list";
        this.MODIFIER_LIST_NOT_FOUND = "No modifiers found";
        //EPRISCRIPTION
        this.ALREADY_EXIST_EPRISCRIPTION = "E-Prescription already exists";
        this.ERROR_ON_UPDATE_EPRISCRIPTION = "Error on updating E-Prescription";
        this.ERROR_ON_ADD_EPRISCRIPTION = "Error on adding E-Prescription";
        this.ERROR_ON_GET_EPRISCRIPTION = "Error on getting E-Prescription";
        this.ERROR_ON_DELETE_EPRISCRIPTION = "Error on archiving E-Prescription";
        this.ERROR_ON_LIST_EPRISCRIPTION = "Error on fetching E-Prescription list";
        this.EPRISCRIPTION_LIST_NOT_FOUND = "No E-Prescription found";
        //super bill OTHER DETAILS
        this.ALREADY_EXIST_SUPER_BILL_DETAIL = "Super bill other details already exists";
        this.ERROR_ON_UPDATE_SUPER_BILL_DETAIL = "Error on updating super bill other details";
        this.ERROR_ON_ADD_SUPER_BILL_DETAIL = "Error on adding super bill other details";
        this.ERROR_ON_GET_SUPER_BILL_DETAIL = "Error on getting super bill other details";
        this.ERROR_ON_DELETE_SUPER_BILL_DETAIL = "Error on archiving super bill other details";
        this.ERROR_ON_LIST_SUPER_BILL_DETAIL = "Error on fetching super bill other details list";
        this.SUPER_BILL_DETAIL_LIST_NOT_FOUND = "No super bill other details found";
        this.ERROR_ON_UPDATE_ANNOUNCEMENT = "Error on updating announcement";
        this.ERROR_ON_ADD_ANNOUNCEMENT = "Error on adding announcement";
        this.ERROR_ON_GET_ANNOUNCEMENT = "Error on getting announcement";
        this.ERROR_ON_DELETE_ANNOUNCEMENT = "Error on archiving announcement";
        this.ERROR_ON_LIST_ANNOUNCEMENT = "Error on fetching announcement list";
        this.ANNOUNCEMENT_LIST_NOT_FOUND = "No announcement found";
        this.FAILED_TO_FETCH_DATA = "Failed to fetch data";
        this.NO_DATA_TO_FETCH = "No data to fetch";
        this.DATA_FETCHED_SUCCESS = "Data fetched successfully";
        this.DATA_FETCHED_SUCCESS_WITH_CONFLICTS = "Data fetched successfully but contains conflicted ids";
        this.NO_DATA_TO_FETCH_BUT_CONFLICT_PRESENT = "No data feteched but contains conflicted ids";
        //AVAILABILITY
        this.INVALID_TIMEZONE = "Invalid timezone";
        this.NO_DOCTOR_AVAILABLE = "No doctor available";
        this.AVAILABILITY_UPDATE_FAILED = "Error on updating availability";
        this.AVAILABILITY_GET_FAILED = "No availability found";
        this.ALREADY_AVAILABILITY = "You have already set availability for this location. Please change location";
        this.AVAILABILITY_SET_SUCCESS = "Availability set successfully";
        this.UNAVAILABILITY_SET_SUCCESS = "Unavailability set successfully";
        this.UNAVAILABILITY_DELETE_SUCCESSFULL = "Unavailability deleted successfully";
        this.ERROR_ON_SET_AVAILABILITY = "Error on setting availability";
        this.ERROR_ON_SET_UNAVAILABILITY = "Error on setting unavailability";
        this.SELECT_ATLEAST_ONE_DAY = "Plaese select atleast one day in any appointment type";
        this.ERROR_ON_SET_UNAVAILABILITY_INVALID_DATE = "Invalid date range or selected days";
        this.ERROR_ON_SET_UNAVAILABILITY_DOCTOR_UNAVAILABLE = "Provider unavailable at that time";
        this.ERROR_ON_SET_UNAVAILABILITY_ALREADY_APPOINTMENT = "Provider already have appointment at that time";
        this.ERROR_ON_GET_UNAVAILABILITY = "No unavailability found";
        //PAYMENT_GATEWAY
        this.ERROR_ADD_PAYMENT_GATEWAY = "An error occurred while adding payment gateway";
        this.ERROR_DELETION_PAYMENT_GATEWAY = "An error occurred while trying to archive payment gateway";
        this.PAYMENT_GATEWAY_NOT_FOUND = "Payment gateway details not found";
        this.INVALID_PAYMENT_GATEWAY_CREDENTIALS = "Invalid payment gateway account credentials";
        this.PAYMENT_GATEWAY_LIST_NOT_FOUND = "Payment gateway list not found";
        this.PAYMENT_GATEWAY_ACCOUNT_VERIFIED = "Payment gateway account verified successfully";
        this.ERROR_PAYMENT_GATEWAY_ACCOUNT_VERIFIED = "An error occurred while trying to verified payment gateway account";
        // clinic
        this.CLINIC_ALREADY_ASSOCIATED_EMAIL = "This email already associated with another clinic";
        this.ERROR_ADD_CLINIC = "An error occurred while adding clinic";
        this.CLINIC_DETAILS_NOT_FOUND = "Clinic details not found";
        this.CLINIC_LIST_NOT_FOUND = "Clinic list not found";
        this.CLINIC_DELETION_ERROR = "An error occurred while trying to archive clinic";
        this.ERROR_UPDATE_CLINIC = "An error occurred while updating clinic";
        this.ALREADY_ADDED_CLINIC_LOCATION = "Clinic location already added on this location";
        // clinic locations
        this.ERROR_ADD_CLINIC_LOCATION = "An error occurred while adding clinic location";
        this.ERROR_UPDATE_CLINIC_LOCATION = "An error occurred while updating clinic location";
        this.CLINIC_LOCATIONS_DETAILS_NOT_FOUND = "Clinic location details not found";
        this.CLINIC_LOCATIONS_LIST_NOT_FOUND = "Clinic locations list not found";
        //Groups
        this.ERROR_ADD_GROUP = "An error occurred while adding group";
        this.ALREADY_EXISTED_GROUP = "Group already exist with this name";
        this.CLINIC_ALREADY_ASSOCIATED_GROUP = "Clinic already added in this group";
        this.CLINIC_ALREADY_ASSOCIATED_ANOTHER_GROUP = "Clinic already added in another group";
        this.ERROR_ADD_CLINIC_IN_GROUP = "An error occurred while adding clinic in group";
        this.GROUPS_DETAILS_NOT_FOUND = "Group details not found";
        this.CLINIC_NOT_ASSOCIATED_GROUP = "Clinic not a part of any group";
        this.ERROR_UNGROUP_CLINIC_IN_GROUP = "An error occurred while ungroup clinic from group";
        this.ERROR_GROUP_DELETION = "An error occurred while deleting group";
        this.CLINIC_GROUP_LIST_NOT_FOUND = "Clinic group list not found";
        //PATIENTS
        this.PATIENT_DETAILS_NOT_FOUND = "Patient details not found";
        this.ERROR_PATIENT_DELETION = "An error occurred while deleting patient details";
        this.ERROR_ADD_PATIENT = "An error occurred while adding patient";
        this.ERROR_UPDATE_PATIENT = "An error occurred while update patient details";
        this.PATIENT_LIST_NOT_FOUND = "Patient list not found";
        this.PATIENT_NOT_VERIFIED = "Patient profile is not verified and authorized to perform this action";
        //Patient Documnet
        this.ERROR_ADD_PATIENT_DOC = "An error occurred while adding patient document";
        this.PATIENT_DOC_DETAILS_NOT_FOUND = "Patient document details not found";
        this.PATIENT_DOC_DELETED_SUCCESS = "Patient document deleted successfully";
        this.PATIENT_DOC_UPDATED_SUCCESS = "Patient document updated successfully";
        this.ERROR_DELETE_PATIENT_DOC = "An error occurred while archiving patient document";
        this.PATIENT_DOCUMENT_LIST_NOT_FOUND = "Patient document list not found";
        this.MERGE_SUCCESS = "Patient merged successfully";
        this.MERGE_FAILED = "Patient merged failed";
        //CHECKOUT
        this.CHECK_OUT_DONE = "Patient checked-out";
        this.NO_CHECKED_OUT_APPOINTMENT_FOUND = "No checked out appointment found";
        //INSURANCE
        this.insuranceMsg = {
            company: {
                addSuccess: "Insurance company added successfully",
                nameReq: "Please enter insurance company name",
                exist: function (companyName) {
                    return "".concat(companyName, " already exist");
                },
            },
            idReq: "Please enter insurance id",
            coverageExist: function (coverage) {
                return "".concat(coverage, " insurance already exist");
            },
            addSuccess: "Insurance details added Successfully",
            insuranceTypeReq: "Please enter insurance type",
            coverageReq: "Please enter coverage",
            payerIdReq: "Please payer Id",
            insuranceNameReq: "Please  enter insurance name",
            subscriberReq: "Please enter subscriber",
            subscriberIdReq: "Please enter subscriber id",
            groupNumberReq: "Please enter groupNumber",
            relationShipReq: "Please enter relationship",
            DOBReq: "Please enter DOB",
            notFound: "Insurance not found",
            assignSucc: "Codes verified",
            copayReq: "Please enter copay",
            issueDateReq: "Please enter issue date",
            notAccessData: "You are not having permission to view insurance details. Please contact clinic admin",
            copayTypeReq: "Please enter copay type",
            invalidFinancialClass: "Kindly fill the insurance details to proceed further",
            insurancePlanTypeReq: "Please select plan type",
        };
        this.ERROR_ADD_INSURANCE = "An error occurred while adding insurance";
        this.ERROR_ALRAEDY_EXIST_INSURANCE = "Insurance details already exist for this patient";
        this.INSURANCE_DETAILS_NOT_FOUND = "Insurance details not found";
        this.ERROR_INSURANCE__DELETION = "An error occurred while deleting patient insurance details";
        this.ERROR_UPDATE_INSURANCE = "An error occurred while update insurance";
        this.INSURANCE_LIST_NOT_FOUND = "Insurance list not found";
        //INSURANCE COMPANIES
        this.ERROR_ADD_INSURANCE_COMPANIES = "An error occurred while adding insurance company";
        this.INSURANCE_COMPANIES_DETAILS_NOT_FOUND = "Insurance company details not found";
        this.ERROR_INSURANCE_COMPANIES__DELETION = "An error occurred while deleting insurance company details";
        this.ERROR_UPDATE_INSURANCE_COMPANIES = "An error occurred while update insurance company";
        this.INSURANCE_COMPANIES_LIST_NOT_FOUND = "Insurance companylist not found";
        //APPOINTMENT
        this.ERROR_ADD_APPOINTMENT = "An error occurred while adding an appointment";
        this.ERROR_RESCHEDULED_APPOINTMENT = "An error occurred while trying to reschedule appointment";
        this.ERROR_UPDATE_APPOINTMENT = "An error occurred while update an appointment";
        this.ERROR_DELETE_APPOINTMENT = "An error occurred while archiving an appointment";
        this.APPOINTMENT_DETAILS_NOT_FOUND = "Appointment details not found";
        this.NUMBER_OF_PATIENTS_EXCEED_APPOINTMENT = "Number of patients in this appointmnet can not be greater than ";
        this.MULTIPLE_PATIENTS_NOT_ALLOWED = "Multiple patient not allowed in this appointment ";
        this.APPOINTMENT_LIST_NOT_FOUND = "Appointment list not found";
        this.appointmentMsg = {
            checkoutCodeReq: "Please select atleast one icd 10 code",
            rescheduleSuccess: "Appointment rescheduled succesfully",
            notRescheduled: "Appointment has not been rescheduled",
            AlreadyAppointment: "Provider already have appointment at that time",
            apptNotFound: "Appointment not found",
            rescheduleApptNotAllowed: "Rescheduled Appointment not allowed in this clinic",
            clinicPolicyNotFound: "Clinic policy details not found.Need to update clinic policy first for this action",
            alreadyRescheduled: "Appointment has already been rescheduled",
            conflictClinicPolicy: function (type, hours) {
                return "You can ".concat(type, " appointment only ").concat(hours, " hours before the appointment start time");
            },
            providerUnavailable: "Provider is not available at this time",
            paymentReceived: {
                type: "paymentReceived",
                title: function () { return "Payment received"; },
                message: function (patientName) {
                    return "Amount recived from ".concat(patientName, " patient");
                },
            },
            paymentReceivedOnly: function (amount) {
                return "$" + amount + " received";
            },
        };
        this.subscriptionMsg = {
            paymentDataErr: "Payment failed, please try again",
        };
        this.paymentFail = 402;
        this.NO_STRIPE_PAYMENT_GATEWAY_ACCESS = "Clinic has no stripe payment gateway to process payment";
        this.reccuring = {
            AlreadyAppointment: "Provider already have appointment at that time",
            endDateReq: "Please enter end date of plan",
            weekDayReq: "Please select week day",
            createdSucc: "Recurring appointments created",
            daysLimitExceed: "You can not exceed 28 days",
            monthLimitExceed: "You can not exceed 12 month",
            weekdaysReq: "Please select atleast on week day",
            weekdaysLimitExceed: "You can not exceed 3 weeks",
            enterNegValue: "Value must be an positive integer",
            endDateExceed: "Start date should be less then end date",
            whichDayReq: "Please select which day appointment should recur",
            numOfApptReq: "Please enter the number of occurrence between 2 and 20",
            doctorUnavailabile: "Provider is unavailable in between the recurring timing",
            noApptCreated: "No appointment created, please change the pattern and try again",
            daysValueReq: "Please enter value. i.e. after how many days appointment should repeat",
            monthValueReq: "Please enter value. i.e. after how many month appointment should repeat",
            totalApptimitExceed: "Total number of appointment should be less than 100. Please change the pattern",
        };
        this.NO_RECORD_FOUND = "No record found";
        this.SomeThingWentWrong = "Something went wrong";
        this.dateReq = "Please select date";
        this.DOCTOR_ID_NOT_EMPTY = "Doctor id can not be empty";
        this.PATIENT_ID_NOT_EMPTY = "Patient id can not be empty";
        this.financialClassMsg = {
            codeReq: "Please enter code",
            numReq: "Price should be number",
            idReq: "Please  financial class",
            invalidClass: "Invalid financial class",
            insuranceNotExist: "Invalid financial class",
            priceReq: "Please enter financial class amount",
            addSuccess: "Financial class added Successfully",
            descReq: "Please enter description for financial class",
            // existButDeleted: (code) => `Please try to create new financial class with '${code}' code`,
            // exist: (isActive, code) => `'${code}' financial class already exist${isActive ? '' : ' but not active'}`,
            ERROR_ADD_FINANCIAL_CLASS: "An error occurred while adding financial class",
            ERROR_UPDATE_FINANCIAL_CLASS: "An error occurred while updating financial class",
            ERROR_DELETE_FINANCIAL_CLASS: "An error occurred while archiving financial class",
            FINANCIAL_CLASS_DETAILS_NOT_FOUND: "Financial class details not found",
            ALREADY_EXIST_FINANCIAL_CLASS: "Financial class already exist with this code",
            FINANCIAL_CLASS_LIST_NOT_FOUND: "Financial class list not found",
        };
        this.progressNotesNotFilled = "You can not checkout. Please fill progress notes first";
        this.billingMsg = {
            PostPaymentNotFound: "Post payment details not found",
            PostPaymentListNotFound: "Post payment list not found",
            errorOccuredMakePayment: "An error occurred while try to payment",
            errorOccuredUpdatePostPayment: "An error occurred while try to update post payment details",
            paymentDetailsNotFound: "Payment details not found",
            paymentDetailsUpdated: "Payment details updated successfully",
            onlyDuePaymentUpdated: "Only due payment details can be updated",
            batchDone: "Batch done",
            copayBatchDone: "Batch created",
            idReq: "Please enter billing id",
            amountReq: "Please enter amount",
            nameReq: "Please enter firstname",
            invalidCopay: "Invalid copay type",
            chargedPatient: "Payment Received",
            paymentNotfound: "Payment not found",
            paymentIdReq: "Please enter payment id",
            occuranceReq: "Please select occurance",
            addSuccess: "Billing added successfully",
            delSuccess: "Billing archived successfully",
            // receiptSend: (email) => 'Receipt send to ' + email,
            orignalRefNoReq: "Please enter Orignal Ref No",
            successLinkSend: "Payment link sent to patient",
            linkDisabledSucc: "Payment link disabled",
            alreadylinkDisabledSucc: "Payment link already disabled",
            paymentDelSuccess: "Transaction removed successfully",
            emailSentError: "Email could not be sent. Try again later",
            removeError: "Cannot remove transaction",
            notChangeMethod: "You can not change payment method",
            notChangeInsAmt: "You can not change insurance amount",
            notUpdateAfterBatch: "You can not update charge details",
            waveOffMethodReq: "Please select atlease one method of wave off",
            // waveOffDone: (copayAmount, insuranceAmount) =>
            //   `${copayAmount ? `$${copayAmount} of copay` : ''}${copayAmount && insuranceAmount ? ' and ' : ''}${insuranceAmount ? `$${insuranceAmount} of insurance ` : ''} wave off`,
            // billNowOnlyCards: 'You can bill only cards payment',
            alreadyCheckedout: "Already checked out this appointment",
            notCheckoutByDoctor: "Patient not checkedout by provider yet",
            // copayTypeReq: (paymentMethod) => 'Please select payment mode of ' + paymentMethod,
            invalidSplitAmount: "Sum of payer 1 and payer 2 should be equal to total of copay amount",
            // noShowAppt: (noShow) => `This is${noShow ? '' : ' not'} no show appointment can not charge with this API`,
            batchDoneWithEmailError: "Batch run successfully but due to some technical issue payment links are not send to their respective emails",
            sendReceiptForReceivedPayment: "You can share receipt for successfully received payment only",
        };
        this.mailSubject = {
            paymentReceipt: "Payment receipt",
            forgotPassword: "Reset password link",
            signUpSuccess: "Sign-up success in Thera Tap",
            contactUs: "Prospective client  tried to contact",
            shareLinkPayment: "RCM: Regarding payment link",
            meetingUrl: "Tele-call link",
            appointmentReminder: "Reminder mail for appointment",
            invitationAccepted: function (name) {
                return "Inviation accepted by " + name;
            },
            invitationDeclined: function (name) {
                return "Inviation declined by " + name;
            },
            invitation: function (clinic) {
                return "Invitation from ".concat(clinic ? clinic + " clinic" : "admin");
            },
            // removeLicence: 'Remove Licence',
            // clinicemailsubject: 'Account renewal email to clinic by SA',
        };
        this.incorrectAction = function (status, type) {
            return "You can not ".concat(type, " this appointment").concat(status
                ? " it has been already " +
                    status.toLowerCase() +
                    ". Please refresh the page"
                : "");
        };
        //apptNotFound = "Appointment not found";
        // UPDATE_SUCCESSFULL = "Updated successfully";
        // DELETE_SUCCESSFULL = "Deleted successfully";
        this.apptNotFound = "Appointment details not found";
        this.ERROR_ADD_CARD = "An error occurred while adding patient card";
        this.ERROR_DELETE_CARD = "An error occurred while archiving card details";
        this.ERROR_PAYMENT_CARD = "An error occurred while try to payment with card";
        this.CARD_DETAILS_NOT_FOUND = "Card details not found";
        this.CARD_LIST_NOT_FOUND = "Card list not found";
        this.UPDATE_SUCCESSFULL = "Updated successfully";
        this.DELETE_SUCCESSFULL = "Archived successfully";
        this.SAVED_SUCCESSFULL = "Saved successfully";
        // CLAIMS
        this.CLAIM_ALREADY_SUBMITTED = "Claim already submitted";
        this.ERROR_SUBMIT_CLAIM = "An error occurred while submitting claim";
        this.CLAIM_PATIENT_NOT_FOUND = "Patient details not found";
        this.CLAIM_RECEIVERER_NOT_FOUND = "Receiver detail not found";
        this.CLAIM_BILLING_PROVIDER_NOT_FOUND = "Billing provider detail not found";
        this.CLAIM_Referring_PROVIDER_NOT_FOUND = "Referring provider detail not found";
        this.CLAIM_Service_PROVIDER_NOT_FOUND = "Service provider detail not found";
        this.CLAIM_Rendering_PROVIDER_NOT_FOUND = "Rendering provider detail not found";
        this.CLAIM_INFO_NOT_FOUND = "Claim detail not found";
        this.CLAIM_LIST_NOT_FOUND = "Claim list not found";
        this.CLAIM_INFO_NOT_FOUND_THIS_CLAIMID = "Claim detail not found with for this claim id";
        this.cardMsg = {
            limit: 3,
            deleted: "Card details archived successfully",
            deletionError: "An error occurred while try to archive card details",
            addSuccess: "Card added successfully",
            CARD_LIST_NOT_FOUND: "Card List not found",
            notCard: "No card found",
            notFound: "Card details not  found",
            updateSuccess: "Card updated",
            idReq: "Please enter card _id",
            tokenReq: "Please enter token",
            brandReq: "Please enter brand",
            countryReq: "Please enter country",
            cardNumberReq: "Please card number",
            fundingReq: "Please enter card type",
            notCardForThisPatient: "No card added for this patient",
            expireYearReq: "Please enter card expiry year",
            expireMonthReq: "Please enter card expiry month",
            cardHolderNameReq: "Please enter card holder name",
            limitExceed: function (limit) {
                return "You can save only " + limit + " card";
            },
        };
        this.patientMsg = {
            // GIReq: 'Please enter GI',
            SOReq: "Please enter SO",
            signUpFail: "Sign-up failed",
            titleReq: "Title is required",
            idReq: "Please enter patient id",
            // chartNoReq: 'Chart no is required',
            archiveSucc: "Account archived",
            docsAddSuccess: "Document saved",
            docsDeletedSuccess: "Document archived",
            profileVerified: "Profile verified",
            unArchiveSucc: "Account unarchived",
            signUpSuccess: "Sign-up Successfull",
            nameReq: "Please enter patient name",
            // apartmentReq: 'Please enter apartment',
            addSuccess: "Invitation sent Successfully",
            // internalIdReq: 'Internal id is required',
            paymentModeChanged: "Payment mode changed",
            paymentModeReq: "Please select payment mode",
            notVerified: "Patient profile is not verified",
            maritalStatusReq: "Enter your marital status",
            regsiterSucc: "Patient register successfully",
            assignedSuccess: "Form(s) assigned Successfully",
            verifiedby_idReq: "Please enter verified by _id",
            resPartyNameReq: "Responsible party name required",
            noRecordFound: "No patient registered in your clinic",
            accountNotActive: "Your account is archived by clinic",
            isVerifiedReq: "Please enter is isVerified status of patient",
            registerModeReq: "Internal Error!! Please enter reister mode",
            specialCasePatientNotEmail: "You can send email to this patient as it is a special case patient without email",
            exist: function (isActive) {
                return "Patient with this email address already exist in your clinic".concat(isActive ? "" : " but acount is not active");
            },
        };
        this.socketEvents = {
            addUser: "add-user",
            removeUser: "remove-user",
            notification: "notification",
            notificationReaded: "notification-readed",
            webrtc: {
                addOffer: "add-offer",
                addAnswer: "add-answer",
                answerAdded: "answer-added",
                setOfferCandidate: "set-offer-candidate",
                addOfferCandidate: "add-offer-candidate",
                addAnswerCandidate: "add-answer-candidate",
                answerCandidateAdded: "answer-candidate-added",
            },
            chat: {
                sendMessage: "send-message",
                receiveMessage: "receive-message",
                joinConversation: "join-conversation",
                joinNewConversation: "join-new-conversation",
                errorJoinConversation: "error-join-conversation",
                newConversationStarted: "new-conversation-started",
            },
        };
        this.socketCodes = {
            ok: 200,
            convNotFound: 401,
            uRNotMember: 402,
            onlyAdminMsg: 403,
            uBlocked: 404,
            internalservererror: 500,
        };
        this.rolename = {
            /** THERE SHOULD BE ONLY ONE ADMIN ROLE IN DATABASE */
            AR: "AR",
            ADMIN: "ADMIN",
            STAFF: "STAFF",
            NURSE: "NURSE",
            CLINIC: "CLINIC",
            DOCTOR: "DOCTOR",
            INTERN: "INTERN",
            PATIENT: "PATIENT",
            BILLING: "BILLING",
            FRONTDESK: "FRONTDESK",
            ASSOCIATEPROVIDER: "ASSOCIATEPROVIDER",
        };
        this.conversationMsg = {
            limit: 100,
            ok: "OK",
            memberLeft: "You left",
            userAdded: "User added",
            blockSucc: "User blocked",
            notFound: "Group not found",
            memberRemove: "Member remove",
            unblockSucc: "User un-blocked",
            newConv: "Conversation started",
            sendMessageSucc: "Message send",
            deletedSucc: "Messages deleted",
            updateGroupSucc: "Group updated",
            docNotFound: "Document not found",
            docDeletedSucc: "Document deleted",
            idReq: "Please enter conversation id",
            convNotFound: "Conversation not found",
            settingUpdated: "Group settings updated",
            adminAdded: "User assigned admin access",
            uBlocked: "Un-block user to send message",
            uRNotAdmin: "You are not a admin of group",
            lastAdmin: "Group must have alteat one admin",
            adminRemove: "User no longer have admin access",
            onlyAdminMsg: "Only admin can message in this group",
            alreadyAdmin: "Selected user already have admin access",
            uRNotMember: "You are not a member of this conversation",
            invalidAction: "You not have access to perform this action",
            selectedUserNotMember: "Selected user is not a member of group",
            onlyAdminAddOrRemove: function (action) {
                return "Only admin can " + action + " members";
            },
            limitExceed: function (limit) {
                return "You can add only " + limit + " members in a group";
            },
            onlyOneMemberInIndividual: "You can add only one member in one to one chat",
        };
        this.paymentMsg = {
            paymentAdded: "Payment Added Successfully",
            ErrorPaymentAdded: "An error occurred while try to add payment",
        };
    }
    return ErrorMessage;
}());
exports.ErrorMessage = ErrorMessage;
exports.default = new ErrorMessage();
