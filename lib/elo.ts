export const K_FACTOR = 32; // Standard K-factor, can be adjusted

export function getExpectation(rating1: number, rating2: number): number {
  return 1.0 / (1.0 + Math.pow(10, (rating2 - rating1) / 400));
}

export function modifyRating(rating: number, expected: number, actual: number): number {
  return Math.round(rating + K_FACTOR * (actual - expected));
} 