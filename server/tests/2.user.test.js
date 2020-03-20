const request = require("supertest");
const app = require("../app");

let tokenUser = null;
let tokenAdmin = null;

describe("Test Users Features", function() {
  beforeAll(done => {
    request(app)
      .post("/admin/login")
      .send({
        username: "admin",
        password: "adminlocker123"
      })
      .end((err, res) => {
        tokenAdmin = res.body.token;
      });
    request(app)
      .post("/guests")
      .send({
        name: "guest",
        phoneNumber: "081382062347"
      })
      .end((err, res) => {
        done();
      });
  });


  describe("Test admin add users, post /users route", () => {
    it("should return user, status code 201", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          name: "pengguna locker",
          email: "pengguna@gmail.com",
          username: "pengguna",
          password: "123456"
        })
        .set({
          token: tokenAdmin
        });
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("id");
      expect(res.body.user).toHaveProperty("name");
      expect(res.body.user.name).toEqual("pengguna locker");
      expect(res.body.user).toHaveProperty("email");
      expect(res.body.user.email).toEqual("pengguna@gmail.com");
      expect(res.body.user).toHaveProperty("username");
      expect(res.body.user.username).toEqual("pengguna");
      expect(res.body.user).toHaveProperty("password");
      expect(res.body.user.password).not.toEqual("123456");
    });
  });

  describe("Test users login, post /users/login route", () => {
    it("should return users, token and status code 200", async () => {
      const res = await request(app)
        .post("/users/login")
        .send({
          username: "pengguna",
          password: "123456"
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("id");
      expect(res.body.user).toHaveProperty("name");
      expect(res.body.user.name).toEqual("pengguna locker");
      expect(res.body.user).toHaveProperty("email");
      expect(res.body.user.email).toEqual("pengguna@gmail.com");
      expect(res.body.user).toHaveProperty("username");
      expect(res.body.user.username).toEqual("pengguna");
      expect(res.body.user).toHaveProperty("password");
      expect(res.body.user.password).not.toEqual("123456");
      expect(res.body).toHaveProperty("token");
      tokenUser = res.body.token
    });

    it("should return status code 404 when password wrong", async () => {
      const res = await request(app)
        .post("/users/login")
        .send({
          username: "pengguna",
          password: "beda password"
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("username/password wrong");
    });

    it("should return status code 404 when username wrong", async () => {
      const res = await request(app)
        .post("/users/login")
        .send({
          username: "pengguna salah",
          password: "123456"
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("username/password wrong");
    });
  });


  describe("Test user update, put /users/:id route", () => {
    it("should return user and status code 200", async () => {
      const res = await request(app)
        .put("/users/1")
        .send({
          name: "pengguna di update",
          email: "penggunaUpdate@gmail.com",
          username: "pengguna update",
          password: "1234567"
        })
        .set({
          token: tokenUser
        });
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("id");
      expect(res.body.user).toHaveProperty("name");
      expect(res.body.user.name).toEqual("pengguna di update");
      expect(res.body.user).toHaveProperty("email");
      expect(res.body.user.email).toEqual("penggunaUpdate@gmail.com");
      expect(res.body.user).toHaveProperty("username");
      expect(res.body.user.username).toEqual("pengguna update");
      expect(res.body.user).toHaveProperty("password");
      expect(res.body.user.password).not.toEqual("1234567");
    });
  });

  describe("Test users get all guests, get /guests route", () => {
    it("should return all guests, status code 200", async () => {
      const res = await request(app)
        .get("/guests")
        .set({
          token: tokenUser
        });
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(res.body);
    });
  });

  describe("Test user update guests status, put /guests/:id route", () => {
    it("should return user and status code 200", async () => {
      const res = await request(app)
        .put("/guests/1")
        .send({
          status: true
        })
        .set({
          token: tokenUser
        });
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("guest");
      expect(res.body.guest).toHaveProperty("id");
      expect(res.body.guest).toHaveProperty("status");
      expect(res.body.guest.status).toEqual(true);
    });
  });


  describe("Test users login, post /users/login route", () => {
    it("should return users, token and status code 200", async () => {
      const res = await request(app)
        .post("/users/login")
        .send({
          username: "pengguna",
          password: "123456"
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body.user).toHaveProperty("id");
      expect(res.body.user).toHaveProperty("name");
      expect(res.body.user.name).toEqual("pengguna locker");
      expect(res.body.user).toHaveProperty("email");
      expect(res.body.user.email).toEqual("pengguna@gmail.com");
      expect(res.body.user).toHaveProperty("username");
      expect(res.body.user.username).toEqual("pengguna");
      expect(res.body.user).toHaveProperty("password");
      expect(res.body.user.password).not.toEqual("123456");
      expect(res.body).toHaveProperty("token");
    });

    it("should return status code 404 when password wrong", async () => {
      const res = await request(app)
        .post("/users/login")
        .send({
          username: "pengguna",
          password: "beda password"
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("username/password wrong");
    });

    it("should return status code 404 when username wrong", async () => {
      const res = await request(app)
        .post("/users/login")
        .send({
          username: "pengguna salah",
          password: "123456"
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("username/password wrong");
    });
  });
});


