import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Custom hook to handle actions safely with our specific dispatch types
export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

// Custom hook to read variables cleanly from our global state blocks
export function useAppSelector(selectorFunction: (state: RootState) => any) {
  return useSelector(selectorFunction);
}