import { expect, test } from "@playwright/test";
test("edits content and opens version history", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Future of sustainable travel" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Version history" }).click();
  await expect(
    page.getByRole("heading", { name: "Version history" }),
  ).toBeVisible();
});
