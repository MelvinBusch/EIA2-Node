"use strict";
const Http = require("http");
const Url = require("url");
const Database = require("./database");
var Server;
(function (Server) {
    let studis = {};
    const port = process.env.PORT || 8100;
    const server = Http.createServer((_request, _response) => {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
    });
    server.addListener("request", filterRequest);
    server.listen(port);
    function filterRequest(_request, _response) {
        let query = Url.parse(_request.url, true).query;
        if (query["action"]) {
            let action = query["action"];
            switch (action) {
                // Insert Studi
                case "insert":
                    let studi = JSON.parse(query["json"].toString());
                    Database.insert(studi);
                    _response.write("Student added!");
                    break;
                // Refresh Studis
                case "refresh":
                    _response.write(Database.refresh());
                    break;
                // Search Studi
                case "search":
                    let matrikel = JSON.parse(query["matrikel"].toString());
                    _response.write(Database.search(matrikel));
                default:
                    _response.write("Unknown command: " + action);
                    break;
            }
            // End Response
            _response.end();
        }
    }
})(Server || (Server = {}));
/*
function(json: string): void {
  respond(_response, json);
}*/ 
//# sourceMappingURL=server.js.map