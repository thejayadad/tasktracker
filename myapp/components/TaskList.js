'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // Initial filter value

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/task");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = filter === "all" ? tasks : tasks.filter(task => task.status === filter);

  return (
    <div className="px-4 py-8">
      <h2>Task List</h2>
      <div className="mb-4">
        <label htmlFor="filter">Filter by Status:</label>
        <select
          id="filter"
          name="filter"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="Progress">Progress</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300">Title</th>
            <th className="border border-gray-300">Status</th>
            <th className="border border-gray-300">Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 text-center py-2">{task.title}</td>
              <td className="border border-gray-300 text-center">{task.status}</td>
              <td className="border border-gray-300 text-center py-2">
                <Link
               href={`/task/${task._id}`}
                className="bg-gray-200 px-3 py-2"
                  onClick={() => {
                  }}
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
