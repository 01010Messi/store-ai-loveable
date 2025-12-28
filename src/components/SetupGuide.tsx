import { Store, CheckCircle, Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConversationStage } from "@/types/conversation";

interface SetupGuideProps {
    stage: ConversationStage;
    step: number; // 0, 1, 2, 3
}

export function SetupGuide({ stage, step }: SetupGuideProps) {
    const steps = [
        { title: "Business Concept", description: "Describe your basic idea" },
        { title: "Target Audience", description: "Define who needs this" },
        { title: "Pricing Model", description: "Establish your positioning" },
        { title: "Brand Identity", description: "Set your visual vibe" },
    ];

    // Helper to determine step status
    const getStepStatus = (index: number) => {
        // Logic:
        // If step 0 (Intent), index 0 is Current.
        // If step 1 (Audience), index 0 Done, 1 Current.
        // If Blueprint, all Done.

        if (stage === "BLUEPRINT") return "completed";

        // Mapping internal 'step' from backend (1,2,3) to these UI steps.
        // Backend step 1 = Audience (Index 1).
        // Backend step 2 = Pricing (Index 2).
        // Backend step 3 = Aesthetic (Index 3).
        // Backend step 0 = Intent (Index 0).

        // Adjusting for UI index.
        const currentActiveIndex = step; // 0, 1, 2, 3

        if (index < currentActiveIndex) return "completed";
        if (index === currentActiveIndex) return "active";
        return "pending";
    };

    return (
        <div className="hidden lg:flex flex-col w-80 h-full border-r border-border bg-card/50 backdrop-blur-sm p-8 sticky top-0">
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2 text-primary">
                    <Store className="w-6 h-6" />
                    <span className="font-bold text-lg tracking-tight">AI Store Setup</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    Answer a few quick questions and we’ll generate a complete structure for your online store.
                </p>
            </div>

            <div className="flex-1 space-y-6">
                {steps.map((s, idx) => {
                    const status = getStepStatus(idx);
                    return (
                        <div key={idx} className={cn(
                            "flex gap-4 relative transition-all duration-500",
                            status === "pending" && "opacity-40"
                        )}>
                            {/* Connector Line */}
                            {idx < steps.length - 1 && (
                                <div className={cn(
                                    "absolute left-[11px] top-8 bottom-[-24px] w-[2px]",
                                    status === "completed" ? "bg-primary" : "bg-border"
                                )} />
                            )}

                            <div className="shrink-0 mt-1">
                                {status === "completed" ? (
                                    <CheckCircle className="w-6 h-6 text-primary fill-primary/10" />
                                ) : status === "active" ? (
                                    <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center bg-background">
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                                    </div>
                                ) : (
                                    <Circle className="w-6 h-6 text-muted-foreground" />
                                )}
                            </div>

                            <div>
                                <h3 className={cn(
                                    "font-medium text-sm",
                                    status === "active" ? "text-foreground" : "text-muted-foreground"
                                )}>
                                    {s.title}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {s.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-auto pt-6 border-t border-border">
                <div className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                    <ArrowRight className="w-3 h-3" />
                    Takes less than 2 minutes
                </div>
            </div>
        </div>
    );
}
