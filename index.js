import express from "express";
import bodyParser from "body-parser";
import fs from "fs";


const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//function which will process data read from text file containing blog information in plain text
function processContent(blog_data) {
    var blog_data_title = [];
    var blogs = blog_data.split("\n");
    for (var i = 0; i< blogs.length ; i++ ) {
        var split_data = blogs[i].split(":");
        console.log(split_data);
        blog_data_title.push({
            "title" : split_data[0],
            "author" : split_data[1],
            "date": split_data[2],
            "description": split_data[3],
        });
    };

    return blog_data_title;
}

app.get("/",(req,res) => {
    res.render("index.ejs");
})

app.get("/about",(req,res) => {
    res.render("about_us.ejs");
})
// method to show contactus screen
app.get("/contact",(req,res) => {
    res.render("contact.ejs");
})

// method to  open a create blog screen.

app.get("/create_blog",(req,res) => {
    res.render("create_blog.ejs");
})
// method to delete a blog.
//currently not working 
app.post("/delete",(req,res) => {
    res.render("index.ejs");
})
// method to get all blogs.
app.get("/all_blog",(req,res) => {
    fs.readFile("message.txt", 'utf-8', (err, blog_data) =>{
        if (err) {
            console.error(err);
          } else {
            
            console.log("data read succesfully"+blog_all_data);

            var blog_all_data= processContent(blog_data);
            console.log(blog_all_data);
            res.render("All_blog.ejs",  { items: blog_all_data });
          }
    });
    
});

app.post("/read",(req,res) => {
    console.log("--------------------------------------------------");
    console.log(document);

});
// method to create a blog.
app.post("/create", (req,res) => {
    var blog_title = req.body["title"];
    var blog_desc = req.body["description"];
    var blog_author = req.body["author"];
    var blog_date = req.body["date"];

    var data = blog_title  + ":"+ blog_author +":" + blog_date + ":" + blog_desc + "\n";
    
    fs.appendFile('message.txt', data, (err) =>{
        if (err) {
            console.error(err);
          } else {
            console.log("blog data saved")
          }
    });
    res.redirect("/all_blog");

});
app.listen(port, () =>{
    console.log(`listening on port ${port}`);
});
