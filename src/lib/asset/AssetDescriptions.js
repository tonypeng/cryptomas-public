import BitcoinLogo from "@/lib/frontpage/SupportedCryptocurrencies/bitcoin_logo.png";
import EthereumLogo from "@/lib/frontpage/SupportedCryptocurrencies/ethereum_logo.png";
import LitecoinLogo from "@/lib/frontpage/SupportedCryptocurrencies/litecoin_logo.png";
import AlgorandLogo from "@/lib/frontpage/SupportedCryptocurrencies/algorand_logo.png";
import DogecoinLogo from "@/lib/frontpage/SupportedCryptocurrencies/dogecoin_logo.png";
import ChainlinkLogo from "@/lib/frontpage/SupportedCryptocurrencies/chainlink_logo.png";
import TetherLogo from "@/lib/frontpage/SupportedCryptocurrencies/tether_logo.png";
import UsdcLogo from "@/lib/frontpage/SupportedCryptocurrencies/usdc_logo.png";
import UniswapLogo from "@/lib/frontpage/SupportedCryptocurrencies/uniswap_logo.png";
import YfiLogo from "@/lib/frontpage/SupportedCryptocurrencies/yfi_logo.png";
import AmpleforthLogo from "@/lib/frontpage/SupportedCryptocurrencies/ampleforth_logo.png";

const Big = require('toformat')(require('big.js'));

export default Object.freeze({
    btc: {
        icon: BitcoinLogo,
        name: 'Bitcoin',
        ticker: 'BTC',
        wif: true,
        decimalPlaces: 4,
        fetchBalance: async (addr) => {
            try {
                const resp = await fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${addr}/balance`);
                const json = await resp.json();
                const balanceSats = new Big(json.balance);
                return balanceSats.div(1e8);
            } catch {
                return null;
            }
        },
        fetchPrice: async () => {
            try {
                const resp = await fetch(
                    'https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false');
                const json = await resp.json();
                const usdPriceStr = json.market_data?.current_price?.usd;
                if (!usdPriceStr) {
                    return null;
                }
                return new Big(usdPriceStr);
            } catch {
                return null;
            }
        },
    },
    eth: {
        icon: EthereumLogo,
        name: 'Ethereum',
        ticker: 'ETH',
        wif: false,
        decimalPlaces: 3,
        fetchBalance: async (addr) => {
            try {
                const resp = await fetch(`https://api.blockcypher.com/v1/eth/main/addrs/${addr}/balance`);
                const json = await resp.json();
                const balanceSats = new Big(json.balance);
                return balanceSats.div(1e18);
            } catch {
                return null;
            }
        },
        fetchPrice: async () => {
            try {
                const resp = await fetch(
                    'https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false');
                const json = await resp.json();
                const usdPriceStr = json.market_data?.current_price?.usd;
                if (!usdPriceStr) {
                    return null;
                }
                return new Big(usdPriceStr);
            } catch {
                return null;
            }
        },
    },
    ltc: {
        icon: LitecoinLogo,
        name: 'Litecoin',
        ticker: 'LTC',
        wif: true,
        decimalPlaces: 3,
        fetchBalance: async (addr) => {
            try {
                const resp = await fetch(`https://api.blockcypher.com/v1/ltc/main/addrs/${addr}/balance`);
                const json = await resp.json();
                const balanceSats = new Big(json.balance);
                return balanceSats.div(1e8);
            } catch {
                return null;
            }
        },
        fetchPrice: async () => {
            try {
                const resp = await fetch(
                    'https://api.coingecko.com/api/v3/coins/litecoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false');
                const json = await resp.json();
                const usdPriceStr = json.market_data?.current_price?.usd;
                if (!usdPriceStr) {
                    return null;
                }
                return new Big(usdPriceStr);
            } catch {
                return null;
            }
        },
    },
    algo: {
        icon: AlgorandLogo,
        name: 'Algorand',
        ticker: 'ALGO',
        wif: false,
        decimalPlaces: 0,
        fetchBalance: async (addr) => {
            try {
                const resp = await fetch(`https://api.algoexplorer.io/v2/accounts/${addr}`);
                const json = await resp.json();
                const balanceSats = new Big(json.amount);
                return balanceSats.div(1e6);
            } catch (err) {
                return null;
            }
        },
        fetchPrice: async () => {
            try {
                const resp = await fetch(
                    'https://api.coingecko.com/api/v3/coins/algorand?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false');
                const json = await resp.json();
                const usdPriceStr = json.market_data?.current_price?.usd;
                if (!usdPriceStr) {
                    return null;
                }
                return new Big(usdPriceStr);
            } catch {
                return null;
            }
        },
    },
    doge: {
        icon: DogecoinLogo,
        name: 'Dogecoin',
        ticker: 'DOGE',
        wif: true,
        decimalPlaces: 0,
        fetchBalance: async (addr) => {
            try {
                const resp = await fetch(`https://api.blockcypher.com/v1/doge/main/addrs/${addr}/balance`);
                const json = await resp.json();
                const balanceSats = new Big(json.balance);
                return balanceSats.div(1e8);
            } catch {
                return null;
            }
        },
        fetchPrice: async () => {
            try {
                const resp = await fetch(
                    'https://api.coingecko.com/api/v3/coins/dogecoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false');
                const json = await resp.json();
                const usdPriceStr = json.market_data?.current_price?.usd;
                if (!usdPriceStr) {
                    return null;
                }
                return new Big(usdPriceStr);
            } catch {
                return null;
            }
        },
    },
    link: {
        icon: ChainlinkLogo,
        name: 'Chainlink',
        ticker: 'LINK',
        decimalPlaces: 4,
        erc20: {
            tokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
        },
    },
    usdt: {
        icon: TetherLogo,
        name: 'Tether',
        ticker: 'USDT',
        decimalPlaces: 4,
        erc20: {
            tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        },
    },
    usdc: {
        icon: UsdcLogo,
        name: 'USD Coin',
        ticker: 'USDC',
        decimalPlaces: 4,
        erc20: {
            tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        },
    },
    uni: {
        icon: UniswapLogo,
        name: 'Uniswap',
        ticker: 'UNI',
        decimalPlaces: 4,
        erc20: {
            tokenAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        },
    },
    yfi: {
        icon: YfiLogo,
        name: 'yearn.finance',
        ticker: 'YFI',
        decimalPlaces: 4,
        erc20: {
            tokenAddress: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
        },
    },
    ampl: {
        icon: AmpleforthLogo,
        name: 'Ampleforth',
        ticker: 'AMPL',
        decimalPlaces: 4,
        erc20: {
            tokenAddress: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
        },
    },
});
