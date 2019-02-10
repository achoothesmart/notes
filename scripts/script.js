// Firebase objects
this.database = firebase.database();
let contactsRef = this.database.ref("contacts");

// UI Objects 

var btnLogin = document.getElementById("btnLogin");
var txtPassword = document.getElementById("txtPassword");

var txtName = document.getElementById("txtName");
var txtMobile = document.getElementById("txtMobile");
var txtAddress = document.getElementById("txtAddress");
var lnkUpdate = document.getElementById("lnkUpdate");
var lblUpdatedStatus = document.getElementById("lblUpdatedStatus");
var lblUpdateAlert = document.getElementById("lblUpdateAlert");



// Gobals
var updatedContacts = {}
var firstRefreshOver = false;

function saveUpdateContact(contact){
    if(checkEmptyString(contact.name) || checkEmptyString(contact.mobile) || checkEmptyString(contact.address)){
        alert("Complete all the fields");
        return false;
    }
    else{
        contactsRef.child(contact.id).set(contact);
        return true;
    }
}

// function deleteAllContacts(){
//     var res = confirm("Do you want to delete all Contacts?");
//     if(res){
//         contactsRef.set({});
//         updateContactsList();
//     }
// }

// function deleteContact(contact_id){
//     contactsRef.child(contact_id).set({})
// }

function createContactObj(nameVal, mobileVal, addrVal){
    return {
        id: Date.now(),
        name: nameVal,
        mobile: mobileVal,
        address: addrVal
    }
}

function clearInputs(){
    txtName.value = "";
    txtMobile.value = "";
    txtAddress.value = "";
}

function addContact(){
    //alert("creatig new note..")
    
    var contactObj = createContactObj(txtName.value, txtMobile.value, txtAddress.value);
    if (saveUpdateContact(contactObj)){
        updateContactsList();
        clearInputs();
        alert("New Contact created!");
    }
    
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
            tbl.appendChild(createNewContactRow(i++,contact.val()));
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

btnLogin.onclick = function(){
    if(txtPassword.value == "Welcome"){
        document.getElementById("pwdBlock").style.display = "none";
    }
}

document.getElementById("btnAdd").onclick = addContact;

contactsRef.on('value', function(contacts){
    alertOnUpdate(contacts);
});

lnkUpdate.onclick = function(){
    updateContactsList();
}

// document.getElementById("btnDeleteAll").onclick = function(){
//     deleteAllContacts();
// }



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

    var td3= document.createElement("th");
    td3.appendChild(document.createTextNode("Address"));
    tr.appendChild(td3);

    return tr;
}

function createNewContactRow(sno,contact){
    var tr = document.createElement("tr");

    var td0 = document.createElement("td");
    td0.appendChild(document.createTextNode(sno));
    tr.appendChild(td0);
        
    var td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(contact.name));
    tr.appendChild(td1);

    var td2= document.createElement("td");
    td2.appendChild(document.createTextNode(contact.mobile));
    tr.appendChild(td2);

    var td3= document.createElement("td");
    td3.appendChild(document.createTextNode(contact.address));
    tr.appendChild(td3);

    return tr;
}

function checkEmptyString(str){
    return str.toString().trim() == "";
}

