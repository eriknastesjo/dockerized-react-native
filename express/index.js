const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');



// Tillåter klienter från andra domäner att använda sig av API:et
app.use(cors());

app.get('/', (req, res) => {
    res.json('Hello World!');
})

app.get('/test', (req, res) => {
    res.send(
        {
            "testing": "Wow, so much data!",
            "testing2": "This is working too!"
        }
    );
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})