import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useAttention } from "../lib/stores/useAttention";
import { useAudio } from "../lib/stores/useAudio";

export default function GameControls() {
  const { currentStep, nextStep, prevStep, resetToStart } = useAttention();
  const { toggleMute, isMuted } = useAudio();

  const steps = [
    "matrices",
    "query_key_multiply", 
    "softmax",
    "attention_weights",
    "value_multiply",
    "final_output"
  ];

  const stepNames = {
    matrices: "1. Initial Matrices",
    query_key_multiply: "2. Q × K^T",
    softmax: "3. Softmax",
    attention_weights: "4. Attention Weights",
    value_multiply: "5. Attention × V",
    final_output: "6. Final Output"
  };

  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <Card className="bg-black/80 border-gray-600 text-white">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Step indicator */}
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">
              {stepNames[currentStep as keyof typeof stepNames]}
            </h3>
            <div className="text-sm text-gray-300">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-2 justify-center">
            <Button 
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              variant="outline"
              size="sm"
              className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              Previous
            </Button>
            <Button 
              onClick={nextStep}
              disabled={currentStepIndex === steps.length - 1}
              variant="outline"
              size="sm"
              className="bg-blue-600 border-blue-500 text-white hover:bg-blue-500"
            >
              Next
            </Button>
            <Button 
              onClick={resetToStart}
              variant="outline"
              size="sm"
              className="bg-red-600 border-red-500 text-white hover:bg-red-500"
            >
              Reset
            </Button>
          </div>

          {/* Audio toggle */}
          <div className="text-center">
            <Button 
              onClick={toggleMute}
              variant="outline"
              size="sm"
              className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
            >
              {isMuted ? "🔇 Unmute" : "🔊 Mute"}
            </Button>
          </div>

          {/* Keyboard shortcuts */}
          <div className="text-xs text-gray-400 space-y-1">
            <div><kbd className="bg-gray-700 px-1 rounded">Space</kbd> Next Step</div>
            <div><kbd className="bg-gray-700 px-1 rounded">Shift</kbd> Previous Step</div>
            <div><kbd className="bg-gray-700 px-1 rounded">R</kbd> Reset</div>
            <div><kbd className="bg-gray-700 px-1 rounded">WASD</kbd> Move Camera</div>
            <div><kbd className="bg-gray-700 px-1 rounded">Q/E</kbd> Rotate View</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
