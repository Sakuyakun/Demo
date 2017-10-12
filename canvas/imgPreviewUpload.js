const eleFile = document.getElementById('eleFile'),  //file input dom
      reader = new FileReader(),
      img = new Image(),
      canvas = document.querySelector('#cvs'),  // canvas dom
      context = canvas.getContext('2d');

let file = null

// input上传图片
eleFile.onchange = event => {
  file = event.target.files[0];
  file.type.indexOf('image') === 0 ? reader.readAsDataURL(file) : '';
}

// 文件base64化，以便获知图片原始尺寸
reader.onload = event => {
  img.src = event.target.result
}

img.onload = () => {
  const originWidth = img.width,
        originHeight = img.height,
        maxWidth = 400,
        maxHeight = 400;
  let targetWidth = originWidth,
      targetHeight = originHeight;

  // 图片等比处理
  if (originWidth > maxWidth || originHeight > maxHeight) {
    if (originWidth / originHeight > 1) {
      targetWidth = maxWidth;
      targetHeight = Math.round(maxWidth * (originHeight / originWidth));
    } else {
      targetHeight = maxHeight;
      targetWidth = Math.round(maxHeight * (originWidth / originHeight));
    }
  }
  
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  
  /*
  context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
  
  img
  图片对象，可以是页面上获取的DOM对象，也可以是虚拟DOM中的图片对象
  
  sx,sy,swidth,sheight
  在canvas画布上画一片区域用来放置图片，sx,sy为左上角坐标，swidth,sheight指区域大小。如果没有指定后面4个参数，则图片会被拉伸或缩放在这片区域内
  
  x,y,width,height
  就是图片在canvas画布上显示的大小和位置。如果这里的width,height的值就是图片的原始尺寸，则最终的表现效果是图片剪裁于swidth,sheight区域内
  */
  context.clearRect(0,0, targetWidth, targetHeight);
  context.drawImage(img, 0, 0, targetWidth, targetHeight);
  
  canvas.toBlob(blob => {
    console.log(blob)
    // const xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function() {
    //     if (xhr.status == 200) {
    //         // xhr.responseText
    //     }
    // };
    // xhr.open("POST", 'xxx/xxx', true);
    // xhr.send(blob);
  }, file.type || 'image/png')
}
