/**
 * Wraps the native bcrypt lib to expose the Promise based api
 */
class BcryptHasher {
    
    /**
     *
     * @param {bcrypt} bcrypt
     */
    constructor (bcrypt) {
        this.bcrypt = bcrypt;
    }
    
    /**
     * Set the number of salt rounds
     *
     * @param {number} rounds
     * @return {BcryptHasher}
     */
    setRounds (rounds) {
        this.rounds = rounds;
        
        return this;
    }
    
    /**
     * Generates a hash with given value string
     *
     * @param {string} value
     * @return {Promise<string>}
     */
    generate (value) {
        let bcrypt = this.bcrypt;
        let rounds = this.rounds;
        return bcrypt.hash(value, rounds);
    }
    
    /**
     * Check hash with a given value string
     *
     * @param {string} value
     * @param {string} hashed
     * @return {Promise<boolean>}
     */
    check (value, hashed) {
        let bcrypt = this.bcrypt;
        return bcrypt.compare(value, hashed);
    }
}

module.exports = BcryptHasher;