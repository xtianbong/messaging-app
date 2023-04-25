//added by jules


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
    console.log("search ran");
    var allChats = targetList.querySelectorAll("div");
    //make all chats visible if searchBar is empty
    if(searchBar.value==""){
        allChats.forEach(c => {
            console.log(c);
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
                console.log(c);
                c.classList.add("visible");
                //highlight the text in the name that corresponds to the query
                const regex = new RegExp(searchText, 'gi');
                const highlightedText = chatName.replace(regex, (match) => {
                    return `<mark class="highlight">${match}</mark>`;
                });

                c.querySelector("h3").innerHTML = highlightedText;
            } else {
                c.classList.remove("visible");
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

//do that same for the friend search bar

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

//reset shake animation after it plays
function resetShake(){
    msg.classList.remove("shake");

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

sendButton.addEventListener("click",bottomScroll());
window.addEventListener("load", bottomScroll());

window.addEventListener("load", function() {

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
    console.log("bottom scroll ran");
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
    console.log(source.getAttribute('id')+" style copied to "+ destination.getAttribute('id'))
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
var friendDivs = document.querySelectorAll("div.friend");
friendDivs.forEach(f => f.addEventListener('click',function(){
    if(f.classList.contains('added')){
        f.classList.remove('added');
    }
    else{
        f.classList.add('added');
    }
}));


//retrieve data for room creation from the form
function createNewRoom(){
    var currentUserId = document.querySelector(".current-user").getAttribute("id");//id of user creating the room
    var currentUserName = document.querySelector(".current-user").innerHTML;//name of user creating the room
    //console.log(currentUserName)
    var name = document.querySelector('#rname').value;//name of room
    var users = []; // list of user ids
    var owners = [1,2]; // list of owner ids
    for(var div of friendDivs){
        users.push(parseInt(div.getAttribute("id")))
    }
    console.log(users);
    console.log(owners);
    if(users.length>0){
        console.log(name)
        createRoomPHP(currentUserId,name, users, owners);
    }


}


//run the createRoom function in RoomController.php
function createRoomPHP(currentUserId,name, users, owners) {
    console.log("createRoomPHP ran");
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '/room/create-room',
        type: 'POST',
        data: {
            currentUserId: currentUserId,
            name: name,
            users: JSON.stringify(users),
            owners: JSON.stringify(owners),//convert the arrays to json before passing them to the php function
        },
        success: function(response) {
            console.log(response);
        },
        error: function(xhr) {
            console.error(xhr);
        }
    });
    console.log("createRoomPHP ended");
}


const createRoomBtn = document.querySelector('#create-room-btn');

createRoomBtn.addEventListener('click', createNewRoom);


//make an object appear/disappear when a button is pressed
const tint = document.querySelector("#tint");
function displayToggle(target,display='block'){ //change display attribute to whatever is needed
    console.log("display toggle ran")
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
//funciton that turns off target display no matter what
var targets = document.querySelectorAll(".overlay")
function displayOff(){
    console.log(targets);
    for(var t of targets){
        console.log(t);
        t.style.display='none';
    }
    tint.style.display='none';

}



var plusButton = document.querySelector("#plus-button");
var selectNew = document.querySelector("#select-new");
plusButton.addEventListener('click', function() { //apply newRoom function to plus button and new room div
    displayToggle(selectNew);
});



var addRoomButton = document.querySelector("#add-room-btn")
var newRoom = document.querySelector("#new-room");

addRoomButton.addEventListener('click', function(){
    displayOff();
    displayToggle(newRoom);
});

var editRoomButton = document.querySelector("#edit-room-btn")
var editRoom = document.querySelector("#edit-room");

editRoomButton.addEventListener('click', function(){
    displayOff();
    displayToggle(editRoom);
});

var addFriendButton = document.querySelector("#add-friend-btn")
var addFriend = document.querySelector("#add-friend");

addFriendButton.addEventListener('click', function(){
    displayOff();
    displayToggle(addFriend);
});

var settingsButton = document.querySelector("#settings-button");
var settingsDiv = document.querySelector("#settings");

settingsButton.addEventListener('click', function() { //apply newRoom function to plus button and new room div
    displayToggle(settingsDiv);
});



tint.addEventListener('click', function() { //hide object when you click anywhere outside it
    displayOff();
});
