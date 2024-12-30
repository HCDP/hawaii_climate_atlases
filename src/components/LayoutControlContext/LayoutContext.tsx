"use client"

import {createContext, Dispatch, SetStateAction} from 'react';

export const LayoutContext = createContext<{
  maximized: boolean,
  setMaximized: Dispatch<SetStateAction<boolean>>,
}>({
  maximized: false,
  setMaximized: () => {},
});
