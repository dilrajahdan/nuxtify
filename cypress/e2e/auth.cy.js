describe('Authentication', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  describe('Registration', () => {
    beforeEach(() => {
      cy.visit('/auth/register')
      // Wait for page to hydrate
      cy.wait(2000)
    })

    it('should display registration form', () => {
      cy.get('[data-test="register-form"]').should('be.visible')
      cy.get('[data-test="fullname-input"]').should('be.visible')
      cy.get('[data-test="email-input"]').should('be.visible')
      cy.get('[data-test="password-input"]').should('be.visible')
      cy.get('[data-test="terms-checkbox"]').should('be.visible')
      cy.get('[data-test="register-button"]').should('be.visible')
    })

    it('should show validation errors', () => {
      cy.get('[data-test="register-button"]').click()
      cy.contains('This field is required').should('be.visible')
    })

    it('should navigate to login page', () => {
      cy.get('[data-test="login-link"]').click()
      cy.url().should('include', '/auth/login')
    })
  })

  describe('Login', () => {
    beforeEach(() => {
      cy.visit('/auth/login')
      cy.wait(2000)
    })

    it('should display login form', () => {
      cy.get('[data-test="login-form"]').should('be.visible')
      cy.get('[data-test="email-input"]').should('be.visible')
      cy.get('[data-test="password-input"]').should('be.visible')
      cy.get('[data-test="login-button"]').should('be.visible')
    })

    it('should show validation errors', () => {
      cy.get('[data-test="login-button"]').click()
      cy.contains('This field is required').should('be.visible')
    })
  })
}) 