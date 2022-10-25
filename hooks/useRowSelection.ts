import { useDebounceEffect } from 'ahooks'
import React, { useState, useCallback } from 'react'

declare type Key = React.Key
type RowKeysWithPageNum = {
  [key: string]: Key[]
}

// 在有分页的情况下，保留不同页面的勾选项
// selectedRowKeys [1: [rowkey1, rowkey2], 2: [rowkey3]]
// computedRowKeys [rowkey1, rowkey2, rowkey3]
export default () => {
  const [selectedRow, setSelectedRow] = useState<any>({})
  const [computedRow, setComputedRow] = useState<Key[]>([])

  const [selectedRowKeys, setSelectedRowKeys] = useState<RowKeysWithPageNum>({})
  const [computedRowKeys, setComputedRowKeys] = useState<Key[]>([])

  const handleCancelAllSelect = useCallback(() => {
    setSelectedRowKeys({})
  }, [])

  const handleRowSelectChange = (rowkeys_curr: Key[], currPage: string, row?: any) => {
    let newObj: RowKeysWithPageNum = {
      ...selectedRowKeys,
    }
    newObj[currPage] = rowkeys_curr
    setSelectedRowKeys(newObj)

    if ((row ?? '') !== '') {
      let newRowObj = {
        ...selectedRow,
      }
      newRowObj[currPage] = row
      setSelectedRow(newRowObj)
    }
  }

  useDebounceEffect(
    () => {
      let rowkeys_count: Key[] = []
      let row_count: any = []
      let keys = Object.keys(selectedRowKeys)
      if (keys.length) {
        keys.forEach((rowkeys: string) => {
          rowkeys_count = [...rowkeys_count, ...selectedRowKeys[rowkeys]]
          selectedRow[rowkeys] && (row_count = [...row_count, ...selectedRow[rowkeys]])
        })
      }
      setComputedRowKeys(rowkeys_count)
      setComputedRow(row_count)
    },
    [selectedRowKeys],
    { wait: 0 }
  )

  return {
    computedRow,
    computedRowKeys,
    handleRowSelectChange,
    handleCancelAllSelect,
  }
}
