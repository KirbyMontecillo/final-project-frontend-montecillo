# Connection Guide: Frontend to Backend

Follow these steps to connect your Angular frontend to the Node.js API and MySQL database.

## 1. Frontend Configuration (Angular)

### Disable Fake Backend
By default, the project uses a "Fake Backend" for testing without an API. To connect to your real API:
1. Open `src/app/app.module.ts`.
2. Locate the `providers` array.
3. **Comment out** the `fakeBackendProvider` line:
   ```typescript
   providers: [
       { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
       { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
       { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

       // provider used to create fake backend
       // fakeBackendProvider  <-- COMMENT THIS LINE
   ],
   ```

### Check Environment Variables
Ensure `src/environments/environment.ts` (and `environment.prod.ts` for production) has the correct `apiUrl`:
```typescript
export const environment = {
    production: false,
    apiUrl: 'http://localhost:4000'
};
```

---

## 2. Backend Configuration (Node.js)

### Configure .env
In your `node-mysql-api` folder, ensure your `.env` file matches your local environment:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=121003
DB_NAME=node_mysql_api
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:4200
```
*Note: Ensure `CORS_ORIGIN` matches the URL where your Angular app is running.*

---

## 3. Database Setup (MySQL)

Ensure your MySQL server is running and the database exists:
1. Open your MySQL client (e.g., MySQL Workbench or Command Line).
2. Create the database if it doesn't exist:
   ```sql
   CREATE DATABASE IF NOT EXISTS node_mysql_api;
   ```

---

## 4. Running the Application

### Start the Backend
1. Open a terminal in the `node-mysql-api` folder.
2. Run: `npm start`
3. You should see: `Server listening on port 4000`

### Start the Frontend
1. Open a terminal in the `final-project-montecillo` folder.
2. Run: `npm start`
3. The app will open at `http://localhost:4200`.

---

## 5. Testing the Connection
1. Go to the **Register** page.
2. Create a new account.
3. If successful, you will be redirected to the login page, and you will see a new entry in the `Accounts` table of your `node_mysql_api` database.
