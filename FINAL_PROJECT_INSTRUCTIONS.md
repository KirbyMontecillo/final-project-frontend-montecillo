# Final Project: Full-Stack Authentication System Deployment

## Final Examination Requirements & Instructions

### 1. GitHub Repository Audit
Students must provide URLs to two distinct repositories. The instructor will check for:

* **Commit History:** Evidence of incremental development and configuration changes (e.g., setting up `environment.prod.ts` or `production config.json`).
* **Security Best Practices:** Ensure no sensitive data (like `JWT_SECRET` or database passwords) is hardcoded. These must be handled via `.env` files (ignored by git) or environment variables in the hosting platform.
* **README.md:** Must include links to the live deployed application and basic setup instructions.

### 2. Backend Deployment (Node.js + MySQL)
The API must be fully functional and accessible via a public URL.

* **Database Connectivity:** The remote MySQL instance must be correctly linked to the Node.js service.
* **API Documentation:** The `/api-docs` (Swagger) route must be active and testable.
* **Environment Variables:** Verify that `CORS_ORIGIN` is set to the specific URL of the deployed Angular frontend to allow cross-site requests.
* **Verification:** The instructor will register a new account and check if the verification email is "sent" (via Ethereal/Mailtrap logs or a real SMTP provider).

### 3. Frontend Deployment (Angular 21)
The frontend must be deployed as a Single Page Application (SPA).

* **Production Build:** The app must be compiled using `ng build --configuration production`.
* **Routing Fix:** For platforms like Render, students must demonstrate they implemented the "Rewrite Rule" (Source: `/*` to Destination: `/index.html`) so that deep links (like email verification links) do not return 404 errors.

### 4. Evaluation Stages

#### Stage A: Functional Testing (Fake Backend)
Before connecting to the live API, the student must demonstrate the app’s logic using the built-in "Fake Backend."

* **Requirement:** Enable the fake backend in `app.module.ts`.
* **Goal:** Prove that the Angular components, Guards, and Services are working correctly (Registration, Mock Email Alert, Login, and Admin access) without external dependencies.

#### Stage B: Integration Testing (Remote Backend)
The student must then disable the fake backend and connect the frontend to their live deployed Node.js API.

* **Requirement:** Update `src/environments/environment.prod.ts` with the remote API URL.
* **Authentication Flow Check:**
    * **Sign Up:** Register a real user on the live site.
    * **Email Verification:** Click the link in the verification email and ensure the backend updates the verified status in the MySQL database.
    * **JWT/Refresh Token:** Log in and inspect the browser "Application" tab to confirm the `refreshToken` cookie is set and the `jwtToken` is in memory.
    * **RBAC:** Log in with the first account created (Admin) to access the "Admin" management panel. Log in with a second account (User) to verify they are restricted from the Admin panel.
