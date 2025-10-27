import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Phone, Shield, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import loyaltyLogo from "@/assets/loyalty-logo.svg";
import loyaltyBackgroundTransparent from "@/assets/loyalty-background-transparent.svg";
import authBackground from "@/assets/auth-bg.jpg";
import AuthLayout from "@/components/AuthLayout";

// Validation schemas
const loginSchema = z.object({
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

type LoginStep = "phone" | "otp";

export default function Login() {
  const [currentStep, setCurrentStep] = useState<LoginStep>("phone");
  const [loginData, setLoginData] = useState<LoginFormData | null>(null);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();
  
  // Phone form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  // OTP form
  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // API mutations
  const sendOtpMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Sending OTP to:", data.phoneNumber);
      return { success: true };
    },
    onSuccess: () => {
      setCurrentStep("otp");
      startResendTimer();
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (data: { otp: string; loginData: LoginFormData }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Verifying OTP:", data.otp, "for user:", data.loginData);
      return { success: true, token: "fake-jwt-token" };
    },
    onSuccess: () => {
      // Auto-login and redirect
      navigate("/");
    },
  });

  const startResendTimer = () => {
    setResendTimer(300); // 5 minutes in seconds
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const onSubmit = (data: LoginFormData) => {
    console.log("Login form submitted:", data);
    setLoginData(data);
    sendOtpMutation.mutate(data);
  };

  const handleOtpSubmit = (data: OtpFormData) => {
    if (loginData) {
      verifyOtpMutation.mutate({ otp: data.otp, loginData });
    }
  };

  const handleBackToPhone = () => {
    setCurrentStep("phone");
    otpForm.reset();
  };

  return (
    <AuthLayout backgroundImage={authBackground}>
      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Card
          className={cn(
            "relative w-[500px] max-w-md overflow-hidden rounded-3xl",
            "bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20"
          )}
        >
          {/* Animated Background Pattern inside card */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-linear-to-br from-purple-600 via-blue-600 to-purple-800" />
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Background Icon */}
          <div className="absolute top-8 right-8 opacity-5">
            <img
              src={loyaltyBackgroundTransparent}
              alt=""
              className="w-32 h-32"
            />
          </div>

          <CardContent className="relative z-20 px-8 py-14">
            <div className="flex flex-col items-center space-y-8">
              {/* Logo Section with Enhanced Design */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex flex-col items-center space-y-4"
              >
                <div className="relative mb-10 rounded-full bg-gray-200 p-2 px-5">
                  <img
                    src={loyaltyLogo}
                    alt="Loyalty Logo"
                    className="h-14 w-auto"
                  />
                </div>

                <div className="text-center space-y-2">
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-extra-bold text-slate-900"
                  >
                    Welcome Back
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm text-slate-600">
                      Sign in to your account
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Form Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full space-y-6"
              >
                {/* Phone Number Form */}
                {currentStep === "phone" && (
                  <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onSubmit={loginForm.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                        <Input
                          {...loginForm.register("phoneNumber")}
                          type="tel"
                          placeholder="Your phone number"
                          className={cn(
                            "w-full rounded-xl pl-10 h-12",
                            "border-white/50 bg-white/50 backdrop-blur-sm",
                            "focus:border-purple-400 focus:ring-purple-400/20",
                            "transition-all duration-200",
                            "hover:bg-white/70"
                          )}
                        />
                      </div>
                      {loginForm.formState.errors.phoneNumber && (
                        <p className="text-red-500 text-xs">{loginForm.formState.errors.phoneNumber.message}</p>
                      )}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={sendOtpMutation.isPending}
                        className={cn(
                          "w-full rounded-xl h-12",
                          "bg-gradient-to-r from-purple-500 to-blue-600",
                          "hover:from-purple-600 hover:to-blue-700",
                          "shadow-lg hover:shadow-xl",
                          "transform transition-all duration-200",
                          "text-white font-semibold"
                        )} 
                        size="lg"
                      >
                        {sendOtpMutation.isPending ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <Shield className="w-4 h-4 mr-2" />
                            Send OTP
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}

                {/* OTP Verification Form */}
                {currentStep === "otp" && (
                  <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
                    className="space-y-6"
                  >
                    {/* Back Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleBackToPhone}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-800 p-0"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to phone number
                    </Button>

                    {/* OTP Input */}
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-gray-600 text-sm mb-4">
                          Enter the 6-digit verification code sent to your phone
                        </p>
                        <div className="flex justify-center">
                          <InputOTP
                            maxLength={6}
                            value={otpForm.watch("otp") || ""}
                            onChange={(value) => otpForm.setValue("otp", value)}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                              <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                              <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                              <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                              <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                              <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </div>
                      {otpForm.formState.errors.otp && (
                        <p className="text-red-500 text-xs text-center">{otpForm.formState.errors.otp.message}</p>
                      )}
                    </div>

                    {/* Verify Button */}
                    <Button
                      type="submit"
                      disabled={verifyOtpMutation.isPending}
                      className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {verifyOtpMutation.isPending ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        "Verify & Sign In"
                      )}
                    </Button>

                    {/* Resend Code */}
                    <div className="text-center">
                      {resendTimer > 0 ? (
                        <p className="text-gray-500 text-sm">
                          Resend code in {formatTime(resendTimer)}
                        </p>
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => loginData && sendOtpMutation.mutate(loginData)}
                          disabled={sendOtpMutation.isPending}
                          className="text-purple-600 hover:text-purple-700 text-sm"
                        >
                          Resend verification code
                        </Button>
                      )}
                    </div>
                  </motion.form>
                )}
              </motion.div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 w-full"
              >
                <Separator className="my-6" />
                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    New to Loyalty E-Insurance?{" "}
                    <Button
                      variant="link"
                      onClick={() => navigate("/signup")}
                      className="text-purple-600 hover:text-purple-700 p-0 h-auto font-semibold"
                    >
                      Create New Account
                    </Button>
                  </p>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AuthLayout>
  );
}
