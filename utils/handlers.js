const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//check file directory
const dirPath = './data';
const filePath = './data/contact.json';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
}

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contact.json', 'utf-8')
    const contacts = JSON.parse(fileBuffer)
    return contacts
}

const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

// save contact
const saveContact = (contacts) => {
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
};

// add contact
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContact(contacts)
}

// cek duplikasi
const cekDuplikat = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama);
};

module.exports = {loadContact, findContact, addContact, cekDuplikat}