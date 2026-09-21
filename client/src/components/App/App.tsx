import "./App.css";

import { Route, Routes } from "react-router-dom";

import { Layout } from "../Layout/Layout";
import { Home } from "../Home/Home";
import { SolutionStart } from "../SolutionStart/SolutionStart";
import { NotFound } from "../NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="start/:solutionId" element={<SolutionStart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
