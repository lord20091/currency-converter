const url =
    "https://currency-converter-pro1.p.rapidapi.com/latest-rates?base=USD";
const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": "3a85454212mshfe09c9b1b69ab49p1aa3e3jsn784737adc563",
        "x-rapidapi-host": "currency-converter-pro1.p.rapidapi.com",
    },
};

let api = `https://currency-converter-pro1.p.rapidapi.com/convert`;

let selectFrom = document.getElementById('selectFrom')
let selectTo = document.getElementById(`selectTo`)
let input = document.getElementById(`input`)
let btn = document.getElementById(`btn`)

selectFrom.addEventListener(`change`, () => {
    let codeFrom = selectFrom.value.slice(0, 2).toLocaleLowerCase()
    let codeTo = selectTo.value.slice(0, 2).toLocaleLowerCase()
    changeFlag(codeFrom, codeTo)
})

selectTo.addEventListener(`change`, () => {
    let codeFrom = selectFrom.value.slice(0, 2).toLocaleLowerCase()
    let codeTo = selectTo.value.slice(0, 2).toLocaleLowerCase()
    changeFlag(codeFrom, codeTo)
})


async function getCountry() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();

        for (const key in result?.result) {
            let option = document.createElement(`option`)
            option.innerHTML = key
            option.value = key

            selectFrom.appendChild(option)
        }

        for (const key in result?.result) {
            let option = document.createElement(`option`)
            option.innerHTML = key
            option.value = key

            selectTo.appendChild(option)
        }

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

getCountry()

function changeFlag(imgFrom, imgTo) {
    let img1 = document.getElementById(`img1`)
    let img2 = document.getElementById(`img2`)

    img1.src = `https://flagcdn.com/24x18/${imgFrom}.png`
    img2.src = `https://flagcdn.com/24x18/${imgTo}.png`
}

function Natija(params) {
    console.log(params)

    let h3 = document.getElementById(`natija`);

        h3.innerHTML = `${input.value} ${selectFrom.value} = ${Math.floor(params?.result)} ${selectTo.value}`

}

btn.addEventListener(`click`, ()=>{
    if (selectFrom && selectTo && input.value) {
        fetch(
            api + 
              `?from=${selectFrom.value}&to=${selectTo.value}&amount=${input.value}`,
               options
            )
        .then((response)=>response.json())
        .then((data)=>Natija(data))
        .catch((err)=>console.log(err))
    }
});