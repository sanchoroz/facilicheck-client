describe('Login page title', () => {
  beforeEach(()=>{
    cy.visit('/')
  })

  it('should be correct', () => {
    cy.get('[data-cy=login-title]').contains('התחברות')

  })
})