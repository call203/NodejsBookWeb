//index.js
var express = require('express'); // 설치한 express module을 불러와서 변수(express)에 담습니다.
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express(); //express를 실행하여 app object를 초기화 합니다.

//DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

db.once('open', function(){
  console.log('DB connected');
});

db.on('error',function(err){
  console.log('DB ERROR : ', err)
});

//Other settings
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json()); //json형식의 데이터를 받음
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//Routes
app.use("/",require('./routes/home'));
app.use('/contacts',require('./routes/contacts'));





app.get('/', function(req, res) { // '/' 위치에 'get'요청을 받는 경우,
  res.send('Hello World!'); // "Hello World!"를 보냅니다.
});

var port = 3000; // 사용할 포트 번호를 port 변수에 넣습니다.
app.listen(port, function(){ // port변수를 이용하여 3000번 포트에 node.js 서버를 연결합니다.
  console.log('server on! http://localhost:'+port); //서버가 실행되면 콘솔창에 표시될 메세지입니다.
});
