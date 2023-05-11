"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDefaultOptions = exports.PaginatedModel = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var PaginatedModel = /** @class */ (function () {
    function PaginatedModel() {
    }
    PaginatedModel = __decorate([
        (0, typegoose_1.plugin)(mongoose_paginate_v2_1.default)
    ], PaginatedModel);
    return PaginatedModel;
}());
exports.PaginatedModel = PaginatedModel;
exports.PaginationDefaultOptions = {
    page: 1,
    limit: 50,
};
