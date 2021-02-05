const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

const PORT = 3001;

app.listen(PORT, () => {
    console.log('SERVER START ON PORT', PORT);
});
