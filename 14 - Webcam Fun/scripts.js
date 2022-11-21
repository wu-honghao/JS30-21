(() => {
  const video = document.querySelector(".player");
  const canvas = document.querySelector(".photo");
  const ctx = canvas.getContext("2d");
  const strip = document.querySelector(".strip");
  const snap = document.querySelector(".snap");
  const takePhotoButton = document.querySelector(".take-photo");

  // 将摄像头的画面用video显示出来
  const getUserMediaToVideo = async () => {
    try {
      const userMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      const video = document.querySelector(".player");
      video.srcObject = userMediaStream;
      // loadedmetadata事件在元数据（metadata）被加载完成后触发。
      video.onloadedmetadata = (e) => {
        video.play();
      };
      drawImage;
    } catch (e) {
      console.log(e);
    }
  };

  const paintToCanvas = () => {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
    }, 16);
  };

  const takePhoto = () => {
    // 播放拍照声音
    snap.currentTime = 0;
    snap.play();

    // 导出canvas中图片的数据放入到strip标签中
    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "handsome");
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);
  };

  getUserMediaToVideo();

  //  用canvas画出画面
  video.addEventListener("canplay", paintToCanvas);
  //   绑定拍照功能
  takePhotoButton.addEventListener("click", takePhoto);
})();
