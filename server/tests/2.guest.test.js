const request = require("supertest")
const app = require("../app")

describe('Test Guest Features', function () {
    describe('Test register guest, post /guests route', () => {
        it('should return guest and status code 201', async () => {
            const res = await request(app)
                .post('/guests')
                .send({
                    name: 'guest',
                    phoneNumber: '081382062347',
                })
            expect(res.status).toEqual(201)
            expect(res.body).toHaveProperty('guest')
            expect(res.body.guest).toHaveProperty('id')
            expect(res.body.guest).toHaveProperty('name')
            expect(res.body.guest.name).toEqual('guest')
            expect(res.body.guest).toHaveProperty('phoneNumber')
            expect(res.body.guest.phoneNumber).toEqual('081382062347')
            expect(res.body.guest).toHaveProperty('status')
            expect(res.body.guest.status).not.toEqual(false)
        })
    })
})