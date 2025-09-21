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
import ErrorPage from "./pages/Error";

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

            <Route path="events" element={<Transportationpage />} />

            <Route path="restaurants" element={<Transportationpage />} />
            
            <Route path="hotels" element={<Transportationpage />} />

            <Route path="cars" element={<Transportationpage />} />
            
            <Route path="accommodations" element={<Transportationpage />} />
            
            <Route path="destinations" element={<Transportationpage />} />
            <Route
              path="destinations/:idSlug"
              element={<SingleDestinationpage />}
            />
            
            <Route path="blogs" element={<Blogspage />} />
            <Route path="blogs/:slug" element={<Blogpage />} />

            <Route path="contact" element={<Blogpage />} />
            <Route path="about" element={<Blogpage />} />
            <Route path="faq" element={<Blogpage />} />
            <Route path="terms" element={<Blogpage />} />
            <Route path="privacy-policy" element={<Blogpage />} />

            <Route path="*" element={<ErrorPage />} />
            <Route path="404" element={<Blogpage />} />
            <Route path="500" element={<Blogpage />} />

            <Route path="login" element={<Blogpage />} />
            <Route path="register" element={<Blogpage />} />
            <Route path="forgot-password" element={<Blogpage />} />
            <Route path="reset-password" element={<Blogpage />} />
            
            {/* user's dashboard */}
            <Route path="dashboard/client" element={<Blogpage />} />
            <Route path="dashboard/provider" element={<Blogpage />} />

            {/* SERVICE PROVIDER */}
            <Route path="provider" element={<Blogpage />} />


          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
