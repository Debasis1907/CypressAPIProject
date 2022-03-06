/// <reference types = "Cypress"/>

describe('REST API TEST WITH CYPRESS',function(){

    it('API TEST - HEADER VALIDATION',function(){

        cy.request('https://pokeapi.co/api/v2/pokemon/25').as('pokemonEndPoint')
        cy.get('@pokemonEndPoint').its('headers').its('content-type')
        .should('include','application/json; charset=utf-8')
    })

    it('API TEST - STATUS VALIDATION',function(){

        cy.request('https://pokeapi.co/api/v2/pokemon/25').as('pokemonEndPoint')
        cy.get('@pokemonEndPoint').its('status')
        .should('equal',200)
    })

    it('API TEST - validate name value',function(){

        cy.request('https://pokeapi.co/api/v2/pokemon/27').as('pokemonEndPoint')
        cy.get('@pokemonEndPoint').its('body')
        .should('include',{name:'sandshrew'})
    })

    it('API TEST - 404 ERROR STATUS VALIDATION',function(){

        cy.request({
            method:'GET',
            url:'https://pokeapi.co/api/v2/pokemon/1000',
            failOnStatusCode:false
        })
            .as('pokemonEndPoint')
        cy.get('@pokemonEndPoint').its('status')
        .should('equal',404)
    })
})

// Commmand to open test Runner
// 1. cypress open
//2. yarn run cypress open
//3. npm run test when declared in package.json
//4. npx cypress open
//5. .\node_modules\.bin\cypress open