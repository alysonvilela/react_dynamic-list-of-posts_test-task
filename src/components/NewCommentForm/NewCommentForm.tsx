import './NewCommentForm.scss';
import React, { FormEvent, useState } from 'react';
import { MakeCommentRequest } from '../../react-app-env';

type Props = {
  onAdd: (req: MakeCommentRequest) => void;
};

const formInitialState = {
  name: '',
  email: '',
  comment: '',
};

type FormState = typeof formInitialState;

export const NewCommentForm: React.FC<Props> = ({ onAdd }) => {
  const [formState, setFormState] = useState<FormState>(formInitialState);
  const [error, setError] = useState(false);

  const { name, email, comment } = formState;

  const handleInput = (key: keyof FormState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name && email && comment) {
      const newComment: MakeCommentRequest = {
        name,
        email,
        body: comment,
      };

      onAdd(newComment);
      setError(false);
      setFormState(formInitialState);
    } else {
      setError(true);
    }
  };

  return (
    <form className="NewCommentForm" onSubmit={onSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          className="NewCommentForm__input"
          onChange={(event) => {
            handleInput('name', event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => {
            handleInput('email', event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={comment}
          onChange={(event) => {
            handleInput('comment', event.target.value);
          }}
        />
      </div>
      {error && <div style={{ color: 'red' }}>Add correct data</div>}

      <button type="submit" className="NewCommentForm__submit-button button">
        Add a comment
      </button>
    </form>
  );
};
