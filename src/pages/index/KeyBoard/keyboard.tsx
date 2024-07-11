import { Image } from '@tarojs/components';
import DelPng from '@/assets/imgs/del.png';
import ConfirmPng from '@/assets/imgs/confirm.png';

import type { ReactElement } from 'react';
import type { ImageProps } from '@tarojs/components';

export type KeyValueType = Num | 'ok' | 'del';
type Num = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface KeyItem {
    content: Num | ReactElement<ImageProps>;
    value: KeyValueType;
}

const keyboard: KeyItem[] = [
    {
        content: 1,
        value: 1
    },
    {
        content: 2,
        value: 2
    },
    {
        content: 3,
        value: 3
    },
    {
        content: 4,
        value: 4
    },
    {
        content: 5,
        value: 5
    },
    {
        content: 6,
        value: 6
    },
    {
        content: 7,
        value: 7
    },
    {
        content: 8,
        value: 8
    },
    {
        content: 9,
        value: 9
    },
    {
        content: <Image src={DelPng} />,
        value: 'del'
    },
    {
        content: 0,
        value: 0
    },
    {
        content: <Image src={ConfirmPng} />,
        value: 'ok'
    }
];

export default keyboard;
