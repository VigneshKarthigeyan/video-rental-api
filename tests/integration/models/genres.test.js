const req = require("supertest");
const { Genre } = require("../../../models/genre");
const { User } = require("../../../models/user");
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
  describe("POST :id/", () => {
    it("should return 401 error if access token not provided", async () => {
      const res = await req(server).post('/api/genres').send({
        name:'genre1'
      })
      expect(res.status).toBe(401);
    });
    it("should return 400 if token is invalid", async () => {
      const res = await req(server).post('/api/genres').send({
        name:'genre1'
      }).set('x-auth-token','98765436')
      expect(res.status).toBe(400);
    });
    it("should return 400 if name in the body is invalid", async () => {
      const token=new User().getAuthToken();
      const res = await req(server).post('/api/genres').send({
        name:new Array(52).join('a')
      }).set('x-auth-token',token)
      expect(res.status).toBe(400);
    });
  });
});
