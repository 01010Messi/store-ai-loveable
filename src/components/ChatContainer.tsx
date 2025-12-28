import { useRef, useEffect } from "react";
import { ChatMessage as ChatMessageType, ConversationState, StoreBlueprint } from "@/types/conversation";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { LoadingIndicator } from "./LoadingIndicator";
import { BlueprintDisplay } from "./BlueprintDisplay";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatContainerProps {
  messages: ChatMessageType[];
  conversationState: ConversationState;
  isLoading: boolean;
  blueprint: StoreBlueprint | null;
  onSendMessage: (message: string) => void;
}

export function ChatContainer({
  messages,
  conversationState,
  isLoading,
  blueprint,
  onSendMessage,
}: ChatContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isComplete = conversationState.stage === "BLUEPRINT";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, blueprint]);

  const getPlaceholder = () => {
    switch (conversationState.stage) {
      case "INITIAL_INTENT":
        return "Describe your business idea (products, audience, vibe, pricing...)";
      case "CLARIFICATION":
        return "Answer the questions above...";
      default:
        return "Blueprint generated";
    }
  };

  const handleOptionSelect = (option: string) => {
    if (option.includes("type your own")) return;
    onSendMessage(option);
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full">
      <div className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full px-4" ref={scrollRef}>
          <div className="py-6 space-y-6 pb-24">
            {messages.length > 0 && (
              <div className="flex justify-center pb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest bg-muted/50 px-3 py-1 rounded-full">
                  Store Setup Conversation
                </span>
              </div>
            )}

            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onOptionSelect={handleOptionSelect}
              />
            ))}

            {isLoading && <LoadingIndicator />}

            {blueprint && (
              <div className="mt-8">
                <BlueprintDisplay blueprint={blueprint} />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="p-4 bg-background/80 backdrop-blur-sm z-20">
        <ChatInput
          onSend={onSendMessage}
          disabled={isComplete || isLoading}
          placeholder={getPlaceholder()}
        />
      </div>
    </div>
  );
}
