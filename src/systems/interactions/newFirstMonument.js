import { showFeedback } from "../../ui/feedback.js";

export const newFirstMonument = {

  // ================= Slide 1 =================
  // Tampilkan ilustrasi gambar refleksi
  showMirrorIllustration(system, slide) {
    const scene = system.scene;

    scene._interactiveObjects = [];

    scene.trackObject = (obj) => {
      scene._interactiveObjects.push(obj);
      return obj;
    };

    const centerX = scene.cameras.main.width / 2;
    const centerY = scene.cameras.main.height / 2 + 90;

    scene.trackObject(
      scene.add.image(centerX, centerY - 10, "illust_1.1")
        .setScrollFactor(0)
        .setDepth(2002)
        .setScale(0.45)
    );

    scene.hasInteracted = true;
  },

  // ================= Slide 2 =================
  // Cocokkan sifat refleksi dengan penjelasannya
  matchRefleksiSifat(system, slide) {
    const scene = system.scene;

    scene._interactiveObjects = [];
    scene._interactiveEvents = [];

    scene.trackObject = (obj) => {
      scene._interactiveObjects.push(obj);
      return obj;
    };

    scene.trackEvent = (eventName, handler) => {
      scene.input.on(eventName, handler);
      scene._interactiveEvents.push({ eventName, handler });
    };

    const centerX = scene.cameras.main.width / 2;
    const startY = scene.cameras.main.height / 2 + 50;

    const leftItems = slide.interaction.pairs.map(p => p.left);
    const rightItems = Phaser.Utils.Array.Shuffle(
      slide.interaction.pairs.map(p => p.right)
    );

    scene.selectedLeft = null;
    scene.matchCount = 0;
    const totalMatch = slide.interaction.pairs.length;

    scene.leftTexts = [];
    scene.rightTexts = [];

    const baseStyle = { backgroundColor: "#333" };
    const hoverStyle = { backgroundColor: "#555" };
    const activeStyle = { backgroundColor: "#6666ff" };
    const correctStyle = { backgroundColor: "#2ecc71" };
    const wrongStyle = { backgroundColor: "#e74c3c" };

    const applyDefault = (obj) => {
      if (!obj.locked) obj.setStyle(baseStyle);
    };

    const addCommonEvents = (obj) => {
      obj.on("pointerover", () => {
        if (!obj.locked && obj !== scene.selectedLeft) {
          obj.setStyle(hoverStyle);
        }
      });

      obj.on("pointerout", () => {
        if (!obj.locked && obj !== scene.selectedLeft) {
          obj.setStyle(baseStyle);
        }
      });
    };

    const drawMatchLine = (leftObj, rightObj) => {
      const leftBounds = leftObj.getBounds();
      const rightBounds = rightObj.getBounds();

      const startX = leftBounds.right;
      const startY = leftBounds.centerY;
      const endX = rightBounds.left;
      const endY = rightBounds.centerY;

      const graphics = scene.add.graphics();
      graphics.lineStyle(2, 0x2ecc71, 1);
      graphics.beginPath();
      graphics.moveTo(startX, startY);
      graphics.lineTo(endX, endY);
      graphics.strokePath();
      graphics.setDepth(9999);
      graphics.setScrollFactor(0);

      scene.trackObject(graphics);
    };

    leftItems.forEach((text, i) => {
      const obj = scene.trackObject(
        scene.add.text(centerX - 300, startY + i * 30, text, {
          fontSize: "13px",
          backgroundColor: "#333",
          padding: { x: 6, y: 4 },
          fixedWidth: 250,
          align: "center"
        })
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(2002)
      );

      obj.locked = false;
      addCommonEvents(obj);

      obj.on("pointerdown", () => {
        if (obj.locked) return;

        scene.selectedLeft = obj;

        scene.leftTexts.forEach(t => {
          if (!t.locked) t.setStyle(baseStyle);
        });

        obj.setStyle(activeStyle);
      });

      scene.leftTexts.push(obj);
    });

    rightItems.forEach((text, i) => {
      const obj = scene.trackObject(
        scene.add.text(centerX - 20, startY + i * 30, text, {
          fontSize: "13px",
          backgroundColor: "#333",
          padding: { x: 6, y: 4 },
          fixedWidth: 300,
          align: "center"
        })
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(2002)
      );

      obj.locked = false;
      addCommonEvents(obj);

      obj.on("pointerdown", () => {
        if (!scene.selectedLeft || obj.locked) return;

        const leftObj = scene.selectedLeft;
        const leftText = leftObj.text;
        const correct = slide.interaction.pairs.find(p => p.left === leftText);

        if (correct.right === text) {
          obj.setStyle(correctStyle);
          leftObj.setStyle(correctStyle);
          drawMatchLine(leftObj, obj);

          obj.locked = true;
          leftObj.locked = true;

          scene.matchCount++;

          if (scene.matchCount === totalMatch) {
            showFeedback(system, "Semua pasangan benar! Kamu memahami sifat-sifat refleksi.");
            scene.hasInteracted = true;
          }
        } else {
          obj.setStyle(wrongStyle);
          leftObj.setStyle(wrongStyle);

          showFeedback(system, "Belum tepat, coba pasangkan lagi.");

          scene.time.delayedCall(300, () => {
            applyDefault(obj);
            applyDefault(leftObj);
          });
        }

        scene.selectedLeft = null;
      });

      scene.rightTexts.push(obj);
    });
  },

  cleanup(system) {
    const scene = system.scene;

    if (scene._interactiveObjects) {
      scene._interactiveObjects.forEach(obj => obj.destroy());
      scene._interactiveObjects = null;
    }

    if (scene._interactiveEvents) {
      scene._interactiveEvents.forEach(e => {
        scene.input.off(e.eventName, e.handler);
      });
      scene._interactiveEvents = null;
    }

    scene.selectedLeft = null;
    scene.leftTexts = null;
    scene.rightTexts = null;
    scene.matchCount = 0;
  }

};