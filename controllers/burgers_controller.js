var express = require("express");
var router = express.Router();

// Import the model (cat.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
 
    db.burgers.findAll({}).then(function(data){

      var hbsObject = {
        burgers: data
      };
      console.log("object from Database:")
      console.log(hbsObject);
      res.render("index", hbsObject);
    });

});


router.post("/", function(req, res) {
  
  db.burgers.create({
    burger_name: req.body.burger_name

  }).then(function(){
    res.redirect("/");
  })

});


router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  console.log("true: " + req.body.devoured)

  
  db.burgers.update({
      devoured:req.body.devoured
    }, {
      where: {
        id:req.params.id
      }
  }).then(function(){
     res.redirect("/");
  })
});

// DELETE ENTRY
  router.delete("/:id", function(req, res) {
    db.burgers.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function() {
      res.redirect("/");
    });
  });

// Export routes for server.js to use.
module.exports = router;