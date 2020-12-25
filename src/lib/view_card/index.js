import base64 from 'base-64';
import utf8 from 'utf8';

import {useEffect, useRef, useState} from 'react';
import {Redirect, useLocation} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import {PrintContextConsumer} from 'react-to-print';
import ReactToPrint from 'react-to-print';

import Box from '@/lib/components/Box';
import Button from '@/lib/components/Button';
import Card from '@/lib/components/Card';
import Footer from '@/lib/components/Footer';
import Navbar from '@/lib/components/Navbar';
import PageContent from '@/lib/components/PageContent';
import Text from '@/lib/components/Text';
import Theme from '@/lib/styling/theme';

import GiftCard from '@/lib/GiftCard';

import {IoInformationCircle, IoPrint, IoWarning} from 'react-icons/io5';
import React from "react";
import AssetDescriptions from "@/lib/asset/AssetDescriptions";

function ViewCardContent({data}) {
    const isLargeFormat = useMediaQuery({
        minWidth: 720,
    });
    const isMediumFormat = useMediaQuery({
        minWidth: 700,
        maxWidth: 720,
    });
    const isSmallFormat = useMediaQuery({
        minWidth: 420,
        maxWidth: 700,
    });
    const isTinyFormat = useMediaQuery({
        minWidth: 360,
        maxWidth: 420,
    });

    const cardRef = useRef(null);

    const [walletBalances, setWalletBalances] = useState({});
    const [assetPrices, setAssetPrices] = useState({});

    const fetchBalances = () => {
        for (const wallet of wallets) {
            const {fetchBalance} = AssetDescriptions[wallet.asset] || {};
            fetchBalance && fetchBalance(wallet.address).then(balance => setWalletBalances(prevBalances => ({...prevBalances, [wallet.asset]: balance})));
        }
    };

    const fetchPrices = () => {
        for (const wallet of wallets) {
            const {fetchPrice} = AssetDescriptions[wallet.asset] || {};
            fetchPrice && fetchPrice().then(price => setAssetPrices(prevPrices => ({...prevPrices, [wallet.asset]: price})));
        }
    };

    const wallets = data.wallets || [];

    useEffect(fetchBalances, [wallets]);
    useEffect(fetchPrices, [wallets]);

    const cardWidth = isLargeFormat ? 640 : (isMediumFormat ? 600 : (isSmallFormat ? 500 : (isTinyFormat ? 340 : 240)));

    return (
        <Box style={{alignItems: 'center'}}>
            <Text textStyle={isLargeFormat ? "headline" : "subhead"} bold style={{marginBottom: 16}}>✨ You received a crypto gift card! ✨</Text>
            <Box direction="row" style={{width: cardWidth - 2*8, border: '1px solid #ffcc00', backgroundColor: 'rgba(255, 204, 0, 0.2)', borderRadius: 4, padding: 8, marginBottom: isLargeFormat ? 32 : 16}}>
                <Box style={{width: 20}}>
                    <IoWarning color="#ffcc00" size={20} />
                </Box>
                <Text textStyle="caption" secondary bold style={{marginLeft: 4}}>Anyone with this link can withdraw from this card. We recommend withdrawing to your own wallet right away.</Text>
            </Box>
            <Card style={{width: cardWidth}}>
                <GiftCard
                    width={cardWidth}
                    to={data.details?.to || ''}
                    message={data.details?.message || ''}
                    backgroundColor={data.details?.colorCombination?.backgroundColor || '#111'}
                    foregroundColor={data.details?.colorCombination?.foregroundColor || '#fff'}
                    textColor={data.details?.colorCombination?.textColor || '#fff'}
                    wallets={wallets}
                    walletBalances={walletBalances}
                    assetPrices={assetPrices}
                />
            </Card>
            <Box style={{display: 'none'}}>
                <div style={{width: Math.max(800 - (wallets.length * 102), 280)}} ref={cardRef}>
                    <GiftCard
                        width={Math.max(800 - (wallets.length * 102), 280)}
                        to={data.details?.to || ''}
                        message={data.details?.message || ''}
                        backgroundColor={data.details?.colorCombination?.backgroundColor || '#111'}
                        foregroundColor={data.details?.colorCombination?.foregroundColor || '#fff'}
                        textColor={data.details?.colorCombination?.textColor || '#fff'}
                        wallets={wallets}
                        walletBalances={walletBalances}
                        assetPrices={assetPrices}
                    />
                </div>
            </Box>
            <Box direction="row" style={{width: cardWidth - 2 * 8, border: '1px solid #777', backgroundColor: 'rgba(128, 128, 128, 0.1)', borderRadius: 4, padding: 8, marginTop: 32, marginBottom: 16}}>
                <Box style={{width: 20}}>
                    <IoInformationCircle color="#777" size={20} />
                </Box>
                <Text textStyle="caption" secondary style={{marginLeft: 4}}>To download a PDF, click Print and select "Save as PDF" as the destination. If the card doesn't fit in one page, you can adjust the scale in the Print dialog. Make sure the QR codes are scannable.</Text>
            </Box>
            <ReactToPrint content={() => cardRef.current}>
                <PrintContextConsumer>
                    {({handlePrint}) => (
                        <Button style={{backgroundColor: Theme.colorAccent, borderRadius: 4, paddingLeft: 16, paddingRight: 16}} onClick={handlePrint}>
                            <Box direction="row" style={{alignItems: 'center'}}>
                                <Box style={{flex: 1, alignItems: 'flex-end', marginRight: 4}}>
                                    <IoPrint color="white" size={20} />
                                </Box>
                                <Text style={{color: 'white'}} bold>Print</Text>
                                <Box style={{flex: 1}} />
                            </Box>
                        </Button>
                    )}
                </PrintContextConsumer>
            </ReactToPrint>
        </Box>
    );
}

function ViewCardWrapper() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const dataEncoded = window.location.hash.substring(1) || query.get('data').replace(' ', '+');
    if (!dataEncoded) {
        return (
            <Redirect to="/" />
        );
    }

    let json;
    try {
        const bytes = base64.decode(dataEncoded);
        json = utf8.decode(bytes);
    } catch {
        return (
            <Box style={{alignItems: 'center'}}>
                <Text style={{textAlign: 'center'}}><span style={{fontWeight: 'bold'}}>Error: Unable to load card.</span><br />It looks like this URL is malformed.</Text>
            </Box>
        );
    }
    const data = JSON.parse(json);

    if (!data) {
        return (
            <Box style={{alignItems: 'center'}}>
                <Text style={{textAlign: 'center'}}><span style={{fontWeight: 'bold'}}>Error: Unable to load card.</span><br />It looks like this URL is malformed.</Text>
            </Box>
        );
    }

    return <ViewCardContent data={data} />;
}

export default function ViewCard() {
    return (
        <Box style={{flex: 1, backgroundColor: 'rgb(246, 249, 252)'}}>
            <PageContent>
                <Navbar color={Theme.colorPrimary} showCreate={false} />
            </PageContent>
            <PageContent>
                <Box style={{paddingBottom: 52}}>
                    {URLSearchParams ? <ViewCardWrapper /> : (
                        <Box style={{alignItems: 'center'}}>
                            <Text style={{textAlign: 'center'}}><span style={{fontWeight: 'bold'}}>Error: You're using an unsupported browser.</span><br />To view your card, please switch to a supported browser. This web app works best in Google Chrome.</Text>
                        </Box>
                    )}
                </Box>
            </PageContent>
            <Box style={{flex: 1}} />
            <PageContent style={{marginTop: 16, backgroundColor: '#f5f5f5', borderTop: '1px solid rgb(236, 239, 241)'}}>
                <Footer />
            </PageContent>
        </Box>
    );
};
