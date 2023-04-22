import React, { useEffect, useState } from 'react'
import mammoth from 'mammoth'
import { Spin, message } from 'antd'
import Request from 'common/utils/api'

import './index.less'

// https://github.com/plangrid/react-file-viewer/blob/master/src/components/drivers/docx-viewer.jsx
export default (props: any) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (props.visible) {
      setLoading(true)
      const reqFn = async () => {
        const res = await Request({
          url: '/api/v1/inspect/reportmanage/preview',
          method: 'get',
          params: {
            id: props.id,
          },
          responseType: 'arraybuffer',
        })
        mammoth
          .convertToHtml({ arrayBuffer: res.data }, { includeDefaultStyleMap: true })
          .then((result) => {
            setLoading(false)
            const docxHtml = result.value
            const createDocxEle = document.createElement('div')
            createDocxEle.className = 'document-container'
            createDocxEle.innerHTML = docxHtml
            const wrapEle: any = document.getElementById('docx')
            wrapEle.innerHTML = createDocxEle.outerHTML
            document.querySelectorAll('#docx a').forEach((node: any) => {node.target = '_blank'})
          })
          .catch((err) => {
            setLoading(false)
            message.error('报告加载失败')
          })
      }
      reqFn()
    }
  }, [props.visible, props.id])

  return (
    <div className='docx-viewer-wrap'>
      {loading ? (
        <div className='docx-container'>
          <Spin spinning={true} />
        </div>
      ) : (
        <div className='docx-container' id='docx'>
          暂无报告预览
        </div>
      )}
    </div>
  )
}
