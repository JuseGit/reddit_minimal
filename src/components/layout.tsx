import React, { FC } from "react";
import "./layout.css";
import * as styles from "./layout_custom.module.css";

type LayoutProps = {
  children: React.ReactNode;
  header?: React.ReactElement;
  main?: React.ReactElement;
  aside?: React.ReactElement;
};

/**
 * Layout - Component that arranges a page elements.
 *
 * @param  children	SEO component.
 * @param  header	Component/DOM element to be rendered in the header section.
 * @param  main     Component/DOM element to be rendered in the main section.
 * @param  aside 	Component/DOM element to be rendered in the aside section.
 * @return 			The newly arranged page.
 */
const Layout: FC<LayoutProps> = ({ children, header, main, aside }) => {
  return (
    <>
      {children}
      <div className={styles.container}>
        <header className={styles.cellItem}>{header}</header>

        <main className={styles.cellItem}>{main}</main>

        <aside className={styles.cellItem}>{aside}</aside>
      </div>
    </>
  );
};

export default Layout;
