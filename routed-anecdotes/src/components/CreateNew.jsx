import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const { reset: contentReset, ...contentProps } = useField("text");
  const { reset: authorReset, ...authorProps } = useField("text");
  const { reset: infoReset, ...infoProps } = useField("url");

  const navigate = useNavigate();

  const resetForm = (event) => {
    event.preventDefault();
    // content.reset();
    contentReset();
    authorReset();
    infoReset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: contentProps.value,
      author: authorProps.value,
      info: infoProps.value,
      votes: 0,
    });

    navigate("/");
    props.setNotification("New note");
    setTimeout(() => {
      props.setNotification("");
    }, 5000);
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentProps} />
        </div>
        <div>
          author
          <input {...authorProps} />
        </div>
        <div>
          url for more info
          <input {...infoProps} />
        </div>

        <button type="submit">create</button>

        <button onClick={resetForm}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
