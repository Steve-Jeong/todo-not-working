import React from 'react'
import { useState } from "react";
import "./App.css";
const Header = ({ onClick }) => {
  return (
    <div>
      <h1>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          WEB
        </a>
      </h1>
    </div>
  );
};

const Nav = ({ topics, onClick }) => {
  const topicsList = topics.map((topic) => {
    return (
      <li key={topic.id}>
      {/*<a
          id={topic.id}   */}
        <a
          data-id={topic.id}
          href={"/topics/" + topic.title}
          onClick={(e) => {
            e.preventDefault();
      {/*   onClick(e.target.id);  */}
            onClick(e.target.dataset.id);
          }}
        >
          {topic.title}
        </a>
      </li>
    );
  });
  return (
    <div>
      <ul>{topicsList}</ul>
    </div>
  );
};

const Content = ({ title, content }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

const Control = ({ mode, onClick }) => {
  let control = null;
  if (mode === "READ") {
    control = (
      <div>
        <a
          href="/create"
          onClick={(e) => {
            e.preventDefault();
            onClick("CREATE");
          }}
        >
          Create
        </a>{" "}
        | {""}
        <a
          href="/update"
          onClick={(e) => {
            e.preventDefault();
            onClick("UPDATE");
          }}
        >
          Update
        </a>{" "}
        | {""}
        <button
          onClick={(e) => {
            e.preventDefault();
            onClick("DELETE");
          }}
        >
          Delete
        </button>
      </div>
    );
  } else {
    control = (
      <div>
        <a
          href="/create"
          onClick={(e) => {
            e.preventDefault();
            onClick("CREATE");
          }}
        >
          Create
        </a>
      </div>
    );
  }
  return <>{control}</>;
};

const Create = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div>
      <h2>Create</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreate(title, content);
        }}
      >
        <p>
          <label>
            Title :{" "}
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
        </p>
        <p>
          <label>
            Content :{" "}
            <input
              type="text"
              name="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </label>
        </p>
        <p>
          <button type="submit">Create</button>
        </p>
      </form>
    </div>
  );
};

const Update = ({ title: _title, content: _content, onUpdate }) => {
  const [title, setTitle] = useState(_title);
  const [content, setContent] = useState(_content);
  return (
    <div>
      <h2>Update</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onUpdate(title, content);
        }}
      >
        <p>
          <label>
            Title :{" "}
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
        </p>
        <p>
          <label>
            Content :{" "}
            <input
              type="text"
              name="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </label>
        </p>
        <p>
          <button type="submit">Update</button>
        </p>
      </form>
    </div>
  );
};

function App() {
  const [topics, setTopics] = useState([
    { id: 1, title: "React", content: "React is ..." },
    { id: 2, title: "TypeScript", content: "TypeScript is ..." },
    { id: 3, title: "NodeJs", content: "NodeJs is ..." },
  ]);
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(1);
  const [nextId, setNextId] = useState(4);
  let topic = null;
  if (mode === "WELCOME") {
    topic = <Content title="Welcome" content="Welcome to web" />;

  } else if (mode === "READ") {
    let selectedTopic = null;
    for (let i = 0; i<topics.length; i++) {
      if (Number(topics[i].id) === Number(id)) {
        selectedTopic = topics[i];
        break;
      }
    }
    if (selectedTopic) {
      topic = (
        <Content title={selectedTopic.title} content={selectedTopic.content} />
      );
    } else {
      topic = <Content />;
    }

  } else if (mode === "CREATE") {
    topic = (
      <Create
        onCreate={(title, content) => {
          let newTopic = { id: nextId, title, content };
          let newTopics = [...topics, newTopic];
          setTopics(newTopics);
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      />
    );

  } else if (mode === "UPDATE") {
    let selectedTopic = null;
    let selectedIndex = -1;
    for (let i = 0; i<topics.length; i++) {
      if (Number(topics[i].id) === Number(id)) {
        selectedTopic = topics[i];
        selectedIndex = i;
        break;
      }
    }
    if (selectedTopic) {
      topic = (
        <Update
          title={selectedTopic.title}
          content={selectedTopic.content}
          onUpdate={(title, content) => {
            let updatedTopic = { id, title, content };
            let updatedTopics = [...topics];
            updatedTopics[selectedIndex] = { ...updatedTopic };
            setTopics(updatedTopics);
            setMode("READ");
          }}
        />
      );
    } else {
      topic = null;
    }

  } else if (mode === "DELETE") {
    let newTopics = [];
    newTopics = topics.filter((topic) => Number(topic.id) !== Number(id));
    setTopics(newTopics);
    setMode("WELCOME");
  }

  return (
    <>
      <Header onClick={() => setMode("WELCOME")} />
      <Nav
        topics={topics}
        onClick={(id) => {
          setMode("READ");
          setId(id);
        }}
      />
      <Control
        mode={mode}
        onClick={(mode) => {
          setMode(mode);
        }}
      />
      {topic}
    </>
  );
}
export default App;