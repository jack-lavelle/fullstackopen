const { test, describe, afterEach, beforeEach } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const supertest = require("supertest");
const { app, closeDatabase, startDatabase } = require("../app");
const api = supertest(app);

// -- 11/20/24 --
// TODO - clean up database before and after tests
// TODO - running only one test *should* work

const blog1 = {
  title: "title1",
  author: "author1",
  url: "url1.com",
  likes: 5,
};
const blog2 = {
  title: "title1",
  author: "author1",
  url: "url1.com",
  likes: 6,
};
const blog3 = {
  title: "title1",
  author: "author2",
  url: "url1.com",
  likes: 6,
};
const blog4 = {
  title: "title1",
  author: "author3",
  url: "url1.com",
  likes: 13,
};

describe("integration tests", async () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterEach(async () => {
    await closeDatabase();
  });

  test("POST - blogs", async () => {
    let oldLength, newLength;
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect((response) => {
        oldLength = response.body.length;
      });

    await api
      .post("/api/blogs")
      .send(blog1)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect((response) => {
        newLength = response.body.length;
      });

    assert.strictEqual(newLength, oldLength + 1, "blog not added");
  });

  test("POST - blogs with no likes", async () => {
    await api
      .post("/api/blogs")
      .send({ title: "title", author: "author", url: "url" })
      .expect(201)
      .expect((response) => {
        assert.strictEqual(response.body.likes, 0);
      }, "likes not set to 0");
  });

  test("POST - blogs with no title", async () => {
    await api.post("/api/blogs").send({ author: "author" }).expect(400);
  });

  test("POST - blogs with no url", async () => {
    await api
      .post("/api/blogs")
      .send({ title: "title", author: "author" })
      .expect(400);
  });

  test("GET - blogs", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect((response) => {
        assert.ok(response.body.length > 0, "no blogs returned");
        assert.notStrictEqual(
          response.body[0].id,
          undefined,
          "id is undefined",
        );
        assert.notStrictEqual(response.body[0].id, null, "id is null");
      });
  });

  test("POST & DELETE - blogs", async () => {
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

  test("POST & PATCH - blogs", async () => {
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
