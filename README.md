# 🎭 Playwright Automation Framework

An enterprise-grade test automation framework built with Playwright and TypeScript following SDET II industry standards.

---

## 🏗️ Framework Architecture

playwright-learning/
├── tests/
│ ├── e2e/ # UI end-to-end tests
│ │ ├── todo.spec.ts # Core feature tests
│ │ └── todo-data-driven.spec.ts # Data driven tests
│ └── api/ # API tests
│ └── todos.api.spec.ts # REST API tests
├── pages/ # Page Object Model classes
│ └── TodoPage.ts
├── fixtures/ # Custom Playwright fixtures
│ └── index.ts
├── test-data/ # External test data
│ └── todo.json
├── .github/
│ └── workflows/
│ └── playwright.yml # CI/CD pipeline
├── playwright.config.ts # Framework configuration
└── tsconfig.json # TypeScript configuration

---

## ⚙️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Playwright | Latest | Test automation framework |
| TypeScript | Latest | Type-safe test development |
| Node.js | 20.x | Runtime environment |
| GitHub Actions | - | CI/CD pipeline |
| Allure | Latest | Test reporting |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v20 or higher
- npm v9 or higher
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/playwright-learning.git

# Navigate to project
cd playwright-learning

# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install chromium
```

---

## ▶️ Running Tests

### Run all tests
```bash
npm run test
```

### Run only UI tests
```bash
npm run test:ui
```

### Run only API tests
```bash
npm run test:api
```

### Run smoke tests
```bash
npm run test:smoke
```

### Run regression tests
```bash
npm run test:regression
```

### Run with browser visible
```bash
npm run test:headed
```

---

## 📊 Test Coverage

| Category | Tests | Tags |
|---|---|---|
| Core UI Features | 3 | @smoke, @regression |
| Data Driven UI | 7 | @regression |
| REST API | 5 | @smoke, @api |
| **Total** | **21** | |

---

## 🏷️ Test Tags

| Tag | Purpose | When To Run |
|---|---|---|
| `@smoke` | Critical path tests | Every deployment |
| `@regression` | Full coverage | Nightly builds |
| `@api` | API only tests | Every PR |

---

## 📈 CI/CD Pipeline

Every push to `main` branch automatically:

Push Code → GitHub Actions Triggers
→ Installs dependencies
→ Installs Playwright browsers
→ Runs all tests
→ Uploads HTML report
→ Shows pass/fail status


### Viewing Pipeline Reports
1. Go to your GitHub repository
2. Click **Actions** tab
3. Click latest workflow run
4. Download **playwright-report** artifact

---

## 🏛️ Framework Design Patterns

### Page Object Model (POM)
All page interactions are encapsulated in page classes:
```typescript
// Clean, readable test using POM
await todoPage.addTodo('Learn Playwright');
await todoPage.assertTodoVisible('Learn Playwright');
```

### Custom Fixtures
Page objects are injected automatically into tests:
```typescript
// todoPage is automatically created and injected
test('should add todo', async ({ todoPage }) => {
  await todoPage.addTodo('Learn Playwright');
});
```

### Data Driven Testing
Test data is separated from test logic:
```typescript
// Reads from test-data/todo.json
for (const todo of todoData.validTodos) {
  test(`Should add todo with ${todo.description}`, async ({ todoPage }) => {
    await todoPage.addTodo(todo.input);
  });
}
```

---

## 🐛 Debugging Failed Tests

### View HTML Report
```bash
npm run report:html
```

### View Trace (Step by step replay)
```bash
npx playwright show-trace test-results/trace.zip
```

### Run in Debug Mode
```bash
npx playwright test --debug
```

---

## 👤 Author

**Deepak Mandal**
- 3+ years SDET experience
- Domain: Annuities & Insurance
- Stack: Playwright, TypeScript, React, Node.js