// server.js

    // set up ========================
var express = require('express')
    , async = require('async')
    , http = require('http');

    var app      = express();                               // create our app w/ express
    var http = require('http').Server(app);
    var bodyParser = require("body-parser");
    //var morgan = require('morgan');             // log requests to the console (express4)
    //var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    //var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    //    app.use( bodyParser.json() );       // to support JSON-encoded bodies
    //    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    //        extended: true
    //}));

// configuration =================
//
//    app.use(express.static(__dirname + '/public/ChoreoProSite/Website/app'));                 // set the static files location /public/img will be /img for users
//    app.use(morgan('dev'));                                         // log every request to the console
    app.use(require('connect').bodyParser());
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
//    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//    app.use(methodOverride());
    var mysql = require("mysql");

    // First you need to create a connection to the db
    var con = mysql.createConnection({
        host: "choreoprodb.clbrgrz25yri.us-west-2.rds.amazonaws.com",
        user: "ChoreoProAdmin",
        password: "HVCErW3tD5D9TM3G",
        port: 3306
    });

con.connect(function(err){
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'choreoProManagement@gmail.com',
        pass: 'ChoreoProTest'
    }
});
// listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");

	// server.js

var choreographersData = {
    "choreographers": [
        {
            "id": 0,
            "name": "Dahlston Delgado",
            "bio":  "Starred on Broadway in Bring it On. A national chapmpion choreographer with many all-star teams along with UTA, Sam Houston State, Houston, and many local Dallas area high schools. He choreographs all around the country with his unique and innovative style that cannot be duplicated.",
            "imageSource":"assets/images/dahlstonDelgado.jpg",
            "prices": [
                {"Level 1" : 1000},
                {"Level 2": 2000},
                {"Level 5": 5000}
            ]
        },
        {
            "id": 1,
            "name": "Connor Huber",
            "bio":  "Starred on Broadway in Bring it On. A national chapmpion choreographer with many all-star teams along with UTA, Sam Houston State, Houston, and many local Dallas area high schools. He choreographs all around the country with his unique and innovative style that cannot be duplicated.",
            "imageSource":"assets/images/connorHubery.jpg",
            "prices": [
                {"Level 1" : 1000},
                {"Level 3": 3000},
                {"Level 4": 4000}
            ]
        }
    ]
}

var pages = {
    "pages": [
        {
            "id":0,
            "pageName":"Homepage",
            "pageItems": [
                {
                    "attributeName": "title",
                    "attributeText": "Tiffany Fettinger"
                },
                {
                    "attributeName": "text",
                    "attributeText": ""
                },
                {
                    "attributeName": "imageSource",
                    "attributeText": "assets/images/tiffanyFettinger.jpg"
                },
                {
                    "attributeName": "testimonialOne",
                    "attributeText": {"TestimonialOne":"I love ChoreoPro because it has mmade my experience so much easier. Tiffany has allowed my gym and i to book top notch choreographers at ease and it is most definitely a load off of our backs."}
                },
                {
                    "attributeName": "testimonialTwo",
                    "attributeText": {"TestimonialOne":"I love ChoreoPro because it has mmade my experience so much easier. Tiffany has allowed my gym and i to book top notch choreographers at ease and it is most definitely a load off of our backs."}
                },
                {
                    "attributeName": "testimonialThree",
                    "attributeText": {"TestimonialOne":"I love ChoreoPro because it has mmade my experience so much easier. Tiffany has allowed my gym and i to book top notch choreographers at ease and it is most definitely a load off of our backs."}
                }
            ]
        },
        {
            "id":1,
            "pageName": "ContactPage",
            "pageItems": [
                {
                    "attributeName": "email",
                    "attributeText": "tfettinger@choreopromanagement.com"
                },
                {
                    "attributeName": "phoneNumber",
                    "attributeText": "111-222-3333",
                },
                {
                    "attributeName": "address",
                    "attributeText": "ChoreoPro Management, 2222 Street Blvd, Suite 33, Dallas, TX 75275"
                },
            ]
        }
    ]
}


app.get('/', function(req, res){
  res.send('If you see this, hell has frozen over and your API is working!');
});

app.get('/choreographers', function(req, res) {
    con.query('SELECT ChoreographerID AS id, ChoreographerName AS name,BioText AS bio, ImageAddress AS imageSource, Level1Name, Level1Amount, Level2Name, Level2Amount, Level3Name, Level3Amount, Level4Name, Level4Amount, Level5Name, Level5Amount FROM ChoreoPro.Choreographer;',function(err,choreographers){
        if(err) throw err

        console.log('Data received from Db:\n');
        console.log(choreographers);
        res.json(choreographers);
    });
});

app.get('/choreographers/:id', function(req,res) {
    con.query('SELECT ChoreographerID AS id, ChoreographerName AS name,BioText AS bio, ImageAddress AS imageSource, Level1Name, Level1Amount, Level2Name, Level2Amount, Level3Name, Level3Amount, Level4Name, Level4Amount, Level5Name, Level5Amount FROM ChoreoPro.Choreographer WHERE ChoreographerID = ' + req.params.id +';',function(err,choreographer){
        if(err) throw err;

        choreographer = choreographer[0];
        console.log('Data received from Db:\n');
        console.log(choreographer);
        res.json(choreographer);
    });
});

app.post('/choreographers', function(req, res) {
    var name = req.body.name;
    var bio = req.body.bio;
    var imageSource = req.body.imageSource;
    var level1Name = "Level 1";
    var level1Amount = req.body.Level1Amount;
    var level2Name = "Level 2";
    var level2Amount = req.body.Level2Amount;
    var level3Name = "Level 3";
    var level3Amount = req.body.Level3Amount;
    var level4Name = "Level 4";
    var level4Amount = req.body.Level4Amount;
    var level5Name = "Level 5";
    var level5Amount = req.body.Level5Amount;

    var choreographer = {
        "ChoreographerName": name,
        "BioText": bio,
        "ImageAddress": imageSource,
        "Level1Name": level1Name,
        "Level1Amount": level1Amount,
        "Level2Name": level2Name,
        "Level2Amount": level2Amount,
        "Level3Name": level3Name,
        "Level3Amount": level3Amount,
        "Level4Name": level4Name,
        "Level4Amount": level4Amount,
        "Level5Name": level5Name,
        "Level5Amount": level5Amount
    }

    con.query('INSERT INTO ChoreoPro.Choreographer SET ?', choreographer, function(err,res){
        if(err) throw err;

        console.log(choreographer);
    });
    res.json(choreographer);
});

app.put('/choreographers/:id', function(req,res) {

    if (req.body.name) {
        con.query(
            'UPDATE ChoreoPro.Choreographer SET ChoreographerName = ? Where ChoreographerID = ?',
            [req.body.name, req.params.id],
            function (err, result) {
                if (err) throw err;

                console.log('Changed ' + result.changedRows + ' rows');
            }
        );
    }
    if (req.body.bio) {
        con.query(
            'UPDATE ChoreoPro.Choreographer SET BioText = ? Where ChoreographerID = ?',
            [req.body.bio, req.params.id],
            function (err, result) {
                if (err) throw err;

                console.log('Changed ' + result.changedRows + ' rows');
            }
        );
    }
    if (req.body.Level1Name) {
        con.query(
            'UPDATE ChoreoPro.Choreographer SET Level1Name = ? Where ChoreographerID = ?',
            [req.body.level1Name, req.params.id],
            function (err, result) {
                if (err) throw err;

                console.log('Changed ' + result.changedRows + ' rows');
            }
        );
    }
    if (req.body.Level1Amount) {
        con.query(
            'UPDATE ChoreoPro.Choreographer SET Level1Amount = ? Where ChoreographerID = ?',
            [req.body.level1Amount, req.params.id],
            function (err, result) {
                if (err) throw err;

                console.log('Changed ' + result.changedRows + ' rows');
            }
        );
    }
    if (req.body.Level2Name) {
        con.query(
            'UPDATE ChoreoPro.Choreographer SET Level2Name = ? Where ChoreographerID = ?',
            [req.body.level2Name, req.params.id],
            function (err, result) {
                if (err) throw err;

                console.log('Changed ' + result.changedRows + ' rows');
            }
        );
    }
    if (req.body.Level2Amount) {
        con.query(
            'UPDATE ChoreoPro.Choreographer SET Level2Amount = ? Where ChoreographerID = ?',
            [req.body.level2Amount, req.params.id],
            function (err, result) {
                if (err) throw err;

                console.log('Changed ' + result.changedRows + ' rows');
            }
        );
    }
    if (req.body.Level3Name) {
        con.query(
            'UPDATE ChoreoPro.Choreographer SET Level3Name = ? Where ChoreographerID = ?',
            [req.body.level3Name, req.params.id],
            function (err, result) {
                if (err) throw err;

                console.log('Changed ' + result.changedRows + ' rows');
            }
        );
    }
    if (req.body.Level3Amount) {
        con.query(
            'UPDATE ChoreoPro.Choreographer SET Level3Amount = ? Where ChoreographerID = ?',
            [req.body.level3Amount, req.params.id],
            function (err, result) {
                if (err) throw err;

                console.log('Changed ' + result.changedRows + ' rows');
            }
        );
    }
    if (req.body.Level4Name) {
        con.query(
            'UPDATE ChoreoPro.Choreographer SET Level4Name = ? Where ChoreographerID = ?',
            [req.body.level4Name, req.params.id],
            function (err, result) {
                if (err) throw err;

                console.log('Changed ' + result.changedRows + ' rows');
            }
        );
    }
    if (req.body.Level4Amount) {
        con.query(
            'UPDATE ChoreoPro.Choreographer SET Level4Amount = ? Where ChoreographerID = ?',
            [req.body.level4Amount, req.params.id],
            function (err, result) {
                if (err) throw err;

                console.log('Changed ' + result.changedRows + ' rows');
            }
        );
    }
    if (req.body.Level5Name) {
        con.query(
            'UPDATE ChoreoPro.Choreographer SET Level5Name = ? Where ChoreographerID = ?',
            [req.body.level5Name, req.params.id],
            function (err, result) {
                if (err) throw err;

                console.log('Changed ' + result.changedRows + ' rows');
            }
        );
    }
    if (req.body.Level5Amount) {
        con.query(
            'UPDATE ChoreoPro.Choreographer SET Level5Amount = ? Where ChoreographerID = ?',
            [req.body.level5Amount, req.params.id],
            function (err, result) {
                if (err) throw err;

                console.log('Changed ' + result.changedRows + ' rows');
            }
        );
    }
    if (req.body.imageSource) {
        con.query(
            'UPDATE ChoreoPro.Choreographer SET ImageAddress = ? Where ChoreographerID = ?',
            [req.body.imageSource, req.params.id],
            function (err, result) {
                if (err) throw err;

                console.log('Changed ' + result.changedRows + ' rows');
            }
        );
    }
    res.json({"update": "True"});

});

app.delete('/choreographers/:id', function(req,res) {
    con.query(
        'DELETE FROM ChoreoPro.Choreographer WHERE ChoreographerID = ?',
        [req.params.id],
        function (err, result) {
            if (err) throw err;

            console.log('Deleted ' + result.affectedRows + ' rows');
            res.json({"Rows affected": result.affectedRows});
        }
    );
});


app.get('/pages', function(req, res) {
    con.query('SELECT * FROM ChoreoPro.Page;',function(err,choreographers){
        if(err) throw err

        console.log('Data received from Db:\n');
        console.log(choreographers);
        res.json(choreographers);
    });
});

app.get('/pages/:id', function(req,res) {
    con.query('SELECT PageId, PageName FROM ChoreoPro.Page WHERE PageID = ?', req.params.id, function(err,rows){
        if(err) throw err;

        rows = rows[0];
        console.log('Data received from Db:\n');
        console.log(rows);
        res.json(rows);
    });
});

app.get('/pageAttributes', function(req,res) {
    con.query('SELECT * FROM ChoreoPro.PageAttribute', function(err,rows){
        if(err) throw err;

        console.log('Data received from Db:\n');
        console.log(rows);
        res.json(rows);
    });
});

app.get('/pageAttributes/:id', function(req,res) {
    con.query('SELECT * FROM ChoreoPro.PageAttribute WHERE AttributeID = ?', req.params.id, function(err,rows){
        if(err) throw err;

        rows = rows[0];
        console.log('Data received from Db:\n');
        console.log(rows);
        res.json(rows);
    });
});

app.put('/pageAttributes/:id', function(req,res) {
    con.query(
        'UPDATE ChoreoPro.PageAttribute SET AttributeText = ? Where AttributeID = ?',
        [req.body.AttributeText, req.params.id],
        function (err, result) {
            if (err) throw err;

            console.log('Changed ' + result.changedRows + ' rows');
    });
    //if (req.body.email) {
    //    con.query('UPDATE ChoreoPro.PageAttribute SET AttributeText = ? Where AttributeID = ?',
    //        [req.body.email, 1],
    //        function (err, result) {
    //            if (err) throw err;
    //
    //            console.log('Changed ' + result.changedRows + ' rows');
    //        }
    //    );
    //}
    //if (req.body.phoneNumber) {
    //    con.query('UPDATE ChoreoPro.PageAttribute SET AttributeText = ? Where AttributeID = ?',
    //        [req.body.phoneNumber, 2],
    //        function (err, result) {
    //            if (err) throw err;
    //
    //            console.log('Changed ' + result.changedRows + ' rows');
    //        }
    //    );
    //}
    //if (req.body.address) {
    //    con.query('UPDATE ChoreoPro.PageAttribute SET AttributeText = ? Where AttributeID = ?',
    //        [req.body.address, 3],
    //        function (err, result) {
    //            if (err) throw err;
    //
    //            console.log('Changed ' + result.changedRows + ' rows');
    //        }
    //    );
    //}
    console.log({"update": "True"});
    res.json({"update": "True"});
});

app.get('/attributesByPage/:id', function(req,res){
    con.query('SELECT * FROM ChoreoPro.PageAttribute WHERE PageID = ?', req.params.id,
        function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
        }
    );

});

app.get('/schedule',function(req,res){

    console.log({"message":"Schedule API was called! That is not the problem"});


// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'choreopromanagement@gmail.com', // sender address
        to: 'violinpatel@gmail.com', // list of receivers
        subject: 'Hello ?', // Subject line
        text: 'Hello world ?', // plaintext body
        html: '<b>Hello world ?</b>' // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
    res.json({"message":"Schedule API was called! That is not the problem"});
});


