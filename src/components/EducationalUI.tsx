import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useAttention } from "../lib/stores/useAttention";
import GameControls from "./GameControls";

export default function EducationalUI() {
  const { currentStep, selectedCell, queryMatrix, keyMatrix, valueMatrix } = useAttention();

  const stepExplanations = {
    matrices: {
      title: "Understanding the Input Matrices",
      content: "In the attention mechanism, we start with three matrices: Query (Q), Key (K), and Value (V). These matrices contain vector representations of the input tokens. Click on any cell to inspect individual values."
    },
    query_key_multiply: {
      title: "Computing Attention Scores",
      content: "We multiply the Query matrix by the transpose of the Key matrix (Q × K^T). This gives us raw attention scores that measure how much each query element should attend to each key element."
    },
    softmax: {
      title: "Normalizing with Softmax",
      content: "The raw attention scores are normalized using the softmax function. This ensures that attention weights sum to 1, creating a probability distribution over the input tokens."
    },
    attention_weights: {
      title: "Attention Weight Matrix",
      content: "The softmax output gives us attention weights - a probability distribution showing how much attention each query position pays to each key position. Higher values mean stronger attention."
    },
    value_multiply: {
      title: "Applying Attention to Values",
      content: "We multiply the attention weights by the Value matrix. This weighted combination creates the final output, where each position is a weighted sum of all value vectors."
    },
    final_output: {
      title: "Final Attended Output",
      content: "The result is a matrix where each row represents a context-aware representation of the corresponding input token, incorporating information from all other tokens based on the attention weights."
    }
  };

  const currentExplanation = stepExplanations[currentStep as keyof typeof stepExplanations];

  return (
    <div className="absolute top-4 left-4 right-4 pointer-events-none">
      <div className="flex gap-4 pointer-events-auto">
        {/* Main explanation panel */}
        <Card className="flex-1 bg-black/90 border-gray-700 text-white max-w-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-blue-400">
              {currentExplanation?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">
            {currentExplanation?.content}
          </CardContent>
        </Card>

        {/* Controls panel */}
        <div className="w-64">
          <GameControls />
        </div>
      </div>

      {/* Cell inspector */}
      {selectedCell && (
        <Card className="absolute top-full mt-4 left-0 bg-black/90 border-gray-700 text-white max-w-xs pointer-events-auto">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-400">
              Cell Inspector
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <div>
              <strong>Matrix:</strong> {selectedCell.matrix.toUpperCase()}
            </div>
            <div>
              <strong>Position:</strong> [{selectedCell.row}, {selectedCell.col}]
            </div>
            <div>
              <strong>Value:</strong> {
                selectedCell.matrix === 'query' ? queryMatrix[selectedCell.row]?.[selectedCell.col]?.toFixed(3) :
                selectedCell.matrix === 'key' ? keyMatrix[selectedCell.row]?.[selectedCell.col]?.toFixed(3) :
                valueMatrix[selectedCell.row]?.[selectedCell.col]?.toFixed(3)
              }
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mathematical formulas */}
      <Card className="absolute bottom-4 left-4 bg-black/90 border-gray-700 text-white max-w-md pointer-events-auto">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-green-400">
            Current Formula
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs font-mono">
          {currentStep === "matrices" && "Q, K, V ∈ ℝⁿˣᵈ"}
          {currentStep === "query_key_multiply" && "Scores = Q × K^T"}
          {currentStep === "softmax" && "Attention = softmax(Scores)"}
          {currentStep === "attention_weights" && "A[i,j] = exp(S[i,j]) / Σₖexp(S[i,k])"}
          {currentStep === "value_multiply" && "Output = Attention × V"}
          {currentStep === "final_output" && "Output[i] = Σⱼ A[i,j] × V[j]"}
        </CardContent>
      </Card>
    </div>
  );
}
