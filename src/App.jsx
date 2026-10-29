import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Footer } from "./components";
import Home from "./components/Home";
import ProductsPage from "./components/ProductsPage";
import ProductDetail from "./components/ProductDetail";
import ScrollProgress from "./components/ScrollProgress";
import CursorGlow from "./components/CursorGlow";
import FloatingWidgets from "./components/FloatingWidgets";
import { ChatProvider } from "./context/ChatContext";
import { useSmoothScroll } from "./lib/smoothScroll";

const App = () => {
  useSmoothScroll();

  return (
    <BrowserRouter>
      <ChatProvider>
        <div className='relative min-h-screen bg-ink grain'>
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/:slug' element={<ProductDetail />} />
          </Routes>
          <Footer />
          <FloatingWidgets />
        </div>
      </ChatProvider>
    </BrowserRouter>
  );
};

export default App;
