// Firebase objects
this.database = firebase.database();
let contactsRef = this.database.ref("contacts");

// UI Objects 
var txtName = document.getElementById("txtName");
var txtMobile = document.getElementById("txtMobile");
var lnkUpdate = document.getElementById("lnkUpdate");
var lblUpdatedStatus = document.getElementById("lblUpdatedStatus");
var lblUpdateAlert = document.getElementById("lblUpdateAlert");


// Gobals
var updatedContacts = {}
var firstRefreshOver = false;

function saveUpdateContact(contact){
    contactsRef.child(contact.id).set(contact)
}

function deleteAllContacts(){
    var res = confirm("Do you want to delete all Contacts?");
    if(res){
        contactsRef.set({});
        updateContactsList();
    }
}

function deleteContact(contact_id){
    contactsRef.child(contact_id).set({})
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

function updateContactsList(){
    
    // updating table

    // clean old rows
    var tbl = document.getElementById("tblContacts");
    while(tbl.firstChild){
        tbl.removeChild(tbl.firstChild);
    }

    if(updatedContacts.val() != null){
        // header
        tbl.appendChild(createContactsHeaderRow());
            
        // rows
        var i=1;
        updatedContacts.forEach(function(contact){
            tbl.appendChild(createNewContactRow(i++,contact.val().name, contact.val().mobile));
        });
    }

    
    
    show(lblUpdatedStatus);
    hide(lblUpdateAlert);
}

function alertOnUpdate(contacts){
    updatedContacts = contacts;
    if(!firstRefreshOver){
        updateContactsList();
        firstRefreshOver = true;
    }
    else{
        hide(lblUpdatedStatus);
        show(lblUpdateAlert);
    }
    
}

// --- Events ---

document.getElementById("btnAdd").onclick = addContact;

contactsRef.on('value', function(contacts){
    alertOnUpdate(contacts);
});

lnkUpdate.onclick = function(){
    updateContactsList();
}

document.getElementById("btnDeleteAll").onclick = function(){
    deleteAllContacts();
}

// ----- basic methods ------

function hide(el){
    el.style.display = "none"
}

function show(el){
    el.style.display = "block"
}

function createContactsHeaderRow(){
    var tr = document.createElement("tr");

    var td0 = document.createElement("th");
    td0.appendChild(document.createTextNode("SNo"));
    tr.appendChild(td0);
        
    var td1 = document.createElement("th");
    td1.appendChild(document.createTextNode("Name"));
    tr.appendChild(td1);

    var td2= document.createElement("th");
    td2.appendChild(document.createTextNode("Mobile No"));
    tr.appendChild(td2);

    return tr;
}

function createNewContactRow(sno,name,mobile){
    var tr = document.createElement("tr");

    var td0 = document.createElement("td");
    td0.appendChild(document.createTextNode(sno));
    tr.appendChild(td0);
        
    var td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(name));
    tr.appendChild(td1);

    var td2= document.createElement("td");
    td2.appendChild(document.createTextNode(mobile));
    tr.appendChild(td2);

    return tr;
}


