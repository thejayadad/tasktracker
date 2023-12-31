'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from "next-auth/react"


const TaskDetail = (ctx) => {
  const [task, setTask] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession()

  if(status !== "authenticated"){
      return <p className='text-center'>Not Authorized</p>
  }


  useEffect(() => {
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
    router.push(`/task/${ctx.params.id}/edit`);
  };

  const handleDeleteTask = () => {
    axios
      .delete(`/api/task/${ctx.params.id}`)
      .then(() => {
        router.push('/task');
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  if (!task) {
    return <div className='text-center'>Loading task details...</div>;
  }

  return (
    <section className='px-4 py-8 max-w-screen-xl mx-auto'>
    <h2>Task Details</h2>
    <table className="w-full border-collapse mt-4">
      <thead>
        <tr>
          <th className="border border-gray-300">Title</th>
          <th className="border border-gray-300">Description</th>
          <th className="border border-gray-300">Status</th>
          <th className="border border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr key={task._id} className="hover:bg-gray-100">
          <td className="border border-gray-300 text-center py-2">{task.title}</td>
          <td className="border border-gray-300 text-center py-2">{task.desc}</td>
          <td className="border border-gray-300 text-center py-2">{task.status}</td>
          <td className="border border-gray-300 text-center py-2">
            <Link
            href={`/task/edit/${ctx.params.id}`}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 ml-2"
            >
              Edit
            </Link>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 ml-2"
              onClick={handleDeleteTask}
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  );
};

export default TaskDetail;
