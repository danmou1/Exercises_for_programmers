import * as fs from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const fileName = __dirname + '\\notes.md'

async function newNote(note) {
    const currentDate = new Date().toISOString();
    const formattedDate = currentDate.slice(0, 10);
    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    console.log(`Adding note: ${note}`);
    try {
        try {
            await fs.access(fileName);
        } catch (error) {
            await fs.writeFile(fileName, '');
        }

        const formattedNote = `## ${formattedDate} @ ${formattedTime}\n\n${note}\n\n---\n`;
        await fs.appendFile(fileName, formattedNote);

        console.log(`Your note was saved.`);
    } catch (error) {
        console.error('Unable to add note:', error);
    }
};

async function showNotes() {
    try {
        await fs.access(fileName);

        const data = await fs.readFile(fileName, 'utf-8');
        if (data.trim() === '') {
            console.log('No notes availible.');
            return;
        }

        console.log(`Existing notes:\n${data}`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('No notes found.');
        } else {
            console.error('Unable to list notes:', error);
        }
    }
};

async function readNote(noteId) {
    try {
        const data = await fs.readfile(fileName, 'utf-8');
        const notes = data.split('---\n');

        if(noteId < 1 || noteId > notes.length) {
            console.log('Invalid note ID.');
            return;
        }

        console.log('Note content:\n');
        console.log(notes[noteId - 1].trim());
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('No notes found.');
        } else {
            console.error('Unable to read note:', error);
        }
    }
};

async function deleteNote(noteId) {
    try {
        let data = await fs.readFile(fileName, 'utf-8');
        let notes = data.split('---\n');

        if (noteId < 1 || noteId > notes.legnth) {
            console.log('Invalid note ID.');
            return;
        }

        notes.splice(noteId - 1, 1);

        data = notes.join('---\n');
        await fs.writeFile(fileName, data.trim());

        console.log('Note deleted successfully!');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('No notes found.');
        } else {
            console.error('Unable to delete note:', error);
        }
    }
};

export { newNote, showNotes, readNote , deleteNote };