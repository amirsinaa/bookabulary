//credit: https://github.com/juliencrn/usehooks-ts

import useIsomorphicLayoutEffect from './use-isomorphic-layout-effect';
import { useCallback, useRef } from 'react';

export default function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R,
) {
  const ref = useRef<typeof fn>(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })

  useIsomorphicLayoutEffect(() => {
    ref.current = fn
  }, [fn])

  return useCallback((...args: Args) => ref.current(...args), [ref])
}