import bcrypt from 'bcrypt';
export const generatePassword = async (pass) => {
    try {
        const hashedPass = await bcrypt.hash(pass, 10);
        return hashedPass;
    }
    catch (e) {
        console.log("error in bcrypt js")
    }
}
export const matchPass = async (pass, hpass) => {
    try {
        const issame = bcrypt.compare(pass, hpass);
        return issame;
    }
    catch (e) {
        console.log("error in bcrypt");
    }
}