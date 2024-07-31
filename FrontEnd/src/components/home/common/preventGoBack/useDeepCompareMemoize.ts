import _isEqual from 'lodash/isEqual';
import { useRef } from 'react';

type SupportedValue = Record<string, unknown> | string | boolean | number | null;

export const useDeepCompareMemoize = (value: SupportedValue): SupportedValue => {
  const ref = useRef<SupportedValue>(null);
  if (!_isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};
