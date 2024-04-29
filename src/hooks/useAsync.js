// 비동기 함수를 받아와서 해당 함수를 실행
// 실행 중인 상태를 관리하며 에러가 발생했을 때 에러를 처리
import { useCallback, useState } from "react";

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = useCallback(
    async (...args) => {
      setPending(true);
      setError(null);
      try {
        return await asyncFunction(...args);
      } catch (error) {
        setError(error);
      } finally {
        setPending(false);
      }
    },
    [asyncFunction]
  );

  return [pending, error, wrappedFunction];
}

export default useAsync;
