import axios from "axios";
import { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";

const TODOLIST = [
  { id: crypto.randomUUID(), title: "some todo", isCompleted: false },
  { id: crypto.randomUUID(), title: "some todo 2", isCompleted: false },
  { id: crypto.randomUUID(), title: "some todo 3", isCompleted: false },
];

export function TodoList() {
  const [items, setItems] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/todos?hideCompleted=${hideCompleted}`)
      .then((res) => {
        return res.data.data;
      })
      .then((res) => setItems(res));
  }, [hideCompleted]);

  function toggleItem(id, isCompleted) {
    axios
      .put(`http://localhost:3000/api/v1/todos/${id}`, {
        isCompleted,
      })
      .then(() => {
        axios
          .get(
            `http://localhost:3000/api/v1/todos?hideCompleted=${hideCompleted}`
          )
          .then((res) => {
            return res.data.data;
          })
          .then((res) => setItems(res));
      });
  }

  return (
    <>
      <div className="todo-filter">
        <input
          type="checkbox"
          checked={hideCompleted}
          onClick={(e) => setHideCompleted(e.target.checked)}
        />
        <label>Hide completed</label>
      </div>
      <div className="todo-list">
        {items.map((item) => (
          <TodoItem key={item.id} {...item} toggleItem={toggleItem} />
        ))}
      </div>
    </>
  );
}
