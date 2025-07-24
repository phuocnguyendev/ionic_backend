import { calculateOverallScore } from '../utils/score.utils';

describe('IELTS Score Calculation', () => {
  test('should calculate overall score according to IELTS rules', () => {
    // Test case 1: 7.25 should round down to 7
    expect(calculateOverallScore(7, 7, 7.5, 7.5)).toBe(7);
    
    // Test case 2: 7.75 should round up to 8
    expect(calculateOverallScore(8, 7.5, 8, 7.5)).toBe(8);
    
    // Test case 3: Exact .5 should stay .5
    expect(calculateOverallScore(7, 7, 7.5, 7.5)).toBe(7);
    
    // Test case 4: Test various scenarios
    expect(calculateOverallScore(6.5, 7, 6.5, 7)).toBe(6.5);
    expect(calculateOverallScore(8, 8, 8, 8)).toBe(8);
    expect(calculateOverallScore(6, 6, 6, 6)).toBe(6);
    
    // Test case 5: Mixed scores
    expect(calculateOverallScore(7.5, 6.5, 7, 6)).toBe(6.5);
    expect(calculateOverallScore(9, 8, 7, 6)).toBe(7.5);
  });

  test('should handle edge cases', () => {
    // Test minimum scores
    expect(calculateOverallScore(0, 0, 0, 0)).toBe(0);
    
    // Test maximum scores
    expect(calculateOverallScore(9, 9, 9, 9)).toBe(9);
    
    // Test mixed extreme scores
    expect(calculateOverallScore(9, 0, 9, 0)).toBe(4.5);
  });
});
