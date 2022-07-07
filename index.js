const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {

    res.json({ message: "Welcome to NODE JS"});
    // res.send('<h1>Welcome to NODE JS!!!</h1>')
})


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`)
})