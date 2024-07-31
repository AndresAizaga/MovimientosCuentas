import {
  PreventGoBackCallbacks,
  PreventGoBackProps,
  PreventGoBackStates,
  UsePreventGoBack
} from './PreventGoBack.types.ts';
import { useCallback, useEffect, useState } from 'react';
import _over from 'lodash/over';
import _isEqual from 'lodash/isEqual';
import { useDeepCompareMemoize } from './useDeepCompareMemoize.ts';

export const usePreventGoBack = (props: PreventGoBackProps): UsePreventGoBack => {
  const { state, handleClose, onPressCancel, clearOnPressCancel } = props;
  
  const [initialState, setInitialState] = useState(state);
  const [showPreventGoBack, setShowPreventGoBack] = useState(false);
    
  const statePreventGoBack: PreventGoBackStates = { showPreventGoBack };

  const handleCancelButton = useCallback(() => {
    setShowPreventGoBack(false);
    clearOnPressCancel();
  }, [clearOnPressCancel]);
  
  const handleDiscard = useCallback(() => {
    setShowPreventGoBack(false);
    _over(setInitialState);
    handleClose();
  }, [handleClose]);

  const compareState = useCallback((): boolean => {
    if (_isEqual(initialState, state)) {
      return true;
    }
    setShowPreventGoBack(true);
    return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useDeepCompareMemoize(initialState), useDeepCompareMemoize(state)]);

  useEffect(() => {
    if (onPressCancel) {
      if (compareState()) handleDiscard();
    }
  }, [compareState, handleDiscard, onPressCancel]);
    
  const callbacks: PreventGoBackCallbacks = { handleCancelButton, handleDiscard };
  
  return { state: statePreventGoBack, callbacks };
}