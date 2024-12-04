const { test, describe, afterEach, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const { app, closeDatabase, startDatabase } = require("../app");
const api = supertest(app);

describe("unit tests", () => {});

describe("integration tests", () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterEach(async () => {
    await closeDatabase();
  });

  describe("users", async () => {
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
