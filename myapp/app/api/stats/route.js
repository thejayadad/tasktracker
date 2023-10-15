import db from "@/lib/db";
import User from "@/models/User";
import Task from "@/models/Task";

export async function GET(req){
    await db.connect()
    try {
      const userCount = await User.countDocuments();
      const totalTaskCount = await Task.countDocuments();
      const openTaskCount = await Task.countDocuments({ status: "Open" });
      const completedTaskCount = await Task.countDocuments({ status: "Closed" });
      const progressTaskCount = await Task.countDocuments({ status: "Progress" });
      const stats = {
        userCount,
        totalTaskCount,
        openTaskCount,
        completedTaskCount,
        progressTaskCount,
      };
              
        return new Response(JSON.stringify(stats), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

