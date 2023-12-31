import { httpService } from "./http.service";
import { socketService } from "./socket.service";

async function getPosts(userId) {
  const posts = await httpService.get(`/posts/${userId}`);
  return posts;
}
async function deletePost(id) {
  await httpService.delete(`/posts/${id}`);
}
async function editPost(post) {
  await httpService.put(`/posts`, post);
}

async function getPost(id) {
  const post = await httpService.get(`/posts/enter/${id}`);
  return post;
}

async function getUserPosts(userId) {
  const userPosts = await httpService.get(`/posts/posts/${userId}`);
  return userPosts;
}

async function toggleLike(userId, postId) {
  try {
    socketService.emit("notification", postId);
    await httpService.post(`/posts/like/${userId}/${postId}`);
  } catch (error) {
    console.error(error);
  }
}

async function addComment(postId, user, text) {
  try {
    socketService.emit("notification", postId);
    return await httpService.post(`/posts/comment/${postId}`, {
      text: text,
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteComment(postId, commentId) {
  try {
    socketService.emit("notification", postId);
    await httpService.delete(`/posts/comment/${postId}/${commentId}`);
  } catch (error) {
    console.log(error);
  }
}

async function toggleCommentLike(userId, postId, commentId) {
  try {
    socketService.emit("like-comment-notification", { postId, commentId });
    await httpService.post(`/posts/comment/${userId}/${postId}/${commentId}`);
  } catch (error) {
    console.log(error);
  }
}

export const postService = {
  getPosts,
  deletePost,
  editPost,
  getPost,
  getUserPosts,
  toggleLike,
  addComment,
  deleteComment,
  toggleCommentLike,
};
