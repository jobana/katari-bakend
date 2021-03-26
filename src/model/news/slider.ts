import { Schema, Document, Model, model, Error } from "mongoose";

export interface ISlider extends Document {
    state: string;
    text1: string;
    text2: string;
    description: string;
    image: string;
    design: boolean;
    creationDate: Date;
}

export const SliderSchema = new Schema({
    state: {
        type: String,
        required: 'Enter a state'
    },
    text1: {
        type: String,
        required: 'Enter a text1'
    },
    text2: {
        type: String,
        required: 'Enter a text2'
    },
    description: {
        type: String,
        required: 'Enter a description'
    },
    design: {
        type: Boolean,
        required: 'Enter a design'
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: false,
    }

},{
    collection: 'slider'
});

export const Slider: Model<ISlider> = model<ISlider>("Slider", SliderSchema);