// 날짜 변환 유틸리티

/**
 * Epoch timestamp를 ISO 8601 문자열로 변환
 * @param epoch - Unix timestamp (milliseconds)
 * @returns ISO 8601 형식의 날짜 문자열
 */
export const epochToISO = (epoch: number): string => {
  return new Date(epoch).toISOString();
};

/**
 * Epoch timestamp를 상대적인 시간으로 변환 (예: "5분 전")
 * @param epoch - Unix timestamp (milliseconds)
 * @returns 상대적인 시간 문자열
 */
export const epochToRelative = (epoch: number): string => {
  const now = Date.now();
  const diff = now - epoch;
  
  if (diff < 0) return '방금 전';
  if (diff < 60000) return '방금 전';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}분 전`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}시간 전`;
  if (diff < 2592000000) return `${Math.floor(diff / 86400000)}일 전`;
  if (diff < 31536000000) return `${Math.floor(diff / 2592000000)}개월 전`;
  return `${Math.floor(diff / 31536000000)}년 전`;
};

/**
 * Epoch timestamp를 한국 날짜 형식으로 변환
 * @param epoch - Unix timestamp (milliseconds)
 * @returns 한국 날짜 형식 문자열 (예: "2024년 1월 9일")
 */
export const epochToKoreanDate = (epoch: number): string => {
  const date = new Date(epoch);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Epoch timestamp를 짧은 날짜 형식으로 변환
 * @param epoch - Unix timestamp (milliseconds)
 * @returns 짧은 날짜 형식 문자열 (예: "2024.01.09")
 */
export const epochToShortDate = (epoch: number): string => {
  const date = new Date(epoch);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

/**
 * Epoch timestamp를 날짜와 시간 형식으로 변환
 * @param epoch - Unix timestamp (milliseconds)
 * @returns 날짜와 시간 형식 문자열 (예: "2024.01.09 14:30")
 */
export const epochToDateTime = (epoch: number): string => {
  const date = new Date(epoch);
  const dateStr = epochToShortDate(epoch);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${dateStr} ${hours}:${minutes}`;
};

/**
 * ISO 문자열을 Epoch timestamp로 변환
 * @param isoString - ISO 8601 형식의 날짜 문자열
 * @returns Unix timestamp (milliseconds)
 */
export const isoToEpoch = (isoString: string): number => {
  return new Date(isoString).getTime();
};

/**
 * 오늘 날짜인지 확인
 * @param epoch - Unix timestamp (milliseconds)
 * @returns 오늘 날짜이면 true
 */
export const isToday = (epoch: number): boolean => {
  const today = new Date();
  const date = new Date(epoch);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * 날짜 표시 형식 결정 (오늘이면 시간만, 아니면 날짜)
 * @param epoch - Unix timestamp (milliseconds)
 * @returns 형식화된 날짜/시간 문자열
 */
export const formatDateTime = (epoch: number): string => {
  if (isToday(epoch)) {
    const date = new Date(epoch);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  return epochToShortDate(epoch);
};

/**
 * 상대 시간 표시를 위한 유틸리티
 * @param date - Date 객체, 날짜 문자열, 또는 epoch timestamp
 * @returns 상대 시간 문자열 (예: "5분 전", "3일 전")
 */
export const formatRelativeTime = (date: Date | string | number): string => {
  let timestamp: number;
  
  if (typeof date === 'number') {
    timestamp = date;
  } else if (typeof date === 'string') {
    // ISO 문자열 또는 epoch 문자열 처리
    timestamp = isNaN(Number(date)) ? new Date(date).getTime() : Number(date);
  } else {
    timestamp = date.getTime();
  }
  
  return epochToRelative(timestamp);
};