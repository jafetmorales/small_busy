export function multiplyMatrices(a: number[][], b: number[][]): number[][] {
  const result: number[][] = [];
  
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < b.length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  
  return result;
}

export function transposeMatrix(matrix: number[][]): number[][] {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

export function applySoftmax(matrix: number[][]): number[][] {
  return matrix.map(row => {
    const maxVal = Math.max(...row);
    const expVals = row.map(val => Math.exp(val - maxVal));
    const sumExp = expVals.reduce((sum, val) => sum + val, 0);
    return expVals.map(val => val / sumExp);
  });
}

export function getMatrixColor(value: number, min: number, max: number): string {
  const normalized = (value - min) / (max - min);
  
  if (normalized < 0.5) {
    // Blue to white
    const intensity = normalized * 2;
    return `rgb(${Math.floor(intensity * 255)}, ${Math.floor(intensity * 255)}, 255)`;
  } else {
    // White to red
    const intensity = (normalized - 0.5) * 2;
    return `rgb(255, ${Math.floor((1 - intensity) * 255)}, ${Math.floor((1 - intensity) * 255)})`;
  }
}

export function formatNumber(num: number): string {
  return Number(num).toFixed(3);
}
