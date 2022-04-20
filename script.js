
// Selecting the tbody
 let parentDiv = document.getElementById("parent-div"); 


// Get the data form API
async function getResponse(){
   try {
    let response = await fetch("https://6251823cdfa31c1fbd6ee6d2.mockapi.io/datas");
    let response1 = await response.json();
    console.log(response);
    console.log(response1);
    for(let i=0;i<response1.length;i++){
          
// appending the datas into the table body
 let trow = document.createElement("tr");


  let tdid = document.createElement("td");
      tdid.innerHTML=`${response1[i].id}`;

  let tdname = document.createElement("td");
      tdname.innerHTML=`${response1[i].name}`;


 let tddate = document.createElement("td");
      tddate.textContent=`${response1[i].createdAt}`;
  
// event for view button
let tdview = document.createElement("td");
let view = document.createElement("button");
view.classList.add("btn","btn-info");
view.textContent="View";
view.setAttribute("data-bs-toggle","modal");
view.setAttribute("data-bs-target","#exampleModal");
        view.addEventListener('click',()=>{
            fetch(`https://6251823cdfa31c1fbd6ee6d2.mockapi.io/datas/${response1[i].id}`)
                .then((data)=>data.json())
                .then((data)=>{
                    let viewModalBody= document.getElementById("viewModalBody");
                    let htmlcontent= ` 
                         <label>Id</label> : <label>${data.id}</label><br>
                        <label>Name</label> : <label>${data.name}</label><br>
                        <label>Date</label> : <label>${data.createdAt}</label><br>
                        <label>Avatar</label> : <label>${data.avatar}</label>
                   `
                   console.log(data)
                viewModalBody.innerHTML= htmlcontent;
                }).catch((error)=>console.log(error))
        })
 

// event for edit button
let tdedit = document.createElement("td");
let edit = document.createElement("button");
edit.classList.add("btn","btn-warning");
edit.textContent="Edit";
edit.setAttribute("data-bs-toggle","modal");
edit.setAttribute("data-bs-target","#editModal");
     edit.addEventListener("click",()=>{
        fetch(`https://6251823cdfa31c1fbd6ee6d2.mockapi.io/datas/${response1[i].id}`)
            .then((data)=>data.json())
            .then((data)=>{
                let editModalBody= document.getElementById("editModalBody");
                let htmlcontent= ` 
                     <label>Id</label> : <label id="lblid">${data.id}</label><br>
                    <label>Name</label> :<input type="text" id="txtname" value="${data.name}"> <br>
                    <label>Date</label> : <label id="lblat">${data.createdAt}</label><br>
                    <label>Avatar</label> : <label id="lblava">${data.avatar}</label>
               `
               console.log(data)
            editModalBody.innerHTML= htmlcontent;
            }).catch((error)=>console.log(error))
    })
    
    // event for delete button
    let tddelete = document.createElement("td");
    let deleteb = document.createElement("button");
    deleteb.classList.add("btn","btn-danger");
    deleteb.textContent="Delete";
    
     deleteb.addEventListener("click", (event)=>{
        if(confirm(`Are you sure to delete the record with Id: ${response1[i].id}`)){
            fetch(`https://6251823cdfa31c1fbd6ee6d2.mockapi.io/datas/${response1[i].id}`,{
                method: "DELETE",
            }).then((data)=>console.log(data)).then(() => location.reload()).catch((error)=>console.log(error))
        }
    })

    tdview.append(view);
    tdedit.append(edit);
    tddelete.append(deleteb);
    trow.append(tdid,tdname,tddate,tdview,tdedit,tddelete);
    parentDiv.append(trow);
  }

   if(!response.ok) throw new Error("Failed to get the datas");

   } catch (error) {
       console.log(error.message)
   }
}

getResponse();

// Function for update button

function updateHandler(){
    let id = document.getElementById("lblid").innerText;
    let name = document.getElementById("txtname").value;
    let createdAt = document.getElementById("lblat").innerText;
    let avatar = document.getElementById("lblava").innerText;

    let data={ id,name,createdAt,avatar}
    fetch(`https://6251823cdfa31c1fbd6ee6d2.mockapi.io/datas/${id}`,{
                method: "PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data),
            }).then((data)=>data.json()).then((data)=>console.log(data)).then(() => location.reload()).catch((error)=>console.log(error))
}

//create newd data and submit

let submitBtn= document.getElementById("submit");
submitBtn.addEventListener("click",createHandler)

function createHandler(event){
    event.preventDefault();
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;

    let data = {id,name}
    fetch(`https://6251823cdfa31c1fbd6ee6d2.mockapi.io/datas`,{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data),
    }).then((data)=>data.json()).then((data)=>console.log(data)).then(() => location.reload()).catch((error)=>console.log(error))
}