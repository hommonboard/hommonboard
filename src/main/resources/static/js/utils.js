export function createResizeGameWindowFunction(game) {
  var canvas = document.querySelector("canvas");

  return function resizeGameWindow() {
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var windowRatio = windowWidth / windowHeight;
      var gameRatio = game.config.width / game.config.height;

      if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
      } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
      }
  }
}