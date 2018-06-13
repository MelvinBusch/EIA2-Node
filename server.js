"use strict";
const Http = require("http");
const Url = require("url");
const Database = require("./database");
let port = process.env.PORT || 8100;
const server = Http.createServer((_request, _response) => {
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
});
server.addListener("listening", () => console.log("Listening on Port: " + port));
server.addListener("request", handleRequest);
server.listen(port);
function handleRequest(_request, _response) {
    let query = Url.parse(_request.url, true).query;
    let action = query["action"];
    switch (action) {
        // Insert Studi
        case "insert":
            let studi = JSON.parse(query["json"]);
            Database.insert(studi);
            respond(_response, "Student added!");
            break;
        // Refresh Studis
        case "refresh":
            Database.find(function (json) {
                respond(_response, json);
            }, "*");
            break;
        // Search Studi
        case "search":
            let matrikel = JSON.parse(query["matrikel"].toString());
            Database.find(function (json) {
                respond(_response, json);
            }, matrikel);
            break;
        default:
            respond(_response, "Unknown command: " + action);
            break;
    }
}
// Create Response
function respond(_response, _responseText) {
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_responseText);
    _response.end();
}
//# sourceMappingURL=server.js.map