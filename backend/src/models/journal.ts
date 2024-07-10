import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./User";

export interface JournalDocument extends Document {
  title: string;
  content: string;
  category: string;
  date: Date;
  user: UserDocument['_id'];
}

const JournalSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<JournalDocument>('Journal', JournalSchema);
