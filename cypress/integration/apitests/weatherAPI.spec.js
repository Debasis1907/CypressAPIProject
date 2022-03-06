/// <reference types = 'Cypress' />

describe('check weather information',function(){

    xit('Get Weather information for cities',function(){
        
        //1. 1st Request : GET Locations
        cy.request({
            method : 'GET',
            url : 'https://www.metaweather.com/api//api/location/search/?query=san'
        }).then((res) => {
            const city = res.body[0].title
            return city
        }).then((city) => {

            //2. 2nd request : request based on city/location
            cy.request({
                method : 'GET',
                url : 'https://www.metaweather.com/api//api/location/search/?query=' + city
            }).then((resp) => {
                expect(resp.status).to.eq(200)
                expect(resp.body[0]).has.property('title',city)
            })
        })
    })

    it('Get Weather information for all cities',function(){
        
        //1. 1st Request : GET Locations
        cy.request({
            method : 'GET',
            url : 'https://www.metaweather.com/api//api/location/search/?query=San'
        }).then((res) => {
            const location = res.body
            return location
        }).then((location) => {

            for(let i = 0;i<location.length;i++){
                
                cy.request({
                    method : 'GET',
                    url : 'https://www.metaweather.com/api//api/location/search/?query=' + location[i].title
                }).then((resp) => {
                    expect(resp.status).to.eq(200)
                    expect(resp.body[0]).has.property('title',location[i].title)
                })
            }    
        })
    })
})