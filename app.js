form = document.forms[0];
inputs = document.querySelectorAll(".input");
output = document.querySelector(".output");
contentDiv = document.querySelector(".displayFlex");
cols = document.querySelectorAll(".col");

     

form.addEventListener("submit", checkHandler);


function checkHandler(e){
    e.preventDefault();
    // cols[0].classList.remove("transparentBg");
    // cols[1].classList.remove("transparentBg");

    var request = require('request');
var requestOptions = {
        'url': 'https://api.tiingo.com/api/test?token=d6f8b32a099dd663ee3a1f418285a3928a77399b',
        'headers': {
            'Content-Type': 'application/json'
            }
        };

request(requestOptions,
        function(error, response, body) {
            console.log(body);
        }
);   

    let CP = inputs[0].value;
    let Qty = inputs[1].value;
    let SP = inputs[2].value;

    if( !isNaN(CP) && !isNaN(Qty) && !isNaN(SP)) {
        CP = Number(CP);
        Qty = Number(Qty);
        SP = Number(SP);
        if(CP>0 && Qty>0 && SP>0){
            
            if (CP>SP){
                const loss = ((CP-SP)*Qty).toFixed(2);
                const lossPer = (((CP-SP)*100)/CP).toFixed(2);
                output.innerHTML=  `<div style="background-color: rgb(255, 255,255,0.2); padding: 1rem">You lost ${lossPer}%. Your total loss is ₹${loss}</div>`;

            }

            else{
                const profit = ((SP-CP)*Qty).toFixed(2)
                const profitPer=(((SP-CP)*100)/CP).toFixed(2) ;
                output.innerHTML=  `<div style="background-color: rgb(255, 255,255,0.2); padding: 1rem; color: #d5d5d5" >You gained ${profitPer}%. Your total profit is ₹${profit}</div>`;
            }
        }
        else {
            output.innerHTML="Please enter values greater than 0 (only numbers are allowed in above fields)"
        }
    }
    else{
        output.innerHTML="Please enter values greater than 0 (only numbers are allowed in above fields)"
    }
}