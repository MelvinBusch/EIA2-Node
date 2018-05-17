import * as Http from "http";
import * as Url from "url";
// import {StudiData} from "./Interfaces.js";

namespace Server {

  // Temporär: Interfaces
  interface Studi {
    name: string;
    firstname: string;
    matrikel: number;
    age: number;
    gender: boolean;
    course: string;
  }
  interface Studis {
    [matrikel: string]: Studi;
  }
  interface UrlObject {
    [key: string]: string
  }
  let studis: Studis = {};
  // End of Interfaces 

  let port: number = process.env.PORT || 8100;
  let server: Http.Server = Http.createServer((_request: Http.IncomingMessage, _response: Http.ServerResponse) => {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.end();
  });

  server.addListener("request", handleRequest);
  server.listen(port);

  function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    let query: UrlObject = Url.parse(_request.url, true).query;

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
  function insert(): void {
    console.log("insert");
  }

  // Refresh
  function refresh(): void {
    console.log("refresh");
  }

  // Search
  function search(_searchKey: string, _response: Http.ServerResponse): void {
    if (studis[_searchKey])
      _response.write(studis[_searchKey]);
    else
      _response.write("Kein Student unter dieser Matrikelnummer gefunden!");
  }

  // Error Handling
  function error(): void {
    alert("Fehler: Bitte Eingabe nochmals überprüfen!");
  }

}