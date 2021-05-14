document.addEventListener("DOMContentLoaded", () => {
  const mario = document.querySelector(".mario");
  const grid = document.querySelector(".grid");
  const alert = document.getElementById("alert");

  //   GAME OVER STYLE PROPERTIES
  alert.style.textAlign = "center";
  alert.style.fontSize = "xx-large";
  alert.style.marginTop = "-300px";

  let isJumping = false;
  let gravity = 0.9;
  let isGameOver = false;

  function control(e) {
    if (e.keyCode === 32) {
      if (!isJumping) {
        isJumping = true;
        jump();
      }
    }
  }
  document.addEventListener("keyup", control);

  let position = 0;
  function jump() {
    let count = 0;
    let timerId = setInterval(() => {
      // Move Down
      if (count === 15) {
        clearInterval(timerId);
        console.log("Down");
        let downTimerId = setInterval(function () {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          position -= 5;
          count--;
          position *= gravity;
          mario.style.bottom = position + "px";
        }, 20);
      }
      // Move up
      console.log("up");
      position += 30;
      count++;
      position *= gravity;
      mario.style.bottom = position + "px";
      console.log(mario.style.bottom);
    }, 20);
  }

  function generateObstacles() {
    let randomTime = Math.random() * 4000;
    let obstaclePosition = 1000;
    const obstacle = document.createElement("div");
    if (!isGameOver) {
      obstacle.classList.add("obstacle");
    }
    grid.appendChild(obstacle);
    obstacle.style.left = obstaclePosition + "px";

    let timerId = setInterval(() => {
      if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
        clearInterval(timerId);
        alert.innerHTML = "Game Over";
        isGameOver = true;
        // Remove all children
        while (grid.firstChild) {
          grid.removeChild(grid.lastChild);
        }
      }
      obstaclePosition -= 10;
      obstacle.style.left = obstaclePosition + "px";
    }, 20);
    if (!isGameOver) {
      setTimeout(generateObstacles, randomTime);
    }
  }
  generateObstacles();
});
