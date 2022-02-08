const fileInput = document.querySelector("#file");
const widthInput = document.querySelector("#width");
const heightInput = document.querySelector("#height");
const aspectToggle = document.querySelector("#aspectToggle");
const canvas = document.querySelector("canvas");
const canvasCtx = canvas.getContext("2d");
const removeColor = document.querySelector("#removeColor");
const addColor = document.querySelector("#addColor");

(function () {
  let currentImg, tempImg, aspectRatio;
  addColor.style.display = "none";
  // onfile chnage
  fileInput.addEventListener("change", (e) => {
    const Reader = new FileReader();
    Reader.onload = () => {
      OpenImg(Reader.result);
    };
    Reader.readAsDataURL(e.target.files[0]);
  });

  widthInput.addEventListener("change", () => {
    alert(aspectToggle.checked);
    let height = aspectToggle.checked
      ? widthInput.value / aspectRatio
      : heightInput.value;
    ImgResize(widthInput.value, height);
  });

  heightInput.addEventListener("change", () => {
    alert(aspectToggle.checked);
    let width = aspectToggle.checked
      ? heightInput.value * aspectRatio
      : widthInput.value;
    ImgResize(width, widthInput.value);
  });

  removeColor.addEventListener("click", () => {
    RemoveColor();
    removeColor.style.display = "none";
    addColor.style.display = "block";
  });

  addColor.addEventListener("click", () => {
    AddColor();
    removeColor.style.display = "block";
    addColor.style.display = "none";
  });

  const OpenImg = (imgSrc) => {
    currentImg = new Image();
    tempImg = currentImg;
    currentImg.addEventListener("load", () => {
      aspectRatio = currentImg.width / currentImg.height;
      ImgResize(currentImg.width, currentImg.height);
    });
    currentImg.src = imgSrc;
  };

  const ImgResize = (width, height) => {
    canvas.width = parseInt(width);
    canvas.height = parseInt(height);
    widthInput.value = parseInt(width);
    heightInput.value = parseInt(height);
    canvasCtx.drawImage(currentImg, 0, 0, parseInt(width), parseInt(height));
  };

  const AddColor = () => {
    let width = currentImg.width;
    let height = currentImg.height;
    canvas.width = parseInt(width);
    canvas.height = parseInt(height);
    widthInput.value = parseInt(width);
    heightInput.value = parseInt(height);
    canvasCtx.drawImage(tempImg, 0, 0, parseInt(width), parseInt(height));
  };

  const RemoveColor = () => {
    const ImgData = canvasCtx.getImageData(
      0,
      0,
      currentImg.width,
      currentImg.height
    );
    const data = ImgData.data;
    const len = parseInt(data.length / 2);
    for (var i = 0; i <= data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    canvasCtx.putImageData(ImgData, 0, 0);
  };

  const DownloadImg = () => {
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = canvas.toDataURL();
    link.click();
  };
})();
