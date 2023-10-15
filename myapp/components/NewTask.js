'use client'

    import React, { useState } from 'react';


const NewTask = () => {
    const [taskData, setTaskData] = useState({
        title: '',
        desc: '',
        status: 'Open',
      });
    
      const handleCreateTask = async () => {
        try {
          const response = await axios.post('/api/task', taskData);
    
          console.log('Task created:', response.data);
    
          setTaskData({
            title: '',
            desc: '',
            status: 'Open',
          });
        } catch (error) {
          console.error('Error creating task:', error);
        }
      };
  return (
    <section>
        <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>New Task</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form className='py-8'>
        <div className='mb-4'>
          <label
          className='mr-2'
          >Title:</label>
          <input
          className='input input-bordered input-primary w-full max-w-xs'
            type="text"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          />
        </div>
        <div className='mb-4'>
          <label
          className='mr-2'
          >Description:</label>
          <input
          className='textarea textarea-bordered textarea-lg w-full max-w-xs'
            type="text"
            value={taskData.desc}
            onChange={(e) => setTaskData({ ...taskData, desc: e.target.value })}
          />
        </div>
        <div className='mb-4'>
          <label
          className='mr-2'
          >Status:</label>
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
          <button
          className='btn btn-wide'
          type="button" onClick={handleCreateTask}>
            Create Task
          </button>
        </div>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
  </div>
</dialog>
    </section>
  )
}

export default NewTask