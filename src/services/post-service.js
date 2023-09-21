import { httpService } from "./http.service";

async function getPosts() {
  const posts = await httpService.get("/posts");
  return posts;
}
async function deletePost(id) {
  await httpService.delete(`/posts/${id}`);
  await getPosts();
}
async function editPost(post) {
  await httpService.put(`/posts`, post);
}

async function getPost(id) {
  const post = await httpService.get(`/posts/${id}`);
  return post;
}

async function getUserPosts(userId) {
  const userPosts = await httpService.get(`/posts/posts/${userId}`);
  return userPosts;
}

async function toggleLike(userId, postId) {
  try {
    await httpService.post(`/posts/like/${userId}/${postId}`);
  } catch (error) {
    console.error(error);
  }
}

export const postService = {
  getPosts,
  deletePost,
  editPost,
  getPost,
  getUserPosts,
  toggleLike,
};
