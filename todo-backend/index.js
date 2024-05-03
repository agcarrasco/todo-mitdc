const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

const router = express.Router();

let todoList = [
  { id: crypto.randomUUID(), title: "some todo", isCompleted: false },
  { id: crypto.randomUUID(), title: "some todo 2", isCompleted: false },
  { id: crypto.randomUUID(), title: "some todo 3", isCompleted: false },
];

router.get("/todos", (req, res, next) => {
  const { hideCompleted } = req.query;

  const isCompleted = hideCompleted === "true";
  if (!isCompleted) {
    return res.send({
      status: 200,
      data: todoList,
    });
  }

  return res.send({
    status: 200,
    data: todoList.filter((item) => item.isCompleted !== isCompleted),
  });
});

router.post("/todos", (req, res, next) => {
  const { title } = req.body;

  const newItem = { id: crypto.randomUUID(), title, isCompleted: false };
  todoList.push(newItem);

  res.send({
    status: 200,
    data: {
      newItem,
    },
  });
});

router.put("/todos/:id", (req, res, next) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  todoList = todoList.map((item) => {
    if (item.id === id) {
      return { ...item, isCompleted };
    }
    return item;
  });

  res.send({
    status: 200,
    message: "Successfully updated item",
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", router);

app.use("/", (req, res, next) => {
  res.send("hello ");
});

app.listen(PORT, () => {
  console.log("app is running on port ", PORT);
});
