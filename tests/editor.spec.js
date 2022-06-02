// @ts-check
const { test, expect } = require('@playwright/test');

// TODO sql dump für tests vorbereiten

let loggedInPage;
test.beforeAll(async ({ browser }) => {
  loggedInPage = await browser.newPage();
  await loggedInPage.goto('/');
  await loggedInPage.locator('[data-pom="loginButton"]').click();
  const loginInput = loggedInPage.locator('#input-for-uname');
  const pwInput = loggedInPage.locator('#input-for-pwd');

  await loginInput.fill('test@tacpic.de');
  await pwInput.fill('12345678');
  await loggedInPage.locator('[data-pom="loginSubmitButton"]').click();
  await loggedInPage.locator('#popup button[aria-label="Okay"]').click();
});

test.describe('Varianten', () => {
  test('Bearbeiten', async () => {
    // Click #catalogue-item-3-thumbnail
    // Click #catalogue-item-1-thumbnail
    await loggedInPage.locator('#catalogue-item-1-thumbnail').click();
    // assert.equal(loggedInPage.url(), 'http://localhost:3000/catalogue/1/variant/2');
    // Click [aria-label="Open\ in\ editor\ to\ \.\.\."]
    await loggedInPage.locator('[aria-label="Open\\ in\\ editor\\ to\\ \\.\\.\\."]').click();
    // Click text=… to correct this variantOpens the selected variant, e.g. to correct orthographi
    await loggedInPage.locator('[data-pom="edit variant"]').click();
    // assert.equal(loggedInPage.url(), 'http://localhost:3000/editor/app');

    await loggedInPage.locator('[data-pom="Draft"]').click();
    await loggedInPage.locator('[aria-label="Publish"]').click();

    await loggedInPage.locator('[data-pom="tagCombobox"] >> input[type="text"]').fill('Test2');
    await loggedInPage.keyboard.press('Enter');

    await loggedInPage.locator('[data-pom="licenseAgreementCheckbox"]').click();

    await loggedInPage.locator('[aria-label="Revise"]').click();

    await loggedInPage.locator('[aria-label="Back\\ to\\ Catalog"]').click();

    await loggedInPage.waitForLoadState('networkidle');
    await loggedInPage.waitForTimeout(500);
    expect(await loggedInPage.screenshot()).toMatchSnapshot();
    await loggedInPage.locator('[aria-label=""]').click();

    await loggedInPage.locator('[data-pom="Test"]').click();

    await loggedInPage.waitForLoadState('networkidle');
    await loggedInPage.waitForTimeout(500);
    expect(await loggedInPage.screenshot()).toMatchSnapshot();
    await loggedInPage.locator('[data-pom="Test"]').click();

    await loggedInPage.locator('[data-pom="mit tags"]').click();

    await loggedInPage.waitForLoadState('networkidle');
    await loggedInPage.waitForTimeout(500);
    expect(await loggedInPage.screenshot()).toMatchSnapshot();
    await loggedInPage.locator('[data-pom="mit tags"]').click();

    await loggedInPage.locator('[data-pom="Test2"]').click();
    await loggedInPage.waitForLoadState('networkidle');
    await loggedInPage.waitForTimeout(500);
    expect(await loggedInPage.screenshot()).toMatchSnapshot();
  })

  test('Neue Variante', async () => {
    // Click #catalogue-item-3-thumbnail
    // Click #catalogue-item-1-thumbnail
    await loggedInPage.locator('#catalogue-item-2-thumbnail').click();
    await loggedInPage.locator('[aria-label="Open\\ in\\ editor\\ to\\ \\.\\.\\."]').click();
    await loggedInPage.locator('[data-pom="new variant"]').click();

    await loggedInPage.locator('[data-pom="Draft"]').click();
    await loggedInPage.locator('[aria-label="Publish"]').click();

    await loggedInPage.locator('[data-pom="tagCombobox"] >> input[type="text"]').fill('Test2');
    await loggedInPage.keyboard.press('Enter');

    await loggedInPage.locator('[data-pom="licenseAgreementCheckbox"]').click();

    await loggedInPage.locator('[aria-label="Create variant"]').click();

    await loggedInPage.locator('[aria-label="Back\\ to\\ Catalog"]').click();

    await loggedInPage.waitForLoadState('networkidle');
    await loggedInPage.waitForTimeout(500);
    expect(await loggedInPage.screenshot()).toMatchSnapshot();
  })

  test('Neue Grafik', async () => {
    // Click #catalogue-item-3-thumbnail
    // Click #catalogue-item-1-thumbnail
    await loggedInPage.locator('#catalogue-item-2-thumbnail').click();
    await loggedInPage.locator('[aria-label="Open\\ in\\ editor\\ to\\ \\.\\.\\."]').click();
    await loggedInPage.locator('[data-pom="new variant"]').click();

    await loggedInPage.locator('[data-pom="Draft"]').click();
    await loggedInPage.locator('[aria-label="Publish"]').click();

    await loggedInPage.locator('[data-pom="licenseAgreementCheckbox"]').click();

    //TODO falscher Button wird selektiert
    await loggedInPage.locator('[aria-label="Create\\ variant"]').click();

    await loggedInPage.locator('[aria-label="Back\\ to\\ Catalog"]').click();

    await loggedInPage.waitForLoadState('networkidle');
    await loggedInPage.waitForTimeout(500);
    expect(await loggedInPage.screenshot()).toMatchSnapshot();
  })
});
