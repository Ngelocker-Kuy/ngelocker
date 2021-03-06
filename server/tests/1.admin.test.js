const request = require("supertest");
const app = require("../app");

let tokenAdmin;

describe("Test Admin Features", function () {
  beforeAll(done => {
    request(app)
      .post("/admin/login")
      .send({
        username: "admin",
        password: "adminlocker123"
      })
      .end((err, res) => {
        tokenAdmin = res.body.token;
        done();
      });
  });

  describe("Test admin add users, post /users route", () => {
    it("should return user, status code 201", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          name: "pengguna",
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
      expect(res.body.user.name).toEqual("pengguna");
      expect(res.body.user).toHaveProperty("email");
      expect(res.body.user.email).toEqual("pengguna@gmail.com");
      expect(res.body.user).toHaveProperty("username");
      expect(res.body.user.username).toEqual("pengguna");
      expect(res.body.user).toHaveProperty("password");
      expect(res.body.user.password).not.toEqual("123456");
    });
  });

  describe("Test validation email users, admin add users", () => {
    it("should return status code 400 when property email is empty", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          name: "pengguna locker",
          email: "",
          username: "pengguna",
          password: "123456"
        })
        .set({
          token: tokenAdmin
        });
      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Please Fill Email");
    });

    it("should return status code 400 when property email is null", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          name: "pengguna locker",
          email: null,
          username: "pengguna",
          password: "123456"
        })
        .set({
          token: tokenAdmin
        });
      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Please Enter Your Email");
    });

    it("should return status code 400 when property email not use @ and .", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          name: "pengguna locker",
          email: "penggunagmail.com",
          username: "pengguna",
          password: "123456"
        })
        .set({
          token: tokenAdmin
        });
      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Incorrect Format Email");
    });

    it("should return status code 400 when property email duplicate", async () => {
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
      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("email already exist");
    });
  });

  describe("Test validation password users, admin add users", () => {
    it("should return status code 400 when property password is null", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          name: "pengguna locker",
          email: "pengguna1@gmail.com",
          username: "pengguna",
          password: null
        })
        .set({
          token: tokenAdmin
        });
      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Please Enter Your Password");
    });

    it("should return status code 400 when property password is empty", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          name: "pengguna locker",
          email: "pengguna1@gmail.com",
          username: "pengguna",
          password: ""
        })
        .set({
          token: tokenAdmin
        });
      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Please Fill Password");
    });

    it("should return status code 400 when property password length less than 6", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          name: "pengguna locker",
          email: "pengguna1@gmail.com",
          username: "pengguna",
          password: "12345"
        })
        .set({
          token: tokenAdmin
        });
      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Minimum Password is 6 Character");
    });
  });

  describe("Test admin get all users, get /users route", () => {
    it("should return all users, status code 200", async () => {
      const res = await request(app)
        .get("/users")
        .set({
          token: tokenAdmin
        });
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(res.body);
    });
  });

  describe("Test admin get all lockers, get /lockers route", () => {
    it("should return all lockers, status code 200", async () => {
      const res = await request(app)
        .get("/lockers")
        .set({
          token: tokenAdmin
        });
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(res.body);
    });
  });

  describe("Test /users/:id route", () => {
    it("should send an error with 401 status code because token undefined", async () => {
      const res = await request(app).delete("/users/1");
      expect(res.status).toEqual(401);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Unauthorized Invalid Token");
    });
  });

  describe("Test /lockers/:id route", () => {
    it("should send an error with 401 status code because token undefined", async () => {
      const res = await request(app).delete("/lockers/1");
      expect(res.status).toEqual(401);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("Unauthorized Invalid Token");
    });
  });
});

describe("Test Admin Login Router", function () {
  describe("Test admin login, post /admin/login route", () => {
    it("should return admin, token and status code 200", async () => {
      const res = await request(app)
        .post("/admin/login")
        .send({
          username: "admin",
          password: "adminlocker123"
        });
      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("admin");
      expect(res.body.admin).toHaveProperty("id");
      expect(res.body.admin).toHaveProperty("name");
      expect(res.body.admin.name).toEqual("admin");
      expect(res.body.admin).toHaveProperty("username");
      expect(res.body.admin.username).toEqual("admin");
      expect(res.body.admin).toHaveProperty("password");
      expect(res.body.admin.password).toEqual("adminlocker123");
      expect(res.body).toHaveProperty("token");
    });

    it("should return status code 404 when password wrong", async () => {
      const res = await request(app)
        .post("/admin/login")
        .send({
          username: "admin",
          password: "beda password"
        });
      expect(res.status).toEqual(404);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("username/password wrong");
    });

    it("should return status code 404 when username wrong", async (done) => {
      const res = await request(app)
        .post("/admin/login")
        .send({
          username: "admin salah",
          password: "adminlocker123"
        });
      expect(res.status).toEqual(404);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("username/password wrong");
      done()
    });
  });
});
