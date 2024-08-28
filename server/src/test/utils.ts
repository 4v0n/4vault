/**
 * @author NickAndreiTrivino
 */


// ================ MODEL IMPORTS =================== //
import User from ("../models/User.ts");
import Item from ("../models/Item.ts");
import * as chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";


// =============== FLUSH DB =============== //
const flushDB = async () => {

    // ---- models to flush ----- //
    await User.deleteMany({});
    await Item.deleteMany({});

  // ---- add extra flushes heres ----- //
};


// ============ ASSERT ERROR ============== //
const assertError = (res, code) => {
  res.should.have.status(code);
  res.body.should.be.a("object");
  res.body.should.have.property("error");
  res.body.should.have.property("message");
  res.body.should.have.property("status");
  res.body.should.have.property("stacktrace");
};


// ========== GENERATE TOKEN ============== //
const generateToken = (user) => {
  return jwt.sign({ id:user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_VALID_FOR
  });
};

module.exports = {
  flushDB,
  assertError,
  generateToken
};