import { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components';

import KeyBoard from './KeyBoard';
import Input from './Input';
import BgmIcon from './BgmIcon';

import SheepPng from '@/assets/imgs/sheepBody.png';
import SheepLeftEarPng from '@/assets/imgs/sheepLeftEar.png';
import SheepRightEarPng from '@/assets/imgs/sheepRightEar.png';
import SheepEyesPng from '@/assets/imgs/sheepEyes.png';

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

            <Image src={LandPng1} className={style.land1} />
            <Image src={LandPng2} className={style.land2} />
            <Image src={LandPng3} className={style.land3} />
            <View
                className={`${style.sheep} ${isSheepIn ? style.in : style.out}`}
            >
                <Image className={style.sheepBody} src={SheepPng} />
                <Image className={style.sheepLeftEar} src={SheepLeftEarPng} />
                <Image className={style.sheepRightEar} src={SheepRightEarPng} />
                <Image className={style.sheepEyes} src={SheepEyesPng} />
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
