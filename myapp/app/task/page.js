'use client'
import React from 'react';
import NewTask from '@/components/NewTask';
import Stats from '@/components/Stats';
import TaskList from '@/components/TaskList';
import { useSession } from "next-auth/react"


const Task = () => {
    const { data: session, status } = useSession()

    if(status !== "authenticated"){
        return <p className='text-center'>Not Authorized</p>
    }
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
