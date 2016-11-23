const http = require('http');
const querystring = require('querystring');
const PORT = process.env.PORT || 3000;

const database = [];

const server = http.createServer();
server
    .listen(PORT)
    .on('error', err => console.error(err))
    .on('request', handler)
    .on('listening', () => {
        console.log('Start HTTP on port %d', PORT);
    });

function handler(req, res) {
    let data = '';
    req.on('data', chunk => data+=chunk);
    req.on('end', () => {
        console.log('requested with path: ' + req.url + ', with data: ' + data);

        let answer = {};

        switch(req.url) {

            case '/register':
                var position = querystring.parse(data);
                var name = position.name || false;
                var quantity = parseInt(position.quantity) || false;
                if (name && quantity) {
                    if (database.length > 0) {
                        var id = Math.max.apply(Math, database.map(function(obj) {return obj.id;})) + 1;
                    }
                    else {
                        var id = 1;
                    }

                    database.push({id: id, name: name, quantity: quantity});

                    answer.id = id;
                    answer.name = name;
                    answer.quantity = quantity;
                }
                break;

            case '/add':
                var position = querystring.parse(data);
                var id = parseInt(position.id) || false;
                var quantity = parseInt(position.quantity) || false;

                var need = database.findIndex((item) => item.id == id);

                if (need > -1) {
                    database[need].quantity += quantity;
                    answer = database[need];
                }
                break;

            case '/delete':
                var position = querystring.parse(data);
                var id = parseInt(position.id) || false;
                var quantity = parseInt(position.quantity) || false;

                var need = database.findIndex((item) => item.id == id);

                if (need > -1) {
                    database[need].quantity -= quantity;
                    answer = database[need];
                }
                break;

            case '/remain':
                answer = database;
                break;
            default:
                break;
        }

        res.writeHead(200, 'OK', {'Content-Type': 'application/json'});
        res.write(JSON.stringify(answer));
        res.end();

        // выведем текущий статус БД
        console.log(database);
    });
}
