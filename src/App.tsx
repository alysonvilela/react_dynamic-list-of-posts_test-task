/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllUsers } from './api/api';
import { Post, User } from './react-app-env';
import { getAllPosts, getUserPosts } from './api/posts';
import { UserSelect } from './components/UserSelect';

const App: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [postList, setPostList] = useState<Post[]>([]);

  const [selectedPostId, setSelectedPostId] = useState<number>();
  const [selectedUserId, setSelectedUserId] = useState(0);

  const handleSelectPost = (id?: number) => {
    setSelectedPostId(id);
  };

  const handleSelectUser = (id: number) => {
    setSelectedUserId(id);
  };

  useEffect(() => {
    getAllUsers().then((response) => setAllUsers(response));
  }, []);

  useEffect(() => {
    getAllPosts()
      .then((response) => setPostList((prev) => [...prev, ...response]));
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      const findPosts = async () => {
        const result = await getUserPosts(selectedUserId);

        setPostList(result);
      };

      findPosts();
    }
  }, [selectedUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect
          users={allUsers}
          selectedUserId={selectedUserId}
          onSelectUserId={handleSelectUser}
        />
      </header>
      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={postList}
            selectedPostId={selectedPostId}
            onSelectPost={handleSelectPost}
          />
        </div>

        <div className="App__content">
          <PostDetails postId={selectedPostId} />
        </div>
      </main>
    </div>
  );
};

export default App;
