function Validation() {
    this.arrTB = ["*Task Empty*", "*Task Existed*"]

    //Emtpy Check
    this.checkEmpty = function (input, idSpan, messID) {
        if (input === "") {
            getEle(idSpan).style.display = "inline-block";
            getEle(idSpan).style.color = "red";
            getEle(idSpan).innerHTML = this.arrTB[messID];
            return false;
        }
        getEle(idSpan).innerHTML = "";
        return true;
    }


    //Task Existed Check
    this.checkTaskExisted = function (input, idSpan, messId, taskArray) {
        for (i = 0; i < taskArray.length; i++) {
            if (input.toLowerCase() === taskArray[i].taskName.toLowerCase()) {
                getEle(idSpan).style.display = "inline-block";
                getEle(idSpan).style.color = "red";
                getEle(idSpan).innerHTML = this.arrTB[messId + 1];
                return false;
            }
        }
        getEle(idSpan).innerHTML = "";
        return true;
    }
}