import React from "react";
import { Post } from "./Post";

export const PostsFeed = ({ posts, deletePost, enterPost }) => {
  return (
    <section className="posts-feed">
      <div className="posts-container">
        {posts.map((post, index) => {
          return (
            <Post
              key={index}
              post={post}
              deletePost={deletePost}
              enterPost={enterPost}
              isEnter
            />
          );
        })}
      </div>
    </section>
  );
};
