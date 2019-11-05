function getToken() {
const userJwt = req.header('authorization');
const tokenSplit = userJwt.split(" ");
 return decodedJWT = tokenService.verify(tokenSplit[1]);
}
exports.getToken;