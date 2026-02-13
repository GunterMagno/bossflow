# Contribuciones a Bossflow 👿⚔️

¡Gracias por tu interés en contribuir a Bossflow! Tu ayuda es esencial para que esta herramienta se convierta en la plataforma definitiva para planificar estrategias contra los jefes más difíciles.

## Nuestra Visión

**Bossflow** se dedica a simplificar la gestión de tácticas de videojuegos mediante diagramas de flujo interactivos. Creemos que la fragmentación de guías en texto debe dar paso a herramientas visuales colaborativas. Buscamos que cualquier comunidad de gamers pueda optimizar su rendimiento compartiendo conocimiento de forma clara y accesible.

## Compartiendo en Redes Sociales

¡Ayúdanos a que la comunidad crezca!
- **Comparte tu Experiencia:** Publica tus estrategias o capturas del editor etiquetándonos.
- **Feedback:** Si tienes sugerencias sobre nuevos tipos de nodos o funciones del editor, ¡queremos escucharlas!


## Cómo Reportar Errores o Sugerencias

Utilizamos las plantillas predefinidas en el repositorio para mantener el orden:

1.  **Crear un Issue:** Ve a la pestaña "Issues" y selecciona la plantilla adecuada:
    - `[ERROR]`: Para fallos técnicos (bugs).
    - `[FUNCIONALIDAD]`: Para proponer nuevas herramientas o mejoras.
    - `[PREGUNTA]`: Para dudas sobre el funcionamiento.
2.  **Describe el Problema:** Por favor, incluye pasos para reproducir el error y, si es posible, capturas de pantalla. Para nuevas funciones, explica el beneficio para el jugador.
3.  **Etiquetas:** Nuestro equipo asignará etiquetas como `bug`, `enhancement` o `help wanted`.


## Configuración del Entorno de Desarrollo

Bossflow utiliza un **Stack MERN** (MongoDB, Express, React, Node) y está containerizado con **Docker**.

### Requisitos Previos
- Node.js v18+ y npm.
- Docker y Docker Compose (recomendado).

### Pasos para iniciar:
1.  **Hacer un Fork** y clonar el repositorio.
2.  **Configurar Variables de Entorno:** Copia el archivo `.env.example` a `.env` tanto en la raíz como dentro de `backend/`.
3.  **Levantar el proyecto con Docker (Método recomendado):**
    ```bash
        `docker-compose -f docker-compose.dev.yml up --build`
    ```
   
4.  **Desarrollo Local (Sin Docker):**
    - **Backend:** `cd backend && npm install && npm run dev` (Corre en puerto 5000).
    - **Frontend:** `cd frontend && npm install && npm run dev` (Corre en puerto 5173).


## Guía para Contribuir Código

### Estructura del Proyecto
-   `frontend/src/components/nodes/`: Aquí se definen los **nodos personalizados** de React Flow. Si quieres añadir un nuevo tipo de acción o decisión, este es el lugar.
-   `backend/controllers/`: Lógica de la API (Diagramas, Usuarios, Imágenes).
-   `docs/`: Consulta la documentación aquí (También tienes documentación específica en el backedn/frontend).

### Flujo de Trabajo
1.  Crea una rama descriptiva:
    - Para errores: `fix/issue-id`
    - Para mejoras: `feature/nombre-funcion`
2.  **Calidad de Código:** Antes de subir tus cambios, ejecuta el linter.
3.  **Pruebas:** Si trabajas en el backend, asegúrate de que los tests pasen:
    ```bash
    cd backend && npm test
    ```
4.  **Pull Request:** Envía tu PR hacia la rama `develop`. Asegúrate de rellenar la **PR Template** correspondiente (feature, hotfix o release) que aparecerá al crearla.


## Convenciones de Código
-   **Backend:** Sigue el estilo CommonJS (require/module.exports). Los modelos deben usar Mongoose según los esquemas en `backend/models/`.
-   **Frontend:** Componentes funcionales de React con hooks. Usa la **Context API** (`AuthContext`, `ToastContext`) para estados globales.
-   **SVG:** Los iconos nuevos deben añadirse en `frontend/src/components/nodes/icons.jsx` usando `currentColor` para permitir el estilo dinámico.


## Conviértete en Colaborador Oficial

Si te apasiona el proyecto y quieres un rol activo:
1.  Realiza al menos 3 contribuciones significativas (código o documentación).
2.  Contacta con los mantenedores: **Alejandro Borrego, Jesús López o Daniel Montes** a través de sus perfiles de GitHub o enviando un correo a `bosslflow1@gmail.com`.

## Agradecimientos

Agradecemos a todos los colaboradores que ayudan a mejorar la experiencia de juego de miles de personas. Tu pasión por el desarrollo y los videojuegos es lo que hace que **Bossflow** sea posible.

¡Nos vemos en el editor! 🎮

### Notas técnicas para el contribuidor:
- El editor de diagramas utiliza **React Flow v11**.
- Las imágenes subidas se limitan a **5MB** y se almacenan en `backend/uploads/images/`.
- Consulta el archivo `docs/api/estructura-nodos-json.md` para entender cómo se guardan los datos antes de modificar el motor de guardado.