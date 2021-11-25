const express = require('express');
const router = express.Router();
const axios  = require('axios');

router.get('/', (req, res) => {
    return res.render(path.join(__dirname, '/../static/index.html'));
});

router.get('/github-oauth', (req, res) => {
    return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.CALLBACK}`)
});

router.get('/oauth-callback', async (req, res) => {
    try {
        let oauthCode = req.query.code;
        const body = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: oauthCode
        };

        const opts = {
            headers: {
                accept: 'application/json'
            }
        };

        let accessToken = await axios.post(`https://github.com/login/oauth/access_token`, body, opts);

        if(accessToken) {
            console.log('HELLO');
            console.log('Here is your access token: ', accessToken);
        }else {
            console.log('Error no access token sent by server');
        }

        return res.redirect('back');
    }catch(err) {
        console.log(`An error was encountered ${err}`);
    }
    

});

module.exports = router;