var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret",
               "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat",
               "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

var buttonsDiv = $("<button>");
var gifDisplay;



function init(){
  gifDisplay = $("<div>");
  gifDisplay.attr("id", "gif-display");
  $("#animal-form").prepend(gifDisplay);

  renderButtons();
};

function renderButtons() {
	console.log(animals);
  $("#animalButtons").empty();
  var animalsLength = animals.length;
  for(var i = 0; i < animalsLength; i++){
    var aButton = $("<button>");
    aButton.addClass("gifTopic");
    aButton.addClass("btn");
    aButton.addClass("btn-primary");
    aButton.attr("data-animal", animals[i]);
    aButton.text(animals[i]);
    $("#animalButtons").append(aButton);
  }
}

$(document).on("click", ".gifTopic", fuckAnimal);

function fuckAnimal(){
  console.log("I got here.");
  var animal = $(this).attr("data-animal");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
  $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);
            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);
            $("#animals").prepend(gifDiv);
    }
  });
};

// submit button
$("#addAnimal").on("click", function(){
  event.preventDefault();
  var animal = $("#animal-input").val().trim();
  animals.push(animal);
  renderButtons();
});

// gif button animate
/* $().on("click", function(){
	if(something === "still"){
	  setto = "animated";
	  set("attr", "animated");
	}
	else{
	  setto = "still";
	  set("attr", "still");
	}
}); */

init();

