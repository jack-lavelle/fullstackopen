const { test, describe, afterEach, beforeEach } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const supertest = require("supertest");
const { app } = require("../app");
const api = supertest(app);
const {
  blog1,
  blog2,
  blog3,
  blog4,
  closeDatabase,
  startDatabase,
} = require("./helpers");

// -- 11/20/24 --
// TODO - clean up database before and after tests
// TODO - running only one test *should* work
//
// -- 11/22/24 --
// TODO - refactor tests to make the output cleaner

describe("integration tests", async () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterEach(async () => {
    await closeDatabase();
  });

  describe("blogs", () => {
    test("ensures a blog can be created and deleted", async () => {
      let id;
      await api
        .post("/api/blogs")
        .send(blog1)
        .expect(201)
        .expect("Content-Type", /application\/json/)
        .expect((response) => {
          assert.notStrictEqual(response.body.id, undefined);
          id = response.body.id;
        });

      await api.delete(`/api/blogs/${id}`).expect(204);
    });

    test("ensures a blog can be created, updated, and deleted", async () => {
      let id;
      await api
        .post("/api/blogs")
        .send(blog1)
        .expect(201)
        .expect("Content-Type", /application\/json/)
        .expect((response) => {
          assert.notStrictEqual(response.body.id, undefined);
          id = response.body.id;
        });

      await api.patch(`/api/blogs/${id}`).send({ likes: 10 }).expect(200);
      await api
        .get(`/api/blogs/${id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .expect((response) => {
          assert.strictEqual(response.body.likes, 10);
        });
    });
  });
});

describe("unit tests", () => {
  describe("totalLikes", () => {
    test("returns 0 with no blogs", () => {
      const result = listHelper.totalLikes([]);
      assert.strictEqual(result, 0);
    });

    test("returns 10 likes with 2 blogs of 5 likes", () => {
      const result = listHelper.totalLikes([blog1, blog2]);
      assert.strictEqual(result, 11);
    });
  });

  describe("favoriteBlog", () => {
    test("returns null when given no blogs", () => {
      const result = listHelper.favoriteBlog("test");
      assert.strictEqual(result, null);
    });

    test("returns the correct result", () => {
      const result = listHelper.favoriteBlog([blog1, blog2]);
      assert.deepStrictEqual(result, blog2);
    });
  });

  describe("mostBlogs", () => {
    test("returns null when given no blogs", () => {
      const result = listHelper.mostBlogs([]);
      assert.strictEqual(result, null);
    });

    test("returns correct result", () => {
      const result = listHelper.mostBlogs([blog1, blog2, blog3]);
      assert.strictEqual(result, "author1");
    });
  });

  describe("mostLikes", () => {
    test("returns null when given no blogs", () => {
      const result = listHelper.mostLikes([]);
      assert.strictEqual(result, null);
    });

    test("returns correct result", () => {
      const [author, likes] = listHelper.mostLikes([
        blog1,
        blog2,
        blog3,
        blog4,
      ]);
      assert.strictEqual(author, "author3");
      assert.strictEqual(likes, 13);
    });
  });
});
