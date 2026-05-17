# Final Project: Full-Stack Authentication System Deployment

## Final Examination Requirements & Instructions

---

### 1. GitHub Repository Audit

Students must provide URLs to **two distinct repositories**. The instructor will check for:

| Check | Description |
|-------|-------------|
| **Commit History** | Evidence of incremental development and configuration changes (e.g., setting up `environment.prod.ts` or `production config.json`) |
| **Security Best Practices** | No sensitive data (e.g., `JWT_SECRET`, database passwords) hardcoded — must use `.env` files (ignored by git) or platform environment variables |
| **README.md** | Must include links to the live deployed application and basic setup instructions |

---

### 2. Backend Deployment (Node.js + MySQL)

The API must be **fully functional and accessible via a public URL**.

- **Database Connectivity:** The remote MySQL instance must be correctly linked to the Node.js service.
- **API Documentation:** The `/api-docs` (Swagger) route must be active and testable.
- **Environment Variables:** Verify that `CORS_ORIGIN` is set to the specific URL of the deployed Angular frontend to allow cross-site requests.
- **Verification:** The instructor will register a new account and check if the verification email is "sent" (via Ethereal/Mailtrap logs or a real SMTP provider).

---

### 3. Frontend Deployment (Angular 21)

The frontend must be deployed as a **Single Page Application (SPA)**.

- **Production Build:** The app must be compiled using:
  ```bash
  ng build --configuration production
  ```
- **Routing Fix:** For platforms like Render, students must demonstrate they implemented the **"Rewrite Rule"**:
  - Source: `/*`
  - Destination: `/index.html`
  
  > This ensures that deep links (like email verification links) do not return `404` errors.

---

### 4. Evaluation Stages

#### ✅ Stage A: Functional Testing (Fake Backend)

Before connecting to the live API, the student must demonstrate the app's logic using the **built-in "Fake Backend"**.

| Item | Detail |
|------|--------|
| **Requirement** | Enable the fake backend in `app.module.ts` |
| **Goal** | Prove that Angular components, Guards, and Services work correctly **without external dependencies** |

**Expected demos:**
- Registration
- Mock Email Alert
- Login
- Admin access

---

#### ✅ Stage B: Integration Testing (Remote Backend)

The student must then **disable the fake backend** and connect the frontend to their live deployed Node.js API.

- **Requirement:** Update `src/environments/environment.prod.ts` with the remote API URL.

**Authentication Flow Checklist:**

| Step | Action | Verification |
|------|--------|-------------|
| **Sign Up** | Register a real user on the live site | User record created in MySQL |
| **Email Verification** | Click the link in the verification email | Backend updates `verified` status in the MySQL database |
| **JWT / Refresh Token** | Log in and inspect the browser **Application** tab | `refreshToken` cookie is set; `jwtToken` is in memory |
| **RBAC** | Log in with the **first account** created (Admin) | Access to the "Admin" management panel is granted |
| **RBAC** | Log in with a **second account** (User) | Access to the Admin panel is **restricted** |

---

## 📋 Submission Checklist

- [ ] Backend repository URL submitted (with commit history)
- [ ] Frontend repository URL submitted (with commit history)
- [ ] No sensitive credentials committed to either repository
- [ ] README.md includes live URL and setup instructions
- [ ] Backend live URL is accessible (`/api-docs` is reachable)
- [ ] `CORS_ORIGIN` environment variable configured correctly
- [ ] Frontend deployed with production build
- [ ] Rewrite rule configured for SPA routing
- [ ] Stage A (Fake Backend) demo ready
- [ ] Stage B (Remote Backend) full auth flow verified

---

> **Note:** Both repositories must reflect a clean, professional commit history that demonstrates the development process, not just a single initial commit.
