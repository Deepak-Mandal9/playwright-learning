# 🔍 Root Cause Analysis — Playwright Framework Issues

This document captures all bugs encountered during framework 
development, their root causes, and fixes applied.

---

## RCA-001 — Browser Executable Not Found

**Date:** August 2026  
**Severity:** Critical  
**Status:** ✅ Resolved

### Error

Error: browserType.launch: Executable doesn't exist at
C:\Users...\ms-playwright\chromium_headless_shell-1217
chrome-headless-shell-win64\chrome-headless-shell.exe

### Root Cause
Playwright browsers were not downloaded during initial 
installation. The browser binaries are separate from the 
npm package and must be explicitly downloaded.

### Fix
```bash
npx playwright install
```

### Prevention
Always run `npx playwright install` after fresh installation 
or after updating Playwright version.

---

## RCA-002 — Target Page Closed Immediately

**Date:** August 2026  
**Severity:** High  
**Status:** ✅ Resolved

### Error
Error: page.goto: Target page, context or browser has been closed
navigating to "https://demo.playwright.dev/", waiting until "load"

### Root Cause
`baseURL` was set to `https://demo.playwright.dev/todomvc/#/`  
When `page.goto('/')` is called, Playwright resolves it as:

The `todomvc/#/` path was completely dropped because `/` 
always resolves to root domain only.

### Fix
Set `baseURL` to root domain only:
```typescript
// playwright.config.ts
baseURL: 'https://demo.playwright.dev'
```

Then use full path in goto:
```typescript
// TodoPage.ts
await this.page.goto('/todomvc/#/');
```

### Prevention
Always verify baseURL resolves correctly before writing tests.
Test URL resolution manually in browser first.

---

## RCA-003 — Wrong HTTP Status Code (405 Method Not Allowed)

**Date:** August 2026  
**Severity:** High  
**Status:** ✅ Resolved

### Error
Error: expect(received).toBe(expected)
Expected: 201
Received: 405

### Root Cause
API tests ran under `[chromium]` project instead of `[api]` 
project. The `chromium` project baseURL is:
https://demo.playwright.dev

So POST request hit `https://demo.playwright.dev/todos` 
which does not accept POST requests — hence 405.

### Fix
Always run API tests with correct project flag:
```bash
npx playwright test tests/api/ --project=api
```

Or configure `testMatch` in `playwright.config.ts`:
```typescript
{
  name: 'api',
  testMatch: '**/api/**/*.spec.ts',
  use: { baseURL: 'https://jsonplaceholder.typicode.com' }
}
```

### Prevention
Always configure `testMatch` per project to prevent 
tests running under wrong project automatically.

---

## RCA-004 — Case Sensitive Field Name Mismatch

**Date:** August 2026  
**Severity:** Medium  
**Status:** ✅ Resolved

### Error
Error: expect(received).toBe(expected)
Expected: 1
Received: undefined

### Root Cause
API response field name is `userId` (lowercase d) but 
assertion used `userID` (uppercase D):
```typescript
// ❌ Wrong
expect(body.userID).toBe(1);

// ✅ Correct  
expect(body.userId).toBe(1);
```
JavaScript is case-sensitive — `userID` and `userId` 
are completely different properties.

### Fix
Always copy field names directly from actual API response.
Never type field names from memory.

### Prevention
Always `console.log(await response.json())` first, then 
write assertions based on actual output.

---

## RCA-005 — Headed Browser Fails in CI/CD

**Date:** August 2026  
**Severity:** Critical  
**Status:** ✅ Resolved

### Error
Error: browserType.launch: Target page, context or browser
has been closed

Looks like you launched a headed browser without having
a XServer running.
Set either 'headless: true' or use 'xvfb-run'

### Root Cause
`playwright.config.ts` had `headless: false` set explicitly.  
GitHub Actions runs on Ubuntu server with **no display.**  
Headed mode requires a physical or virtual display (XServer) 
which does not exist on CI servers.

### Fix
Use `process.env.CI` environment variable which is 
automatically set by GitHub Actions:

```typescript
// playwright.config.ts
use: {
  headless: !!process.env.CI,
  // Local = headed, CI = headless automatically!
}
```

### Prevention
Never hardcode `headless: false` in framework config.
Always use environment-aware configuration.

---

## 📊 RCA Summary

| ID | Issue | Severity | Root Cause Category |
|---|---|---|---|
| RCA-001 | Browser not found | Critical | Setup/Installation |
| RCA-002 | Page closed immediately | High | Configuration |
| RCA-003 | Wrong status 405 | High | Project Config |
| RCA-004 | Field name mismatch | Medium | Typo/Case sensitivity |
| RCA-005 | Headed browser in CI | Critical | Environment Config |

---

## 💡 Key Learnings

1. Always verify `baseURL` resolves to correct page
2. Always use `process.env.CI` for environment-specific config
3. Always copy API field names from actual response
4. Always configure `testMatch` per project
5. Always run `npx playwright install` after fresh setup