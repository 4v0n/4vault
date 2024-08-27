/**
 * @author NickAndreiTrivino
 * A series of test used to validate the behaviour of the 'Item.ts' file
 */
import mongoose from "mongoose";
import User from "../models/User";
import * as chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const should = chai.should();
chai.use(chaiHttp);


// ============================== ITEM TEST SUMMARY =============================== //
describe("Item tests", () => {


  // =================== MODEL TESTS ====================== //
  /**
   * Check if the 'Item' model, behaves as intended
   * e.g: all fields are required, don't accept
   * documents with missing data
   */
  describe("Model tests", () => {


    // ----- Create & Save Item Test ----- //
    it("should create and save a new item", async () => {
      // - STEP 1: Save Item Data (Complete Data)
      // - STEP 2: Validate Fields
      // - STEP 3: Save Item

      // - EXPECTED RESULT: No error thrown
    });


    // ----- Missing 'owner' Test ----- //
    it("should require an owner", async () => {
      // - STEP 1: Save Item Data (Missing Owner Data)
      // - STEP 2: Validate Fields
      // - STEP 3: Don't Save Item

      // - EXPECTED RESULT: Error thrown - missing owner field
    });


    // ----- Missing 'filename' Test ----- //
    it("should require a filename", async () => {
      // - STEP 1: Save Item Data (Missing Filename Data)
      // - STEP 2: Validate Fields
      // - STEP 3: Don't Save Item

      // - EXPECTED RESULT: Error thrown - missing filename field
    });


    // ----- Missing 'encryptedFile' Test ----- //
    it("should require an encryptedFile", async () => {
      // - STEP 1: Save Item Data (Missing encryptedfile Data)
      // - STEP 2: Validate Fields
      // - STEP 3: Don't Save Item

      // - EXPECTED RESULT: Error thrown - missing encryptedfile field
    });


    // ----- Missing 'MIME' Test ----- //
    it("should require a fileType", async () => {
      // - STEP 1: Save Item Data (Missing fileType Data)
      // - STEP 2: Validate Fields
      // - STEP 3: Don't Save Item

      // - EXPECTED RESULT: Error thrown - missing filetype field
    });
  });


    // =================== API TESTS ====================== //
  /**
   * Check if the APIs, behave as intended
   */
  describe("API tests", () => {


    // ----- 'Item' Creation Through API ----- //
    it("should allow creating a new item through the API", async () => {
      // - STEP 1: Save 'Item' Data (Missing fileType Data)
      // - STEP 2: Use Chai send a req & receive a response
      // - STEP 3: Send saved 'Item' data
      // - STEP 4: Check response
      
      // - EXPECTED RESULT: Sent data and recieved data should match
    });


    // ----- Failed 'Item' Creation -> Missing Fields ----- //
    it("should not create an item with missing required fields", async () => {
      // - STEP 1: Save 'Item' Data (Missing fileType Data)
      // - STEP 2: Use Chai send a req & receive a response
      // - STEP 3: Send saved 'Item' data
      // - STEP 4: Check response
      
      // - EXPECTED RESULT: Error failed to send data as data did not match
    });


    // ----- Fetch 'Item' using ID ----- //
    it("should fetch an item by ID", async () => {
      // - STEP 1: Save 'Item' Data (Missing fileType Data)
      // - STEP 2: Use Chai send a req & receive a response
      // - STEP 3: Send saved 'Item' ID
      // - STEP 4: Check response
      
      // - EXPECTED RESULT: should recieve correct document
    });
  });
})