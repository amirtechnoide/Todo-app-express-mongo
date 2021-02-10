const express = require('express');

const router = express.Router();

const Todo = require("../models/Todo")


router.get("/", (req, res) => {
    Todo.find().lean().then((todos) => {
        // console.log(todos);
        res.render("all-todos", {
            todos

        })
    })


})


router.get("/add", (req, res) => {
    res.render("addTodos")
})

//Edit TOOD
router.get("/edit/:id", (req, res) => {
    Todo.findOne({ _id: req.params.id })
        .lean()
        .then((todo) => {
            console.log(todo);
            res.render('edit', {
                todo,
            })
        })
        .catch(err => console.error(err))
    console.log(req.params.id, 'I am from the get :/id route');
});
//UPDATE todo
router.put('/:id', (req, res) => {
    Todo.findOne({
        _id: req.params.id,
    }).then((todo) => {
        // new values
        todo.title = req.body.title;
        todo.description = req.body.description;

        todo
            .save()
            .then((todo) => {
                res.redirect("/todos");
            })
            .catch((err) => console.log(err));
    });
});

router.post("/", (req, res) => {
    // console.log(req.body);

    const newTodo = {

        title: req.body.title,
        description: req.body.description
    }

    new Todo(newTodo).save().then(() => res.redirect("/todos"))

    // res.redirect("/todos")
});
router.delete("/:id", (req, res) => {
    Todo.findByIdAndDelete({
            _id: req.params.id
        }).then(() =>
            res.redirect("/todos"))
        .catch((err) => console.log(err));
});

/* READ, UPDATE, DELETE users */




module.exports = router