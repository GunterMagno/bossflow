// ============================================================
// File: Dashboard.jsx
// Description: Main user dashboard displaying statistics, recent diagrams, and activity feed.
// ============================================================
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDiagrams } from '../services/diagramService';
import { getStats } from '../services/profileService';
import { getFormattedActivities } from '../services/activityService';
import DiagramList from '../components/diagram-list/DiagramList';
import NewDiagramModal from '../components/new-diagram-modal/NewDiagramModal';
import {
  FiHome,
  FiFileText,
  FiLayers,
  FiUsers,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiPlus,
  FiCopy,
  FiUser,
  FiTrendingUp,
  FiClock,
} from 'react-icons/fi';
import './Dashboard.css';

/**
 * Main dashboard page for the user
 * Displays statistics, diagrams, activities and main navigation
 * @returns {JSX.Element} Dashboard with sidebar, main menu and dynamic content
 */
function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('home');
  const [diagrams, setDiagrams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    document.title = 'Dashboard | BossFlow';
  }, []);

  /**
   * Loads the user's list of diagrams from the server
   */
  const fetchDiagrams = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDiagrams();
      setDiagrams(response.diagrams || []);
    } catch (error) {
      setError('Could not load diagrams. The endpoint is not yet available.');
      setDiagrams([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Loads the user's statistics from the server
   */
  const fetchStats = async () => {
    try {
      const response = await getStats();
      setUserStats(response.stats);
    } catch (error) {
      // Statistics loading failed silently
    }
  };

  useEffect(() => {
    fetchDiagrams();
    loadActivities();
    fetchStats();
  }, []);

  /**
   * Loads and formats the user's recent activities
   */
  const loadActivities = () => {
    const formattedActivities = getFormattedActivities();
    setActivities(formattedActivities);
  };

  /**
   * Executes user logout and redirects to the main page
   */
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  /**
   * Refreshes data after creating a new diagram
   */
  const handleDiagramCreated = () => {
    fetchDiagrams();
    loadActivities();
    fetchStats();
  };

  /**
   * Refreshes data after deleting a diagram
   */
  const handleDiagramDeleted = () => {
    fetchDiagrams();
    loadActivities();
    fetchStats();
  };

  /**
   * Formats a date in relative format (X time ago)
   * @param {string|Date} date - Date to format
   * @returns {string} Date formatted in relative format
   */
  const formatRelativeDate = (date) => {
    const now = new Date();
    const diagramDate = new Date(date);
    const diffMs = now - diagramDate;
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
      return diagramDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
  };

  const statistics = userStats ? {
    totalDiagrams: userStats.diagramsCreated || diagrams.length,
    totalNodes: userStats.nodesCreated || 0,
    collaborations: userStats.collaborations || 0,
    templates: 0,
    pendingComments: 0,
  } : {
    totalDiagrams: diagrams.length,
    totalNodes: 0,
    collaborations: 0,
    templates: 0,
    pendingComments: 0,
  };

  const recentDiagrams = diagrams.slice(0, 3);

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
              className={`dashboard__nav-item ${
                activeMenu === 'home' ? 'dashboard__nav-item--active' : ''
              }`}
              onClick={() => setActiveMenu('home')}
            >
              <FiHome className="dashboard__nav-icon" />
              <span>Inicio</span>
            </Link>

            <Link
              to="/dashboard"
              className={`dashboard__nav-item ${
                activeMenu === 'my-diagrams' ? 'dashboard__nav-item--active' : ''
              }`}
              onClick={() => setActiveMenu('my-diagrams')}
            >
              <FiFileText className="dashboard__nav-icon" />
              <span>Mis diagramas</span>
            </Link>

            <Link
              to="/dashboard/collaborations"
              className={`dashboard__nav-item ${
                activeMenu === 'collaborations' ? 'dashboard__nav-item--active' : ''
              }`}
              onClick={() => setActiveMenu('collaborations')}
            >
              <FiUsers className="dashboard__nav-icon" />
              <span>Colaboraciones</span>
            </Link>

            <Link
              to="/dashboard/templates"
              className={`dashboard__nav-item ${
                activeMenu === 'templates' ? 'dashboard__nav-item--active' : ''
              }`}
              onClick={() => setActiveMenu('templates')}
            >
              <FiLayers className="dashboard__nav-icon" />
              <span>Plantillas</span>
            </Link>

            <Link
              to="/dashboard/comments"
              className={`dashboard__nav-item ${
                activeMenu === 'comments' ? 'dashboard__nav-item--active' : ''
              }`}
              onClick={() => setActiveMenu('comments')}
            >
              <FiMessageSquare className="dashboard__nav-icon" />
              <span>Comentarios</span>
            </Link>

            <Link
              to="/settings"
              className={`dashboard__nav-item ${
                activeMenu === 'settings' ? 'dashboard__nav-item--active' : ''
              }`}
              onClick={() => setActiveMenu('settings')}
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
        {activeMenu === 'home' && (
          <>
            {/* Statistics */}
            <section className="dashboard__section">
              <header className="dashboard__section-header">
                <section>
                  <h2 className="dashboard__title">Resumen</h2>
                  <p className="dashboard__description">
                    Vista general de tu actividad
                  </p>
                </section>
              </header>

              <section className="dashboard__stats-grid">
                <article className="dashboard__stat-card">
                  <figure className="dashboard__stat-icon">
                    <FiFileText />
                  </figure>
                  <section className="dashboard__stat-content">
                    <h3 className="dashboard__stat-number">{statistics.totalDiagrams}</h3>
                    <p className="dashboard__stat-label">Mis diagramas</p>
                  </section>
                </article>

                <article className="dashboard__stat-card">
                  <figure className="dashboard__stat-icon">
                    <FiUsers />
                  </figure>
                  <section className="dashboard__stat-content">
                    <h3 className="dashboard__stat-number">{statistics.collaborations}</h3>
                    <p className="dashboard__stat-label">Colaboraciones</p>
                  </section>
                </article>

                <article className="dashboard__stat-card">
                  <figure className="dashboard__stat-icon">
                    <FiCopy />
                  </figure>
                  <section className="dashboard__stat-content">
                    <h3 className="dashboard__stat-number">{statistics.totalNodes}</h3>
                    <p className="dashboard__stat-label">Nodos creados</p>
                  </section>
                </article>

                <article className="dashboard__stat-card">
                  <figure className="dashboard__stat-icon">
                    <FiMessageSquare />
                  </figure>
                  <section className="dashboard__stat-content">
                    <h3 className="dashboard__stat-number">{statistics.pendingComments}</h3>
                    <p className="dashboard__stat-label">Comentarios</p>
                  </section>
                </article>
              </section>
            </section>

            {/* Quick access */}
            <section className="dashboard__section">
              <header className="dashboard__section-header">
                <section>
                  <h2 className="dashboard__title">Acceso rápido</h2>
                  <p className="dashboard__description">
                    Tus diagramas más recientes
                  </p>
                </section>
              <section>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="dashboard__new-button"
                >
                  <FiPlus className="dashboard__button-icon" />
                  Nuevo diagrama
                </button>
              </section>
              </header>

              {loading ? (
                <article className="dashboard__loading">
                  <figure className="dashboard__spinner"></figure>
                  <p>Cargando diagramas...</p>
                </article>
              ) : error ? (
                <article className="dashboard__error">
                  <p className="dashboard__error-message">{error}</p>
                </article>
              ) : recentDiagrams.length > 0 ? (
                <section className="dashboard__grid">
                  {recentDiagrams.map((diagram) => (
                    <Link
                      key={diagram.id}
                      to={`/editor/${diagram.id}`}
                      className="dashboard__card"
                    >
                      <figure className="dashboard__card-icon">
                        <FiFileText />
                      </figure>

                      <article className="dashboard__card-content">
                        <h3 className="dashboard__card-title">{diagram.title}</h3>
                        {diagram.description && (
                          <p className="dashboard__card-description">
                            {diagram.description}
                          </p>
                        )}

                        <footer className="dashboard__card-footer">
                          <section className="dashboard__card-info">
                            <span className="dashboard__card-date">
                              <FiClock className="dashboard__info-icon" />
                              {formatRelativeDate(diagram.updatedAt)}
                            </span>
                            <section className="dashboard__card-stats">
                              <span>{(diagram.nodes ? diagram.nodes.length : 0)} nodos</span>
                              <span className="dashboard__stat-separator">•</span>
                              <span>{(diagram.edges ? diagram.edges.length : 0)} conexiones</span>
                            </section>
                          </section>
                        </footer>
                      </article>
                    </Link>
                  ))}
                </section>
              ) : (
                <article className="dashboard__empty">
                  <p>No tienes diagramas todavía. Crea tu primer diagrama para empezar.</p>
                </article>
              )}
            </section>

            {/* Recent activity */}
            <section className="dashboard__section">
              <header className="dashboard__section-header">
                <section>
                  <h2 className="dashboard__title">Actividad reciente</h2>
                  <p className="dashboard__description">
                    Tus últimas acciones
                  </p>
                </section>
              </header>

              {activities.length > 0 ? (
                <ul className="dashboard__activity-list">
                  {activities.map((activity) => (
                    <li key={activity.id} className="dashboard__activity-item">
                      <figure className="dashboard__activity-icon">
                        <FiClock />
                      </figure>
                      <article className="dashboard__activity-content">
                        <p className="dashboard__activity-text">
                          <span className="dashboard__activity-action">
                            {activity.type === 'creation' && 'Creaste'}
                            {activity.type === 'edition' && 'Editaste'}
                            {activity.type === 'deletion' && 'Eliminaste'}
                            {activity.type === 'view' && 'Visualizaste'}
                          </span>
                          {' '}<span className="dashboard__activity-diagram">{activity.diagram}</span>
                        </p>
                        <span className="dashboard__activity-date">{activity.formattedDate}</span>
                      </article>
                    </li>
                  ))}
                </ul>
              ) : (
                <article className="dashboard__empty">
                  <p>No hay actividad reciente. Crea o edita diagramas para ver tu actividad aquí.</p>
                </article>
              )}
            </section>
          </>
        )}

        {activeMenu === 'my-diagrams' && (
          <section className="dashboard__section">
            <header className="dashboard__section-header">
              <section>
                <h2 className="dashboard__title">Mis Diagramas</h2>
                <p className="dashboard__description">
                  Gestiona y crea tus diagramas
                </p>
              </section>
              <button
                onClick={() => setIsModalOpen(true)}
                className="dashboard__new-button"
              >
                <FiPlus className="dashboard__button-icon" />
                Nuevo diagrama
              </button>
            </header>

            <DiagramList
              onCreateClick={() => setIsModalOpen(true)}
              onDiagramDeleted={handleDiagramDeleted}
            />
          </section>
        )}
      </main>

      {/* Modal for creating a new diagram */}
      <NewDiagramModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDiagramCreated={handleDiagramCreated}
      />

      <nav className="dashboard__mobile-nav">
        <button
          className={`dashboard__mobile-nav-item ${activeMenu === 'home' ? 'dashboard__mobile-nav-item--active' : ''}`}
          onClick={() => setActiveMenu('home')}
          aria-label="Inicio"
        >
          <FiHome />
          <span>Inicio</span>
        </button>
        <button
          className={`dashboard__mobile-nav-item ${activeMenu === 'my-diagrams' ? 'dashboard__mobile-nav-item--active' : ''}`}
          onClick={() => setActiveMenu('my-diagrams')}
          aria-label="Mis diagramas"
        >
          <FiFileText />
          <span>Diagramas</span>
        </button>
        <button
          className={`dashboard__mobile-nav-item ${activeMenu === 'templates' ? 'dashboard__mobile-nav-item--active' : ''}`}
          onClick={() => { setActiveMenu('templates'); navigate('/dashboard/templates'); }}
          aria-label="Plantillas"
        >
          <FiLayers />
          <span>Plantillas</span>
        </button>
        <button
          className="dashboard__mobile-nav-item dashboard__mobile-nav-item--new"
          onClick={() => setIsModalOpen(true)}
          aria-label="Nuevo diagrama"
        >
          <FiPlus />
        </button>
        <button
          className={`dashboard__mobile-nav-item ${activeMenu === 'comments' ? 'dashboard__mobile-nav-item--active' : ''}`}
          onClick={() => setActiveMenu('comments')}
          aria-label="Comentarios"
        >
          <FiMessageSquare />
          <span>Comentarios</span>
        </button>
        <button
          className={`dashboard__mobile-nav-item ${activeMenu === 'collaborations' ? 'dashboard__mobile-nav-item--active' : ''}`}
          onClick={() => setActiveMenu('collaborations')}
          aria-label="Colaboraciones"
        >
          <FiUsers />
          <span>Colaborar</span>
        </button>
        <button
          className={`dashboard__mobile-nav-item ${activeMenu === 'settings' ? 'dashboard__mobile-nav-item--active' : ''}`}
          onClick={() => navigate('/settings')}
          aria-label="Configuración"
        >
          <FiSettings />
          <span>Config</span>
        </button>
      </nav>
    </section>
  );
}

export default Dashboard;
