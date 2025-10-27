import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  AlertCircle,
  FileText,
  CreditCard,
  Shield,
  Link,
  Download,
  ArrowLeft,
  Loader2,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PolicyDetailsModal from "@/components/PolicyDetailsModal";

// Types for different flow configurations
interface ApiResponse {
  success: boolean;
  data?: unknown;
  message?: string;
}

interface FlowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  endpoint?: () => Promise<ApiResponse>;
}

interface FlowConfig {
  id: string;
  title: string;
  description: string;
  steps: FlowStep[];
}

// Step status constants
const StepStatus = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  ERROR: "error",
} as const;

type StepStatusType = (typeof StepStatus)[keyof typeof StepStatus];

// API functions for different endpoints
const apiCalls = {
  registerPayment: async (): Promise<ApiResponse> => {
    console.log("Calling API: Register Payment");
    // Simulate API call with delay
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 2000)
    );
    return { success: true, message: "Payment registered successfully" };
  },

  createPolicy: async (): Promise<ApiResponse> => {
    console.log("Calling API: Create Policy");
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 2000)
    );
    return { success: true, message: "Policy created successfully" };
  },

  renewPolicy: async (): Promise<ApiResponse> => {
    console.log("Calling API: Renew Policy");
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 2000)
    );
    return { success: true, message: "Policy renewed successfully" };
  },

  generateDebitNote: async (): Promise<ApiResponse> => {
    console.log("Calling API: Generate Debit Note");
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 2000)
    );
    return { success: true, message: "Debit note generated successfully" };
  },

  linkToAccount: async (): Promise<ApiResponse> => {
    console.log("Calling API: Link to Account");
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 2000)
    );
    return { success: true, message: "Policy linked to account successfully" };
  },

  generateDocuments: async (): Promise<ApiResponse> => {
    console.log("Calling API: Generate Documents");
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 2000)
    );
    return {
      success: true,
      message: "Documents generated successfully",
      data: { documentUrl: "https://example.com/policy-document.pdf" },
    };
  },
};

// Flow configurations
const FLOW_CONFIGS: Record<string, FlowConfig> = {
  "motor-policy-creation": {
    id: "motor-policy-creation",
    title: "Motor Policy Creation",
    description: "Creating your new motor insurance policy",
    steps: [
      {
        id: "register-payment",
        title: "Register Payment",
        description: "Confirming payment validity and legitimacy",
        icon: CreditCard,
        endpoint: apiCalls.registerPayment,
      },
      {
        id: "prepare-policy",
        title: "Prepare Policy",
        description: "Creating your insurance policy",
        icon: Shield,
        endpoint: apiCalls.createPolicy,
      },
      {
        id: "generate-debit-note",
        title: "Generate Debit Note",
        description: "Generating financial documentation",
        icon: FileText,
        endpoint: apiCalls.generateDebitNote,
      },
      {
        id: "link-to-account",
        title: "Link to Account",
        description: "Linking policy to your account",
        icon: Link,
        endpoint: apiCalls.linkToAccount,
      },
      {
        id: "generate-documents",
        title: "Generate Documents",
        description: "Creating policy documents",
        icon: Download,
        endpoint: apiCalls.generateDocuments,
      },
    ],
  },
  "motor-policy-renewal": {
    id: "motor-policy-renewal",
    title: "Motor Policy Renewal",
    description: "Renewing your existing motor insurance policy",
    steps: [
      {
        id: "register-payment",
        title: "Register Payment",
        description: "Confirming payment validity and legitimacy",
        icon: CreditCard,
        endpoint: apiCalls.registerPayment,
      },
      {
        id: "renew-policy",
        title: "Renew Policy",
        description: "Processing policy renewal",
        icon: Shield,
        endpoint: apiCalls.renewPolicy,
      },
      {
        id: "link-to-account",
        title: "Link to Account",
        description: "Linking renewed policy to your account",
        icon: Link,
        endpoint: apiCalls.linkToAccount,
      },
      {
        id: "generate-documents",
        title: "Generate Documents",
        description: "Creating updated policy documents",
        icon: Download,
        endpoint: apiCalls.generateDocuments,
      },
    ],
  },
};

const PolicyPreparation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const flowType = searchParams.get("flow") || "";

  // State management
  const [currentFlow, setCurrentFlow] = useState<FlowConfig | null>(null);
  const [stepStatuses, setStepStatuses] = useState<
    Record<string, StepStatusType>
  >({});
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  
  // State for policy details modal
  const [isPolicyDetailsModalOpen, setIsPolicyDetailsModalOpen] = useState(false);

  // Create refs for each step, the scrollable container, and completion section
  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const completionRef = useRef<HTMLDivElement | null>(null);

  // Scroll to active step when status changes, or to completion when all done
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    
    // Check if all steps are completed (progress === 100)
    if (progress === 100 && completionRef.current) {
      // Scroll to completion section
      const containerRect = container.getBoundingClientRect();
      const completionRect = completionRef.current.getBoundingClientRect();
      const scrollTop = container.scrollTop;
      
      // Calculate the position to scroll to (center the completion section)
      const targetScrollTop = scrollTop + completionRect.top - containerRect.top - (containerRect.height / 2) + (completionRect.height / 2);
      
      container.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    } else {
      // Scroll to active step
      const activeStepId = Object.keys(stepStatuses).find(
        (stepId) => stepStatuses[stepId] === StepStatus.IN_PROGRESS
      );

      if (activeStepId && stepRefs.current[activeStepId]) {
        const stepElement = stepRefs.current[activeStepId];
        
        if (stepElement) {
          const containerRect = container.getBoundingClientRect();
          const stepRect = stepElement.getBoundingClientRect();
          const scrollTop = container.scrollTop;
          
          // Calculate the position to scroll to (center the step in the container)
          const targetScrollTop = scrollTop + stepRect.top - containerRect.top - (containerRect.height / 2) + (stepRect.height / 2);
          
          container.scrollTo({
            top: targetScrollTop,
            behavior: "smooth",
          });
        }
      }
    }
  }, [stepStatuses, progress]);

  // Initialize flow based on URL parameter
  useEffect(() => {
    if (flowType && FLOW_CONFIGS[flowType]) {
      const flow = FLOW_CONFIGS[flowType];
      setCurrentFlow(flow);

      // Initialize all steps as pending
      const initialStatuses: Record<string, StepStatusType> = {};
      flow.steps.forEach((step) => {
        initialStatuses[step.id] = StepStatus.PENDING;
      });
      setStepStatuses(initialStatuses);

      // Start processing automatically
      startProcessing(flow);
    }
  }, [flowType]);

  // Process a single step
  const processStep = async (stepId: string) => {
    setStepStatuses((prev) => ({
      ...prev,
      [stepId]: StepStatus.IN_PROGRESS,
    }));

    try {
      // Find the step in the current flow
      const step = currentFlow?.steps.find((s) => s.id === stepId);

      if (step?.endpoint) {
        // Call the actual API endpoint
        const result = await step.endpoint();

        if (!result.success) {
          throw new Error(result.message || "API call failed");
        }
      } else {
        // Fallback simulation if no endpoint is defined
        await new Promise((resolve) =>
          setTimeout(resolve, 2000 + Math.random() * 3000)
        );
      }

      setStepStatuses((prev) => ({
        ...prev,
        [stepId]: StepStatus.COMPLETED,
      }));

      return true;
    } catch (error) {
      setStepStatuses((prev) => ({
        ...prev,
        [stepId]: StepStatus.ERROR,
      }));

      toast.error(
        error instanceof Error
          ? error.message
          : `Failed to complete ${stepId}. Please try again.`
      );

      return false;
    }
  };

  // Start the policy preparation process
  const startProcessing = async (flow: FlowConfig) => {
    for (let i = 0; i < flow.steps.length; i++) {
      const step = flow.steps[i];

      const success = await processStep(step.id);

      if (!success) {
        return;
      }

      // Update progress
      const newProgress = ((i + 1) / flow.steps.length) * 100;
      setProgress(newProgress);

      // If this is the last step, set document URL
      if (i === flow.steps.length - 1) {
        setDocumentUrl("https://loyalty.genovainsure.com/external/policy?pno=TElDL0hRL01PVC9NQy8yNC80NzY=");
      }
    }
  };

  // Get step status icon
  const getStepStatusIcon = (
    stepId: string,
    stepIcon: React.ComponentType<{ className?: string }>
  ) => {
    const status = stepStatuses[stepId];
    const IconComponent = stepIcon;

    switch (status) {
      case StepStatus.COMPLETED:
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case StepStatus.IN_PROGRESS:
        return <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />;
      case StepStatus.ERROR:
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <IconComponent className="w-6 h-6 text-gray-400" />;
    }
  };

  // Get step status badge
  const getStepStatusBadge = (stepId: string) => {
    const status = stepStatuses[stepId];

    switch (status) {
      case StepStatus.COMPLETED:
        return (
          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
            Completed
          </span>
        );
      case StepStatus.IN_PROGRESS:
        return (
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
            In Progress
          </span>
        );
      case StepStatus.ERROR:
        return (
          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
            Error
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
            Pending
          </span>
        );
    }
  };

  if (!currentFlow) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Invalid Flow
            </h2>
            <p className="text-gray-600 mb-4">
              The requested policy preparation flow was not found.
            </p>
            <Button onClick={() => navigate("/")} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isCompleted = progress === 100;

  return (
    <div className="h-full w-full overflow-hidden grid grid-rows-[auto_1fr_auto]">
      <div className="px-4 py-4 shadow-sm">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div ref={scrollContainerRef} className="py-8 h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6 pb-10">
          <Card className="bg-gradient text-white rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {currentFlow.title}
              </CardTitle>
              <p className="text-blue-100">{currentFlow.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-100">Progress</p>
                  <p className="text-3xl font-bold">{Math.round(progress)}%</p>
                </div>
                <div className="w-32 h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-300 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Steps */}
          <div className="space-y-4 mb-8">
            {currentFlow.steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el: HTMLDivElement | null) => {
                  stepRefs.current[step.id] = el;
                }}
              >
                <Card
                  className={cn(
                    "rounded-3xl transition-all duration-300",
                    stepStatuses[step.id] === StepStatus.IN_PROGRESS &&
                      "ring-2 ring-blue-500 shadow-lg",
                    stepStatuses[step.id] === StepStatus.COMPLETED &&
                      "bg-green-50 border-green-200",
                    stepStatuses[step.id] === StepStatus.ERROR &&
                      "bg-red-50 border-red-200"
                  )}
                >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStepStatusIcon(step.id, step.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {index + 1}. {step.title}
                        </h3>
                        {getStepStatusBadge(step.id)}
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </div>
            ))}
          </div>

          {/* Completion Section */}
          {isCompleted && (
            <div ref={completionRef}>
              <Card className="rounded-3xl bg-linear-to-r from-green-500 to-emerald-600 text-white">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">
                  Policy Preparation Complete!
                </h2>
                <p className="text-green-100 mb-6">
                  Your policy has been successfully prepared and is ready for
                  download.
                </p>

                <div className="space-y-3">
                  {documentUrl && (
                    <Button
                      onClick={() => setIsPolicyDetailsModalOpen(true)}
                      className="w-full bg-white text-green-600 hover:bg-green-50"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Policy Document
                    </Button>
                  )}

                  <div className="flex items-center gap-4 w-full">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/my-policies")}
                      className="flex-1 border-white hover:bg-white text-blue-600"
                    >
                      View My Policies
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/")}
                      className="flex-1 border-white hover:bg-white text-black"
                    >
                      Return to Dashboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          )}
        </div>
      </div>
      <div className="bg-linear-to-b from-white text-center to-transparent border-t border-gray-200 p-4 z-50">
        <p className="bg-red-600 text-white py-2 px-4 rounded-full font-medium text-xl">NOTE: Policy preparation in progress. Please do not close this page.</p>
      </div>

      {/* Policy Details Modal */}
      {documentUrl && (
        <PolicyDetailsModal
          isOpen={isPolicyDetailsModalOpen}
          onClose={() => setIsPolicyDetailsModalOpen(false)}
          policyData={{
            policyNumber: "POL-2024-001234",
            customerName: "John Doe",
            documentUrl: documentUrl
          }}
        />
      )}
    </div>
  );
};

export default PolicyPreparation;
