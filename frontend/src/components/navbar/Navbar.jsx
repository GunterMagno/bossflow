// ============================================================
// File: Navbar.jsx
// Description: Application navigation bar with responsive menu and authentication controls.
// ============================================================
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import './Navbar.css';

/**
 * Main navigation bar component of the application.
 * Provides navigation between pages and user authentication management.
 * Includes responsive menu for mobile devices and user dropdown menu.
 *
 * @returns {JSX.Element} Navigation element with links and user options
 */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  /**
   * Toggles the visibility state of the desktop user dropdown menu.
   */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  /**
   * Toggles the visibility state of the mobile hamburger menu.
   */
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  /**
   * Logs out the current user.
   * Closes all open menus, executes logout and redirects to home page.
   */
  const handleLogout = () => {
    setMenuOpen(false);
    setMobileMenuOpen(false);
    logout();
    navigate('/');
  };

  useEffect(() => {
    /**
     * Handles clicks outside the dropdown menu to close it automatically.
     *
     * @param {MouseEvent} event - Mouse click event
     */
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <nav className="header__navbar">
        <Link to="/" className="navbar__logo">
          <img src="/logo.png" alt="BossFlow" className="navbar__logo-img" />
        </Link>

        <button
          className="navbar__hamburger"
          onClick={toggleMobileMenu}
          aria-label="Menú"
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <ul
          className={`navbar__links ${mobileMenuOpen ? 'navbar__links--visible' : ''}`}
        >
          <li className="navbar__item">
            <Link
              to="/"
              className="navbar__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
          </li>
          <li className="navbar__item">
            <Link
              to="/dashboard"
              className="navbar__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li className="navbar__item">
            <Link
              to="/community"
              className="navbar__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Comunidad
            </Link>
          </li>

          <li className="navbar__item navbar__item--auth-mobile">
            {!isAuthenticated ? (
              <section className="navbar__auth-buttons-mobile">
                <Link
                  to="/login"
                  className="navbar__login-button"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="navbar__register-button"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </section>
            ) : (
              <section className="navbar__user-mobile">
                <h3 className="navbar__section-title">Cuenta</h3>
                <Link
                  to="/profile"
                  className="navbar__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiUser /> Perfil
                </Link>
                <Link
                  to="/settings"
                  className="navbar__link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiSettings /> Configuración
                </Link>
                <button
                  onClick={handleLogout}
                  className="navbar__link navbar__link--logout"
                >
                  <FiLogOut /> Cerrar sesión
                </button>
              </section>
            )}
          </li>
        </ul>

        <section className="navbar__user-menu" ref={menuRef}>
          {!isAuthenticated ? (
              <section className="navbar__auth-buttons">
              <Link to="/login" className="navbar__login-button">
                Iniciar sesión
              </Link>
              <Link to="/register" className="navbar__register-button">
                Registrarse
              </Link>
            </section>
          ) : (
            <>
              <button className="navbar__user" onClick={toggleMenu}>
                <span className="navbar__avatar">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.username} className="navbar__avatar-img" />
                  ) : (
                    <FiUser />
                  )}
                </span>
                <span className="navbar__name">
                  {user?.username || user?.email}
                </span>
                <span
                  className={`navbar__arrow ${menuOpen ? 'navbar__arrow--up' : ''}`}
                >
                  <FiChevronDown />
                </span>
              </button>

              {menuOpen && (
                <ul className="dropdown-menu">
                  <li className="dropdown-menu__item">
                    <Link to="/profile" className="dropdown-menu__link">
                      <span className="dropdown-menu__icon">
                        <FiUser />
                      </span>
                      <span>Perfil</span>
                    </Link>
                  </li>
                  <li className="dropdown-menu__item">
                    <Link to="/settings" className="dropdown-menu__link">
                      <span className="dropdown-menu__icon">
                        <FiSettings />
                      </span>
                      <span>Configuración</span>
                    </Link>
                  </li>
                  <li className="dropdown-menu__separator"></li>
                  <li className="dropdown-menu__item">
                    <button
                      onClick={handleLogout}
                      className="dropdown-menu__link dropdown-menu__link--logout"
                    >
                      <span className="dropdown-menu__icon">
                        <FiLogOut />
                      </span>
                      <span>Cerrar sesión</span>
                    </button>
                  </li>
                </ul>
              )}
            </>
          )}
        </section>
      </nav>
    </header>
  );
}

export default Navbar;
