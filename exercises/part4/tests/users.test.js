const { test, describe, after, before } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const { app } = require("../app");
const { validateUser } = require("../utils/users_helper");
const api = supertest(app);
const { startDatabase, closeDatabase } = require("./helpers");

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
            username: "testUsername",
            name: "testName",
            password: "testPassword",
          })
          .expect(201)
          .expect("Content-Type", /application\/json/)
          .expect((response) => {
            const user = response.body;
            assert.notStrictEqual(user.id, undefined);
            assert.notStrictEqual(user.username, undefined);
            assert.notStrictEqual(user.name, undefined);

            id = response.body.id;
          });

        await api
          .get(`/api/users/${id}`)
          .expect(200)
          .expect("Content-Type", /application\/json/)
          .expect((response) => {
            assert.strictEqual(response.body.id, id);
            assert.strictEqual(response.body.username, "testUsername");
            assert.strictEqual(response.body.name, "testName");
          });
        await api.delete(`/api/users/${id}`).expect(204);
        await api.get(`/api/users/${id}`).expect(404);
      });
    });
  });
});
