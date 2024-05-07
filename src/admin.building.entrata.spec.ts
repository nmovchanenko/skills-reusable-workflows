import { expect, test } from '@fixtures/renter.flow';
import { Urls } from '@data/urls';

test.describe('Validate Entrata PMS functionality for building', async () => {
  const title = `<C4357> Validate and "Edit Building" and Entrata PMSi Credentials Page functionality for Buildings work correctly @monolith-nightly-group-2`;

  const DEFAULT_PMS_OPTION = 'Not Selected';
  let buildingUrl: string;

  test.afterAll('Setting PMS option back to default', async ({ adminPortal }) => {
    const { monoAdminEditBuildingPage: editPage } = adminPortal.pages.monolith;
    await adminPortal.pages.monolith.monoAdminBasePage.clickBuildingsTab();
    await adminPortal.pages.monolith.monoAdminBasePage.page.goto(buildingUrl);
    await editPage.updatePms(DEFAULT_PMS_OPTION);
    await editPage.clickSubmitButton();

    await expect.soft(editPage.updateConfirmationMessage, 'Confirmation message should be visible').toBeVisible();
  });

  test(title, async ({ building, adminPortal }) => {
    buildingUrl = new Urls().MONOLITH.getBuildingEditCredentialsUrlById(`${building.profile.id}`);
    const PMS_OPTION = 'Entrata';
    const expEntrataData = adminPortal.helpers.buildingInfo.getRandomEntrataCredentialsData();

    });

    await test.step('Continue validation on Edit Credentials Building page', async () => {

    });
  });
});
