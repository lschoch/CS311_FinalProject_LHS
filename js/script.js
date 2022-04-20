var type = ''; // The type of conversion selected by the user.
var places = 0; // Accuracy of the output.

addValueInFocusEvents();
addConvertBtnClickEvents();

function addValueInFocusEvents() {
    document.querySelector('#value-in').addEventListener('focus', () => {
            clearResult();
    });
}

function addConvertBtnClickEvents() {
    document.querySelector('#convert-btn').addEventListener('click', () => {
        convert();
    });
}

// Reset result for the next conversion when value box gets focus.
function clearResult() {
    document.querySelector('#result').innerHTML = '______________';
}

// Main conversion engine.
function convert() {
    const toBeConverted = document.querySelector('#value-in').value;
    const result = document.querySelector('#result');
    const buttons = document.querySelectorAll('input[name="conv-type"]');
    var converted = 0;
    // Get value of the checked button.
    for (const button of buttons) {
        if (button.checked) {
            type = button.value;
            break;
        }
    }


    if (type === '') {
        alert("Please select a conversion type.");
        return;
    }
    
    if (isNaN(toBeConverted) || toBeConverted === '') {
        alert("Value to be converted must be a number.");
        return;
    }

    switch (type) {
        case "m-ft":
            converted = toBeConverted*3.28084;
            places = decCount(toBeConverted);
            if (places > 5) // This conversion is accurate to 5 places.
                places = 5;
            converted = decFormat(converted, places);
            result.innerHTML = `${toBeConverted} meters = ${converted} feet`;
            break;
        
        case "ft-m":
            converted = toBeConverted/3.28084;
            places = decCount(toBeConverted);
            if (places > 5) // This conversion is accurate to 5 places.
                places = 5;
            converted = decFormat(converted, places);
            result.innerHTML = `${toBeConverted} feet = ${converted} meters`;
            break;

        case "km-mi":
            converted = toBeConverted*0.621371;
            places = decCount(toBeConverted);
            if (places > 6) // This conversion is accurate to 6 places.
                places = 6;
            converted = decFormat(converted, places);
            result.innerHTML = `${toBeConverted} kilometers = ${converted} miles`;
            break;

        case "mi-km":
            converted = toBeConverted/0.621371;
            places = decCount(toBeConverted);
            if (places > 6) // This conversion is accurate to 6 places.
                places = 6;
            converted = decFormat(converted, places);
            result.innerHTML = `${toBeConverted} miles = ${converted} kilometers`;
            break;

        case "C-F":
            converted = 9*toBeConverted/5+32;
            places = decCount(toBeConverted); // Theoretically no limit to accuracy.
            converted = decFormat(converted, places);
            result.innerHTML = `${toBeConverted} Centigrade = ${converted} Farenheit`;
            break;

        case "F-C":
            converted = 5*(toBeConverted-32)/9;
            places = decCount(toBeConverted); // Theoretically no limit to accuracy.
            converted = decFormat(converted, places);
            result.innerHTML = `${toBeConverted} Farenheit = ${converted} Centigrade`;
            break;

        case "kg-lb":
            converted = toBeConverted*2.2046226218;
            places = decCount(toBeConverted);
            if (places > 10) // This conversion is accurate to 10 places.
                places = 10;
            converted = decFormat(converted, places);
            result.innerHTML = `${toBeConverted} kilograms = ${converted} pounds`;
            break;

        case "lb-kg":
            converted = toBeConverted/2.2046226218;
            places = decCount(toBeConverted);
            if (places > 10) // This conversion is accurate to 10 places.
                places = 10;
            converted = decFormat(converted, places);
            result.innerHTML = `${toBeConverted} pounds = ${converted} kilograms`;
            break;

        case "gm-oz":
            converted = toBeConverted*0.0352739619;
            places = decCount(toBeConverted);
            if (places > 10) // This conversion is accurate to 10 places.
                places = 10;
            converted = decFormat(converted, places);
            result.innerHTML = `${toBeConverted} grams = ${converted} ounces`;
            break;

        case "oz-gm":
            converted = toBeConverted/0.0352739619;
            places = decCount(toBeConverted);
            if (places > 10) // This conversion is accurate to 10 places.
                places = 10;
            converted = decFormat(converted, places);
            result.innerHTML = `${toBeConverted} ounces = ${converted} grams`;
            break;
    
        default:
            console.log('switch default');
            break;
    }
}

/* To ouput the same number of decimal places as provided in the value to
be converted up to the limit of accuracy of the conversion. 'Num' is the 
number to be formatted, 'places' is the number of decimal places. */
function decFormat(num, places) {
    return (Math.round(num*100)/100).toFixed(places);
}

/* To count the number of decimals in the value to be converted so that 
converted value will have the same accuracy up to the limit of the conversion
accuracy. This function was copied from the Internet but it is easy to understand. */
function decCount(num) {
    // Convert to String
    const numStr = String(num);
    // String Contains Decimal
    if (numStr.includes('.')) {
       return numStr.split('.')[1].length;
    };
    // String Does Not Contain Decimal
    return 0;
 }
