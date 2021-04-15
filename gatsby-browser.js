/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
 import React from "react";
 import StoreWrapper from "./src/store/storeWrapper.js"

/**
 *	Wraps the root element with the store Provider.
 *	This allows the entire application to see the state managed by Redux.
 */
//export { default as wrapRootElement } from './src/store/storeWrapper';

export const wrapRootElement = ({ element }) => {
  return (
    <StoreWrapper>
      {element}
    </StoreWrapper>
  )
}
