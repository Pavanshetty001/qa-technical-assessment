import { expect, Locator, Page } from '@playwright/test';

export class PracticeFormPage {
  readonly page: Page;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly mobile: Locator;
  readonly dateOfBirth: Locator;
  readonly subjects: Locator;
  readonly currentAddress: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly submitButton: Locator;
  readonly uploadPictureInput: Locator;
  readonly confirmationModal: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.getByPlaceholder('name@example.com');
    this.mobile = page.getByPlaceholder('Mobile Number');
    this.dateOfBirth = page.locator('#dateOfBirthInput');
    this.subjects = page.locator('#subjectsInput');
    this.currentAddress = page.locator('#currentAddress');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.submitButton = page.locator('#submit');
    this.uploadPictureInput = page.locator('#uploadPicture');
    this.confirmationModal = page.getByRole('dialog');
  }

  async navigate() {
  await this.page.goto('/automation-practice-form', {
    waitUntil: 'domcontentloaded',
  });
}

  async fillBasicDetails(data: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    address: string;
  }) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.mobile.fill(data.mobile);
    await this.currentAddress.fill(data.address);
  }

  async selectGender(gender: 'Male' | 'Female' | 'Other') {
    await this.page
      .getByRole('radio', { name: gender, exact: true })
      .check();
  }

  async verifyGenderSelected(gender: 'Male' | 'Female' | 'Other') {
    await expect(
      this.page.getByRole('radio', { name: gender, exact: true })
    ).toBeChecked();
  }

  async selectHobbies(hobbies: ('Sports' | 'Reading' | 'Music')[]) {
    for (const hobby of hobbies) {
      await this.page
        .getByRole('checkbox', { name: hobby, exact: true })
        .check();
    }
  }

  async verifyHobbiesSelected(
    hobbies: ('Sports' | 'Reading' | 'Music')[]
  ) {
    for (const hobby of hobbies) {
      await expect(
        this.page.getByRole('checkbox', { name: hobby, exact: true })
      ).toBeChecked();
    }
  }

  async selectSubjects(subjects: string[]) {
    for (const subject of subjects) {
      await this.subjects.fill(subject);
      await this.page.getByText(subject, { exact: true }).click();
    }
  }

  async verifySubjectsSelected(subjects: string[]) {
    for (const subject of subjects) {
      await expect(
        this.page.getByRole('button', {
          name: `Remove ${subject}`,
          exact: true,
        })
      ).toBeVisible();
    }
  }

  async selectStateAndCity(state: string, city: string) {
    await this.state.click();
    await this.page.getByText(state, { exact: true }).click();

    await this.city.click();
    await this.page.getByText(city, { exact: true }).click();
  }

  async verifyStateAndCitySelected(state: string, city: string) {
    await expect(this.state).toContainText(state);
    await expect(this.city).toContainText(city);
  }

  async setDateOfBirth(date: string) {
    await this.dateOfBirth.click();
    await this.dateOfBirth.fill(date);
    await this.dateOfBirth.press('Enter');
  }

  async verifyDateOfBirthSelected(date: string) {
    await expect(this.dateOfBirth).toHaveValue(date);
  }

  async uploadPicture(filePath: string) {
    await this.uploadPictureInput.setInputFiles(filePath);
  }

  async verifyPictureUploaded(fileName: string) {
    const actualFileName = await this.uploadPictureInput.evaluate(
      (input: HTMLInputElement) => input.files?.[0]?.name
    );

    expect(actualFileName).toBe(fileName);
  }

  async submit() {
    await this.submitButton.click();
  }

  async verifySubmission(data: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    mobile: string;
    address: string;
  }) {
    await expect(this.confirmationModal).toBeVisible();

    const modal = this.confirmationModal;

    await expect(modal).toContainText(`${data.firstName} ${data.lastName}`);
    await expect(modal).toContainText(data.email);
    await expect(modal).toContainText(data.gender);
    await expect(modal).toContainText(data.mobile);
    await expect(modal).toContainText(data.address);
  }

  async verifyRequiredFieldValidation() {
    const requiredFields = [
      this.firstName,
      this.lastName,
      this.mobile,
    ];

    for (const field of requiredFields) {
      await expect(field).toHaveAttribute('required', '');
    }

    const gender = this.page.getByRole('radio', {
      name: 'Male',
      exact: true,
    });

    await expect(gender).toHaveAttribute('required', '');
  }

  async verifyEmailValidation() {
    await expect(
      this.email.evaluate(
        (element: HTMLInputElement) => element.validity.patternMismatch
      )
    ).resolves.toBe(true);
  }

  async verifyValidEmail() {
    await expect(
      this.email.evaluate(
        (element: HTMLInputElement) => element.validity.valid
      )
    ).resolves.toBe(true);
  }

  async verifyMobileValidation() {
    await expect(this.mobile).toHaveAttribute('maxlength', '10');
  }

  async verifyInvalidMobileValidation() {
    await expect(
      this.mobile.evaluate(
        (element: HTMLInputElement) => element.validity.patternMismatch
      )
    ).resolves.toBe(true);
  }

  async verifyMobileAcceptsTenDigits() {
    await this.mobile.fill('9876543210');

    await expect(this.mobile).toHaveValue('9876543210');

    await expect(
      this.mobile.evaluate(
        (element: HTMLInputElement) => element.validity.valid
      )
    ).resolves.toBe(true);
  }

  async verifyMobileRejectsInvalidLength() {
    await this.mobile.fill('123456789');

    await expect(
      this.mobile.evaluate(
        (element: HTMLInputElement) => element.validity.valid
      )
    ).resolves.toBe(false);
  }
}