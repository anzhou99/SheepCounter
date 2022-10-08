import { useState } from 'react';
import { View } from '@tarojs/components';

import keyboard from './keyboard';

import type { KeyValueType, KeyItem } from './keyboard';

import style from './index.less';

interface Props {
    inputValue: string;
    setInputValue: (val: string) => void;
    sheepCount: number;
    getAnotherSheep: () => void;
    setTip: (tip: string) => void;
}

const MAX_LENGTH = 10;

const KeyBoard = ({
    inputValue,
    setInputValue,
    sheepCount,
    getAnotherSheep,
    setTip
}: Props) => {
    const [failCount, setFailCount] = useState(1);

    const valueHandler = (val: KeyValueType) => {
        if (typeof val === 'number') {
            if (val === 0 && inputValue.length === 0) {
                return;
            }
            if (inputValue.length >= MAX_LENGTH) {
                return;
            }
            setInputValue(inputValue + val);
        } else if (val === 'del') {
            const newVal = inputValue.slice(0, inputValue.length - 1);
            setInputValue(newVal);
        } else if (val === 'ok') {
            if (sheepCount === +inputValue) {
                setInputValue('');
                setFailCount(1);
                getAnotherSheep();
            } else {
                setFailCount(failCount + 1);
                if (failCount > 2) {
                    setTip(sheepCount + '');
                }
            }
        }
    };

    return (
        <View className={style.main}>
            {keyboard.map((v: KeyItem, i: number) => (
                <View
                    className={
                        typeof v.content === 'number'
                            ? style.numberKey
                            : style.functionKey
                    }
                    hover-class={style.push}
                    key={i}
                    onClick={() => valueHandler(v.value)}
                >
                    {v.content}
                </View>
            ))}
        </View>
    );
};

export default KeyBoard;
