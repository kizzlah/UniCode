import { test, expect } from '@playwright/test';

test.describe('Code Conversion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should detect JavaScript and show conversion suggestions', async ({ page }) => {
    const jsCode = `function hello() {
  console.log("Hello, world!");
}`;

    // Enter JavaScript code
    await page.fill('textarea[placeholder*="Paste any code here"]', jsCode);

    // Wait for language detection
    await expect(page.locator('text=JavaScript')).toBeVisible();

    // Check that conversion suggestions appear
    await expect(page.locator('text=Convert to TypeScript')).toBeVisible();
  });

  test('should convert JavaScript to TypeScript', async ({ page }) => {
    const jsCode = 'function add(a, b) { return a + b; }';

    // Enter JavaScript code
    await page.fill('textarea[placeholder*="Paste any code here"]', jsCode);

    // Wait for suggestions to load
    await page.waitForSelector('text=Convert to TypeScript');

    // Click conversion suggestion
    await page.click('text=Convert to TypeScript');

    // Wait for conversion to complete
    await expect(page.locator('text=Conversion successful')).toBeVisible();

    // Check that converted code contains TypeScript syntax
    const convertedCode = await page.locator('textarea').nth(1).inputValue();
    expect(convertedCode).toContain('function add(a: any, b: any): any');
  });

  test('should convert JSON to YAML', async ({ page }) => {
    const jsonCode = '{"name": "John", "age": 30}';

    // Enter JSON code
    await page.fill('textarea[placeholder*="Paste any code here"]', jsonCode);

    // Wait for language detection
    await expect(page.locator('text=JSON')).toBeVisible();

    // Click YAML conversion
    await page.click('text=Convert to YAML');

    // Wait for conversion
    await expect(page.locator('text=Conversion successful')).toBeVisible();

    // Check converted YAML
    const convertedCode = await page.locator('textarea').nth(1).inputValue();
    expect(convertedCode).toContain('name: John');
    expect(convertedCode).toContain('age: 30');
  });

  test('should toggle between light and dark themes', async ({ page }) => {
    // Check initial light theme
    await expect(page.locator('body')).toHaveClass(/bg-gray-50/);

    // Click theme toggle
    await page.click('button[title*="Switch to dark theme"]');

    // Check dark theme is applied
    await expect(page.locator('body')).toHaveClass(/bg-gray-900/);

    // Toggle back to light
    await page.click('button[title*="Switch to light theme"]');

    // Check light theme is restored
    await expect(page.locator('body')).toHaveClass(/bg-gray-50/);
  });

  test('should show conversion history', async ({ page }) => {
    const jsCode = 'console.log("test");';

    // Perform a conversion
    await page.fill('textarea[placeholder*="Paste any code here"]', jsCode);
    await page.click('text=Convert to TypeScript');
    await expect(page.locator('text=Conversion successful')).toBeVisible();

    // Check history panel shows the conversion
    await expect(page.locator('text=Convert to TypeScript')).toBeVisible();
    
    // History should contain the source code snippet
    await expect(page.locator('text=console.log("test");')).toBeVisible();
  });

  test('should handle conversion errors gracefully', async ({ page }) => {
    const invalidJson = '{"invalid": json}';

    // Enter invalid JSON
    await page.fill('textarea[placeholder*="Paste any code here"]', invalidJson);

    // Try to convert to YAML
    await page.click('text=Convert to YAML');

    // Should show error status
    await expect(page.locator('text=Conversion failed')).toBeVisible();
  });

  test('should copy converted code to clipboard', async ({ page }) => {
    const jsCode = 'const x = 5;';

    // Grant clipboard permissions
    await page.context().grantPermissions(['clipboard-write']);

    // Perform conversion
    await page.fill('textarea[placeholder*="Paste any code here"]', jsCode);
    await page.click('text=Convert to TypeScript');
    await expect(page.locator('text=Conversion successful')).toBeVisible();

    // Click copy button on converted code
    await page.click('textarea:nth-child(2) ~ button[title="Copy to clipboard"]');

    // Verify clipboard content (this is browser-dependent)
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('const x: any = 5;');
  });
});