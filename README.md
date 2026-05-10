# Final Project: Full-Stack Authentication System

## Live Application URL
[ INSERT YOUR FRONTEND URL HERE ]

---

## Final Examination Requirements

### Stage A: Functional Testing (Fake Backend)
- Status: Integrated
- Implementation: Enable fakeBackendProvider in app.module.ts.
- Objective: Demonstrate application logic and UI functionality without external dependencies.

### Stage B: Integration Testing (Remote Backend)
- Status: Integrated
- Implementation: Disable fakeBackendProvider and configure environment.prod.ts to point to the live API.
- Objective: Demonstrate end-to-end integration with the Node.js API and MySQL database.

---

## Features Overview
This project provides a comprehensive authentication flow using Angular 21:

Email sign up + email verification

Login + logout

JWT auth header for API requests

Refresh tokens (cookie-based) + auto-refresh before access token expiry

Forgot password + reset password

Role-based authorization (User & Admin)

Admin area for account management

Profile area for viewing/updating your own account

## Table of Contents
Prerequisites

Run the App (Real API)

Run the App (Fake Backend, No API)

Using the App (What to Click)

How Authentication Works

Authorization (Roles + Route Guards)

Project Structure (Quick Tour)

Troubleshooting

## 1) Prerequisites
Node.js (LTS recommended)

npm (comes with Node.js)

(Optional) Angular CLI: npm i -g @angular/cli

## 2) Run the App (Real API)
By default, this project is set up to call a real API at http://localhost:4000 (see src/environments/environment.ts).

### Step 1: Install Packages
From the project root (where package.json is):

Bash
npm install
### Step 2: Start Your Backend API
Start an API that implements the /accounts/* endpoints described in the How Authentication Works section. The frontend expects the API to be available at http://localhost:4000 by default.

### Step 3: Start Angular
Bash
npm start
This runs ng serve --open and should open the app in your browser.

### Step 4: Update API URL (If Your API Runs Elsewhere)
Edit the environment file:

src/environments/environment.ts (development)

src/environments/environment.prod.ts (production build)

Update the apiUrl:

TypeScript
apiUrl: 'http://localhost:4000'
## 3) Run the App (Fake Backend, No API)
If you want to run everything fully in the browser (no backend), you can enable the built-in fake backend interceptor.

### Step 1: Enable the Fake Backend Provider
Open src/app/app.module.ts and uncomment the fakeBackendProvider line in the providers array:

TypeScript
providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
],
### Step 2: Run the App
Bash
npm install
npm start
### How the Fake Backend Behaves
Storage: Accounts are stored in your browser localStorage, not in a database.

Emails: Verification and reset password links are displayed in the UI as alerts since a browser-only app cannot send real emails.

Roles: The first registered account becomes an Admin, and all subsequent accounts become User.

Note: To reset the fake backend, clear site data in your browser or delete the key: angular-15-signup-verification-boilerplate-accounts.

## 4) Using the App (What to Click)
### A) Create an Account
Go to Register.

Fill in your details and submit.

If using the fake backend, a "verification email" will appear as an alert with a link.

Click the link (or paste it into the browser) to verify.

### B) Login
Go to Login.

Enter your credentials.

On success, you will be redirected to the Home page.

## 5) How Authentication Works
This boilerplate uses two tokens:

Access Token (JWT): A short-lived token used in the Authorization: Bearer <token> header.

Refresh Token: A long-lived token stored in a secure cookie and sent with withCredentials: true.

### Flow: Login
LoginComponent calls AccountService.login().

The API returns an Account object including the jwtToken.

The app stores the account in memory (BehaviorSubject) and starts a refresh timer.

For future requests, the JWT Interceptor attaches the token.

### Flow: Refresh Token
The refresh token is sent to the API using cookies.

The API responds with a new access token.

The app auto-refreshes about 1 minute before the access token expires.

On page reload, APP_INITIALIZER calls refresh to restore the session.

## 6) Authorization (Roles + Route Guards)
Routes are protected with AuthGuard:

Not logged in: Redirected to /account/login.

Wrong role: Redirected to /.

Example: The /admin path requires Role.Admin.

## 7) Project Structure (Quick Tour)
_services/: Shared services (Account, Alert).

_helpers/: Guards, interceptors, and the fake backend.

_models/: Shared types (Account, Role).

account/: Auth screens (Login, Register, Verify).

profile/: User-specific screens.

admin/: Management screens.

## 8) Troubleshooting
Redirected back to Login: Ensure your real API supports POST /accounts/refresh-token and sets the cookie.

CORS Errors: When calling an API on another port, ensure the backend returns Access-Control-Allow-Credentials: true and specifically allows your frontend origin.

Unit Tests: Run npm test.