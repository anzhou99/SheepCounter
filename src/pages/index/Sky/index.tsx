import { useRef, forwardRef, useImperativeHandle } from 'react';
import Taro, { CanvasContext, useReady } from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components';

import style from './index.less';

const Sky = forwardRef(function Sky(_, ref) {
    const SkyMainSizeRef = useRef({
        width: 0,
        height: 0,
        top: 0,
        left: 0
    });
    const StarCanvasCtxRef = useRef<CanvasContext>();
    const ShootingCanvasCtxRef = useRef<CanvasContext>();
    useReady(() => {
        const query = Taro.createSelectorQuery();
        query.select('#skyMain').boundingClientRect();
        query.select('#starCanvas').context();
        query.select('#shootingCanvas').context();
        query.exec(
            ([
                { width, height, top, left },
                { context: starCanvasContext },
                { context: shootingCanvasContext }
            ]) => {
                SkyMainSizeRef.current = {
                    width,
                    height,
                    top,
                    left
                };
                StarCanvasCtxRef.current = starCanvasContext;
                ShootingCanvasCtxRef.current = shootingCanvasContext;
            }
        );
    });

    function getPointPosition() {
        const margin = 2;
        const x =
            Math.random() * (SkyMainSizeRef.current.width - 2 * margin) +
            margin;
        const y =
            Math.random() * (SkyMainSizeRef.current.height - 2 * margin) +
            margin;

        return {
            x,
            y,
            top: y + SkyMainSizeRef.current.top,
            left: x + SkyMainSizeRef.current.left
        };
    }
    function drawStar(x, y, radius, color, isBlur) {
        const canvasContext = StarCanvasCtxRef.current!;
        canvasContext.beginPath();
        canvasContext.arc(x, y, radius, 0, Math.PI * 2, false);

        canvasContext.fillStyle = color;
        if (isBlur) {
            canvasContext.shadowColor = color;
            canvasContext.shadowBlur = radius * 3;
        }
        canvasContext.fill();
        canvasContext.draw(true);
    }

    function shooting() {
        const canvasContext = ShootingCanvasCtxRef.current!;
        canvasContext.strokeStyle = '#fff';
        canvasContext.lineWidth = 1;

        canvasContext.beginPath();
        canvasContext.moveTo(25, 25);
        canvasContext.lineTo(105, 25);
        canvasContext.stroke();
        canvasContext.draw(true);
    }

    function drawPoint(x: number, y: number) {
        drawStar(x, y, 1 + Math.random() * 1.5, 'white', Math.random() > 0.5);
        // shooting();
    }

    useImperativeHandle(
        ref,
        () => ({
            getPointPosition,
            drawPoint
        }),
        []
    );

    return (
        <View className={style.main} id="skyMain">
            <Canvas canvasId="starCanvas" id="starCanvas"></Canvas>
            <Canvas canvasId="shootingCanvas" id="shootingCanvas"></Canvas>
        </View>
    );
});

export default Sky;
