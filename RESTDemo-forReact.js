var express = require('express');
var app = express();
const bodyParser = require('body-parser');  //parses the body of the request and lets us react to it
const cors = require('cors');   //cross-origin resource sharing

app.use(cors({
    //origin: 'http://localhost:4200/'
    origin: '*'
}));

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let courses = [
           {id:1,name:'Java', desc:'Java course'},
           {id:2,name:'AJAX', desc:'AJAX course'},
		     {id:3,name:'Angular', desc:'Angular course'}];

app.get('/', function(req, res){
   let str = "<h1>Home page </h1>"
   res.send(str);
});

app.get('/course/courses', function(req, res){
   res.send(courses);
});

app.get('/course/courses/:id', function(req, res){
   var course;
   for(c in courses){
	   if(courses[c].id == parseInt(req.params.id)){
		   console.log("found ");
		   course = courses[c];
	   }
   }
   res.send(course);
});

app.post('/course/courses',function(req,res){
      console.log(req.body)
      let obj = req.body
      //obj.id = courses.length+1
      //obj.id = courses[courses.length-1].id+1
      console.log(obj)
		courses.push(obj);
	res.send(obj);
});
	
app.delete('/course/courses/:id', function(req, res){
   var course = {}, index=0;
   for(c in courses){
	   if(courses[index].id == parseInt(req.params.id)){
		   console.log("course found for delete  " + courses[index].toString(), index);
		   course = courses[index];
         break;
	   }
      index++;
   }
   courses.splice(index,1)
   res.send(course)
   //res.send("course with id " + req.params.id + "  deleted");
});


app.put('/course/courses/:id', function(req, res){
   var course = {}, index=0;
   for(c in courses){
	   if(courses[index].id == parseInt(req.params.id)){
		   console.log("course found for update  " + courses[index].toString(), index);
         course = courses[index];
         break;
	   }
      index++;
   }
   course.name=req.body.name
   course.desc = req.body.desc
   res.send(course)
   //res.send("course with id " + req.params.id + "  deleted");
});

app.listen(4000, function(){
   console.log("Server is running")
});