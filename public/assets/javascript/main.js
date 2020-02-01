//var Chart = require("chart.js");

// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");
//var $saveCharityBtn = $("#saveCharity");

// The API object contains methods for each kind of request we'll make
var API = {
  saveCharity: function(ein) {
    return $.post({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/charitySave",
      data: JSON.stringify(ein)
    });
  },
  saveCategory: function(catName) {
    return $.post({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/categorySave",
      data: JSON.stringify(catName)
    });
  },
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  getSavedCharities: function() {
    return $.ajax({
      url: "api/profile/",
      type: "GET"
    });
  }
};

$(document).ready(function() {
  var btn = $("#saveCharity");

  btn.on("click", function() {
    var ein = $(this).attr("data-ein");
    console.log("button pushed for " + ein);
    var ein = {
      charityEin: ein
    };
    API.saveCharity(ein).then(function(data) {
      console.log(data);
    });
  });

  var btn = $("#saveCategory");

  btn.on("click", function() {
    var catName = $(this).attr("data-name");
    var catId = $(this).attr("data-id");
    var category = {
      category: catName,
      CategoryId: catId
    };
    API.saveCategory(category).then(function(data) {
      console.log(data);
    });
  });

  // API.getSavedCharities();
});

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
