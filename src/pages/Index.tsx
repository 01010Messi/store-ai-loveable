import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatContainer } from "@/components/ChatContainer";
import { HeroSection } from "@/components/HeroSection";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const { messages, conversationState, isLoading, blueprint, sendMessage } = useChat();

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

        <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-4 md:px-6 z-10">
          {messages.length === 0 && <HeroSection />}

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
      <Footer />
    </div>
  );
};

export default Index;


