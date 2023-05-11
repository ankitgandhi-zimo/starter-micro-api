// import {
//   getModelForClass,
//   index,
//   prop,
//   Ref,
// } from "@typegoose/typegoose";
// import { PaginatedModel } from "../common/pagination/pagination_configuration";
// import { Patients } from "./patient.model";

// @index({ name: "text" })
// export class PatientsCards extends PaginatedModel {
//   @prop({ ref: "Patients" })
//   patient_id!: Ref<Patients>;

//   @prop({ type: String })
//   cardId!: string;
// }

// const PATIENT_CARDS_ASSOCIATION_DB_MODEL = getModelForClass(
//   PatientsCards,
//   {
//     schemaOptions: {
//       collection: "patient_card_association",
//       timestamps: true,
//     },
//   }
// );

// export default PATIENT_CARDS_ASSOCIATION_DB_MODEL;
