const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();
const port = 8000;

app.get('/', (req, res) => {

    res.json({ message: "Welcome to NODE JS"});
    // res.send('<h1>Welcome to NODE JS!!!</h1>')
})

// jwt token creation
app.post('/tokenGeneration', (req, res) => {
    const user = {
        id: 1,
        username: 'novbatch',
        email: 'nov@gmail.com'
    }
    jwt.sign(user, 'secretkey', {expiresIn: '60s'}, function(err, token) {
        res.json({
            token
        });
      });
})

app.post('/verifyToken', takeToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', function(err, data){
        if(err){
            res.sendStatus(403)
        }
        else{
            res.json({
                message: 'user access granted',
                data
            })
        }
    })
})

// middleware
function takeToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`)
})