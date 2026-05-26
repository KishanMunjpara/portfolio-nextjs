import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page title is correct
    await expect(page).toHaveTitle(/Kishan Munjpara/);
    
    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: /Hi, I'm Kishan/i })).toBeVisible();
    
    // Check if navigation is present
    await expect(page.getByRole('navigation')).toBeVisible();
    
    // Check if social links are present
    await expect(page.getByRole('link', { name: /LinkedIn/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /GitHub/i })).toBeVisible();
  });

  test('should navigate to different sections', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to About section
    await page.getByRole('link', { name: /About/i }).click();
    await expect(page.locator('#about')).toBeInViewport();
    
    // Test navigation to Portfolio section
    await page.getByRole('link', { name: /Portfolio/i }).click();
    await expect(page.locator('#portfolio')).toBeInViewport();
    
    // Test navigation to Contact section
    await page.getByRole('link', { name: /Contact/i }).click();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if mobile menu button is visible
    await expect(page.getByRole('button', { name: /Toggle menu/i })).toBeVisible();
    
    // Check if main content is still visible
    await expect(page.getByRole('heading', { name: /Hi, I'm Kishan/i })).toBeVisible();
  });

  test('should have working contact form', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact section
    await page.getByRole('link', { name: /Contact/i }).click();
    
    // Click on contact form button
    await page.getByRole('button', { name: /Send Message/i }).click();
    
    // Check if modal opens
    await expect(page.getByRole('dialog')).toBeVisible();
    
    // Fill out the form
    await page.getByLabel(/Full Name/i).fill('Test User');
    await page.getByLabel(/Email/i).fill('test@example.com');
    await page.getByLabel(/Purpose/i).fill('Test Purpose');
    await page.getByLabel(/Message/i).fill('This is a test message');
    
    // Submit the form
    await page.getByRole('button', { name: /Send Message/i }).click();
    
    // The form should close after submission
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });
});
