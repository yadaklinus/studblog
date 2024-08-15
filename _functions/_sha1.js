function sha1(x){
    return crypto.createHash('sha1').update(x,'binary').digest('hex')
}

module.exports = sha1