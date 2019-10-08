export const emailvalid = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase())
}