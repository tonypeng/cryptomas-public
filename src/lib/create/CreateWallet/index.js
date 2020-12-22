import {useState} from 'react';

import {
    makeBtcLikeWallet,
    makeEthWallet,
    makeAlgoWallet,
} from '@/lib/asset/makeWallet';

import Modal from 'react-modal';

import Box from '@/lib/components/Box';
import Text from '@/lib/components/Text';

import CreateErc20WalletFlow from '@/lib/create/CreateWallet/CreateErc20WalletFlow';

import {IoIosClose} from 'react-icons/io';

import AssetDescriptions from '@/lib/asset/AssetDescriptions';

import './AssetOption.css';

import BitcoinLogo from '@/lib/frontpage/SupportedCryptocurrencies/bitcoin_logo.png';
import EthereumLogo from '@/lib/frontpage/SupportedCryptocurrencies/ethereum_logo.png';
import LitecoinLogo from '@/lib/frontpage/SupportedCryptocurrencies/litecoin_logo.png';
import AlgorandLogo from '@/lib/frontpage/SupportedCryptocurrencies/algorand_logo.png';
import DogecoinLogo from '@/lib/frontpage/SupportedCryptocurrencies/dogecoin_logo.png';
import ChainlinkLogo from '@/lib/frontpage/SupportedCryptocurrencies/chainlink_logo.png';
import TetherLogo from '@/lib/frontpage/SupportedCryptocurrencies/tether_logo.png';
import UsdcLogo from '@/lib/frontpage/SupportedCryptocurrencies/usdc_logo.png';
import UniswapLogo from '@/lib/frontpage/SupportedCryptocurrencies/uniswap_logo.png';
import YfiLogo from '@/lib/frontpage/SupportedCryptocurrencies/yfi_logo.png';
import AmpleforthLogo from '@/lib/frontpage/SupportedCryptocurrencies/ampleforth_logo.png';

const Styles = {
    root: {
        overlay : {
            position         : 'fixed',
            top              : 0,
            left             : 0,
            right            : 0,
            bottom           : 0,
            display          : 'flex',
            alignItems       : 'center',
            justifyContent   : 'center',
            zIndex: 10000,
            background: 'rgba(77, 0, 10, 0.2)',
        },
        content : {
            position    : 'null', // to override default styles
            top         : 'null',
            left        : 'null',
            right       : 'null',
            bottom      : 'null',
            background  : '#fff',
            padding: 0,
            width: 380,
            border: 'none',
            marginBottom: 152,
            // height      : '75vh'
        }
    },
};

function AssetOption({icon, name, erc20, onClick}) {
    return (
        <Box onClick={onClick} className="AssetOption" direction="row" style={{cursor: 'pointer', alignItems: 'center', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12}}>
            {icon}
            <Text style={{marginLeft: 16}} textStyle="subhead">{name}</Text>
            {erc20 && (
                <>
                    <Box style={{flex: 1}} />
                    <Box style={{backgroundColor: '#c99d66', borderRadius: 999, paddingLeft: 8, paddingRight: 8, paddingBottom: 2, paddingTop: 2}}>
                        <Text style={{color: 'white', opacity: 0.92}} textStyle="caption" bold>ERC-20</Text>
                    </Box>
                </>
            )}
        </Box>
    );
}

function AssetPicker({existingWallets, onRequestClose, onSelectAsset, onOpenErc20Flow}) {
    const existingAssets = new Set();
    for (const wallet of existingWallets) {
        const key = wallet.asset === 'erc20' ? wallet.erc20.assetId : wallet.asset;
        existingAssets.add(key);
    }

    return (
        <Box>
            <Box style={{borderBottom: '1px solid #ddd', padding: 8, alignItems: 'center', flexDirection: 'row'}}>
                <Box style={{flex: 1}} />
                <Text textStyle="title" style={{opacity: 0.92}}>Select</Text>
                <Box style={{flex: 1, alignItems: 'flex-end'}}>
                    <Box style={{cursor: 'pointer'}} onClick={onRequestClose}>
                        <IoIosClose size={40} color="#555" />
                    </Box>
                </Box>
            </Box>
            <Box style={{maxHeight: 400, overflowY: 'auto', flex: 1}}>
                <Box>
                    {!existingAssets.has('btc') && (
                        <AssetOption icon={<img src={BitcoinLogo} style={{width: 32}} />} name="Bitcoin" onClick={() => onSelectAsset('btc')} />
                    )}
                    {!existingAssets.has('eth') && (
                        <AssetOption icon={<img src={EthereumLogo} style={{width: 32}} />} name="Ethereum" onClick={() => onSelectAsset('eth')} />
                    )}
                    {!existingAssets.has('ltc') && (
                        <AssetOption icon={<img src={LitecoinLogo} style={{width: 32}} />} name="Litecoin" onClick={() => onSelectAsset('ltc')} />
                    )}
                    {!existingAssets.has('algo') && (
                        <AssetOption icon={<img src={AlgorandLogo} style={{width: 32}} />} name="Algorand" onClick={() => onSelectAsset('algo')} />
                    )}
                    {!existingAssets.has('doge') && (
                        <AssetOption icon={<img src={DogecoinLogo} style={{width: 32}} />} name="Dogecoin" onClick={() => onSelectAsset('doge')} />
                    )}
                    {!existingAssets.has('link') && (
                        <AssetOption icon={<img src={ChainlinkLogo} style={{width: 32}} />} name="Chainlink" erc20 onClick={() => onSelectAsset('link')} />
                    )}
                    {!existingAssets.has('uni') && (
                        <AssetOption icon={<img src={UniswapLogo} style={{width: 32}} />} name="Uniswap" erc20 onClick={() => onSelectAsset('uni')} />
                    )}
                    {!existingAssets.has('yfi') && (
                        <AssetOption icon={<img src={YfiLogo} style={{width: 32}} />} name="yearn.finance" erc20 onClick={() => onSelectAsset('yfi')} />
                    )}
                    {!existingAssets.has('ampl') && (
                        <AssetOption icon={<img src={AmpleforthLogo} style={{width: 32}} />} name="Ampleforth" erc20 onClick={() => onSelectAsset('ampl')} />
                    )}
                    {!existingAssets.has('usdt') && (
                        <AssetOption icon={<img src={TetherLogo} style={{width: 32}} />} name="Tether" erc20 onClick={() => onSelectAsset('usdt')} />
                    )}
                    {!existingAssets.has('usdc') && (
                        <AssetOption icon={<img src={UsdcLogo} style={{width: 32}} />} name="USD Coin" erc20 onClick={() => onSelectAsset('usdc')} />
                    )}
                    <AssetOption icon={
                        <Box style={{width: 32, height: 32, borderRadius: 999, backgroundColor: '#777', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white'}} bold>?</Text>
                        </Box>
                    } name="Custom ERC-20 Token" erc20 onClick={onOpenErc20Flow} />
                </Box>
            </Box>
        </Box>
    );
}



const STEP_PICKER = 'STEP_PICKER';
const STEP_CREATE_FLOW = 'STEP_CREATE_FLOW';

export default function CreateWallet({isOpen, existingWallets, onCreateWallet, onRequestClose}) {
    const [state, setState] = useState({ step: STEP_PICKER, asset: null });

    const handleAddErc20Token = (tokenName, tokenAddress, tokenSymbol, assetId=null) => {
        if (!existingWallets.filter((wallet) => wallet.asset === 'eth').length) {
            // create an eth wallet
            onCreateWallet(makeEthWallet());
        }
        onCreateWallet({
            asset: 'erc20',
            erc20: {
                assetId,
                tokenName,
                tokenAddress,
                tokenSymbol,
            },
        });
        onRequestClose();
    };

    const handleSelectAsset = (asset) => {
        let wallet = null;
        switch (asset) {
            case 'btc':
            case 'ltc':
            case 'doge':
                wallet = makeBtcLikeWallet(asset);
                break;
            case 'eth':
                wallet = makeEthWallet();
                break;
            case 'algo':
                wallet = makeAlgoWallet();
                break;
            case 'link':
            case 'uni':
            case 'yfi':
            case 'ampl':
            case 'usdt':
            case 'usdc':
                const {name, ticker} = AssetDescriptions[asset];
                const {tokenAddress} = AssetDescriptions[asset].erc20;
                handleAddErc20Token(name, tokenAddress, ticker, asset);
                break;
        }
        window.gtag && window.gtag('event', 'increment_asset', {
            asset: 1,
        });
        wallet && onCreateWallet(wallet);
        onRequestClose();
        return null;
    };

    const handleOpenErc20Flow = () => {
        setState({ step: STEP_CREATE_FLOW, asset: 'erc20' });
    };

    // const handleSelectAsset = (asset) => {
    //     setState({ step: STEP_CREATE_FLOW, asset });
    // };
    //
    // const renderCreateFlow = () => {
    //     switch (state.asset) {
    //         case 'btc':
    //         case 'ltc':
    //         case 'doge':
    //             return <CreateBitcoinLikeWalletFlow asset={state.asset} onWalletGenerated={onCreateWallet} />;
    //         case 'eth':
    //             return <CreateEthereumWalletFlow onWalletGenerated={onCreateWallet} />;
    //         case 'algo':
    //             return <CreateAlgorandWalletFlow onWalletGenerated={onCreateWallet} />;
    //     }
    //     onRequestClose();
    //     return null;
    // };

    const renderCreateFlow = () => {
        if (state.asset === 'erc20') {
            return <CreateErc20WalletFlow onBack={() => setState({ step: STEP_PICKER, asset: null })} onAddErc20Token={handleAddErc20Token} />;
        }
        onRequestClose();
        return null;
    };

    return (
        <Modal isOpen={isOpen} style={Styles.root}>
            {state.step === STEP_PICKER && <AssetPicker existingWallets={existingWallets} onRequestClose={onRequestClose} onSelectAsset={handleSelectAsset} onOpenErc20Flow={handleOpenErc20Flow} />}
            {state.step === STEP_CREATE_FLOW && renderCreateFlow()}
        </Modal>
    );
}
