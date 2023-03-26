import { Button, Form, Input, Card, Col } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editTitle, setEditTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleUpdate = (id, title, content) => {
    setEditTitle(title);
    setEditingId(id);
    setEditContent(content);
  };
  const handleSave = () => {
    const updatedTodo = {
      id: editingId,
      title: editTitle,
      content: editContent,
    };
    const updatedTodos = todos.map((todo) =>
      todo.id === editingId ? updatedTodo : todo
    );
    setTodos(updatedTodos);
    setEditingId(null);
  };
  const handleCancel = (id, title, content) => {
    setEditTitle(title);
    setEditingId(id);
    setEditContent(content);
  };
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setEditingId(null);
  };

  const renderTodos = () => {
    return todos.map((item) => {
      const { id, title, content } = item;
      if (id === editingId) {
        return (
          <Col key={id} span={24}>
            <Card>
              <Form
                onFinish={() => handleSave(id)}
                initialValues={{ title: editTitle, content: editContent }}
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input your title!",
                    },
                    {
                      min: 3,
                      type: "string",
                      message: "Title must be at least 3 characters.",
                    },
                    {
                      pattern: /^[A-Z].*$/g,
                      message: "Title must start with a capital letter.",
                    },
                  ]}
                >
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Content"
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: "Please input your content!",
                    },
                    {
                      max: 20,
                      type: "string",
                      message: "content không quá 20 kí tự",
                    },
                  ]}
                >
                  <Input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button onClick={() => handleCancel()} type="default">
                  Cancel
                </Button>
                <Button onClick={() => handleDelete(id)} type="danger">
                  Delete
                </Button>
              </Form>
            </Card>
          </Col>
        );
      } else {
        return (
          <Col key={id} span={24}>
            <Card>
              <div>
                <strong>Title:</strong>
                {title}
              </div>

              <div>
                <strong>Content:</strong>
                {content}
              </div>
              <Button
                type="primary"
                onClick={() => handleUpdate(id, title, content)}
              >
                Update
              </Button>
              <Button onClick={() => handleDelete(id)} type="danger">
                Delete
              </Button>
            </Card>
          </Col>
        );
      }
    });
  };
  const onFinish = (values) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        title: values.title,
        content: values.content,
      },
    ]);
    return;
  };

  return (
    <Card style={{ maxWidth: 400 }}>
      <Form
        name="todolist"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }}
        onFinish={onFinish}
        autoComplete="off"
        validateFirst
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
            {
              min: 3,
              type: "string",
              message: "Title must be at least 3 characters.",
            },
            {
              pattern: /^[A-Z].*$/g,
              message: "Title must start with a capital letter.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
              message: "Please input your content!",
            },
            {
              max: 20,
              type: "string",
              message: "content không quá 20 kí tự",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div style={{ marginTop: 20, padding: 8 }}>
        <h2>Todolist:</h2>
        <Col>{renderTodos()}</Col>
      </div>
    </Card>
  );
};

export default App;
