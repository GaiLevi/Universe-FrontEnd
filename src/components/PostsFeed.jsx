import { Post } from "./Post";

export const PostsFeed = ({ posts, deletePost, enterPost, getPosts }) => {
  const reversePosts = [...posts];
  reversePosts.reverse();
  return (
    <section className="posts-feed">
      <div className="posts-container">
        {reversePosts.map((post, index) => {
          return (
            <Post
              key={index}
              post={post}
              deletePost={deletePost}
              enterPost={enterPost}
              getPosts={getPosts}
              isEnter
            />
          );
        })}
      </div>
    </section>
  );
};
