class AES {
    constructor(plainText = '', options = {
        key: '' | crypto.randomBytes(32),
        process: 'encrypt' | 'decrypt',
        algorithm: 'aes-256-gcm' | 'aes-192-gcm' | 'aes-128-gcm',
        vector: Buffer
    }){
        this.key = options.key;
        this.plainText = plainText;
        this.process = options.process;
        this.algorithm = options.algorithm;
        this.vector = options.vector;
        switch(this.process){
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
     #encrypt() {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.vector);
        let encrypted = cipher.update(this.plainText, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        this.#processedText = encrypted;
    }
     #decrypt() {
        const decipher = crypto.createCipheriv(this.algorithm, this.key, this.vector);
        let decrypted = decipher.update(this.plainText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        this.#processedText = decrypted;
    }
    getPlainText() {
        return this.plainText;
    }
    getProcessedText() {
        return this.#processedText;
    }
}
const KEY = Buffer.from('ae1b499c2a1a60224789468a80f4b5525ee235e9a423deee28dbb6fecd2236ce', 'hex'), VECTOR = Buffer.from('d158e282d71af2c636ea7da5303a256e', 'hex');
const initElements = ()=>({
        form: document.querySelector('#form'),
        input: document.querySelector('#inputText'),
        output: document.querySelector('#outputText'),
        options: document.querySelectorAll('[name=option]'),
        processBtn: document.querySelector('#processBtn')
    })
;
const encrypt = ()=>{
    const Elements = initElements();
    const text = Elements.input.value;
    const options = {
        key: KEY,
        process: 'encrypt',
        algorithm: 'aes-256-gcm',
        vector: VECTOR
    };
    const aes = new AES(text, options);
    const encrypted = aes.getProcessedText();
    Elements.output.value = encrypted;
};
const decrypt = ()=>{
    const Elements = initElements();
    const text = Elements.input.value;
    const options = {
        key: KEY,
        process: 'decrypt',
        algorithm: 'aes-256-gcm',
        vector: VECTOR
    };
    const aes = new AES(text, options);
    const decrypted = aes.getProcessedText();
    Elements.output.value = decrypted;
};
const main = ()=>{
    window.addEventListener('load', ()=>{
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            const Elements = initElements();
            if (Elements.options[0].checked) encrypt();
            else if (Elements.options[1].checked) decrypt();
        });
    });
};
main();

//# sourceMappingURL=index.ffef7276.js.map
