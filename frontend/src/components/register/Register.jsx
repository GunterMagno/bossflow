// ============================================================
// File: Register.jsx
// Description: User registration form with validation.
// ============================================================
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Register.css';

/**
 * Registration page component for new users.
 * Provides a complete form with validation to create a new account.
 * Includes fields for username, email, password and terms acceptance.
 *
 * @returns {JSX.Element} Registration page element
 */
function Register() {
  const navigate = useNavigate();
  const {
    register: registerUser,
    loading: authLoading,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    document.title = 'Registrarse | BossFlow';

    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);

  /**
   * Handles changes in form fields.
   * Updates form state and clears the error of the modified field.
   *
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Validates all registration form fields.
   * Checks username, email, passwords and terms acceptance.
   *
   * @returns {Object} Object with validation errors found
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username =
        'Es obligatorio introducir un nombre de usuario.';
    } else if (formData.username.length < 3) {
      newErrors.username =
        'El nombre de usuario debe tener al menos 3 caracteres.';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username =
        'El nombre de usuario solo puede contener letras, números, guiones y guiones bajos.';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        'Es obligatorio confirmar la contraseña.';
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Debes aceptar los Términos de Uso y la Política de Privacidad.';
    }

    return newErrors;
  };

  /**
   * Handles registration form submission.
   * Validates data, registers the user and redirects to dashboard on success.
   *
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

      const result = await registerUser(
        formData.username,
        formData.email,
        formData.password
      );

      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: 'Error al registrarse. Inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register">
      <article className="register__container">
        <section className="register__header">
          <h3 className="register__title">Crear cuenta</h3>
          <p className="register__subtitle">Regístrate para comenzar</p>
        </section>

        <form onSubmit={handleSubmit} className="register__form">
          {errors.submit && (
            <section className="register__error" role="alert">
              {errors.submit}
            </section>
          )}

          <fieldset className="register__field">
            <label htmlFor="username" className="register__label">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="usuario123"
              className={`register__input ${errors.username ? 'register__input--error' : ''}`}
              disabled={loading}
            />
            {errors.username && (
              <span className="register__error-message" role="alert">
                {errors.username}
              </span>
            )}
          </fieldset>

          <fieldset className="register__field">
            <label htmlFor="email" className="register__label">
              Correo Electrónico
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@ejemplo.com"
              className={`register__input ${errors.email ? 'register__input--error' : ''}`}
              disabled={loading}
            />
            {errors.email && (
              <span className="register__error-message" role="alert">
                {errors.email}
              </span>
            )}
          </fieldset>

          <fieldset className="register__field">
            <label htmlFor="password" className="register__label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className={`register__input ${errors.password ? 'register__input--error' : ''}`}
              disabled={loading}
            />
            {errors.password && (
              <span className="register__error-message" role="alert">
                {errors.password}
              </span>
            )}
          </fieldset>

          <fieldset className="register__field">
            <label htmlFor="confirmPassword" className="register__label">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className={`register__input ${errors.confirmPassword ? 'register__input--error' : ''}`}
              disabled={loading}
            />
            {errors.confirmPassword && (
              <span className="register__error-message" role="alert">
                {errors.confirmPassword}
              </span>
            )}
          </fieldset>

          <fieldset className="register__terms">
            <label className="register__checkbox">
              <input
                type="checkbox"
                id="terms"
                className="register__checkbox-input"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e.target.checked);
                  if (errors.terms) {
                    setErrors((prev) => ({ ...prev, terms: '' }));
                  }
                }}
                disabled={loading}
              />
              <span className="register__checkbox-text">
                Acepto los{' '}
                <Link to="/legal/terms" className="register__terms-link" target="_blank">
                  Términos de Uso
                </Link>{' '}
                y la{' '}
                <Link to="/legal/privacy" className="register__terms-link" target="_blank">
                  Política de Privacidad
                </Link>
              </span>
            </label>
            {errors.terms && (
              <span className="register__error-message" role="alert">
                {errors.terms}
              </span>
            )}
          </fieldset>

          <button type="submit" className="register__button" disabled={loading}>
            {loading ? (
              <>
                <span className="register__spinner"></span>
                Registrando...
              </>
            ) : (
              'Crear cuenta'
            )}
          </button>
        </form>

        <section className="register__footer">
          <p className="register__footer-text">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="register__login-link">
              Inicia sesión
            </Link>
          </p>
        </section>
      </article>
    </main>
  );
}

export default Register;
