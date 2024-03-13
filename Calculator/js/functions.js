let str = "";
let operand = "";
let history = [];
var tracker = [];
var calcSymbol = [];
let lastSym = "";
let _f = false;
let ascii = String.fromCharCode(2212);

var enableInput = true;

function put_digit(number) {
    var num_string = number.toString();
    var flag = false;
    var found = false;
    var count = 0;
  
    //negative sign
    if(number === '_') {
        if(str.length == 0) {
            str += '-';
            refreshDisplay();
            return;
        } else if(str[str.length-1] == '+' || str[str.length-1] == '~' ||str[str.length-1] == '/' || str[str.length-1] == '*') {
            str += "-";
            refreshDisplay();
            return;
        } else {
            console.log("other");
            return;
        }

    }

    //check if string already has .
    for(var i = 0; i < str.length; i++) {
        if(str[i] == '.') {
            found = true;
            count++;
        }
    }

    if(count >= 2 && number.toString == '.') {
        console.log(count);
        console.log("duplicate");
        return;
    }

    //if input is another decimal
    if( number == '.')  {
        flag = true;
    }

    
    if(enableInput == false) {
        return;
    } else if( flag == true && found == true) {
        var sym = '';
        var location = 0;
        for(var i = 0; i < str.length; i++) {
            if(str[i] == '+' || str[i] == '/' || str[i] == '*') {
                location = i;
                break;
            }
         
        }
    
       if(location <= str.length-1) {
            str += num_string;
       }
       console.log(location);

       console.log( str.length);
    }

     else if ( str.length == 1 && number == "0" && str[0] == 0) {
       //repeat 0 
    } else if ( str.length == 1 && str[0] == "0") {
        str = ""
        str += num_string;

    } else {
        str += num_string;
    }
    refreshDisplay();
    // console.log("result is ",  str);
}

function add() {
    if (enableInput == false) {
        return;
    }
    if(str.length == 0) {
        //error case
        console.log("Need a number");
    } else if( lastSym == "+" || lastSym == "*" || lastSym == "/" || lastSym == '~') {
        console.log("repeat for,", lastSym);
        equals()
        str += "+";
        lastSym = "+";
        operand = "+"
        refreshDisplay();
        displayHistory();

    }
    else {
        console.log("added");
        operand = "+";
        str += "+";
        lastSym = "+";
       // history.push(str);
        displayHistory();
        refreshDisplay();
    }
}


function multiply() {
    if (enableInput == false) {
        return;
    }
    if(str.length == 0) {
        console.log("Need a number");
        return;
    } else if( lastSym == "+" || lastSym == "*" || lastSym == "/" || lastSym == '~') {
        
        equals()
        str += "*";
        lastSym = "*";
        operand = "*"
        refreshDisplay();
        displayHistory();

    } else{
        lastSym = "*";
        operand = "*"
        str += "*";
        refreshDisplay();
    }
}

function subtract() {
    if (enableInput == false) {
        return;
    }

    if(str.length == 0) {
        console.log("Need a number");
        return;
    } 
    
    if( lastSym == "+" || lastSym == "*" || lastSym == "/" || lastSym == '~') {
        console.log("chain subtract");
        equals();
        str += "~";
        lastSym = "~";
        operand = "~"
        refreshDisplay();
        displayHistory();

    } else{
        lastSym = "~";
        operand = "~"
        str += "~";
        refreshDisplay();
    }

        refreshDisplay();
}

function division() {

    if (enableInput == false) {
        return;
    }
    if(str.length == 0) {
        console.log("Need a number");
        return;
    }

    let i = tracker.length;
    tracker[i] = str;
    if( lastSym == "+" || lastSym == "*" || lastSym == "/" || lastSym == "~") {
        console.log("repeat for,", lastSym);
        equals()
        str += "/";
        lastSym = "/";
        operand = "/"
        refreshDisplay();
        displayHistory();

    }  else {
        operand = "/";
        str += "/";
        lastSym = "/";
        refreshDisplay();
    }
}



//Responsible for the calculation and parsing of provided string
function equals() {
    var parse = str;
    
    if (enableInput == false) {
        return;
    }
    else if( operand == "+") { //addition
        var a = parse.split("+");
        var b = parseFloat(a[0]);
        var c = parseFloat(a[1]);

        if ( isNaN(b+c)) { 
            str = "Error"
            refreshDisplay();
            enableInput = false; 
            return;
        }

        str = b + c;
    } else if( operand == "~" ) {
      
        var a = parse.split("~");
        var b = parseFloat(a[0]);
        var c = parseFloat(a[1]);

        if ( isNaN(b-c)) { 
            str = "Error"
            refreshDisplay();
            enableInput = false; 
            return;
        } else {
            str = b - c;
        }

       
    } else if( operand == "/" ) {
        var a = parse.split("/"); //division
        var b = a[0]
        var c = a[1];
        // divide by zero error
        if (c == 0) { 
            str = "Error"
            refreshDisplay();
            enableInput = false; 
            return;
        } else if( isNaN(b/c) ) { 
            str = "Error"
            refreshDisplay();
            enableInput = false; 
            return;
        }
      
       str = b / c;
    } else if( operand == "*" ) { //multiplication
        var a = parse.split("*");
        var b = parseFloat(a[0]);
        var c = parseFloat(a[1]);

        if ( isNaN(b*c)) { 
            str = "Error"
            refreshDisplay();
            enableInput = false; 
            return;
        }

        str = b * c;
    } else {

            str = "Error"
            refreshDisplay();
            enableInput = false; 
            return;
       
    }
   
    lastSym = "";
    operand = "";
    history.push(str);
    // arr_clear;
    displayHistory();
    refreshDisplay();
    
}

/**
 * Clkears the history box 
 */
function historyClear() {
    history = [];
    console.log("clear history");
    displayHistory();
}

/**
 * Display box clear
 */
function arr_clear() {
    str = "";
    lastSym = "";
    refreshDisplay();
    enableInput = true;
    _f = false;
}

/**
 * Function for updating the display box at the top of the calculator
 */
function refreshDisplay() {
    var myString = str
    var example = document.getElementById('sum')
    example.textContent = str;
}

/**
 * Function for showing the history 
 */
function displayHistory() {
    var historyBox = document.getElementById("historyBox");
    historyBox.innerHTML = ""; // clear the container
    for (var i = 0; i < history.length; i++) {
        var p = document.createElement("p");
        p.textContent = history[i];
        //alternate grey 
        if (i % 2 == 0) {
            p.classList.add('grey-background');
        }

        p.addEventListener('click', function() {
            //after pressing clear -- allow for input to be clickable
            if( str == "" ) { 
                str = this.textContent;
                console.log("clicked: " + this.textContent );
                refreshDisplay();
            } else if( str[str.length-1] == '+' || str[str.length-1] == '-' || str[str.length-1] == '/' || str[str.length-1] == '*') { // if operand was provided
                str += this.textContent;
                console.log("sorry");
                refreshDisplay();
            }
           
        });
        historyBox.appendChild(p);
    }
}
