const http = require('http')
const app = require('../app')
const PORT = process.env.PORT || 3000

app.set('PORT', PORT)

const server = http.createServer(app)

server.listen(PORT, function () {
    console.log(`connection listening port ${PORT}`);
})