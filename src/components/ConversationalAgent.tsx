
import { useState } from "react";
import { useConversation } from "@11labs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, MessageCircle } from "lucide-react";
import Lottie from "lottie-react";

interface ConversationalAgentProps {
  onStoryRequest: (request: string) => void;
  animationData: any; // Lottie animation JSON data
}

const ConversationalAgent = ({ onStoryRequest, animationData }: ConversationalAgentProps) => {
  const [apiKey, setApiKey] = useState("");
  const [agentId, setAgentId] = useState("");
  const [isSetup, setIsSetup] = useState(false);
  const [storyRequest, setStoryRequest] = useState("");

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs agent");
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs agent");
    },
    onMessage: (message) => {
      console.log("Received message:", message);
      // Extract story request from the conversation
      if (message.type === "agent_response" && message.message) {
        setStoryRequest(message.message);
        onStoryRequest(message.message);
      }
    },
    onError: (error) => {
      console.error("Conversation error:", error);
    }
  });

  const handleStartConversation = async () => {
    if (!apiKey || !agentId) {
      alert("Please enter both API Key and Agent ID");
      return;
    }

    try {
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Generate signed URL for the conversation
      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
        {
          method: "GET",
          headers: {
            "xi-api-key": apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get signed URL");
      }

      const body = await response.json();
      await conversation.startSession({ url: body.signed_url });
    } catch (error) {
      console.error("Failed to start conversation:", error);
      alert("Failed to start conversation. Please check your credentials.");
    }
  };

  const handleEndConversation = async () => {
    await conversation.endSession();
  };

  if (!isSetup) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-32 h-32 mx-auto mb-4">
            <Lottie animationData={animationData} loop={true} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Setup AI Assistant</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Enter your ElevenLabs credentials to start talking with Mimi
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">ElevenLabs API Key</label>
            <Input
              type="password"
              placeholder="Enter your ElevenLabs API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Agent ID</label>
            <Input
              placeholder="Enter your ElevenLabs Agent ID"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => setIsSetup(true)}
            className="w-full"
            disabled={!apiKey || !agentId}
          >
            Setup Assistant
          </Button>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
          <p className="text-blue-700 dark:text-blue-300">
            💡 <strong>Need credentials?</strong> Get your API key and create an agent at{" "}
            <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="underline">
              elevenlabs.io
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4">
          <Lottie 
            animationData={animationData} 
            loop={conversation.isSpeaking} 
            className={conversation.isSpeaking ? "animate-pulse" : ""}
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          {conversation.status === "connected" ? "Mimi is listening..." : "Talk to Mimi"}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Tell Mimi what kind of story you'd like to hear
        </p>
      </div>

      <div className="flex justify-center gap-4">
        {conversation.status === "disconnected" ? (
          <Button
            onClick={handleStartConversation}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Start Conversation
          </Button>
        ) : (
          <Button
            onClick={handleEndConversation}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <MicOff className="w-4 h-4" />
            End Conversation
          </Button>
        )}
      </div>

      {conversation.status === "connected" && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Mic className="w-4 h-4 text-green-600" />
            <span className="text-green-600 dark:text-green-400 font-medium">
              Connected - Speak now!
            </span>
          </div>
          {conversation.isSpeaking && (
            <p className="text-sm text-green-600 dark:text-green-400">
              Mimi is speaking...
            </p>
          )}
        </div>
      )}

      {storyRequest && (
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
          <h4 className="font-medium mb-2">Story Request Captured:</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
            "{storyRequest}"
          </p>
        </div>
      )}
    </div>
  );
};

export default ConversationalAgent;
