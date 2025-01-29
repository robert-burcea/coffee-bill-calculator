import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-12">Spoonful</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Button
            onClick={() => navigate("/cantina")}
            className="h-32 text-2xl font-bold"
          >
            CANTINA
          </Button>
          <Button
            onClick={() => navigate("/viva")}
            className="h-32 text-2xl font-bold"
          >
            VIVA
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;