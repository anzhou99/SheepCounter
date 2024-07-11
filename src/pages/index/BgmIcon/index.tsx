import { useState, useEffect, useRef } from 'react';
import { View, Image } from '@tarojs/components';
import Taro, { InnerAudioContext } from '@tarojs/taro';

import bgm from '@/assets/audio/bgm.mp3';

import style from './index.less';

const BgmIcon = () => {
    const [bgmPlaying, setBgmPlaying] = useState(false);
    const bgmContextRef = useRef<InnerAudioContext>();

    useEffect(() => {
        if (!bgmContextRef.current) {
            bgmContextRef.current = Taro.createInnerAudioContext();
            bgmContextRef.current.volume = 0.8;
            bgmContextRef.current.autoplay = true;
            bgmContextRef.current.loop = true;
            bgmContextRef.current.src = bgm;
            setBgmPlaying(true);
        }
        return () => {
            bgmContextRef.current?.destroy();
        };
    }, []);

    function handleBgm() {
        if (bgmPlaying) {
            bgmContextRef.current?.pause();
            setBgmPlaying(false);
        } else {
            bgmContextRef.current?.play();
            setBgmPlaying(true);
        }
    }

    return (
        <View
            className={`${style.imgBox} ${!bgmPlaying && style.paused}`}
            onClick={handleBgm}
        >
            <Image
                className={style.noteImg}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAADdklEQVR4nL2Xa0/TYBTHF/0SOnyh+A3Uj+ELVHBEFGIId4IhMFw7yy0OhnIxQsIliAF8ZVT0vQmSbd0FMmAbqCCimWyLbFx7I9s45hQYF9fSDvRJztK0p/2t5/mfSzUalQteZ51lrXotazFcFc2q1+I5zb9YvMWQztqIes5unOEdVFCYbAwIXvOyaO7GAO94FMRr6IO+JwayozUXONr4np+oD0UXu+IQHgRYGU5u4UFAH/Tl7OQIS1empQa1EWWcqzYU8/fGJWESFvP3xDknFWKtRIm6PaSNLwRPUwQiQ6qAhywyBILHtMbS5IAiDaDj1pc2JmXgEcNnsTay/xgoUSRMmVaUPtRXlA1rn54c6yd4TSusjayQFpKrNqQmvFO6mzBfnA8zJXdh3dIqG3bORYWSCo6jyQ9qheTLywa+owM2mpvhW1kBzBTlSEYg5u+No9oPQXlr9WVMA7X7h+B1kwm4trbEH3BnZkj68xP1IX6s6tJ+mO1EfXSxK5YK+EdFKUzqbsBSTTVw7e3iOSn/6GJnnLEStQfCbJyVLQ5y4AelsPqxGX716cGbp4OJjOvS94QHgbMbfYm85Z1UIJVU2QOvW57u7OPSAPh7qmTv4ZGFeY1Kw9p7GmAlxrsbA8wYeV7DWvXXtnzm5f8F3vI2L2NX0+CPErDwtRvmiHyYvnMLfHk6mC3PBV+uerDgNf9mxvRX8I21x4UaoZ57WRCupcS0Qds0m2GpqiqFUDcEmNHqczviclFBOWd804PQg6Ya7NwV127Vmt2WSScMbzKoanBYTCdvIo8Z2lAXXeyULCCenExJ8EJ5ITDjzxSBo987Y5yNpPZLpsWQLlcyZ0pyxHJ4FIqVypurg+2wssbCj9cdLpliuO3Eu+jP7u1kN2zQraKCmZaWQ9CF0kIIvjIqn0ps5NskvbgyDccVqbaIZdGTdxvmiu7DfFmBqPLAEKlsbyNDsDMK6bXJe7LDUCg7CESGgZ16DpvOdoiHXirP3emmVZYmy5NCE3Ab2X+qo8/nNoajyT5Z6F7TQLgwfQrD3tTjFc5B9qka+FmroRjHFRSFWmh0b7x1GAoVA/8SHE2O7Az0nTG5no0FCH0wZTiaeCMpJI2KhbnH2EiKo40+LHmCuyHxCYNtjnNQQbzGWEiKH3148cTAZAug7gz2072PNjzGc2of9AdyZeoC/OrizQAAAABJRU5ErkJggg=="
            ></Image>
        </View>
    );
};

export default BgmIcon;
