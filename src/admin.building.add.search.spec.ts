import { expect, test } from '@fixtures/renter.flow';

const title = `<C3999> Validate "Buildings" tab shows listed buildings, "Search Buildings" input and "Add Building" functionality works correctly @monolith-nightly-group-2`;

test(title, async ({ adminPortal, landlordAccount }) => {
  const { monolith } = adminPortal.pages;
  const buildingRowAmount = 50;
});
