import style from './index.less';

const Atom = () => {
    return (
        <view className={`${style.atom}`}>
            <view className={`${style.center}`}>42</view>
            <view className={`${style.orbit} ${style.orbit1}`}>
                <view className={`${style.electron} ${style.electron1}`}>
                    42
                </view>
            </view>
            <view className={`${style.orbit} ${style.orbit2}`}>
                <view className={`${style.electron} ${style.electron2}`}>
                    42
                </view>
            </view>
            <view className={`${style.orbit} ${style.orbit3}`}>
                <view className={`${style.electron} ${style.electron3}`}>
                    42
                </view>
            </view>
        </view>
    );
};
export default Atom;
