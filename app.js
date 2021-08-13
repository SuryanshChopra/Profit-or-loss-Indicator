
var token = config.TOKEN;


form = document.forms[0];
input0 = document.querySelector("#input0");
input1 = document.querySelector("#input1");
input2 = document.querySelector("#input2");
input3 = document.querySelector("#input3");

output = document.querySelector(".output");
output0 = document.querySelector(".output0");
contentDiv = document.querySelector(".displayFlex");
cols = document.querySelectorAll(".col");



var serverURL = "https://cors-anywhere.herokuapp.com/https://api.tiingo.com/tiingo/daily/"

function getTranslationURL(text){
    return serverURL + text +"/prices"
    
}

var SP = 0;

form.addEventListener("submit", checkHandler);


function checkHandler(e){
    e.preventDefault();
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("User-Agent", "Mozilla/5.0");
   
    let inputText = input0.value;


    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(getTranslationURL(inputText), requestOptions)
    .then(response => response.json())
    .then(json => {
        
        var translatedText = json[0].adjClose;
        SP = translatedText;
        
        
        output0.innerHTML=  `<div style="background-color: rgb(255, 255,255,0.2); padding: 1rem">Current price for this stock is: ${SP}</div>`;

    let CP = input1.value;
    let Qty = input2.value;
    
    if( !isNaN(CP) && !isNaN(Qty) && !isNaN(SP)) {
        CP = Number(CP);
        Qty = Number(Qty);
        SP = Number(SP);
        
        if(CP>0 && Qty>0 && SP>0){
            
            if (CP>SP){
                const loss = ((CP-SP)*Qty).toFixed(2);
                const lossPer = (((CP-SP)*100)/CP).toFixed(2);
                output.innerHTML=  `<div style="background-color: rgb(255, 255,255,0.2); padding: 1rem">You lost ${lossPer}%. Your total loss is $${loss}</div>`;

            }

            else{
                const profit = ((SP-CP)*Qty).toFixed(2)
                const profitPer=(((SP-CP)*100)/CP).toFixed(2) ;
                output.innerHTML=  `<div style="background-color: rgb(255, 255,255,0.2); padding: 1rem;" >You gained ${profitPer}%. Your total profit is $${profit}</div>`;
            }
        }
        else {
            output.innerHTML="Please enter values greater than 0 (only numbers are allowed in above fields"
        }
    }
    else{
        output.innerHTML="Please enter values greater than 0 (only numbers are allowed in above fields"
    }

        })
      
        
    
    
    .catch(error => console.log('error', error));
    }
