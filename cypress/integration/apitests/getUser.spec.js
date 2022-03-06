/// <reference types = 'Cypress' />

describe('Get API Users Tests',function(){

    let accessToken = '37e5a4c6b62f26b033f61d42a8a08a4508209635fe0b8c1f746ce74ff3dfb69a'

    it('Get users' ,function(){

        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public-api/users',
            headers : {
                'authorization': 'Bearer ' + accessToken
            }
        }).then((res) => {
            cy.location(JSON.stringify(res.body))
            expect(res.status).to.eq(200)
            expect(res.body.meta.pagination.limit).to.eq(20)
        })
    })

    it('Get users by ID Test' ,function(){

        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public-api/users/4',
            headers : {
                'authorization': 'Bearer ' + accessToken
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.data.name).to.eq('Narayan Patil')
        })
    })
})