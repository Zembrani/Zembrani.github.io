

window.onload = function () {
    click();
};

function click() {
    var button = document.querySelectorAll("#bottom span");
    var expression = document.getElementById("expression");
    var res = document.getElementById("res");
    var aux = document.getElementById("aux");

    var mc = document.getElementById("mc");
    var mr = document.getElementById("mr");
    var mplus = document.getElementById("mplus");
    var mminus = document.getElementById("mminus");
    var mstore = document.getElementById("ms");
    var m = document.getElementById("m");
    var mwindow = document.getElementById("m");


    for (let i = 0; i < button.length; i++) {
        var keyboard = button[i];
        keyboard.onclick = function () {
            var number = this.dataset["number"];
            screen(number);
        }
    }

}

function screen(number) {

    var remove = document.getElementById("backspace");
    var c = document.getElementById("C");
    var ce = document.getElementById("CE");
    var equal = document.getElementById("equal");
    var dot = document.getElementById("dot");
    var neg = document.getElementById("neg");

    var inverseMult = document.getElementById("inverseMult");
    var pow = document.getElementById("pow");
    var sqrt = document.getElementById("sqrt");
    var porcentage = document.getElementById("porcentage");

    var oldVal = aux.innerHTML;
    /* Sobre a variavel oldVal
    0 - para quando a última entrada é um numero;
    1 - para a última entrada sendo um símbolo de operador;
    2 - para última entrada o botão equal;
    3 - sendo uma das funções;
    */
    var expreVal = expression.innerHTML;
    var resVal = cleanComma(verifyScreen(res.innerHTML));
    var symbol = { "+": "+", "-": "-", "*": "*", "/": "/" };

    var lastSymbol = expreVal.substring(expreVal.length - 1, expreVal.length);

    //--------------------Add number on screen--------------------------//
    if (parseInt(number) > -1 && parseInt(number) < 10) {
        // console.log("numero " + oldVal);
        if (oldVal == "2") {
            aux.innerHTML = "1";
            expression.innerHTML = "";
            expreVal = expression.innerHTML;
            oldVal = aux.innerHTML;
        }
        if (resVal === "0" || oldVal === "1" || oldVal === "3") {
            res.innerHTML = number;
            aux.innerHTML = "0";
        } else if (resVal === "-0") {
            res.innerHTML = "-" + number;
            aux.innerHTML = "0";
        } else {
            res.innerHTML = verifyScreen(resVal + number);
        }
    }
    oldVal = aux.innerHTML;
    //--------------------Add expression on screen--------------------------//
    if (number in symbol) {
        let temp;
        if (oldVal == "2") {
            aux.innerHTML = "1";
            expression.innerHTML = "";
            oldVal = aux.innerHTML;
        }
        // console.log("operador " + oldVal);
        expreVal = expression.innerHTML;
        if (lastSymbol in symbol && oldVal == "1") {
            expreVal = expreVal.substring(0, expreVal.length - 1);
            temp = lastIsDot(expreVal);
            expression.innerHTML = temp + symbol[number];
            oldVal = "0";
        } else if (oldVal == "3") {
            // console.log(expreVal);
            temp = lastIsDot(expreVal + resVal);
            expression.innerHTML = temp + symbol[number];
            aux.innerHTML = "1";
        } else {
            temp = lastIsDot(expreVal + resVal);
            expression.innerHTML = temp + symbol[number];
        }
        aux.innerHTML = "1";
    }

    //--------Current values ​​in variables------------//

    resVal = getRes();
    expreVal = expression.innerHTML;

    function getRes() {
        return cleanComma(res.innerHTML);
    }
    //--------------------Remove number--------------------------//
    remove.onclick = function () {
        let temp = getRes();
        if (temp.length > 1) {
            temp = temp.slice(0, -1);
            res.innerHTML = verifyScreen(temp);
        } else {
            res.innerHTML = 0;
        }
    }

    //--------------------Clean screen number and expression--------------------------//
    c.onclick = function () {
        res.innerHTML = 0;
        expression.innerHTML = "";
        res.style.fontSize = "33pt";
    }

    //--------------------Clean screen number only--------------------------//
    ce.onclick = function () {
        res.innerHTML = 0;
        res.style.fontSize = "33pt";
    }

    //--------------------Does the calculations and show on the expression screen--------------------------//
    equal.onclick = function () {
        resVal = cleanComma(verifyScreen(res.innerHTML));
        var result;
        var tempExpre
        oldVal = aux.innerHTML;
        lastSymbol = expreVal.substring(expreVal.length - 1, expreVal.length);
        // console.log("oldval equal = " + oldVal);
        console.log("resval = " + resVal);

        if (oldVal == "2") {
            // console.log("oldval == 2");
            tempExpre = expression.innerHTML;

            // console.log("lastSymbol " + lastSymbol);
            var index = tempExpre.lastIndexOf(lastSymbol);
            if (index !== -1) {
                tempExpre = tempExpre.substring(index, tempExpre.length - 2);
            }

            tempExpre = resVal + tempExpre;
            // console.log("temp expre dentro do if " + tempExpre);
            if (tempExpre.includes("=")) {
                aux.innerHTML = "2";
                return;
            }
        } else {
            // console.log("oldval == " + oldVal);
            var firstSymbol = resVal.toString().substring(0, 1);
            if (firstSymbol == "-") {
                resVal = "(" + resVal + ")";
            }
            tempExpre = expreVal + resVal;
        }
                
        result = operation(tempExpre).toString();
        var firstSymbol = result.substring(0, 1);
        var length = firstSymbol == "-" ? result.length - 1 : result.length;

        if (length > 12) {
            expression.innerHTML = "";
            res.innerHTML = "Overflow";
        } else {
            res.innerHTML = verifyScreen(result);

            expression.innerHTML = lastIsDot(tempExpre) + " =";
            aux.innerHTML = "2";
        }


    }

    function operation(expre) {
        let result = eval(expre).toString();
        console.log("precision = " + getBigger(getRes(), result));
        let length = getBigger(getRes(), result);
        if(length>7) length = 7;
        result = Number(result).toPrecision(length);
        result = removeZerosAtRight(result);
        console.log(result);
        return result;
    }

    dot.onclick = function () {
        resVal = res.innerHTML;
        var indexDot = resVal.indexOf(".");
        if (indexDot !== -1) {
            return;
        }
        resVal = resVal + ".";
        res.innerHTML = verifyScreen(resVal);
    }

    neg.onclick = function () {
        resVal = res.innerHTML;

        var indexNeg = resVal.indexOf("-");

        if (indexNeg === 0) {
            res.innerHTML = verifyScreen(resVal.substring(1, resVal.length));
        } else if (indexNeg === -1) {
            res.innerHTML = verifyScreen("-" + resVal);
        }
    }
    //--------------------Functions--------------------------//
    inverseMult.onclick = function () {
        let value = res.innerHTML;
        let result = 0;

        verifyEqual();

        result = 1 / parseFloat(value);
        result = result.toFixed(3);
        result = result.toString();

        if (result.length > 11) {
            expression.innerHTML = "";
            res.innerHTML = "Overflow";
        } else {
            res.innerHTML = verifyScreen(result);
            aux.innerHTML = "1";
        }
        if (value === "0") {
            res.innerHTML = "Cannot divide by zero";
        }
        aux.innerHTML = "3";
    }

    pow.onclick = function () {
        verifyEqual();

        let value = getRes();
        let result = parseFloat(Math.pow(value, 2).toFixed(3));
        result =  operation(result).toString();

        if (result.length > 11) {
            expression.innerHTML = "";
            res.innerHTML = "Overflow";
        } else {
            res.innerHTML = verifyScreen(result);
            aux.innerHTML = "3";
        }
    }

    sqrt.onclick = function () {

        verifyEqual();

        let value = getRes();
        let result = parseFloat(Math.sqrt(value).toFixed(6));
        result = result.toString();

        res.innerHTML = verifyScreen(result);
        aux.innerHTML = "3";

    }

    function verifyEqual() {
        expreVal = expression.innerHTML;
        lastSymbol = expreVal.substring(expreVal.length - 1, expreVal.length);

        if (lastSymbol == "=") {
            expression.innerHTML = "";
        }
    }

    porcentage.onclick = function () {
        let valuePrcentg = verifyScreen(res.innerHTML);
        if (valuePrcentg == "0") {
            res.innerHTML = "0";
            return;
        }

        let valueAmount = eval(expreVal.substring(0, expreVal.length - 1));

        valuePrcentg = eval(valueAmount + "*" + valuePrcentg + "/100").toFixed(2);
        expression.innerHTML = expreVal + valuePrcentg;
        res.innerHTML = verifyScreen(valuePrcentg);
    }

    //---------Memory functions----------------------//
    m.onclick = function () {
        mwindow.style.display = mwindow.style.display === 'block' ? 'none' : 'block';
        textSize();
    }

    ms.onclick = function () {
        if (res.innerHTML.includes("er")) {
            return
        } else {
            mwindow.innerHTML = res.innerHTML;
        }
        aux.innerHTML = "3";
    }

    mr.onclick = function () {
        res.innerHTML = verifyScreen(verifyIfIsText(mwindow.innerHTML));
        aux.innerHTML = "3";
    }

    mc.onclick = function () {
        mwindow.innerHTML = "There's nothing saved in your memory.";
        textSize();
        aux.innerHTML = "3";
    }

    mplus.onclick = function () {
        if (res.innerHTML.includes("er")) {
            return
        } else {
            let result = (Number(getMwindow()) + Number(getRes()));
            setMwindow(result);
        }
    }

    mminus.onclick = function () {
        if (res.innerHTML.includes("er")) {
            return
        } else {
            let result = (Number(getMwindow()) - Number(getRes()));
            setMwindow(result);
        }
    }

    function getMwindow() {
        return cleanComma(verifyIfIsText(mwindow.innerHTML));
    }

    function setMwindow(value) {
        console.log(value);
        mwindow.innerHTML = verifyMemoryScreen(value);
        textSize();
        aux.innerHTML = "3";
    }


    function textSize() {
        mwindow.style.fontSize = mwindow.innerHTML.includes('er') ? '11pt' : '20pt';
    }

    function verifyIfIsText(value) {
        value = value.toString();
        return value.includes("er") ? "0" : value;
    }

    function verifyMemoryScreen(result) {
        result = result.toString();
        // console.log(result);
        let firstSymbol = result.substring(0, 1);
        let negative = firstSymbol == "-" ? true : false;

        // console.log("tamanho mwindow = " + length);
        if (negative) {
            result = mwindow.innerHTML.includes('There') ? getRes() : formatMemory(result.substring(1, result.length));
            return "-" + result;
        } else {
            return mwindow.innerHTML.includes('There') ? getRes() : formatMemory(result);
        }
    }

    function formatMemory(value) {
        let length = getBigger(getRes(), getMwindow());
        // console.log("tamanho em verifyM = " + length);
        value = Number(value).toPrecision(length);
        value = removeZerosAtRight(value);
        return value = addComma(value.toString());
    }

    function getBigger(value1, value2) {
        let length1 = value1.length + 1;
        let length2 = value2.length + 1;
        let value = length1 > length2 ? length1 : length2;
        // console.log("teste = " + teste);
        return value > 11 ? 11 : value;
    }

    function removeZerosAtRight(result) {
        let cond = true;
        let indexOfe = result.indexOf("e");
        let resultAux;
        if(indexOfe !== -1){
            console.log("aqui");
            resultAux = result.split("e");
            console.log(resultAux[0]);
            console.log(resultAux[1]);
            result = resultAux[0];
        }
        while (cond == true) {
            let lastSymbol = result.substring(result.length - 1, result.length);
            if (lastSymbol == "0") {
                result = result.substring(0, result.length - 1);
                cond = true;
            } else if (lastSymbol == ".") {
                result = result.substring(0, result.length - 1);
                cond = false;
            } else {
                cond = false;
            }
        }
        if(indexOfe !== -1) {
            let resultAux2 = result + "e" + resultAux[1].toString();
            return resultAux2.includes(".") ? result + "e" + resultAux[1].toString() : result + ".e" + resultAux[1].toString(); //2.e+11 and not 2e+11
        } else {
            return result;
        }
    }
}

//-----Verifications on screen value, length, dot, comma---//

function cleanComma(value) {
    var index = value.indexOf(",");
    while (index != -1) {
        index = value.indexOf(",");
        value = value.substring(0, index) + value.substring(index + 1, value.length);
    }
    return value;
}

function addComma(value) {
    value += '';
    var valueParts = value.split('.');
    var firstPart = valueParts[0];
    var secondPart = valueParts.length > 1 ? '.' + valueParts[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(firstPart)) {
        firstPart = firstPart.replace(rgx, '$1' + ',' + '$2');
    }
    return firstPart + secondPart;
}

function verifyScreen(valueScreen) {
    valueScreen = valueScreen.toString();
    var firstSymbol = valueScreen.substring(0, 1);
    var isNegative = false;

    if (valueScreen == "NaN" || valueScreen.includes("O")) {
        res.innerHTML = "0";
        return "0";
    }

    if (firstSymbol === "-") {
        isNegative = true;
        valueScreen = valueScreen.substring(1, valueScreen.length);
    }
    valueScreen = cleanComma(valueScreen);
    valueScreen = addComma(valueScreen);

    console.log("Dentro screen");
    console.log(valueScreen);
    console.log(valueScreen.length);
    console.log("fim screen");
    if (fontSize(valueScreen.length) == 0) {
        if (isNegative == true) {
            valueScreen = "-" + valueScreen;
        }
        return valueScreen;
    } else {
        return verifyScreen(valueScreen.substring(0, valueScreen.length - 1));
    }
}

function fontSize(length) {
    // console.log("tamanho = " + length);
    if (length < 11) {
        res.style.fontSize = "33pt";
    } else if (length > 10 && length < 12) {
        res.style.fontSize = "28pt";
    } else if (length > 11 && length < 15) {
        res.style.fontSize = "24pt";
    } else if (length > 14) {
        res.style.fontSize = "24pt";
        return 1;
    }
    return 0;
}

function lastIsDot(valueExpre) {
    let lastSymbol = valueExpre.substring(valueExpre.length - 1, valueExpre.length);
    if (lastSymbol == ".") {
        valueExpre = valueExpre.substring(0, valueExpre.length - 1);
    }
    return valueExpre;
}

