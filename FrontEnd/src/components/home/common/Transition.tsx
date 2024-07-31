import { ReactElement, Ref, forwardRef } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

export const Transition = forwardRef(function Transition(
  props: TransitionProps & {
        children: ReactElement;
    },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});