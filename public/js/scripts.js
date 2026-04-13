
let authorLinks = document.querySelectorAll("a");
for (authorLinks of authorLinks) {
    authorLinks.addEventListener("click", getAuthorInfo);
}

async function getAuthorInfo(){
    let url = `/api/author/${this.id}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let authorInfo = document.querySelector("#authorInfo");
    authorInfo.innerHTML = <h1> ${data[0].firstName}  ${data[0].lastName} </h1>
    authorInfo.innerHTML += `<img src="${data[0].portrait}" width="200"><br>`;
}