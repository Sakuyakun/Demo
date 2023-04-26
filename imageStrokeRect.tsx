import * as React from 'react';
import { useEffect, useRef, memo, useMemo, CSSProperties } from 'react';

interface Positions {
  xmax: number;
  xmin: number;
  ymax: number;
  ymin: number;
  label?: string;
}

export interface ImageDraw {
  src: string;
  width: number;
  positions?: Positions[];
  wrapperStyle?: CSSProperties;
  title?: string;
  beforeStrokeRect?: Partial<CanvasRenderingContext2D>;
  afterStrokeRect?: Partial<CanvasRenderingContext2D>;
}

const getHeight = (width: number, ratio: number): number =>
  Math.floor(width * ratio);

const ImageDraw = memo((props: ImageDraw) => {
  const ratio = 9 / 16;
  const canvasHeight = getHeight(props.width, ratio);
  const canvasRef = useRef();
  const img = useMemo(() => {
    const image = new Image();
    image.setAttribute('crossOrigin', 'Anonymous');
    image.src = props.src;
    return image;
  }, [props.src]);

  useEffect(() => {
    let canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    let canvasContext = canvas.getContext('2d');
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    img.onload = () => {
      canvas.height = canvasHeight;
      canvas.width = props.width;

      canvasContext.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // 首先将图片四个坐标除以图片原始宽高得到坐标点比例
      const drawRectData = props.positions.map((position: Positions) => {
        return {
          x1: position.xmin / img.naturalWidth,
          y1: position.ymin / img.naturalHeight,
          x2: position.xmax / img.naturalWidth,
          y2: position.ymax / img.naturalHeight,
          label: position?.label,
        };
      });

      canvasContext.strokeStyle = '#f03d3d';
      canvasContext.fillStyle = '#f03d3d';
      canvasContext.font = 'bold 14px Arial';

      for (let key in props.beforeStrokeRect) {
        canvasContext[key] = props.beforeStrokeRect[key];
      }

      // 将坐标点比例乘以canvas画布宽高得到位置
      drawRectData.forEach((data) => {
        canvasContext.strokeRect(
          Math.min(data.x1, data.x2) * canvas.width,
          Math.min(data.y1, data.y2) * canvas.height,
          Math.abs(data.x1 - data.x2) * canvas.width,
          Math.abs(data.y1 - data.y2) * canvas.height
        );

        if (data.label) {
          canvasContext.fillText(
            data.label,
            Math.min(data.x1, data.x2) * canvas.width,
            Math.min(data.y1, data.y2) * canvas.height - 5
          );
        }
      });

      for (let key in props.afterStrokeRect) {
        canvasContext[key] = props.afterStrokeRect[key];
      }
    };

    if (img.complete) {
      img.onload(null as any);
    } else {
      img.src = props.src;
    }
  }, [props.width, props.positions, props.src]);

  return (
    <div style={{ ...props?.wrapperStyle }}>
      {props.src ? (
        <canvas
          ref={canvasRef}
          width={props.width}
          height={getHeight(props.width, ratio)}
        />
      ) : (
        <div
          style={{
            width: props.width,
            height: getHeight(props.width, ratio),
            background: '#dfdfdf',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          暂无图片
        </div>
      )}
    </div>
  );
});

export default ImageDraw;
