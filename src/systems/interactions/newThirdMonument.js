import { showFeedback } from "../../ui/feedback.js";

// ─────────────────────────────────────────────────────────────
//  Helper: gambar satu matriks 2×2 secara piksel-perfect
//  Mengembalikan lebar total yang terpakai (untuk layout horizontal)
// ─────────────────────────────────────────────────────────────
function drawMatrix(scene, cx, cy, rows, label, depth = 2002) {
  const objs = [];
  const track = (o) => { objs.push(o); return o; };

  const cellW   = 28;   // lebar tiap sel angka
  const cellH   = 22;   // tinggi tiap baris
  const padX    = 10;   // padding horizontal dalam bracket
  const bracketW = 8;   // lebar area bracket
  const innerW  = rows[0].length * cellW;
  const totalW  = bracketW * 2 + padX * 2 + innerW;
  const totalH  = rows.length * cellH;

  const left  = cx - totalW / 2;
  const right = cx + totalW / 2;
  const top   = cy - totalH / 2;

  // ---- label di atas ----
  track(scene.add.text(cx, top - 18, label, {
    fontSize: "13px", color: "#ffcb81", fontStyle: "bold", align: "center"
  }).setOrigin(0.5).setScrollFactor(0).setDepth(depth));

  // ---- bracket kiri ⎡ ⎣ ----
  const g = track(scene.add.graphics().setScrollFactor(0).setDepth(depth - 1));
  g.lineStyle(2, 0xffffff, 0.9);
  // kiri
  g.beginPath();
  g.moveTo(left + bracketW, top);
  g.lineTo(left, top);
  g.lineTo(left, top + totalH);
  g.lineTo(left + bracketW, top + totalH);
  g.strokePath();
  // kanan
  g.beginPath();
  g.moveTo(right - bracketW, top);
  g.lineTo(right, top);
  g.lineTo(right, top + totalH);
  g.lineTo(right - bracketW, top + totalH);
  g.strokePath();

  // ---- angka tiap sel ----
  rows.forEach((row, r) => {
    row.forEach((val, c) => {
      const tx = left + bracketW + padX + c * cellW + cellW / 2;
      const ty = top  + r * cellH + cellH / 2;
      track(scene.add.text(tx, ty, String(val), {
        fontSize: "14px", color: "#ffffff", align: "center"
      }).setOrigin(0.5).setScrollFactor(0).setDepth(depth));
    });
  });

  return { objs, totalW };
}

export const newThirdMonument = {

  // ─────────────────────────────────────────────────────────────
  //  Slide 2: tampilkan 4 matriks horizontal SEBELUM interaksi match
  // ─────────────────────────────────────────────────────────────
  matchRefleksiMatriks(system, slide) {
    const scene = system.scene;

    scene._interactiveObjects = [];
    scene._interactiveEvents  = [];
    scene.trackObject = (obj) => { scene._interactiveObjects.push(obj); return obj; };
    scene.trackEvent  = (eventName, handler) => {
      scene.input.on(eventName, handler);
      scene._interactiveEvents.push({ eventName, handler });
    };

    const camW    = scene.cameras.main.width;
    const camH    = scene.cameras.main.height;

    // ── 1. Gambar 4 matriks berjajar horizontal ──────────────────
    const matrices   = slide.interaction.matrices;
    const matCount   = matrices.length;
    const matSpacing = 20;
    const matW       = 90;  // lebar tiap slot matriks
    const totalMatW  = matCount * matW + (matCount - 1) * matSpacing;
    const matStartX  = camW / 2 - totalMatW / 2 + matW / 2;
    const matY       = camH / 2 - 35;

    matrices.forEach((mat, i) => {
      const cx = matStartX + i * (matW + matSpacing);
      const { objs } = drawMatrix(scene, cx, matY, mat.rows, mat.label);
      objs.forEach(o => scene.trackObject(o));
    });

    // ── 2. Interaksi match di bawah matriks ──────────────────────
    const startY = camH / 2 +15;
    const centerX = camW / 2;

    const leftItems  = slide.interaction.pairs.map(p => p.left);
    const rightItems = Phaser.Utils.Array.Shuffle(
      slide.interaction.pairs.map(p => p.right)
    );

    scene.selectedLeft = null;
    scene.matchCount   = 0;
    const totalMatch   = slide.interaction.pairs.length;

    scene.leftTexts  = [];
    scene.rightTexts = [];

    const baseStyle    = { backgroundColor: "#333333" };
    const activeStyle  = { backgroundColor: "#6666ff" };
    const correctStyle = { backgroundColor: "#2ecc71" };
    const wrongStyle   = { backgroundColor: "#e74c3c" };

    const drawMatchLine = (leftObj, rightObj) => {
      const lb = leftObj.getBounds();
      const rb = rightObj.getBounds();
      const g  = scene.add.graphics();
      g.lineStyle(2, 0x2ecc71, 1);
      g.beginPath();
      g.moveTo(lb.right, lb.centerY);
      g.lineTo(rb.left,  rb.centerY);
      g.strokePath();
      g.setDepth(9999).setScrollFactor(0);
      scene.trackObject(g);
    };

    leftItems.forEach((text, i) => {
      const obj = scene.trackObject(
        scene.add.text(centerX - 190, startY + i * 38, text, {
          fontSize: "13px", backgroundColor: "#333333",
          padding: { x: 8, y: 5 }, fixedWidth: 130, align: "center"
        }).setInteractive().setScrollFactor(0).setDepth(2002)
      );
      obj.locked = false;
      obj.on("pointerover",  () => { if (!obj.locked && obj !== scene.selectedLeft) obj.setStyle({ backgroundColor: "#555555" }); });
      obj.on("pointerout",   () => { if (!obj.locked && obj !== scene.selectedLeft) obj.setStyle(baseStyle); });
      obj.on("pointerdown",  () => {
        if (obj.locked) return;
        scene.leftTexts.forEach(t => { if (!t.locked) t.setStyle(baseStyle); });
        scene.selectedLeft = obj;
        obj.setStyle(activeStyle);
      });
      scene.leftTexts.push(obj);
    });

    rightItems.forEach((text, i) => {
      const obj = scene.trackObject(
        scene.add.text(centerX + 30, startY + i * 38, text, {
          fontSize: "13px", backgroundColor: "#333333",
          padding: { x: 8, y: 5 }, fixedWidth: 170, align: "center"
        }).setInteractive().setScrollFactor(0).setDepth(2002)
      );
      obj.locked = false;
      obj.on("pointerover",  () => { if (!obj.locked) obj.setStyle({ backgroundColor: "#555555" }); });
      obj.on("pointerout",   () => { if (!obj.locked) obj.setStyle(baseStyle); });
      obj.on("pointerdown",  () => {
        if (!scene.selectedLeft || obj.locked) return;
        const leftObj  = scene.selectedLeft;
        const leftText = leftObj.text;
        const correct  = slide.interaction.pairs.find(p => p.left === leftText);

        if (correct.right === text) {
          obj.setStyle(correctStyle);
          leftObj.setStyle(correctStyle);
          drawMatchLine(leftObj, obj);
          obj.locked = true;
          leftObj.locked = true;
          scene.matchCount++;
          if (scene.matchCount === totalMatch) {
            showFeedback(system, "Semua pasangan benar! Kamu hafal matriks transformasi refleksi.");
            scene.hasInteracted = true;
          }
        } else {
          obj.setStyle(wrongStyle);
          leftObj.setStyle(wrongStyle);
          showFeedback(system, "Belum tepat, coba pasangkan lagi.");
          scene.time.delayedCall(300, () => {
            if (!obj.locked)    obj.setStyle(baseStyle);
            if (!leftObj.locked) leftObj.setStyle(baseStyle);
          });
        }
        scene.selectedLeft = null;
      });
      scene.rightTexts.push(obj);
    });

    scene.uiElements ??= [];
    scene._interactiveObjects.forEach(o => {
      if (!scene.uiElements.includes(o)) scene.uiElements.push(o);
    });
  },

  // ─────────────────────────────────────────────────────────────
  //  Slide 3: tampilkan satu matriks + caption penjelasan
  // ─────────────────────────────────────────────────────────────
  showSingleMatriks(system, slide) {
    const scene  = system.scene;
    const int    = slide.interaction;

    scene._interactiveObjects = [];
    scene.trackObject = (obj) => { scene._interactiveObjects.push(obj); return obj; };

    const camW = scene.cameras.main.width;
    const camH = scene.cameras.main.height;
    const cx   = camW / 2;
    const cy   = camH / 2 + 20;

    // matriks di tengah
    const { objs } = drawMatrix(scene, cx, cy, int.rows, int.label);
    objs.forEach(o => scene.trackObject(o));

    // caption di bawah matriks
    const capY = cy + 50;
    int.caption.forEach((line, i) => {
      scene.trackObject(
        scene.add.text(cx, capY + i * 22, line, {
          fontFamily: "Noto Sans, sans-serif", fontSize: "14px", color: "#ffffff", align: "center"
        }).setOrigin(0.5).setScrollFactor(0).setDepth(2002)
      );
    });
    scene.hasInteracted = true;

    scene.uiElements ??= [];
    scene._interactiveObjects.forEach(o => {
      if (!scene.uiElements.includes(o)) scene.uiElements.push(o);
    });
  },

  // ─────────────────────────────────────────────────────────────
  //  Slide 7: Tips Singkat — 4 matriks horizontal + footer teks
  // ─────────────────────────────────────────────────────────────
  showTipsMatriks(system, slide) {
    const scene = system.scene;
    const int   = slide.interaction;

    scene._interactiveObjects = [];
    scene.trackObject = (obj) => { scene._interactiveObjects.push(obj); return obj; };

    const camW = scene.cameras.main.width;
    const camH = scene.cameras.main.height;

    const matrices   = int.matrices;
    const matCount   = matrices.length;
    const matSpacing = 20;
    const matW       = 90;
    const totalMatW  = matCount * matW + (matCount - 1) * matSpacing;
    const matStartX  = camW / 2 - totalMatW / 2 + matW / 2;
    const matY       = camH / 2 - 10;

    matrices.forEach((mat, i) => {
      const cx = matStartX + i * (matW + matSpacing);
      const { objs } = drawMatrix(scene, cx, matY, mat.rows, mat.label);
      objs.forEach(o => scene.trackObject(o));
    });

    scene.hasInteracted = true;

    scene.uiElements ??= [];
    scene._interactiveObjects.forEach(o => {
      if (!scene.uiElements.includes(o)) scene.uiElements.push(o);
    });
  },

  // ================= Slide 2 & 3 =================
  // Multi-step quiz: matriks refleksi & komposisi refleksi
  koordinatQuizFlow(system, slide) {
    const scene = system.scene;

    scene._interactiveObjects = [];
    scene._interactiveEvents = [];

    scene.trackObject = (obj) => {
      scene._interactiveObjects.push(obj);
      return obj;
    };

    const centerX = scene.cameras.main.width / 2;
    const centerY = scene.cameras.main.height / 2;

    let currentStep = 0;

    const questionText = scene.trackObject(
      scene.add.text(centerX, centerY - 20, "", {
        fontFamily: "Noto Sans, sans-serif",
        fontSize: "14px",
        color: "#ffffff",
        align: "center",
        wordWrap: { width: 480 }
      })
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(2002)
    );

    let optionObjects = [];

    const renderStep = () => {
      optionObjects.forEach(obj => obj.destroy());
      optionObjects = [];

      const stepData = slide.interaction.steps[currentStep];
      const total    = slide.interaction.steps.length;

      questionText.setText(stepData.question);

      stepData.options.forEach((opt, i) => {
        const cols     = 2;
        const spacingX = 20;
        const spacingY = 50;

        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = centerX + (col - 0.5) * (140 + spacingX);
        const y = centerY + 35 + row * spacingY;

        const text = scene.trackObject(
          scene.add.text(x, y, opt, {
            fontSize: "13px",
            color: "#ffffff",
            fixedWidth: 140,
            align: "center"
          })
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(2002)
        );

        const btn = scene.trackObject(
          scene.add.rectangle(x, y, 140, text.height + 20, 0x333333)
            .setScrollFactor(0)
            .setDepth(2001)
            .setInteractive()
        );

        text.setPosition(btn.x, btn.y);

        btn.on("pointerover", () => btn.setFillStyle(0x555555));
        btn.on("pointerout",  () => btn.setFillStyle(0x333333));

        btn.on("pointerdown", () => {
          const isCorrect  = opt === stepData.correct;
          const isLastStep = currentStep === slide.interaction.steps.length - 1;

          if (isCorrect) {
            btn.setFillStyle(0x2ecc71);
            optionObjects.forEach(o => {
              if (o.disableInteractive) o.disableInteractive();
            });

            showFeedback(system, stepData.stepFeedback.correct);

            scene.time.delayedCall(900, () => {
              currentStep++;

              if (currentStep < slide.interaction.steps.length) {
                renderStep();
              } else {
                showFinalResult();
              }
            });

          } else {
            btn.setFillStyle(0xe74c3c);
            showFeedback(system, stepData.stepFeedback.wrong);

            if (isLastStep) {
              optionObjects.forEach(o => {
                if (o.disableInteractive) o.disableInteractive();
              });

              scene.time.delayedCall(1200, () => {
                currentStep = 0;
                renderStep();
              });
            } else {
              scene.time.delayedCall(700, () => {
                btn.setFillStyle(0x333333);
              });
            }
          }
        });

        optionObjects.push(btn, text);
      });
    };

    const showFinalResult = () => {
      showFeedback(system, slide.interaction.feedback.correct);
      scene.hasInteracted = true;
    };

    renderStep();
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

    scene.selectedLeft  = null;
    scene.leftTexts     = null;
    scene.rightTexts    = null;
    scene.matchCount    = 0;
  }

};