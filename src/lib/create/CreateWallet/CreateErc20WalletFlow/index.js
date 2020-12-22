import {useState} from 'react';

import Box from '@/lib/components/Box';
import Button from '@/lib/components/Button';
import Text from '@/lib/components/Text';
import TextInput from '@/lib/components/TextInput';

import Theme from '@/lib/styling/theme';

import {IoMdArrowBack} from 'react-icons/io';

export default function CreateErc20WalletFlow({onBack, onAddErc20Token}) {
    const [tokenName, setTokenName] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');

    const addDisabled = !(tokenName && tokenAddress && tokenSymbol && tokenAddress.startsWith('0x'));

    return (
        <Box>
            <Box style={{borderBottom: '1px solid #ddd', padding: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                <Box style={{flex: 1, justifyContent: 'center'}}>
                    <Box style={{cursor: 'pointer'}} onClick={onBack}>
                        <IoMdArrowBack size={24} color="#555" />
                    </Box>
                </Box>
                <Text textStyle="title" style={{opacity: 0.92}}>Add Custom ERC-20 Token</Text>
                <Box style={{flex: 1}} />
            </Box>
            <Box style={{padding: 16}}>
                <Text style={{marginBottom: 4}} textStyle="caption" secondary bold>Token Name</Text>
                <TextInput value={tokenName} onChange={(ev) => setTokenName(ev.target.value)} placeholder="ABC Token" />

                <Text style={{marginTop: 20, marginBottom: 4}} textStyle="caption" secondary bold>Token Contract Address</Text>
                {tokenAddress && !tokenAddress.startsWith('0x') && <Text style={{color: Theme.colorPrimary, marginBottom: 4}} textStyle="caption" bold>Address must start with "0x".</Text>}
                <TextInput value={tokenAddress} onChange={(ev) => setTokenAddress(ev.target.value)} placeholder="0x..." />

                <Text style={{marginTop: 20, marginBottom: 4}} textStyle="caption" secondary bold>Token Symbol</Text>
                <TextInput value={tokenSymbol} onChange={(ev) => setTokenSymbol(ev.target.value.toUpperCase())} placeholder="ABC" />

                <Button onClick={() => onAddErc20Token(tokenName, tokenAddress, tokenSymbol)}style={{marginTop: 20, paddingTop: 12, paddingBottom: 12, borderRadius: 4, backgroundColor: addDisabled ? '#ccc' : Theme.colorAccent}} disabled={addDisabled}>
                    <Text style={{color: '#fff'}}bold>Add</Text>
                </Button>
            </Box>
        </Box>
    )
}
