/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

/**
 *	Wraps the root element with the store Provider.
 *	This allows the entire application to see the state managed by Redux.
 */
export { default as wrapRootElement } from './src/store/storeWrapper';
