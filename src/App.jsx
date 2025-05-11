import React from "react";
import "./App.css";
import ScrollProgress from "./component/Scrollbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./component/Layout";
import Homepage from "./pages/Homepage";
import TourListPage from "./pages/TourList";
import Tourpage from "./pages/Tourpage";
import Transportationpage from "./pages/Transports";
import SingleDestinationpage from "./pages/Destination";
import Blogspage from "./pages/Blogs";
import Blogpage from "./pages/Blog";

const App = () => {
  return (
    <>
      <ScrollProgress />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<HomeLayout />}>
            <Route index element={<Homepage />} />
            <Route path="tours" element={<TourListPage />} />
            <Route path="tours/:slug" element={<Tourpage />} />
            <Route path="transportation" element={<Transportationpage />} />
            <Route
              path="destinations/:idSlug"
              element={<SingleDestinationpage />}
            />
            <Route path="blogs" element={<Blogspage />} />
            <Route path="blogs/:slug" element={<Blogpage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
