import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import SheepBg from '../../../assets/imgs/sheepBg.png';

import style from './index.less';

const Login = () => {
    const goIndex = () => {
        Taro.navigateTo({
            url: '/pages/index/index'
        });
    };

    const addAnimation = (str: string) =>
        str.split('').map((v: string, i: number) => (
            <Text
                className={style.scale}
                key={i}
                style={{ animationDelay: `${100 + i * 80}ms` }}
            >
                {v}
            </Text>
        ));
    return (
        <View className={style.main}>
            <Image src={SheepBg} className={style.bgImg} />

            <View className={style.logoZone}>
                <View className={style.name}>SHEEP COUNTER</View>
                <View className={style.author}>by Rick</View>
            </View>

            <View className={style.enterZone} onClick={goIndex}>
                {addAnimation('Enter!')}
            </View>
        </View>
    );
};
export default Login;
