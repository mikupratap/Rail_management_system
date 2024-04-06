import jwt from 'jsonwebtoken'
export const genToken = (email) => {
    const token = jwt.sign(email, "thisisdevendraprajapatitoken");
    return token;
}
export const varityToken = (token) => {
    const val = jwt.verify(token, "thisisdevendraprajapatitoken");
    return val;
}