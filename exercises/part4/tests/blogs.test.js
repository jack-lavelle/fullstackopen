import { test, describe, afterEach, beforeEach } from "node:test";
import {
  notStrictEqual,
  strictEqual,
  deepStrictEqual,
} from "node:assert";
import listHelper from "../utils/list_helper.js";
const { totalLikes, favoriteBlog, mostBlogs, mostLikes } = listHelper;
import supertest from "supertest";
import app from "../app.js";
const api = supertest(app);
import helper from "./helpers.js";
const { blog1, blog2, blog3, blog4, startDatabase, closeDatabase } = helper;

// -- 11/20/24 --
// TODO - clean up database before and after tests
// TODO - running only one test *should* work
//
// -- 11/22/24 --
// TODO - refactor tests to make the output cleaner

let userID, token;
describe("integration tests", () => {
  beforeEach(async () => {
    await startDatabase();
    // create a user
    await api
      .post("/api/users")
      .send({
        username: "testUsername",
        name: "testName",
        password: "testPassword",
      })
      .expect((response) => {
        const user = response.body;
        notStrictEqual(user.id, undefined);
        notStrictEqual(user.username, undefined);
        notStrictEqual(user.name, undefined);

        userID = user.id;
      });

    // create a token
    await api
      .post("/api/login")
      .send({ username: "testUsername", password: "testPassword" })
      .expect(201)
      .expect((response) => {
        token = response.body.token;
      });
  });

  afterEach(async () => {
    if (userID !== undefined) {
      await api.delete(`/api/users/${userID}`).expect(204);
      await api.get(`/api/users/${userID}`).expect(404);

    }
    await closeDatabase();
  });

  describe("blogs", () => {
    test("ensures a blog can be created and deleted", async () => {
      let id;
      await api
        .post("/api/blogs")
        .set("Authorization", "Bearer " + token)
        .send(blog1)
        .expect(201)
        .expect("Content-Type", /application\/json/)
        .expect((response) => {
          notStrictEqual(response.body.id, undefined);
          id = response.body.id;
        });

      await api.delete(`/api/blogs/${id}`)
          .set("Authorization", "Bearer " + token)
          .send()
          .expect(204);
    });

    test("ensures a blog can be created, updated, and deleted", async () => {
      let id;
      await api
        .post("/api/blogs")
        .set("Authorization", "Bearer " + token)
        .send(blog1)
        .expect(201)
        .expect("Content-Type", /application\/json/)
        .expect((response) => {
          notStrictEqual(response.body.id, undefined);
          id = response.body.id;
        });

      await api
          .patch(`/api/blogs/${id}`)
          .set("Authorization", "Bearer " + token)
          .send({ likes: 10 })
          .expect(200);

      await api
        .get(`/api/blogs/${id}`)
          .set("Authorization", "Bearer " + token)
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .expect((response) => {
          strictEqual(response.body.likes, 10);
        });
    });
  });
});

describe("unit tests", () => {
  describe("totalLikes", () => {
    test("returns 0 with no blogs", () => {
      const result = totalLikes([]);
      strictEqual(result, 0);
    });

    test("returns 10 likes with 2 blogs of 5 likes", () => {
      const result = totalLikes([blog1, blog2]);
      strictEqual(result, 11);
    });
  });

  describe("favoriteBlog", () => {
    test("returns null when given no blogs", () => {
      const result = favoriteBlog("test");
      strictEqual(result, null);
    });

    test("returns the correct result", () => {
      const result = favoriteBlog([blog1, blog2]);
      deepStrictEqual(result, blog2);
    });
  });

  describe("mostBlogs", () => {
    test("returns null when given no blogs", () => {
      const result = mostBlogs([]);
      strictEqual(result, null);
    });

    test("returns correct result", () => {
      const result = mostBlogs([blog1, blog2, blog3]);
      strictEqual(result, "author1");
    });
  });

  describe("mostLikes", () => {
    test("returns null when given no blogs", () => {
      const result = mostLikes([]);
      strictEqual(result, null);
    });

    test("returns correct result", () => {
      const [author, likes] = mostLikes([blog1, blog2, blog3, blog4]);
      strictEqual(author, "author3");
      strictEqual(likes, 13);
    });
  });
});
