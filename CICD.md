# Practical: CI/CD Pipeline using GitHub Actions in VS Code

---

## Objective

To design and implement a CI/CD pipeline using GitHub Actions for automated testing, deployment, and version-controlled software delivery.

---

## 1. Tools Required

| Tool             | Purpose                          |
|------------------|----------------------------------|
| VS Code          | Code editor                      |
| Git              | Version control                  |
| GitHub account   | Remote repository hosting        |
| Node.js          | JavaScript runtime               |
| GitHub Actions   | CI/CD automation platform        |

We will create a simple Node.js application, test it automatically, and configure GitHub Actions to run whenever code is pushed to GitHub.

---

## 2. Create the Project in VS Code

Open VS Code and create a folder: `ci-cd-demo`

Open the folder in VS Code.

Open the VS Code terminal:
**Terminal → New Terminal**

Run:
```bash
npm init -y
```

Install Express:
```bash
npm install express
```

Install Jest for testing:
```bash
npm install --save-dev jest supertest
```

---

## 3. Create the Application

### Create a file: `app.js`

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "CI/CD Pipeline is Working!"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK"
  });
});

module.exports = app;
```

### Create another file: `server.js`

```javascript
const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 4. Configure Testing

Create a folder: `tests`

Inside it create: `app.test.js`

```javascript
const request = require("supertest");
const app = require("../app");

describe("Application Tests", () => {
  test("GET / should return success message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "CI/CD Pipeline is Working!"
    );
  });

  test("GET /health should return OK", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("OK");
  });
});
```

---

## 5. Modify `package.json`

Change the scripts section to:

```json
"scripts": {
  "start": "node server.js",
  "test": "jest"
}
```

Your project will now look like:

```
ci-cd-demo/
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
│
└── tests/
    └── app.test.js
```

---

## 6. Test Locally in VS Code

Run:
```bash
npm test
```

**Expected output:**
```
PASS tests/app.test.js
  ✓ GET / should return success message
  ✓ GET /health should return OK

Test Suites: 1 passed
Tests:       2 passed
```

Now run the application:
```bash
npm start
```

**Expected output:**
```
Server running on port 3000
```

Open: [http://localhost:3000](http://localhost:3000)

**Expected response:**
```json
{
  "message": "CI/CD Pipeline is Working!"
}
```

---

## 7. Create Git Repository

In the VS Code terminal:
```bash
git init
```

Configure Git if required:
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

Add files:
```bash
git add .
```

Commit:
```bash
git commit -m "Initial CI/CD project"
```

---

## 8. Create GitHub Repository

Go to GitHub and create a new repository: `ci-cd-demo`

Do not add another README if your local project already contains one.

Then connect your VS Code project to GitHub:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ci-cd-demo.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your GitHub username.

---

## 9. Create GitHub Actions Workflow

Create the workflow directory and file:

```
ci-cd-demo/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── tests/
│   └── app.test.js
│
├── app.js
├── server.js
├── package.json
└── package-lock.json
```

---

## 10. Write the CI/CD Workflow

Put this in `.github/workflows/ci.yml`:

```yaml
name: Node.js CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout source code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run automated tests
        run: npm test

      - name: Build application
        run: echo "Application build successful"

      - name: Deployment
        run: echo "Application deployment successful"
```

---

## 11. Push the Workflow to GitHub

In VS Code terminal:
```bash
git add .
```

Then:
```bash
git commit -m "Add GitHub Actions CI/CD pipeline"
```

Push:
```bash
git push
```

---

## 12. Observe the Pipeline

Go to your GitHub repository.

Click: **Actions**

You should see: **Node.js CI/CD Pipeline**

GitHub will automatically execute:

```
Checkout Code
      ↓
Setup Node.js
      ↓
Install Dependencies
      ↓
Run Automated Tests
      ↓
Build Application
      ↓
Deployment
```

A successful workflow will show a **green check mark** ✅.

---

## 13. Demonstrate Continuous Integration

Now make a change to `app.js`.

For example, add:

```javascript
app.get("/version", (req, res) => {
  res.json({
    version: "1.0.1"
  });
});
```

Save the file.

Then:
```bash
git add .
git commit -m "Add version endpoint"
git push
```

GitHub Actions automatically detects the new push and executes the pipeline again.

**This demonstrates Continuous Integration.**

---

## 14. CI/CD Workflow Diagram

Your practical can be represented as:

```
        Developer
            |
            ↓
         VS Code
            |
            ↓
       Write Code
            |
            ↓
       Git Commit
            |
            ↓
        Git Push
            |
            ↓
         GitHub
            |
            ↓
     GitHub Actions
            |
    ┌───────┴───────┐
    ↓               ↓
Install Code   Automated Tests
    ↓               ↓
    └───────┬───────┘
            ↓
          Build
            ↓
        Deployment
            ↓
   Application Released
```

---

## Summary

| Step | Action                              | Tool            |
|------|-------------------------------------|-----------------|
| 1    | Write application code              | VS Code         |
| 2    | Write tests                         | Jest + Supertest |
| 3    | Initialize Git repository           | Git             |
| 4    | Push to GitHub                      | Git + GitHub    |
| 5    | Create CI/CD workflow               | GitHub Actions  |
| 6    | Automated pipeline runs on push     | GitHub Actions  |
| 7    | Tests pass → Build → Deploy         | GitHub Actions  |

---

**End of Practical**
