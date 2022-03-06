/// <reference types="cypress" />

let fakeUser;

describe('Given the Users api', () => {

  context('When I send POST /usuarios', () => {
    it('Then it should create a new user', () => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: {
            
                "nome": "Fulano da Silva",
                "email": "patro@gmail.com",
                "password": "teste",
                "administrador": "true"             
        }
      })
        .should((response) => {
          expect(response.status).eq(201)
          expect(response.body.message).eq("Cadastro realizado com sucesso")
        });
    });
  });
});