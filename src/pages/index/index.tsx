import { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components';

import KeyBoard from './KeyBoard';
import Input from './Input';
import BgmIcon from './BgmIcon';

import SheepPng from '@/assets/imgs/sheep.png';
import MoonPng from '@/assets/imgs/moon.png';
import LandPng1 from '@/assets/imgs/land1.png';
import LandPng2 from '@/assets/imgs/land2.png';
import LandPng3 from '@/assets/imgs/land3.png';

import style from './index.less';

const Index = () => {
    const [isSheepIn, setIsSheepIn] = useState(true);
    const [sheepCount, setSheepCount] = useState(1);

    const [inputValue, setInputValue] = useState('');
    const [tip, setTip] = useState('');

    const getAnotherSheep = () => {
        setSheepCount(sheepCount + 1);
        setIsSheepIn(false);
        if (tip) setTip('');
        setTimeout(() => {
            setIsSheepIn(true);
        }, 200);
    };

    return (
        <View className={style.main}>
            <View className={style.icon}>
                <BgmIcon />
            </View>

            {/* <Image src={MoonPng} className={style.moon} /> */}
            <Image src={LandPng1} className={style.land1} />
            <Image src={LandPng2} className={style.land2} />
            <Image src={LandPng3} className={style.land3} />
            <View
                className={`${style.sheep} ${isSheepIn ? style.in : style.out}`}
            >
                <Image src={SheepPng} />
            </View>
            <View className={style.input}>
                <Input inputValue={inputValue} tip={tip} />
            </View>
            <View className={style.keyboard}>
                <KeyBoard
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    sheepCount={sheepCount}
                    getAnotherSheep={getAnotherSheep}
                    setTip={setTip}
                />
            </View>
        </View>
    );
};
export default Index;
