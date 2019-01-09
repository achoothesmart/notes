// public 

this.database = firebase.database();
let notesRef = this.database.ref("notes")

function saveUpdateNote(note){
    notesRef.child(note.id).set(note)
}

function createNoteObj(noteDate, noteText){
    return {
        id: Date.now(),
        date: noteDate,
        text: noteText
    }
}

function createNote(){
    //alert("creatig new note..")
    var noteDate = document.getElementById("noteDate").value;
    var noteText = document.getElementById("noteText").value;
    var noteObj = createNoteObj(noteDate, noteText);
    saveUpdateNote(noteObj);
    updateNotesList();
    alert("Note created!")
}

document.getElementById("btnCreateNote").onclick = createNote;

function updateNotesList(){
    
    var lst = document.getElementById("lstNotes");
    notesRef.on('value', function(notes){
        notes.forEach(function(note){
            
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(note.val().date + " > " + note.val().text));
            lst.appendChild(li);
        });
    });
    
}

updateNotesList();
