// ETH
import Wallet from 'ethereumjs-wallet';

// BTC-like
import secureRandom from 'secure-random';
import CoinKey from 'coinkey';
import coininfo from 'coininfo';

// ALGO
import algosdk from 'algosdk';

function getCoinKey(asset, privateKey) {
    switch (asset) {
        case 'btc':
            return new CoinKey(privateKey, coininfo('BTC'));
        case 'ltc':
            return new CoinKey(privateKey, coininfo('LTC'));
        case 'doge':
            return new CoinKey(privateKey, coininfo('DOGE'));
    }
    return null;
}



function makeEthWallet() {
    const wallet = Wallet.generate();
    const privateKey = wallet.getPrivateKeyString();
    const address = wallet.getAddressString();

    return {
        asset: 'eth',
        privateKey,
        address: address,
    };
}

function makeBtcLikeWallet(asset) {
    if (!['btc', 'ltc', 'doge'].includes(asset)) {
        return null;
    }

    const randBytes = secureRandom.randomBuffer(32);
    const coinKey = getCoinKey(asset, randBytes);

    return {
        asset,
        privateKey: coinKey.privateWif,
        address: coinKey.publicAddress,
    };
}

function makeAlgoWallet() {
    const keys = algosdk.generateAccount();
    const mnemonic = algosdk.secretKeyToMnemonic(keys.sk);

    return {
        asset: 'algo',
        privateKey: null,
        passphrase: mnemonic,
        address: keys.addr,
    };
}

export {
    makeEthWallet,
    makeBtcLikeWallet,
    makeAlgoWallet
};
