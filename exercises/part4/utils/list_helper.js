const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    console.error(
      `favoriteBlog expects a blog with length greater than 0 but got ${blogs}`,
    );
    return null;
  }

  return blogs.reduce(
    (fav, blog) => (blog.likes > fav.likes ? blog : fav),
    blogs[0],
  );
};

const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    console.error(
      `favoriteBlog expects a blog with length greater than 0 but got ${blogs}`,
    );
    return null;
  }

  const authorBlogsCountMap = blogs.reduce((blogMap, blog) => {
    const blogsCount = blogMap.get(blog.author) || 0;
    blogMap.set(blog.author, blogsCount + 1);
    return blogMap;
  }, new Map());

  let authorMostBlogs = blogs[0].author;
  let value = authorBlogsCountMap[blogs[0].author];

  authorBlogsCountMap.forEach((v, k) => {
    if (v > value) {
      authorMostBlogs = k;
      value = v;
    }
  });

  return authorMostBlogs;
};

const mostLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) {
    console.error(
      `favoriteBlog expects a blog with length greater than 0 but got ${blogs}`,
    );
    return null;
  }

  const authorLikesMap = blogs.reduce((authorLikesMap, blog) => {
    const likesCount = authorLikesMap.get(blog.author) || 0;
    authorLikesMap.set(blog.author, likesCount + blog.likes);
    return authorLikesMap;
  }, new Map());

  let authorMostLikes = blogs[0].author;
  let authorLikes = authorLikesMap.get(blogs[0].author);

  authorLikesMap.forEach((v, k) => {
    if (v >= authorLikes) {
      authorMostLikes = k;
      authorLikes = v;
    }
  });

  return [authorMostLikes, authorLikes];
};

export default {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
