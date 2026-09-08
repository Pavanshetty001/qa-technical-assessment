import { expect, test } from '@playwright/test';
import { PracticeFormPage } from '../../pages/PracticeFormPage';
import { practiceFormData } from '../../test-data/practiceFormData';

test.describe('DemoQA Practice Form', () => {

  test('should show validation for missing required fields', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();
    await practiceForm.submit();

    await practiceForm.verifyRequiredFieldValidation();
  });

  test('should allow entering an email address', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.email.fill('invalid-email');

    await expect(practiceForm.email).toHaveValue('invalid-email');
  });

  test('should reject an invalid email address', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.email.fill('invalid-email');

    await practiceForm.verifyEmailValidation();
  });

  test('should enforce 10 digit mobile number limit', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.verifyMobileValidation();
  });

  test('should allow selecting a gender', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.selectGender(practiceFormData.gender);

    await practiceForm.verifyGenderSelected(practiceFormData.gender);
  });

  test('should allow selecting subjects', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.selectSubjects(
      practiceFormData.subjects
    );

    await practiceForm.verifySubjectsSelected(
      practiceFormData.subjects
    );
  });

  test('should not allow duplicate subject selection', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.selectSubjects(['Maths']);
    await practiceForm.selectSubjects(['Maths']);

    await expect(
      page.getByRole('button', {
        name: 'Remove Maths',
        exact: true,
      })
    ).toHaveCount(1);
  });

  test('should allow selecting hobbies', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.selectHobbies(
      practiceFormData.hobbies
    );

    await practiceForm.verifyHobbiesSelected(
      practiceFormData.hobbies
    );
  });

  test('should allow selecting state and city', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.selectStateAndCity(
      practiceFormData.state,
      practiceFormData.city
    );

    await practiceForm.verifyStateAndCitySelected(
      practiceFormData.state,
      practiceFormData.city
    );
  });

  test('should not allow city selection before state is selected', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await expect(
      practiceForm.city.locator('input')
    ).toBeDisabled();
  });

  test('should allow selecting date of birth', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.setDateOfBirth(
      practiceFormData.dateOfBirth
    );

    await practiceForm.verifyDateOfBirthSelected(
      practiceFormData.dateOfBirth
    );
  });

  test('should allow uploading a picture', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.uploadPicture('fixtures/sample.jpg');

    await practiceForm.verifyPictureUploaded('sample.jpg');
  });

  test('should reject non-numeric mobile number', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.mobile.fill('abcdefghij');

    await practiceForm.verifyInvalidMobileValidation();
  });

  test('should accept exactly 10 digit mobile number', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.verifyMobileAcceptsTenDigits();
  });

  test('should reject mobile number with fewer than 10 digits', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.verifyMobileRejectsInvalidLength();
  });

  test('should not allow more than 10 mobile digits', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.mobile.fill('12345678901');

    await expect(practiceForm.mobile).toHaveValue('1234567890');
  });

  test('should accept mobile number starting with zero', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.mobile.fill('0123456789');

    await expect(practiceForm.mobile).toHaveValue('0123456789');
  });

  test('should accept a valid email address', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.email.fill('test.user@example.com');

    await practiceForm.verifyValidEmail();
  });

  test('should reject email address without @ symbol', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.email.fill('test.userexample.com');

    await practiceForm.verifyEmailValidation();
  });

  test('should not submit form with an invalid email address', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.fillBasicDetails({
      firstName: practiceFormData.firstName,
      lastName: practiceFormData.lastName,
      email: 'invalid-email',
      mobile: practiceFormData.mobile,
      address: practiceFormData.address,
    });

    await practiceForm.selectGender(practiceFormData.gender);

    await practiceForm.submit();

    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should not submit form with an invalid mobile number', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.fillBasicDetails({
      firstName: practiceFormData.firstName,
      lastName: practiceFormData.lastName,
      email: practiceFormData.email,
      mobile: '12345',
      address: practiceFormData.address,
    });

    await practiceForm.selectGender(practiceFormData.gender);

    await practiceForm.submit();

    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should not submit form without selecting gender', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.fillBasicDetails({
      firstName: practiceFormData.firstName,
      lastName: practiceFormData.lastName,
      email: practiceFormData.email,
      mobile: practiceFormData.mobile,
      address: practiceFormData.address,
    });

    await practiceForm.submit();

    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should enable city selection after selecting state', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await expect(
      practiceForm.city.locator('input')
    ).toBeDisabled();

    await practiceForm.state.click();
    await page.getByText(
      practiceFormData.state,
      { exact: true }
    ).click();

    await expect(
      practiceForm.city.locator('input')
    ).toBeEnabled();
  });

  test('should display submitted data in confirmation modal', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.fillBasicDetails({
      firstName: practiceFormData.firstName,
      lastName: practiceFormData.lastName,
      email: practiceFormData.email,
      mobile: practiceFormData.mobile,
      address: practiceFormData.address,
    });

    await practiceForm.selectGender(practiceFormData.gender);

    await practiceForm.selectSubjects(
      practiceFormData.subjects
    );

    await practiceForm.selectHobbies(
      practiceFormData.hobbies
    );

    await practiceForm.selectStateAndCity(
      practiceFormData.state,
      practiceFormData.city
    );

    await practiceForm.setDateOfBirth(
      practiceFormData.dateOfBirth
    );

    await practiceForm.submit();

    await practiceForm.verifySubmission(practiceFormData);
  });

  test('should not submit form when required fields are empty', async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    await practiceForm.navigate();

    await practiceForm.submit();

    await practiceForm.verifyRequiredFieldValidation();
  });

});