"use client";
import { useEffect, useState } from "react";
import { EraserIcon, Trash2, CircleCheckIcon, CircleX } from "lucide-react";

function TodoList() {
  const [toDo, setToDo] = useState("");
  const [allToDos, setAllToDos] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //  Get ToDos From LocalStorage
  useEffect(() => {
    const savedToDos = JSON.parse(localStorage.getItem("todos"));
    if (savedToDos) {
      setAllToDos(savedToDos);
    }
  }, []);

  // Save ToDos In LocalStorage
  const saveToDosToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  //  Add ToDos In Form
  const submit = (e) => {
    e.preventDefault();
    if (toDo.trim()) {
      const newToDo = {
        id: allToDos.length + 1,
        name: toDo,
        status: false,
      };
      const updatedToDos = [...allToDos, newToDo];
      setAllToDos(updatedToDos);
      saveToDosToLocalStorage(updatedToDos);
      setToDo("");
    }
  };

  //   Clear Form Input
  const clearInput = () => {
    setToDo("");
  };

  //   Delete ToDo
  const deleteTodo = (id) => {
    const updatedToDos = allToDos.filter((todo) => todo.id !== id);
    setAllToDos(updatedToDos);
    saveToDosToLocalStorage(updatedToDos);
  };

  //   Change Status
  const statusTodo = (id, currentStatus) => {
    const updatedToDos = allToDos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: !currentStatus };
      }
      return todo;
    });

    setAllToDos(updatedToDos);
    saveToDosToLocalStorage(updatedToDos);
  };

  // Update ToDos When User Select ToDo Status
  useEffect(() => {
    const filtered =
      selectedStatus === "all"
        ? allToDos
        : selectedStatus === "true"
        ? allToDos.filter((todo) => todo.status === true)
        : allToDos.filter((todo) => todo.status === false);

    setFilteredTodos(filtered);
  }, [selectedStatus, allToDos]);

  return (
    <div className="w-full">
      <div className="flex max-lg:flex-col justify-center items-center gap-4">
        <select
          name="status"
          id="status"
          className="w-32 px-4 rounded-xl py-2 max-lg:w-3/5 max-lgmx-auto"
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">همه</option>
          <option value="true">تکمیل شده</option>
          <option value="false">ناتمام</option>
        </select>

        <form onSubmit={submit}>
          <div className="flex justify-center items-center gap-7">
            <input
              type="text"
              value={toDo}
              onChange={(e) => setToDo(e.target.value)}
              className="border border-[#444] outline-none rounded-lg px-4 py-2"
              placeholder="افزودن تسک"
            />
            <button className="bg-cyan-500 px-4 py-2 rounded-md text-white">
              افزودن
            </button>
            <button
              type="button"
              className="bg-red-500 px-4 py-2 rounded-md text-white"
              onClick={clearInput}
            >
              <EraserIcon />
            </button>
          </div>
        </form>
      </div>
      {filteredTodos.length > 0 && (
        <div className="w-4/5 mx-auto grid xl:grid-cols-3 grid-cols-1 lg:grid-cols-2 items-center gap-7 mt-20 backdrop-blur-md rounded-lg p-7 shadow-md">
          {filteredTodos?.map((all) => (
            <div
              key={all.id}
              className="bg-white backdrop-blur-md bg-opacity-50 p-4 rounded-lg flex flex-col gap-7"
            >
              <div className="flex justify-between items-center gap-4">
                <p className={`${all.status ? "line-through" : ""}`}>
                  {all.name}
                </p>

                <div className="flex justify-center items-center gap-2">
                  <button onClick={() => deleteTodo(all.id)}>
                    <Trash2 stroke="red" />
                  </button>
                  {all.status ? (
                    <button onClick={() => statusTodo(all.id, all.status)}>
                      <CircleX stroke="pink" />
                    </button>
                  ) : (
                    <button onClick={() => statusTodo(all.id, all.status)}>
                      <CircleCheckIcon stroke="green" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
