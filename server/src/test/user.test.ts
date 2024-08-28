import mongoose from "mongoose";
import User from "../models/User";
import * as chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import utils from ("utils")

chai.use(chaiHttp);


// ============================================= TEST SUMMARY ============================================================ //
describe("User tests", () => {


  // =========== FLUSH TEST DATABASE ============ //
  after(async () => {await utils.flushDB();});


  // ======================================================= MODEL TESTS ============================================================ //
  describe("Model tests", () => {
    let defaultUser;
    beforeEach(async () => {
      await utils.flushDB();


      // ============== CREATE A FAKE USER ============ //
      defaultUser = await User.create({
        name: "Jill",
        email: "jill@example.com",
        password: "123"
      });
    });


    // ================ TEST: SHOULD CREATE & SAVE USER ====================== //
    it("should create and save a new user", async () => {
      await User.create({
        name: "John",
        email: "john@example.com",
        password: "123"
      })
        .catch((error) => {
          should.not.exist(error, "The user should have been valid");
        })
        .then((user) => {
          should.exist(user);
        });
    });


    // ================ TEST: SHOULD REQUIRE A NAME =============== //
    it("should require a name", async () => {
      await User.create({
        email: "john@example.com",
        password: "123"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });


    // ================ TEST: SHOULD REQUIRE AN EMAIL ================== //
    it("should require an email", async () => {
      await User.create({
        name: "John",
        password: "123"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });


    // =================== TEST: SHOULD REQUIRE PASSWORD ===================== //
    it("should require a password", async () => {
      await User.create({
        name: "John",
        email: "john@example.com"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });


    // =============== TEST: SHOULD NOT ALLOW MORE THAN 20 CHARACTERS ============= //
    it("should not allow names above 20 characters", async () => {
      await User.create({
        name: "J".repeat(21),
        password: "123",
        email: "john@example.com"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });


    // =============== TEST: SHOULD NOT ALLOW EMAILS WITH THE WRONG FORMAT ======================== //
    it("should not allow incorrectly formatted/invalid emails", async () => {
      await User.create({
        name: "John",
        password: "123",
        email: "johnexample.com"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });


    // =============== TEST: SHOULD NOT ALLOW EMAILS ABOVE 254 CHARACTERS ============= //
    it("should not allow emails above 254 characters", async () => {
      await User.create({
        name: "John",
        password: "123",
        email: "j".repeat(250) + "@example.com"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("ValidationError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });


    // ============== TEST: SHOULD NOT REGISTER NEW USERS WITH THE EXISTING EMAIL ============== //
    it("should not allow the registration of a new user with an already in use email", async () => {
      await User.create({
        name: "John",
        password: "123",
        email: "jill@example.com"
      })
        .catch((error) => {
          should.exist(error);
          error.should.have.property("name").eql("MongoServerError");
        })
        .then((user) => {
          should.not.exist(user, "The user should have been invalid");
        });
    });
  });


  // ===================================== API TESTS ============================= //
  describe("API tests", () => {
    let validToken;
    const defaultUser = {
      name: "Jill",
      email: "jill@example.com",
      password: "123"
    };
    
    before(async () => {
      await utils.flushDB();
      const res = await chai.request(app)
        .post("/api/user/")
        .send(defaultUser);
      
      validToken = res.body.token;
    });

    // ================ TEST: ALLOW REGISTRATION OF VALIDATION USER ===================== //
    it("should allow for the registration of a valid user", async () => {
      let validUser = {
        name: "John",
        email: "john@example.com",
        password: "123"
      };

      const res = await chai.request(app)
        .post("/api/user/")
        .send(validUser);
      
      res.should.have.status(201);
      res.body.should.be.a("object");
      res.body.should.have.property("_id");
      res.body.should.have.property("name").eql(validUser.name);
      res.body.should.have.property("email").eql(validUser.email);
      res.body.should.have.property("token");
    });


    // ================ TEST: DO NOT REGISTER DUPLICATE EMAIL ================== //
    it("should not register a user that has a duplicate email", async () => {
      let dupeEmailUser = {
        email: "jill@example.com",
        name: "John",
        password: "123"
      };

      const res = await chai.request(app)
        .post("/api/user/")
        .send(dupeEmailUser);
      
      utils.assertError(res, 400);
    });


    // ================ TEST: LOGIN A USER WITH CORRECT CREDENTIALS ============== //
    it("should login a user with the correct credentials", async () => {
      let validUser = {
        email: "jill@example.com",
        password: "123"
      };

      const res = await chai.request(app)
        .post("/api/user/login/")
        .send(validUser);
      
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("_id");
      res.body.should.have.property("name").eql(defaultUser.name);
      res.body.should.have.property("email").eql(defaultUser.email);
      res.body.should.have.property("token");
    });


    // ============== TEST: DO NOT LOGIN USER WITH INCORRECT DETAILS =========== //
    it("should not login a user with the incorrect details", async () => {
      let invalidUser = {
        email: "jill@example.com",
        password: "1234"
      };

      const res = await chai.request(app)
        .post("/api/user/login/")
        .send(invalidUser);
      
      utils.assertError(res, 401);
    });


    // ============= TEST: DO NOT LOGIN USER WITH MALFORMED REQUEST ========= //
    it("should not login a user with an invalid request object", async () => {
      let invalidUser = {
        password: "1234"
      };

      const res = await chai.request(app)
        .post("/api/user/login/")
        .send(invalidUser);
      
      utils.assertError(res, 401);
    });


    // ============== TEST: PROVIDE USER WITH THEIR OWN PROFILE ============= //
    it("should provide an authorised user with their own profile", async () => {
      const res = await chai.request(app)
        .get("/api/user/profile/")
        .set("Authorization", ("Bearer " + validToken));
      
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("id");
      res.body.should.have.property("name").eql(defaultUser.name);
      res.body.should.have.property("email").eql(defaultUser.email);
    });

    // ============ TEST: USER WITH NO BEARER TOKEN DOES NOT GET A PROFILE ========== //
    it("should not provide a user without a bearer token a profile", async () => {
      const res = await chai.request(app)
      .get("/api/user/profile/");
    
    utils.assertError(res, 401);
    });

  
    // ============== TEST: DO NOT ALLOW USER WITH INVALID TOKEN A PROFILE ======= //
    it("should not allow a user with an invalid bearer token a profile", async () => {
      const res = await chai.request(app)
        .get("/api/user/profile/")
        .set("Authorization", ("Bearer xyz"));
      
      utils.assertError(res, 401);
    });


    // ============== TEST: USER WITH INVALID BEARER TOKEN DOES NOT GET PROFILE ================== //
    it("should not provide a user with an invalid bearer token a profile", async () => {
      const res = await chai.request(app)
        .get("/api/user/profile/")
        .set("Authorization", ("Bearer xyz"));
      
      utils.assertError(res, 401);
    });


    // =========== TEST: ALLOW AUTHORISED USER TO EDIT DETAILS =========== //
    it("should allow an authorised user to edit their own details", async () => {
      let changedDetails = {
        name: "Jack",
        password: "NewPassword"
      };

      const res = await chai.request(app)
        .patch("/api/user/")
        .send(changedDetails)
        .set("Authorization", ("Bearer " + validToken));

      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("name").eql(defaultUser.name);
      
      //Try logging in with new detials
      let validUser = {
        email: defaultUser.email,
        password: changedDetails.password
      };

      const res2 = await chai.request(app)
        .post("/api/user/login/")
        .send(validUser);
      
      res2.should.have.status(200);
      res2.body.should.be.a("object");
      res2.body.should.have.property("_id");
      res2.body.should.have.property("name").eql(changedDetails.name);
      res2.body.should.have.property("email").eql(defaultUser.email);
      res2.body.should.have.property("token");
    });


    // ========== TEST: DO NOT ALLOW ANOTHER USER TO EDIT ANOTHER USER'S EMAILS ================= //
    it("should not allow a user to edit another user's details ", async () => {
      // Details that the unauthorized user will try to change
      let anotherUserDetails = {
          name: "Jane",
          password: "AnotherPassword"
      };

      const res = await chai.request(app)
          .patch("/api/user/")
          .send(anotherUserDetails)
          .set("Authorization", "Bearer " + validToken); 


      res.should.have.status(403)
      res.body.should.be.a("object");
      res.body.should.have.property("error").eql("Unauthorized access: Cannot edit another user's details.");
    });


    // ========== TEST: ALLOW AUTHORISED USERS TO DELETE THEIR OWN ACCOUNT ================= //
    it("should allow an authorised user to delete their own account", async () => {
      // Authorized user attempts to delete their account
      const res = await chai.request(app)
        .delete("/api/user/")
        .set("Authorization", "Bearer " + validToken);


      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("Account deleted successfully.");

      let deletedUser = {
        email: defaultUser.email,
        password: defaultUser.password
      };

      const res2 = await chai.request(app)
        .post("/api/user/login/")
        .send(deletedUser);

      res2.should.have.status(401);
      res2.body.should.be.a("object");
      res2.body.should.have.property("error").eql("Invalid credentials. Please try again.");
    });

    // ========== TEST: DO NOT ALLOW UNAUTHORISED USERS TO DELETE ANOTHER USER'S ACCOUNT ================= //
    it("should not allow an unauthorised user to delete another user's account", async () => {

      const res = await chai.request(app)
      .delete("/api/user/")
      .set("Authorization", "Bearer " + anotherUserToken); 

      res.should.have.status(403); 
      res.body.should.be.a("object");
      res.body.should.have.property("error").eql("Unauthorized access: Cannot delete another user's account.");

      let validUser = {
          email: defaultUser.email,
          password: defaultUser.password
      };

      const res2 = await chai.request(app)
          .post("/api/user/login/")
          .send(validUser);

      res2.should.have.status(200);
      res2.body.should.be.a("object");
      res2.body.should.have.property("_id");
      res2.body.should.have.property("email").eql(defaultUser.email);
      res2.body.should.have.property("token");
    });
  });
});