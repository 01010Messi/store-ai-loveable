import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatContainer } from "@/components/ChatContainer";
import { HeroSection } from "@/components/HeroSection";
import { SetupGuide } from "@/components/SetupGuide";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const { messages, conversationState, isLoading, blueprint, sendMessage } = useChat();

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <SetupGuide
        stage={conversationState.stage}
        step={conversationState.clarification_step || 0} // Pass backend step
      />

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

        <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto px-4 md:px-12 z-10 pt-8">
          {/* Header / Top Bar if needed, currently clean */}

          <div className="flex-1 flex flex-col min-h-0">
            <ChatContainer
              messages={messages}
              conversationState={conversationState}
              isLoading={isLoading}
              blueprint={blueprint}
              onSendMessage={sendMessage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;


