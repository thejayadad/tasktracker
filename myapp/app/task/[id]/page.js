'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const TaskDetail = (ctx) => {
  const [task, setTask] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the task details based on ctx.params.id
    axios
      .get(`/api/task/${ctx.params.id}`)
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
      });
  }, [ctx.params.id]);

  const handleEditTask = () => {
    router.push(`/tasks/edit/${ctx.params.id}`);
  };

  const handleDeleteTask = () => {
    axios
      .delete(`/api/task/${ctx.params.id}`)
      .then(() => {
        // Redirect to the task list or another appropriate page
        router.push('/tasks');
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  if (!task) {
    return <div>Loading task details...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{task.title}</h1>
      <p className="text-lg mb-4">{task.desc}</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 transition duration-300"
        onClick={handleEditTask}
      >
        Edit
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 ml-4 transition duration-300"
        onClick={handleDeleteTask}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskDetail;
