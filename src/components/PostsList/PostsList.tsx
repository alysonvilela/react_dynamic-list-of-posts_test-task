import React from 'react';
import './PostsList.scss';
import { Post } from '../../react-app-env';

type Props = {
  posts: Post[];
  selectedPostId: number | undefined;
  onSelectPost: (id?: number) => void;
};

export const PostsList: React.FC<Props> = ({
  selectedPostId,
  onSelectPost,
  posts,
}) => {
  return (
    <div className="PostsList">
      <>
        <h2>Posts:</h2>
        <ul className="PostsList__list" data-cy="postDetails">
          {posts.map((post) => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>
                  [User
                  {' '}
                  {post.userId}
                  ]:
                  {' '}
                </b>
                {post.body}
              </div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  if (selectedPostId === post.id) {
                    onSelectPost(undefined);
                  } else {
                    onSelectPost(post.id);
                  }
                }}
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
            </li>
          ))}
        </ul>
      </>
    </div>
  );
};
