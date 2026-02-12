// ============================================================
// File: Templates.jsx
// Description: Templates management page for browsing default templates and managing user templates.
// ============================================================
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTemplates, deleteTemplate } from '../services/diagramService';
import TemplateList from '../components/template-list/TemplateList';
import NewDiagramModal from '../components/new-diagram-modal/NewDiagramModal';
import NewTemplateModal from '../components/new-template-modal/NewTemplateModal';
import ConfirmModal from '../components/confirm-modal/ConfirmModal';
import { DEFAULT_TEMPLATES } from '../data/defaultTemplates';
import { useToast } from '../context/ToastContext';
import {
  FiHome,
  FiFileText,
  FiLayers,
  FiUsers,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiPlus,
} from 'react-icons/fi';
import './Dashboard.css';

/**
 * BossFlow templates page.
 * Displays default templates and allows users to create and manage their own templates.
 * @returns {React.ReactElement} The templates page component.
 */
function Templates() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [templates, setTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [errorTemplates, setErrorTemplates] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [templateNodes, setTemplateNodes] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('predeterminadas');

  /**
   * Sets the page title when the component mounts.
   */
  useEffect(() => {
    document.title = 'Plantillas | BossFlow';
  }, []);

  /**
   * Loads user templates from the server.
   */
  const fetchTemplates = async () => {
    try {
      setLoadingTemplates(true);
      setErrorTemplates(null);
      const response = await getTemplates();
      setTemplates(response.templates || []);
    } catch (error) {
      setErrorTemplates('No se pudieron cargar las plantillas.');
      setTemplates([]);
    } finally {
      setLoadingTemplates(false);
    }
  };

  /**
   * Loads templates when switching to the my templates tab.
   */
  useEffect(() => {
    if (activeTab === 'my-templates') {
      fetchTemplates();
    }
  }, [activeTab]);

  /**
   * Logs out the user and redirects to home.
   */
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  /**
   * Handles using a template to create a new diagram.
   * @param {Object} template - Template to use.
   */
  const handleUseTemplate = (template) => {
    setTemplateNodes({
      nodes: template.nodes || [],
      edges: template.edges || []
    });
    setIsModalOpen(true);
  };

  /**
   * Handles the event of creating a new diagram from a template.
   */
  const handleDiagramCreated = () => {
    setIsModalOpen(false);
    setTemplateNodes(null);
  };

  /**
   * Handles the event of creating a new template.
   */
  const handleTemplateCreated = () => {
    fetchTemplates();
    setIsTemplateModalOpen(false);
    setEditingTemplate(null);
  };

  /**
   * Prepares a template for editing.
   * @param {Object} template - Template to edit.
   */
  const handleEditTemplate = (template) => {
    if (activeTab === 'predeterminadas') {
      setEditingTemplate(template);
      setIsTemplateModalOpen(true);
    } else {
      setEditingTemplate(template);
      setIsTemplateModalOpen(true);
    }
  };

  /**
   * Prepares a template for deletion.
   * @param {Object} template - Template to delete.
   */
  const handleDeleteTemplate = (template) => {
    setTemplateToDelete(template);
  };

  /**
   * Confirms and executes template deletion.
   */
  const handleConfirmDelete = async () => {
    if (!templateToDelete) return;

    try {
      await deleteTemplate(templateToDelete._id);
      toast.success('Plantilla eliminada correctamente');
      fetchTemplates();
    } catch (error) {
      toast.error('No se pudo eliminar la plantilla');
    } finally {
      setTemplateToDelete(null);
    }
  };

  const displayedTemplates = activeTab === 'predeterminadas' 
    ? DEFAULT_TEMPLATES
    : templates;

  const isLoading = activeTab === 'my-templates' && loadingTemplates;
  const currentError = activeTab === 'my-templates' ? errorTemplates : null;

  return (
    <section className="dashboard">
      <aside className="dashboard__sidebar">
        <section className="dashboard__sidebar-content">
          <header className="dashboard__logo">
            <h2>BossFlow</h2>
          </header>

          <nav className="dashboard__nav">
            <Link
              to="/dashboard"
              className="dashboard__nav-item"
            >
              <FiHome className="dashboard__nav-icon" />
              <span>Inicio</span>
            </Link>

            <Link
              to="/dashboard"
              className="dashboard__nav-item"
            >
              <FiFileText className="dashboard__nav-icon" />
              <span>Mis diagramas</span>
            </Link>

            <Link
              to="/dashboard/collaborations"
              className="dashboard__nav-item"
            >
              <FiUsers className="dashboard__nav-icon" />
              <span>Colaboraciones</span>
            </Link>

            <Link
              to="/dashboard/templates"
              className="dashboard__nav-item dashboard__nav-item--active"
            >
              <FiLayers className="dashboard__nav-icon" />
              <span>Plantillas</span>
            </Link>

            <Link
              to="/dashboard/comments"
              className="dashboard__nav-item"
            >
              <FiMessageSquare className="dashboard__nav-icon" />
              <span>Comentarios</span>
            </Link>

            <Link
              to="/settings"
              className="dashboard__nav-item"
            >
              <FiSettings className="dashboard__nav-icon" />
              <span>Configuración</span>
            </Link>
          </nav>

          <button className="dashboard__logout" onClick={handleLogout}>
            <FiLogOut className="dashboard__nav-icon" />
            <span>Cerrar sesión</span>
          </button>
        </section>
      </aside>

      {/* Main content */}
      <main className="dashboard__main">
        <section className="dashboard__section">
          <header className="dashboard__section-header">
            <section>
              <h2 className="dashboard__title">Plantillas</h2>
              <p className="dashboard__description">
                Crea diagramas rápidamente usando plantillas predefinidas
              </p>
            </section>
            <button
              onClick={() => setIsTemplateModalOpen(true)}
              className="dashboard__new-button"
            >
              <FiPlus className="dashboard__button-icon" />
              Nueva plantilla
            </button>
          </header>

          {/* Tabs */}
          <nav className="dashboard__tabs">
            <button
              className={`dashboard__tab ${activeTab === 'predeterminadas' ? 'dashboard__tab--active' : ''}`}
              onClick={() => setActiveTab('predeterminadas')}
            >
              Predeterminadas
            </button>
            <button
              className={`dashboard__tab ${activeTab === 'my-templates' ? 'dashboard__tab--active' : ''}`}
              onClick={() => setActiveTab('my-templates')}
            >
              Mis plantillas
            </button>
          </nav>

          <TemplateList
            templates={displayedTemplates}
            loading={isLoading}
            error={currentError}
            onUseTemplate={handleUseTemplate}
            onEditTemplate={handleEditTemplate}
            onDeleteTemplate={handleDeleteTemplate}
            onRetry={fetchTemplates}
            onCreateTemplate={() => setIsTemplateModalOpen(true)}
            showCreateButton={activeTab === 'my-templates'}
            isSystemTemplates={activeTab === 'predeterminadas'}
          />
        </section>
      </main>

      {/* Modal for creating a new diagram from a template */}
      <NewDiagramModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTemplateNodes(null);
        }}
        onDiagramCreated={handleDiagramCreated}
        initialNodes={templateNodes?.nodes}
        initialEdges={templateNodes?.edges}
      />

      {/* Modal for creating a new template */}
      <NewTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => {
          setIsTemplateModalOpen(false);
          setEditingTemplate(null);
        }}
        onTemplateCreated={handleTemplateCreated}
        initialNodes={editingTemplate?.nodes}
        initialEdges={editingTemplate?.edges}
        initialTitle={
          editingTemplate 
            ? (activeTab === 'predeterminadas' 
                ? `Copia de ${editingTemplate.title}` 
                : editingTemplate.title)
            : ''
        }
        initialDescription={editingTemplate?.description || ''}
        editingTemplateId={
          activeTab === 'my-templates' && editingTemplate 
            ? editingTemplate.id
            : null
        }
      />

      {/* Confirmation modal for deletion */}
      <ConfirmModal
        isOpen={!!templateToDelete}
        onClose={() => setTemplateToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar plantilla?"
        message={`¿Estás seguro de que quieres eliminar la plantilla "${templateToDelete?.title}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </section>
  );
}

export default Templates;
