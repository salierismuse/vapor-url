  const { nanoid } = require('nanoid');
  
  const express = require('express')
  const app = express()
  const port = 3000

  const db = require('./setup.js');

  app.use(express.static('public'), express.json());

  function validUrl(url) {
    return true;
  }

  function insertCode(url, res) {
    var code = nanoid(6);
    db.run("INSERT INTO LINKS (code, original_url) VALUES(?, ?)", 
    [code, url], (err) => {
      if (err) {
        console.log("insert failed:", err);
        insertCode(url);
      } else {
        console.log("insert succeeded!");
        res.json({short_code: code});
      }
    });
  }

  app.get('/:code', (req, res) => {
    console.log("HH")
    const myCode = req.params.code;
    db.get('SELECT original_url FROM Links WHERE Code = ?', [myCode], (err, url) => { 
      if (err) {
        console.log("no url of that code")
        res.render('/');
      }
      else {
        res.redirect(url.original_url);
      }
    })
  })

  app.post('/api/shorten', (req, res) => {
    console.log('backend received:', req.body);
    var url = req.body.long_url;
    if (validUrl(url)) {
      insertCode(url, res);
    }
    
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

