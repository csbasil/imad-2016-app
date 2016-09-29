var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleNames={
    'article-one':{
        title:'Article One',
        date:'10 sep, 2016',
        content:'<p>Data for Article One</p>'
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
            <div><a href="/">Home</a></div>
            <hr/>
            <h3>Article One</h3>
            <div>${date}</div>
            <div>
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
    var articleName=req.param.articleName;
   res.send(createTemplate(articleNames[articleName]));
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
