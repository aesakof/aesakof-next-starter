import { test, expect } from '@playwright/test';
import { TEST_USER } from './constants';

test.describe('sign in', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    test.beforeEach(async ({ page }) => {
        await page.goto('/sign-in');
    });

    test('signs in with email', async ({ page }) => {
        await page.getByLabel('Username or email address').fill(TEST_USER.email);
        await page.getByLabel('Password').fill(TEST_USER.password);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForURL('/', { timeout: 10000 });
        await expect(page).toHaveURL('/');
    });

    test('signs in with username', async ({ page }) => {
        await page.getByLabel('Username or email address').fill(TEST_USER.username);
        await page.getByLabel('Password').fill(TEST_USER.password);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForURL('/', { timeout: 10000 });
        await expect(page).toHaveURL('/');
    });

    test('shows error with wrong password', async ({ page }) => {
        await page.getByLabel('Username or email address').fill(TEST_USER.email);
        await page.getByLabel('Password').fill('wrongpassword');
        await page.getByRole('button', { name: 'Sign In' }).click();
        await expect(page.getByText('Invalid email or password')).toBeVisible();
    });
});

test.describe('protected routes - logged in', () => {
    test('logged in user can access dashboard', async ({ page }) => {
        await page.goto('/dashboard');
        await expect(page).toHaveURL('/dashboard');
    });

    test('logged in user can access settings', async ({ page }) => {
        await page.goto('/settings');
        await expect(page).toHaveURL('/settings/account');
    });

    test('logged in user can access settings appearance', async ({ page }) => {
        await page.goto('/settings/appearance');
        await expect(page).toHaveURL('/settings/appearance');
    });
});

test.describe('sign out', () => {
    test('signs out and redirects to sign in', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: TEST_USER.username }).click();
        await page.getByRole('button', { name: 'Sign out' }).click();
        await expect(page).toHaveURL('/sign-in');
    });
});

test.describe('protected routes - logged out', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    test('logged out user is redirected from dashboard', async ({ page }) => {
        await page.goto('/dashboard');
        await expect(page).toHaveURL(/sign-in/);
    });

    test('logged out user is redirected from settings', async ({ page }) => {
        await page.goto('/settings');
        await expect(page).toHaveURL(/sign-in/);
    });
});