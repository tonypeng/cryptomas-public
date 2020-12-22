import {useState} from 'react';

import Modal from 'react-modal';

import base64 from 'base-64';
import utf8 from 'utf8';
import buildUrl from '@/lib/display/buildUrl';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import Constants from '@/lib/constants';
import Theme from '@/lib/styling/theme';

import Box from '@/lib/components/Box';
import Button from '@/lib/components/Button';
import Text from '@/lib/components/Text';
import TextInput from '@/lib/components/TextInput';

import {IoIosClose} from 'react-icons/io';
import {IoWarning} from 'react-icons/io5';

const Styles = {
    root: {
        overlay: {
            zIndex: 10000,
            background: 'rgba(77, 0, 10, 0.2)',
        },
        content: {
            height: 196,
            width: 400,
            padding: 0,
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -200,
            marginLeft: -200,
            // borderRadius: 20,
            border: 'none',
        },
    },
};

export default function GenerateLink({isOpen, onRequestClose, card}) {
    const json = JSON.stringify(card);
    const bytes = utf8.encode(json);
    const serialized = base64.encode(bytes);

    const url = buildUrl('/card?data=' + serialized, true, Constants.WEBSITE_SHORT_URL);

    const [copied, setCopied] = useState(false);

    return (
        <Modal isOpen={isOpen} style={Styles.root}>
            <Box style={{height: 196}}>
                <Box style={{borderBottom: '1px solid #ddd', padding: 8, alignItems: 'center', flexDirection: 'row'}}>
                    <Box style={{flex: 1}} />
                    <Text textStyle="title" style={{opacity: 0.92}}>Shareable Link</Text>
                    <Box style={{flex: 1, alignItems: 'flex-end'}}>
                        <Box style={{cursor: 'pointer'}} onClick={onRequestClose}>
                            <IoIosClose size={40} color="#555" />
                        </Box>
                    </Box>
                </Box>
                <Box style={{overflowY: 'auto', flex: 1}}>
                    <Box direction="row" style={{borderBottom: '1px solid #ffcc00', backgroundColor: 'rgba(255, 204, 0, 0.2)', padding: 8}}>
                        <Box style={{width: 20}}>
                            <IoWarning color="#ffcc00" size={20} />
                        </Box>
                        <Text textStyle="caption" secondary bold style={{marginLeft: 4}}>Anyone with the link can view the card and withdraw funds. Only send it over a private, secure channel. Test the link to make sure it works.</Text>
                    </Box>
                    <Box style={{padding: 16}} direction="row">
                        <TextInput value={url} style={{borderTopRightRadius: 0, borderBottomRightRadius: 0, flex: 1, height: 18, borderRight: 'none', outline: 'none'}} readOnly onFocus={(evt) => evt.target.select()} />
                        <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
                            <Button style={{height: 36, marginTop: 0, backgroundColor: Theme.colorAccent, borderTopRightRadius: 4, borderBottomRightRadius: 4}}>
                                <Box style={{width: 48, alignItems: 'center'}}>
                                    <Text style={{color: 'white'}} bold>{copied ? 'Copied!' : 'Copy'}</Text>
                                </Box>
                            </Button>
                        </CopyToClipboard>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
