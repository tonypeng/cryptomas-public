import {useEffect, useState} from 'react';

import makeAlgorandPassphraseQrString from '@/lib/asset/makeAlgorandPassphraseQrString';

import QRCode from 'qrcode.react';

import Box from '@/lib/components/Box';
import Text from '@/lib/components/Text';

import Theme from '@/lib/styling/theme';

import AssetDescriptions from '@/lib/asset/AssetDescriptions';
import buildUrl from '@/lib/display/buildUrl';

import Header from '@/lib/GiftCard/Header';

import walletsListToStructured from '@/lib/asset/walletsListToStructured';

import {IoInformationCircle, IoWarning} from 'react-icons/io5';

export default function GiftCard({width, backgroundColor, foregroundColor, textColor, emoji, to, message, wallets, walletBalances={}, assetPrices={}}) {
    const unit = 0.01 * width;

    const fontSizeTitle = width * 0.08;
    const fontSizeSubhead = fontSizeTitle * 0.4;
    const fontSizeCaption = fontSizeTitle * 0.25;

    const renderWallet = (wallet, idx) => {
        const {icon, name, ticker, wif, decimalPlaces} = AssetDescriptions[wallet.asset];
        return (
            <Box style={{paddingLeft: 3 * unit, paddingRight: 3 * unit, paddingTop: 3 * unit, paddingBottom: 3 * unit, borderBottom: idx === wallets.length - 1 ? 'none' : '1px solid #ddd'}}>
                <Box direction="row">
                    <Box>
                        <img src={icon} style={{width: 6 * unit}} />
                    </Box>
                    <Box style={{flex: 1}}>
                        <Box direction="row" style={{flex: 1}}>
                            <Box style={{marginLeft: 2 * unit}}>
                                <Text style={{ fontSize: 2.75 * unit}}>{name}</Text>
                            </Box>
                            <Box style={{flex: 1}} />
                            {walletBalances[wallet.asset] && <Text style={{fontSize: 2 * unit}} code>{walletBalances[wallet.asset].toFormat(decimalPlaces)} {ticker}{assetPrices[wallet.asset] && `/≈$${walletBalances[wallet.asset].mul(assetPrices[wallet.asset]).toFormat(2)}`}</Text>}
                        </Box>
                        <Box style={{marginLeft: 2 * unit, marginBottom: unit}}>
                            {(wallet.tokens && wallet.tokens.map((token) => (
                                <Box direction="row" style={{marginLeft: unit, alignItems: 'center', marginBottom: unit * 0.5, marginTop: unit * 0.5}}>
                                    <Box style={{marginRight: unit * 0.5}}>
                                        <Box style={{width: 8, height: 8, borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc', borderBottomLeftRadius: 2}} />
                                        <Box style={{height: 4}} />
                                    </Box>
                                    <Box style={{backgroundColor: '#c99d66', borderRadius: 999, paddingLeft: 1.5 * unit, paddingRight: 1.5 * unit, paddingBottom: 0.25 * unit, paddingTop: 0.25 * unit, marginRight: unit}}>
                                        <Text style={{fontSize: fontSizeCaption * 0.9, color: 'white', opacity: 0.92}} bold>ERC-20</Text>
                                    </Box>
                                    <Text style={{fontSize: fontSizeCaption}}>{token.erc20.tokenName} (<Text style={{fontSize: fontSizeCaption * 0.9}} code>{token.erc20.tokenAddress}</Text>)</Text>
                                </Box>
                            )))}
                        </Box>
                        <Box style={{marginLeft: 2 * unit, marginTop: 0.5 * unit}}>
                            <Box direction="row" style={{alignItems: 'baseline'}}>
                                <Text style={{fontSize: fontSizeCaption}} bold secondary>Public Address:</Text>
                                <Text style={{fontSize: fontSizeCaption, marginLeft: 0.5 * unit, height: unit * 3, marginTop: unit * 0.25}} code>{wallet.address}</Text>
                            </Box>
                            <Box direction="row" style={{alignItems: 'baseline', marginTop: -0.5 * unit}}>
                                {wallet.asset === 'algo' ? (
                                    <Text style={{color: Theme.colorPrimary, fontSize: fontSizeCaption}} bold secondary>Passphrase:</Text>
                                ) : (
                                    <Text style={{color: Theme.colorPrimary, fontSize: fontSizeCaption}} bold secondary>Private Key{wif ? ' (WIF)' : ''}:</Text>
                                )}
                                <Text style={{color: Theme.colorPrimary, fontSize: fontSizeCaption * (wif || wallet.asset === 'eth' ? 0.9 : 1), marginLeft: 0.5 * unit}} code>{wallet.privateKey || wallet.passphrase}</Text>
                        </Box>
                        </Box>
                    </Box>
                </Box>
                {/*<Box style={{alignItems: 'center'}}>*/}
                    {/*<Box direction="row" style={{alignItems: 'baseline'}}>*/}
                        {/*<Text style={{fontSize: fontSizeCaption}} bold secondary>Public Address:</Text>*/}
                        {/*<Text style={{fontSize: fontSizeCaption, marginLeft: 0.5 * unit, height: unit * 3, marginTop: unit * 0.25}} code>{wallet.address}</Text>*/}
                    {/*</Box>*/}
                    {/*<Box direction="row" style={{alignItems: 'baseline'}}>*/}
                        {/*<Text style={{color: Theme.colorPrimary, fontSize: fontSizeCaption, marginLeft: 0.8 * unit}} bold secondary>Private Key{wif ? ' (WIF)' : ''}:</Text>*/}
                        {/*<Text style={{color: Theme.colorPrimary, fontSize: fontSizeCaption * (wif ? 0.9 : 1), marginLeft: 0.5 * unit}} code>{wallet.privateKey}</Text>*/}
                    {/*</Box>*/}
                {/*</Box>*/}
                <Box direction="row" style={{marginTop: 3 * unit}}>
                    <Box style={{flex: 1}} />
                    <Box style={{alignItems: 'center'}}>
                        <QRCode bgColor="#f5f5f5" value={wallet._qrAddressOverride || wallet.address} size={15 * unit} />
                        <Text style={{fontSize: fontSizeCaption, marginTop: unit}} bold secondary>Public Address</Text>
                    </Box>
                    <Box style={{width: 6 * unit}} />
                    <Box style={{alignItems: 'center'}}>
                        <QRCode bgColor="#f5f5f5" fgColor={Theme.colorPrimary} value={wallet._qrPrivateKeyOverride || (wallet.asset === 'algo' ? makeAlgorandPassphraseQrString(wallet.passphrase) : wallet.privateKey)} size={15 * unit} />
                        {wallet.asset === 'algo' ? (
                            <Text style={{color: Theme.colorPrimary, fontSize: fontSizeCaption, marginTop: unit}} bold secondary>Passphrase</Text>
                        ) : (
                            <Text style={{color: Theme.colorPrimary, fontSize: fontSizeCaption, marginTop: unit, textAlign: 'center'}} bold secondary>Private Key{wif ? ' (WIF)' : ''}</Text>
                        )}
                    </Box>
                    <Box style={{flex: 1}} />
                </Box>
                {wallet.asset === 'algo' && <Text style={{fontSize: fontSizeCaption, textAlign: 'center', marginTop: unit}} secondary>Passphrase QR code is compatible with the Algorand Wallet mobile app.</Text>}
            </Box>
        )
    };

    return (
        <Box style={{width, backgroundColor: '#f5f5f5'}}>
            <Box style={{borderBottomLeftRadius: unit, borderBottomRightRadius: unit, overflow: 'hidden'}}>
                <Header width={width} backgroundColor={backgroundColor} foregroundColor={foregroundColor} textColor={textColor} emoji={emoji} to={to} message={message} />
            </Box>
            {/*<Box direction="row" style={{border: '1px solid #ffcc00', backgroundColor: 'rgba(255, 204, 0, 0.2)', borderRadius: 4, padding: 8, marginLeft: 3 * unit, marginRight: 3 * unit, marginTop: 24, marginBottom: 24}}>*/}
                {/*<Box style={{width: 20}}>*/}
                    {/*<IoWarning color="#ffcc00" size={20} />*/}
                {/*</Box>*/}
                {/*<Text textStyle="caption" secondary bold style={{marginLeft: 4}}>It is recommended that you withdraw all assets from this card.</Text>*/}
            {/*</Box>*/}
            <Box>
                {walletsListToStructured(wallets).map(renderWallet)}
            </Box>
            <Box direction="row" style={{backgroundColor: 'rgba(128, 128, 128, 0.05)', paddingLeft: 2 * unit, paddingRight: 2 * unit, paddingTop: 2 * unit, paddingBottom: 2 * unit, justifyContent: 'center', alignItems: 'center'}}>
                <Box style={{width: 2.5 * unit}}>
                    <IoInformationCircle color="#777" size={2.5 * unit} />
                </Box>
                <Text secondary style={{fontSize: fontSizeCaption, marginLeft: 0.5 * unit}}>For redemption help, visit <span style={{fontWeight: 'bold'}}>{buildUrl('/help')}</span></Text>
            </Box>
        </Box>
    );
}
