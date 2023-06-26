// test-utils.js
import React, { PropsWithChildren, ReactElement, ReactNode } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { setupStore } from "../store/storeSetup";
import StoreWrapper from "../store/storeWrapper";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { PreloadedState } from "@reduxjs/toolkit";
import { AppStore, RootState } from "../store/storeSetup";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

function render(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  setupListeners(store.dispatch);
  function initWrapper({ children }: { children: ReactNode }) {
    return <StoreWrapper store={store}>{children}</StoreWrapper>;
  }

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...rtlRender(ui, { wrapper: initWrapper, ...renderOptions }),
  };
}

// re-export everything
export * from "@testing-library/react";
export * from "@testing-library/jest-dom";
// override render method
export { render };
