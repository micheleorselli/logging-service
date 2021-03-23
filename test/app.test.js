const request = require('supertest')
const app = require('../src/app')
const mongo = require('../src/mongoSchema')

describe('test app rest endpoints', () => {

    beforeAll(async () => {
        console.log('connecting..')
        await mongo.connect()
    });

    beforeEach(async () => {
        await mongo.clearCollection('logs')
    });

    afterAll(async () => {
        console.log('disconnecting...')
        await mongo.disconnect()
    });


    test('It should return Hello World', async () => {

        await request(app).post("/").send({msg : 'uno'})
        await request(app).post("/").send({msg : 'due'})
        await request(app).post("/").send({msg : 'tre'})


        const response = await request(app).get('/')

        expect(response.statusCode).toBe(200)
        expect(response.body[0].msg).toEqual('uno')
        expect(response.body[1].msg).toEqual('due')
        expect(response.body[2].msg).toEqual('tre')
    })

})