import { ChatMessage as ChatMessageType } from "@/types/conversation";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
  onOptionSelect?: (option: string) => void;
  isLast?: boolean; // Helpful for animation or focus
}

export function ChatMessage({ message, onOptionSelect }: ChatMessageProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex w-full justify-end animate-fade-in my-6">
        <div className="bg-primary/5 border border-primary/20 px-6 py-3 rounded-lg text-foreground text-sm max-w-[80%] shadow-sm">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  // Assistant Message (System/Guide)
  return (
    <div className="flex flex-col w-full animate-fade-in my-6 max-w-2xl">
      <div className="bg-card border border-border px-6 py-6 rounded-xl shadow-sm space-y-4">
        {/* We can infer if it's a step based on content or options, 
            but strictly speaking, the backend just sends text. 
            For this UI, we treat all assistant texts as 'Guide' texts. */}
        <p className="text-base font-medium leading-relaxed text-foreground">
          {message.content}
        </p>

        {message.options && message.options.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {message.options.map((option, idx) => {
              const isOther = option.toLowerCase().includes("other");
              return (
                <button
                  key={idx}
                  onClick={() => onOptionSelect?.(option)}
                  className={cn(
                    "px-4 py-3 text-left text-sm rounded-lg transition-all border",
                    "hover:border-primary hover:bg-primary/5 hover:shadow-md",
                    "bg-background border-border text-foreground",
                    isOther && "sm:col-span-2 border-dashed text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="font-medium">{option}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
