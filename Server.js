"use strict";
const Http = require("http");
const Url = require("url");
// import {StudiData} from "./Interfaces.js";
var Server;
(function (Server) {
    let studis = {};
    const port = process.env.PORT || 8100;
    const server = Http.createServer((_request, _response) => {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        //_response.end(); => Causing errors for some reason...
    });
    server.addListener("request", filterRequest);
    server.listen(port);
    function filterRequest(_request, _response) {
        let query = Url.parse(_request.url, true).query;
        if (query["action"]) {
            // Insert Studi
            if (query["action"] == "insert") {
                let studi = JSON.parse(query["json"].toString());
                studis[studi.matrikel] = studi;
                _response.write("Student added!");
            }
            // Refresh Studis
            if (query["action"] == "refresh") {
                _response.write(JSON.stringify(studis));
            }
            // Search Studi
            if (query["action"] == "search") {
                // console.log(matrikel);
                let matrikel = JSON.parse(query["matrikel"].toString());
                if (studis[matrikel])
                    _response.write(studis[matrikel]);
                else
                    _response.write("Kein Student gefunden! Bitte Suchanfrage anpassen");
            }
            // End Response
            _response.end();
        }
    }
})(Server || (Server = {}));
//# sourceMappingURL=server.js.map