import { showFeedback } from "../../ui/feedback.js";

export const newSecondMonument = {

  // ================= Slide 1 =================
  // Visual bidang Kartesius interaktif: refleksi sumbu X dan sumbu Y
  showAxisReflection(system, slide) {
    const scene = system.scene;

    scene._interactiveObjects = [];
    scene._interactiveEvents = [];

    scene.trackObject = (obj) => {
      scene._interactiveObjects.push(obj);
      return obj;
    };

    const camW = scene.cameras.main.width;
    const camH = scene.cameras.main.height;

    const originX = camW / 2 - 20;
    const originY = camH / 2 + 70;
    const unit = 20;

    const toSX = (mx) => originX + mx * unit;
    const toSY = (my) => originY - my * unit;

    const graphics = scene.trackObject(
      scene.add.graphics().setScrollFactor(0).setDepth(2000)
    );

    // ---- helper: gambar ulang canvas ----
    const drawScene = (type) => {
      graphics.clear();

      // grid
      graphics.lineStyle(0.5, 0x444444, 0.4);
      for (let i = -6; i <= 6; i++) {
        graphics.lineBetween(toSX(i), toSY(-4), toSX(i), toSY(4));
        graphics.lineBetween(toSX(-6), toSY(i), toSX(6), toSY(i));
      }

      // sumbu
      graphics.lineStyle(1.5, 0xffffff, 0.9);
      graphics.lineBetween(toSX(-6), originY, toSX(6), originY);
      graphics.lineBetween(originX, toSY(-4), originX, toSY(4));

      // garis cermin
      if (type === "sumbux") {
        graphics.lineStyle(2, 0xffcb81, 0.85);
        graphics.lineBetween(toSX(-6), originY, toSX(6), originY);
      } else {
        graphics.lineStyle(2, 0xffcb81, 0.85);
        graphics.lineBetween(originX, toSY(-4), originX, toSY(4));
      }

      // konektor A ke A' (putus-putus manual)
      const ax  = toSX(3), ay  = toSY(3);
      const a2x = type === "sumbux" ? toSX(3)  : toSX(-3);
      const a2y = type === "sumbux" ? toSY(-3) : toSY(3);

      graphics.lineStyle(1, 0xffffff, 0.9);
      const steps = 12;
      for (let i = 0; i < steps; i += 2) {
        const t1 = i / steps;
        const t2 = (i + 1) / steps;
        graphics.lineBetween(
          ax + (a2x - ax) * t1, ay + (a2y - ay) * t1,
          ax + (a2x - ax) * t2, ay + (a2y - ay) * t2
        );
      }

      // sudut siku-siku di titik tengah
      const mx = (ax + a2x) / 2;
      const my = (ay + a2y) / 2;
      const s = 6;
      graphics.lineStyle(1, 0x888888, 0.9);
      if (type === "sumbux") {
        graphics.strokeRect(mx, my, s, -s);
      } else {
        graphics.strokeRect(mx, my, s, s);
      }

      // titik A
      graphics.fillStyle(0x2391ff, 1);
      graphics.fillCircle(ax, ay, 7);

      // titik A'
      graphics.fillStyle(0x1bffb7, 1);
      graphics.fillCircle(a2x, a2y, 7);

      // label jarak
      graphics.lineStyle(1, 0x2391ff, 0.5);
      if (type === "sumbux") {
        graphics.lineBetween(ax - 2, ay, ax - 2, originY);
        graphics.lineBetween(a2x - 2, a2y, a2x - 2, originY);
      } else {
        graphics.lineBetween(ax, ay - 2, originX, ay - 2);
        graphics.lineBetween(a2x, a2y - 2, originX, a2y - 2);
      }
    };

    // label teks statis (sumbu, titik, info)
    scene.trackObject(
      scene.add.text(toSX(6) + 8, originY - 6, "x", {
        fontSize: "13px", color: "#ffffff"
      }).setScrollFactor(0).setDepth(2001)
    );
    scene.trackObject(
      scene.add.text(originX + 4, toSY(4) - 14, "y", {
        fontSize: "13px", color: "#ffffff"
      }).setScrollFactor(0).setDepth(2001)
    );

    // tick numbers
    [-3, -2, -1, 1, 2, 3].forEach(v => {
      scene.trackObject(
        scene.add.text(toSX(v) - 5, originY + 5, `${v}`, {
          fontSize: "10px", color: "#ffffff"
        }).setScrollFactor(0).setDepth(2001)
      );
      scene.trackObject(
        scene.add.text(originX + 4, toSY(v) - 6, `${v}`, {
          fontSize: "10px", color: "#ffffff"
        }).setScrollFactor(0).setDepth(2001)
      );
    });

    // label titik A dan A' (di-update saat tombol dipilih)
    const labelA = scene.trackObject(
      scene.add.text(toSX(3) + 8, toSY(3) - 16, "A(3, 3)", {
        fontSize: "13px", color: "#2391ff", fontStyle: "bold"
      }).setScrollFactor(0).setDepth(2002)
    );

    const labelA2 = scene.trackObject(
      scene.add.text(0, 0, "", {
        fontSize: "13px", color: "#1bffb7", fontStyle: "bold"
      }).setScrollFactor(0).setDepth(2002)
    );

    // info box: aturan koordinat
    const infoBox = scene.trackObject(
      scene.add.rectangle(camW / 2 + 200, originY - 40, 190, 70, 0x222222)
        .setStrokeStyle(0.5, 0x555555)
        .setScrollFactor(0).setDepth(2001)
    );

    const infoRule = scene.trackObject(
      scene.add.text(camW / 2 + 200, originY - 58, "", {
        fontSize: "12px", color: "#ffffff", fontStyle: "bold", align: "center"
      }).setOrigin(0.5).setScrollFactor(0).setDepth(2002)
    );

    const infoCoord = scene.trackObject(
      scene.add.text(camW / 2 + 200, originY - 40, "", {
        fontSize: "12px", color: "#1bffb7", align: "center"
      }).setOrigin(0.5).setScrollFactor(0).setDepth(2002)
    );

    const infoNote = scene.trackObject(
      scene.add.text(camW / 2 + 200, originY - 24, "", {
        fontSize: "11px", color: "#ffffff", align: "center"
      }).setOrigin(0.5).setScrollFactor(0).setDepth(2002)
    );

    // garis cermin label
    const mirrorLabel = scene.trackObject(
      scene.add.text(0, 0, "", {
        fontSize: "12px", color: "#ffcb81"
      }).setScrollFactor(0).setDepth(2002)
    );

    // legend
    const legendItems = [
      { color: "#2391ff", label: "Titik asal A" },
      { color: "#1bffb7", label: "Bayangan A'" },
      { color: "#ffcb81", label: "Garis cermin" },
    ];

    legendItems.forEach((item, i) => {
      const lx = toSX(-6) - 130;
      const ly = toSY(4) + 20 + i * 18;

      const dot = scene.trackObject(
        scene.add.circle(lx + 6, ly + 6, 5, parseInt(item.color.replace("#", "0x")))
          .setScrollFactor(0).setDepth(2002)
      );
      scene.trackObject(
        scene.add.text(lx + 16, ly, item.label, {
          fontSize: "10px", color: "#ffffff", fontFamily: 'Poppins, sans-serif'
        }).setScrollFactor(0).setDepth(2002)
      );
    });

    // ---- fungsi update saat tombol dipilih ----
    const update = (type) => {
      drawScene(type);

      if (type === "sumbux") {
        labelA2.setText("A'(3, -3)");
        labelA2.setPosition(toSX(3) + 8, toSY(-3) + 8);
        mirrorLabel.setText("Sumbu X");
        mirrorLabel.setPosition(toSX(-6) - 35, originY - 18);
        infoRule.setText("Refleksi terhadap sumbu X");
        infoCoord.setText("A(3, 3)  →  A'(3, -3)");
        infoNote.setText("x tetap  ·  y berubah tanda");
      } else {
        labelA2.setText("A'(-3, 3)");
        labelA2.setPosition(toSX(-3) - 70, toSY(3) - 16);
        mirrorLabel.setText("Sumbu Y");
        mirrorLabel.setPosition(originX + 20, toSY(4) - 15);
        infoRule.setText("Refleksi terhadap sumbu Y");
        infoCoord.setText("A(3, 3)  →  A'(-3, 3)");
        infoNote.setText("y tetap  ·  x berubah tanda");
      }

      scene.hasInteracted = true;
    };

    // gambar awal (sumbu X)
    update("sumbux");
    
    // buat tombol pilihan manual
    const centerX = scene.cameras.main.width / 2 - 240;
    const btnData = slide.interaction.button;
    const btnY = scene.cameras.main.height / 2 + 110;
    const startX = centerX - ((btnData.length - 1) * 110) / 2;
    
    btnData.forEach((btn, i) => {
      const bx = startX + i * 110;
    
      const label = scene.trackObject(
        scene.add.text(bx, btnY, btn.label, {
          fontSize: "14px",
          color: "#ffffff"
        })
          .setOrigin(0.5)
          .setScrollFactor(0)
          .setDepth(2002)
      );
  
      const rect = scene.trackObject(
        scene.add.rectangle(bx, btnY, label.width + 40, label.height + 20, 0x333333)
          .setScrollFactor(0)
          .setDepth(2001)
          .setInteractive({ useHandCursor: true })
      );
  
      label.setPosition(rect.x, rect.y);
  
      rect.on("pointerover", () => rect.setFillStyle(0x555555));
      rect.on("pointerout",  () => rect.setFillStyle(0x333333));
      rect.on("pointerdown", () => update(btn.value));
    });

    scene.uiElements ??= [];
    scene._interactiveObjects.forEach(obj => {
      if (!scene.uiElements.includes(obj)) scene.uiElements.push(obj);
    });
  },

  // ================= Slide 2 =================
  // Multi-step quiz aturan koordinat
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
      scene.add.text(centerX, centerY - 30, "", {
        fontFamily: 'Noto Sans, sans-serif',
        fontSize: "16px",
        color: "#ffffff",
        align: "center",
        wordWrap: { width: 420 }
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
      questionText.setText(stepData.question);

      stepData.options.forEach((opt, i) => {
        const cols = 2;
        const spacingX = 20;
        const spacingY = 50;

        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = centerX + (col - 0.5) * (140 + spacingX);
        const y = centerY + 20 + row * spacingY;

        const text = scene.trackObject(
          scene.add.text(x, y, opt, {
            fontSize: "15px",
            color: "#ffffff",
            fixedWidth: 130,
            align: "center"
          })
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(2002)
        );

        const btn = scene.trackObject(
          scene.add.rectangle(x, y, 130, text.height + 20, 0x333333)
            .setScrollFactor(0)
            .setDepth(2001)
            .setInteractive()
        );

        text.setPosition(btn.x, btn.y);

        btn.on("pointerdown", () => {
          const isCorrect = opt === stepData.correct;
          const isLastStep = currentStep === slide.interaction.steps.length - 1;

          if (isCorrect) {
            btn.setFillStyle(0x2ecc71);
            optionObjects.forEach(o => o.disableInteractive());

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
              optionObjects.forEach(o => o.disableInteractive());

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
  }

};