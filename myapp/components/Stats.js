'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaTasks } from 'react-icons/fa';

const Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("/api/stats").then((response) => {
      setStats(response.data);
    });
  }, []);

  if (!stats) {
    return <div>Loading stats...</div>;
  }

  return (
    <section className="px-4">
      <h2 className="text-2xl font-light mt-4 mb-4">Database Statistics</h2>
      <div className="flex justify-between gap-4 justify-between mx-auto px-4">
        <div className="bg-white p-4 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
          <div className="flex items-center mb-2">
          <FaUser className="text-2xl text-blue-500 mr-2" /> 
            <p className="text-lg font-semibold mr-2">Total Users:</p>
            <p>{stats.userCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
          <div className="flex items-center mb-2">
            <FaTasks className="text-2xl text-green-500 mr-2" />
            <p className="text-lg font-semibold mr-2">Total Tasks:</p>
            <p>{stats.totalTaskCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
          <div className="flex items-center mb-2">
            <FaTasks className="text-2xl text-yellow-500 mr-2" />
            <p className="text-lg font-semibold mr-2">Open Tasks:</p>
            <p>{stats.openTaskCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
          <div className="flex items-center mb-2">
            <FaTasks className="text-2xl text-red-500 mr-2" />
            <p className="text-lg font-semibold mr-2">Completed Tasks:</p>
            <p>{stats.completedTaskCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg hover:shadow-lg transition duration-300 ease-in-out">
          <div className="flex items-center mb-2">
            <FaTasks className="text-2xl text-purple-500 mr-2" />
            <p className="text-lg font-semibold mr-2">Tasks in Progress:</p>
            <p>{stats.progressTaskCount}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
