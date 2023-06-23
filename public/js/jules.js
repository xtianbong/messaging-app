//const { add } = require("lodash");

//const { stringify } = require("querystring");

//added by jules
document.addEventListener('DOMContentLoaded', function() {
function initialize() {
//const { forEach } = require("lodash");


//make all the demo stuff invisible
var oldStuff = document.querySelector("#demo");
var newStuff = document.querySelector("#jules");
function replace(){
    console.log("Before");
    if(newStuff.style.display!="none"){
        console.log("Inside");
        oldStuff.style.display="none";
    }
}



//filter chats using the search bar


function searchFilter(searchBar,targetList){//searchBar,targetList
    //console.log("search ran");
    var allChats = targetList.querySelectorAll(".searchable");
    //make all chats visible if searchBar is empty
    if(searchBar.value==""){
        allChats.forEach(c => {
            //console.log(c);
            c.classList.add("visible");
        });
        var highlightedElements = targetList.querySelectorAll(".highlight");
        highlightedElements.forEach(element => {
            const parent = element.parentNode;
            parent.replaceChild(document.createTextNode(element.textContent), element);
        });
    }
    //if not, filter them by the name of the room
    else{

        allChats.forEach(c => {
            // Convert to lower case so the searchBar ignores case
            const chatName = c.querySelector("h3").textContent;
            const searchText = searchBar.value.toLowerCase();

            if (chatName.toLowerCase().includes(searchText)) {
                //console.log(chatName+" is visible")
                //console.log(c);
                c.classList.add("visible");
                //highlight the text in the name that corresponds to the query
                const regex = new RegExp(searchText, 'gi');
                const highlightedText = chatName.replace(regex, (match) => {
                    return `<mark class="highlight">${match}</mark>`;
                });

                c.querySelector("h3").innerHTML = highlightedText;
            }
            else {
                c.classList.remove("visible");
                //console.log(chatName+" is not visible")
            }
        });
    }

}

//run function every time there is input in the room search bar and also when the page loads
var rSearchBar = document.getElementById("rsearch-bar")
var chatDivs = document.querySelector("#room-list");

rSearchBar.addEventListener("input", function() {
    searchFilter(rSearchBar, chatDivs);
});

window.addEventListener("load", function() {
    searchFilter(rSearchBar, chatDivs);
});

document.addEventListener("DOMContentLoaded", function() {
    searchFilter(rSearchBar, chatDivs);
});

// search the list of friends in the edit-user div
var efSearchBar = document.getElementById("efsearch-bar");
var efDivs = document.getElementById("edit-user-friend-list");

efSearchBar.addEventListener("input", function() {
    searchFilter(efSearchBar, efDivs);
});

window.addEventListener("load", function() {
    searchFilter(efSearchBar, efDivs);
});

document.addEventListener("load", function() {
    searchFilter(efSearchBar, efDivs);
});
//search list of friends in the #new-room div

var fSearchBar = document.getElementById("fsearch-bar");
var fDivs = document.querySelector("#friend-list");

fSearchBar.addEventListener("input", function() {
    searchFilter(fSearchBar, fDivs);
});

window.addEventListener("load", function() {
    searchFilter(fSearchBar, fDivs);
});

document.addEventListener("load", function() {
    searchFilter(fSearchBar, fDivs);
});

//search friends list in add-users div
aSearchBar = document.getElementById("asearch-bar");
aDivs = document.getElementById("add-list");

if(aSearchBar!=null&&aDivs!=null){
    aSearchBar.addEventListener("input",function(){
        searchFilter(aSearchBar,aDivs);
    })
}


window.addEventListener("load", function() {
    if(aSearchBar!=null&&aDivs!=null){
        searchFilter(aSearchBar, aDivs);
    }
});

document.addEventListener("load", function() {
    if(aSearchBar!=null&&aDivs!=null){
        searchFilter(aSearchBar, aDivs);
    }
});

//search member list in the edit-room div
var mSearchBar = document.getElementById("msearch-bar");
var mDivs = document.querySelector("#member-list");

mSearchBar.addEventListener("input",function(){
    searchFilter(mSearchBar,mDivs);
})

window.addEventListener("load", function() {
    searchFilter(mSearchBar, mDivs);
});

document.addEventListener("load", function() {
    searchFilter(mSearchBar, mDivs);
});

//reset shake animation after it plays
function resetShake(shaker){
    setTimeout(function(){
        shaker.classList.remove("shake");
    },1000);

}


//add the scrollbar class to the ul of messages because putting it in html isn't enough for some reason
const cardBody = document.querySelector('.card-body');
const ulElement = cardBody.querySelector("#message-list");

window.addEventListener("load", function() {
    if (ulElement) {
        ulElement.classList.add("scrollbar");
        ulElement.scrollTop = ulElement.scrollHeight;
    }
});


// makes the ul scroll to the bottom on load and when a new message is entered

//laravel message input and button
var msg = document.querySelector("#btn-input");
var sendButton = document.querySelector("#btn-chat");

sendButton.addEventListener("click", bottomScroll);
//removeAllEventListeners(sendButton);
window.addEventListener("load", bottomScroll);
document.addEventListener("load", bottomScroll);
window.addEventListener("DOMContentLoaded", function() {

    //const ulElement = document.querySelector("#message-list");
    if (ulElement) {
      // Set its scrollTop property to its maximum value
      ulElement.scrollTop = ulElement.scrollHeight;
      // Create a new MutationObserver object
      const observer = new MutationObserver(function(mutationsList) {
        for (const mutation of mutationsList) {

          // If the mutation is a childList mutation with added nodes and the first added node is an li element
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0 && mutation.addedNodes[0].tagName === 'LI') {
            bottomScroll();
          }
        }
      });

      // Start observing changes to the child list of the ul element
      observer.observe(ulElement, { childList: true });
    }
  });


function bottomScroll(){
    if (ulElement) {
        ulElement.scrollTop = ulElement.scrollHeight;
      }
};

//transfer style attributes from one element to the other

function copyStyles(source, destination) {
    var styles = window.getComputedStyle(source);
    for (var i = 0; i < styles.length; i++) {
        var styleName = styles[i];
        destination.style.setProperty(styleName, styles.getPropertyValue(styleName));
    }
    //console.log(source.getAttribute('id')+" style copied to "+ destination.getAttribute('id'))
}


//transfer style attributes from room search bar to the friend search bar
var fSearchBar = document.querySelector('#fsearch-bar');
//copyStyles(searchBar,fSearchBar)


//makes inputs change in size as you type into them

function resizeInputs() {
    // Select all input elements with class resizing-input
    let inputs = document.querySelectorAll('.resizing-input');

    // Loop through all input elements
    inputs.forEach((input) => {
      // Get the width of the input's placeholder
      let placeholderWidth = input.placeholder.length * 12.5;

      // Set the initial width of the input to the placeholder width
    input.style.width = `${placeholderWidth}px`;

      // Add an event listener to the input to resize it as the user types
    input.addEventListener('input', (event) => {
        // Get the width of the input's value
        let valueWidth = event.target.value.length * 9.5;
        if (event.target.value.length==0){
            input.setAttribute('placeholder', '');
        }

        // Set the width of the input to the value width, plus a little extra
        input.style.width = `${valueWidth + 20}px`;
    });
    });
}

//run this on the name input for new rooms
var rName=document.querySelector('#rname');
//run on page load
window.addEventListener('load', resizeInputs);
//run when user types into the rname input
rname.addEventListener('change', resizeInputs);


//make create-rooms div react to input
//get array of friend divs in the html
var friendDivs = document.querySelectorAll("div.new-room-friend");
function friendDivsInput(){
    var friendDivs = document.querySelectorAll("div.new-room-friend");
    friendDivs.forEach(f => f.addEventListener('click',function(){
        if(f.classList.contains('added')){
            f.classList.remove('added');
        }
        else{
            f.classList.add('added');
        }
    }));
}
window.addEventListener("DOMContentLoaded",friendDivsInput);

//make edit-room div react to input
//get array of member divs in the html
var memberDivs = document.querySelectorAll("div.member");
var selectEdit = document.querySelector(".select-edit");
var makeOwnerButton = document.querySelector("#make-owner-btn");
var removeUserButton = document.querySelector("#remove-user-btn");
var undoEdit = document.querySelector("#undo-edit");
var undoButton = document.querySelector("#undo-btn");

//handler functions for the makeOwner, removeUser and undo buttons
function makeOwnerHandler(m){
    function ownerYes(){
        //original classlist is saved so I can undo the changes
        var ocl = m.classList;
        // Create a new DOM element
        var hiddenMember = document.createElement('div');
        // Set the class list of the hidden element to match the original class list
        hiddenMember.classList = ocl;
        //identify this element and add it to the document so it can be accessed later
        hiddenMember.style.display="none";
        hiddenMember.id=m.id;
        hiddenMember.classList.remove("visible");
        hiddenMember.classList.add("hidden");
        document.body.appendChild(hiddenMember);

        m.classList.add("owner");
        m.classList.add("changed");//keep track of what divs were changed in this session so it can be easily undone
        displayOff(selectEdit);
    };
    createConfirmBox("Are you sure you want to make "+m.querySelector("h3").innerHTML+" an owner of this room.",ownerYes);
}

function removeUserHandler(m){
    //original classlist is saved so I can undo the changes
    var ocl = m.classList;
    // Create a new DOM element
    var hiddenMember = document.createElement('div');
    // Set the class list of the hidden element to match the original class list
    hiddenMember.classList = ocl;
    //identify this element and add it to the document so it can be accessed later
    hiddenMember.style.display="none";
    hiddenMember.id=m.id;
    hiddenMember.classList.remove("visible");
    hiddenMember.classList.add("hidden");
    document.body.appendChild(hiddenMember);

    m.classList.add("changed");//keep track of what divs were changed in this session so it can be easily undone
    m.classList.remove("added");
    displayOff(selectEdit);
}

function undoHandler(m){
    var hiddenMembers = Array.from(document.querySelectorAll('.hidden' ));
    var hiddenMember = hiddenMembers.find(x=> x.id==m.id);
    console.log(hiddenMember);
    m.classList = hiddenMember.classList;
    m.classList.remove("hidden");
    m.classList.add("visible");
    displayOff(undoEdit);
}

memberDivs.forEach(m => m.addEventListener('click',function(){
    //only add or remove a user if they are not an owner
    if(!m.classList.contains('owner') & !m.classList.contains('changed')){
        //position the selectEdit div just to the right of the user
        var mPos = m.getBoundingClientRect();
        console.log(mPos);
        /*
        selectEdit.style.left=mPos.left+'px';
        selectEdit.style.top=mPos.top+'px';
        */
        var selectEdit = document.querySelector("#select-edit-"+m.id);
        displayToggle(selectEdit,"grid");

        //remove all listeners that may be on the buttons requires redefining the variables in js
        //beacuse removeAllEventListeners replaces the DOM elements with fresh ones that have no listeners
        var makeOwnerButton = document.querySelector("#make-owner-btn");
        var removeUserButton = document.querySelector("#remove-user-btn");

        removeAllEventListeners(makeOwnerButton);
        removeAllEventListeners(removeUserButton);

        var makeOwnerButton = document.querySelector("#make-owner-btn");
        var removeUserButton = document.querySelector("#remove-user-btn");

        //add listeners to the buttons in selectEdit

        makeOwnerButton.addEventListener("click",function(){
            makeOwnerHandler(m);
        });
        removeUserButton.addEventListener("click",function(){
            removeUserHandler(m);
        });
    }
    if(m.classList.contains('changed')){
        //same process as for the makeownerbutton and removeowner button replace the dom element with a fresh one and then redefine the var in js
        var undoButton = document.querySelector("#undo-btn");
        removeAllEventListeners(undoButton);
        var undoButton = document.querySelector("#undo-btn");
        var undoEdit = document.querySelector("#undo-edit-"+m.id);
        displayToggle(undoEdit);
        undoButton.addEventListener("click",function(){
            undoHandler(m);
        });
    }
}
));
//remove all listeners from an element
function removeAllEventListeners(element) {
    // Check if the element has a parent node
    if (element.parentNode) {
      // Create a clone of the element
      const clonedElement = element.cloneNode(true);

      // Replace the element with its clone
      element.parentNode.replaceChild(clonedElement, element);

      // Return the cloned element
      return clonedElement;
    }

    // If the element doesn't have a parent node, return the element itself
    return element;
}

//retrieve data for room creation from the form
function createNewRoom(){
    var currentUserId = document.querySelector(".current-username").getAttribute("id");//id of user creating the room
    var currentUserName = document.querySelector(".current-username").innerHTML;//name of user creating the room
    //console.log(currentUserName)
    var name = document.querySelector('#rname').value;//name of room
    var users = []; // list of user ids
    var owners = []; // list of owner ids

    //always put the user that created the room first in the users and owners list
    users.push(parseInt(currentUserId));
    owners.push(parseInt(currentUserId));
    //add user id's from list of selected friends in the form
    for(var div of friendDivs){
        if(div.classList.contains("added")){
            users.push(parseInt(div.getAttribute("id")))
        }
    }

    //console.log(users);
    //console.log(owners);
    if(users.length>0){
        console.log(name)
        createRoomPHP(currentUserId,name, users, owners);
    }
}
const createRoomBtn = document.querySelector('#create-room-btn');
createRoomBtn.addEventListener('click', createNewRoom);

//run the createRoom function in RoomController.php
function createRoomPHP(currentUserId,name, users, owners){
    axios.post('/room/create-room', {
        currentUserId: currentUserId,
        name: name,
        users: users,
        owners: owners,//convert the arrays to json before passing them to the php function
    }).then(function (response) {
        var createRoomResponse = response.data
        console.log(response.data);

        //clear all the user input in the form
        rName.value="";
        for(var div of friendDivs){
            div.classList.remove("added");
        }

        //alert the user that the room has been created succesfully
        var roomAlert = document.querySelector("#new-room-alert");
        displayOff();//remove create room overlay
        displayToggle(roomAlert);//show new room alert

        //remove alert after a few seconds and redirect to new room
        setTimeout(function(){
            if(roomAlert.style.display!="none"){
                displayOff();
                window.location.href="/room/"+createRoomResponse.id;//get room id from the response to the post request
            }
        },3000);
    });
}



function addByEmail (){
    var addUsersEmail = document.querySelector("#add-users-email");
    email=addUsersEmail.value;
    axios.post('/room/email-query',{
        email:email,
    }).then(function (response){
        var user = response.data;

        //user is already in the friends list above
        if(searchUserList(document.querySelector("#add-list"),user.id)){
            createDialogueBox("The user "+ user.name +" is already in your friends list");
        }
        //user is already in the room
        else if(searchUserList(document.querySelector("#room-details"),user.id)){
            createDialogueBox("The user "+ user.name +" is already in this chat room.");
        }
        //user did not enter an email address
        else if(email==""){
        }
        //no user with that email address
        else if(response.data=="Not found"){
            createDialogueBox("We could not find a user at the email address: \n"+email);
        }

        else{
            //create a div using the data from this object then add it to the add list
            //get base from the other list items in add-list
            var base = document.querySelector(".add-to-room-li");
            var newLi = base.cloneNode(true);
            var newDiv = newLi.querySelector("div");
            newDiv.id = user.id;
            newDiv.classList.add("added","changed");
            var newName = newDiv.querySelector("h3");
            newName.innerHTML = user.name;

            document.getElementById("add-list").appendChild(newLi);
            //run this so that the div is interactive
            friendDivsInput();
        }
    });
}
var addWithEmailBtn = document.querySelector("#add-with-email-btn");
addWithEmailBtn.addEventListener("click", addByEmail);


//get all the input from the add-user div
function addUser(){
    var roomId = document.querySelector("#name-box").querySelector("h2").getAttribute("id");
    var roomName = document.querySelector("#edit-room").querySelector("#rname").value;
    var users = [];
    var newUsers = [];
    var owners = [];
    var userDivs = document.querySelectorAll(".member.visible");//must include .visible here because of the hidden divs hold the old classlists
    var newUserDivs = document.querySelectorAll(".new-room-friend.visible");
    console.log(userDivs);
    for(var div of userDivs){
        if(div.classList.contains("added")){
            users.push(parseInt(div.getAttribute("id")))
        }
    }
    for(var div of newUserDivs){
        if(div.classList.contains("added")){
            users.push(parseInt(div.getAttribute("id")))
        }
    }
    for(var div of userDivs){
        if(div.classList.contains("owner")){
            owners.push(parseInt(div.getAttribute("id")))
        }
    }
    /*
    console.log(roomId);
    console.log(roomName);
    console.log(users);
    console.log(owners);
    */
    editRoomPHP(roomId,roomName,users,owners)
}
const confirmAddUser = document.querySelector("#confirm-add-user");
confirmAddUser.addEventListener("click",addUser);

//remove the current user from the room
function leaveRoom(){
    var roomId = document.querySelector("#name-box").querySelector("h2").getAttribute("id");
    var currentUserId = document.querySelector(".current-username").getAttribute("id");
    var roomName="";
    var users = [];
    var owners = [];

    var userDivs = document.querySelectorAll(".member.visible");//must include .visible here because of the hidden divs hold the old classlists
    console.log(userDivs);
    for(var div of userDivs){
        if(div.id!=currentUserId){
            users.push(parseInt(div.getAttribute("id")))
        }
    }
    for(var div of userDivs){
        if(div.id!=currentUserId && div.classList.contains("owner")){
            owners.push(parseInt(div.getAttribute("id")))
        }
    }
    editRoomPHP(roomId,roomName,users,owners);
    // Delay the redirect to allow time for the database update
    setTimeout(function() {
        window.location.href = "/room/0"; // Redirect to the landing page
    }, 1000);
    /*
    var roomDiv = document.querySelector(".roomdiv#"+stringify(roomId));
    var nameBox = document.querySelector("#name-box");
    var cardFooter = documet.querySelector(".card-footer");
    console.log(roomDiv);
    console.log(nameBox);
    console.log(cardFooter);
    roomDiv.style.display="none";
    nameBox.style.display="none";
    cardFooter.style.display="none";*/
}

var leaveRoomButton = document.querySelector("#leave-room-btn");
leaveRoomButton.addEventListener("click",function(){
    createConfirmBox("Are you sure you want to leave this chat room?",leaveRoom);
});

//get all the input from the edit-room div
function editRoom(){
    var roomId = document.querySelector("#name-box").querySelector("h2").getAttribute("id");
    var roomName = document.querySelector("#edit-room").querySelector("#rname").value;
    var users = [];
    var owners = [];
    var userDivs = document.querySelectorAll(".member.visible");//must include .visible here because of the hidden divs hold the old classlists
    console.log(userDivs);
    for(var div of userDivs){
        if(div.classList.contains("added")){
            users.push(parseInt(div.getAttribute("id")))
        }
    }

    for(var div of userDivs){
        if(div.classList.contains("owner")){
            owners.push(parseInt(div.getAttribute("id")))
        }
    }
    //console.log(roomId);
    //console.log(roomName);
    //console.log(users);
    //console.log(owners);
    editRoomPHP(roomId,roomName,users,owners)
}
//send the info we gathered from the page to the editRoom php function
function editRoomPHP(roomId,roomName,users,owners){

    axios.post('/room/edit-room',{
        roomId: roomId,
        roomName: roomName,
        users: users,
        owners: owners,
    }).then(function (response) {
        console.log(response.data);
        var editRoomResponse = response.data;


        //clear the user input in the name box
        document.querySelector("#edit-room").querySelector("#rname").value="";

        //alert the user that the room has been edited succesfully
        var editRoomAlert = document.querySelector("#edit-room-alert");
        displayOff();//remove create room overlay

        displayToggle(editRoomAlert);//show room edited alert
        console.log(editRoomAlert);

        //remove alert after a few seconds and redirect edited room
        setTimeout(function(){
            if(editRoomAlert.style.display!="none"){
                displayOff();
                window.location.href="/room/"+editRoomResponse.id;//get room id from the response to the post request
            }
        },3000);
    });
}
//close all overlays when the user discards a room edit
var discardEditButton = document.querySelector("#discard-edit-btn");
discardEditButton.addEventListener("click",function(){
    var memberDivs = document.querySelectorAll("div.member");
    console.log(memberDivs);
    memberDivs.forEach(m=> {
        if(m.classList.contains("changed")){
            var hiddenMembers = Array.from(document.querySelectorAll('.hidden' ));
            var hiddenMember = hiddenMembers.find(x=> x.id==m.id);
            console.log(hiddenMember);
            m.classList = hiddenMember.classList;
            m.classList.remove("hidden");
            m.classList.add("visible");
        }
    });
    displayOff();
    //location.reload();
});
var confirmEditButton = document.querySelector("#confirm-edit-btn");
confirmEditButton.addEventListener("click",editRoom);

//make users move to the top of the friends list if they are in the room
function updateOrder() {
    const friendList = document.getElementById('friend-list');
    const addedItems = document.querySelectorAll('.added');
    console.log(addedItems);

    addedItems.forEach((item) => {
        console.log(item.parentNode);
        friendList.prepend(item.parentNode);
    });
}

//run this whenever a user in a add room/edit roomfriends list is clicked on
for(var div of friendDivs){
    //div.addEventListener("click",updateOrder);
}
var currentUserId = document.querySelector(".current-username").getAttribute("id");
//take new friend data from the #add-friend form and sends it to the addFriend function in RoomController.php
function addFriendPHP(){
    //get email from text input
    var friendEmail = document.querySelector("#new-friend-email").value;
    //get current user id from document
    var currentUserId = document.querySelector(".current-username").getAttribute("id");

    //show error meassge if email is empty
    if(friendEmail.length==""){
        document.querySelector("#new-friend-email").classList.add("shake");
        resetShake(document.querySelector("#new-friend-email"));
    }
    else{
        axios.post('/room/add-friend',{
            currentUserId: currentUserId,
            email: friendEmail,
        }).then(function (response) {
            console.log(response.data);
            var addFriendResponse = response.data;


            //clear the user input in the name box
            document.querySelector("#new-friend-email").value="";

            //alert the user that the room has been edited succesfully
            var addFriendAlert = document.querySelector("#add-friend-alert");
            displayOff();//remove create room overlay

            displayToggle(addFriendAlert);//show new room alert
            console.log(addFriendAlert);

            //remove alert after a few seconds and refresh
            setTimeout(function(){
                if(addFriendAlert.style.display!="none"){
                    displayOff();
                    location.reload();
                }
            },3000);
        });
    }
}

const confirmNewFriend = document.querySelector("#confirm-new-friend");
confirmNewFriend.addEventListener('click',addFriendPHP);


//let users change their user details and friends list
function editUser(){
    //get new username
    var username= document.querySelector("#edit-username").value;
    console.log(username);
    //get new friends list
    var friends=[];
    var fDivs = document.querySelectorAll(".edit-user-friend");//must include .visible here because of the hidden divs hold the old classlists
    console.log(fDivs);
    for(var div of fDivs){
        if(!div.classList.contains("removed")){
            friends.push(parseInt(div.getAttribute("id")))
        }
    }
    console.log(friends);

    editUserPHP(username,friends);
}
var editUserSave = document.querySelector("#edit-user-save");
editUserSave.addEventListener('click',editUser);

//remove user from current user's friends list
function removeFriend(fDiv){
    //get new username
    var username= document.querySelector("#edit-username").value;
    console.log(username);

    //remove user from friends list (visually)
    fDiv.classList.add("removed");
    fDiv.classList.remove("visible");
    //get new friends list
    var friends=[];
    var fDivs = document.querySelectorAll(".edit-user-friend");//must include .visible here because of the hidden divs hold the old classlists
    console.log(fDivs);
    for(var div of fDivs){
        if(!div.classList.contains("removed")){
            friends.push(parseInt(div.getAttribute("id")))
        }
    }
    console.log(friends);
    editUserPHP(username,friends);
}
var removeButtons = document.querySelectorAll(".remove-btn");
for(let r of removeButtons){
    //pass the parent div into the removeFriend function when the remove-button is clicked
    r.addEventListener("click",function(){
        createConfirmBox("Are you sure you want to remove "+r.parentElement.querySelector("h3").innerHTML+" from your friends list?",function(){removeFriend(r.parentElement)});
    });
}

function editUserPHP(username,friends){
    //get the id of the current user
    var currentUserId = document.querySelector(".current-username").getAttribute("id");
    //run the edit-user function in the room-controller
    axios.post('/room/edit-user',{
        currentUserId:currentUserId,
        username:username,
        friends:friends,
    }).then(function(response){
        console.log("User edited")
    })
}

//let users log-out with a button press
function logOutPHP(){
    //run the logout function in the room controller
    axios.post('/room/log-out').then(function (response) {
        console.log("Logged out");
    });
    //return to login page after logging out
    window.location.href="/login";
}

const confirmLogout = document.querySelector("#log-out-btn");
confirmLogout.addEventListener('click',function(){
    createConfirmBox("Are you sure you want to log out?",logOutPHP);
});


//make an object appear/disappear when a button is pressed
var tint = document.querySelector("#tint");
function displayToggle(target,display='block'){ //change display attribute to whatever is needed
    //console.log("display toggled: "+target.id);
    if(target.style.display==='none'){
        if(display!='block'){
            target.style.display=display;
            tint.style.display='block';
            //console.log(1);
        }
        else{
            target.style.display='block';
            tint.style.display='block';
            //console.log(2);
        }
    }
    else{
        target.style.display='none';
        tint.style.display='none';
        //console.log(3);
    }
}
//funciton that hides all elements in the overlay class
var targets = document.querySelectorAll(".overlay");

function displayOff(){
    //console.log(targets);
    for(var t of targets){
        //console.log(t);
        t.style.display='none';
    }
    tint.style.display='none';

}
//hide a specific overlay

function displayOff(target='default'){
    if(target=='default'){
        console.log(targets);
        for(var t of targets){
            //console.log(t);
            t.style.display='none';
        }
        tint.style.display='none';
    }
    else{
        target.style.display='none';
        tint.style.display='none';
    }

}


//create a dialogue box asking the user to confirm their action .Takes string dialogue to craft the prompt
function createConfirmBox(dialogue="Are you sure?",yesFunction){
    var confirmBox = document.getElementById("confirm-box");
    var confirmDialogue = document.getElementById("confirm-dialogue");
    var confirmTint = document.getElementById("dialogue-tint");
    confirmDialogue.innerHTML = dialogue;

    confirmBox.style.display="block";
    confirmTint.style.display = "block";
    confirmTint.addEventListener("click",function(){
        confirmBox.style.display="none";
        confirmTint.style.display="none";
    });
    var yesButton = document.getElementById("yes-btn");
    var noButton = document.getElementById("no-btn");
    //run respective functions and hide the dialogue box
    yesButton.addEventListener("click",function(){
        console.log("yes")
        yesFunction()
        confirmBox.style.display="none";
        confirmTint.style.display="none";
    });
    noButton.addEventListener("click",function(){
        console.log("no")
        confirmBox.style.display="none";
        confirmTint.style.display="none";
    });
}
//create a dialogue box with a single option to dismisss it
function createDialogueBox(dialogue="Default dialogue",option="Ok"){
    var dialogueBox = document.getElementById("dialogue-box");
    var dialogueText = document.getElementById("dialogue");
    var dialogueTint = document.getElementById("dialogue-tint");
    var okButton = document.getElementById("ok-btn");
    dialogueText.innerHTML = dialogue;
    okButton.innerHTML = option;

    //display dialogue box
    dialogueBox.style.display="block";
    dialogueTint.style.display = "block";

    //close dialogue box
    dialogueTint.addEventListener("click",function(){
        dialogueBox.style.display="none";
        dialogueTint.style.display="none";
    });
    okButton.addEventListener("click",function(){
        dialogueBox.style.display="none";
        dialogueTint.style.display="none";
    });
}
//determines whether a user-list contains a user with the specified id (key)
function searchUserList(list,key){
    var divs = list.querySelectorAll("div");
    for(var d of divs){
        if(d.id==key){
            return true;
        }
    }
    return false;
}


var plusButton = document.querySelector("#plus-button");
var selectNew = document.querySelector("#select-new");
plusButton.addEventListener('click', function() { //apply newRoom function to plus button and new room div
    displayToggle(selectNew);
});

var addRoomButton = document.querySelector("#add-room-btn");
var newRoom = document.querySelector("#new-room");

addRoomButton.addEventListener('click', function(){
    displayOff();
    displayToggle(newRoom);
});

var addUserButton = document.querySelector("#add-users-btn");
var addUser = document.querySelector("#add-users");
addUserButton.addEventListener('click',function(){
    displayOff();
    displayToggle(addUser);
});

var roomDetailsButton = document.querySelector("#room-details-btn");
var roomDetails = document.querySelector("#room-details");
roomDetailsButton.addEventListener('click', function(){
    displayOff();
    displayToggle(roomDetails);
});

var gotoEditButton = document.querySelector("#goto-edit-btn");
var editRoom = document.querySelector("#edit-room");
gotoEditButton.addEventListener("click",function(){
    displayOff();
    displayToggle(editRoom);
});








var addFriendButton = document.querySelector("#add-friend-btn")
var addFriend = document.querySelector("#add-friend");

addFriendButton.addEventListener('click', function(){
    displayOff();
    displayToggle(addFriend);
});

var currentUserDiv=document.querySelector("#current-user");

currentUserDiv.addEventListener('click', function() { //apply newRoom function to plus button and new room div
    displayToggle(settingsDiv);
});

var settingsButton = document.querySelector("#settings-button");
var settingsDiv = document.querySelector("#settings");
settingsButton.addEventListener('click', function() { //apply newRoom function to plus button and new room div
    displayToggle(settingsDiv);
});

var editUserButton=document.querySelector("#edit-user-btn");
var editUserDiv =document.querySelector("#edit-user");
editUserButton.addEventListener('click', function() { //apply newRoom function to plus button and new room div
    displayOff(settingsDiv)
    displayToggle(editUserDiv);
});

var profileTab=document.querySelector("#profile-tab");
profileTab.addEventListener("click",function(){
    editUserDiv.classList.remove("friends-mode");
    editUserDiv.classList.add("profile-mode");
});

var friendsTab=document.querySelector("#friends-tab");
friendsTab.addEventListener("click",function(){
    editUserDiv.classList.remove("profile-mode");
    editUserDiv.classList.add("friends-mode");
});

tint.addEventListener('click', function() { //hide object when you click anywhere outside it
    //console.log("tint clicked");
    displayOff();
});

//customizing the landing page that users go to when they are not in a particular chat room
var landingRoom = document.querySelector("#landing-room");

//remove the room name and message input box when on the landing page
if(landingRoom!=null){
    console.log("Landing page")
    document.querySelector(".card-footer").style.display="none";
    document.querySelector("#name-box").style.display="none";

}

// have the "create new room" text activate the "New room" button when clicked on

var landingNewRoom = document.querySelector("#landing-new-room");
landingNewRoom.addEventListener('click',function(){
    console.log(9);
    //addRoomButton.click();
    displayToggle(newRoom);
});

};

//functions that will run every few seconds to make sure the data displayed on site is consistent with the database
function autoUpdate(){
    //get list of messages in the current room

}

initialize();

});//document.addEventListener('DOMContentLoaded', function() {
