import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
    user: mongoose.Types.ObjectId;
    title: string;
    content?: string;
    category: string;
}

const noteSchema = new Schema<INote>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String },
    category: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<INote>('notes', noteSchema);