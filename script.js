let currentlyActive = false;    // means either a task or a note is in create or edit state, so new task or note can't be initiated

let darkMode = false;

function createTask() {

    document.querySelector('#new-task-btn').addEventListener('click', () => {

        if (currentlyActive) {
            alert("Finish the current task first.");
            return;
        }

        currentlyActive = true;

        const div = document.createElement('div');
        const input = document.createElement('input');
        const button = document.createElement('button');

        div.className = 'new-task';
        input.type = 'text';
        input.placeholder = 'Enter a task...';
        input.maxLength = '60';
        button.className = 'input-btn';
        button.textContent = 'Submit';

        div.append(input);
        div.append(button);
        document.querySelector('.task-content').prepend(div);
        applyTheme();

        const taskContent = document.querySelector('.task-content');
        taskContent.scrollTop = taskContent.scrollHeight;

        input.focus();

        button.addEventListener('click', () => {
            displayTask(input, false);
        });
    });

}

function editTask() {

    const taskContent = document.querySelector('.task-content');
    const editBtns = taskContent.querySelectorAll('.right .edit-btn');

    for (const editBtn of editBtns) {
        attachEditListener(editBtn, "task");
    }

}

function deleteTask() {

    const taskContent = document.querySelector('.task-content');
    const deleteBtns = taskContent.querySelectorAll('.right .delete-btn');

    for (const deleteBtn of deleteBtns) {
        attachDeleteListener(deleteBtn, "task");
    }

}

function displayTask(input, editCalled) {

    const value = input.value.trim();

    if (value === "") {
        alert("Task cannot be empty.");
        input.focus();
        return;
    }

    const newTask = input.parentElement;
    const task = document.createElement('div');
    const div_left = document.createElement('div');
    const div_right = document.createElement('div');
    const checkbox = document.createElement('input');
    const p = document.createElement('p');
    const div_right1 = document.createElement('div');
    const div_right2 = document.createElement('div');
    const editBtn = document.createElement('img');
    const deleteBtn = document.createElement('img');

    task.className = 'task';
    div_left.className = 'left';
    div_right.className = 'right';
    checkbox.type = 'checkbox';
    p.textContent = value;
    editBtn.className = 'edit-btn';
    deleteBtn.className = 'delete-btn';
    editBtn.src = 'images/edit-icon.svg';
    deleteBtn.src = 'images/delete-icon.svg';

    task.append(div_left);
    task.append(div_right);
    div_left.append(checkbox);
    div_left.append(p);
    div_right.append(div_right1);
    div_right.append(div_right2);
    div_right1.append(editBtn);
    div_right2.append(deleteBtn);

    newTask.replaceWith(task);

    if (editCalled) {
        updateEditedItemInLS(task, newTask, "task");
    }
    else {
        storeItemInLS(task, "task");
    }

    currentlyActive = false;

    // attach event Listeners to every newly created task
    attachEditListener(editBtn, "task");
    attachDeleteListener(deleteBtn, "task");
    attachStrikeListener(checkbox);

    // update header-popup and footer value
    let noOfTasks = Array.from(document.querySelector('.task-content').getElementsByClassName('task')).length;

    document.querySelector('.task-footer').textContent = noOfTasks + ' tasks in total';
    document.querySelector('.task-popup').textContent = noOfTasks;

    applyTheme();

}

function createNote() {

    document.querySelector('#new-note-btn').addEventListener('click', () => {

        if (currentlyActive) {
            alert("Finish the current note first.");
            return;
        }

        currentlyActive = true;

        const newNote = document.createElement('div');
        const input = document.createElement('input');
        const textArea = document.createElement('textarea');
        const button = document.createElement('button');

        newNote.className = 'new-note';
        input.type = 'text';
        input.placeholder = 'Enter title of note...';
        textArea.rows = '5';
        textArea.cols = '40';
        textArea.placeholder = 'Enter your note...';
        newNote.className = 'new-note';
        button.className = 'input-btn';
        button.textContent = 'Submit';

        newNote.append(input);
        newNote.append(textArea);
        newNote.append(button);

        document.querySelector('.note-content').prepend(newNote);
        applyTheme();

        const noteContent = document.querySelector('.note-content');
        noteContent.scrollTop = noteContent.scrollHeight;

        input.focus();

        button.addEventListener('click', () => {
            displayNote(input, textArea, false);
        });
    });

}

function editNote() {

    const noteContent = document.querySelector('.note-content');
    const editBtns = noteContent.querySelectorAll('.right .edit-btn');

    for (const editBtn of editBtns) {
        attachEditListener(editBtn, "note");
    }

}

function deleteNote() {

    const noteContent = document.querySelector('.note-content');
    const deleteBtns = noteContent.querySelectorAll('.right .delete-btn');

    for (const deleteBtn of deleteBtns) {
        attachDeleteListener(deleteBtn, "note");
    }

}
function displayNote(input, textArea, editCalled) {

    const title = input.value.trim();
    const note_text = textArea.value.trim();

    if (title === "" || note_text === "") {
        alert("Title or Note cannot be empty.");
        input.focus();
        return;
    }

    const newNote = input.parentElement;

    const note = document.createElement('div');
    const left = document.createElement('div');
    const right = document.createElement('div');
    const left_title = document.createElement('h3');
    const left_text = document.createElement('p');
    const right_div1 = document.createElement('div');
    const right_div2 = document.createElement('div');
    const editBtn = document.createElement('img');
    const deleteBtn = document.createElement('img');

    note.className = 'note';
    left.className = 'left';
    right.className = 'right';
    left_title.textContent = title;
    left_text.textContent = note_text;
    editBtn.className = 'edit-btn';
    deleteBtn.className = 'delete-btn';
    editBtn.src = 'images/edit-icon.svg';
    deleteBtn.src = 'images/delete-icon.svg';

    note.append(left);
    note.append(right);
    left.append(left_title);
    left.append(left_text);
    right.append(right_div1);
    right.append(right_div2);
    right_div1.append(editBtn);
    right_div2.append(deleteBtn);

    newNote.replaceWith(note);

    if (editCalled) {
        updateEditedItemInLS(note, newNote, "note");
    }
    else {
        storeItemInLS(note, "note");
    }

    currentlyActive = false;

    // attach event Listeners
    attachEditListener(editBtn, "note");
    attachDeleteListener(deleteBtn, "note");

    // update header-popup and footer value
    let noOfNotes = Array.from(document.querySelector('.note-content').getElementsByClassName('note')).length;

    document.querySelector('.note-footer').textContent = noOfNotes + ' notes in total';
    document.querySelector('.note-popup').textContent = noOfNotes;

    applyTheme();

}

// type parameter in below functions represents either a task or a note depending on who calls the function
function attachEditListener(editBtn, type) {

    editBtn.addEventListener('click', () => {

        if (currentlyActive) {
            alert(`Finish the current ${type} first.`);
            return;
        }

        currentlyActive = true;

        const item = editBtn.closest(`.${type}`);

        if (type === "task") {

            const oldText = item.querySelector('.left p').textContent;

            const newTask = document.createElement('div');
            const input = document.createElement('input');
            const button = document.createElement('button');

            newTask.className = 'new-task';
            input.type = 'text';
            button.className = 'input-btn';
            button.textContent = 'Submit';

            newTask.append(input);
            newTask.append(button);
            input.value = oldText;
            input.dataset.original = oldText;

            item.replaceWith(newTask);
            applyTheme();

            input.focus();

            button.addEventListener('click', () => {
                displayTask(input, true);
            });

        }
        else {

            const oldTitle = item.querySelector('.left h3').textContent;
            const oldText = item.querySelector('.left p').textContent;

            const newNote = document.createElement('div');
            const input = document.createElement('input');
            const textArea = document.createElement('textarea');
            const button = document.createElement('button');

            newNote.className = 'new-note';
            input.type = 'text';
            button.className = 'input-btn';
            button.textContent = 'Submit';

            newNote.append(input);
            newNote.append(textArea);
            newNote.append(button);
            input.value = oldTitle;
            textArea.value = oldText;
            input.dataset.original = oldTitle;
            textArea.dataset.original = oldText;

            item.replaceWith(newNote);
            applyTheme();

            textArea.focus();

            button.addEventListener('click', () => {
                displayNote(input, textArea, true);
            });
        }

    });

}

function attachDeleteListener(deleteBtn, type) {

    deleteBtn.addEventListener('click', () => {
        const item = deleteBtn.closest(`.${type}`);
        item.remove();

        // remove from localStorage too
        removeItemFromLS(item, type);

        // update header-popup and footer value
        let noOfTypes = Array.from(document.querySelector(`.${type}-content`).getElementsByClassName(`${type}`)).length;

        document.querySelector(`.${type}-footer`).textContent = noOfTypes + ` ${type}s in total`;
        document.querySelector(`.${type}-popup`).textContent = noOfTypes;
    });

}

// only for tasks
function attachStrikeListener(checkbox) {

    checkbox.addEventListener('change', function (event) {
        if (this.checked) {
            checkbox.parentElement.querySelector('p').style.textDecoration = "line-through";
        }
        else {
            checkbox.parentElement.querySelector('p').style.textDecoration = "none";
        }
    });

}

// toggle between light and dark modes
function toggleMode() {

    let toggleBtn = document.querySelector('.mode-toggle');
    toggleBtn.addEventListener('click', () => {
        darkMode = !darkMode;
        applyTheme();
    })

}

// styles using js are added as inline css and can be removed by simply assigning them "";
function applyTheme() {

    const body = document.querySelector("body");
    const title = document.querySelector(".title");
    const containers = document.querySelectorAll('.task-container, .note-container');
    const tasks = document.querySelectorAll(".task");
    const notes = document.querySelectorAll(".note");
    const taskTexts = document.querySelectorAll(".task .left p");
    const noteTitles = document.querySelectorAll(".note .left h3");
    const noteTexts = document.querySelectorAll(".note .left p");
    const footers = document.querySelectorAll(".task-footer, .note-footer");
    const editDelBtns = document.querySelectorAll(".right img");
    const toggleBtn = document.querySelector('.mode-toggle'); // toggle button

    const newTaskInputs = document.querySelectorAll('.new-task input');
    const newNoteTitles = document.querySelectorAll('.new-note input');
    const newNoteTexts = document.querySelectorAll('.new-note textarea');

    if (darkMode) {
        // body
        body.style.cssText = `
            background-color: #121212;
            color: white;
        `;

        // title
        title.style.color = "white";

        // containers
        containers
            .forEach(container => {
                container.style.backgroundColor = "#1E1E1E";
                container.style.borderColor = "#3A3A3A";
            });

        // task cards
        tasks
            .forEach(task => {
                task.style.backgroundColor = "#252525";
                task.style.borderColor = "#3A3A3A";
                task.style.border = "1px solid rgb(162 159 159)";
            });

        // note cards
        notes
            .forEach(note => {
                note.style.backgroundColor = "#252525";
                note.borderTop = "3px solid rgb(162 159 159)";
                note.borderBottom = "3px solid rgb(162 159 159)";
                note.borderRight = "3px solid rgb(162 159 159)";
                note.style.borderLeft = "3px solid var(--purple-light)";
            });

        // .new-task input (Create or Edit Mode)
        newTaskInputs
            .forEach(input => {
                input.style.backgroundColor = "#252525";
                input.style.color = "white";
            })

        // .new-task input (Create or Edit Mode)
        newNoteTitles
            .forEach(title => {
                title.style.backgroundColor = "#252525";
                title.style.color = "white";
            })

        // .new-task input (Create or Edit Mode)
        newNoteTexts
            .forEach(text => {
                text.style.backgroundColor = "#252525";
                text.style.color = "white";
            })


        // task text
        taskTexts
            .forEach(p => {
                p.style.color = "#E5E7EB";
            });

        // note title & text
        noteTitles
            .forEach(h3 => {
                h3.style.color = "white";
            });

        noteTexts
            .forEach(p => {
                p.style.color = "#E5E7EB";
            });

        // footers
        footers
            .forEach(footer => {
                footer.style.color = "#A1A1AA";
                footer.style.borderColor = "#3A3A3A";
            });


        toggleBtn.style.cssText = `
            background-color: #1E1E1E;
            color: white;
            border: 1px solid #555;
        `;

        editDelBtns.forEach(btn => {
            btn.style.filter = 'invert(1)';
        })

        toggleBtn.textContent = 'Dark Mode: ON';
    }

    else {
        body.removeAttribute('style');
        title.removeAttribute('style');
        containers.forEach(container => {
            container.removeAttribute('style');
        })
        tasks.forEach(task => {
            task.removeAttribute('style');
        })
        notes.forEach(note => {
            note.removeAttribute('style');
        })
        taskTexts.forEach(tt => {
            tt.removeAttribute('style');
        })
        noteTitles.forEach(nt => {
            nt.removeAttribute('style');
        })
        noteTexts.forEach(nt => {
            nt.removeAttribute('style');
        })
        footers.forEach(footer => {
            footer.removeAttribute('style');
        })
        toggleBtn.removeAttribute("style");

        editDelBtns.forEach(btn => {
            btn.removeAttribute("style");
        })

        newTaskInputs
            .forEach(input => {
                input.removeAttribute("style");
            })

        newNoteTitles
            .forEach(title => {
                title.removeAttribute("style");
            })

        newNoteTexts
            .forEach(text => {
                text.removeAttribute("style");
            })

        toggleBtn.textContent = 'Light Mode: ON';
    }
}

// stores newly created tasks and notes in localStorage as String.
function storeItemInLS(item, type) {

    let data = JSON.parse(localStorage.getItem(type)) || [];
    const itemText = item.querySelector(`.left p`).textContent;

    if (type === "task") {
        data.push(itemText);
    }
    else {
        const itemTitle = item.querySelector(`.left h3`).textContent;
        data.push({
            title: itemTitle,
            text: itemText
        });
    }

    localStorage.setItem(type, JSON.stringify(data));
}

// stores new value of edited task or note and removes previous value.
function updateEditedItemInLS(item, oldItem, type) {

    let data = JSON.parse(localStorage.getItem(type)) || [];
    const itemText = item.querySelector(`.left p`).textContent;

    if (type === "task") {
        const oldText = oldItem.querySelector('input').dataset.original;

        data = data.map(task => task === oldText ? itemText : task);    // explained at the end of code
    }
    else {
        const oldTitle = oldItem.querySelector('input').dataset.original;
        const oldText = oldItem.querySelector('textarea').dataset.original;
        const itemTitle = item.querySelector('.left h3').textContent;

        const newNote = {
            title: itemTitle,
            text: itemText
        };

        data = data.map(note => (note.title === oldTitle && note.text === oldText) ? newNote : note);
    }

    localStorage.setItem(type, JSON.stringify(data));
}

// removes deleted task / note from localStorage.
function removeItemFromLS(item, type) {

    const itemText = item.querySelector('.left p').textContent;

    if (type === "task") {
        let data = JSON.parse(localStorage.getItem(type)) || [];
        data = data.filter(task => task !== itemText);
        localStorage.setItem(type, JSON.stringify(data));
    }
    else {
        const itemTitle = item.querySelector('.left h3').textContent;

        let data = JSON.parse(localStorage.getItem(type)) || [];
        data = data.filter(note => (note.title !== itemTitle && note.text !== itemText));
        localStorage.setItem(type, JSON.stringify(data));
    }

}

// retrieves data from localStorage and displays on screen in the form of tasks / notes. Runs when page loads / reloads.
function retrieveItemFromLS(item, type) {

    document.addEventListener("DOMContentLoaded", () => {
        displayRetrievedItem();
    });

}

function displayRetrievedItem() {

    const data_tasks = JSON.parse(localStorage.getItem('task')) || [];
    const data_notes = JSON.parse(localStorage.getItem('note')) || [];

    if (data_tasks != []) {
        // .slice().reverse() keeps the latest first order of notes
        data_tasks.slice().reverse().forEach(element => {

            // create a task
            const task = document.createElement('div');
            const div_left = document.createElement('div');
            const div_right = document.createElement('div');
            const checkbox = document.createElement('input');
            const p = document.createElement('p');
            const div_right1 = document.createElement('div');
            const div_right2 = document.createElement('div');
            const editBtn = document.createElement('img');
            const deleteBtn = document.createElement('img');

            task.className = 'task';
            div_left.className = 'left';
            div_right.className = 'right';
            checkbox.type = 'checkbox';
            p.textContent = element;
            editBtn.className = 'edit-btn';
            deleteBtn.className = 'delete-btn';
            editBtn.src = 'images/edit-icon.svg';
            deleteBtn.src = 'images/delete-icon.svg';

            task.append(div_left);
            task.append(div_right);
            div_left.append(checkbox);
            div_left.append(p);
            div_right.append(div_right1);
            div_right.append(div_right2);
            div_right1.append(editBtn);
            div_right2.append(deleteBtn);

            // put inside task-content
            const taskContent = document.querySelector('.task-content');
            taskContent.append(task);

            // attach Listeners
            attachEditListener(editBtn, "task");
            attachDeleteListener(deleteBtn, "task");
            attachStrikeListener(checkbox);

            // update header-popup and footer value
            let noOfTasks = Array.from(document.querySelector('.task-content').getElementsByClassName('task')).length;

            document.querySelector('.task-footer').textContent = noOfTasks + ' tasks in total';
            document.querySelector('.task-popup').textContent = noOfTasks;

            applyTheme();
        });
    }

    if (data_notes != []) {
        // .slice().reverse() keeps the latest first order of notes
        data_notes.slice().reverse().forEach(element => {
            // create note
            const note = document.createElement('div');
            const left = document.createElement('div');
            const right = document.createElement('div');
            const left_title = document.createElement('h3');
            const left_text = document.createElement('p');
            const right_div1 = document.createElement('div');
            const right_div2 = document.createElement('div');
            const editBtn = document.createElement('img');
            const deleteBtn = document.createElement('img');

            note.className = 'note';
            left.className = 'left';
            right.className = 'right';
            left_title.textContent = element.title;
            left_text.textContent = element.text;
            editBtn.className = 'edit-btn';
            deleteBtn.className = 'delete-btn';
            editBtn.src = 'images/edit-icon.svg';
            deleteBtn.src = 'images/delete-icon.svg';

            note.append(left);
            note.append(right);
            left.append(left_title);
            left.append(left_text);
            right.append(right_div1);
            right.append(right_div2);
            right_div1.append(editBtn);
            right_div2.append(deleteBtn);

            // put inside note-content
            const noteContent = document.querySelector('.note-content');
            noteContent.append(note);

            // attach event Listeners
            attachEditListener(editBtn, "note");
            attachDeleteListener(deleteBtn, "note");

            // update header-popup and footer value
            let noOfNotes = Array.from(document.querySelector('.note-content').getElementsByClassName('note')).length;

            document.querySelector('.note-footer').textContent = noOfNotes + ' notes in total';
            document.querySelector('.note-popup').textContent = noOfNotes;

            applyTheme();
        });
    }

}

// run all task functions
createTask();
editTask();
deleteTask();

// run all note functions
createNote();
editNote();
deleteNote();

toggleMode();
retrieveItemFromLS();


/*
HTML Structure of each task and note.Storing for my ease:

1. Task(Display):

<div class="task">
    <div class="left">
        <input type="checkbox">
        <p>${value}</p>
    </div>

    <div class="right">
        <div><img class='edit-btn' src="images/edit-icon.svg"></div>
        <div><img class='delete-btn' src="images/delete-icon.svg"></div>
    </div>
</div>



2. Task(Edit Mode):

<div class="new-task">
    <input type="text">
    <button class="input-btn">Submit</button>
</div>



3. Note(Display):

<div class="note">
    <div class="left">
        <h3>${title}</h3>
        <p>${value}</p>
    </div>

    <div class="right">
        <div><img class='edit-btn' src="images/edit-icon.svg"></div>
        <div><img class='delete-btn' src="images/delete-icon.svg"></div>
    </div>
</div>



4. Note(Edit Mode):

<div class="new-note">
    <input type="text" placeholder="Enter title of the note...">
    <textarea rows="5" cols="40" placeholder="Enter your note..."></textarea>
    <button class="input-btn">Submit</button>
</div>

*/

/*
- JSON.parse converts JS object which is 'Array' in our case into a string
- JSON.stringify() converts string back to a JS object which is 'Array' in our case, so that we can push new text of tasks and notes in it.
*/

/*
Explanation of this line: data = data.map(item => item === oldText ? itemText : item);

Go through every item in the array. If an item equals oldText, replace it with newText; otherwise, keep it unchanged. Then return the new array.
*/

// Have to do alot of rework of displayTask() and displayNote() in displayRetrievedItem(). Maybe could optimize later.