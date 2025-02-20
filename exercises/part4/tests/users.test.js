import { test, describe, after, before } from "node:test";
import assert, { notStrictEqual, strictEqual } from "node:assert";
import supertest from "supertest";
import app from "../app.js";
import userHelper from "../utils/users_helper.js";
const validateUser = userHelper.validateUser;
const api = supertest(app);
import appHelper from "./helpers.js";
const { startDatabase, closeDatabase } = appHelper;

describe("unit tests", () => {
  test("username and password are required", () => {
    assert(validateUser("", "password") !== null);
    assert(validateUser(null, "password") !== null);
    assert(validateUser("username", "") !== null);
    assert(validateUser("username", null) !== null);

    assert(validateUser("username", "password") === null);
  });
});

describe("integration tests", () => {
  before(async () => {
    await startDatabase();
  });

  after(async () => {
    await closeDatabase();
  });

  describe("users", async () => {
    describe("POST - invalid user", async () => {
      test("ensures invalid users are not created", async () => {
        await api
          .post("/api/users")
          .send({
            username: "",
            name: "testName",
            password: "testPassword",
          })
          .expect(400);
        await api
          .post("/api/users")
          .send({
            username: "testUsername",
            name: "testName",
            password: "",
          })
          .expect(400);
      });

      test("POST, GET, & DELETE", async () => {
        let id;
        await api
          .post("/api/users")
          .send({
            username: "testUsername1",
            name: "testName",
            password: "testPassword",
          })
          .expect(201)
          .expect("Content-Type", /application\/json/)
          .expect((response) => {
            const user = response.body;
            notStrictEqual(user.id, undefined);
            notStrictEqual(user.username, undefined);
            notStrictEqual(user.name, undefined);

            id = response.body.id;
          });

        await api
          .get(`/api/users/${id}`)
          .expect(200)
          .expect("Content-Type", /application\/json/)
          .expect((response) => {
            strictEqual(response.body.id, id);
            strictEqual(response.body.username, "testUsername");
            strictEqual(response.body.name, "testName");
          });
        await api.delete(`/api/users/${id}`).expect(204);
        await api.get(`/api/users/${id}`).expect(404);
      });
    });
  });
});
