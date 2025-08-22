import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type AttentionStep = 
  | "matrices" 
  | "query_key_multiply" 
  | "softmax" 
  | "attention_weights" 
  | "value_multiply" 
  | "final_output";

interface AttentionState {
  currentStep: AttentionStep;
  queryMatrix: number[][];
  keyMatrix: number[][];
  valueMatrix: number[][];
  attentionScores: number[][];
  softmaxScores: number[][];
  finalOutput: number[][];
  isAnimating: boolean;
  selectedCell: { matrix: string; row: number; col: number } | null;
  
  // Actions
  setStep: (step: AttentionStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetToStart: () => void;
  updateMatrix: (matrix: 'query' | 'key' | 'value', row: number, col: number, value: number) => void;
  selectCell: (matrix: string, row: number, col: number) => void;
  setAnimating: (animating: boolean) => void;
  calculateAttention: () => void;
}

// Default matrix values for demonstration
const defaultQuery = [
  [0.1, 0.2, 0.3],
  [0.4, 0.5, 0.6],
  [0.7, 0.8, 0.9]
];

const defaultKey = [
  [0.2, 0.1, 0.4],
  [0.3, 0.6, 0.2],
  [0.5, 0.3, 0.8]
];

const defaultValue = [
  [1.0, 0.5, 0.2],
  [0.3, 1.2, 0.7],
  [0.8, 0.4, 1.5]
];

export const useAttention = create<AttentionState>()(
  subscribeWithSelector((set, get) => ({
    currentStep: "matrices",
    queryMatrix: defaultQuery,
    keyMatrix: defaultKey,
    valueMatrix: defaultValue,
    attentionScores: [],
    softmaxScores: [],
    finalOutput: [],
    isAnimating: false,
    selectedCell: null,
    
    setStep: (step) => set({ currentStep: step }),
    
    nextStep: () => {
      const { currentStep } = get();
      const steps: AttentionStep[] = ["matrices", "query_key_multiply", "softmax", "attention_weights", "value_multiply", "final_output"];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        set({ currentStep: steps[currentIndex + 1] });
      }
    },
    
    prevStep: () => {
      const { currentStep } = get();
      const steps: AttentionStep[] = ["matrices", "query_key_multiply", "softmax", "attention_weights", "value_multiply", "final_output"];
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex > 0) {
        set({ currentStep: steps[currentIndex - 1] });
      }
    },
    
    resetToStart: () => {
      set({
        currentStep: "matrices",
        queryMatrix: defaultQuery,
        keyMatrix: defaultKey,
        valueMatrix: defaultValue,
        attentionScores: [],
        softmaxScores: [],
        finalOutput: [],
        selectedCell: null
      });
    },
    
    updateMatrix: (matrix, row, col, value) => {
      const state = get();
      const newMatrix = [...(matrix === 'query' ? state.queryMatrix : 
                            matrix === 'key' ? state.keyMatrix : state.valueMatrix)];
      newMatrix[row][col] = value;
      
      set({
        [matrix === 'query' ? 'queryMatrix' : 
         matrix === 'key' ? 'keyMatrix' : 'valueMatrix']: newMatrix
      });
      
      // Recalculate if we're past the initial step
      if (state.currentStep !== "matrices") {
        get().calculateAttention();
      }
    },
    
    selectCell: (matrix, row, col) => {
      set({ selectedCell: { matrix, row, col } });
    },
    
    setAnimating: (animating) => set({ isAnimating: animating }),
    
    calculateAttention: () => {
      const { queryMatrix, keyMatrix, valueMatrix } = get();
      
      // Calculate Q × K^T
      const attentionScores = queryMatrix.map(qRow =>
        keyMatrix[0].map((_, kCol) =>
          qRow.reduce((sum, qVal, idx) => sum + qVal * keyMatrix[idx][kCol], 0)
        )
      );
      
      // Apply softmax
      const softmaxScores = attentionScores.map(row => {
        const maxVal = Math.max(...row);
        const expVals = row.map(val => Math.exp(val - maxVal));
        const sumExp = expVals.reduce((sum, val) => sum + val, 0);
        return expVals.map(val => val / sumExp);
      });
      
      // Calculate final output (attention × V)
      const finalOutput = softmaxScores.map(attRow =>
        valueMatrix[0].map((_, vCol) =>
          attRow.reduce((sum, attVal, idx) => sum + attVal * valueMatrix[idx][vCol], 0)
        )
      );
      
      set({ attentionScores, softmaxScores, finalOutput });
    }
  }))
);
