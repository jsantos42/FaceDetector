const http = require('http');

const nodeServer = http.createServer((request, response) => {
    console.log('headers', request.headers);
    console.log('method', request.method);
    console.log('url', request.url);

    const user = {
        name: 'Joao',
        hobby: 'skating',
    }

    // this response will be sent for every request, no matter the url or
    // the method used; there are no routes implemented here. Compare this
    // with express.js
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(user));
})

nodeServer.listen(3000);