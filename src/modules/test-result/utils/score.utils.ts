/**
 * Tính overall score theo cơ chế IELTS
 * 7.25 -> hiển thị 7.25 nhưng làm tròn xuống 7
 * 7.75 -> làm tròn lên 8
 */
export function calculateOverallScore(
  listening: number,
  reading: number,
  writing: number,
  speaking: number,
): number {
  const average = (listening + reading + writing + speaking) / 4;

  // Lấy phần thập phân
  const decimal = average - Math.floor(average);

  // Quy tắc làm tròn IELTS:
  // 0.00 - 0.24 -> làm tròn xuống (x.0)
  // 0.25 - 0.74 -> làm tròn thành .5 (x.5)
  // 0.75 - 0.99 -> làm tròn lên (x+1.0)

  if (decimal <= 0.25) {
    console.log(`Rounding down: ${average} to ${Math.floor(average)}`);

    return Math.floor(average);
  } else if (decimal <= 0.75) {
    return Math.floor(average) + 0.5;
  } else {
    return Math.ceil(average);
  }
}

/**
 * Hiển thị điểm với format chính xác (7.25 hiển thị là 7.25)
 */
export function formatScoreDisplay(score: number): number {
  return Math.round(score * 100) / 100;
}
