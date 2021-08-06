form = document.forms[0];
input1 = document.querySelector("#input1");
input2 = document.querySelector("#input2");
input3 = document.querySelector("#input3");

output = document.querySelector(".output");
contentDiv = document.querySelector(".displayFlex");
cols = document.querySelectorAll(".col");


// var serverURL = "https://api.tiingo.com/tiingo/daily/"

// function getTranslationURL(text){
//     return serverURL + text +"/prices"
// }


form.addEventListener("submit", checkHandler);


function checkHandler(e){
    e.preventDefault();
    // cols[0].classList.remove("transparentBg");
    // cols[1].classList.remove("transparentBg");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Token d6f8b32a099dd663ee3a1f418285a3928a77399b");
    myHeaders.append("Cookie", "sessionid=5xfxsp6puxg09u3er56b4o5t5mlzdhxs");
    myHeaders.append("User-Agent", "Mozilla/5.0");
    myHeaders.append("Access-Control-Allow-Origin", "null");



    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    // fetch(getTranslationURL(CP), requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));


    fetch("https://api.tiingo.com/tiingo/daily/AAPL/prices", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    

    let CP = input1.value;
    let Qty = input2.value;
    let SP = input3.value;

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
                output.innerHTML=  `<div style="background-color: rgb(255, 255,255,0.2); padding: 1rem;" >You gained ${profitPer}%. Your total profit is ₹${profit}</div>`;
            }
        }
        else {
            output.innerHTML="Please enter values greater than 0 (only numbers are allowed in above fields"
        }
    }
    else{
        output.innerHTML="Please enter values greater than 0 (only numbers are allowed in above fields"
    }
}