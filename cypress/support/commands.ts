import chai from 'chai'
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
      drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      visit(originalFn: CommandOriginalFn<any>, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: 'https://positionback-b7f5793f9d74.herokuapp.com/api/users/login', // Replace with your login API endpoint
    body: {
      email: 'john.doe@example.com',
      password: 'SecurePassword123',
    },
  }).then((response) => {
    const { token } = response.body
    localStorage.setItem('token', token) // Store token in localStorage
  })
})
