import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-3xl">Welcome to Fitness Tracker</h1>
      <p>Track your fitness activities and reach your goals.</p>
      <Button onClick={() => navigate("/dashboard")} className="mt-4">
        Go to Dashboard
      </Button>
    </div>
  );
};

export default Index;