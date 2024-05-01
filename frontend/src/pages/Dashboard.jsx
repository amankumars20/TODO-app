import React, { useState } from 'react';
import { InputBox } from '../components/InputBox';
import { Buttton } from '../components/Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const userId=localStorage.getItem("userid")

  function signOutHandler() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/Signin");
  }

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/todo/display",{
        "userId":localStorage.getItem("userid")
      },{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      });
      // Update the state with the todos from the response
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return (
    <div>
      <div className="bg-gray-100">
        {/* Top Section */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-800">Hi {localStorage.getItem("username")}</p>
            </div>
            <div>
              {localStorage.getItem("username") ? (
                <button onClick={signOutHandler} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Sign Out</button>
              ) : (
                <button onClick={() => navigate("/Signin")} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Sign In</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        {/* Todo Creation Column */}
        <div className="w-1/2">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Create New Todo</h2>
            <div className="mb-4">
              <InputBox onChange={e => setTitle(e.target.value)} placeholder={"Study"} label={"title"} />
              <div className="mb-4">
                <InputBox onChange={e => setDescription(e.target.value)} placeholder={"at 7pm "} label={"description"} />
                <br />
              </div>
              <Buttton onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/todo/add_todo", {
                  userId,
                  title,
                  description
                }, {
                  headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
                });
              }} label={"Add Todo"} />
            </div>
          </div>
          {/* Todo Display Column */}
          <div className="w-1/2">
            <div className="p-6">
              <div className="divide-y divide-gray-200">
                <Buttton onClick={fetchTodos} label={"Show Todo"} />
                {todos.map(todo => (
                  <div key={todo._id} className="py-4">
                    <p className="text-sm text-gray-500 font-normal leading-relaxed">Task:</p>
                    <p className="font-semibold">{todo.title}</p>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed">Description:</p>
                    <p>{todo.description}</p>
                  </div>
                ))}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Todo List</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
