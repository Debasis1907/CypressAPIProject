///<reference types = 'Cypress'/>
describe('Products API',function(){
    it('Get /products',function(){
        cy.request({
            method:'GET',
            url:'https://serverest.dev/produtos'
        }).then((response) => {
            expect(response.status).to.equal(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body.produtos.length).to.be.eq(2)
            expect(response.body.quantidade).to.eq(2)
            cy.log(JSON.stringify(response.body.produtos[0]))
            cy.log(JSON.stringify(response.body.produtos[0].nome))
            expect(response.body.produtos[0]).to.have.all.keys('nome','preco','descricao','quantidade','_id')
            Cypress._.each(response.body.produtos,(produtos) => {
                cy.log(produtos.nome)
            })
        })
    })
})