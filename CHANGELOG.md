# Changelog

Todos los cambios notables en BossFlow serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Added
- Más características por llegar

### Changed

### Fixed

## [1.0.0] - 2026-02-12

### Added
- **Editor visual de diagramas** con soporte para nodos personalizados
- **Sistema de autenticación JWT** con registro e inicio de sesión
- **CRUD completo de diagramas** (crear, editar, eliminar, leer)
- **Dashboard** para gestionar diagramas
- **Sistema de plantillas reutilizables**
- **Exportación de diagramas en PNG** para compartir estrategias
- **Exportación/importación de diagramas en JSON**
- **Soporte para subir imágenes** asociadas a nodos
- **Perfil de usuario** con estadísticas y juegos favoritos
- **Arquitectura MERN** con MongoDB, Express, React y Node.js
- **Contenerización con Docker** para despliegue simplificado
- **CI/CD con GitHub Actions** (Security Scan, Docker Images, JSDoc)
- **Documentación completa** en `docs/` con guías de despliegue
- **Archivo CITATION.cff** para citar el proyecto
- **Política de seguridad** en SECURITY.md
- **Licencia MIT** para uso abierto
- **Archivo CONTRIBUTING.md** para contribuciones de la comunidad
- **Archivos de configuración** para desarrollo local con Docker Compose

### Changed
- **Refactorización de carpetas** a convención kebab-case
- **Código traducido al inglés** (frontend y backend)
- **Documentación mejorada** con badges y estructura actualizada
- **Configuración de seguridad** mejorada en variables de entorno
- **Actualización de rutas** en imports para coincidir con estructura de carpetas
- **Mejoras en la UI/UX** del editor de diagramas

### Fixed
- **Editor de diagramas reparado** después de refactorización
- **Importación de módulos corregida** después de reorganizar estructura
- **Rutas de documentación** actualizadas en referencias
- **Dependencias no utilizadas eliminadas**
- **Errores en DependaBot workflow** resueltos
- **Puerto del servicio frontend** modificado para evitar conflictos
- **Console statements removidos** del código limpiando la salida

### Removed
- Documentación interna relativa a entregas de proyecto que no aportan valor público
- Variables de entorno de producción del repositorio por seguridad

### Security
- **Trivy security scanner** agregado al CI/CD
- **Vulnerabilidades de dependencias** escaneadas automáticamente
- **Variables sensibles** removidas del repositorio
- **Mejores prácticas de seguridad** implementadas

## [0.1.0] - 2025-11-16

### Added
- Inicialización del proyecto
- Planificación del Sprint 3 con backlog
- Estructura base del proyecto MERN
- Configuración inicial de desarrollo

---

## Cómo contribuir

Si deseas contribuir a BossFlow, por favor revisa [CONTRIBUTING.md](./CONTRIBUTING.md) para más detalles sobre el proceso de contribución.

## Versionado

Este proyecto utiliza [Semantic Versioning](https://semver.org/lang/es/):
- **MAJOR**: Cambios incompatibles con versiones anteriores
- **MINOR**: Nuevas características compatibles hacia atrás
- **PATCH**: Correcciones de bugs compatibles hacia atrás
