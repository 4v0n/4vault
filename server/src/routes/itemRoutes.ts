/**
 * @author NickAndreiTrivino
 */

// =================== IMPORTS =================== //
import express from "express";
import { saveItem, deleteItem } from '../controllers/itemController';


// =============== Create a Router instance =============== //
const router = express.Router();


// ===== Router POST Req ========== //
router.post("/items", saveItem);


// ===== Router DELETE Req ========== //
router.delete("/items/:id", deleteItem)


// ===== Export Router ===== //
export default router;