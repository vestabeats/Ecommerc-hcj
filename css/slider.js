//import Glide from '@glidejs/glide';

document.addEventListener("DOMContentLoaded", function () {
  const slider1 = document.querySelector('#glide1');

  try {
    if (slider1) {
      new Glide(slider1, {
        type: "carousel",
        startAt: 0,
        autoplay: 3000,
        gap: 0,
        hoverpause: true,
        perView: 1,
        animationDuration: 800,
        animationTimingFunc: "linear",
      }).mount();
    }
  } catch (e) {
    console.log(e);
  }
});
