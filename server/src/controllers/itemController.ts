/**
 * @author NickAndreiTrivino
 */

// =================== IMPORTS =================== //
import { Request, Response } from "express";
import Item, { IItem } from "../models/Item";



// =============================================== ITEM SAVING ========================================================== //
export const saveItem = async (req: Request, res: Response): Promise<void> => {

    // ----------- Successful Save ----------- //
    try {
        const itemData: Partial<IItem> = req.body;            // - get 'Item' data from request
        const newItem = new Item(itemData);                   // - create a new instance of the 'Item' using data
        const savedItem = await newItem.save();               // - save the new item to MongoDB
        res.status(201).json(savedItem);                      // - send '201' response (created)


    // ----------- Error Occured ----------- //
    } catch (error: unknown) {
        
        // ----- Error with 'Item' properties ----- //
        if (error instanceof Error) {
            res.status(500).json({ message: "Error saving item: ${error.message}" });   // - send '500' error response, known error
        }

        // ---- Error Unknown Error Type ----- //
        else {
            res.status(500).json({ message: ":An unexpected error occurred while saving the item" }); // - send '500' error response, generic error
        }
    }
};



// =============================================== ITEM DELETING ========================================================== //
export const deleteItem = async (req: Request, res: Response): Promise<void> => {

    // ----------- Find & Delete Item ----------- //
    try {
        const itemId = req.params.id;                                // - get 'Item ID' from request
        const deletedItem = await Item.findByIdAndDelete(itemId);    // - find & delete 'Item'

        // ------- Item already deleted -------- //
        if (!deletedItem) {
            res.status(404).json({ message: 'Item not found' });     // - send '404' error response, item not found
            return;                                                  // - stop process
        }

        // ------- Successful Delete ---------- //
        res.status(200).json(deletedItem);                           // - send '200' success response, item deleted 


    // ----------- Error Occured ----------- //
    } catch (error: unknown) {

        // ----- Error with 'Item' properties ----- //
        if (error instanceof Error) {
            res.status(500).json({ message: `Error deleting item: ${error.message}` });     // - send '500' error response, known error

        // ---- Error Unknown Error Type ----- //
        } else {
            res.status(500).json({ message: 'An unexpected error occurred while deleting the item' });   // - send '500' error response, generic error
        }
    }
};