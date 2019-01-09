// Firebase objects
this.database = firebase.database();
let notesRef = this.database.ref("notes");

// UI Objects
var noteDate = document.getElementById("noteDate");
var noteText = document.getElementById("noteText");

function saveUpdateNote(note){
    notesRef.child(note.id).set(note)
}

function createNoteObj(noteDateVal, noteTextVal){
    return {
        id: Date.now(),
        date: noteDateVal,
        text: noteTextVal
    }
}

function clearInputs(){
    noteDate.value = "";
    noteText.value = "";
}

function createNote(){
    //alert("creatig new note..")
    //var noteDate = document.getElementById("noteDate").value;
    //var noteText = document.getElementById("noteText").value;
    var noteObj = createNoteObj(noteDate.value, noteText.value);
    saveUpdateNote(noteObj);
    updateNotesList();
    clearInputs();
    alert("New note created!")
}

document.getElementById("btnCreateNote").onclick = createNote;

function updateNotesList(){
    
    var lst = document.getElementById("lstNotes");
    while (lst.firstChild) {
        lst.removeChild(lst.firstChild);
    }
    notesRef.on('value', function(notes){
        notes.forEach(function(note){
            
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(note.val().date + " > " + note.val().text));
            lst.appendChild(li);
        });
    });
    
}

updateNotesList();
