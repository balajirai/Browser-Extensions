document.addEventListener('DOMContentLoaded', function () {
    const noteInput = document.getElementById('noteInput');
    const addNoteBtn = document.getElementById('addNote');
    const noteList = document.getElementById('noteList');

    chrome.storage.sync.get('notes', function (data) {
        if (data.notes) {
            data.notes.forEach(note => addNoteToUI(note));
        }
    });

    addNoteBtn.addEventListener('click', function () {
        const noteText = noteInput.value.trim();

        if (noteText !== '') {
            addNoteToUI(noteText);
            saveNoteToStorage(noteText);

            noteInput.value = '';
        }
    });

    function addNoteToUI(noteText) {
        const listItem = document.createElement('li');
        listItem.textContent = noteText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('ml-2', 'text-red-500', 'cursor-pointer');
        deleteBtn.addEventListener('click', function () {
            listItem.remove();
            removeNoteFromStorage(noteText);
        });

        listItem.appendChild(deleteBtn);
        noteList.appendChild(listItem);
    }

    function saveNoteToStorage(noteText) {
        chrome.storage.sync.get('notes', function (data) {
            const notes = data.notes || [];
            notes.push(noteText);
            chrome.storage.sync.set({ 'notes': notes });
        });
    }

    function removeNoteFromStorage(noteText) {
        chrome.storage.sync.get('notes', function (data) {
            const notes = data.notes || [];
            const updatedNotes = notes.filter(note => note !== noteText);
            chrome.storage.sync.set({ 'notes': updatedNotes });
        });
    }
});
