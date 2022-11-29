//creating HTML elements using DOM
const division = document.createElement('div')
division.classList.add("container")
division.innerHTML = `<div class="navbar-fluid heading-color">
<h1 class=" text-center">
    Get Nationality By Names
</h1>
</div>
<div class="d-flex flex-wrap justify-content-between" >
<div class="shadow-box content-section col-12 col-sm-7" >
    <div class="section" id="inp">
    <label for="input" class="text-white p-3"><h4>Enter any Name to find Nationality of the person</h4></label><br>
        <input type="text" class="text-h" id="input" placeholder="Enter any name"><br>
        <button type="button" value="submit" id="bttn" class="submitbtn" onclick="getNation()">SUBMIT</button>
    </div>
    <div id="text " class="textcolor text-center text-sm-left">
        <h5 id="country1" class="p-3"></h5>
        <h5 id="country2" class="p-3"></h5>
    </div>
</div>
<div class="col-12 col-sm-5 mt-3 m-sm-0 text-center text-sm-left">
    <h5 class="text-white mt-5">Nationality is a legal identification of a person in international law, establishing the person as a subject, a national, of a sovereign state. It affords the state jurisdiction over the person and affords the person the protection of the state against other states</h5>
    <img class="image-section mb-5" src="http://englishstudypage.com/wp-content/uploads/2017/03/Countries-Nationalities-Languages-English.png" alt="">
</div> 
</div>`
document.body.append(division)

//getting HTML elements using DOM
const country1El = document.getElementById('country1')
const country2El = document.getElementById('country2')
let nameEl = '';

//fetching Nationalize API using Async await fetch method
async function getNation() {
    //Using try catch method to find errors 
    try {
        nameEl = document.getElementById('input').value
        console.log(nameEl);
        let url = await fetch(`https://api.nationalize.io?name=${nameEl}`)
        let res = await url.json();
        console.log(res);

        //iterating the response to get Top two country_Id and probability of name presence
        //passing the country name as parameter to getCountry function      
        for (let i = 0; i < res.country.length - 3; i++) {
            getCountry(res.country[i].country_id, res.country[i].probability)
        }
        result.length = 0;
        probability.length = 0;

        inputSection();
    }
    catch (err) {
        console.log(err)
    }
}

let result = [];
let probability = [];

//Fetching rest-countries API to get the name of the country  
async function getCountry(data, prob) {

    let countryNames = await fetch("https://restcountries.com/v3.1/all")
    let response = await countryNames.json();

    //storing rest-countries country id in an variable (resulting a array of country_Id's)
    let arr = response.map((response) => {
        return response.cca2
    })
    //pushing probability value to an array to get 2 probality value
    probability.push(prob)

    //comparing the parameter with restcountries country_Id's and getting the exact country name 
    for (let i = 0; i < arr.length; i++) {
        if (data == arr[i]) {
            console.log(response[i].name.common);
            result.push(response[i].name.common)
        }
    }

    console.log(result);
    console.log(probability);
    //displaying the country name and the probability of name presence
    country1El.innerHTML = `The person Name <mark>${nameEl}</mark> is from ${result[0].toUpperCase()} with the Probability of ${probability[0]}`;
    country2El.innerHTML = `Or from ${result[1].toUpperCase()} with the Probability of ${probability[1]}`;

}
//alert section for valid input 
function inputSection() {
    if (nameEl.includes(" ")) {
        alert("Enter name without space or firstname only")
    }
    else if (!isNaN(nameEl)) {
        alert("Enter valid Name")
    }

}