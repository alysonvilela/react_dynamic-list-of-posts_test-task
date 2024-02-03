import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post, Comment, MakeCommentRequest } from '../../react-app-env';
import { getComments, delComment, postComment } from '../../api/comments';
import { getPostById } from '../../api/posts';

type Props = {
  postId: number | undefined;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [isCommentsVisible, setIsVisibleComments] = useState(false);
  const [postDetails, setPostDetails] = useState<Post>();

  const isPostValid = typeof postId === 'number';

  const handleSuccessUpdate = async (success: boolean) => {
    if (success && postId) {
      const res = await getComments(postId);

      setCommentsList(res);
    }
  };

  const handleDeleteComment = async (id: number) => {
    if (commentsList && postId) {
      const success = await delComment(id);

      await handleSuccessUpdate(success);
    }
  };

  const handleAddComment = async ({
    name, email, body,
  }: MakeCommentRequest) => {
    if (postId) {
      const success = await postComment(name, email, body, postId);

      await handleSuccessUpdate(success);
    }
  };

  useEffect(() => {
    if (isPostValid) {
      (async () => {
        const [postDetailRes, postCommentsRes] = await Promise.all([
          getPostById(postId),
          getComments(postId),
        ]);

        if (postDetailRes) {
          setPostDetails(postDetailRes);
        }

        setCommentsList(postCommentsRes);
      })();
    }
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {isPostValid && postDetails?.id && (
        <>
          <section className="PostDetails__post">
            <p>{postDetails?.title}</p>
          </section>
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => {
                setIsVisibleComments((prev) => !prev);
              }}
            >
              {commentsList
                && (isCommentsVisible
                  ? `Show ${commentsList.length} comments`
                  : `Hide ${commentsList.length} comments`)}
            </button>
            <ul
              className={
                isCommentsVisible
                  ? 'PostDetails__visiblelist'
                  : 'PostDetails__list'
              }
            >
              {commentsList?.map((comment) => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      handleDeleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm onAdd={handleAddComment} />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
