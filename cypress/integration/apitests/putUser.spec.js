/// <reference types = 'Cypress' />

const data = require('../../fixtures/example.json')

describe('POST USER REQUEST',function(){

    let accessToken = '37e5a4c6b62f26b033f61d42a8a08a4508209635fe0b8c1f746ce74ff3dfb69a'
    let randomText = ""
    let testEmail = ""

    it('Create user test',function(){

        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for(var i = 0;i<10;i++){
            randomText+= pattern.charAt(Math.floor(Math.random() * pattern.length))
            testEmail = randomText + '@gmail.com'
        }
        cy.request({
            method : 'POST',
            url : 'https://gorest.co.in/public/v1/users',
            headers : {
                'authorization' : 'Bearer ' + accessToken
            },
            body : {
                    "name": data.name,
                    "email": testEmail,
                    "gender":data.gender,
                    "status": data.status
            }
        }).then((res) => {
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('email',testEmail)
        }).then((resp) => {

            const userID = resp.body.data.id;
            cy.log(userID)
            //2. update user (Put call)
            cy.request({
                method : 'PUT',
                url : 'https://gorest.co.in/public/v1/users/'+userID,
                headers : {
                    'authorization' : 'Bearer ' + accessToken
                },
                body : {
                    "name": 'API Test Automation in Cypress 510',
                    "email": testEmail,
                    "gender":'female',
                    "status": 'inactive'
                }
            }).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.body.data).has.property('name','API Test Automation in Cypress 510')
            }).then((res) => {
                cy.request({
                method : 'GET',
                url : 'https://gorest.co.in/public/v1/users/'+userID,
                headers : {
                    'authorization' : 'Bearer ' + accessToken
                }
                }).then((result) => {
                    cy.log(JSON.stringify(result))
                    expect(result.status).to.eq(200)
                    expect(result.body.data).has.property('name','API Test Automation in Cypress 510')
                    expect(result.body.data).has.property('status','inactive')
                })
            })
        })
    })
})
