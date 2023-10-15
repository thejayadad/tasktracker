'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation'; 

const EditTask = (ctx) => {
    const [taskData, setTaskData] = useState({
        title: '',
        desc: '',
        status: 'Open',
      });
      const router = useRouter();
    
      const handleEditTask = async () => {
        try {
          const response = await axios.put(`/api/task/${ctx.params.id}`, taskData);
    
          console.log('Task updated:', response.data);
    
          closeModal();
          router.reload();
        } catch (error) {
          console.error('Error editing task:', error);
        }
      };
    
      useEffect(() => {
        axios
          .get(`/api/task/${ctx.params.id}`)
          .then((response) => {
            setTaskData(response.data);
            openModal(); 
          })
          .catch((error) => {
            console.error('Error fetching task details:', error);
          });
      }, [ctx.params.id]);

  return (
    <section>
      <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>Edit Task</button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form className='py-8' onSubmit={handleEditTask}>
            <div className='mb-4'>
              <label className='mr-2'>Title:</label>
              <input
                className='input input-bordered input-primary w-full max-w-xs'
                type="text"
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              />
            </div>
            <div className='mb-4'>
              <label className='mr-2'>Description:</label>
              <SimpleMDE
                value={taskData.desc}
                onChange={(value) => setTaskData({ ...taskData, desc: value })}
              />
            </div>
            <div className='mb-4'>
              <label className='mr-2'>Status:</label>
              <select
                className='select select-bordered select-sm w-full max-w-xs'
                value={taskData.status}
                onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Progress">Progress</option>
              </select>
            </div>
            <div className='mb-4'>
              <button className='btn btn-wide' type="submit">Update Task</button>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default EditTask;
