// @ts-check
const { test, expect } = require('@playwright/test');

test('Test for 22:00 News', async ({ page }) => {
  await page.goto("https://areena.yle.fi/tv/opas")
  await expect(page.getByText("22.00 Kymmenen uutiset")).toBeVisible();
});

test('Test cases for channel logos and names', async ({ page }) => {
  await page.goto('https://areena.yle.fi/tv/opas');

  await expect(page.locator('[aria-label="Yle Areena"]')).toHaveAttribute("style", "background-image: url('https://images.cdn.yle.fi/image/upload/c_fill,f_auto,h_64,q_auto:eco/v1665568718/yle-areena_vt.png');");
});

test("Test for finding s03e05 release date", async({page}) => {
  await page.goto("https://areena.yle.fi/1-3339547");  

  await page.locator("li", {has: page.getByText("Kausi 3")}).click();
  await page.locator("li", {has: page.getByText("Jakso 5: Kummeli ")}).click();

  await expect(page.getByText("julkaistu ti 10.1.2006")).toBeVisible();

});

test("Test for login with wrong email", async({page}) => {
  
  await page.goto("https://tunnus-shared-ui.yle.fi/register?context=iframe&for_origin=https%3A%2F%2Fareena.yle.fi&initiating_app=areena_web_personal_prod&language=fi&theme=dark&tracking_app_name=areena&tunnus-iframe-id=cfj6jtxkt9q");

  await page.getByLabel("Sähköposti").fill("Shiish@ssfi");
  await page.getByText("Luo Tunnus").dispatchEvent("click");
  await expect(page.getByText("Tarkista sähköpostiosoitteen muoto.")).toBeVisible();  
});
