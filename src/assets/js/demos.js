(() => {
  const demoSources = {
    "zeno-fitness": "/demos/zf83k9a.mp3",
    "mathis-gin": "/demos/mg37xq2.mp3",
    "mikrobiom-doku": "/demos/md29lp7.mp3"
    // "hauptmann-berger" wird bewusst erst verdrahtet, wenn die Demo bereit ist
  };

  const cards = document.querySelectorAll(".demo-card[data-demo-id]");
  if (!cards.length) return;

  const audio = new Audio();
  let currentId = null;
  let currentButton = null;

  cards.forEach((card) => {
    const id = card.getAttribute("data-demo-id");
    const src = demoSources[id];
    const button = card.querySelector(".demo-play-button");

    if (!button) return;

    if (!src) {
      button.disabled = true;
      button.textContent = "Bald verfügbar";
      return;
    }

    button.addEventListener("click", () => {
      if (currentId === id && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        button.textContent = "Anhören";
        currentId = null;
        currentButton = null;
        return;
      }

      audio.src = src;
      audio
        .play()
        .then(() => {
          if (currentButton && currentButton !== button) {
            currentButton.textContent = "Anhören";
          }
          button.textContent = "Stopp";
          currentId = id;
          currentButton = button;
        })
        .catch(() => {
          button.textContent = "Anhören";
        });
    });
  });

  audio.addEventListener("ended", () => {
    if (currentButton) {
      currentButton.textContent = "Anhören";
    }
    currentId = null;
    currentButton = null;
  });
})();

