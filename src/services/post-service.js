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

export const postService = { getPosts, deletePost, editPost, getPost };
