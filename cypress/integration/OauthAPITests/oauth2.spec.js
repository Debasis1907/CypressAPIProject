/// <reference types = 'Cypress' />

describe('OAuth API TEST',function(){

    let accessToken = ''
    let userID = ''

    beforeEach('Get Token And User ID',function(){

        cy.request({
            method : 'POST',
            url : '/token',
            form : true,
            body : {
                'client_id' : 'CypressAPITest',
                "client_secret" : '289fc7c255037f5de54cfed1dd319e75',
                'grant_type' : 'client_credentials'
            }
        }).then(response => {
            cy.log(response.body.access_token)
            accessToken = response.body.access_token

            // get user id
            cy.request({
                method : 'GET',
                url : '/api/me',
                headers : {
                    'authorization' : 'Bearer ' + accessToken
                }
            }).then(response => {
                cy.log(JSON.stringify(response))
                userID = response.body.id;
                cy.log(userID)
            })
        })
    })

    it('Feed Your Chickens',function(){

        cy.request({
            method : 'POST',
            url : '/api/'+userID+'/chickens-feed',
            headers : {
                'authorization' : 'Bearer ' + accessToken
            }
        }).then(response => {
            cy.log(JSON.stringify(response))
        })
    })

    it('Collect Eggs from Your Chickens',function(){

        cy.request({
            method : 'POST',
            url : '/api/'+userID+'/eggs-collect',
            headers : {
                'authorization' : 'Bearer ' + accessToken
            }
        }).then(response => {
            cy.log(JSON.stringify(response))
        })
    })
       
})