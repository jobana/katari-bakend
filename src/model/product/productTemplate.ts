import { Schema, Document, Model, model, Error } from "mongoose";

export class IProductTemplate extends Document {
   name: string;
   code: string;
   shoeModel: any;
   heelHeight: any;
   shoeTips: any;
   accessory: [];
   cut: any;
   shoeSize: any;
}

export const ProductTemplateSchema = new Schema({
 
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
      collection: "productTemplate"
   });

export const ProductTemplate: Model<IProductTemplate> = model<IProductTemplate>("ProductTemplate", ProductTemplateSchema);