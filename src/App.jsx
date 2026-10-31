import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar, SideNav, Footer } from "./components";
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
          {/* Invisible until focused (first Tab press) — lets keyboard
              users jump past the navbar/sidenav straight to the page
              content instead of tabbing through every nav link first. */}
          <a
            href='#main-content'
            className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-full focus:bg-accent focus:text-black focus:font-sans focus:text-sm focus:font-semibold'
          >
            Skip to content
          </a>
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          <SideNav />
          <main id='main-content'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<ProductsPage />} />
              <Route path='/products/:slug' element={<ProductDetail />} />
              {/* An unknown route (typo, stale link) goes home instead of
                  rendering a blank page between the navbar and footer —
                  same "don't show a dead end" call ProductDetail makes for
                  an unknown product slug. */}
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWidgets />
        </div>
      </ChatProvider>
    </BrowserRouter>
  );
};

export default App;
