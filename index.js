const addNotes = document.querySelector(".add-notes"),
    popupBox = document.querySelector(".popup-main"),
    popupTitle = popupBox.querySelector("header p"),
    closeIcon = popupBox.querySelector("header img"),
    titleTag = popupBox.querySelector("input"),
    descTag = popupBox.querySelector(".editor"),
    addBtn = popupBox.querySelector(".add-note-button");
let highLights = document.querySelectorAll(".highLight");
let optionsButtons = document.querySelectorAll(".option-button");
let writingArea = document.getElementById("textArea");


let copyText = document.querySelector("#copy-text");
let boldText = document.querySelector("#bold");
let italicsText = document.querySelector("#italics");
let underlineText = document.querySelector("#underline");


const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addNotes.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Note";
    addBtn.innerText = "Add Note";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if (window.innerWidth > 660) titleTag.focus();
});
closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a new note";
    document.querySelector("body").style.overflow = "auto";
});
function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                             <p>${note.title}</p>
                             <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                             <span>${note.date}</span>
                             <div class="settings">
                                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>     
                                    <ul class="menu">
                                    <li onClick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                                     <li onClick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                                    </ul>
                            </div>                             
                        </div>
                    </li>`;
        addNotes.insertAdjacentHTML("afterend", liTag);
    })
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}
copyText.addEventListener("click", () => {
    let input = descTag.innerText;

    navigator.clipboard.writeText(input);
});
highLights.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("here");
      button.classList.toggle("active");
    });
  });
  
  const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
  };
  optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modifyText(button.id, false, null);
    });
  });
function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addNotes.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
    console.log(noteId, title, desc);
}
addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value;
  let noteDesc = writingArea.innerHTML;
  let data = writingArea.innerText;
    if (noteTitle || noteDesc) {
        let dateObj = new Date(),
            month = months[dateObj.getMonth()],
            day = dateObj.getDate(),
            year = dateObj.getFullYear();
        let noteInfo = {
            title: noteTitle, description: noteDesc, data: data,
            date: `${month} ${day}, ${year}`
        }
        if (!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        //console.log(noteInfo);
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});
