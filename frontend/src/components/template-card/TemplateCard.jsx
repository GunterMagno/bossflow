// ============================================================
// File: TemplateCard.jsx
// Description: Individual template card displaying preview, title, and action buttons.
// ============================================================
import { FiFileText, FiClock, FiEdit2, FiTrash2, FiCopy } from 'react-icons/fi';
import './TemplateCard.css';

/**
 * Diagram template card component.
 * Displays template information with options to use, edit, or delete it.
 * Differentiates between system templates and user templates.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.template - Template data to display
 * @param {Function} props.onUseTemplate - Callback when using the template
 * @param {Function} props.onEditTemplate - Callback when editing the template
 * @param {Function} props.onDeleteTemplate - Callback when deleting the template
 * @param {boolean} props.isSystemTemplate - Indicates if it is a system template
 * @returns {JSX.Element} Template card element
 */
function TemplateCard({
  template,
  onUseTemplate,
  onEditTemplate,
  onDeleteTemplate,
  isSystemTemplate = false
}) {
  /**
   * Formats a date to relative format.
   * Shows relative time (minutes, hours, days) or absolute date based on age.
   *
   * @param {Date|string} date - Date to format
   * @returns {string} Text with the relatively formatted date
   */
  const formatRelativeDate = (date) => {
    if (!date) return 'Plantilla del sistema';
    
    const now = new Date();
    const templateDate = new Date(date);
    const diffMs = now - templateDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `Hace ${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'}`;
    } else if (diffHours < 24) {
      return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    } else if (diffDays < 7) {
      return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
    } else {
      return templateDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
  };

  /**
   * Handles the use template event.
   * Prevents default behavior and event propagation.
   *
   * @param {Event} e - Mouse click event
   */
  const handleUseTemplate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onUseTemplate) {
      onUseTemplate(template);
    }
  };

  /**
   * Handles the edit template event.
   * Prevents default behavior and event propagation.
   *
   * @param {Event} e - Mouse click event
   */
  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEditTemplate) {
      onEditTemplate(template);
    }
  };

  /**
   * Handles the delete template event.
   * Prevents default behavior and event propagation.
   *
   * @param {Event} e - Mouse click event
   */
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDeleteTemplate) {
      onDeleteTemplate(template);
    }
  };

  return (
    <article className="template-card-wrapper">
      <article className="template-card">

        {!isSystemTemplate && (
          <button
            className="template-card__delete-button"
            onClick={handleDelete}
            aria-label="Eliminar plantilla"
            title="Eliminar plantilla"
          >
            <FiTrash2 />
          </button>
        )}

        <figure className="template-card__icon">
          <FiFileText />
        </figure>

        <section className="template-card__content">
          <h3 className="template-card__title">{template.title}</h3>
          {template.description && (
            <p className="template-card__description">{template.description}</p>
          )}
        </section>

        <nav className="template-card__actions">
          <button
            className="template-card__action-button template-card__action-button--use"
            onClick={handleUseTemplate}
            title="Crear diagrama desde plantilla"
          >
            <FiFileText />
            <span>Usar</span>
          </button>
          
          {isSystemTemplate ? (
            <button
              className="template-card__action-button template-card__action-button--copy"
              onClick={handleEdit}
              title="Crear plantilla basada en esta"
            >
              <FiCopy />
              <span>Copiar</span>
            </button>
          ) : (
            <button
              className="template-card__action-button template-card__action-button--edit"
              onClick={handleEdit}
              title="Editar plantilla"
            >
              <FiEdit2 />
              <span>Editar</span>
            </button>
          )}
        </nav>
      </article>
    </article>
  );
}

export default TemplateCard;
