// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
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
  getCategories: function() {
    return $.ajax({
      url: "api/categories",
      type: "GET"
    });
  },
  getCharitiesByCat: function(categoryID) {
    return $.ajax({
      url: "/api/organizations/" + categoryID,
      type: "GET"
    });
  }
};

// function that returns all available categories that are in Charity Navigator and puts them in buttons
// TO DO: this currently just loads buttons on document start - need to decide WHEN to load buttons and WHERE
// to load them
$(document).ready(function() {
  API.getCategories().then(function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var $catButton = $("<button>")
        .addClass("btn btn-light category-btn")
        .text(data[i].name)
        .attr("id", data[i].id);
      $("#home").append($catButton);
    }
  });
});

$(document).on("click", ".category-btn", populateCharityCards);

function populateCharityCards() {
  var categoryID = $(this).attr("id");

  API.getCharitiesByCat(categoryID).then(function(data) {
    console.log(data);
    for (var i = 0; i < 10; i++) {
      var charityDiv = $("<div>").addClass("card");

      var charityCard = $("<div>").addClass("card-body");

      var charityLink = $("<a>")
        .addClass("card-link")
        .attr("href", data[i].charityURL)
        .text("Website");

      var charityNavLink = $("<a>")
        .addClass("card-link")
        .attr("href", data[i].charityNavigatorURL)
        .text("Charity Navigator");

      var saveMe = $("<a>")
        .addClass("btn btn-primary")
        .attr("href", "#")
        .attr("id", data[i].ein)
        .text("Follow this Charity");

      var title = $("<h5>")
        .addClass("card-title")
        .text(data[i].name);

      var tagline = $("<p>")
        .addClass("card-text")
        .text(data[i].tagLine);

      var rating = $("<p>")
        .addClass("card-text")
        .text("Current Rating: ");

      var ratingImg = $("<img>").attr("src", data[i].currentRatingImg);

      charityCard.append(title);
      charityCard.append(tagline);
      rating.append(ratingImg);
      charityCard.append(rating);
      charityCard.append(charityLink);
      charityCard.append(charityNavLink);
      charityCard.append(saveMe);
      charityDiv.append(charityCard);
      $("#home").append(charityDiv);
    }
  });
}

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
