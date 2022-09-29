const handler = require('./handler');

const main = async () => {
    const nama = await handler.inputPertanyaan('Masukan nama anda: ');
    const email = await handler.inputPertanyaan('Masukan email anda: ');
    const phone = await handler.inputPertanyaan('Masukan nomor hp anda: ');
 
    handler.simpanData(nama, email, phone);
}

main();



