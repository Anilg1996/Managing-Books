

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}



const isValidName = function (str) {
    let nameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)$/
    if (typeof str === "undefined" || str === null) return false;
    if (typeof str === "string" && str.trim().length === 0) return false;
    if (nameRegex.test(str)) return true;
}

const isValidStr = function (abc) {
    if (typeof abc === 'undefined') return false;
    if (typeof abc != 'string' && abc.trim().length === 0) return false
    const regex = /^[a-z/\s/A-Z]{3,100}$/;
    return regex.test(String(abc));
}


const isVaildPass = function (str) {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
    return re.test(str);
}

const isValidPhone = function (num) {
    const reg = /^[0-9]{10}$/;
    return reg.test(String(num));
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,3}))$/;
    return re.test(String(email).toLowerCase());
}




module.exports = { isValid, isValidEmail, isValidName, isValidPhone, isVaildPass, isValidStr }