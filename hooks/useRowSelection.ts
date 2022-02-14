import { useState, useEffect, useCallback } from 'react'

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>({})
  const [computedRowKeys, setComputedRowKeys] = useState<any>([])

  const handleCancelAllSelect = () => {
    setSelectedRowKeys({})
  }

  const handleRowSelectChange = useCallback((rowkeys_curr: any, currPage: number) => {
    let newObj = {
      ...selectedRowKeys,
    }
    newObj[currPage] = rowkeys_curr
    setSelectedRowKeys(newObj)
  }, [selectedRowKeys])

  useEffect(() => {
    let rowkeys_count: any = []
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
