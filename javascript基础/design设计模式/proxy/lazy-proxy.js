const PLACEHOLDER_IMG = "http://iph.href.lu/500x500?text=占位图"

const MyImage = (function() {
  const imgNode = document.createElement("img")
  document.body.appendChild(imgNode)

  return {
    setImg(src) {
      imgNode.src = src
    }
  }
})()

// 图片懒加载
const MyLazyImage = (function() {
  const imgNode = document.createElement("img")
  document.body.appendChild(imgNode)
  const img = new Image()

  img.onload = function() {
    imgNode.src = img.src
  }

  return {
    setImg(source) {
      img.src = PLACEHOLDER_IMG
      imgNode.src = source
    }
  }
})()

// 代理图片懒加载
const proxyLazyImage = (function(MyImage) {
  const myImg = MyImage()
  const image = new Image()

  image.onload = function() {
    myImg.setImg(image.src)
  }

  return {
    setImg(source) {
      myImg.setImage(PLACEHOLDER_IMG)
      image.src = source
    }
  }
})(MyImage)