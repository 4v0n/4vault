/**
 * @author NickAndreiTrivino
 */

// =================== IMPORTS =================== //
import mongoose, { Schema, Document } from "mongoose";



// ==================== ITEM INTERFACE ==================== //
export interface IItem extends Document {

    owner: mongoose.Types.ObjectId;     // - references user's id (whoever owns the file)
    filename: string;                   // - saves orignal file name 
    encryptedFile: string;              // - encrypted file (base64 string)
    fileType: string;                   // - recorded MIME type
    createdAt: Date;                    // - timestamp of created date
    updatedAt: Date;                    // - timestamp of updated date
}



// ==================== ITEM SCHEMATIC (Database) ==================== //
const ItemSchema: Schema = new Schema({

    // ----- Owner ----- //
    owner: {
        type: Schema.Types.ObjectId,       // - data type - search Object's 'Id' field
        ref: "User",                       // - references "User" Model
        required: true                     // - compulsory field (not nullable)
    },

    // ----- Filename ----- //
    filename: {
        type: String,                      // - data type
        required: true                     // - compulsory field (not nullable)
    },

    // ----- Stored Encrypted File ----- //
    encryptedFile: {
        type: String,                     // - data type (string for base64)
        required: true                    // - compulsory field (not nullable)
    },

    // ----- MIME Type ----- //
    fileType:{
        type: String,                     // - MIME Type
        required: true                    // - compulsory field (not nullable)
    
    },
    

}, {
    // ----- Auto-Generated Timestamps ----- //
    timestamps: true                    // - automatically creates "createdAt" & "updatedAt" fields
});



// ==================== Create & Export Mongoose Model ==================== //
export default mongoose.model<IItem>('Item', ItemSchema);