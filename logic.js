const notesKey = [];
var tempTitle = [];
var stickyColors = ["#ff7eb9", "#ff65a3", "#7afcff", "#feff9c", "fff740"];
var a = a;

var appContainer = document.getElementById("app-container");
var checklistContainer = document.getElementById("checklist-container");
var mainCanvas = document.getElementById("main-canvas");

var addBtn = document.getElementById("add-btn");
var addForm = document.getElementById("form-container");
var viewNote = document.getElementById("note-container");
var closeBtn = document.getElementById("close-btn");
var noteBtn = document.getElementById("note-btn");

var inpTitle = document.getElementById("input-title");
var inpNote = document.getElementById("textbox");
var saveBtn = document.getElementById("save-btn");
var editBtn = document.getElementById("edit-btn");
var delBtn = document.getElementById("del-btn");
var menuBtn = document.getElementById("menu-btn");

var form = document.getElementById("form");
var nte = document.getElementById("note");

var sideBar = document.getElementById("sidebar");
var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");





function main(){
    pushTo();

    notesKey.forEach(function(key){
            mainCanvas.appendChild(createDiv(key));
        }
    );

    displayNote();

    todoOnStart();

    //removeTodo();
    
    console.log(notesKey);
    console.log(localStorage);
    }






// 6reates new div
function createDiv(key){
    var newDiv = document.createElement("div");
    var rndmColor = stickyColors[Math.floor(Math.random() * stickyColors.length)];
    newDiv.setAttribute("id", key);
    newDiv.setAttribute("onClick", "noteClick()")
    newDiv.classList.add("note-preview");
    newDiv.classList.add("centered-flex");
    newDiv.style.background = rndmColor;
    newDiv.textContent = key;
    return newDiv;
}

function pushTo() {
    for (e=0; e<=localStorage.length; e++){
    if (localStorage.key(e) != null && localStorage.key(e) != "todo"){
            notesKey.push(localStorage.key(e));
        }  
    }
}






// display note textarea and hides notes preview
addBtn.addEventListener("click", addNoteClick);
function addNoteClick() {
    mainCanvas.style.animation = "slideup 0.5s linear";
    addForm.classList.add("display-form");
    form.style.animation = "fade 0.5s linear";
    appContainer.classList.add("display-hide");
    viewNote.classList.remove("display-note");
}






// hides note textarea when button click
closeBtn.addEventListener("click", closeBtnClick);
noteBtn.addEventListener("click", closeBtnClick);

function closeBtnClick() {
    appContainer.classList.remove("display-hide");
    addForm.classList.remove("display-form");
    viewNote.classList.remove("display-note");
}

function reverseAnimate(noteForm){
    noteForm.style.animation = "grow 1.6s linear";
}







// save5 the notes to local storage
saveBtn.addEventListener("click", addNote);
addForm.addEventListener("keypress", function(e){
    if(e.key==='Enter'){
        addNote();
    }
});

function addNote() {
    addForm.classList.remove("display-form");
    appContainer.classList.remove("display-hide");
    if (tempTitle.length == 0 || inpTitle.value == tempTitle[0]){
        var key = inpTitle.value;
        var valuePair = inpNote.value;
    } else if (inpTitle.value != tempTitle[0]){
        var key = inpTitle.value;
        var valuePair = inpNote.value;
        localStorage.removeItem(tempTitle[0]);
    }
    localStorage.setItem(key, valuePair);
    tempTitle = [];

    location.reload();
}









// displays note on click
function noteClick(){
    mainCanvas.style.animation = "slideup 0.5s linear";
    viewNote.classList.add("display-note");
    nte.style.animation = "fade 0.5s linear";
    appContainer.classList.add("display-hide");
}

function displayNote() {
    var mainCanvasChildren = Array.from(mainCanvas.children);
    var noteTitle = noteTitle;
    var noteContent = noteContent;
    //loops through children elements of main-canvas
    for (chld of mainCanvasChildren){
        chld.addEventListener("click", function() {
            a = this.id;
            noteTitle = a;
            noteContent = localStorage.getItem(a);

            var h1Title = document.getElementById("note-title-container");
            var pContent = document.getElementById("note-content");

            //edit note
            var editNote = function(){
                addNoteClick();
                inpTitle.value = noteTitle;
                inpNote.value = noteContent;
                tempTitle.push(a);
                console.log(tempTitle[0]);
            }

            viewNote.addEventListener("dblclick", editNote);
            editBtn.addEventListener("click", editNote);


            //delete note
            delBtn.addEventListener("click", () => {
                localStorage.removeItem(a);
                closeBtnClick();
                //location.reload();
                setTimeout(function(){
                    location.reload();
                }, 500);
            });

            //add2 temporary h1 and p to not3
            h1Title.innerHTML = noteTitle + " <hr>";
            pContent.textContent = noteContent;

            console.log(a);
            console.log(noteContent);
        });
    }
}




//clear all notes
function clearNotes(){
    alert("Are you sure you want to clear your notes?");
    setTimeout(function(){
        localStorage.clear();
    }, 2000);
    location.reload();
}




//change tabs
var tabLinks = document.getElementsByClassName("tab-links");
var appContainerClass = document.getElementsByClassName("app-container");
function changeTab(tab){
    for (apP of appContainerClass){
        apP.classList.remove("display-hide");
    }
    document.getElementById(tab).classList.add("display-hide");

    appContainer.style.animation = "fade 0.5s linear";
    checklistContainer.style.animation = "fade 0.5s linear";
}


//todo input
var todoLists = [];
var inpTodo = document.getElementById("input-todo");
var addTodoBtn = document.getElementById("add-todolist-btn");
var todoCanvas = document.getElementById("todo-canvas");
var chkBox = document.getElementById("chckbx");
var indTodo = document.getElementsByClassName("new-todo");


addTodoBtn.addEventListener("click", () => {
    todoLists.push(inpTodo.value);
    localStorage.setItem("todo", JSON.stringify(todoLists));
    todoCanvas.insertAdjacentElement("afterend", todoDiv(todoLists[todoLists.length-1]));
});


// remove items in todo list
function removeTodo(){
    event.currentTarget.classList.add("hide");
    todoLists.splice(JSON.stringify(this.value), 1);
    localStorage.setItem("todo", JSON.stringify(todoLists));
}


//convert todo back to array
function todoOnStart(){
    var unStringed = JSON.parse(localStorage.getItem("todo"));
    unStringed.forEach(function(arr){
        todoLists.push(arr);
    });
    todoLists.forEach(function(e){
        todoCanvas.appendChild(todoDiv(e));
    });
}


//append new html elements
function todoDiv(e){
    var newTodo = document.createElement("div");
    newTodo.setAttribute("class", "new-todo centered-flex light-theme");
    newTodo.setAttribute("value", e);
    newTodo.appendChild(chckBox(e));
    newTodo.appendChild(remBtn(e));
    newTodo.setAttribute("onClick", "removeTodo()");
    return newTodo;
}

function chckBox(e){
    var chckbx = document.createElement("div");
    chckbx.setAttribute("class", "chkbox");
    chckbx.setAttribute("id", "chkbox");
    chckbx.appendChild(spnTxt(e));
    return chckbx;
}

function spnTxt(e){
    var spanTxt = document.createElement("span");
    spanTxt.setAttribute("id", "spn"+e);
    spanTxt.innerText = e;
    return spanTxt;
}

function remBtn(e){
    var removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "btn add-btn centered-flex");
    removeBtn.setAttribute("id", "todo-close-btn");
    removeBtn.setAttribute("value", e);
    removeBtn.appendChild(crteImg());
    return removeBtn;
}

function crteImg(){
    var createImg = document.createElement("img");
    createImg.setAttribute("src", "assets/baseline_close_black_48dp.png");
    createImg.setAttribute("alt", "close");
    return createImg;
}
