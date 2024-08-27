import mongoose from "mongoose";
import User from "../models/User";
import * as chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const should = chai.should();
chai.use(chaiHttp);


describe("User tests", () => {
  describe("Model tests", () => {
    it("should create and save a new user", async () => {
      "a".should.equal("b");
    });

    it("should require a name", async () => {
      "a".should.equal("b");
    });

    it("should require an email", async () => {
      "a".should.equal("b");
    });

    it("should require a password", async () => {
      "a".should.equal("b");
    });

    it("should not allow names above 20 characters", async () => {
      "a".should.equal("b");
    });

    it("should not allow incorrectly formatted/invalid emails", async () => {
      "a".should.equal("b");
    });

    it("should not allow emails above 254 characters", async () => {
      "a".should.equal("b");
    });

    it("should not allow the registration of a new user with an already in use email", async () => {
      "a".should.equal("b");
    });
  });

  describe("API tests", () => {
    it("should allow for the registration of a valid user", async () => {
      "a".should.equal("b");
    });

    it("should not register a user with an invalid request object", async () => {
      "a".should.equal("b");
    });

    it("should not register a user with the same email", async () => {
      "a".should.equal("b");
    });

    it("should login a user with the correct credentials", async () => {
      "a".should.equal("b");
    });

    it("should not login a user with the incorrect details", async () => {
      "a".should.equal("b");
    });

    it("should not login a user with an invalid request object", async () => {
      "a".should.equal("b");
    });

    it("should provide an authorised user with their own profile", async () => {
      "a".should.equal("b");
    });

    it("should not provide an unauthorised user with another user's profile", async () => {
      "a".should.equal("b");
    });

    it("should not provide a user without a bearer token a profile", async () => {
      "a".should.equal("b");
    });

    it("should not provide a user with an invalid bearer token a profile", async () => {
      "a".should.equal("b");
    });

    it("should allow an authorised user to edit their own details", async () => {
      "a".should.equal("b");
    });

    it("should not allow a user to edit another user's details ", async () => {
      "a".should.equal("b");
    });

    it("should allow an authorised user to delete their own account", async () => {
      "a".should.equal("b");
    });

    it("should not allow an unauthorised user to delete another user's account", async () => {
      "a".should.equal("b");
    });
  });
});