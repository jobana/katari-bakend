import { Schema, Document, Model, model, Error } from "mongoose";

export class IOrder extends Document {
   name: string;
   code: string;

}

export const OrderSchema = new Schema({
    _id: Schema.Types.ObjectId,
   name: {
      type: String,
      required: 'Enter a name'
   },
   code: {
      type: String,
      required: 'Enter a code'
   },
   creationDate: {
      type: Date,
      default: Date.now,
      required: false,
   }

},
   {
      collection: "orders"
   });

export const Order: Model<IOrder> = model<IOrder>("Design", OrderSchema);