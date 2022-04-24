var type = ''; // The type of conversion selected by the user.
var places = 0; // Accuracy of the output.

addValueInFocusEvents();
addConvertBtnClickEvents();
addRadioBtnChangeEvents();

function addValueInFocusEvents() {
    document.querySelector('#value-in').addEventListener('focus', () => {
            clearResult();
            clearValToBeConverted();
    });
}

function addConvertBtnClickEvents() {
    document.querySelector('#convert-btn').addEventListener('click', () => {
        convert();
    });
}

function addRadioBtnChangeEvents() {
    const radios = document.querySelectorAll('[name="conv-type"]');
    for (const radio of radios)
        radio.addEventListener('change', () => {
            clearResult();
            clearValToBeConverted();
        });
}

// Reset result for the next conversion when value box gets focus.
function clearResult() {
    document.querySelector('#result').innerHTML = '______________';
}

// Reset valueToBeConverted on button click.
function clearValToBeConverted() {
    document.querySelector('#value-in').value = '';
    document.querySelector('#value-in').focus();
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
            if (toBeConverted == 0)
                places = fcPlaces(toBeConverted);
            converted = Number(converted).toPrecision(places);
            result.innerHTML = `${toBeConverted} Centigrade = ${converted} Farenheit`;
            break;

        case "F-C":
            converted = 5*(toBeConverted-32)/9; // By definition, precision unlimited.
            places = getSignificantDigitCount(toBeConverted); /* Precision depends on 
                that of the value to be converted. */
            if (toBeConverted == 0)
            places = fcPlaces(toBeConverted);
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
    let count = 0;
    let decIndex = -2;
    let str = String(n);
    let len = str.length;

    console.log('*******************');
    console.log(`original str: ${str}`);
    if (n == 0) {
        console.log('n = 0 - one sig figure');
        console.log('(special handling for F-C and C-F)')
        return 1; 
    }

    // Remove minus sign, if present
    str = str.replace('-','');
    console.log(`remove minus, if present: ${str}`);
    str = removeLeadingZeroes(str);
    console.log(`removeLeadingZeroes: ${str}`);

    len = str.length;
    // Determine index of decimal point.
    for (let i=0; i<len; i++) {
        if (str[i] == '.')
            // Set decIndex to -1 when decimal is last character.
            if (i == len - 1)
                decIndex = -1 
            // Otherwise set decIndex to i.
            else
                decIndex = i;
                // decIndex will be 0 when decimal is first character. 
    }
    console.log(`decIndex: ${decIndex}`);

    // Remove decimal point.
    str = str.replace(".", ""); 
    console.log(`remove decimal, if present: ${str}`);

    switch (decIndex) {
        case 0: /* Decimal point was the first character. Must remove leading 
            zeroes again and count remaining digits. */
            str = removeLeadingZeroes(str);
            console.log(`Decimal was first char, remove leading zeroes again: ${str}`);
            count = str.length;
            return count;

        case -1: // Decimal point was last character - count remaining digits.
            count = str.length;
            return count;

        case -2: /* No decimal point. Remove trailing zeroes and count remaining 
            digits. */
            n = Number(str);
            while (n != 0 && n % 10 == 0) n /= 10;
            count = String(n).length;
            return count;

        default: /* Decimal point was neither first or last character. Remove 
            leading zeroes againc(for the case when decimal point was the first 
            character) and count remaining digits. */
            str = removeLeadingZeroes(str);
            count = str.length;
            return count;
    }
}

function removeLeadingZeroes(x) {
    // Find index of first non-zero character.
    let leadingZeroIndex;
    let str = String(x);
    let len = str.length;

    for (i=0; i< len; i++) {
        if (str[i] != '0') { /* Stops at first non-zero character including the
            decimal point. */
           leadingZeroIndex = i;
           break;
        }
    }
    // Remove leading zeroes.
    /* for (i=leadingZeroIndex-1; i>=0; i--)  */
        str = str.substring(leadingZeroIndex);
    return str;
}

function fcPlaces(x) {
    let str = String(x);
    str = str.replace('-','');
    str = removeLeadingZeroes(str);
    str = str.replace('.', '');
    return str.length;
}