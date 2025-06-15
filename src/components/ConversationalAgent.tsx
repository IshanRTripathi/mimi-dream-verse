
import { useState } from "react";
import { useConversation } from "@11labs/react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, MessageCircle } from "lucide-react";
import Lottie from "lottie-react";
import mimiAnimation from "@/assets/animations/mimi-animation.json";

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
      
      // Handle different message types according to ElevenLabs docs
      try {
        if (message && typeof message === 'object') {
          const messageData = message as any;
          
          // Handle user transcription (tentative and final)
          if (messageData.type === 'user_transcript') {
            console.log("User transcript:", messageData.user_transcript);
            // Don't process user transcripts as story requests
            return;
          }
          
          // Handle agent response
          if (messageData.type === 'agent_response') {
            console.log("Agent response:", messageData.agent_response);
            
            // Only capture substantial agent responses for story requests
            const responseText = messageData.agent_response?.trim();
            if (responseText && responseText.length > 20 && 
                !responseText.toLowerCase().includes('hi') && 
                !responseText.toLowerCase().includes('hello')) {
              setStoryRequest(responseText);
              onStoryRequest(responseText);
            }
            return;
          }
          
          // Handle audio data
          if (messageData.type === 'audio') {
            console.log("Audio data received");
            // Don't process audio data
            return;
          }
          
          // Handle interruption
          if (messageData.type === 'interruption') {
            console.log("Interruption detected");
            return;
          }
          
          // Handle ping/pong for connection health
          if (messageData.type === 'ping' || messageData.type === 'pong') {
            console.log("Connection health check:", messageData.type);
            return;
          }
          
          // Handle error messages
          if (messageData.type === 'error') {
            console.error("Agent error:", messageData.error);
            return;
          }
          
          // Fallback for legacy message format (source/message)
          if (messageData.source && messageData.message) {
            if (messageData.source === "user") {
              console.log("User message (legacy):", messageData.message);
              return;
            }
            
            if (messageData.source === "ai") {
              console.log("AI response (legacy):", messageData.message);
              const responseText = messageData.message.trim();
              if (responseText.length > 20 && 
                  !responseText.toLowerCase().includes('hi') && 
                  !responseText.toLowerCase().includes('hello')) {
                setStoryRequest(responseText);
                onStoryRequest(responseText);
              }
              return;
            }
          }
          
          // Log unhandled message types for debugging
          console.log("Unhandled message type:", messageData.type || messageData);
        }
      } catch (error) {
        console.error("Error processing message:", error);
        // Don't end conversation on message processing errors
      }
    },
    onError: (error) => {
      console.error("Conversation error:", error);
      // Don't automatically end conversation on errors
    }
  });

  const handleStartConversation = async () => {
    try {
      // Request microphone access first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Start conversation with proper agent ID
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
