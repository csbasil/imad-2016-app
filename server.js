var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    'article-one':{
        title:'Article One',
        date:'10 sep, 2016',
        content:'<p>This is Data for Article One as a part of the NPTEL online course for Introductio to Modern Application Develompent</p>'
    },
    'article-two':{
        title:'Article Two',
        date:'10 sep, 2016',
        content:'<p>Data for Article Two</p>'
    },
    'article-three':{
        title:'Article Three',
        date:'10 sep, 2016',
        content:'<p>Data for Article Three</p>'
    }
};

function createTemplate(data) {
    var title=data.title;
    var date=data.date;
    var content= data.content;
    var htmlTemplate=`
    <html>
        <head>
             <title>${title}</title>
              <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
        
        <div class="container">
            <div class="header">
                <img src="ui/madi.png" style="width:80px;height:60px;float:left;"/>
            </div>
            <div class="menubar">
                <ul>
                    <li style="color:skyblue;font-weight:bold;">IMAD</li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/article-one">Article One</a></li>
                    <li><a href="/article-two">Article Two</a></li>
                    <li><a href="/article-three">Article Three</a></li>
                </ul>
            </div><br>
            <hr style='color:skyblue;'>
            <h3>${title}</h3>
            <div class="date">${date}</div>
            <div class="content">
                ${content}
            </div>
        </div>
        </body>
    </html>`;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req,res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
