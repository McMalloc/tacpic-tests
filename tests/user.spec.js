// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/catalogue');
});

test.describe('Catalogue', () => {
  test('should display', async ({ page }) => {
    // Create 1st todo.
    const catalogueItems = page.locator('[data-pom="catalogueItem"]');
    expect(await catalogueItems.count()).toBe(0);
  })
});

test.describe('User actions', () => {
  test('should be able to login', async ({ page }) => {
    // Create 1st todo.
    await page.locator('[data-pom="loginButton"]').click();
    const loginInput = page.locator('#input-for-uname');
    const pwInput = page.locator('#input-for-pwd');

    await loginInput.fill('robert@tapic.de');
    await pwInput.fill('12345678');

    await page.locator('[data-pom="loginSubmitButton"]').click();
    expect(page.locator('[data-pom="accountLink"]').isVisible).toBeTruthy();
  })
});