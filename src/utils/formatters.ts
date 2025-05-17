// src/utils/formatters.ts

/**
 * Formats time from seconds to mm:ss format.
 * @param time - Time in seconds
 * @returns Formatted time string
 */
export const formatTime = (time: number): string => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

/**
 * Formats a song duration for display
 * @param duration - Duration string or number in seconds
 * @returns Formatted duration string
 */
export const formatDuration = (duration: string | number): string => {
  if (typeof duration === 'string') return duration;
  return formatTime(duration);
};

/**
 * Truncates text to a specific length and adds ellipsis if needed
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};