
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="text-4xl font-serif font-bold mb-4">Access Denied</h1>
      <p className="text-lg text-muted-foreground mb-6 text-center max-w-lg">
        Sorry, you don't have permission to access this page. 
        Please contact an administrator if you believe this is an error.
      </p>
      <div className="space-x-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button onClick={() => navigate("/")}>
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
