/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import React from "react";
import StoreWrapper from "./src/store/storeWrapper";
import { setupStore } from "./src/store/storeSetup";
import { GatsbyBrowser } from "gatsby";

/**
 *	Wraps the root element with the store Provider.
 *	This allows the entire application to see the state managed by Redux.
 */
export const wrapRootElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  const store = setupStore();

  return <StoreWrapper store={store}>{element}</StoreWrapper>;
};
