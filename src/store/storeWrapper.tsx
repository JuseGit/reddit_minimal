import React, { FC } from "react";
import { Provider } from "react-redux";
import { Store } from "@reduxjs/toolkit";

type StoreWrapperProps = {
  children: React.ReactNode;
  store: Store;
};

const StoreWrapper: FC<StoreWrapperProps> = ({
  children,
  store,
}): JSX.Element => {
  return <Provider store={store}> {children} </Provider>;
};

export default StoreWrapper;
