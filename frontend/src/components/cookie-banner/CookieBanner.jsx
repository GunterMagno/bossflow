// ============================================================
// File: CookieBanner.jsx
// Description: Cookie consent banner with accept and settings options.
// ============================================================
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CookieBanner.css';

/**
 * Cookie/localStorage consent banner component.
 * Displayed on the user's first visit and can be accepted or rejected.
 */
function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user already accepted or rejected the banner
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    // If rejected, use sessionStorage so it appears again in new session
    if (cookieConsent === 'rejected') {
      const sessionConsent = sessionStorage.getItem('cookieConsentSession');
      
      if (!sessionConsent) {
        // Show banner again in this session
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } else if (!cookieConsent) {
      // First visit - show banner after small delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  /**
   * Handles accepting the use of localStorage
   */
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  /**
   * Handles rejecting the use of localStorage
   * Note: The rejection is recorded for this session, but the banner will reappear on the next visit
   */
  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    sessionStorage.setItem('cookieConsentSession', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <aside className="cookie-banner" role="dialog" aria-label="Aviso de uso de localStorage">
      <div className="cookie-banner__container">
        <div className="cookie-banner__content">
          <h3 className="cookie-banner__title">Aviso de Privacidad</h3>
          <p className="cookie-banner__text">
            BossFlow <strong>NO utiliza cookies</strong> de rastreo ni publicidad. Solo utilizamos{' '}
            <strong>localStorage</strong> para mantener tu sesión iniciada y guardar tus
            preferencias de interfaz. Esto es esencial para el funcionamiento del servicio.
          </p>
          <p className="cookie-banner__text">
            Al continuar usando BossFlow, aceptas el uso de localStorage conforme a nuestra{' '}
            <Link to="/legal/privacidad" className="cookie-banner__link">
              Política de Privacidad
            </Link>{' '}
            y{' '}
            <Link to="/legal/cookies" className="cookie-banner__link">
              Política de Cookies
            </Link>.
          </p>
        </div>

        <div className="cookie-banner__actions">
          <button
            type="button"
            onClick={handleAccept}
            className="cookie-banner__button cookie-banner__button--accept"
            aria-label="Aceptar uso de localStorage"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={handleReject}
            className="cookie-banner__button cookie-banner__button--reject"
            aria-label="Rechazar y continuar con funcionalidad limitada"
          >
            Rechazar
          </button>
          <Link
            to="/legal/cookies"
            className="cookie-banner__button cookie-banner__button--info"
            aria-label="Más información sobre cookies"
          >
            Más información
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default CookieBanner;
