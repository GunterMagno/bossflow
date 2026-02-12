// ============================================================
// File: Layout.jsx
// Description: Main application layout wrapping pages with navbar, footer, and toast container.
// ============================================================
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import './Layout.css';

/**
 * Main application layout component
 * Wraps the navigation bar, dynamic content and footer
 * @returns {JSX.Element} Base application structure with Navbar, Outlet and Footer
 */
function Layout() {
  return (
    <section className="layout">
      <Navbar />
      <main className="layout__content">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}

export default Layout;
