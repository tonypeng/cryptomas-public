export default function(passphrase) {
    return JSON.stringify({
        'version': '1.0',
        'mnemonic': passphrase,
    });
}
