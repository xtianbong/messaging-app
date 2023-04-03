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

var rSearchBar = document.getElementById("rsearch-bar")
var allChats = document.querySelectorAll(".chat");
//run function every time there is input in the search bar and also when the page loads
rSearchBar.addEventListener("input",searchFilter);
window.addEventListener("load",searchFilter)
document.addEventListener("DOMContentLoaded", searchFilter)

function searchFilter(){
    console.log("search ran");
    //make all chats visible if rSearchBar is empty
    if(rSearchBar.value==""){
        allChats.forEach(c => {
            c.classList.add("visible");
        });
        const div = document.querySelector("#chats");
        const highlightedElements = div.querySelectorAll(".highlight");
        highlightedElements.forEach(element => {
            const parent = element.parentNode;
            parent.replaceChild(document.createTextNode(element.textContent), element);
        });
    }
    //if not, filter them by the name of the chatter
    else{

        allChats.forEach(c => {
            // Convert to lower case so the rSearchBar ignores case
            const chatName = c.querySelector(".username").textContent;
            const searchText = rSearchBar.value.toLowerCase();

            if (chatName.toLowerCase().includes(searchText)) {
                c.classList.add("visible");
                //highlight the text in the name that corresponds to the query
                const regex = new RegExp(searchText, 'gi');
                const highlightedText = chatName.replace(regex, (match) => {
                    return `<mark class="highlight">${match}</mark>`;
                });

                c.querySelector(".username").innerHTML = highlightedText;
            } else {
                c.classList.remove("visible");
            }
        });
    }

}



//reset shake animation after it plays
function resetShake(){
    msg.classList.remove("shake");

}


//add the scrollbar class to the ul of messages because putting it in html isn't enough for some reason
const cardBody = document.querySelector('.card-body');
const ulElement = cardBody.querySelector('ul');

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

    const ulElement = document.querySelector("ul.scrollbar");
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

var rName=document.querySelector('#rname');
//run on page load
window.addEventListener('load', resizeInputs);
//run when user types into the rname input
rname.addEventListener('change', resizeInputs);



