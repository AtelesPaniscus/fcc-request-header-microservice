'use strict';

const express = require('express');

const port = process.env.PORT || 8080;

var app = express();

app.use(express.static(process.cwd() + '/views'));
app.use('/public', express.static(process.cwd() + '/public'));

app.get("/api/whoami", (request, response) => {
    response.json(extract_fromRequestHeader(request.headers));
});

app.set('json spaces', 2);

app.listen(port,  function () {
        console.log('Node.js listening on port ' + port + '...');
});

function extract_fromRequestHeader(header) {
    var template = {
        "ipaddress":    "",
        "language":     "",
        "software":     ""
    }

    template.ipaddress = header['x-forwarded-for'].split(',' ,1)[0];
    template.language  = header['accept-language'].split(',' ,1)[0];

    var s = header['user-agent'];
    template.software  = s.slice(s.indexOf("(") + 1, s.indexOf(")"));

    return template;
}
