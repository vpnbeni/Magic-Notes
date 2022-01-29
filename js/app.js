showNotes();

//If user adds a note, add it to the localStorage
console.log("Project 1");
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTitle = document.getElementById("addTitle");
  let addNote = document.getElementById("addNote");
  let addTxt = {
    title: addTitle.value,
    note: addNote.value,
  };
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = "";
  addNote.value = "";
  showNotes();
});
//function to show elemtents from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";

  notesObj.forEach(function (element, index) {
    html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem">
          <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.note}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-sm btn-primary">Delete Note</button> <button id="${index}" onclick="markImp(this.id)" class="btn btn-danger btn-sm mx-2" id="addImp" >Mark Important</button>
          </div>
        </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

//function to delete note
function deleteNote(index) {
  // console.log(`I am deleting ${index}`);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//function to show search results while user enter text in search bar
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log("input event fired!", inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    // console.log(cardTxt);
    if (cardTxt.toLowerCase().includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

// function to mark the note important
function markImp(index) {
  let noteCard = document.getElementsByClassName("noteCard")[index];
  noteCard.classList.add(`border-danger`, `border-4`);
  let btnRem = noteCard.children[0].children[3];
  btnRem.classList.replace("btn-danger", "btn-info");
  btnRem.innerText = "Unmark";
  btnRem.id.replace("addImp", "removeImp");
  btnRem.removeAttribute(`onclick`, `markImp(this.id)`);
  btnRem.setAttribute(`onclick`, `unmarkImp(this.id)`);
}

// function to unmark the note important
function unmarkImp(index) {
  let noteCard = document.getElementsByClassName("noteCard")[index];
  noteCard.classList.remove(`border-danger`, `border-4`);
  let btnRem = noteCard.children[0].children[3];
  btnRem.classList.replace("btn-info", "btn-danger");
  btnRem.innerText = "Mark Important";
  btnRem.id.replace("removeImp", "addImp");
  btnRem.removeAttribute(`onclick`, `unmarkImp(this.id)`);
  btnRem.setAttribute(`onclick`, `markImp(this.id)`);
}

// function to add title to notes
