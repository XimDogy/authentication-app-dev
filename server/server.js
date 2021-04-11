const express = require('express');

const port = 5000;
const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Authentication App API working fine");
});

app.listen(port, (req, res) => {
    console.log(`Server started on port: ${port} \nvisit: http://localhost:${port}/`);
});