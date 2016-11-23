const http = require('http');
const querystring = require('querystring');
const hostname = '127.0.0.1';
const PORT = 3000;

function process(data) {
    console.log(data);
}

function handler(response) {
    let data = '';
    response.on('data', function (chunk) {
        data += chunk;
    });
    response.on('end', function () {
        process(data);
    });
}

// зарегистрируем на складе несколько позиций
var positions = [
    {name: 'Pencil', quantity: 10},
    {name: 'Colorpen', quantity: 4},
    {name: 'Paperbook', quantity: 60},
    {name: 'Notebook', quantity: 77},
];

positions.forEach((item) => {
    let data = querystring.stringify({
        name: item.name,
        quantity: item.quantity,
    });

    var options = {
        hostname: hostname,
        port: PORT,
        path: '/register',
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length' : Buffer.byteLength(data)
        }
    };

    const request = http.request(options);
    request.write(data);
    request.on('response', handler);
    request.end();
});

// добавление количества определенной позиции
var positions = [
    {id: 2, quantity: 45},
    {id: 3, quantity: 20},
];

positions.forEach((item) => {
    let data = querystring.stringify({
        id: item.id,
        quantity: item.quantity,
    });

    var options = {
        hostname: hostname,
        port: PORT,
        path: '/add',
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length' : Buffer.byteLength(data)
        }
    };

    const request = http.request(options);
    request.write(data);
    request.on('response', handler);
    request.end();
});

// удаление количества определенной позиции
var positions = [
    {id: 1, quantity: 10},
    {id: 3, quantity: 50},
    {id: 4, quantity: 22},
];

positions.forEach((item) => {
    let data = querystring.stringify({
        id: item.id,
        quantity: item.quantity,
    });

    var options = {
        hostname: hostname,
        port: PORT,
        path: '/delete',
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length' : Buffer.byteLength(data)
        }
    };

    const request = http.request(options);
    request.write(data);
    request.on('response', handler);
    request.end();
});

// запросим остаток на складе

var options = {
    hostname: hostname,
    port: PORT,
    path: '/remain',
    method: 'GET',
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
    }
};

const request = http.request(options);
request.on('response', handler);
request.end();
