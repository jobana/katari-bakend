import { Schema, Document, Model, model, Error } from "mongoose";

export class IDesign extends Document {
  userId: string;
   name: string;
   code: string;
   shoeModel: any;
   heelHeight: any;
   shoeTips: any;
   accessory: [];
   cut: any;
   shoeSize: any;
}

export const DesignSchema = new Schema({
   userId: {
      type: String,
      required: 'Enter a userId'
   },
   name: {
      type: String,
      required: 'Enter a name'
   },
   code: {
      type: String,
      required: 'Enter a code'
   },
   shoeModel: {
      type: Object,
      required: 'Enter a shoeModel'
   },
   heelHeight: {
      type: Object,
      required: 'Enter a heelHeight'
   },
   shoeTips: {
      type: Object,
      required: 'Enter a shoeTips'
   },
   accessory: {
      type: Array,
      required: 'Enter a accessory'
   },
   cut: {
      type: Object,
      required: 'Enter a cut'
   },
   shoeSize: {
      type: Object,
      required: 'Enter a shoeSize'
   },
   creationDate: {
      type: Date,
      default: Date.now,
      required: false,
   }

},
   {
      collection: "design"
   });

export const Design: Model<IDesign> = model<IDesign>("Design", DesignSchema);