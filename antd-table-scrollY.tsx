import React, { useRef } from 'react'
import { useDebounceEffect, useSize } from 'ahooks'

export default () => {
  const wrapRef = useRef(null)
  const wrapSize = useSize(wrapRef)
  const [tableScrollY, setTableScrollY] = useState(460)
  useDebounceEffect(
    () => {
      if (wrapSize?.height) setTableScrollY(460 + (wrapSize.height - 165))
    },
    [wrapSize],
    { wait: 100 }
  )

  return (
    <Table
      scroll={{ y: `calc(100vh - ${tableScrollY}px)`, }}
    />
  )
}
