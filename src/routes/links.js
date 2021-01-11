const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    //console.log(req.body);
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    //console.log(newLink);
    await pool.query('INSERT INTO link set ?', [newLink]);
    req.flash('success', 'Link guardado ok');
    res.redirect('/links');
});

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM link');
    console.log(links);
    res.render('links/list', {links});
});

router.get('/delete/:id', async (req, res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM link WHERE ID = ?', [id]);
    req.flash('success', 'enlace borrado ok');
    res.redirect('/links');

});

router.get('/edit/:id', async (req, res) =>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM link WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) =>{
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE link set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'enlace editado ok');
    res.redirect('/links');
});

module.exports = router;