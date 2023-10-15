'use client'
import React, { useState } from 'react';
import axios from 'axios';
import NewTask from '@/components/NewTask';
import Stats from '@/components/Stats';
import TaskList from '@/components/TaskList';

const Task = () => {


  return (
    <section className='max-w-screen-xl mx-auto py-6'>
    <NewTask />
   <div className='flex items-center'>
    <Stats />
   </div>
   <TaskList />
    </section>
  );
};

export default Task;
