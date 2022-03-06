import { isEmpty } from 'lodash';

// 判断选择的key是否为最后一层的key
export const isLastLevelKey = (dataSource: any, key: any) => {
  let flag = false;
  const deep = (data: any) => {
    return data.some((item: any) => {
      if (item.key === key) {
        if (!item.children || item.children.length <= 0) {
          flag = true;
          return true;
        } else {
          return deep(item.children)
        }
      } else if (item.children && item.children.length > 0) {
        return deep(item.children)
      }
      return false
    })
  }
  deep(dataSource)
  return flag;
};

// 对dataSource进行操作(主要用于disabled)
export const disabledCategoryData = (categoryData: any) => {
  const newData: any = []; 
  categoryData.forEach((item: any) => {
    let obj = {};
    if (Array.isArray(item.children) && item.children.length > 0) {
      const tempData = disabledCategoryData(item.children);
      obj = {
        ...item, // 保留原来信息
        children: tempData,
        disabled: true,
      }
    } else {
      obj = {
        ...item, // 保留原来信息
        disabled: true,
      }
    }
    newData.push(obj);
  })
  return newData;
}

// 多层级数据获得最后一层的所有数据
export const getLastLevelData = (categoryData: any) => {
  const newData: any = [];
  function deep(data: any) {
    data.forEach((item: any) => {
      if (!item.children || isEmpty(item.children)) {
        newData.push(item);
      } else {
        deep(item.children);
      }
    });
  }
  deep(categoryData);
  return newData;
}

// 根据选择的keys(最后一级)生成类目结构数据的方法(type为select时为选择的数据，type为filter为过滤掉选择的数据)
export const filterCategoryData = (selectKeys: any, data: any, type: any, disabled: any) => {
  const newData: any = [];
  data.forEach((item: any) => {
    let obj: any = {};
    if (item.children && item.children.length > 0) {
      const tempData = filterCategoryData(selectKeys, item.children, type, disabled);
      obj = {
        ...item,
        children: tempData,
        disabled,
      };
      if (!isEmpty(obj.children)) {
        newData.push(obj);
      }
    } else if (
      type === 'select' ? selectKeys.includes(item.key) : !selectKeys.includes(item.key)
    ) {
      obj = {
        ...item,
        disabled,
      };
      newData.push(obj);
    }
  });
  return newData;
};
