const sdate = document.getElementById("date")
const smonth = document.getElementById("month")
const syear = document.getElementById("year")
const sweekday = document.getElementById("weekday")

function loadbody(){
    const date = new Date()
    const month = date.toLocaleDateString('default', { month: 'long' })
    const mydate = date.getDate();
    const year = date.getFullYear()
    const day = date.toLocaleDateString('default', {weekday: 'long'})

    sdate.innerText = mydate;
    smonth.innerText = month;
    syear.innerText = year + ","
    sweekday.innerText = day;
}

