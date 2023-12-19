import { newNote, showNotes, readNote, deleteNote } from './notes.mjs';
import * as process from 'process';


const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'new':
        const noteToAdd = args.slice(1).join(' ');
        newNote(noteToAdd);
        break;
    case 'show':
        showNotes();
        break;
    case 'read':
        const noteToRead = parseInt(args[1]);
        readNote(noteToRead);
        break;
    case 'delete':
        const noteToDelete = parseInt(args[1]);
        deleteNote(noteToDelete);
        break;
    case 'help':
        displayHelp();
        break;
    default:
        console.log('Invalid command. Use "help" to list commands.');
        break;
}

function displayHelp() {
    console.log(`Availible commands:
    new     : Creates a new note
    show    : Shows all notes
    read    : Read a note by ID
    delete  : Delete a note by ID
    help    : Show available commands and usage`);
};