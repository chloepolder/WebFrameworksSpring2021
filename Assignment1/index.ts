var btnSubmit = document.getElementById('submit') as HTMLButtonElement;
var user = document.getElementById('name') as HTMLInputElement;
var review = document.getElementById('review') as HTMLInputElement;
var templateTarget = document.getElementById('target');
var sum = 0;
var quantity = 0;

btnSubmit.addEventListener('click', (event)=>{ //when button is clicked..
    // do this
    var rating = null; //check which star rating is selected
    for(var i=1; i<6; i++){
        var ratingTemp = document.getElementById('rating'+i) as HTMLInputElement;
        if(ratingTemp.checked){
            rating = ratingTemp;
        }
    }
    //populate template with values from inputs
    var template = cloneTemplate('reviewTemplate');
    template.content.getElementById('userName')!.innerText = user.value;
    template.content.getElementById('userRating')!.innerText = rating!.value;
    template.content.getElementById('userReview')!.innerText = review.value;
    templateTarget?.appendChild(template.content);

    function cloneTemplate(templateId:string): HTMLTemplateElement{ //allows multiple entries in same session
        return document.getElementById('reviewTemplate')?.cloneNode(true) as HTMLTemplateElement;
    }

    //to calculate average rating
    quantity++;
    sum = sum + parseInt(rating!.value);
    var average = sum/quantity;
    document.getElementById("average")!.innerHTML = average.toFixed(2).toString();
});
