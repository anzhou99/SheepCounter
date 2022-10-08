import { View, Text } from '@tarojs/components';
import style from './index.less';

interface Props {
    inputValue: string;
    tip: string;
}

const Input = ({ inputValue, tip }: Props) => {
    return (
        <View className={style.inputZone}>
            <View className={style.sInput}>
                {inputValue?.split('').map((v: string, i: number) => (
                    <Text key={i} className={style.sValue}>
                        {v}
                    </Text>
                ))}
                <View className={style.sCursor} />
            </View>
            {tip && !inputValue ? (
                <Text className={style.sTip}>{tip}</Text>
            ) : null}
        </View>
    );
};

export default Input;
