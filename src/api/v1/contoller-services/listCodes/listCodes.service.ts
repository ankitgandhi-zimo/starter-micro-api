import { NextFunction, Request } from "express";
import HttpStatus from "http-status-codes";

import Utility, { IServiceResult1 } from "../../common/common-methods";
import errorMessage from "../../common/erros_message";

import ICTModel from "../../models/ict.model";
import CptCodeModel from "../../models/cpt.model";
import { ListViewmodel } from "../../view-models/list.viewmodel";
import NocCodesModel from "../../models/noc_codes.model";
import ModifierModel from "../../models/modifiers.model";
import TimezoneModel from "../../models/timezone.model";

class ListCodeServices {
  //Provides listing for dropdown for filtering data
  listICDCodes = async (
    req: Request,
    model: ListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {
        //isDeleted: false,
        //isActive: true,
      };

      if (model.codeCategory) {
        condition.codeCategory = model.codeCategory;
      }

      if (model.ictCode) {
        condition.ictCode = model.ictCode;
      }
      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.ictCode = {
          $regex: model.search,
          $options: "i",
        };
      }

      let response = await ICTModel.find(condition, {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        createdby_id: 0,
        isActive: 0,
        isDeleted: 0,
      }).sort({ createdAt: -1 });

      if (response && response.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            data: response,
            totalDocs: response.length,
          },
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.ICD_CODES_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listCPTCodes = async (
    req: Request,
    model: ListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {
        isDeleted: false,
        isActive: true,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.cptCode = {
          $regex: model.search,
          $options: "i",
        };
      }

      // if (model.isActive) {
      //   condition.isActive = model.isActive;
      // }

      let response = await CptCodeModel.find(condition, {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        createdby_id: 0,
        isActive: 0,
        isDeleted: 0,
      }).sort({ createdAt: -1 });

      if (response && response.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            data: response,
            totalDocs: response.length,
          },
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.CPT_CODE_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listNOCCodes = async (
    req: Request,
    model: ListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {
        isDeleted: false,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.HCPCS = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.HCPCS) condition.HCPCS = model.HCPCS;

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let response = await NocCodesModel.find(condition, {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        createdby_id: 0,
        isActive: 0,
        isDeleted: 0,
      }).sort({ createdAt: -1 });

      if (response && response.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            data: response,
            totalDocs: response.length,
          },
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.NOC_CODES_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listModifiers = async (
    req: Request,
    model: ListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {
        isDeleted: false,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.cptCode = {
          $regex: model.search,
          $options: "i",
        };
      }

      if (model.isActive) {
        condition.isActive = model.isActive;
      }

      let response = await ModifierModel.find(condition, {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        createdby_id: 0,
        isActive: 0,
        isDeleted: 0,
      }).sort({ createdAt: -1 });

      if (response && response.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            data: response,
            totalDocs: response.length,
          },
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.MODIFIERS_CODES_LIST_NOT_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
  listTimezone = async (
    req: Request,
    model: ListViewmodel,
    next: NextFunction
  ): Promise<IServiceResult1 | void> => {
    try {
      let condition: any = {
        isDeleted: false,
      };

      if (model.search) {
        let isEmptyNameOnlySpace = /^\s*$/.test(model.search);

        condition.timezone = {
          $regex: model.search,
          $options: "i",
        };
      }

      let response = await TimezoneModel.find(condition, {
        createdAt: 0,
        updatedAt: 0,
        // __v: 0,
        //createdby_id: 0,
        isActive: 0,
        isDeleted: 0,
      }).sort({ timezone: 1 });

      if (response && response.length > 0) {
        return {
          status_code: HttpStatus.OK,
          success: true,
          data: {
            data: response,
            totalDocs: response.length,
          },
        };
      } else {
        return {
          status_code: HttpStatus.BAD_REQUEST,
          success: false,
          data: {
            message: errorMessage.NO_RECORD_FOUND,
            error: errorMessage.ON_FETCH_ERROR,
          },
        };
      }
    } catch (error) {
      next(error);
    }
  };
}
export default new ListCodeServices();
