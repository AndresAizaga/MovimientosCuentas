import { Dispatch, SetStateAction } from 'react';
import { DebouncedState } from 'use-debounce';

export type VoidFunctionArgument<T> = (a: T) => void;
export type VoidFunctionPromise = () => Promise<void>;
export type VoidFunctionArgumentPromise<T> = (a: T) => Promise<void>;
export type DebouncedFunctionCallback<T> = DebouncedState<(a: T) => void>;
export type SetAction<T> = Dispatch<SetStateAction<T>>;