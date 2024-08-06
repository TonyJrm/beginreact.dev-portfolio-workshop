import { TextField } from "../atom/TextField";
import { Button } from "../atom/Button";
import { useState } from "react";
import { commentsUrl } from "../../lib/api-url";

export const CommentForm = ({ updateComments }) => {
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const comment = formData.get("comment");

    if (username.length < 4 || username.length > 20) {
      setError("Username must be between 4 and 20 characters");
      return;
    }

    if (comment.length < 10 || comment.length > 100) {
      setError("Comment must be between 10 and 100 characters");
      return;
    }

    fetch(commentsUrl, {
      method: "POST",
      body: JSON.stringify({ username, comment }),
    })
      .then(async (res) => {
        const json = res.json();

        if (res.ok) {
          event.target.reset();
          updateComments();
        } else {
          setError(json.error);
        }
      })
      .catch((e) => {
        setError("Something went wrong : " + String(e));
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full gap-4 md:px-8"
    >
      <TextField
        label="Commentaire"
        type="text"
        placeholder="Username"
        name="username"
      />

      <TextField
        label="Username"
        type="text"
        placeholder="Username"
        component="textarea"
        name="comment"
      />
      {error ? <p style={{ color: "#eb4d4b" }}>{error}</p> : null}
      <Button type="submit">Submit</Button>
    </form>
  );
};
