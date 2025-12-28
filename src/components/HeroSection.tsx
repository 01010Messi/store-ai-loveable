import { Sparkles } from "lucide-react";

export function HeroSection() {
    return (
        <div className="w-full max-w-2xl mx-auto text-center space-y-6 pt-12 pb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                <Sparkles className="w-3 h-3" />
                <span>AI-first commerce prototype</span>
            </div>

            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    Set up your online store using AI
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                    Describe your business in plain English. We'll generate your complete store structure in minutes.
                </p>
            </div>
        </div>
    );
}
