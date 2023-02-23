const SidebarWrapperReducer = (state, action) => {
  switch (action.type) {
    case "WRAPPED": {
      return {
        sidebarWrapper: !state.sidebarWrapper,
      };
    }
    default:
      return state;
  }
};

export default SidebarWrapperReducer;
