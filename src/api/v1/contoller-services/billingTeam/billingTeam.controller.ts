import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import Utility, {
  ValidationResult,
} from "../../../v1/common/common-methods";
import {
  AddBillingTeamViewmodel,
  AssignClinicToTeamViewmodel,
  AssignMemberToTeamViewmodel,
  AssignMemberViewmodel,
  GetBillingTeamClinicsListViewmodel,
  GetBillingTeamListViewmodel,
  GetBillingTeamMembersListViewmodel,
  UnAssignClinicToTeamViewmodel,
  UpdateBillingTeamViewmodel,
  UpdateMemberAssociationToTeamViewmodel,
} from "../../view-models/billingTeam";
import { CheckMongoIdViewmodel } from "../../view-models/check_mongo_id.viewmodel";

import billingTeamService from "./billingTeam.service";

class BillingTeam_Controller {
  addBillingTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AddBillingTeamViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AddBillingTeamViewmodel =
          conversionResult.data as AddBillingTeamViewmodel;

        let addBillingTeamResult =
          await billingTeamService.addBillingTeam(
            req,
            model,
            next
          );

        if (addBillingTeamResult)
          return res
            .status(addBillingTeamResult.status_code)
            .json({
              status_code: addBillingTeamResult.status_code,
              success: addBillingTeamResult.success,

              ...(addBillingTeamResult.success
                ? { data: addBillingTeamResult.data }
                : {
                    ...(addBillingTeamResult.success
                      ? { data: addBillingTeamResult.data }
                      : {
                          errors: addBillingTeamResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };
  updateBillingTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdateBillingTeamViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateBillingTeamViewmodel =
          conversionResult.data as UpdateBillingTeamViewmodel;

        let updateBillingTeamResult =
          await billingTeamService.updateBillingTeam(
            req,
            model,
            next
          );

        if (updateBillingTeamResult)
          return res
            .status(updateBillingTeamResult.status_code)
            .json({
              status_code:
                updateBillingTeamResult.status_code,
              success: updateBillingTeamResult.success,

              ...(updateBillingTeamResult.success
                ? { data: updateBillingTeamResult.data }
                : {
                    ...(updateBillingTeamResult.success
                      ? {
                          data: updateBillingTeamResult.data,
                        }
                      : {
                          errors:
                            updateBillingTeamResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };
  deleteBillingTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          CheckMongoIdViewmodel,
          JSON.parse(`{"_id":"${req.params._id}"}`)
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let deleteBillingTeamResult =
          await billingTeamService.deleteBillingTeam(
            req,
            model,
            next
          );

        if (deleteBillingTeamResult)
          return res
            .status(deleteBillingTeamResult.status_code)
            .json({
              status_code:
                deleteBillingTeamResult.status_code,
              success: deleteBillingTeamResult.success,

              ...(deleteBillingTeamResult.success
                ? { data: deleteBillingTeamResult.data }
                : {
                    ...(deleteBillingTeamResult.success
                      ? {
                          data: deleteBillingTeamResult.data,
                        }
                      : {
                          errors:
                            deleteBillingTeamResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };
  getBillingTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          CheckMongoIdViewmodel,
          JSON.parse(`{"_id":"${req.params._id}"}`)
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: CheckMongoIdViewmodel =
          conversionResult.data as CheckMongoIdViewmodel;

        let getBillingTeamResult =
          await billingTeamService.getBillingTeam(
            req,
            model,
            next
          );

        if (getBillingTeamResult)
          return res
            .status(getBillingTeamResult.status_code)
            .json({
              status_code: getBillingTeamResult.status_code,
              success: getBillingTeamResult.success,

              ...(getBillingTeamResult.success
                ? { data: getBillingTeamResult.data }
                : {
                    ...(getBillingTeamResult.success
                      ? { data: getBillingTeamResult.data }
                      : {
                          errors: getBillingTeamResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };

  addMember = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AssignMemberViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AssignMemberViewmodel =
          conversionResult.data as AssignMemberViewmodel;

        let assignResult =
          await billingTeamService.addMember(
            req,
            model,
            next
          );

        if (assignResult)
          return res.status(assignResult.status_code).json({
            status_code: assignResult.status_code,
            success: assignResult.success,

            ...(assignResult.success
              ? { data: assignResult.data }
              : {
                  ...(assignResult.success
                    ? { data: assignResult.data }
                    : { errors: assignResult.data }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  listBillingTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetBillingTeamListViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetBillingTeamListViewmodel =
          conversionResult.data as GetBillingTeamListViewmodel;

        let listBillingTeamResult =
          await billingTeamService.listBillingTeam(
            req,
            model,
            next
          );

        if (listBillingTeamResult)
          return res
            .status(listBillingTeamResult.status_code)
            .json({
              status_code:
                listBillingTeamResult.status_code,
              success: listBillingTeamResult.success,

              ...(listBillingTeamResult.success
                ? { data: listBillingTeamResult.data }
                : {
                    ...(listBillingTeamResult.success
                      ? { data: listBillingTeamResult.data }
                      : {
                          errors:
                            listBillingTeamResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };
  listBillingTeamMembers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetBillingTeamMembersListViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetBillingTeamMembersListViewmodel =
          conversionResult.data as GetBillingTeamMembersListViewmodel;

        let listBillingTeamResult =
          await billingTeamService.listBillingTeamMembers(
            req,
            model,
            next
          );

        if (listBillingTeamResult)
          return res.status(HttpStatus.OK).json({
            status_code: listBillingTeamResult.status_code,
            success: listBillingTeamResult.success,

            ...(listBillingTeamResult.success
              ? { data: listBillingTeamResult.data }
              : {
                  ...(listBillingTeamResult.success
                    ? { data: listBillingTeamResult.data }
                    : {
                        errors: listBillingTeamResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  listBillingTeamClinics = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetBillingTeamClinicsListViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetBillingTeamClinicsListViewmodel =
          conversionResult.data as GetBillingTeamClinicsListViewmodel;

        let listBillingTeamResult =
          await billingTeamService.listBillingTeamClinics(
            req,
            model,
            next
          );

        if (listBillingTeamResult)
          return res.status(HttpStatus.OK).json({
            status_code: listBillingTeamResult.status_code,
            success: listBillingTeamResult.success,

            ...(listBillingTeamResult.success
              ? { data: listBillingTeamResult.data }
              : {
                  ...(listBillingTeamResult.success
                    ? { data: listBillingTeamResult.data }
                    : {
                        errors: listBillingTeamResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };
  assignMemberToTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AssignMemberToTeamViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AssignMemberToTeamViewmodel =
          conversionResult.data as AssignMemberToTeamViewmodel;

        let listBillingTeamResult =
          await billingTeamService.assignMemberToTeam(
            req,
            model,
            next
          );

        if (listBillingTeamResult)
          return res
            .status(listBillingTeamResult.status_code)
            .json({
              status_code:
                listBillingTeamResult.status_code,
              success: listBillingTeamResult.success,

              ...(listBillingTeamResult.success
                ? { data: listBillingTeamResult.data }
                : {
                    ...(listBillingTeamResult.success
                      ? { data: listBillingTeamResult.data }
                      : {
                          errors:
                            listBillingTeamResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };
  removeMember = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AssignMemberToTeamViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AssignMemberToTeamViewmodel =
          conversionResult.data as AssignMemberToTeamViewmodel;

        let removeMemeberTeamResult =
          await billingTeamService.removeMember(
            req,
            model,
            next
          );

        if (removeMemeberTeamResult)
          return res
            .status(removeMemeberTeamResult.status_code)
            .json({
              status_code:
                removeMemeberTeamResult.status_code,
              success: removeMemeberTeamResult.success,

              ...(removeMemeberTeamResult.success
                ? { data: removeMemeberTeamResult.data }
                : {
                    ...(removeMemeberTeamResult.success
                      ? {
                          data: removeMemeberTeamResult.data,
                        }
                      : {
                          errors:
                            removeMemeberTeamResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };

  removeAndAddNewTeamAssociation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UpdateMemberAssociationToTeamViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UpdateMemberAssociationToTeamViewmodel =
          conversionResult.data as UpdateMemberAssociationToTeamViewmodel;

        let removeMemeberTeamAssociationResult =
          await billingTeamService.removeAndAddNewTeamAssociation(
            req,
            model,
            next
          );

        if (removeMemeberTeamAssociationResult)
          return res
            .status(
              removeMemeberTeamAssociationResult.status_code
            )
            .json({
              status_code:
                removeMemeberTeamAssociationResult.status_code,
              success:
                removeMemeberTeamAssociationResult.success,

              ...(removeMemeberTeamAssociationResult.success
                ? {
                    data: removeMemeberTeamAssociationResult.data,
                  }
                : {
                    ...(removeMemeberTeamAssociationResult.success
                      ? {
                          data: removeMemeberTeamAssociationResult.data,
                        }
                      : {
                          errors:
                            removeMemeberTeamAssociationResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };

  filterListBillingTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetBillingTeamListViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetBillingTeamListViewmodel =
          conversionResult.data as GetBillingTeamListViewmodel;

        let listBillingTeamResult =
          await billingTeamService.filterListBillingTeam(
            req,
            model,
            next
          );

        if (listBillingTeamResult)
          return res
            .status(listBillingTeamResult.status_code)
            .json({
              status_code:
                listBillingTeamResult.status_code,
              success: listBillingTeamResult.success,

              ...(listBillingTeamResult.success
                ? { data: listBillingTeamResult.data }
                : {
                    ...(listBillingTeamResult.success
                      ? { data: listBillingTeamResult.data }
                      : {
                          errors:
                            listBillingTeamResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };
  //filterListBillingTeam

  getBillingTeamDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetBillingTeamListViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetBillingTeamListViewmodel =
          conversionResult.data as GetBillingTeamListViewmodel;

        let listBillingTeamResult =
          await billingTeamService.getBillingTeamDataToExcel(
            req,
            model,
            next
          );

        if (listBillingTeamResult)
          return res
            .status(listBillingTeamResult.status_code)
            .json({
              status_code:
                listBillingTeamResult.status_code,
              success: listBillingTeamResult.success,

              ...(listBillingTeamResult.success
                ? { data: listBillingTeamResult.data }
                : {
                    ...(listBillingTeamResult.success
                      ? { data: listBillingTeamResult.data }
                      : {
                          errors:
                            listBillingTeamResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };

  getBillingTeamMembersDataToExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          GetBillingTeamMembersListViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: GetBillingTeamMembersListViewmodel =
          conversionResult.data as GetBillingTeamMembersListViewmodel;

        let listBillingTeamResult =
          await billingTeamService.getBillingTeamMembersDataToExcel(
            req,
            model,
            next
          );

        if (listBillingTeamResult)
          return res
            .status(listBillingTeamResult.status_code)
            .json({
              status_code:
                listBillingTeamResult.status_code,
              success: listBillingTeamResult.success,

              ...(listBillingTeamResult.success
                ? { data: listBillingTeamResult.data }
                : {
                    ...(listBillingTeamResult.success
                      ? { data: listBillingTeamResult.data }
                      : {
                          errors:
                            listBillingTeamResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };

  // clinic assignment to billing team

  assignClinicToBillingTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          AssignClinicToTeamViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: AssignClinicToTeamViewmodel =
          conversionResult.data as AssignClinicToTeamViewmodel;

        let assignResult =
          await billingTeamService.assignClinicToBillingTeam(
            req,
            model,
            next
          );

        if (assignResult)
          return res.status(assignResult.status_code).json({
            status_code: assignResult.status_code,
            success: assignResult.success,

            ...(assignResult.success
              ? { data: assignResult.data }
              : {
                  ...(assignResult.success
                    ? { data: assignResult.data }
                    : {
                        errors: assignResult.data,
                      }),
                }),
          });
      }
    } catch (error) {
      next(error);
    }
  };

  UnAssignClinicToBillingTeam = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let conversionResult: ValidationResult =
        await Utility.ValidateAndConvert(
          UnAssignClinicToTeamViewmodel,
          req.body
        );

      if (
        conversionResult.error &&
        conversionResult.error.length > 0
      ) {
        return res.status(HttpStatus.OK).send({
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          errors: conversionResult.error[0],
        });
      } else {
        let model: UnAssignClinicToTeamViewmodel =
          conversionResult.data as UnAssignClinicToTeamViewmodel;

        let unAssignResult =
          await billingTeamService.UnAssignClinicToBillingTeam(
            req,
            model,
            next
          );

        if (unAssignResult)
          return res
            .status(unAssignResult.status_code)
            .json({
              status_code: unAssignResult.status_code,
              success: unAssignResult.success,

              ...(unAssignResult.success
                ? { data: unAssignResult.data }
                : {
                    ...(unAssignResult.success
                      ? { data: unAssignResult.data }
                      : {
                          errors: unAssignResult.data,
                        }),
                  }),
            });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new BillingTeam_Controller();
