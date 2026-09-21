import { Outlet } from "react-router-dom";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ScrollToHash } from "./ScrollToHash";

/** Chrome shared by every page: the navigation stays put as routes change. */
export function Layout() {
  return (
    <>
      <ScrollToHash />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
