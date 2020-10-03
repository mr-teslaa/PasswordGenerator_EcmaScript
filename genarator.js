/*** ======================================================
*** A Simple Password Genarator from Hacker TESLA       ***
*** By ECMAScript [ JS ]                                ***
*** Follow of Develop this code on github               ***
*** Github : https://github.com/hacker-tesla            ***
*** Portfolio : http://hpcscienceclub.cf/profile.html   ***
====================================================== ***/ 


/* SELECTING DOM ELEMENT */
const resultEl = document.querySelector('#result');
const lengthEl = document.querySelector('#length');
const uppercaseEl = document.querySelector('#uppercase');
const lowercaseEl = document.querySelector('#lowercase');
const numbersEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');
const genarateEl = document.querySelector('#genarate');
const clipboardEl = document.querySelector('#clipboard');


/* MAKE AN OBJECT TO CALL ALL FUNCTIONS */
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
} 


/* GENARATE EVENT LISTENER */
genarateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const lower = lowercaseEl.checked;
    const upper = uppercaseEl.checked;
    const number = numbersEl.checked;
    const symbol = symbolsEl.checked;

    resultEl.innerText = genaratePassword(
        lower,
        upper,
        number,
        symbol,
        length
    );

});



/* GENARATE PASSWORD FUNCTION */
function genaratePassword(lower, upper, number, symbol, length){
    //1. Initialize password variable
    //2. Filter out unchecked types
    //3. Loopover length. Call genarator function for each types
    //4. Add final password to the password variable and return

    let genaratedPassword = '';
    
    const typesCount = lower + upper + number + symbol ; 
    console.log('typeCount:  ', typesCount ) ;

    const typesArr = [
        {   lower   },
        {   upper   },
        {   number  },
        {   symbol  }
    ].filter( item => Object.values(item)[0] );

    console.log('typesArr: ', typesArr ) ;

    if (typesCount === 0){
        return  '' ; 
    }

    for ( let i = 0; i < length; i += typesCount ){
        typesArr.forEach( type => {
            const funcName = Object.keys(type)[0] ;
            console.log('funcNmae: ', funcName ) ;
            genaratedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = genaratedPassword.slice(0, length) ;
    
    return finalPassword;
}




//Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea') ;
    const password = resultEl.innerText;

    if (!password){
        return '' ;
    }

    textarea.value = password;
    document.body.appendChild(textarea) ; 
    textarea.select() ;
    document.execCommand('copy') ;
    textarea.remove();
    
    //Make an alert when password is copied
    alert('Password copied to clipboard') ;

});




//Genarate Lower Function
function getRandomLower(){
    return String.fromCharCode(
        Math.floor(Math.random()*26) + 97
    );
}




//Genarate Upper Function
function getRandomUpper(){
    return String.fromCharCode(
        Math.floor(Math.random()*26) + 65
    );
}




//Genarate Number Function
function getRandomNumber(){
    return String.fromCharCode(
        Math.floor(Math.random()*26) + 48
    );
}



//Genarate Symbole Function
function getRandomSymbol(){
   const symbols = '!@#$%^&*(){}[]=<>/,.';
   return symbols[Math.floor(Math.random()*symbols.length)];
}