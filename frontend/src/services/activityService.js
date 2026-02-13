// ============================================================
// File: activityService.js
// Description: Service for managing user activity history stored in localStorage.
// ============================================================

/**
 * Service for managing user activity records.
 * Stores activities in localStorage per user.
 */

const ACTIVITY_STORAGE_PREFIX = 'bossflow_activities_';
const MAX_ACTIVITIES = 10; // Maximum number of activities to keep

/**
 * Activity types
 */
export const ACTIVITY_TYPES = {
  CREATE: 'creation',
  EDIT: 'edition',
  DELETE: 'deletion',
  VIEW: 'view',
};

/**
 * Gets current user's ID from JWT token.
 * @returns {string|null} User ID or null if no session.
 */
const getCurrentUserId = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

/**
 * Gets the storage key for the current user.
 * @returns {string|null} Storage key or null if no user is logged in.
 */
const getStorageKey = () => {
  const userId = getCurrentUserId();
  if (!userId) return null;
  return `${ACTIVITY_STORAGE_PREFIX}${userId}`;
};

/**
 * Gets all activities for the current user.
 * @returns {Array} Array of activities sorted by date (most recent first).
 */
export const getActivities = () => {
  try {
    const storageKey = getStorageKey();
    if (!storageKey) return [];

    const activities = localStorage.getItem(storageKey);
    if (!activities) {
      return [];
    }
    return JSON.parse(activities);
  } catch (error) {
    return [];
  }
};

/**
 * Registers a new activity.
 * @param {string} type - Activity type (CREATE, EDIT, DELETE, VIEW).
 * @param {string} diagramTitle - Diagram title.
 * @param {string} diagramId - Diagram ID.
 */
export const registerActivity = (type, diagramTitle, diagramId) => {
  try {
    const storageKey = getStorageKey();
    if (!storageKey) return null;

    const activities = getActivities();

    const newActivity = {
      id: Date.now(),
      type,
      diagram: diagramTitle,
      diagramId,
      date: new Date().toISOString(),
    };

    activities.unshift(newActivity);

    const trimmedActivities = activities.slice(0, MAX_ACTIVITIES);

    localStorage.setItem(storageKey, JSON.stringify(trimmedActivities));

    return newActivity;
  } catch (error) {
    return null;
  }
};

/**
 * Formats a date as a relative time string.
 * @param {string} isoDate - Date in ISO format.
 * @returns {string} Relative formatted date string.
 */
export const formatRelativeDate = (isoDate) => {
  const now = new Date();
  const activityDate = new Date(isoDate);
  const diffMs = now - activityDate;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return 'Hace un momento';
  } else if (diffMins < 60) {
    return `Hace ${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'}`;
  } else if (diffHours < 24) {
    return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
  } else if (diffDays < 7) {
    return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
  } else {
    return activityDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
};

/**
 * Clears all activities for the current user.
 */
export const clearActivities = () => {
  try {
    const storageKey = getStorageKey();
    if (!storageKey) return;
    localStorage.removeItem(storageKey);
  } catch (error) {
  }
};

/**
 * Gets activities formatted for display.
 * @returns {Array} Array of activities with formatted dates.
 */
export const getFormattedActivities = () => {
  const activities = getActivities();
  return activities.map((activity) => ({
    ...activity,
    formattedDate: formatRelativeDate(activity.date),
  }));
};

export default {
  getActivities,
  registerActivity,
  formatRelativeDate,
  clearActivities,
  getFormattedActivities,
  ACTIVITY_TYPES,
};
