var countries = [ "Afghanistan", "Albania", "Algeria", "American Samoa", "Angola", "Anguilla", "Antigua", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire (Netherlands Antilles)", "Bosnia Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic of", "Cook Islands", "Costa Rica", "Croatia", "Curacao (Netherlands Antilles)", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland (Republic of)", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kosrae Island", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Macau", "Macedonia (FYROM)", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Ponape", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Rota", "Russia", "Rwanda", "Saba (Netherlands Antilles)", "Saipan", "Samoa", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "South Africa", "South Korea", "Spain", "Sri Lanka", "St. Barthelemy", "St. Croix", "St. Eustatius (Netherlands Antilles)", "St. John", "St. Kitts and Nevis", "St. Lucia", "St. Maarten (Netherlands Antilles)", "St. Thomas", "St. Vincent and the Grenadines", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tinian", "Togo", "Tonga", "Tortola", "Trinidad and Tobago", "Truk", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos", "Tuvalu", "US Virgin Islands", "Uganda", "Ukraine", "Union Island", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Gorda", "Wallis and Futuna", "Yap", "Yemen", "Zambia", "Zimbabwe" ];
var input = document.getElementById('input');
var resultscontainer = document.getElementById('resultscontainer');
var results = document.getElementsByClassName('results');
var activeResult = document.getElementsByClassName('activeresult');
var r0 = document.getElementById('r0');
var r1 = document.getElementById('r1');
var r2 = document.getElementById('r2');
var r3 = document.getElementById('r3');

var firstFourCountires;
var active = -1;

//we want to get to the input field as soon as we load the page

window.addEventListener("load", function() {
    input.focus();
});

//we define the function that shows the results of the autocomplete

function showResults(firstFourCountires) {
    if (firstFourCountires[0] != undefined) {
        r0.style.display = "block";
        r0.innerHTML = firstFourCountires[0];
        r0.classList.remove("greytext");
    }  else {
        r0.innerHTML = "No results";
        r0.classList.add("greytext");
    }
    if (firstFourCountires[1] != undefined) {
        r1.style.display = "block";
        r1.innerHTML = firstFourCountires[1];
    }  else {
        r1.innerHTML = "";
        r1.style.display = "none";
    }
    if (firstFourCountires[2] != undefined) {
        r2.style.display = "block";
        r2.innerHTML = firstFourCountires[2];
    } else {
        r2.innerHTML = "";
        r2.style.display = "none";
    }
    if (firstFourCountires[3] != undefined) {
        r3.style.display = "block";
        r3.innerHTML = firstFourCountires[3];
    } else {
        r3.innerHTML = "";
        r3.style.display = "none";
    }
}

//this is basically the autocomplete function

function autocomplete() {
    var valueRaw = input.value;
    if (valueRaw) {
        var value = valueRaw[0].toUpperCase() + valueRaw.substring(1);
    }
    if (!valueRaw) {
        r0.style.display = "none";
    }
    var matchingCountries = [];
    var firstFourCountires = [];
    for (var i=0; i < countries.length; i++) {
        if (countries[i].startsWith(value)) {
            matchingCountries.push(countries[i]);
        }
    }
    firstFourCountires = matchingCountries.slice(0, 4);
    showResults(firstFourCountires);
    return firstFourCountires;
}

//this trigger the autocomplete function

input.addEventListener('input', autocomplete);

//this defines the behaviour when we re-focus on the form

input.addEventListener("focus", autocomplete);

//this defines the behaviour when we press the arrows up and down

input.addEventListener("keydown", function() {
    for (var i=0; i < results.length; i++) {
        results[i].classList.remove("activeresult");
    }
    var keypressed = event.keyCode;
    if (keypressed == 38) {
        if (active > -1) {
            active = active -1;
        }
    } else if (keypressed == 40) {
        if (active < 3) {
            active = active +1;
        }
    }
    results[active] && results[active].classList.toggle("activeresult");
});

//this defines the behaviour when we hover with the mouse

resultscontainer.addEventListener("mouseover", function(e) {
    for (var i=0; i < results.length; i++) {
        results[i].classList.remove("activeresult");
    }
    e.target && e.target.classList.toggle("activeresult");
});

//this defines the behaviour when we click on one of the results

resultscontainer.addEventListener("click", function() {
    input.value = activeResult[0].innerHTML;
    for (var i=0; i < results.length; i++) {
        results[i].style.display = "none";
    }
});

//this defines the behaviour when we press "enter" having preselected a div

input.addEventListener("keydown", function() {
    var keypressed = event.keyCode;
    if (keypressed == 13) {
        input.value = activeResult[0].innerHTML;
        for (var i=0; i < results.length; i++) {
            results[i].style.display = "none";
        }
    }
});

//this defines the behaviour when we click outside the form

window.addEventListener("click", function() {
    if (!event.target.closest('#container')) {
        for (var i=0; i < results.length; i++) {
            results[i].style.display = "none";
        }
    } else {
        return;
    }
});
