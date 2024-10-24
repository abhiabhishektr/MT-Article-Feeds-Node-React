
import mongoose, { Schema, Document } from 'mongoose';

export interface IPreferences extends Document {
    user: string;
    categories: string[];
}

const PreferencesSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    categories: { type: [String], default: [] },
});

export default mongoose.model<IPreferences>('Preferences', PreferencesSchema);
