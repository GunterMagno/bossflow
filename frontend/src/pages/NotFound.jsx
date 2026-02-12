// ============================================================
// File: NotFound.jsx
// Description: 404 not found error page.
// ============================================================
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiAlertCircle } from 'react-icons/fi';
import './NotFound.css';

/**
 * 404 error page - Page not found.
 * Displays a friendly message when the user tries to access a non-existent route.
 * @returns {React.ReactElement} The 404 error page component.
 */
function NotFound() {
  const navigate = useNavigate();

  /**
   * Sets the page title when the component mounts.
   */
  useEffect(() => {
    document.title = '404 - Página no encontrada | BossFlow';
  }, []);

  return (
    <main className="not-found">
      <article className="not-found__container">
        <section className="not-found__icon">
          <FiAlertCircle />
        </section>

        <h1 className="not-found__code">404</h1>

        <h2 className="not-found__title">Boss no encontrado</h2>
        <p className="not-found__message">
          La página que buscas ha sido derrotada o nunca existió en este reino.
        </p>

        <section className="not-found__suggestions">
          <p className="not-found__suggestions-title">Posibles razones:</p>
          <ul className="not-found__list">
            <li>La URL fue escrita incorrectamente</li>
            <li>La página fue movida o eliminada</li>
            <li>El enlace está desactualizado</li>
          </ul>
        </section>

        <section className="not-found__actions">
          <button
            className="not-found__button not-found__button--primary"
            onClick={() => navigate('/')}
          >
            <FiHome />
            <span>Volver al inicio</span>
          </button>
          <button
            className="not-found__button not-found__button--secondary"
            onClick={() => navigate(-1)}
          >
            <span>Página anterior</span>
          </button>
        </section>
      </article>
    </main>
  );
}

export default NotFound;
