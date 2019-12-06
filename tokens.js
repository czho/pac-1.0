const sha1 = require('sha1');
class tokens {
  gen(seed) {
    let date = new Date()
    let f = seed + date.getHours() + date.getDate() + date.getFullYear()
    return sha1(f)
  }

  check(token, seed) {
    if (token == this.gen(seed)) {
      return true;
    }
    return false;
  }
}
module.exports = tokens;