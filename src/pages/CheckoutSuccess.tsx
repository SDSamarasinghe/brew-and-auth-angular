
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Check } from "lucide-react";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  
  // Simulate getting order ID from URL params
  const orderId = Math.floor(1000 + Math.random() * 9000);
  
  useEffect(() => {
    // You would typically verify the payment was successful here
    console.log("Payment was successful!");
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="bg-green-100 rounded-full p-4 mb-6">
        <Check className="h-12 w-12 text-green-600" />
      </div>
      <h1 className="text-4xl font-serif font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg text-center max-w-lg mb-2">
        Thank you for your order. Your coffee will be ready shortly.
      </p>
      <p className="text-muted-foreground text-center mb-6">
        Order ID: #{orderId}
      </p>
      <div className="space-x-4">
        <Button variant="outline" onClick={() => navigate("/orders")}>
          View My Orders
        </Button>
        <Button onClick={() => navigate("/")}>
          Order More
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
