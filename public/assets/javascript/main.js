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
});
