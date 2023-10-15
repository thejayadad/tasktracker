'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';

const EditTask = ({ taskId }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    desc: '',
    status: 'Open',
  });
  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEditTask = async () => {
    try {
      const response = await axios.put(`/api/task/${ctx.params.id}`, taskData);

      console.log('Task updated:', response.data);

      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  useEffect(() => {
    axios
      .get(`/api/task/${taskId}`)
      .then((response) => {
        setTaskData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
      });
  }, [taskId]);

  return (
    <section>
      <button className="btn" onClick={openModal}>Edit Task</button>

      {isModalOpen && (
        <div className="modal" id="edit_task_modal">
          <div className="modal-box">
            <form className="py-8">
              <div className="mb-4">
                <label className="mr-2">Title:</label>
                <input
                  className="input input-bordered input-primary w-full max-w-xs"
                  type="text"
                  value={taskData.title}
                  onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="mr-2">Description:</label>
                <SimpleMDE
                  value={taskData.desc}
                  onChange={(value) => setTaskData({ ...taskData, desc: value })}
                />
              </div>
              <div className="mb-4">
                <label className="mr-2">Status:</label>
                <select
                  className="select select-bordered select-sm w-full max-w-xs"
                  value={taskData.status}
                  onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Progress">Progress</option>
                </select>
              </div>
              <div className="mb-4">
                <button className="btn btn-wide" type="button" onClick={handleEditTask}>
                  Update Task
                </button>
              </div>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditTask;
