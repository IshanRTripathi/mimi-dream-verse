
import { useState } from "react";
import { useConversation } from "@11labs/react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, MessageCircle } from "lucide-react";
import Lottie from "lottie-react";
import mimiAnimation from "@/assets/mimi-animation.json";

interface ConversationalAgentProps {
  onStoryRequest: (request: string) => void;
}

const ConversationalAgent = ({ onStoryRequest }: ConversationalAgentProps) => {
  const [storyRequest, setStoryRequest] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs agent");
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs agent");
      setConversationId(null);
    },
    onMessage: (message) => {
      console.log("Received message:", message);
      
      // Handle different message types according to WebSocket API docs
      switch (message.type) {
        case "conversation_initiation_metadata":
          console.log("Conversation initiated:", message);
          break;
        case "agent_response":
          // Extract story request from agent response
          if (message.agent_response && message.agent_response_type === "text") {
            const responseText = message.agent_response;
            setStoryRequest(responseText);
            onStoryRequest(responseText);
          }
          break;
        case "user_transcript":
          // Handle user speech transcription
          if (message.user_transcript && message.is_final) {
            console.log("Final user transcript:", message.user_transcript);
          }
          break;
        case "agent_response_correction":
          console.log("Agent response correction:", message);
          break;
        case "ping":
          // Handle ping - should be automatically handled by the library
          console.log("Received ping");
          break;
        default:
          console.log("Unknown message type:", message);
      }
    },
    onError: (error) => {
      console.error("Conversation error:", error);
    }
  });

  const handleStartConversation = async () => {
    try {
      // Request microphone access first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Start conversation with proper agent ID and handle response
      const sessionId = await conversation.startSession({ 
        agentId: "agent_01jxsmn9d5fr8arzbsy2cgbbt0"
      });
      
      setConversationId(sessionId);
      console.log("Conversation started with ID:", sessionId);
    } catch (error) {
      console.error("Failed to start conversation:", error);
      alert("Failed to start conversation. Please check your microphone permissions and try again.");
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
      setConversationId(null);
      setStoryRequest("");
    } catch (error) {
      console.error("Failed to end conversation:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-48 h-48 mx-auto mb-4">
          <Lottie 
            animationData={mimiAnimation} 
            loop={true}
            autoplay={true}
            className={`transition-transform duration-300 ${
              conversation.isSpeaking 
                ? "animate-pulse scale-110" 
                : conversation.status === "connected" 
                ? "scale-105" 
                : "scale-100"
            }`}
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          {conversation.status === "connected" ? "Mimi is listening..." : "Talk to Mimi"}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Tell Mimi what kind of story you'd like to hear
        </p>
        {conversationId && (
          <p className="text-xs text-gray-500 mt-1">
            Session ID: {conversationId}
          </p>
        )}
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

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
        <p className="text-blue-700 dark:text-blue-300">
          💡 <strong>Tip:</strong> Just speak naturally! Ask for any kind of story - adventures, fairy tales, educational stories, or anything you can imagine.
        </p>
      </div>
    </div>
  );
};

export default ConversationalAgent;
