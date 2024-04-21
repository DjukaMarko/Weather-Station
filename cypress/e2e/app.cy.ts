describe('Form Interaction Test', () => {
  it("Tries to register to the page, login and logout", () => {
    // Base email address
    const baseEmail = "testuser";

    // Generate random string for email
    const randomString = Math.random().toString(36).substring(2, 8);

    // Concatenate base email with random string and domain
    const email = `${baseEmail}+${randomString}@example.com`;

    cy.visit("/register");

    // Type into the email input field
    cy.get('input[name="email"]').type(email);

    // Type into the password input field
    cy.get('input[name="password"]').type('123456');
    cy.get('input[name="confirm-password"]').type('123456');

    // Click on the submit button
    cy.get('button[id="submit"]').click();


    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('123456');
    cy.get('button[id="submit"]').click();
    cy.wait(5000);
    cy.get('[data-cy="sign-out"]').click();
    cy.url().should('include', '/login');
  });

  it("Tries to register to the page", () => {
    cy.visit("/register");
    cy.get('input[name="email"]').type('marko.djukic.111@gmail.com');

    // Type into the password input field
    cy.get('input[name="password"]').type('123456');
    cy.get('input[name="confirm-password"]').type('123456');

    // Click on the submit button
    cy.get('button[id="submit"]').click();
  });

  it('Types into form fields and submits the form', () => {
    // Visit the page containing the form
    cy.visit('/login');

    // Type into the email input field
    cy.get('input[name="email"]').type('marko.djukic.111@gmail.com');

    // Type into the password input field
    cy.get('input[name="password"]').type('123456');

    // Click on the submit button
    cy.get('button[id="submit"]').click();

    // Check if the form submission was successful (you can adjust this assertion based on your application behavior)
    cy.url().should('include', '/dashboard');
  });

  it('Shows error message if form submission fails', () => {
    // Visit the page containing the form
    cy.visit('/login');

    // Type into the email input field
    cy.get('input[name="email"]').type('invalidemail@example');

    // Type into the password input field
    cy.get('input[name="password"]').type('weakpassword');

    // Click on the submit button
    cy.get('button[id="submit"]').click();

    // Check if the error message appears
    cy.contains('Error').should('exist');
  });
});
