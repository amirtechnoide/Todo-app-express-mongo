const express = require("express")
const app = express()
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 7000
const todoRoute = require("./routes/todoRoute")
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
var morgan = require('morgan')

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



// create and connect to database
mongoose.connect("mongodb://localhost/todoAssign", {
        useNewUrlParser: true
    }).then(() => console.log("connected to mongoDB"))
    .catch((e) => console.error(e))

// static folder
// app.use(express.static(path.join(__dirname, "/public/")));
app.use(morgan())
    // handlars middlware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, "/public")))


// body-parse
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//method override middleware
app.use(methodOverride('_method'))
    // todo routes
app.use("/todos", todoRoute)


app.get("/", (req, res) => {
    res.render("index")
})

//Delete item

// app.delete('/todos/:id', function(req, res) {
//     console.log("DELETE review")
//     Todo.findByIdAndRemove(req.params.id).then((todo) => {
//         res.redirect('/todos');
//     }).catch((err) => {
//         console.log(err.message);
//     })
// })