const request = require("supertest")
const app = require("../app")

describe('Test Admin Features', function () {
    describe('Test admin login, post /admin/login route', () => {
        it('should return admin, token and status code 200', async () => {
            const res = await request(app)
                .post('/admin/login')
                .send({

                })
        })
    })

    describe('Test admin add users, post /users route', () => {
        it('should return user, status code 201', async () => {
            const res = await request(app)
                .post('/users')
                .send({
                    name: 'pengguna locker',
                    email: 'pengguna@gmail.com',
                    username: 'pengguna',
                    password: '123456'
                })
                .set
            expect(res.status).toEqual(201)
            expect(res.body).toHaveProperty('user')
            expect(res.body.user).toHaveProperty('id')
            expect(res.body.user).toHaveProperty('name')
            expect(res.body.user.name).toEqual('pengguna locker')
            expect(res.body.user).toHaveProperty('email')
            expect(res.body.user.email).toEqual('pengguna@gmail.com')
            expect(res.body.user).toHaveProperty('username')
            expect(res.body.user.username).toEqual('pengguna')
            expect(res.body.user).toHaveProperty('password')
            expect(res.body.user.password).not.toEqual('123456')
        })
    })

    describe('Test admin get all users, get /users route', () => {
        it('should return all users, status code 200', async () => {
            const res = await request(app)
                .get('/users')
            expect(res.status).toEqual(200)
            expect(res.body).toEqual(reqs.body)
        })
    })

})