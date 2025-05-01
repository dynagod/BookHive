import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvide } from "./context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import { SearchProvider } from "./context/SearchContext";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <AuthProvide>
        <SearchProvider>
          <Navbar />
          <main className="min-h-screen max-w-screen-2xl font-primary">
            <Outlet />
          </main>
          <Footer />
        </SearchProvider>
      </AuthProvide>
    </>
  );
}

export default App;
