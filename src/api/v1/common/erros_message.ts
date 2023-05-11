export class ErrorMessage {
  UNAUTHORIZED = "You are not authorized";
  NOT_FOUND = "User not found";
  ON_ADD_ERROR = "On add error";
  ON_DELETE_ERROR = "On archive error";
  ON_UPDATE_ERROR = "On update error";
  ON_FETCH_ERROR = "On fetch error";
  ExecutedSuccessfully = "Data fetch Successfully";
  NO_SECONDARY_INSURANCE =
    "Patient has no secondary insurance";
  /** Pagination settings */
  count = 10;
  defaultPageNo = 1;
  /** Pagination settings */
  ON_FORGOT_PASSWORD_ERROR =
    "On forgot reset password error";
  LOGIN = "On LogIn Error";
  WRONG_PASSWORD = "Incorrect Password";
  TOKEN_NOT_RECEIVED = "Authentication token not received";
  AUTH_ERROR = "On authorization error";
  NOT_AUTHORIZED_FOR_ACTION =
    "You are not authorized to perform this action";
  TOKEN_EXPIRED = "Token expired";
  ROLE_LIST_NOT_FOUND = "Role list not found";
  TOKEN_NOT_FOUND = "Token not found";
  LIMIT_EXCEED_TRY_AFTER_24_HOURS =
    "Today limit exceed. pls try after 24 hours";
  NOT_AUTHORIZED_RESET_PASSWORD =
    "You are not authorized for reset password";
  NON_EMPTY_FIRST_NAME =
    "First name can not be empty or undefined";

  NON_EMPTY_CLINIC_NAME =
    "Clinic name can not be empty or undefined";
  NON_EMPTY_GROUP_NAME =
    "Group name can not be empty or undefined";

  INTERNAL_SERVER_ERROR =
    "An internal server error occurred";
  EMAIL_NOT_SEND = "Email not send";

  WRONG_ACTION_PERFORMED =
    "You are trying to permform  an incorrect action";

  ForgotPasswordTitle = "Forget password mail";
  LINK_SEND_TO_EMAIL = "Link sent to your email id";
  // user
  HISTORY_NOT_FOUND = "History details Not Found";
  USER_NOT_FOUND = "User Not Found";
  ROLE_NOT_FOUND = "Role details not found";
  ADD_USER_NOT_AUTORIZED =
    "You are not authorized for add user";

  NOT_AUTORIZED_UPDATE_ROLE =
    "You are not authorized for update role";

  NOT_AUTORIZED_UPDATE_ACTIVATE_STATUS =
    "You are not authorized for update activate status";

  NOT_AUTORIZED_DELETE_STATUS =
    "You are not authorized for archiving user";

  ADD_TEAM_ADMIN_USER_NOT_AUTORIZED =
    "You are not authorized for add user with team admin role";

  ALREADY_ASSOCIATED_EMAIL =
    "This email already associated with another account";
  ERROR_ADD_USER = "An Error Occurred While Adding User";
  USER_PROFILE_UPDATED =
    "User profile updated successfully";
  ERROR_ON_UPDATE_USER =
    "An error occurred while updating user";
  USER_LIST_NOT_FOUND = "User list not found";
  USER_DELETE_SUCCESS = "User archived succesfully";

  ERROR_ON_DELETE_USER =
    "An error occurred while archiving user";

  //////Added by charanjit ////
  INCORRECT_TIME_ZONE = "Timezone is not correct";
  SELECTED_APPOINTMENT_TYPE_NOT_ACCEPTED =
    "Selected appointment type is not accepted";

  ERROR_ON_ADD_PROVIDER =
    "An error occurred while adding provider";
  ERROR_ON_UPDATE_PROVIDER =
    "An error occurred while updating provider";
  ERROR_ON_DELETE_PROVIDER =
    "An error occurred while archiving provider";
  ERROR_ON_FETCHING_PROVIDER =
    "An error occurred while getting provider";
  ERROR_ON_ADD_SKILL =
    "An error occurred while adding skill";
  ERROR_ON_UPDATE_SKILL =
    "An error occurred while updating skill";
  ERROR_ON_DELETE_SKILL =
    "An error occurred while archiving skill";
  ERROR_ON_FETCHING_SKILL =
    "An error occurred while getting skill";
  ALREADY_EXIST_SKILL = "Skill already exists";
  ALREADY_EXIST_APPOINTMENTTYPE =
    "Appointment type already exists";
  APPOINTMENT_TYPE_NOT_FOUND =
    "Appointment type does not exist";
  ERROR_ON_ADD_APPOINTMENTTYPE =
    "An error occurred while adding appointment type";
  ERROR_ON_UPDATE_APPOINTMENTTYPE =
    "An error occurred while updating appointment type";
  ERROR_ON_DELETE_APPOINTMENTTYPE =
    "An error occurred while archiving appointment type";
  ERROR_ON_FETCHING_APPOINTMENTTYPE =
    "An error occurred while getting appointment type";
  UPDATE_ASSIGNED_APPT_TYPE_SUCCESSFULL =
    "Assigned appointment type updated .Also please update availability for this appointment type";

  ERROR_ON_ADD_WAITING_LIST =
    "An error occurred while adding waiting list";
  ERROR_ON_UPDATE_WAITING_LIST =
    "An error occurred while updating waiting list";
  ERROR_ON_DELETE_WAITING_LIST =
    "An error occurred while archiving waiting list";
  ERROR_ON_FETCHING_WAITING_LIST =
    "An error occurred while getting waiting list";
  ALREADY_EXIST_WAITING_LIST = "Waiting list already exist";
  ERROR_UPDATE_USER =
    "An error occurred while updating user";
  ERROR_ADD_USER_ROLE =
    "An error occurred while adding user role";

  ERROR_UPDATE_USER_ROLE =
    "An error occurred while updating user role";

  ROLE_TITLE_ALREADY_ASSIGNED =
    "This role title already assigned assigned to another  role";

  ROLE_NAME_ALREADY_ASSIGNED =
    "This role name already assigned assigned to another  role";

  NON_EMPTY_APPOINTMENTTYPE =
    "Appointment type can not be empty";
  PROVIDER_LIST_NOT_FOUND = "No providers found";
  SKILL_LIST_NOT_FOUND = "No skills found";
  APPOINTMENT_TYPE_LIST_NOT_FOUND =
    "Appointment type list not found";
  WAITING_LIST_NOT_FOUND = "Waiting list not found";
  ALREADY_EXIST_APPOINTMENT_TYPE =
    "Appointment type already exist";
  ERROR_ON_ADD_APPOINTMENT_TYPE =
    "An error occurred while adding appointment type";
  ERROR_ON_REMOVE_APPOINTMENT_TYPE =
    "Error on removing appointment type";
  ERROR_ON_ADD_LOCATION =
    "An error occurred while adding location";
  ERROR_ON_REMOVE_LOCATION = "Error on removing location";
  ALREADY_EXIST_DYNAMIC_FORM = "Form already exists";
  ERROR_ON_UPDATE_DYNAMIC_FORM = "Error on updating form";
  ERROR_ON_ADD_DYNAMIC_FORM = "Error on adding form";
  ERROR_ON_GET_DYNAMIC_FORM = "Error on fetching form";
  ERROR_ON_DELETE_DYNAMIC_FORM = "Error on archiving form";
  ERROR_ON_LIST_DYNAMIC_FORM =
    "Error on fetching form list";
  DYNAMIC_FORM_LIST_NOT_FOUND = "No dynamic form found";
  NON_EMPTY_SKILL_NAME = "Skill name can not be empty";

  FORM_SHARED_SUCCESS = "Form shared successfully";
  FORM_SHARED_FAILED = "Error in sharing form";

  FORM_ASSIGNED_SUCCESS = "Form(s) assigned Successfully";
  FORM_ASSIGNED_FAILED = "Form(s) assigned Failed";
  DYNAMIC_FORM_IMPORT_SUCCESSFULL =
    "Form imported successfully";
  DYNAMIC_FORM_IMPORT_FAILED = "Error on importing form";
  PROGRESS_NOTE_IMPORT_SUCCESSFULL =
    "Progress note imported successfully";
  PROGRESS_NOTE_IMPORT_FAILED =
    "Error on importing progress note";
  TREATMENT_PLAN_IMPORT_SUCCESSFULL =
    "Treatment plan imported successfully";
  TREATMENT_PLAN_IMPORT_FAILED =
    "Error on importing treatment plan";
  NO_TREATMENT_PLAN_FILLED =
    "Please fill treatment plan first";

  //FORM CATEGORY
  ALREADY_EXIST_FORM_CATEGORY =
    "Form categorey already exists";
  ERROR_ON_UPDATE_FORM_CATEGORY =
    "Error on updating form category";
  ERROR_ON_ADD_FORM_CATEGORY =
    "Error on adding form category";
  ERROR_ON_GET_FORM_CATEGORY =
    "Error on fetching form category";
  ERROR_ON_DELETE_FORM_CATEGORY =
    "Error on deleting form category";
  ERROR_ON_LIST_FORM_CATEGORY =
    "Error on fetching form category list";
  FORM_CATEGORY_LIST_NOT_FOUND = "No form category found";

  //TREATMENT PLAN
  ALREADY_EXIST_TREATMENT_PLAN =
    "Treatment plan with title already exists";
  ERROR_ON_UPDATE_TREATMENT_PLAN =
    "Error on updating treatment plan";
  ERROR_ON_ADD_TREATMENT_PLAN =
    "Error on adding treatment plan";
  ERROR_ON_GET_TREATMENT_PLAN =
    "Error on fetching treatment plan";
  ERROR_ON_DELETE_TREATMENT_PLAN =
    "Error on archiving treatment plan";
  ERROR_ON_LIST_TREATMENT_PLAN =
    "Error on fetching treatment plan list";
  TREATMENT_PLAN_LIST_NOT_FOUND = "No treatment plan found";

  //appointment stage
  ALREADY_EXIST_APPOINTMENTSTAGE =
    "Appointment stage already exists";
  ERROR_ON_UPDATE_APPOINTMENTSTAGE =
    "Error on updating appointment stage";
  ERROR_ON_ADD_APPOINTMENTSTAGE =
    "Error on adding appointment stage";
  ERROR_ON_GET_APPOINTMENTSTAGE =
    "Error on fetching appointment stage";
  ERROR_ON_DELETE_APPOINTMENTSTAGE =
    "Error on archiving appointment stage";
  ERROR_ON_LIST_APPOINTMENTSTAGE =
    "Error on fetching appointment stage list";
  APPOINTMENTSTAGE_LIST_NOT_FOUND =
    "Appointment stage list not found";

  //PROGRESS NOTES
  ALREADY_EXIST_PROGRESS_NOTE =
    "Progress note with title already exists";
  ERROR_ON_UPDATE_PROGRESS_NOTE =
    "Error on updating progress note";
  ERROR_ON_ADD_PROGRESS_NOTE =
    "Error on adding progress note";
  ERROR_ON_GET_PROGRESS_NOTE =
    "Error on fetching progress note";
  ERROR_ON_DELETE_PROGRESS_NOTE =
    "Error on archiving progress note";
  ERROR_ON_LIST_PROGRESS_NOTE =
    "Error on fetching progress note list";
  PROGRESS_NOTE_LIST_NOT_FOUND = "No progress note found";

  //FILLED DYNAMIC FORM
  ALREADY_EXIST_FILLED_DYNAMIC_FORM = "Form already exists";
  ERROR_ON_UPDATE_FILLED_DYNAMIC_FORM =
    "Error on updating form";
  ERROR_ON_ADD_FILLED_DYNAMIC_FORM = "Error on adding form";
  ERROR_ON_GET_FILLED_DYNAMIC_FORM =
    "Error on fetching form";
  ERROR_ON_DELETE_FILLED_DYNAMIC_FORM =
    "Error on archiving form";
  ERROR_ON_LIST_FILLED_DYNAMIC_FORM =
    "Error on fetching form list";
  FILLED_DYNAMIC_FORM_LIST_NOT_FOUND = "No forms found";

  //filled treatmentPlan
  ALREADY_EXIST_FILLED_TREATMENT_PLAN =
    "Treatment plan already exists";
  ERROR_ON_UPDATE_FILLED_TREATMENT_PLAN =
    "Error on updating treatment plan";
  ERROR_ON_ADD_FILLED_TREATMENT_PLAN =
    "Error on adding treatment plan";
  ERROR_ON_GET_FILLED_TREATMENT_PLAN =
    "Error on fetching treatment plan";
  ERROR_ON_DELETE_FILLED_TREATMENT_PLAN =
    "Error on archiving treatment plan";
  ERROR_ON_LIST_FILLED_TREATMENT_PLAN =
    "Error on fetching treatment plan list";
  FILLED_TREATMENT_PLAN_LIST_NOT_FOUND =
    "No treatment plan found";

  //filled progress note
  ALREADY_EXIST_FILLED_PROGRESS_NOTE =
    "Progress note already exists";
  ERROR_ON_UPDATE_FILLED_PROGRESS_NOTE =
    "Error on updating progress note";
  ERROR_ON_ADD_FILLED_PROGRESS_NOTE =
    "Error on adding progress note";
  ERROR_ON_GET_FILLED_PROGRESS_NOTE =
    "Error on fetching progress note";
  ERROR_ON_DELETE_FILLED_PROGRESS_NOTE =
    "Error on archiving progress note";
  ERROR_ON_LIST_FILLED_PROGRESS_NOTE =
    "Error on fetching progress note list";
  FILLED_PROGRESS_NOTE_LIST_NOT_FOUND =
    "No progress note found";

  //country
  ALREADY_EXIST_COUNTRY = "Country already exists";
  ERROR_ON_UPDATE_COUNTRY = "Error on updating country";
  ERROR_ON_ADD_COUNTRY = "Error on adding country";
  ERROR_ON_GET_COUNTRY = "Error on fetching country";
  ERROR_ON_DELETE_COUNTRY = "Error on archiving country";
  ERROR_ON_LIST_COUNTRY = "Error on fetching country list";
  COUNTRY_LIST_NOT_FOUND = "No countries found";
  NON_EMPTY_SEARCH = "Search can not be empty";

  //permission
  ALREADY_EXIST_PERMISSION = "Permission already exists";
  ERROR_ON_UPDATE_PERMISSION =
    "Error on updating permission";
  ERROR_ON_ADD_PERMISSION = "Error on adding permission";
  ERROR_ON_GET_PERMISSION = "Error on fetching permission";
  ERROR_ON_DELETE_PERMISSION =
    "Error on archiving permission";
  ERROR_ON_LIST_PERMISSION =
    "Error on fetching permission list";
  PERMISSION_LIST_NOT_FOUND = "Permission not found";

  //state
  ALREADY_EXIST_STATE = "State already exists";
  ERROR_ON_UPDATE_STATE = "Error on updating state";
  ERROR_ON_ADD_STATE = "Error on adding state";
  ERROR_ON_GET_STATE = "Error on fetching state";
  ERROR_ON_DELETE_STATE = "Error on archiving state";
  ERROR_ON_LIST_STATE = "Error on fetching state list";
  STATE_LIST_NOT_FOUND = "No states found";

  //BILLING TEAM
  ALREADY_EXIST_BILLING_TEAM =
    "Billing team already exists";
  ERROR_ON_UPDATE_BILLING_TEAM =
    "Error on updating billing team";
  ERROR_ON_ADD_BILLING_TEAM =
    "Error on adding billing team";
  ERROR_ON_GET_BILLING_TEAM =
    "Error on fetching billing team";
  ERROR_ON_DELETE_BILLING_TEAM =
    "Error on archiving billing team";
  ERROR_ON_LIST_BILLING_TEAM =
    "Error on fetching billing team list";
  BILLING_TEAM_LIST_NOT_FOUND = "Billing team not found";
  ERROR_ON_ASSIGNING_BILLING_TEAM =
    "Error on assinging team member";
  TEAM_MEMBER_ASSIGN_SUCCESSFULL =
    "Team member assigned successfully";
  BILLING_TEAM_MEMBER_LIST_NOT_FOUND =
    "No billing team members found";
  BILLING_TEAM_CLINICS_LIST_NOT_FOUND =
    "Billing team has no assigned clinics";

  CLINIC_ALREADY_ADDED_BILLING_TEAM =
    "Clinic already added to this billing team";

  ERROR_ON_ASSIGN_CLINIC_TO_TEAM =
    "An  error occurred while try to assign clinic to billing team";

  ERROR_ON_UN_ASSIGN_CLINIC_TO_TEAM =
    "An  error occurred while try to un-assign clinic to billing team";
  //BILLING PAYMENT
  ALREADY_EXIST_BILLING_PAYMENT =
    "Billing payment already exists";
  ERROR_ON_UPDATE_BILLING_PAYMENT =
    "Error on updating billing payment";
  ERROR_ON_ADD_BILLING_PAYMENT =
    "Error on adding billing payment";
  ERROR_ON_GET_BILLING_PAYMENT =
    "Error on fetching billing payment";
  ERROR_ON_DELETE_BILLING_PAYMENT =
    "Error on archiving billing payment";
  ERROR_ON_LIST_BILLING_PAYMENT =
    "Error on fetching billing payment list";
  BILLING_PAYMENT_LIST_NOT_FOUND =
    "Billing payment not found";
  PAYMENT_UPDATE_FAILED = "Payment update failed";

  //assign team member
  ALREADY_EXIST_ASSIGNED_TEAM_MEMBER =
    "Assigned team member already exists";
  ERROR_ON_UPDATE_ASSIGNED_TEAM_MEMBER =
    "Error on updating assigned team";
  ERROR_ON_ADD_ASSIGNED_TEAM_MEMBER =
    "Error on adding team member";
  ERROR_ON_GET_ASSIGNED_TEAM_MEMBER =
    "Error on getting team member";
  ERROR_ON_DELETE_ASSIGNED_TEAM_MEMBER =
    "Error on archiving team member";
  ERROR_ON_LIST_ASSIGNED_TEAM_MEMBER =
    "Error on fetching team member list";
  ASSIGNED_TEAM_MEMBER_LIST_NOT_FOUND =
    "No Assigned team member found";
  ASSIGNED_TEAM_MEMBER_SUCCESS = "Memeber assigned to team";
  ASSIGNED_TEAM_MEMBER_FAILED =
    "Failed to assign memeber to team";

  TEAM_MEMBER_NOT_ASSIGNED =
    "Team member not assigned to this team";

  UPDATE_ASSIGNED_TEAM_MEMBER_FAILED =
    "An error occurred while try to update team member association with team";

  UPDATE_ASSIGNED_TEAM_MEMBER_Successfully =
    " Team member association updated successfully";
  ASSIGNED_TEAM_MEMBER_REMOVE_FAILED =
    "Failed to remove memeber from team";
  ASSIGNED_TEAM_MEMBER_REMOVE_SUCCESS =
    "Member removed from team";

  //NOC CODES
  NOC_CODES_LIST_NOT_FOUND = "No Noc codes found";
  ICD_CODES_LIST_NOT_FOUND = "No icd codes found";
  MODIFIERS_CODES_LIST_NOT_FOUND = "No modifiers found";
  //PAYMENT CODES
  PAYMENT_CODES_LIST_NOT_FOUND =
    "No claim filling payment codes found";
  //generate super bill
  ALREADY_EXIST_SUPER_BILL = "Super bill already exists";
  ERROR_ON_UPDATE_SUPER_BILL =
    "Error on updating super bill";
  ERROR_ON_UPDATE_PRINT_STATUS =
    "Error on marking as print";
  ERROR_ON_ADD_SUPER_BILL = "Error on adding super bill";
  ERROR_ON_GET_SUPER_BILL = "Error on getting super bill";

  Not_FOUND_CHARGE_AMOUNT =
    "Charge amount details not found";
  ERROR_ON_DELETE_SUPER_BILL =
    "Error on archiving super bill";
  ERROR_ON_LIST_SUPER_BILL =
    "Error on fetching super bill list";
  SUPER_BILL_LIST_NOT_FOUND = "No super bill found";

  SUPER_BILL_ASSIGNMENT_HISTORY =
    "Assignment history not found for this super bill ";

  SUPER_BILL_ASSIGNMENT_ERROR =
    " An error occurred while trying to assign super bill ";

  //Notes
  ALREADY_EXIST_NOTES = "Notes already exists";
  ERROR_ON_UPDATE_NOTES = "Error on updating notes";
  ERROR_ON_ADD_NOTES = "Error on adding notes";
  ERROR_ON_GET_NOTES = "Error on getting notes";
  ERROR_ON_DELETE_NOTES = "Error on archiving notes";
  ERROR_ON_LIST_NOTES = "Error on fetching notes list";
  NOTES_LIST_NOT_FOUND = "No notes found";

  //Notes type
  ALREADY_EXIST_NOTE_TYPE = "Note type already exists";
  ERROR_ON_UPDATE_NOTE_TYPE = "Error on updating note type";
  ERROR_ON_ADD_NOTE_TYPE = "Error on adding note type";
  ERROR_ON_GET_NOTE_TYPE = "Error on getting note type";
  ERROR_ON_DELETE_NOTE_TYPE =
    "Error on archiving note type";
  ERROR_ON_LIST_NOTE_TYPE =
    "Error on fetching note type list";
  NOTE_TYPE_LIST_NOT_FOUND = "No note types found";

  //cpt

  ALREADY_EXIST_CPT_CODE = "Cpt code already exists";
  ERROR_ON_UPDATE_CPT_CODE = "Error on updating cpt code";
  ERROR_ON_ADD_CPT_CODE = "Error on adding cpt code";
  ERROR_ON_GET_CPT_CODE = "Error on getting cpt code";
  ERROR_ON_DELETE_CPT_CODE = "Error on archiving cpt code";
  ERROR_ON_LIST_CPT_CODE =
    "Error on fetching cpt code list";
  CPT_CODE_LIST_NOT_FOUND = "No cpt codes found";
  //icd

  ALREADY_EXIST_ICD_CODE = "ICD code already exists";
  ERROR_ON_UPDATE_ICD_CODE = "Error on updating Icd code";
  ERROR_ON_ADD_ICD_CODE = "Error on adding Icd code";
  ERROR_ON_GET_ICD_CODE = "Error on getting Icd code";
  ERROR_ON_DELETE_ICD_CODE = "Error on archiving Icd code";
  ERROR_ON_LIST_ICD_CODE =
    "Error on fetching Icd code list";
  ICD_CODE_LIST_NOT_FOUND = "No Icd codes found";
  //modifier

  ALREADY_EXIST_MODIFIER = "Modifier already exists";
  ERROR_ON_UPDATE_MODIFIER = "Error on updating modifier";
  ERROR_ON_ADD_MODIFIER = "Error on adding modifier";
  ERROR_ON_GET_MODIFIER = "Error on getting modifier";
  ERROR_ON_DELETE_MODIFIER = "Error on archiving modifier";
  ERROR_ON_LIST_MODIFIER =
    "Error on fetching modifier list";
  MODIFIER_LIST_NOT_FOUND = "No modifiers found";
  //EPRISCRIPTION
  ALREADY_EXIST_EPRISCRIPTION =
    "E-Prescription already exists";
  ERROR_ON_UPDATE_EPRISCRIPTION =
    "Error on updating E-Prescription";
  ERROR_ON_ADD_EPRISCRIPTION =
    "Error on adding E-Prescription";
  ERROR_ON_GET_EPRISCRIPTION =
    "Error on getting E-Prescription";
  ERROR_ON_DELETE_EPRISCRIPTION =
    "Error on archiving E-Prescription";
  ERROR_ON_LIST_EPRISCRIPTION =
    "Error on fetching E-Prescription list";
  EPRISCRIPTION_LIST_NOT_FOUND = "No E-Prescription found";

  //super bill OTHER DETAILS
  ALREADY_EXIST_SUPER_BILL_DETAIL =
    "Super bill other details already exists";
  ERROR_ON_UPDATE_SUPER_BILL_DETAIL =
    "Error on updating super bill other details";
  ERROR_ON_ADD_SUPER_BILL_DETAIL =
    "Error on adding super bill other details";
  ERROR_ON_GET_SUPER_BILL_DETAIL =
    "Error on getting super bill other details";
  ERROR_ON_DELETE_SUPER_BILL_DETAIL =
    "Error on archiving super bill other details";
  ERROR_ON_LIST_SUPER_BILL_DETAIL =
    "Error on fetching super bill other details list";
  SUPER_BILL_DETAIL_LIST_NOT_FOUND =
    "No super bill other details found";

  ERROR_ON_UPDATE_ANNOUNCEMENT =
    "Error on updating announcement";
  ERROR_ON_ADD_ANNOUNCEMENT =
    "Error on adding announcement";
  ERROR_ON_GET_ANNOUNCEMENT =
    "Error on getting announcement";
  ERROR_ON_DELETE_ANNOUNCEMENT =
    "Error on archiving announcement";
  ERROR_ON_LIST_ANNOUNCEMENT =
    "Error on fetching announcement list";
  ANNOUNCEMENT_LIST_NOT_FOUND = "No announcement found";

  FAILED_TO_FETCH_DATA = "Failed to fetch data";
  NO_DATA_TO_FETCH = "No data to fetch";
  DATA_FETCHED_SUCCESS = "Data fetched successfully";
  DATA_FETCHED_SUCCESS_WITH_CONFLICTS =
    "Data fetched successfully but contains conflicted ids";
  NO_DATA_TO_FETCH_BUT_CONFLICT_PRESENT =
    "No data feteched but contains conflicted ids";

  //AVAILABILITY
  INVALID_TIMEZONE = "Invalid timezone";
  NO_DOCTOR_AVAILABLE = "No doctor available";
  AVAILABILITY_UPDATE_FAILED =
    "Error on updating availability";
  AVAILABILITY_GET_FAILED = "No availability found";
  ALREADY_AVAILABILITY =
    "You have already set availability for this location. Please change location";
  AVAILABILITY_SET_SUCCESS =
    "Availability set successfully";
  UNAVAILABILITY_SET_SUCCESS =
    "Unavailability set successfully";
  UNAVAILABILITY_DELETE_SUCCESSFULL =
    "Unavailability deleted successfully";
  ERROR_ON_SET_AVAILABILITY =
    "Error on setting availability";
  ERROR_ON_SET_UNAVAILABILITY =
    "Error on setting unavailability";
  SELECT_ATLEAST_ONE_DAY =
    "Plaese select atleast one day in any appointment type";

  ERROR_ON_SET_UNAVAILABILITY_INVALID_DATE =
    "Invalid date range or selected days";

  ERROR_ON_SET_UNAVAILABILITY_DOCTOR_UNAVAILABLE =
    "Provider unavailable at that time";

  ERROR_ON_SET_UNAVAILABILITY_ALREADY_APPOINTMENT =
    "Provider already have appointment at that time";

  ERROR_ON_GET_UNAVAILABILITY = "No unavailability found";

  //PAYMENT_GATEWAY

  ERROR_ADD_PAYMENT_GATEWAY =
    "An error occurred while adding payment gateway";

  ERROR_DELETION_PAYMENT_GATEWAY =
    "An error occurred while trying to archive payment gateway";

  PAYMENT_GATEWAY_NOT_FOUND =
    "Payment gateway details not found";

  INVALID_PAYMENT_GATEWAY_CREDENTIALS =
    "Invalid payment gateway account credentials";

  PAYMENT_GATEWAY_LIST_NOT_FOUND =
    "Payment gateway list not found";

  PAYMENT_GATEWAY_ACCOUNT_VERIFIED =
    "Payment gateway account verified successfully";

  ERROR_PAYMENT_GATEWAY_ACCOUNT_VERIFIED =
    "An error occurred while trying to verified payment gateway account";

  // clinic

  CLINIC_ALREADY_ASSOCIATED_EMAIL =
    "This email already associated with another clinic";

  ERROR_ADD_CLINIC =
    "An error occurred while adding clinic";

  CLINIC_DETAILS_NOT_FOUND = "Clinic details not found";

  CLINIC_LIST_NOT_FOUND = "Clinic list not found";

  CLINIC_DELETION_ERROR =
    "An error occurred while trying to archive clinic";

  ERROR_UPDATE_CLINIC =
    "An error occurred while updating clinic";

  ALREADY_ADDED_CLINIC_LOCATION =
    "Clinic location already added on this location";

  // clinic locations
  ERROR_ADD_CLINIC_LOCATION =
    "An error occurred while adding clinic location";

  ERROR_UPDATE_CLINIC_LOCATION =
    "An error occurred while updating clinic location";

  CLINIC_LOCATIONS_DETAILS_NOT_FOUND =
    "Clinic location details not found";

  CLINIC_LOCATIONS_LIST_NOT_FOUND =
    "Clinic locations list not found";

  //Groups

  ERROR_ADD_GROUP = "An error occurred while adding group";

  ALREADY_EXISTED_GROUP =
    "Group already exist with this name";

  CLINIC_ALREADY_ASSOCIATED_GROUP =
    "Clinic already added in this group";

  CLINIC_ALREADY_ASSOCIATED_ANOTHER_GROUP =
    "Clinic already added in another group";

  ERROR_ADD_CLINIC_IN_GROUP =
    "An error occurred while adding clinic in group";

  GROUPS_DETAILS_NOT_FOUND = "Group details not found";

  CLINIC_NOT_ASSOCIATED_GROUP =
    "Clinic not a part of any group";

  ERROR_UNGROUP_CLINIC_IN_GROUP =
    "An error occurred while ungroup clinic from group";

  ERROR_GROUP_DELETION =
    "An error occurred while deleting group";

  CLINIC_GROUP_LIST_NOT_FOUND =
    "Clinic group list not found";

  //PATIENTS

  PATIENT_DETAILS_NOT_FOUND = "Patient details not found";

  ERROR_PATIENT_DELETION =
    "An error occurred while deleting patient details";

  ERROR_ADD_PATIENT =
    "An error occurred while adding patient";

  ERROR_UPDATE_PATIENT =
    "An error occurred while update patient details";

  PATIENT_LIST_NOT_FOUND = "Patient list not found";

  PATIENT_NOT_VERIFIED =
    "Patient profile is not verified and authorized to perform this action";

  //Patient Documnet
  ERROR_ADD_PATIENT_DOC =
    "An error occurred while adding patient document";

  PATIENT_DOC_DETAILS_NOT_FOUND =
    "Patient document details not found";

  PATIENT_DOC_DELETED_SUCCESS =
    "Patient document deleted successfully";

  PATIENT_DOC_UPDATED_SUCCESS =
    "Patient document updated successfully";

  ERROR_DELETE_PATIENT_DOC =
    "An error occurred while archiving patient document";

  PATIENT_DOCUMENT_LIST_NOT_FOUND =
    "Patient document list not found";

  MERGE_SUCCESS = "Patient merged successfully";

  MERGE_FAILED = "Patient merged failed";

  //CHECKOUT

  CHECK_OUT_DONE = "Patient checked-out";

  NO_CHECKED_OUT_APPOINTMENT_FOUND =
    "No checked out appointment found";

  //INSURANCE

  insuranceMsg = {
    company: {
      addSuccess: "Insurance company added successfully",
      nameReq: "Please enter insurance company name",
      exist: (companyName) =>
        `${companyName} already exist`,
    },
    idReq: "Please enter insurance id",
    coverageExist: (coverage) =>
      `${coverage} insurance already exist`,
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
    notAccessData:
      "You are not having permission to view insurance details. Please contact clinic admin",
    copayTypeReq: "Please enter copay type",
    invalidFinancialClass:
      "Kindly fill the insurance details to proceed further",
    insurancePlanTypeReq: "Please select plan type",
  };

  ERROR_ADD_INSURANCE =
    "An error occurred while adding insurance";

  ERROR_ALRAEDY_EXIST_INSURANCE =
    "Insurance details already exist for this patient";

  INSURANCE_DETAILS_NOT_FOUND =
    "Insurance details not found";

  ERROR_INSURANCE__DELETION =
    "An error occurred while deleting patient insurance details";

  ERROR_UPDATE_INSURANCE =
    "An error occurred while update insurance";

  INSURANCE_LIST_NOT_FOUND = "Insurance list not found";

  //INSURANCE COMPANIES

  ERROR_ADD_INSURANCE_COMPANIES =
    "An error occurred while adding insurance company";

  INSURANCE_COMPANIES_DETAILS_NOT_FOUND =
    "Insurance company details not found";

  ERROR_INSURANCE_COMPANIES__DELETION =
    "An error occurred while deleting insurance company details";

  ERROR_UPDATE_INSURANCE_COMPANIES =
    "An error occurred while update insurance company";

  INSURANCE_COMPANIES_LIST_NOT_FOUND =
    "Insurance companylist not found";

  //APPOINTMENT
  ERROR_ADD_APPOINTMENT =
    "An error occurred while adding an appointment";

  ERROR_RESCHEDULED_APPOINTMENT =
    "An error occurred while trying to reschedule appointment";

  ERROR_UPDATE_APPOINTMENT =
    "An error occurred while update an appointment";

  ERROR_DELETE_APPOINTMENT =
    "An error occurred while archiving an appointment";

  APPOINTMENT_DETAILS_NOT_FOUND =
    "Appointment details not found";

  NUMBER_OF_PATIENTS_EXCEED_APPOINTMENT =
    "Number of patients in this appointmnet can not be greater than ";

  MULTIPLE_PATIENTS_NOT_ALLOWED =
    "Multiple patient not allowed in this appointment ";

  APPOINTMENT_LIST_NOT_FOUND = "Appointment list not found";

  appointmentMsg = {
    checkoutCodeReq:
      "Please select atleast one icd 10 code",
    rescheduleSuccess:
      "Appointment rescheduled succesfully",
    notRescheduled: "Appointment has not been rescheduled",
    AlreadyAppointment:
      "Provider already have appointment at that time",
    apptNotFound: "Appointment not found",

    rescheduleApptNotAllowed:
      "Rescheduled Appointment not allowed in this clinic",

    clinicPolicyNotFound:
      "Clinic policy details not found.Need to update clinic policy first for this action",
    alreadyRescheduled:
      "Appointment has already been rescheduled",
    conflictClinicPolicy: (type: any, hours: any) =>
      `You can ${type} appointment only ${hours} hours before the appointment start time`,
    providerUnavailable:
      "Provider is not available at this time", //Added by charanjit

    paymentReceived: {
      type: "paymentReceived",
      title: () => "Payment received",
      message: (patientName: string) =>
        `Amount recived from ${patientName} patient`,
    },
    paymentReceivedOnly: (amount: any) =>
      "$" + amount + " received",
  };

  subscriptionMsg = {
    paymentDataErr: "Payment failed, please try again",
  };
  paymentFail = 402;

  NO_STRIPE_PAYMENT_GATEWAY_ACCESS =
    "Clinic has no stripe payment gateway to process payment";
  reccuring = {
    AlreadyAppointment:
      "Provider already have appointment at that time",
    endDateReq: "Please enter end date of plan",
    weekDayReq: "Please select week day",
    createdSucc: "Recurring appointments created",
    daysLimitExceed: "You can not exceed 28 days",
    monthLimitExceed: "You can not exceed 12 month",
    weekdaysReq: "Please select atleast on week day",
    weekdaysLimitExceed: "You can not exceed 3 weeks",
    enterNegValue: "Value must be an positive integer",
    endDateExceed:
      "Start date should be less then end date",
    whichDayReq:
      "Please select which day appointment should recur",
    numOfApptReq:
      "Please enter the number of occurrence between 2 and 20",
    doctorUnavailabile:
      "Provider is unavailable in between the recurring timing",
    noApptCreated:
      "No appointment created, please change the pattern and try again",
    daysValueReq:
      "Please enter value. i.e. after how many days appointment should repeat",
    monthValueReq:
      "Please enter value. i.e. after how many month appointment should repeat",
    totalApptimitExceed:
      "Total number of appointment should be less than 100. Please change the pattern",
  };

  NO_RECORD_FOUND = "No record found";

  SomeThingWentWrong = "Something went wrong";
  dateReq = "Please select date";

  DOCTOR_ID_NOT_EMPTY = "Doctor id can not be empty";
  PATIENT_ID_NOT_EMPTY = "Patient id can not be empty";

  financialClassMsg = {
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

    ERROR_ADD_FINANCIAL_CLASS:
      "An error occurred while adding financial class",
    ERROR_UPDATE_FINANCIAL_CLASS:
      "An error occurred while updating financial class",

    ERROR_DELETE_FINANCIAL_CLASS:
      "An error occurred while archiving financial class",

    FINANCIAL_CLASS_DETAILS_NOT_FOUND:
      "Financial class details not found",

    ALREADY_EXIST_FINANCIAL_CLASS:
      "Financial class already exist with this code",

    FINANCIAL_CLASS_LIST_NOT_FOUND:
      "Financial class list not found",
  };

  progressNotesNotFilled =
    "You can not checkout. Please fill progress notes first";

  billingMsg = {
    PostPaymentNotFound: "Post payment details not found",

    PostPaymentListNotFound: "Post payment list not found",
    errorOccuredMakePayment:
      "An error occurred while try to payment",
    errorOccuredUpdatePostPayment:
      "An error occurred while try to update post payment details",
    paymentDetailsNotFound: "Payment details not found",
    paymentDetailsUpdated:
      "Payment details updated successfully",

    onlyDuePaymentUpdated:
      "Only due payment details can be updated",
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
    alreadylinkDisabledSucc:
      "Payment link already disabled",
    paymentDelSuccess: "Transaction removed successfully",
    emailSentError:
      "Email could not be sent. Try again later",
    removeError: "Cannot remove transaction",
    notChangeMethod: "You can not change payment method",
    notChangeInsAmt: "You can not change insurance amount",
    notUpdateAfterBatch:
      "You can not update charge details",
    waveOffMethodReq:
      "Please select atlease one method of wave off",
    // waveOffDone: (copayAmount, insuranceAmount) =>
    //   `${copayAmount ? `$${copayAmount} of copay` : ''}${copayAmount && insuranceAmount ? ' and ' : ''}${insuranceAmount ? `$${insuranceAmount} of insurance ` : ''} wave off`,
    // billNowOnlyCards: 'You can bill only cards payment',
    alreadyCheckedout:
      "Already checked out this appointment",
    notCheckoutByDoctor:
      "Patient not checkedout by provider yet",
    // copayTypeReq: (paymentMethod) => 'Please select payment mode of ' + paymentMethod,
    invalidSplitAmount:
      "Sum of payer 1 and payer 2 should be equal to total of copay amount",
    // noShowAppt: (noShow) => `This is${noShow ? '' : ' not'} no show appointment can not charge with this API`,
    batchDoneWithEmailError:
      "Batch run successfully but due to some technical issue payment links are not send to their respective emails",
    sendReceiptForReceivedPayment:
      "You can share receipt for successfully received payment only",
  };

  mailSubject = {
    paymentReceipt: "Payment receipt",
    forgotPassword: "Reset password link",
    signUpSuccess: "Sign-up success in Thera Tap",
    contactUs: "Prospective client  tried to contact",
    shareLinkPayment: "RCM: Regarding payment link",
    meetingUrl: "Tele-call link",
    appointmentReminder: "Reminder mail for appointment",
    invitationAccepted: (name: string) =>
      "Inviation accepted by " + name,
    invitationDeclined: (name: string) =>
      "Inviation declined by " + name,
    invitation: (clinic: string) =>
      `Invitation from ${
        clinic ? clinic + " clinic" : "admin"
      }`,

    // removeLicence: 'Remove Licence',

    // clinicemailsubject: 'Account renewal email to clinic by SA',
  };

  incorrectAction = (status: any, type: any) =>
    `You can not ${type} this appointment${
      status
        ? " it has been already " +
          status.toLowerCase() +
          ". Please refresh the page"
        : ""
    }`;

  //apptNotFound = "Appointment not found";
  // UPDATE_SUCCESSFULL = "Updated successfully";
  // DELETE_SUCCESSFULL = "Deleted successfully";
  apptNotFound = "Appointment details not found";

  ERROR_ADD_CARD =
    "An error occurred while adding patient card";

  ERROR_DELETE_CARD =
    "An error occurred while archiving card details";
  ERROR_PAYMENT_CARD =
    "An error occurred while try to payment with card";

  CARD_DETAILS_NOT_FOUND = "Card details not found";

  CARD_LIST_NOT_FOUND = "Card list not found";

  UPDATE_SUCCESSFULL = "Updated successfully";

  DELETE_SUCCESSFULL = "Archived successfully";

  SAVED_SUCCESSFULL = "Saved successfully";

  // CLAIMS

  CLAIM_ALREADY_SUBMITTED = "Claim already submitted";

  ERROR_SUBMIT_CLAIM =
    "An error occurred while submitting claim";

  CLAIM_PATIENT_NOT_FOUND = "Patient details not found";

  CLAIM_RECEIVERER_NOT_FOUND = "Receiver detail not found";

  CLAIM_BILLING_PROVIDER_NOT_FOUND =
    "Billing provider detail not found";

  CLAIM_Referring_PROVIDER_NOT_FOUND =
    "Referring provider detail not found";

  CLAIM_Service_PROVIDER_NOT_FOUND =
    "Service provider detail not found";

  CLAIM_Rendering_PROVIDER_NOT_FOUND =
    "Rendering provider detail not found";

  CLAIM_INFO_NOT_FOUND = "Claim detail not found";
  CLAIM_LIST_NOT_FOUND = "Claim list not found";

  CLAIM_INFO_NOT_FOUND_THIS_CLAIMID =
    "Claim detail not found with for this claim id";

  cardMsg = {
    limit: 3,
    deleted: "Card details archived successfully",
    deletionError:
      "An error occurred while try to archive card details",

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
    limitExceed: (limit: any) =>
      "You can save only " + limit + " card",
  };

  patientMsg = {
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
    isVerifiedReq:
      "Please enter is isVerified status of patient",
    registerModeReq:
      "Internal Error!! Please enter reister mode",
    specialCasePatientNotEmail:
      "You can send email to this patient as it is a special case patient without email",
    exist: (isActive: any) =>
      `Patient with this email address already exist in your clinic${
        isActive ? "" : " but acount is not active"
      }`,
  };

  socketEvents = {
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
  socketCodes = {
    ok: 200,
    convNotFound: 401,
    uRNotMember: 402,
    onlyAdminMsg: 403,
    uBlocked: 404,
    internalservererror: 500,
  };
  rolename = {
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
  conversationMsg = {
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
    uRNotMember:
      "You are not a member of this conversation",
    invalidAction:
      "You not have access to perform this action",
    selectedUserNotMember:
      "Selected user is not a member of group",
    onlyAdminAddOrRemove: (action: any) =>
      "Only admin can " + action + " members",
    limitExceed: (limit: any) =>
      "You can add only " + limit + " members in a group",
    onlyOneMemberInIndividual:
      "You can add only one member in one to one chat",
  };
  paymentMsg = {
    paymentAdded: "Payment Added Successfully",

    ErrorPaymentAdded:
      "An error occurred while try to add payment",
  };
}

export default new ErrorMessage();
