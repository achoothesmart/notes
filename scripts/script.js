// Firebase objects
this.database = firebase.database();
let contactsRef = this.database.ref("contacts");

// UI Objects
var txtName = document.getElementById("txtName");
var txtMobile = document.getElementById("txtMobile");

function saveUpdateContact(contact){
    contactsRef.child(contact.id).set(contact)
}

function createContactObj(nameVal, mobileVal){
    return {
        id: Date.now(),
        name: nameVal,
        mobile: mobileVal
    }
}

function clearInputs(){
    txtName.value = "";
    txtMobile.value = "";
}

function addContact(){
    //alert("creatig new note..")
    
    var contactObj = createContactObj(txtName.value, txtMobile.value);
    saveUpdateContact(contactObj);
    updateContactsList();
    clearInputs();
    alert("New Contact created!")
}

document.getElementById("btnAdd").onclick = addContact;

function updateContactsList(){
    
    var lst = document.getElementById("lstContacts");
    while (lst.firstChild) {
        lst.removeChild(lst.firstChild);
    }
    contactsRef.on('value', function(contacts){
        contacts.forEach(function(contact){
            
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(contact.val().name + ", " + contact.val().mobile));
            lst.appendChild(li);
        });
    });
    
}

updateContactsList();
