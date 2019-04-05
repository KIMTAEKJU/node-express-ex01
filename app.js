const http = require('http'); // 내장 http모듈
const express = require('express');

const port = 3000;
const app = express(); // express 객체생성
const router = express.Router();

app.use('/'/* contextPath*/, router.get('/', function (req, res) { /* 실제 url*/

    res.send('Hello World'); // 응답
}));

console.log(typeof app);
const server = http.createServer(app); // express객체 사용

const onError = function (error) {

    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = function () {  // port 뒤에 써주던 function
    console.log("httpd starts..");
    const addr = server.address();

    // server가 어디에 바인드 되었는지 표시해주기위해
    const bind = (typeof addr === "string") ?  'pipe' + addr :
                                                'port' + addr.port;

    console.log('Listening on ' + bind);

};

server.on('error', onError) // 이벤트달아줌
server.on('listening', onListening); // 이벤트 달아줌
server.listen(port); // 뒤에 function을 뺴고 밖에다 만들어줌 깔끔

