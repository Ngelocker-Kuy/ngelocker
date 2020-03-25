const request = require("supertest");
const app = require("../app");

const io = require('socket.io-client');
let socket;
let tokenAdmin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg0OTM5NDY3fQ.cWbwE8rewgigzsujrRSOiWUsmVEw158BT2D6l1TDlKU";
let tokenUser = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicGVuZ2d1bmEgYnVhdCBndWVzIiwiZW1haWwiOiJwZW5nZ3VuYUJ1YXRHdWVzdEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InBlbmdndW5hR3Vlc3QiLCJwYXNzd29yZCI6IjEyMzQ1NiIsImxvY2tlckxhYmVsIjoibG9ja2VyIDMifQ.IxgkOI1V47Lij1AEge3azKA0tJLhvhmmUKQG5Vk4SJQ"

describe("User login and update", function () {
  describe("Test admin add users, post /users route", () => {
    it("should return user, status code 201", async () => {
      const res = await request(app)
        .post("/users")
        .send({
          name: "guest test",
          email: "guest@gmail.com",
          username: "guest",
          password: "123456",
          lockerLabel: "locker 3"
        })
        .set({
          token: tokenAdmin
        });
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty("user")
    });
  });

  describe("Test users login, post /users/login route", () => {
    it("should return users, token and status code 200", async () => {
      const res = await request(app)
        .post("/users/login")
        .send({
          username: "guest",
          password: "123456",
          tokenExpo: "ExponentPushToken[wrBwqQA7vH5n85K94YhSq7]"
        });
      expect(res.statusCode).toEqual(200);
    })
  })
})

describe("Testing socket", function () {
  beforeAll((done) => {
    socket = io(`http://localhost:3000`)
    done()
  });

  describe('basic socket.io example', () => {
    it("should comunicate", async (done) => {
      socket.emit('newGuest', { UserId: 2, guest: "coba guest" })
      socket.on('guestUpdate', (message) => {
        // Check that the message matches
        expect(message)
        done();
      });
      done()
    })
  })
})

describe("Test Guest Features", function () {
  describe("Test register guest, post /guests route", () => {
    it("should return guest and status code 201", async (done) => {
      const res = await request(app)
        .post("/guests")
        .send({
          name: "guest1",
          phoneNumber: "081382062456",
          UserId: 1
        })
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty("guest");
      expect(res.body.guest).toHaveProperty("id");
      expect(res.body.guest).toHaveProperty("name");
      expect(res.body.guest.name).toEqual("guest1");
      expect(res.body.guest).toHaveProperty("phoneNumber");
      expect(res.body.guest.phoneNumber).toEqual("081382062456");
      expect(res.body.guest).toHaveProperty("status");
      expect(res.body.guest.status).toEqual(null);
      done()
    })
  })
})