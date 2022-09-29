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

// input question
const inputPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (data) => {
            resolve(data);
        });
    });
};

//save data
const simpanData = (nama, email, phone) => {
    const contact = {nama,email, phone};
        const file = fs.readFileSync(filePath, 'utf8');
        const contacts = JSON.parse(file);
        contacts.push(contact);

        fs.writeFileSync(filePath, JSON.stringify(contacts));
        console.log('Data berhasil ditambahkan. TERIMA KASIH');
        rl.close();
}

module.exports = {inputPertanyaan, simpanData};