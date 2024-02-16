/**
 * 
 * @param {Array<string>} horaires Providing from firestore 
 * @returns {Boolean}
 */
export const checkStoreAvailability = (horaires) => {console.log("HORAIRES: ", horaires)
    const dayNow = new Date();
    let dayNumber = (dayNow.getDay() > 0)? dayNow.getDay() - 1 : 6;
    try {
        let todayOpenCanvas = horaires[dayNumber].split(", ").map(l => l.split("–"));
        for(let i=0; i<todayOpenCanvas.length; i++){
            let d1 = new Date(`${dayNow.getFullYear()}-${dayNow.getMonth()+1}-${dayNow.getDate()}T${todayOpenCanvas[i][0].split(":")[0]}:${todayOpenCanvas[i][0].split(":")[1]}:00`);
            let d2 = new Date(`${dayNow.getFullYear()}-${dayNow.getMonth()+1}-${dayNow.getDate()}T${todayOpenCanvas[i][1].split(":")[0]}:${todayOpenCanvas[i][1].split(":")[1]}:00`);
            console.log(dayNow.toString(), d1.toString(), d2.toString())
            if(dayNow >= d1 && dayNow <= d2){
                return true;
            }
        }
    } catch (error) {
        return false;
    }
    return false;
};