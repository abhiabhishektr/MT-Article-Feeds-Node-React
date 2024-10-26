import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
    title: string;       
    description: string; 
    category: 'sports' | 'politics' | 'space' | 'tech' | 'news'; 
    content: string;     
    author: string;      
    likes: string[];     
    dislikes: string[];  
    blocks: string[];    
    images: string[];    
    tags: string[];      
}

const ArticleSchema: Schema = new Schema({
    title: { type: String, required: true },       
    description: { type: String, required: true }, 
    category: { 
        type: String, 
        enum: ['sports', 'politics', 'space', 'tech', 'news'],
        required: true 
    },
    content: { type: String, required: true },     
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    blocks: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }], 
    images: [{ type: String }],                    
    tags: [{ type: String }]                        
}, { timestamps: true });

export default mongoose.model<IArticle>('Article', ArticleSchema);
