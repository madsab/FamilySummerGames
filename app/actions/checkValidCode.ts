"use server"
import addCode from "./addCode";
import isCodeUsed from "./isCodeUsed";

async function checkValidCode(code: string): Promise<number> {
    try {
        // Check if code is an admin code
        if (code.startsWith("abcx")){
            return parseInt(code.split("x")[1])
        }

        //Check if code is a user one-time code
        if (code.includes("yzx")&& code.indexOf("yzx") === 1){
            const isUsed = await isCodeUsed(code)
            if (isUsed) {
                return -1;
            }
            await addCode(code)
            const validNumbers = parseInt(code.split("yzx")[0])
            return parseInt(code.split("yzx")[1].substring(0, validNumbers))
        }
        return 0;

    } catch (error) {
        return 0;
    }
}

export default checkValidCode;