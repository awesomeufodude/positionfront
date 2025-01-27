// cypress/e2e/article_form.cy.js

describe('Article Management Flow', () => {
  beforeEach(() => {
    // Log in before each test
    cy.login()
  })
  // Updated Cypress test for selecting a category
   it('Successfully creates an article with a rating', () => {
     cy.visit('http://localhost:3000/articles')

     cy.get('[data-cy="create-article-button"]').click({ force: true })

     // Fill in the form fields
     cy.get('input#title').type('New Cypress Article')
     cy.get('textarea#description').type('This is a test description for the Cypress article.')

     // Ensure the category selector is visible and select a category
     cy.get('[data-testid="56be2619-f8a0-44ae-9e50-615433664395"]').should('exist').check()

     // Set a rating
     cy.get('[data-testid="rate-component"]').eq(3).click({ force: true })

     // Submit the form
     cy.contains('Create').click()

   })

  it('Fails to edit a non-existent article', () => {
    // Visit a non-existent article edit page
    cy.visit('http://localhost:3000/articles/non-existent-article-id')

    // Validate that an error message is displayed
    cy.contains('Failed to fetch the article.').should('be.visible')

    // Ensure that no form fields are displayed
    cy.get('form').should('not.exist')
  })

  it('Handles server error during article creation', () => {
    // Simulate a server error
    cy.intercept('POST', 'https://positionback-b7f5793f9d74.herokuapp.com/api/articles', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('createArticle')

    cy.visit('http://localhost:3000/articles')

    // Open the "Create Article" modal
    cy.contains('Create Article').click()

    // Fill in the form fields
    cy.get('input#title').type('Error Article')
    cy.get('textarea#description').type('This article will trigger a server error.')
    cy.get('[data-testid="56be2619-f8a0-44ae-9e50-615433664395"]').should('exist').check()

    // Submit the form
    cy.contains('Create').click({ force: true })
  })
})
