"use strict";
const Http = require("http");
const Url = require("url");
// import {StudiData} from "./Interfaces.js";
var Server;
(function (Server) {
    let studis = {};
    // End of Interfaces 
    let port = process.env.PORT || 8100;
    let server = Http.createServer((_request, _response) => {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.end();
    });
    server.addListener("request", handleRequest);
    server.listen(port);
    function handleRequest(_request, _response) {
        let query = Url.parse(_request.url, true).query;
        if (query["action"]) {
            switch (query["action"]) {
                case "insert":
                    insert();
                    break;
                case "refresh":
                    refresh();
                    break;
                case "search":
                    //search(query[""], _response);
                    _response.write("Search");
                    break;
                default: error();
            }
        }
        _response.end();
    }
    // Insert Studi
    function insert() {
        console.log("insert");
    }
    // Refresh
    function refresh() {
        console.log("refresh");
    }
    // Search
    function search(_searchKey, _response) {
        if (studis[_searchKey])
            _response.write(studis[_searchKey]);
        else
            _response.write("Kein Student unter dieser Matrikelnummer gefunden!");
    }
    // Error Handling
    function error() {
        alert("Fehler: Bitte Eingabe nochmals überprüfen!");
    }
})(Server || (Server = {}));
//# sourceMappingURL=Server.js.map