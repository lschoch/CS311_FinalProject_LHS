var type = ''; // The type of conversion selected by the user.
var places = 0; // Accuracy of the output.

addValueInFocusEvents();
addConvertBtnClickEvents();
addRadioBtnClickEvents();

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

function addRadioBtnClickEvents() {
    const button = document.querySelectorAll('button');
    buttons.addEventListener('click', () => {
        clearValToBeConverted();
    });
}

// Reset result for the next conversion when value box gets focus.
function clearResult() {
    document.querySelector('#result').innerHTML = '______________';
}

// Reset valueToBeConverted on button click.
function clearValToBeConverted() {
    console.log('clear val to be converted')
    document.querySelector('#value-in').value = '';
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
            converted = toBeConverted*3.28084; // 6 significant digits.
            places = getSignificantDigitCount(toBeConverted);
            if (places > 6) 
                places = 6; // Precison of conversion cannot exceed 6;
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} meters = ${converted} feet`;
            break;
        
        case "ft-m":
            converted = toBeConverted/3.28084; // 6 significant digits.
            places = getSignificantDigitCount(toBeConverted);
            if (places > 6) 
                places = 6; // Precison of conversion cannot exceed 6;
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} feet = ${converted} meters`;
            break;

        case "km-mi":
            console.log('sigdig = ' + getSignificantDigitCount(toBeConverted));
            converted = toBeConverted*0.621371; // Precision of 6.
            places = getSignificantDigitCount(toBeConverted);
            if (places > 6) 
                places = 6; // Precison of conversion cannot exceed 6;
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} kilometers = ${converted} miles`;
            break;

        case "mi-km":
            converted = toBeConverted/0.621371; // Precision of 6.
            places = getSignificantDigitCount(toBeConverted);
            if (places > 6) 
                places = 6; // Precison of conversion cannot exceed 6;
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} miles = ${converted} kilometers`;
            break;

        case "C-F":
            converted = 9*toBeConverted/5+32; // By definition, precision unlimited.
            places = getSignificantDigitCount(toBeConverted); /* Precision depends on 
                that of the value to be converted. */
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} Centigrade = ${converted} Farenheit`;
            break;

        case "F-C":
            converted = 5*(toBeConverted-32)/9; // By definition, precision unlimited.
            places = getSignificantDigitCount(toBeConverted); /* Precision depends on 
                that of the value to be converted. */
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} Farenheit = ${converted} Centigrade`;
            break;

        case "kg-lb":
            converted = toBeConverted*2.2046226218; // Precision of 11.
            places = getSignificantDigitCount(toBeConverted);
            if (places > 11) 
                places = 11; // Precison of conversion cannot exceed 11;
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} kilograms = ${converted} pounds`;
            break;

        case "lb-kg":
            converted = toBeConverted/2.2046226218; // Precision of 11.
            places = getSignificantDigitCount(toBeConverted);
            if (places > 11) 
                places = 11; // Precison of conversion cannot exceed 11.
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} pounds = ${converted} kilograms`;
            break;

        case "gm-oz":
            converted = toBeConverted*0.0352739619; // Precision of 10.
            places = getSignificantDigitCount(toBeConverted);
            if (places > 10) 
                places = 10; // Precison of conversion cannot exceed 10;
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} grams = ${converted} ounces`;
            break;

        case "oz-gm":
            converted = toBeConverted/0.0352739619; // Precision of 10.
            places = getSignificantDigitCount(toBeConverted);
            if (places > 10) 
                places = 10; // Precison of conversion cannot exceed 10;
            console.log('places = ' + places);
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} ounces = ${converted} grams`;
            break;
    
        default:
            console.log('switch default - conversion type');
            break;
    }
}

/* Determine the precision of the value to be converted. The precision of the 
    result will be the precision of the value to be converted or the precision 
    of the conversion factor, whichever is less. Much assistance here from the 
    Internet. */
function getSignificantDigitCount(n) {
    let log10 = Math.log(10);
    let count = 0;
    let decIndex = -2; // Index of decimal point starts at -2.
    let str = String(n);
    let len = str.length;
    if (str === '0' || str === '0.')
        return 1; 
    // Determine index of decimal point.
    for (let i=0; i<len; i++) {
        if (str[i] == '.')
            if (i == len - 1)
                decIndex = -1 // Decimal point is last character.
            else
                decIndex = i;
    }

    // Remove decimal and make positive
    n = Math.abs(String(n).replace(".", "")); 
    if (n == 0) return 0;
    switch (decIndex) {
        case 0 || -1: /* Decimal point is  first character or last character.
            Count remaining digits, ignore leading zeroes. */
            /* while (n != 0 && n % 10 == 0) n /= 10; //kill the 0s at the end of n */
            count = Math.floor(Math.log(n) / log10) + 1; //get number of digits
            return count;
        
        case -2: /* No decimal point. Count digits ignoring leading and trailing
            zeroes. */
            n = Math.abs(String(n).replace(".", "")); //remove decimal and make positive
            if (n == 0) return 0;
            while (n != 0 && n % 10 == 0) n /= 10; //kill the 0s at the end of n
            count = Math.floor(Math.log(n) / log10) + 1; //get number of digits
            return count;

        default: /* Decimal point present but not first or last character. Don't 
            ignore trailing zeroes; i.e., right of decimal point. */
            n = Math.abs(String(n).replace(".", "")); //remove decimal and make positive
            if (n == 0) return 0;
            count = Math.floor(Math.log(n) / log10) + 1; //get number of digits
            return count;
    }
}