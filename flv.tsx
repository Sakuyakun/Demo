import React, { useEffect, useRef } from 'react'
import flvjs from 'flv.js'

// https://github.com/Bilibili/flv.js/blob/master/docs/api.md#flvjsevents
interface IF {
  style?: object,
  url: string,
  cfg?: object,
  type: 'flv' | 'mp4',
  className?: string,
  errorcb?: Function,
  isLive?: boolean,
  filesize?: number,
}

const flvideo = (props: IF) => {
  const { style, url, cfg, type, className, errorcb, isLive, filesize } = props
  const flvRef = useRef<flvjs.Player>()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const errorHandle = () => {
      if (errorcb) errorcb()
      console.error('视频加载出错')
    }

    if (flvjs.isSupported()) {
      flvRef.current = flvjs.createPlayer({
        url,
        type,
        isLive,
        filesize
      }, cfg)
      if (videoRef.current) {
        flvRef.current.attachMediaElement(videoRef.current)
        flvRef.current.load()
        flvRef.current.on('error', errorHandle)
      }
    }

    return function unmount () {
      if (flvRef.current) {
        flvRef.current.off('error', errorHandle)
        flvRef.current.unload()
        flvRef.current.detachMediaElement()
        flvRef.current.destroy()
      }
    }
  }, [props.url])

  return (
    <video
      className={className}
      ref={videoRef}
      controls={true}
      style={Object.assign({
        width: '100%',
      }, style)}
    >
      {`您的浏览器不支持HTML5视频播放，建议使用 Chrome 浏览器`}
    </video>
  )
}

export default flvideo
