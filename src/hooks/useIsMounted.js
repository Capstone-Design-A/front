// 첫 번째 렌더링에서 useEffect를 실행하지 않는 커스텀 훅
// Component의 mount 여부를 알 수 있는 hook
import { useEffect, useState } from "react";

function useIsMounted(delay) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsMounted(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return isMounted;
}

export default useIsMounted;
