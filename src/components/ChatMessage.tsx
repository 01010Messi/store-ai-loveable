import { ChatMessage as ChatMessageType } from "@/types/conversation";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
  onOptionSelect?: (option: string) => void;
}

export function ChatMessage({ message, onOptionSelect }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex flex-col w-full animate-fade-in gap-2 my-2",
        isUser ? "items-end" : "items-start"
      )}
    >
      <div className={cn("flex w-full gap-4", isUser ? "justify-end" : "justify-start")}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 mt-1">
            <Bot className="w-4 h-4 text-primary" />
          </div>
        )}

        <div
          className={cn(
            "relative px-5 py-3.5 text-sm md:text-[15px] leading-relaxed shadow-sm max-w-[85%] md:max-w-[75%]",
            isUser
              ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
              : "bg-card border border-border text-foreground rounded-2xl rounded-tl-sm"
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {isUser && (
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border mt-1">
            <User className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
      </div>

      {!isUser && message.options && message.options.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1 pl-12 max-w-[90%]">
          {message.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onOptionSelect?.(option)}
              className="px-4 py-2 bg-secondary/80 hover:bg-secondary text-secondary-foreground text-sm rounded-xl transition-colors text-left border border-border/50 shadow-sm"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
