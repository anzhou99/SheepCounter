import { useEffect, useRef, useState } from 'react';
import { View } from '@tarojs/components';
import Taro, { InnerAudioContext } from '@tarojs/taro';

import keyboard from './keyboard';
import sheepAudio from '@/assets/audio/sheep.mp3';
import clickAudio from '@/assets/audio/click.mp3';
import errorAudio from '@/assets/audio/error.mp3';

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
    // const [audioPlaying, setBgmPlaying] = useState(false);
    const audioContextRef = useRef<InnerAudioContext>();

    useEffect(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = Taro.createInnerAudioContext();
            audioContextRef.current.volume = 0.2;
            audioContextRef.current.autoplay = false;
            audioContextRef.current.playbackRate = 1.2;
        }
        // audioContextRef.current.src = bgm;

        // setBgmPlaying(true);
        return () => {
            audioContextRef.current?.destroy();
        };
    }, []);

    const [failCount, setFailCount] = useState(1);

    const valueHandler = (val: KeyValueType) => {
        if (typeof val === 'number') {
            audioContextRef.current!.src = clickAudio;
            audioContextRef.current!.play();

            if (val === 0 && inputValue.length === 0) {
                return;
            }
            if (inputValue.length >= MAX_LENGTH) {
                return;
            }

            setInputValue(inputValue + val);
        } else if (val === 'del') {
            audioContextRef.current!.src = clickAudio;
            audioContextRef.current!.play();

            const newVal = inputValue.slice(0, inputValue.length - 1);
            setInputValue(newVal);
        } else if (val === 'ok') {
            if (sheepCount === +inputValue) {
                audioContextRef.current!.src = sheepAudio;
                audioContextRef.current!.play();

                setInputValue('');
                setFailCount(1);
                getAnotherSheep();
            } else {
                audioContextRef.current!.src = errorAudio;
                audioContextRef.current!.play();

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
