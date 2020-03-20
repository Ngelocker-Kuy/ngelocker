const request = require("supertest")
const app = require("../app")

let tokenAdmin;

describe('Test Admin Features', function () {
    beforeAll((done) => {
        request(app)
            .post('/admin/login')
            .send({
                username: 'admin',
                password: 'adminlocker123',
            })
            .end((err, res) => {
                tokenAdmin = res.body.token
                done()
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
                .set({
                    token: tokenAdmin
                })
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
                .set({
                    token: tokenAdmin
                })
            expect(res.status).toEqual(200)
            expect(res.body).toEqual(reqs.body)
        })
    })

    describe('Test admin get all lockers, get /lockers route', () => {
        it('should return all lockers, status code 200', async () => {
            const res = await request(app)
                .get('/lockers')
                .set({
                    token: tokenAdmin
                })
            expect(res.status).toEqual(200)
            expect(res.body).toEqual(reqs.body)
        })
    })

    describe('Test /users/:id route', () => {
        it('should return user and status code 200', async () => {
            const res = await request(app)
                .delete('/users/1')
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('id')
            expect(res.body.id).toEqual(1)
            expect(res.body.user).toHaveProperty('name')
            expect(res.body.user.name).toEqual('pengguna locker')
            expect(res.body.user).toHaveProperty('email')
            expect(res.body.user.email).toEqual('pengguna@gmail.com')
            expect(res.body.user).toHaveProperty('username')
            expect(res.body.user.username).toEqual('pengguna')
            expect(res.body.user).toHaveProperty('password')
            expect(res.body.user.password).not.toEqual('123456')
        })

        it('should return users and status code 404', async () => {
            const res = await request(app)
                .delete('/users/2')
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Not found users')
        })

        it('should send an error with 401 status code because token undefined', async () => {
            const res = await request(app)
                .delete('/users/1')
            expect(res.statusCode).toEqual(401)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Unauthorized Invalid Token')
        })
    })

    describe('Test /lockers/:id route', () => {
        it('should return locker and status code 200', async () => {
            const res = await request(app)
                .delete('/lockers/1')
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('id')
            expect(res.body.id).toEqual(1)
            expect(res.body.locker).toHaveProperty('UserId')
            expect(res.body.locker.UserId).toEqual(1)
        })

        it('should return lockers and status code 404', async () => {
            const res = await request(app)
                .delete('/lockers/2')
                .set({
                    token: tokenAdmin
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Not found lockers')
        })

        it('should send an error with 401 status code because token undefined', async () => {
            const res = await request(app)
                .delete('/lockers/1')
            expect(res.statusCode).toEqual(401)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('Unauthorized Invalid Token')
        })
    })

    describe('Test admin update users, put /users route', () => {
        it('should return user and status code 200', async () => {
            const res = await request(app)
                .put('/users')
                .send({
                    name: 'pengguna di update',
                    email: 'penggunaUpdate@gmail.com',
                    username: 'pengguna update',
                    password: '1234567'
                })
                .set({
                    token: tokenAdmin
                })
            expect(res.status).toEqual(200)
            expect(res.body).toHaveProperty('user')
            expect(res.body.user).toHaveProperty('id')
            expect(res.body.user).toHaveProperty('name')
            expect(res.body.user.name).toEqual('pengguna di update')
            expect(res.body.user).toHaveProperty('email')
            expect(res.body.user.email).toEqual('penggunaUpdate@gmail.com')
            expect(res.body.user).toHaveProperty('username')
            expect(res.body.user.username).toEqual('pengguna update')
            expect(res.body.user).toHaveProperty('password')
            expect(res.body.user.password).not.toEqual('1234567')
        })
    })
})

describe('Test Admin Login Router', function () {
    describe('Test admin login, post /admin/login route', () => {
        it('should return admin, token and status code 200', async () => {
            const res = await request(app)
                .post('/admin/login')
                .send({
                    username: 'admin',
                    password: 'adminlocker123'
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('admin')
            expect(res.body.admin).toHaveProperty('id')
            expect(res.body.admin).toHaveProperty('name')
            expect(res.body.admin.name).toHaveProperty('admin')
            expect(res.body.admin).toHaveProperty('username')
            expect(res.body.admin.username).toEqual('admin')
            expect(res.body.admin).toHaveProperty('password')
            expect(res.body.admin.password).not.toEqual('adminlocker123')
            expect(res.body).toHaveProperty('token')
        })

        it('should return status code 404 when password wrong', async () => {
            const res = await request(app)
                .post('/admin/login')
                .send({
                    username: 'admin',
                    password: 'beda password',
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('username/password wrong')
        })

        it('should return status code 404 when username wrong', async () => {
            const res = await request(app)
                .post('/admin/login')
                .send({
                    username: 'admin salah',
                    password: 'adminlocker123',
                })
            expect(res.statusCode).toEqual(404)
            expect(res.body).toHaveProperty('message')
            expect(res.body.message).toEqual('username/password wrong')
        })
    })
})