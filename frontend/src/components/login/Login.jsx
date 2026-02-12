// ============================================================
// File: Login.jsx
// Description: User login form with email and password authentication.
// ============================================================
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

/**
 * Login component with form validation
 * @returns {JSX.Element} Login form with validation and error handling
 */
function Login() {
  const navigate = useNavigate();
  const { login, loading: authLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = 'Iniciar Sesión | BossFlow';

    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  /**
   * Handles changes in form fields
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Validates login form fields
   * @returns {Object} Object with validation errors found
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Es obligatorio introducir un correo electrónico.';
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email
      )
    ) {
      newErrors.email = 'El correo electrónico no es válido.';
    }

    if (!formData.password) {
      newErrors.password = 'Es obligatorio introducir una contraseña.';
    } else if (formData.password.length < 8) {
      newErrors.password =
        'La contraseña debe tener al menos 8 caracteres.';
    }

    return newErrors;
  };

  /**
   * Handles login form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setErrors({});
      setLoading(true);

      const result = await login(
        formData.email,
        formData.password,
        formData.rememberMe
      );

      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: 'Error al iniciar sesión. Inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login">
      <article className="login__container">
        <section className="login__header">
          <h3 className="login__title">Iniciar sesión</h3>
          <p className="login__subtitle">
            Por favor inicia sesión en tu cuenta
          </p>
        </section>

        <form onSubmit={handleSubmit} className="login__form">
          {errors.submit && (
            <section className="login__error" role="alert">
              {errors.submit}
            </section>
          )}

          <fieldset className="login__field">
            <label htmlFor="email" className="login__label">
              Correo Electrónico
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@ejemplo.com"
              className={`login__input ${errors.email ? 'login__input--error' : ''}`}
              disabled={loading}
            />
            {errors.email && (
              <span className="login__error-message" role="alert">
                {errors.email}
              </span>
            )}
          </fieldset>

          <fieldset className="login__field">
            <section className="login__label-with-link">
              <label htmlFor="password" className="login__label">
                Contraseña
              </label>
              <Link
                to="/recover-password"
                className="login__recover-link"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </section>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className={`login__input ${errors.password ? 'login__input--error' : ''}`}
              disabled={loading}
            />
            {errors.password && (
              <span className="login__error-message" role="alert">
                {errors.password}
              </span>
            )}
          </fieldset>

          <fieldset className="login__remember">
            <label className="login__checkbox">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="login__checkbox-input"
              />
              <span className="login__checkbox-text">Recordarme</span>
            </label>
          </fieldset>

          <button type="submit" className="login__button" disabled={loading}>
            {loading ? (
              <>
                <span className="login__spinner" aria-label="Cargando"></span>
                Iniciar sesión
              </>
            ) : (
              'Iniciar sesión'
            )}
          </button>

          <section className="login__footer">
            <p className="login__footer-text">
              ¿Aún no tienes cuenta?{' '}
              <Link to="/register" className="login__register-link">
                Regístrate aquí
              </Link>
            </p>
          </section>
        </form>
      </article>
    </main>
  );
}

export default Login;
