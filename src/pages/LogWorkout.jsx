import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const workoutSchema = z.object({
  exerciseType: z.string().min(1, "Exercise type is required"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  intensity: z.enum(["Low", "Medium", "High"], "Intensity is required"),
});

const LogWorkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(workoutSchema),
  });

  const onSubmit = (data) => {
    setWorkouts([...workouts, data]);
    toast("Workout logged successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl mb-4">Log Workout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="exerciseType">Exercise Type</Label>
          <Input id="exerciseType" {...register("exerciseType")} />
          {errors.exerciseType && (
            <p className="text-red-500">{errors.exerciseType.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            {...register("duration", { valueAsNumber: true })}
          />
          {errors.duration && (
            <p className="text-red-500">{errors.duration.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="intensity">Intensity</Label>
          <select id="intensity" {...register("intensity")}>
            <option value="">Select intensity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.intensity && (
            <p className="text-red-500">{errors.intensity.message}</p>
          )}
        </div>
        <Button type="submit">Log Workout</Button>
      </form>
    </div>
  );
};

export default LogWorkout;