import React, { useState, useEffect, useCallback } from 'react'

declare type Key = React.Key
type RowKeysWithPageNum = {
  [key: string]: Key[]
}

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<RowKeysWithPageNum>({})
  const [computedRowKeys, setComputedRowKeys] = useState<Key[]>([])

  const handleCancelAllSelect = useCallback(() => {
    setSelectedRowKeys({})
  }, [])

  const handleRowSelectChange = (rowkeys_curr: Key[], currPage: string) => {
    let newObj: RowKeysWithPageNum = {
      ...selectedRowKeys,
    }
    newObj[currPage] = rowkeys_curr
    setSelectedRowKeys(newObj)
  }

  useEffect(() => {
    let rowkeys_count: Key[] = []
    let keys = Object.keys(selectedRowKeys)
    if (keys.length) {
      keys.forEach((rowkeys: string) => {
        rowkeys_count = [
          ...rowkeys_count,
          ...selectedRowKeys[rowkeys]
        ]
      })
    }
    setComputedRowKeys(rowkeys_count)
  }, [selectedRowKeys])

  return {
    computedRowKeys,
    handleRowSelectChange,
    handleCancelAllSelect
  }
}
