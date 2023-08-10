const makePrettierVoyage = function (voyage) {
    const prettyVoyage = {
        idVoyage : voyage.idVoyage,
        numTrain : voyage.numTrain,
        depart : voyage.depart,
        destination : voyage.destination,
        dateVoyage : `${voyage.dateVoyage.getFullYear()}/${voyage.dateVoyage.getMonth()}/${voyage.dateVoyage.getDate()}`,
        heureDepart : `${voyage.heureDepart.getHours()}:${voyage.heureDepart.getMinutes()}:${voyage.heureDepart.getSeconds()}`
    }
    return prettyVoyage;
}
exports.makePrettierVoyage = makePrettierVoyage;

const makeDate = function (dateString) // format "AAAA,MM,JJ" 
{
    const elemets = dateString.split('/');
    const date = new Date(+elemets[0], +elemets[1], +elemets[2], 0, 0, 0)    
    return date;
}
exports.makeDate = makeDate;

const makeHour = function (timeString) // format "HH:mm:ss" 
{
    const elemets = timeString.split(':');
    const hour = new Date(0,0,0,+elemets[0], +elemets[1], +elemets[2])    
    return hour;
}
exports.makeHour = makeHour;