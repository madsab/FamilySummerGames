
function checkValidCode(code: string): number {
    if (code.startsWith("abcx")){
        return parseInt(code.split("x")[1])
    }
    return 0;
}

export default checkValidCode;