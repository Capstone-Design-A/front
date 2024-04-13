// new Date()를 이용하여 현재 시간을 추출
// 사용자의 시간대에서 지정된 날짜를 문자열을 KR로 표현
import { memo } from 'react'

function DateText({ value }) {
  if (!value) return;
  return new Date(value).toLocaleDateString('ko-KR');
}

export default memo(DateText);