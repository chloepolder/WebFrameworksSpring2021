"use strict";
var btnSubmit = document.getElementById('submit');
var user = document.getElementById('name');
var review = document.getElementById('review');
var templateTarget = document.getElementById('target');
var sum = 0;
var quantity = 0;
btnSubmit.addEventListener('click', (event) => {
    // do this
    var rating = null; //check which star rating is selected
    for (var i = 1; i < 6; i++) {
        var ratingTemp = document.getElementById('rating' + i);
        if (ratingTemp.checked) {
            rating = ratingTemp;
        }
    }
    //populate template with values from inputs
    var template = cloneTemplate('reviewTemplate');
    template.content.getElementById('userName').innerText = user.value;
    template.content.getElementById('userRating').innerText = rating.value;
    template.content.getElementById('userReview').innerText = review.value;
    templateTarget?.appendChild(template.content);
    function cloneTemplate(templateId) {
        return document.getElementById('reviewTemplate')?.cloneNode(true);
    }
    //to calculate average rating
    quantity++;
    sum = sum + parseInt(rating.value);
    var average = sum / quantity;
    document.getElementById("average").innerHTML = average.toFixed(2).toString();
});
//# sourceMappingURL=index.js.map