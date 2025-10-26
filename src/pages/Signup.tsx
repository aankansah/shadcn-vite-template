import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { User, Phone, Mail, Shield, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import loyaltyLogo from "@/assets/loyalty-logo.svg";
import loyaltyBackgroundTransparent from "@/assets/loyalty-background-transparent.svg";
import authBackground from "@/assets/auth-bg2.jpg";
import AuthLayout from "@/components/AuthLayout";

// Validation schemas
const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type SignupFormData = z.infer<typeof signupSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

type SignupStep = "signup" | "otp";

export default function Signup() {
  const [currentStep, setCurrentStep] = useState<SignupStep>("signup");
  const [signupData, setSignupData] = useState<SignupFormData | null>(null);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  // Signup form
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
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
    mutationFn: async (data: SignupFormData) => {
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
    mutationFn: async (data: { otp: string; signupData: SignupFormData }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Verifying OTP:", data.otp, "for user:", data.signupData);
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

  const handleSignupSubmit = (data: SignupFormData) => {
    setSignupData(data);
    sendOtpMutation.mutate(data);
  };

  const handleOtpSubmit = (data: OtpFormData) => {
    if (signupData) {
      verifyOtpMutation.mutate({ otp: data.otp, signupData });
    }
  };

  const handleResendOtp = () => {
    if (signupData && resendTimer === 0) {
      sendOtpMutation.mutate(signupData);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AuthLayout backgroundImage={authBackground}>
      {/* Main Signup Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        <Card className={cn(
          'relative w-[500px] max-w-md overflow-hidden rounded-3xl',
          'bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20'
        )}>
          {/* Animated Background Pattern inside card */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-linear-to-br from-purple-600 via-blue-600 to-purple-800" />
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${loyaltyBackgroundTransparent})`,
                backgroundSize: "400px 400px",
                backgroundRepeat: "repeat",
              }}
            />
          </div>

          <CardContent className="relative z-10 p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center mb-6">
                <motion.img
                  src={loyaltyLogo}
                  alt="Loyalty Logo"
                  className="h-12 w-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                {currentStep === "otp" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep("signup")}
                    className="p-1 h-auto"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <Shield className="h-6 w-6 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentStep === "signup" ? "Create Account" : "Verify Phone"}
                </h1>
              </div>
              
              <p className="text-gray-600 text-sm">
                {currentStep === "signup" 
                  ? "Join our loyalty insurance platform" 
                  : `Enter the 6-digit code sent to ${signupData?.phoneNumber}`
                }
              </p>
            </motion.div>

            {/* Signup Form */}
            {currentStep === "signup" && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onSubmit={signupForm.handleSubmit(handleSignupSubmit)}
                className="space-y-6"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        {...signupForm.register("firstName")}
                        placeholder="First Name"
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    {signupForm.formState.errors.firstName && (
                      <p className="text-red-500 text-xs">{signupForm.formState.errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        {...signupForm.register("lastName")}
                        placeholder="Last Name"
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    {signupForm.formState.errors.lastName && (
                      <p className="text-red-500 text-xs">{signupForm.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      {...signupForm.register("phoneNumber")}
                      placeholder="+1234567890"
                      type="tel"
                      className="pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  {signupForm.formState.errors.phoneNumber && (
                    <p className="text-red-500 text-xs">{signupForm.formState.errors.phoneNumber.message}</p>
                  )}
                </div>

                {/* Email (Optional) */}
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      {...signupForm.register("email")}
                      placeholder="Email (optional)"
                      type="email"
                      className="pl-10 h-12 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                  {signupForm.formState.errors.email && (
                    <p className="text-red-500 text-xs">{signupForm.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={sendOtpMutation.isPending}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {sendOtpMutation.isPending ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    "Send Verification Code"
                  )}
                </Button>
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
                    "Verify & Create Account"
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
                      onClick={handleResendOtp}
                      disabled={sendOtpMutation.isPending}
                      className="text-purple-600 hover:text-purple-700 text-sm"
                    >
                      Resend verification code
                    </Button>
                  )}
                </div>
              </motion.form>
            )}

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Separator className="my-6" />
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    onClick={() => navigate("/login")}
                    className="text-purple-600 hover:text-purple-700 p-0 h-auto font-semibold"
                  >
                    Sign in
                  </Button>
                </p>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </AuthLayout>
  );
}