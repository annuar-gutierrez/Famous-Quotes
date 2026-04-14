import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
//for Express to get values using the POST method
app.use(express.urlencoded({extended:true}));
//setting up database connection pool, replace values in red
const pool = mysql.createPool({
    host: "x71wqc4m22j8e3ql.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PWD,
    database: "q8vns5o1tk9c6hkq",
    connectionLimit: 10,
    waitForConnections: true
});
//routes
app.get('/', async (req, res) => {
    let sqlA = `SELECT authorId, firstName, lastName
    FROM authors
    ORDER BY lastname`;
    const [authors] = await pool.query(sqlA);

    let sqlB = `SELECT DISTINCT category
    FROM quotes
    ORDER BY category`;
    const [categories] = await pool.query(sqlB);

    res.render("home", {authors, categories});
});

app.get('/searchByKeyword', async (req, res) => {
    let keyword = req.query.keyword;
    let sql = `SELECT authorId, firstName, lastName, quote 
        FROM quotes 
        NATURAL JOIN authors 
        WHERE quote LIKE ? `;

    let sqlParams = [`%${keyword}%`];
    const [rows] = await pool.query(sql, sqlParams);
    
    res.render("results", {"quotes":rows});
})

app.get('/searchByAuthor', async (req, res) => {
    let userAuthorId = req.query.authorId;
    let sql = `SELECT authorId, firstName, lastName, quote
    FROM quotes
    NATURAL JOIN authors
    WHERE authorId = ? `;
    let sqlParams = [userAuthorId];
    const [rows] = await pool.query(sql, sqlParams);
    res.render("results", {"quotes":rows});
})

app.get('/api/author/:id', async (req, res) => {
    let authorId = req.params.authorId;
    let sql = `SELECT *
    FROM authors
    WHERE authorId = ? `;
    const [rows] = await pool.query(sql, [authorId]);
    res.send(rows);
})

app.get("/searchByLikes", async (req, res) => {
    let min = req.query.min || 0;
    let max = req.query.max || 100000;

    let sql = `SELECT authorId, firstName, lastName, quote
    FROM quotes
    NATURAL JOIN authors
    WHERE likes BETWEEN ? AND ?`;
    let sqlParams = [min, max]
    const [rows] = await pool.query(sql, sqlParams);

    res.render("results", {"quotes":rows});
});

app.get("/searchByCategory", async (req, res) => {
    let sql = `SELECT quote, q_authors.authorId, firstName, lastName
    FROM q_quotes
    NATURAL JOIN q_authors
    WHERE category = ?`;

    const [rows] = await pool.query(sql, [req.query.category]);

  res.render("results", {"quotes":rows});
});



app.listen(3000, ()=>{
    console.log("Express server running")
});
