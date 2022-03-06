///<reference types = 'Cypress'/>
describe('Given the users API',()=>{
    context('When i send the Get/usuarios',() => {
        it('Then it should return a list with all registered users',() => {
            cy.request({
                method:'GET',
                url:'https://serverest.dev/usuarios'
            }).should((response) =>{
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.equal(200)
                expect(response.body.quantidade).to.equal(response.body.usuarios.length)
                expect(response.body.usuarios[0].email).to.not.be.null
                Cypress._.each(response.body.usuarios,(usuarios) => {
                    expect(usuarios.email).to.not.be.null
                    cy.log(usuarios.email)
                    cy.log(usuarios.password)
                    expect(usuarios.email).to.equal('fulano@qa.com')
                })
            })
        })
    })

    context('When I send GET /usuarios passing id query param',() => {
        it('Then it should return only the filtered user',() => {
            cy.request({
                method:'GET',
                url:'https://serverest.dev/usuarios',
                qs:{
                    _id:'0uxuPY0cbmQhpEz1'
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.usuarios[0].email).to.eq('fulano@qa.com')
            })
        })
    })
})