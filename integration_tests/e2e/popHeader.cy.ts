context('PoP Header partial', () => {
  beforeEach(() => {
    cy.task('resetMocks')
  })

  it('shows the new popHeader component when enableSupervisionPackagePoPHeader is true', () => {
    cy.task('stubFeatureFlag', { key: 'enableSupervisionPackagePoPHeader', enabled: true })
    cy.visit('/case/X000001')

    cy.get('[data-qa="new-pop-header"]').should('exist').and('contain.text', 'X000001')
    cy.get('[data-qa="legacy-pop-header"]').should('not.exist')
  })

  it('shows the legacy header when enableSupervisionPackagePoPHeader is false', () => {
    cy.task('stubFeatureFlag', { key: 'enableSupervisionPackagePoPHeader', enabled: false })
    cy.visit('/case/X000001')

    cy.get('[data-qa="legacy-pop-header"]').should('exist').and('contain.text', 'X000001')
    cy.get('[data-qa="new-pop-header"]').should('not.exist')
  })

  it('shows only the person header when enablePersonHeader is true', () => {
    cy.task('stubFeatureFlag', { key: 'enablePersonHeader', enabled: true })
    cy.visit('/case/X000001')

    cy.get('.person-header [data-qa="crn"]').should('exist').and('contain.text', 'X000001')
    cy.get('[data-qa="legacy-pop-header"]').should('not.exist')
    cy.get('[data-qa="new-pop-header"]').should('not.exist')
    cy.get('.moj-page-header-actions').should('not.exist')
  })

  it('shows only the legacy header and actions block when enablePersonHeader is false', () => {
    cy.task('stubFeatureFlag', { key: 'enablePersonHeader', enabled: false })
    cy.visit('/case/X000001')

    cy.get('[data-qa="legacy-pop-header"]').should('exist').and('contain.text', 'X000001')
    cy.get('.moj-page-header-actions').should('exist')
    cy.get('.person-header').should('not.exist')
  })

  it('person risk flags are displayed when enablePersonHeader is true', () => {
    cy.task('stubFeatureFlag', { key: 'enablePersonHeader', enabled: true })
    cy.visit('/case/X000001')

    cy.get('.person-header [data-qa="crn"]').should('exist').and('contain.text', 'X000001')

    cy.get('[data-qa="risk-badge-5"]').should('be.visible').and('contain.text', 'Risk to public - High')

    cy.get('[data-qa="risk-badge-1"]').should('be.visible').and('contain.text', 'Risk to staff - High')

    cy.get('[data-qa="risk-badge-2"]').should('be.visible').and('contain.text', 'Domestic abuse perpetrator')

    cy.get('[data-qa="risk-badge-3"]').should('be.visible').and('contain.text', 'Risk to known adult - Low')

    cy.get('[data-qa="risk-badge-8"]').should('be.visible').and('contain.text', 'Sexual conviction - Low')

    cy.get('[data-qa="risk-badge-6"]').should('be.visible').and('contain.text', 'County lines - victim')

    cy.get('[data-qa="risk-badge-7"]').should('be.visible').and('contain.text', 'Contact suspended')

    cy.get('[data-qa="risk-badge-more"]').should('be.visible').and('contain.text', '+1 active risk flags')
  })
})
