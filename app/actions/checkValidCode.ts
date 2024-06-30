
function checkValidCode(code: string): number {
    // Check if code is an admin code
    if (code.startsWith("abcx")){
        return parseInt(code.split("x")[1])
    }

    //Check if code is a user one-time code
    if (code.includes("yzx")&& code.indexOf("yzx") === 1){
        const validNumbers = parseInt(code.split("yzx")[0])
        return parseInt(code.split("yzx")[1].substring(0, validNumbers))
    }
    return 0;
}

export default checkValidCode;