import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authenticationService } from "@/services/authenticationService";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location.state?.email) {
      navigate('/register');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, location.state?.email]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      await authenticationService.verifyOTP(location.state.email, otp);
      toast.success("Email verified successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timeLeft > 0) return;
    
    try {
      await authenticationService.resendOTP(location.state.email);
      setTimeLeft(180);
      toast.success("New OTP has been sent to your email");
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md animate-fadeIn glass-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to {location.state?.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <InputOTP
              value={otp}
              onChange={setOtp}
              maxLength={6}
              render={({ slots }) => (
                <InputOTPGroup className="gap-2 flex justify-center">
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} />
                  ))}
                </InputOTPGroup>
              )}
            />
            
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Time remaining: {formatTime(timeLeft)}
              </p>
              
              <Button
                type="button"
                variant="ghost"
                className="text-primary hover:text-primary/80"
                disabled={timeLeft > 0}
                onClick={handleResendOTP}
              >
                Resend Code
              </Button>

              <Button
                onClick={handleVerify}
                className="w-full"
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify Email"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;