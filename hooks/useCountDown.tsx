// const { done, start, count, times } = useCountDown({
//   count: 60,
//   autoPlay: false,
// })

import { useState } from "react"

export default (props: { count: number; autoPlay: boolean }) => {
  const [state, setState] = useState<number>(props.count)
  const [times, setTimes] = useState<number>(0)

  const startCountDown = () => {
    setState((val: number) => val - 1)
    const handle = setInterval(() => {
      setState((val: number) => {
        if (val - 1 > 0) {
          return val - 1
        } else {
          clearInterval(handle)
          setTimes((v: number) => v + 1)
          return props.count;
        }
      });
    }, 1000);
  };
  if (props.autoPlay) {
    startCountDown()
  }
  return {
    count: state,
    start: startCountDown,
    done: state === props.count,
    times,
  }
}
