/// <reference types = 'Cypress' />

describe('Get All Employees',function(){

    it('get employee test',function(){

        cy.request({
            method:'GET',
            url: 'http://dummy.restapiexample.com/api/v1/employees'
        }).then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.body.data[0].employee_name).to.equal('Tiger Nixon')
            expect(response.body).has.property('status','success')
            cy.log(response.body.status)
            
            expect(response.body.status).to.equal('success')

            cy.log(JSON.stringify(response.body.data[1]))

            cy.log(response.body.message)
            expect(response.body.message).to.equal('Successfully! All records has been fetched.')

            cy.log(JSON.stringify(response.body.data))
            const data = JSON.stringify(response.body.data)
            
            for(let i = 0;i<data.length;i++){
                cy.log(data[i].employee_name)
            }
        })
        
    })
})