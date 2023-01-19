//Function to parse the date received
function parseDate(date)
{

    //Behaviour: if the date isn't in the appropriate format, the current date will be used instead.
    if(date && date.match(/\d\d\d\d-\d\d-\d\d/) !== null && date.length === 10) 
    {
        let [year, month, day] = date.match(/[^-]+/ig);
        if(month != '00') month = `${Number(month) - 1}`; //fixing month, since january is month 0
        return new Date(year, month, day);   
    }
    else return new Date();
}

module.exports = {parseDate};