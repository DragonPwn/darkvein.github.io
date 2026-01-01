import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import DocsLayout from "./components/DocsLayout";
import DocsPage from "./pages/DocsPage";
import BlogPost from "./pages/BlogPost";

import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* Documentation Routes */}
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<DocsPage />} />
          <Route path=":slug" element={<DocsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
