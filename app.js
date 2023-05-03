const wrapper = document.getElementById("tiles");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let interval = null;
const doeffect = (e) => {
  let iteration = 0;
  clearInterval(interval);

  interval = setInterval(() => {
    e.target.innerText = e.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return e.target.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 36)];
      })
      .join("");

    if (iteration >= e.target.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 4;
  }, 30);
};
// window.onload = () => {
//   console.log("loaded");
//   document.getElementById("title").click();
// }
document.querySelector("h1").onmouseover = (event) => doeffect(event);
document.querySelector("h1").onclick = (event) => doeffect(event);

let columns = 0,
  rows = 0,
  toggled = false;

const toggle = () => {
  toggled = !toggled;
  document.body.classList.toggle("toggled");
};

const handleOnClick = (index) => {
  toggle();
  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index,
    }),
  });
};

const createTile = (index) => {
  const tile = document.createElement("div");
  // tile.innerHTML("<p>GP</p>");
  tile.classList.add("tile");
  tile.style.opacity = toggled ? 0 : 1;
  tile.onclick = (e) => handleOnClick(index);
  return tile;
};

const createTiles = (quantity) => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
};

const createGrid = () => {
  wrapper.innerHTML = "";
  const size = document.body.clientWidth > 800 ? 100 : 50;
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);

  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);

  createTiles(columns * rows);
};

const openLink = (link) => {
  window.open(link, "_blank");
};

// let index = 0;
// let intervl = 1000;

// const rand = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// const animate = star => {
//   star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
//   star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

//   star.style.animation = "none";
//   star.offsetHeight;
//   star.style.animation = "";
// }

// for(const star of document.getElementsByClassName("magic-star")) {
//   setTimeout(() => {
//     animate(star);

//     setInterval(() => animate(star), 1000);
//   }, index++ * (intervl / 3))
// }

createGrid();
window.onresize = () => createGrid();
