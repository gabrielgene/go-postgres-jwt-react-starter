/// <reference types="cypress" />

// Some things it should be able to to:

// Allow someone to edit a Customer information.

context('General', () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);

    cy.visit('http://localhost:3000/');

    cy.clearCookies();
  });

  it('Verify login page', () => {
    cy.get('h2').should('have.text', 'Login');
  });

  it('Register a new user', () => {
    cy.get('[data-cy=register]').click();
    cy.wait(1000);
    cy.get('[data-cy=name]').type('teste');
    cy.get('[data-cy=email]').type('teste@test.com');
    cy.get('[data-cy=pass]').type('teste123');
    cy.get('[data-cy=submit]').click();
  });

  it('Allow someone to create a new Customers.', () => {
    cy.get('[data-cy=email]').type('teste@test.com');
    cy.get('[data-cy=pass]').type('teste123');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);

    const name = `Teste ${new Date().getTime()}`;

    cy.get('[data-cy=add-customer').click();
    cy.get('#email').type('teste@teste.com');
    cy.get('#name').type(name);
    cy.get('#telephone').type('+55 99999-9999');
    cy.get('#latitude').type(51.503252);
    cy.get('#longitude').type(-0.127899);
    cy.get('#country').type('BR');
    cy.get('#street').type('Street Test 335');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);
    cy.reload();

    cy.get('.MuiListItemText-root > .MuiListItemText-primary').contains(name);
  });

  it('Allow someone to add a payment method to a Customer and show the payments methods associated to a particular customer in the system.', () => {
    const name = `John Smith ${new Date().getTime()}`;

    cy.get('[data-cy=email]').type('teste@test.com');
    cy.get('[data-cy=pass]').type('teste123');
    cy.get('[data-cy=submit]').click();

    cy.get('.MuiList-root > :nth-child(1)').click();
    cy.get('[data-cy=add-payment]').click();

    cy.get('#methodType').type('card');
    cy.get('#cardBin').type('35522');
    cy.get('#cardLastFour').type('0001');
    cy.get('#expiryMonth').type('7');
    cy.get('#expiryYear').type('2020');
    cy.get('#eWallet').type('applepay');
    cy.get('#nameOnCard').type(name);
    cy.get('#country').type('BR');
    cy.get('#latitude').type(51.503252);
    cy.get('#longitude').type(-0.127899);
    cy.get('#street1').type('123 fake st.');
    cy.get('[data-cy=submit]').click();
    cy.wait(1000);
    cy.reload();

    cy.get(':nth-child(2)').contains(name);
  });

  it('Allow someone to edit a Customer.', () => {
    const newName = `John Smith ${new Date().getTime()}`;

    cy.get('[data-cy=email]').type('teste@test.com');
    cy.get('[data-cy=pass]').type('teste123');
    cy.get('[data-cy=submit]').click();

    cy.get('.MuiList-root > :nth-child(1)').click();
    cy.get('[data-cy=edit-customer]').click();

    cy.get('#name').clear().type(newName);

    cy.get('[data-cy=submit]').click();
    cy.wait(1000);
    cy.reload();

    cy.get('.MuiTypography-h6').contains(newName);
  });
});
