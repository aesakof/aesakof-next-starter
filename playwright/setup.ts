import { test as setup } from '@playwright/test';
import { TEST_USER } from './constants';

setup('seed database and authenticate', async ({ page, request, browserName }) => {
    await request.post('http://localhost:3000/api/test/seed', {
        data: TEST_USER,
    });

    await page.goto('/sign-in');
    await page.getByLabel('Username or email address').fill(TEST_USER.email);
    await page.getByLabel('Password').fill(TEST_USER.password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('/');
    await page.waitForLoadState('networkidle');
    await page.context().storageState({ path: `playwright/.auth/user-${browserName}.json` });
});