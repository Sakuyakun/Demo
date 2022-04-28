export function getImgRawSize(img: HTMLImageElement | string): Promise<{ width: number; height: number }> {
  const $img: HTMLImageElement = typeof img === 'string' ? document.querySelector(img) : img;

  return new Promise((resolve, reject) => {
    if ($img.naturalWidth) {
      resolve({ width: $img.naturalWidth, height: $img.naturalHeight });
    }
    if ($img.complete && !$img.getAttribute('width') && !$img.getAttribute('height')) {
      resolve({ width: $img.width, height: $img.height });
    }

    const image = new Image;
    image.onload = () => {
      resolve({ width: image.width, height: image.height })
    }
    image.onerror = reject;
    image.src = $img.src;
  })
}
