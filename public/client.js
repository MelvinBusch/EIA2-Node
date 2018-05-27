var Client;
(function (Client) {
    const adress = "http://localhost:8100/";
    let inputs;
    let searchResult;
    let refreshArea;
    function init(_event) {
        inputs = document.getElementsByTagName("input");
        let insertButton = document.getElementById("insert");
        let refreshButton = document.getElementById("refresh");
        let searchButton = document.getElementById("search");
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
        searchResult = document.getElementById("search-result");
        refreshArea = document.getElementsByTagName("textarea")[0];
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
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
                alert(xhr.responseText);
        };
    }
    // Refresh Studis
    function refresh() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", adress + "?action=refresh", true);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                let studis = JSON.parse(xhr.responseText.toString());
                let answer = "";
                for (let studi in studis) {
                    answer += `Matrikel: ${studi}\n`;
                    answer += `Lastname: ${studis[studi].name}\n`;
                    answer += `Firstname: ${studis[studi].firstname}\n`;
                    answer += `Age: ${studis[studi].age}\n`;
                    answer += `Gender: ${studis[studi] ? "male" : "female"}\n`;
                    answer += `Course: ${studis[studi].course}\n\n`;
                }
                refreshArea.innerText = answer;
            }
        };
    }
    // Search Studi
    function search() {
        let searchKey = inputs[7].value;
        if (searchKey != "") {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", adress + "?action=search&matrikel=" + searchKey, true);
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    searchResult.innerText = xhr.responseText;
                }
            };
        }
        else {
            searchResult.innerText = "Bitte Suchanfrage eingeben!";
        }
    }
    window.addEventListener("load", init);
})(Client || (Client = {}));
//# sourceMappingURL=client.js.map