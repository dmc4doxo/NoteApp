const AddNoteBtn = document.querySelector(".add-note-btn");

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

AddNoteBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
      <div class="tools">
        <button class="edit-btn">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
      </div>
      <div class="main-area ${text ? "" : "hidden"}">
      </div>
      <textarea class="text-area ${
        text ? "hidden" : ""
      } " name = "text-area"></textarea>
    `;

  const deleteBtn = note.querySelector(".delete-btn");
  const editBtn = note.querySelector(".edit-btn");

  const main = note.querySelector(".main-area");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked.parse(text); // had to add parse for it to work

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (event) => {
    const { value } = event.target;
    main.innerHTML = marked.parse(`${value}`);

    updateLs();
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();

    updateLs();
  });

  document.body.appendChild(note);
}

function updateLs() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
