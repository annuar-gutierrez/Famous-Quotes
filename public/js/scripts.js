// document.querySelector("#closeModal").addEventListener("click", ()=> { document.querySelector("#authorModal").close();} )

//import { response } from "express";

//       let authorLinks = document.querySelectorAll(".authorNames");
//        for (let i of authorLinks) {
//          i.addEventListener("click", displayAuthorInfo );
//        }

//        async function displayAuthorInfo(){
//          let authorId = this.getAttribute("authorId");
//          //alert("displaying author info..." + authorId);
//          let url = "/api/author/"+authorId;
//          let response = await fetch(url);
//          let data = await response.json();
//          //console.log(data[0].firstName);
//          document.querySelector("#authorName").textContent = data[0].firstName + " " + data[0].lastName;
//          document.querySelector("#authorPicture").src = data[0].portrait;

//          //enable the modal
//          document.querySelector("#authorModal").showModal();
//       }

let authorLinks = document.querySelectorAll("a");
for (authorLink of authorLinks){
  authorLink.addEventListener("click", getAuthorInfo);
}
async function getAuthorInfo() {
  var myModal = new bootstrap.Modal(document.getElementById('authorModal'));
  myModal.show();
  let url = `/api/author/${this.id}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  let authorInfo = document.querySelector("#authorInfo");
  authorInfo.innerHTML = `<h1> ${data[0].firstName} ${data[0].lastName} </h1>`;
  authorInfo.innerHTML += `<img src="${data[0].portrait}" width="200"><br>`
  authorInfo.innerHTML += `<h2>Country: ${data[0].country} <br> Birth: ${data[0].ISOdob} <br> Death: ${data[0].ISOdod} <br> Profession: ${data[0].profession} <br> Sex: ${data[0].sex} </h2>`
  authorInfo.innerHTML += `<p>${data[0].biography}</p>`
}