import * as chai from "chai";
import chaiHttp from "chai-http";

const should = chai.should();
chai.use(chaiHttp);

describe("Sample test suite", () => {
  describe("Test category", () => {
    it("should work", async () => {
      const string = "a";
      should.exist(string);
    });
  });
});