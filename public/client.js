var Client;
(function (Client) {
    let inputs = document.getElementsByTagName("input");
    let searchResult;
    let adress = "http://localhost:8100/";
    function init(_event) {
        let insertButton = document.getElementById("insert");
        let refreshButton = document.getElementById("refresh");
        let searchButton = document.getElementById("search");
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
        searchResult = document.getElementById("search-result");
    }
    // Insert Studi
    function insert() {
        let genderButton = document.getElementById("male");
        let matrikel = inputs[2].value;
        let json = JSON.stringify({
            name: inputs[0].value,
            firstname: inputs[1].value,
            matrikel: parseInt(matrikel),
            age: parseInt(inputs[3].value),
            gender: genderButton.checked,
            course: inputs[6].value
        });
        let xhr = new XMLHttpRequest();
        xhr.open("GET", adress + "?action=insert&json=" + json, true);
        xhr.send();
    }
    // Refresh Studis
    function refresh() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", adress + "?action=refresh", true);
        xhr.send();
    }
    // Search Studi
    function search() {
        let searchKey = inputs[7].value;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", adress + "?action=search&matrikel=" + searchKey, true);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                searchResult.innerText = xhr.readyState + "";
            }
        };
    }
    window.addEventListener("load", init);
})(Client || (Client = {}));
//# sourceMappingURL=client.js.map