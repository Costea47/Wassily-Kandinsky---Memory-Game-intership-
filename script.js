var StartScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function StartScene() {
    Phaser.Scene.call(this, { key: "startScene" });
  },

  preload: function () {
    this.load.image(
      "character1",
      "https://play.rosebud.ai/assets/Designer (2)-Photoroom.png?mhLw"
    );
    this.load.audio(
      "backgroundMusic",
      "https://play.rosebud.ai/assets/Bensound  - Dreams - Chill Royalty Free Music (320)-[AudioTrimmer.com] (1).mp3?zpZj"
    );
  },

  create: function () {
    // Add the character1 image to fill the entire screen
    this.add
      .image(0, 0, "character1")
      .setOrigin(0, 0)
      .setScale(this.scale.width / 1000, this.scale.height / 800);

    var title = this.add
      .text(200, 300, "", {
        color: "black",
        fontFamily: "Arial",
        fontSize: "60px",
        padding: 0,
      })
      .setStroke("#FFFFFF", 9);

    var startButton = this.add
      .text(300, 500, "Start", {
        color: "white",
        fontFamily: "Arial",
        fontSize: "40px",
        backgroundColor: "#ff89ff",
        padding: { left: 50, right: 50, top: 10, bottom: 10 },
      })
      .setInteractive();

    startButton.on("pointerdown", () => this.scene.start("exampleScene"));
    startButton.on("pointerover", () =>
      startButton.setBackgroundColor("#ff89ff")
    );
    startButton.on("pointerout", () =>
      startButton.setBackgroundColor("rgba(0,0,0,0.6)")
    );

    this.music = this.sound.add("backgroundMusic");
    this.music.play({ loop: true });
  },
});

class Example extends Phaser.Scene {
  constructor() {
    super({ key: "exampleScene" });
    this.cardSize = 100;
    this.spacing = 20;
    this.clickedCards = [];
    this.matchedPairs = 0;
    this.totalMatchedPairs = 0;
    this.scaleX = null;
    this.scaleY = null;
    this.gameOver = false;
    this.ignoreClicks = false;
  }

  preload() {
    this.load.image(
      "background",
      `https://play.rosebud.ai/assets/pexels-edward-jenner-4252672.jpg?PPKp`
    );
    this.load.image("card back", `https://play.rosebud.ai/assets/132.png?TQuh`);
    this.load.image("spaghetti", `https://play.rosebud.ai/assets/122.png?QjoP`);
    this.load.image(
      "cookie",
      `https://play.rosebud.ai/assets/image-enhanced.png?mTnT`
    );
    this.load.image("sub", `https://play.rosebud.ai/assets/123.png?0fmV`);
    this.load.image("sundae", `https://play.rosebud.ai/assets/124.png?h5Ec`);
    this.load.image("cup", `https://play.rosebud.ai/assets/125.png?iVLG`);
    this.load.image("pretzel", `https://play.rosebud.ai/assets/126.png?Kssw`);
    this.load.image("fries", `https://play.rosebud.ai/assets/127.png?rYaV`);
    this.load.image("burger", `https://play.rosebud.ai/assets/128.png?5ipy`);
  }

  create() {
    this.startGame(this);
    this.input.keyboard.on(
      Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      (event) => {
        if (
          event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER &&
          this.gameOver
        ) {
          this.children.removeAll();
          this.totalMatchedPairs = 0;
          this.startGame(this);
        }
      }
    );
  }

  startGame(context) {
    this.gameOver = false;
    this.ignoreClicks = false;

    let background = context.add.image(0, 0, "background");
    background.setOrigin(0, 0);
    background.setAlpha(0.85);
    background.setTint(0x808080);
    this.scaleX = this.cameras.main.width / background.width;
    this.scaleY = this.cameras.main.height / background.height;
    background.setScale(this.scaleX, this.scaleY);

    var images = [
      "spaghetti",
      "cookie",
      "sub",
      "sundae",
      "cup",
      "pretzel",
      "fries",
      "burger",
    ];
    images = images.concat(images);
    Phaser.Utils.Array.Shuffle(images);

    const totalWidth = 4 * context.cardSize + 3 * context.spacing;
    const totalHeight = 4 * context.cardSize + 3 * context.spacing;

    const startX = (context.sys.canvas.width - totalWidth) / 2 + 40; // Shifted cards 20 pixels to the right
    const startY = context.sys.canvas.height - totalHeight + 30;

    context.clickedCards = [];
    context.cardBackSprites = [];
    context.matchedPairs = 0;

    var countdownUncovered = 15;
    var countdownCovered = 45;

    var countdownText = context.add.text(
      context.sys.canvas.width / 2,
      10,
      "Countdown: " + countdownUncovered,
      { fontSize: "35px", fill: "#fdc5e0", fontFamily: "Orbitron" }
    );
    countdownText.setOrigin(0.5, 0);

    var totalPairsMatchedText = context.add.text(
      context.sys.canvas.width / 2,
      countdownText.y + countdownText.height + 10,
      "Total Pairs Matched: ",
      {
        fontSize: "20px",
        fill: "#ffe0e9",
        fontFamily: "Orbitron",
        fontWeight: "bold",
      }
    );
    totalPairsMatchedText.setOrigin(0.5, 0);
    var totalMatchedPairsText = context.add.text(
      totalPairsMatchedText.x + totalPairsMatchedText.width / 2,
      totalPairsMatchedText.y,
      context.totalMatchedPairs,
      {
        fontSize: "20px",
        fill: "#ffe0e9",
        fontFamily: "Orbitron",
        fontWeight: "bold",
      }
    );
    totalMatchedPairsText.setOrigin(0, 0);

    var memorizeText = context.add.text(
      context.sys.canvas.width / 2,
      startY / 1.8,
      "Memorize the cards",
      {
        fontSize: "40px",
        fill: "#ff69eb",
        fontFamily: "Orbitron",
        align: "center",
      }
    );
    memorizeText.setOrigin(0.5, 0.5);

    var clickPairsText = context.add.text(
      context.sys.canvas.width / 2,
      startY / 2,
      "",
      { fontSize: "40px", fill: "#ff69eb", align: "center" }
    );
    clickPairsText.setOrigin(0.5, 0.5);
    clickPairsText.visible = false;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let imageKey = images[i * 4 + j];
        let image = context.add.image(
          startX + (context.cardSize + context.spacing) * j,
          startY + (context.cardSize + context.spacing) * i,
          imageKey
        );

        let scale = context.cardSize / Math.max(image.width, image.height);
        image.setScale(scale);

        let cardBack = context.add.image(image.x, image.y, "card back");
        cardBack.setData("key", imageKey);
        cardBack.visible = false;

        scale = context.cardSize / Math.max(cardBack.width, cardBack.height);
        cardBack.setScale(scale);

        cardBack.setInteractive();

        cardBack.on("pointerdown", () => {
          if (context.clickedCards.length < 2 && !this.ignoreClicks) {
            cardBack.visible = false;
            context.clickedCards.push(cardBack);

            if (context.clickedCards.length === 2) {
              context.cardBackSprites.forEach((sprite) =>
                sprite.disableInteractive()
              );

              if (
                context.clickedCards[0].getData("key") ===
                context.clickedCards[1].getData("key")
              ) {
                context.clickedCards = [];
                context.matchedPairs++;
                context.totalMatchedPairs++;
                totalMatchedPairsText.setText(context.totalMatchedPairs);

                context.cardBackSprites.forEach((sprite) =>
                  sprite.setInteractive()
                );

                if (context.matchedPairs === 8) {
                  context.coveredTimer.remove();

                  let rectangle = context.add.rectangle(
                    context.sys.canvas.width / 2,
                    context.sys.canvas.height / 2,
                    context.sys.canvas.width,
                    context.sys.canvas.height,
                    0x000000
                  );
                  rectangle.setAlpha(0.5);

                  let text = context.add.text(
                    context.sys.canvas.width / 2,
                    context.sys.canvas.height / 2,
                    "Good job!\nHere comes the next round.",
                    {
                      fontSize: "50px",
                      fill: "#FFFF00",
                      align: "center",
                      fontWeight: "bold",
                    }
                  );
                  text.setOrigin(0.5, 0.5);

                  context.time.delayedCall(5000, () => {
                    context.children.removeAll();
                    context.startGame(context);
                  });
                }
              } else {
                context.time.delayedCall(1500, () => {
                  context.clickedCards[0].visible = true;
                  context.clickedCards[1].visible = true;
                  context.clickedCards = [];
                  context.cardBackSprites.forEach((sprite) =>
                    sprite.setInteractive()
                  );
                });
              }
            }
          }
        });

        context.cardBackSprites.push(cardBack);
      }
    }

    var uncoveredTimer = context.time.addEvent({
      delay: 1000,
      callback: () => {
        countdownUncovered--;
        countdownText.setText("Countdown: " + countdownUncovered);

        if (countdownUncovered <= 0) {
          memorizeText.visible = false;
          clickPairsText.visible = true;
          context.cardBackSprites.forEach((sprite) => (sprite.visible = true));

          uncoveredTimer.remove();
          countdownText.setText("Countdown: " + countdownCovered);

          context.coveredTimer = context.time.addEvent({
            delay: 1000,
            callback: () => {
              countdownCovered--;
              countdownText.setText("Countdown: " + countdownCovered);

              if (countdownCovered <= 0) {
                context.coveredTimer.remove();
                context.children.removeAll(true);
                context.add
                  .image(0, 0, "background")
                  .setOrigin(0, 0)
                  .setAlpha(0.85)
                  .setTint(0x808080)
                  .setScale(context.scaleX, context.scaleY);
                var finalScoreText = context.add.text(
                  context.sys.canvas.width / 2,
                  context.sys.canvas.height / 2 - 50,
                  "Final Score: " +
                    context.totalMatchedPairs +
                    "\nPress ENTER to restart, or press the button to continue",
                  {
                    fontSize: "35px",
                    fill: "#ff69eb",
                    align: "center",
                    fontWeight: "bold",
                    fontFamily: "Orbitron",
                  }
                );
                finalScoreText.setOrigin(0.5, 0.5);

                // Add a button to go to the next scene
                var nextSceneButton = context.add
                  .text(
                    context.sys.canvas.width / 2,
                    context.sys.canvas.height / 2 + 50,
                    "Learn More",
                    {
                      fontSize: "30px",
                      fill: "#ffffff",
                      backgroundColor: "#ff89ff",
                      padding: { left: 20, right: 20, top: 10, bottom: 10 },
                      fontFamily: "Orbitron",
                    }
                  )
                  .setInteractive();

                nextSceneButton.on("pointerdown", () => {
                  context.scene.start("nextScene");
                });

                this.gameOver = true;
                this.ignoreClicks = true;
              }
            },
            loop: true,
          });
        }
      },
      loop: true,
    });
  }
}

class NextScene extends Phaser.Scene {
  constructor() {
    super({ key: "nextScene" });
  }

  preload() {
    this.load.image(
      "background2",
      "https://play.rosebud.ai/assets/188.png?KQs3"
    );
  }

  create() {
    // Add the background image to the scene
    const backgroundImage = this.add.image(0, 0, "background2");

    // Set the image to fill the entire screen while maintaining aspect ratio
    backgroundImage.setOrigin(0, 0);
    backgroundImage.setScale(
      this.scale.width / backgroundImage.width,
      this.scale.height / backgroundImage.height
    );

    // Add any additional content or functionality for the scene here
    // Add a button to go to the next scene
    const nextSceneButton = this.add
      .text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height - 50,
        "Next Page",
        {
          fontSize: "30px",
          fill: "#ffffff",
          backgroundColor: "#ff89ff",
          padding: { left: 10, right: 10, top: 5, bottom: 5 },
          fontFamily: "Orbitron",
        }
      )
      .setInteractive();

    nextSceneButton.on("pointerdown", () => {
      // Add your code to transition to the next scene here
      // For example:
      this.scene.start("nextSceneName");
    });
  }
}

class NextSceneName extends Phaser.Scene {
  constructor() {
    super({ key: "nextSceneName" });
  }

  preload() {
    this.load.image(
      "background3",
      "https://play.rosebud.ai/assets/144.png?l9n3"
    );
  }

  create() {
    // Add the background image to the scene
    const backgroundImage = this.add.image(0, 0, "background3");

    // Set the image to fill the entire screen while maintaining aspect ratio
    backgroundImage.setOrigin(0, 0);
    backgroundImage.setScale(
      this.scale.width / backgroundImage.width,
      this.scale.height / backgroundImage.height
    );

    // add button

    const nextSceneButton = this.add
      .text(
        this.sys.canvas.width / 2,
        this.sys.canvas.height - 50,
        "Next Page",
        {
          fontSize: "30px",
          fill: "#ffffff",
          backgroundColor: "#ff89ff",
          padding: { left: 10, right: 10, top: 5, bottom: 5 },
          fontFamily: "Orbitron",
        }
      )
      .setInteractive();

    nextSceneButton.on("pointerdown", () => {
      // Add your code to transition to the next scene here
      // For example:
      this.scene.start("nextSceneThree");
    });
  }
}

// last scene
class NextSceneThree extends Phaser.Scene {
  constructor() {
    super({ key: "nextSceneThree" });
  }

  preload() {
    this.load.image(
      "background4",
      "https://play.rosebud.ai/assets/177.png?9aQm"
    );
  }

  create() {
    // Add the background image to the scene
    const backgroundImage = this.add.image(0, 0, "background4");

    // Set the image to fill the entire screen while maintaining aspect ratio
    backgroundImage.setOrigin(0, 0);
    backgroundImage.setScale(
      this.scale.width / backgroundImage.width,
      this.scale.height / backgroundImage.height
    );

    // Add the website button
    let websiteButton = this.add
      .text(400, 350, "www.arts4refugees.com/", {
        color: "#ff69eb", // Light blue color,
        fontFamily: "Arial",
        fontSize: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: { left: 20, right: 20, top: 10, bottom: 10 },
      })
      .setOrigin(0.5, 1)
      .setInteractive();

    websiteButton.on("pointerdown", () => {
      window.open("https://www.arts4refugees.com/", "_blank");
    });
  }
}
const container = document.getElementById("renderDiv");
const config = {
  type: Phaser.AUTO,
  parent: "renderDiv",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  width: 800,
  height: 600,
  scene: [StartScene, Example, NextScene, NextSceneName, NextSceneThree],
};

window.phaserGame = new Phaser.Game(config);
