const expressLayouts = require('express-ejs-layouts')
const express = require('express')
const {loadContact, findContact, addContact, cekDuplikat} = require('./utils/handlers')
const { body, validationResult, check } = require('express-validator');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const path = require('path')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
// app.use(express.static('public'));

//config flash
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    })
);

app.use(flash())

// Dashboard Route
app.get('/', (req, res) => {
    const contacts = loadContact();

    res.render('index', {
        title: 'Dashboard',
        layout: 'layouts/templates',
        contacts,
        msg: req.flash('msg')
    });
})

// About Us Route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        layout: 'layouts/templates',
    });
})

//Contact Route
app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Us',
        layout: 'layouts/templates',
    });
})

// form add contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title: 'Form Tambah Kontak',
        layout: 'layouts/templates'
    })
})

// save contact
app.post('/', [
    body('nama').custom((value) => {
        const duplikasi = cekDuplikat(value);
        if (duplikasi) {
            throw new Error('NAma Kontak Sudah Tersedia di daftar Kontak');
        }
        return true;
    }),
    check('email', 'Email tidak sesuai').isEmail(),
    check('phone', 'Nomor HP tidak valid').isMobilePhone('id-ID')
    ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({ error: errors.array() });
        res.render('add-contact', {
            title: 'Form Tambah Kontak',
            layout: 'layouts/templates',
            errors: errors.array(),
        })
    } else {
        addContact(req.body);
        req.flash('msg', 'Data Kontak Berhasil ditambahkan!');
        res.redirect('/');
    }
})

// Detail Contact Route
app.get('/detail/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('detail', {
        title: 'Contact Detail',
        layout: 'layouts/templates',
        contact
    });
})

app.use((req, res, next) => {
    res.status(404).send('page not found');
    // 
})



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})