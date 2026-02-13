// ============================================================
// File: Footer.jsx
// Description: Application footer with navigation links and copyright.
// ============================================================
import './Footer.css';
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa6';

/**
 * Application footer with corporate information and links
 * @returns {JSX.Element} Footer with branding, links, social media and copyright
 */
function Footer() {
  return (
    <footer className="footer">
      <section className="footer__top">
        <section className="footer__section footer__section--about">
          <section className="footer__brand">
            <img
              src="/logo-nt.svg"
              alt="BossFlow Logo"
              className="footer__logo"
            />
            <h3 className="footer__title footer__title--brand">BossFlow</h3>
          </section>
          <p className="footer__description">
            La plataforma para planificar y optimizar tácticas de batallas
            contra jefes con diagramas de flujos interactivos. Colabora con tu
            equipo, diseña estrategias visuales y gana fácil contra cualquier
            boss.
          </p>
        </section>

        <section className="footer__links">
          <section className="footer__section footer__section--links">
            <h3 className="footer__title">Enlaces útiles</h3>
            <ul className="footer__list">
              <li className="footer__item">
                <a href="/about" className="footer__link">
                  Sobre nosotros
                </a>
              </li>
              <li className="footer__item">
                <a href="/features" className="footer__link">
                  Características
                </a>
              </li>
              <li className="footer__item">
                <a href="/blog" className="footer__link">
                  Blog
                </a>
              </li>
            </ul>
          </section>

          <section className="footer__section footer__section--links">
            <h3 className="footer__title">Soporte & Legal</h3>
            <ul className="footer__list">
              <li className="footer__item">
                <a href="/legal/terms" className="footer__link">
                  Términos de Uso
                </a>
              </li>
              <li className="footer__item">
                <a href="/legal/privacy" className="footer__link">
                  Política de Privacidad
                </a>
              </li>
              <li className="footer__item">
                <a href="/legal/cookies" className="footer__link">
                  Política de Cookies
                </a>
              </li>
              <li className="footer__item">
                <a href="/status" className="footer__link">
                  Estado del servicio
                </a>
              </li>
            </ul>
          </section>
        </section>

        <section className="footer__section footer__section--socials">
          <h3 className="footer__title">Redes sociales</h3>
          <section className="footer__socials">
            <a
              href="https://www.facebook.com/profile.php?id=61585128865474"
              className="footer__social"
              aria-label="Facebook"
              target="_blank"
            >
              <FaFacebookF className="footer__social-icon" />
            </a>
            <a
              href="https://x.com/Bossflow412981"
              className="footer__social"
              aria-label="X"
              target="_blank"
            >
              <FaXTwitter className="footer__social-icon" />
            </a>
            <a
              href="https://www.instagram.com/bossflowpi/"
              className="footer__social"
              aria-label="Instagram"
              target="_blank"
            >
              <FaInstagram className="footer__social-icon" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC4oVyly7b4UCxzs9ugaDd0w"
              className="footer__social"
              aria-label="YouTube"
              target="_blank"
            >
              <FaYoutube className="footer__social-icon" />
            </a>
          </section>
        </section>
      </section>

      <hr className="footer__separator" />

      <section className="footer__bottom">
        <p className="footer__copyright">
          © BossFlow 2025. Todos los derechos reservados.
        </p>
        <p className="footer__tagline">Planifica. Mejora. Derrota al boss.</p>
      </section>
    </footer>
  );
}

export default Footer;
