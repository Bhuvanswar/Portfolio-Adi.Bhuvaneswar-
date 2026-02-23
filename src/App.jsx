import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Achievements from "./pages/achievements";
import Projects from "./pages/projects";
import Contact from "./pages/contact";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main Portfolio Route */}
        <Route path="/" element={
          <div className="min-h-screen text-white bg-[url('/bg.jpg')] bg-cover bg-fixed bg-center">
            <Navbar />
            <main>
              <section id="home">
                <Home />
              </section>
              <section id="about">
                <About />
              </section>
              <section id="projects">
                <Projects />
              </section>
              <section id="achievements">
                <Achievements />
              </section>
              <section id="contact">
                <Contact />
              </section>
            </main>
          </div>
        } />

        {/* Admin Routes */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}