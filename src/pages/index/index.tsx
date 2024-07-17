import { useState, useRef } from 'react';
import Taro, { useReady } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import KeyBoard from './KeyBoard';
import Input from './Input';
import Sheep from './Sheep';
import BgmIcon from './BgmIcon';
import Sky from './Sky';

import LandPng1 from '@/assets/imgs/land1.png';
import LandPng2 from '@/assets/imgs/land2.png';
import LandPng3 from '@/assets/imgs/land3.png';

import style from './index.less';

function lanuchAnmiate(selector, { translateX, translateY }, time, callback) {
    Taro?.getCurrentInstance()?.page?.animate?.(
        selector,
        [
            {
                translateX: 0,
                translateY: 0,
                scale: [1, 1],
                ease: 'cubic-bezier(0.28, 0.58, 0.4, 0.73)',
                transformOrigin: 'top left',
                offset: 0
            },
            {
                translateX: `${translateX.toFixed(0)}px`,
                translateY: `${translateY.toFixed(0)}px`,
                scale: [0, 0],
                ease: 'cubic-bezier(0.28, 0.58, 0.4, 0.73)',
                transformOrigin: 'top left',
                offset: 1
            }
        ],
        time,
        callback
    );
}

function enterAnimate(selector, option, time, callback) {
    Taro?.getCurrentInstance()?.page?.animate?.(
        selector,
        [
            {
                translateX: `100vw`,
                translateY: `-50px`,
                scale: [0, 0],
                ease: 'linear',
                transformOrigin: 'top left',
                offset: 0
            },
            {
                translateX: 0,
                translateY: 0,
                scale: [1, 1],
                ease: 'linear',
                transformOrigin: 'top left',
                offset: 1
            }
        ],
        time,
        callback
    );
}

const Index = () => {
    const [sheepCount, setSheepCount] = useState(1);

    const [inputValue, setInputValue] = useState('');
    const [tip, setTip] = useState('');

    const SkyRef = useRef<{
        getPointPosition: () => {
            x: number;
            y: number;
            top: number;
            left: number;
        };
        drawPoint: (x: number, y: number) => void;
    }>();

    const SheepBoundingRef = useRef({ top: 0, left: 0 });
    function getAnotherSheep() {
        setSheepCount(sheepCount + 1);
        if (tip) setTip('');

        const { x, y, top, left } = SkyRef.current!.getPointPosition();

        lanuchAnmiate(
            '#sheep',
            {
                translateX: left - SheepBoundingRef.current.left,
                translateY: top - SheepBoundingRef.current.top
            },
            200,
            () => {
                SkyRef.current!.drawPoint(x, y);
                enterAnimate('#sheep', {}, 100, () => {
                    Taro?.getCurrentInstance()?.page?.clearAnimation?.(
                        '#sheep',
                        () => null
                    );
                });
            }
        );
    }

    useReady(() => {
        const query = Taro.createSelectorQuery();
        query.select('#sheep').boundingClientRect();
        query.exec((res) => {
            SheepBoundingRef.current = { top: res[0].top, left: res[0].left };
        });
    });

    return (
        <View className={style.main} id="main">
            <View className={style.topArea}>
                <View className={style.sky}>
                    <Sky ref={SkyRef}></Sky>
                </View>

                <View className={style.icon}>
                    <BgmIcon />
                </View>

                <View id="sheep" className={style.sheep}>
                    <Sheep></Sheep>
                </View>
            </View>
            <View className={style.bottomArea}>
                <View className={style.bgGroup}>
                    <Image src={LandPng1} className={style.land1} id="land1" />
                    <Image src={LandPng2} className={style.land2} />
                    <Image src={LandPng3} className={style.land3} />
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
        </View>
    );
};
export default Index;
