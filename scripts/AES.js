import crypto from 'crypto';

class AES{
    constructor( plainText = '', options = {
        key : '' | crypto.randomBytes(32),
        process : 'encrypt' | 'decrypt',
        algorithm : 'aes-256-gcm' | 'aes-192-gcm' | 'aes-128-gcm',
        vector: Buffer
    }){
        this.key = options.key;
        this.plainText = plainText;
        this.process = options.process;
        this.algorithm = options.algorithm;
        this.vector = options.vector;

        switch (this.process) {
            case 'encrypt':
                this.#encrypt();
                break;
        
            case 'decrypt':
                this.#decrypt();
                break;
            default:
                throw new Error('process must be encrypt or decrypt');  
        }
    }

    #processedText = '';
    
    #encrypt(){
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.vector);
        let encrypted = cipher.update(this.plainText, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        this.#processedText = encrypted;
    }
    #decrypt(){
        const decipher = crypto.createCipheriv(this.algorithm, this.key, this.vector);
        let decrypted = decipher.update(this.plainText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        this.#processedText = decrypted;
    }
    getPlainText(){
        return this.plainText;
    }
    getProcessedText(){
        return this.#processedText;
    }

}
export default AES;
// module.exports = AES;