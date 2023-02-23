import { createContext, useReducer } from 'react';
import SidebarWrapperReducer from './SidebarWrapperReducer';

const INICIAL_STATE = {
  sidebarWrapper: false,
};

export const SidebarWrapperContext = createContext(INICIAL_STATE);
export const SidebarWrapperContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SidebarWrapperReducer, INICIAL_STATE);
  return (
    <SidebarWrapperContext.Provider
      value={{ sidebarWrapper: state.sidebarWrapper, dispatch }}
    >
      {children}
    </SidebarWrapperContext.Provider>
  );
};
