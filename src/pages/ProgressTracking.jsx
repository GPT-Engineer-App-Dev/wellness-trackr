import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const goalSchema = z.object({
  goal: z.string().min(1, "Goal is required"),
  targetDate: z.string().min(1, "Target date is required"),
});

const ProgressTracking = () => {
  const [goals, setGoals] = useState([]);
  const [progressData, setProgressData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Progress",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(goalSchema),
  });

  const onSubmit = (data) => {
    setGoals([...goals, data]);
    toast("Goal set successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl mb-4">Progress Tracking</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="goal">Goal</Label>
          <Input id="goal" {...register("goal")} />
          {errors.goal && (
            <p className="text-red-500">{errors.goal.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="targetDate">Target Date</Label>
          <Input id="targetDate" type="date" {...register("targetDate")} />
          {errors.targetDate && (
            <p className="text-red-500">{errors.targetDate.message}</p>
          )}
        </div>
        <Button type="submit">Set Goal</Button>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl mb-4">Progress Over Time</h2>
        <Line data={progressData} />
      </div>
    </div>
  );
};

export default ProgressTracking;