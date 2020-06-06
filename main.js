let api="https://api.covid19api.com/total/country/bhutan";
generateData().then(result=>{
    console.log(result);
    let confirmedCase = result.Confirmed;
    let totalRecovered = result.Recovered;
    let activeCase = result.Active;
    let death = result.Deaths;
    let x = document.querySelector(".card-text1");
    let y = document.querySelector(".card-text2");
    let z = document.querySelector(".card-text3");
    let a = document.querySelector(".card-text4");
    x.textContent = confirmedCase;
    x.style.textAlign = "center";
    x.style.fontSize = "5rem";
    y.textContent = totalRecovered;
    y.style.textAlign = "center";
    y.style.fontSize = "5rem";
    z.textContent = activeCase;
    z.style.textAlign = "center";
    z.style.fontSize = "5rem";
    a.textContent = death;
    a.style.textAlign = "center";
    a.style.fontSize = "5rem";

})
async function generateData(){
    let response = await fetch(api);
    let json = await response.json();
    return json[json.length - 1];
}