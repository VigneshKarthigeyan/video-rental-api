const req = require("supertest");
const { Genre } = require("../../../models/genre");
let server;
describe("/api/genres", () => {
  beforeEach(async () => {
    server = require("../../../index");
    await Genre.deleteMany({});
  });
  afterEach(async () => {
    await server.close();
  });
  describe("GET", () => {
    it("should return all the genres in db", async () => {
      const res = await req(server).get("/api/genres");
      expect(res.status).toBe(200);
    });
  });
  describe("GET :id/", () => {
    it("should return 404 error for invalid id", async () => {
      const res = await req(server).get("/api/genres/1");
      expect(res.status).toBe(404);
    });
    it("should return the genre of given id", async () => {
      const genre = new Genre({ name: "traditional" });
      genre.save();
      const res = await req(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "traditional");
    });
  });
});
