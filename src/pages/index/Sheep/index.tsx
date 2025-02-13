import { View, Image } from '@tarojs/components';

import SheepPng from '@/assets/imgs/sheepBody.png';
import SheepLeftEarPng from '@/assets/imgs/sheepLeftEar.png';
import SheepRightEarPng from '@/assets/imgs/sheepRightEar.png';
import SheepEyesPng from '@/assets/imgs/sheepEyes.png';
import MortyHeadPng from '@/assets/imgs/mortyHead.png';

import style from './index.less';

function Sheep({ showMorty }: { showMorty: boolean }) {
    return (
        <View className={`${style.main}`}>
            <Image className={style.sheepBody} src={SheepPng} />
            {showMorty && (
                <Image className={style.mortyHead} src={MortyHeadPng} />
            )}
            {!showMorty && (
                <>
                    <Image
                        className={style.sheepLeftEar}
                        src={SheepLeftEarPng}
                    />
                    <Image
                        className={style.sheepRightEar}
                        src={SheepRightEarPng}
                    />
                    <Image className={style.sheepEyes} src={SheepEyesPng} />
                </>
            )}
        </View>
    );
}

export default Sheep;
