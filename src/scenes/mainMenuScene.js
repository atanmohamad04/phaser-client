import CharacterSystem from "../systems/characterSystem.js";
import { loadCharSprites } from "../utils/loadCharSprites.js";
import { createCharAnimations } from "../utils/createCharAnimations.js";
import { getCharKey } from "../utils/getCharKey.js";

export default class mainMenuScene extends Phaser.Scene {
    constructor() {
      super("mainMenuScene");
    
      this.characters = [
        {
          class: "Guard",
          subclass: "Swordmaster",
          skills: [
            {
              name:"Fractured Edge",
              type:"passive",
              description:"Serangan memiliki 25% peluang untuk mengurangi DEF target sebesar 10% selama 6 detik. Dapat ditumpuk hingga 2 kali (Durasi direset saat dipicu ulang)."
            },
            {
              name:"Flow of Blades",
              type:"passive",
              description:"Saat memicu combo, Combo Multiplier meningkat menjadi 110%."
            },
            {
              name:"Final Severance",
              type:"ultimate",
              description:"Serangan berikutnya memberikan 150% ATK sebagai damage. Memberikan tambahan damage sebesar 20% dari HP target yang telah hilang. Efek dikonsumsi setelah digunakan."
            }
          ]
        },
        {
          class: "Guard",
          subclass: "Primal Guard",
          skills: [
            {
              name:"Hunter’s Dominance",
              type:"passive",
              description:"Serangan memiliki 22% peluang untuk meningkatkan ATK diri sebesar 12% dan mengurangi ATK musuh sebesar 15% selama 4 detik (Durasi direset saat dipicu ulang)."
            },
            {
              name:"Wild Evasion",
              type:"passive",
              description:"Memiliki 10% peluang untuk menghindari serangan yang masuk."
            },
            {
              name:"Remnant Ash",
              type:"ultimate",
              description:"Max HP +25%. Serangan berubah menjadi True Damage. HP tidak dapat turun di bawah 1. Kehilangan 1.5% HP setiap detik (meningkat menjadi 3% per detik setelah 10 detik). Jika HP mencapai 1, unit akan mundur dari pertempuran setelah 10 detik. Durasi tidak terbatas."
            }
          ]
        },
        {
          class: "Defender",
          subclass: "Protector",
          skills: [
            {
              name:"Thorned Bulwark",
              type:"passive",
              description:"DEF +15%. Memantulkan damage sebesar 10% ATK kepada penyerang."
            },
            {
              name:"Last Bastion",
              type:"passive",
              description:"DEF meningkat seiring berkurangnya HP, hingga +10% Bonus maksimum tercapai saat HP di bawah 40%."
            },
            {
              name:"Fortress of Purity",
              type:"ultimate",
              description:"Max HP +5%, DEF +15%. Menghapus semua debuff aktif dan kebal terhadap debuff. Durasi: 16 detik."
            }
          ]
        },
        {
          class: "Defender",
          subclass: "Guardian",
          skills: [
            {
              name:"Recovery Protocol",
              type:"passive",
              description:"Jika tidak menerima damage selama 10 detik, memulihkan 1% Max HP per detik."
            },
            {
              name:"Penumbral Image",
              type:"passive",
              description:"Durasi Stagger -1.4 detik. Setiap 15 detik sejak pertempuran dimulai: Max HP +1%, DEF +0.5% (maks. 3 stack)."
            },
            {
              name:"Myriad Grains",
              type:"ultimate",
              description:"ATK +15%. Berhenti menyerang musuh; serangan akan memulihkan HP sebesar 30% ATK. Mendapatkan 10% Sanctuary (mengurangi damage yang diterima). Durasi: 20 detik."
            }
          ]
        },
        {
          class: "Specialist",
          subclass: "Alchemist",
          skills: [
            {
              name:"Catalytic Disruption",
              type:"passive",
              description:"Durasi Stagger musuh +1.4 detik."
            },
            {
              name:"Corrosive Infusion",
              type:"passive",
              description:"Serangan memberikan efek Poison. Poison memberikan damage sebesar 10% ATK per detik selama 3 detik (Durasi direset saat dipicu ulang)."
            },
            {
              name:"Murky Night",
              type:"ultimate",
              description:"Menghapus efek Stagger pada diri sendiri. Memberikan efek Silence pada musuh (menonaktifkan skill; memprioritaskan Ultimate yang belum aktif) dan efek poison meningkat menjadi 30%. Durasi 20 detik."
            }
          ]
        }
      ];
    }

    init() {
      this.game.events.emit("scene-loading-start");
    }

    preload() {
        this.load.image("bgMenu", "assets/ui/menu/bg-menu.jpg");
        this.load.image("btnPlay", "assets/ui/menu/play.png");
        this.load.image("btnLeaderboard", "assets/ui/menu/prize.png");
        this.load.image("btnClose", "assets/ui/btn/close.png");
        this.load.image("btnGameStart", "assets/ui/btn/leader.png");
        this.load.image("popupBg", "assets/ui/level_select/bg.png");
        this.load.image("btnNext", "assets/ui/btn/next.png");
        this.load.image("btnPrev", "assets/ui/btn/prew.png");
        this.load.image("passiveSkillBtn", "assets/ui/bubble/btn_1.png");
        this.load.image("ultSkillBtn", "assets/ui/btn/upgrade.png");
        this.load.image('rating_bg', 'assets/ui/rating/bg.png');
        this.load.image('rating_header', 'assets/ui/rating/header.png');
        this.load.image('rating_table', 'assets/ui/rating/table.png');
        this.load.image('rating_scroll', 'assets/ui/rating/scroll.png');
        this.load.image('rating_close', 'assets/ui/rating/close_2.png');
        this.load.image('rating_dot', 'assets/ui/rating/dot.png');
        this.load.image('prologueBg', 'assets/ui/shop/bg.png');
        this.load.image('prologueA1', 'assets/prologue/prologueA1.png');
        this.load.image('prologueB1', 'assets/prologue/prologueB1.png');
        this.load.image('prologueC1', 'assets/prologue/prologueC1.png');
        this.load.image('prologueD1', 'assets/prologue/prologueD1.png');
        this.load.image('prologueE1', 'assets/prologue/prologueE1.png');
        this.load.image('prologueF1', 'assets/prologue/prologueF1.png');
        this.load.image('prologueG1', 'assets/prologue/prologueG1.png');
        this.load.image('prologueH1', 'assets/prologue/prologueH1.png');
        this.load.image('prologueI1', 'assets/prologue/prologueI1.png');
        this.load.image('prologueJ1', 'assets/prologue/prologueJ1.png');
        this.load.image('prologueK1', 'assets/prologue/prologueK1.png');
        this.load.image('prologueL1', 'assets/prologue/prologueL1.png');
        this.load.audio("bgmMenu", "assets/audio/lobbyTheme.mp3");

        this.characters.forEach(char => {
          const className = char.class.toLowerCase().replace(/\s+/g, "");
          const subclass = char.subclass.toLowerCase().replace(/\s+/g, "");

          loadCharSprites(this, className, subclass, {
            actions: ["idle"],
            directions: ["front"]
          });
        });
    }

    create() {
        this.game.events.emit("scene-loading-done");
        this.isBotMatch = null;
        this.gameHasStarted = false;

        this.menuMusic = this.sound.add("bgmMenu", {
            loop: true,
            volume: 0
        });
      
        this.menuMusic.play();

        this.tweens.add({
            targets: this.menuMusic,
            volume: 0.5,
            duration: 1000,
            ease: "Linear"
        });

        this.currentCharacterIndex = 0;

        this.characters.forEach(char => {
          const className = char.class.toLowerCase().replace(/\s+/g, "");
          const subclass = char.subclass.toLowerCase().replace(/\s+/g, "");

          createCharAnimations(this, className, subclass, {
            actions: ["idle"],
            directions: ["front"]
          });
        });

        this.skillUI = [];

        for (let i = 0; i < 3; i++) {
          let baseY = this.scale.height / 2 - 60 + (i * 100);
        
          let icon = this.add.image(this.scale.width / 2 - 400, baseY, "passiveSkillBtn")
            .setScale(0.4)
            .setDepth(102)
            .setVisible(false);
        
          let title = this.add.text(this.scale.width / 2 - 360, baseY - 10, "", {
            fontFamily: 'Noto Sans, sans-serif',
            fontSize: "20px",
            color: "#ffffff",
            fontStyle: "bold"
          }).setDepth(102).setVisible(false);
        
          let desc = this.add.text(this.scale.width / 2 - 360, baseY + 20, "", {
            fontFamily: 'Noto Sans, sans-serif',
            fontSize: "18px",
            color: "#ebebeb",
            wordWrap: { width: 730 }
          }).setDepth(102).setVisible(false);
        
          this.skillUI.push({ icon, title, desc });
        }

        const { width, height } = this.scale;

        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.4)
        .setOrigin(0)
        .setDepth(1);

        this.add.image(width / 2, height / 2, "bgMenu")
        .setDisplaySize(width, height);

        this.gameTitle = this.add.text(this.scale.width / 2, 250, 'ISOMETRIA', {
          fontFamily: 'Noto Sans, sans-serif',
          fontSize: '96px',
          fontStyle: '900',
          fill: '#ffffff'
        })
        .setOrigin(0.5)
        .setDepth(10)
        .setStroke('#ffffff', 3)
        .setScrollFactor(0);

        const centerY = height / 2 + 100;
        const spacing = 120;

        const playButton = this.add.image(width / 2 - spacing, centerY, "btnPlay")
          .setInteractive()
          .setDepth(10)
          .setScale(0.2);

        playButton.on("pointerdown", () => {
          this.inputBlocker = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0)
          .setOrigin(0)
          .setDepth(50)
          .setInteractive();

          this.searchOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.6)
          .setOrigin(0)
          .setDepth(1000);

          this.searchBox = this.add.image(this.scale.width / 2, this.scale.height / 2, "popupBg")
          .setDepth(1001)
          .setScale(0.3);

          this.searchText = this.add.text(this.scale.width / 2, this.scale.height / 2, "Mencari lawan...",
            {
              fontFamily: 'Noto Sans, sans-serif',
              fontSize: "42px",
              color: "#ffffff"
            }
          )
          .setOrigin(0.5)
          .setDepth(1002)
          .setScrollFactor(0);
        
          window.socket.emit("joinQueue");
        });

        window.socket.on("matchFound", (data) => {
          this.isBotMatch = false;
          this.startAfterMatch();
        });
      
        window.socket.on("matchBot", (data) => {
          this.isBotMatch = true;             
          this.startAfterMatch();
        });

        window.socket.on("startGame", (data) => {
          if (this.gameHasStarted && this.startData) return;

          this.startData = data;
          this.gameHasStarted = true;

          this.tweens.add({
            targets: this.menuMusic,
            volume: 0,
            duration: 1000,
            ease: "Linear",
            onComplete: () => {
              this.menuMusic.stop();
              this.closePopup();
              
              if (this.isBotMatch) {
                let enemySelected;
                const selected = this.characters[this.currentCharacterIndex];
                do {
                  const randomIndex = Phaser.Math.Between(0, this.characters.length - 1);
                  enemySelected = this.characters[randomIndex];
                } while (enemySelected === selected);
              
                this.scene.start("gameScene", {
                  player: {
                    class: selected.class,
                    subclass: selected.subclass,
                    skills: selected.skills
                  },
                  enemy: {
                    class: enemySelected.class,
                    subclass: enemySelected.subclass,
                    skills: enemySelected.skills
                  },
                  myId: window.socket.id,
                  myRole: "P1",
                  mySpawn: "playerSpawn1",
                  enemySpawn: "playerSpawn2",
                  isMultiplayer: false
                });
    
              } else {
                const me = this.startData.players.find(p => p.id === window.socket.id);
                const enemy = this.startData.players.find(p => p.id !== window.socket.id);
              
                this.scene.start("gameScene", {
                  player: me.character,
                  enemy: enemy.character,
                  myId: window.socket.id,
                  myRole: me.role,
                  mySpawn: me.spawn,
                  enemySpawn: enemy.spawn,
                  isMultiplayer: true
                });
              }
    
              if (this.inputBlocker) {
                this.inputBlocker.destroy();
              }
            }
          });

        });

        const leaderboardButton = this.add.image(width / 2 + spacing, centerY, "btnLeaderboard")
          .setInteractive()
          .setDepth(10)
          .setScale(0.325);

        leaderboardButton.on("pointerdown", () => {
          this.showLeaderboard();
        });

        this.popupOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.6)
        .setOrigin(0)
        .setDepth(100)
        .setVisible(false);

        this.popupBox = this.add.image(this.scale.width / 2, this.scale.height / 2, "popupBg")
        .setDepth(101)
        .setVisible(false)
        .setScale(0.675, 0.4);

        this.gameStartBtn = this.add.image(this.scale.width / 2 + 500, this.scale.height / 2 + 220, "btnGameStart")
        .setInteractive()
        .setDepth(102)
        .setScale(0.3)
        .setVisible(false);
              
        this.gameStartBtn.on("pointerdown", () => {
          if (this.gameHasStarted) return;
          this.gameHasStarted = true;

          const selected = this.characters[this.currentCharacterIndex];

          window.socket.emit("selectCharacter", {
            class: selected.class,
            subclass: selected.subclass,
            skills: selected.skills,
            isBotMatch: this.isBotMatch
          });

          if (!this.isBotMatch) {
            this.gameStartBtn.setVisible(false);
            this.nextButton.setVisible(false);
            this.prevButton.setVisible(false);

            this.waitingOverlay = this.add.rectangle(
              0, 0,
              this.scale.width, this.scale.height,
              0x000000, 0.55
            )
            .setOrigin(0)
            .setDepth(102)
            .setScrollFactor(0)
            .setInteractive();

            this.waitingText = this.add.text(
              this.scale.width / 2,
              this.scale.height / 2 + 250,
              "Menunggu lawan...",
              {
                fontFamily: 'Noto Sans, sans-serif',
                fontSize: "28px",
                fontStyle: "bold",
                color: "#ffffff"
              }
            )
            .setOrigin(0.5)
            .setDepth(103)
            .setScrollFactor(0);

            let dotCount = 0;
            this._waitingDotTimer = this.time.addEvent({
              delay: 500,
              loop: true,
              callback: () => {
                dotCount = (dotCount + 1) % 4;
                const dots = '.'.repeat(dotCount);
                this.waitingText.setText(`Menunggu lawan${dots}`);
              }
            });
          }
        });

        this.classText = this.add.text(
          this.scale.width / 2 + 260,
          this.scale.height / 2 - 230,
          "",
          {
            fontFamily: 'Noto Sans, sans-serif',
            fontSize: "22px",
            fontStyle: "bold",
            color: "#ffffff",
            align: "center"
          }
        )
        .setOrigin(0.5)
        .setDepth(102)
        .setVisible(false);

        this.subClassText = this.add.text(
          this.scale.width / 2 + 260,
          this.scale.height / 2 - 160,
          "",
          {
            fontFamily: 'Noto Sans, sans-serif',
            fontSize: "22px",
            fontStyle: "bold",
            color: "#ffffff",
            align: "center"
          }
        )
        .setOrigin(0.5)
        .setDepth(102)
        .setVisible(false);

        const btnCenterX = this.scale.width / 2;
        const btnCenterY = this.scale.height / 2;
        const btnOffsetX = 500;

        this.prevButton = this.add.image(
          btnCenterX - btnOffsetX,
          btnCenterY,
          "btnPrev"
        )
        .setDepth(102)
        .setScale(0.3)
        .setInteractive()
        .setVisible(false);

        this.nextButton = this.add.image(
          btnCenterX + btnOffsetX,
          btnCenterY,
          "btnNext"
        )
        .setDepth(102)
        .setScale(0.3)
        .setInteractive()
        .setVisible(false);

        this.nextButton.on("pointerdown", () => {
          if (this.gameHasStarted) return;
          this.currentCharacterIndex++;
        
          if (this.currentCharacterIndex >= this.characters.length) {
            this.currentCharacterIndex = 0;
          }
      
          this.updateCharacterDisplay();
        });

        this.prevButton.on("pointerdown", () => {
          if (this.gameHasStarted) return;
          this.currentCharacterIndex--;
        
          if (this.currentCharacterIndex < 0) {
            this.currentCharacterIndex = this.characters.length - 1;
          }
      
          this.updateCharacterDisplay();
        });

        // Tampilkan prologue setiap kali masuk main menu
        this.showPrologue();
    }

    showPrologue() {
        const { width, height } = this.scale;
        const cx = width / 2;
        const cy = height / 2;

        this.prologueSlides = [
            'prologueA1', 'prologueB1', 'prologueC1', 'prologueD1',
            'prologueE1', 'prologueF1', 'prologueG1', 'prologueH1',
            'prologueI1', 'prologueJ1', 'prologueK1', 'prologueL1'
        ];
        this.prologueIndex = 0;

        this.prologueTexts = [
          "Sebelum memulai, pilih karakter dan lihat skill-skill yang akan kamu gunakan dalam pertarungan!",
          "Gunakan tombol arah untuk menggerakkan karaktermu menjelajahi peta. Perhatikan Indicator Progress di pojok kiri atas!",
          "Dekati Monument dan tekan tombol Interaksi untuk membaca isinya. Monument menyimpan materi pelajaran!",
          "Baca materi yang ditampilkan dengan seksama. Materi ini akan membantumu menjawab soal dalam pertarungan!",
          "Gunakan tombol interaksi untuk mengganti tampilan ilustrasi. Pahami konsep Refleksi terhadap Sumbu X dan Sumbu Y!",
          "Jawab Quiz Singkat dengan memilih jawaban yang benar sebelum memasuki arena pertarungan!",
          "Temukan End Portal dan tekan Masuk untuk melanjutkan ke area berikutnya!",
          "Di Shop, kamu bisa membeli skill menggunakan koin. Pilih skill yang tepat untuk mengalahkan musuh!",
          "Pertarungan dimulai! Jawab pertanyaan dengan benar sebelum Timer habis untuk menyerang musuh!",
          "Jika kamu salah dalam menjawab pertanyaan selama pertarungan, karaktermu akan dapat efek Staggered yang membuat kamu tidak bisa menjawab soal selama 4 detik. Tetap semangat dan jawab soal berikutnya!",
          "Jawab 3 soal berturut-turut dengan benar untuk memicu Combo! Saat Combo 3x tercapai, tombol Ultimate aktif. Ingat! tombol ultimate hanya bisa digunakan sekali dalam satu pertarungan, jadi gunakan dengan bijak!",
          "Kalahkan semua musuh untuk menang! Raih bintang sebanyak-banyaknya dan tingkatkan skormu!",
        ];

        // Container utama prologue
        this.prologueContainer = this.add.container(0, 0).setDepth(500);

        const inputBlocker = this.add.rectangle(0, 0, width, height, 0x000000, 0)
            .setOrigin(0)
            .setScrollFactor(0)
            .setInteractive();

        // Overlay gelap di belakang popup
        const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.75)
            .setOrigin(0)
            .setScrollFactor(0);

        // Background popup
        const bg = this.add.image(cx, cy, 'prologueBg')
            .setScrollFactor(0)
            .setDisplaySize(width * 1, height * 0.95);

        // Gambar slide aktif
        this.prologueSlideImg = this.add.image(cx, cy - 100, this.prologueSlides[0])
            .setScrollFactor(0)
            .setScale(0.45);

        this.prologueCaption = this.add.text(cx, cy + 160, this.prologueTexts[0], {
            fontFamily: 'Noto Sans, sans-serif',
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: width * 0.75 }
        })
        .setOrigin(0.5)
        .setScrollFactor(0);

        // Tombol Prev
        this.prologuePrevBtn = this.add.image(cx - width * 0.42, cy, 'btnPrev')
            .setScale(0.3)
            .setScrollFactor(0)
            .setInteractive()
            .setAlpha(0); // slide pertama, prev disembunyikan

        this.prologuePrevBtn.on('pointerdown', () => {
            if (this.prologueIndex <= 0) return;
            this.prologueIndex--;
            this._updatePrologueSlide();
        });

        // Tombol Next
        this.prologueNextBtn = this.add.image(cx + width * 0.42, cy, 'btnNext')
            .setScale(0.3)
            .setScrollFactor(0)
            .setInteractive();

        this.prologueNextBtn.on('pointerdown', () => {
            if (this.prologueIndex >= this.prologueSlides.length - 1) return;
            this.prologueIndex++;
            this._updatePrologueSlide();
        });

        // Tombol "Mulai" — hanya muncul di slide terakhir
        this.prologueStartBtn = this.add.text(cx, cy + height * 0.38, '✦  Mulai  ✦', {
            fontFamily: 'Noto Sans, sans-serif',
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#ffffff',
            backgroundColor: '#1a1a2e',
            padding: { x: 32, y: 14 }
        })
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setInteractive()
        .setVisible(false);

        this.prologueStartBtn.on('pointerdown', () => {
            this.closePrologue();
        });

        // Indikator slide (dot)
        this.prologueDots = [];
        const totalSlides = this.prologueSlides.length;
        const dotSpacing = 22;
        const dotsStartX = cx - ((totalSlides - 1) * dotSpacing) / 2;
        const dotsY = cy + height * 0.42;

        for (let i = 0; i < totalSlides; i++) {
            const dot = this.add.circle(dotsStartX + i * dotSpacing, dotsY, 5, 0xffffff, i === 0 ? 1 : 0.3)
                .setScrollFactor(0);
            this.prologueDots.push(dot);
        }

        this.prologueContainer.add([
            inputBlocker,
            overlay, bg,
            this.prologueSlideImg,
            this.prologueCaption,
            this.prologuePrevBtn, this.prologueNextBtn,
            this.prologueStartBtn,
            ...this.prologueDots
        ]);
    }

    _updatePrologueSlide() {
        const total = this.prologueSlides.length;
        const idx = this.prologueIndex;

        // Ganti gambar slide
        this.prologueSlideImg.setTexture(this.prologueSlides[idx]);

        this.prologueCaption.setText(this.prologueTexts[idx]);

        // Prev: tampil jika bukan slide pertama
        this.prologuePrevBtn.setAlpha(idx > 0 ? 1 : 0);

        // Next: sembunyi di slide terakhir
        this.prologueNextBtn.setVisible(idx < total - 1);

        // Tombol Mulai: hanya di slide terakhir
        this.prologueStartBtn.setVisible(idx === total - 1);

        // Update dot
        this.prologueDots.forEach((dot, i) => {
            dot.setAlpha(i === idx ? 1 : 0.3);
        });
    }

    closePrologue() {
        if (this.prologueContainer) {
            this.tweens.add({
                targets: this.prologueContainer,
                alpha: 0,
                duration: 400,
                ease: 'Linear',
                onComplete: () => {
                    this.prologueContainer.destroy(true);
                    this.prologueContainer = null;
                }
            });
        }
    }

    startAfterMatch() {
      if (this.searchText) {
        this.searchText.destroy();
      }
      if (this.searchBox) {
        this.searchBox.destroy();
      }
      if (this.searchOverlay) {
        this.searchOverlay.destroy();
      }

      this.handleStart();
    }

    handleStart() {
        this.popupOverlay.setVisible(true);
        this.popupBox.setVisible(true);
        // this.popupCloseBtn.setVisible(true);
        this.gameStartBtn.setVisible(true);
        this.classText.setVisible(true);
        this.subClassText.setVisible(true);
        this.skillUI.forEach(skill => {
          skill.icon.setVisible(true);
          skill.title.setVisible(true);
          skill.desc.setVisible(true);
        });

        this.nextButton.setVisible(true);
        this.prevButton.setVisible(true);

        this.updateCharacterDisplay();
    }

    closePopup() {
        // Bersihkan waiting text dan timer jika ada
        if (this._waitingDotTimer) {
            this._waitingDotTimer.remove(false);
            this._waitingDotTimer = null;
        }
        if (this.waitingText) {
            this.waitingText.destroy();
            this.waitingText = null;
        }
        if (this.waitingOverlay) {
            this.waitingOverlay.destroy();
            this.waitingOverlay = null;
        }

        this.popupOverlay.setVisible(false);
        this.popupBox.setVisible(false);
        // this.popupCloseBtn.setVisible(false);
        this.gameStartBtn.setVisible(false);
        this.classText.setVisible(false);
        this.subClassText.setVisible(false);
        this.skillUI.forEach(skill => {
          skill.icon.setVisible(false);
          skill.title.setVisible(false);
          skill.desc.setVisible(false);
        });

        this.nextButton.setVisible(false);
        this.prevButton.setVisible(false);

        if (this.currentCharSprite) {
            this.currentCharSprite.destroy();
            this.currentCharSprite = null;
        }
    }

    showLeaderboard() {
      const centerX = this.cameras.main.width / 2;
      const centerY = this.cameras.main.height / 2;
      const highScore = parseInt(localStorage.getItem('highScore')) || 0;

      this.leaderboardContainer = this.add.container(0, 0).setDepth(1000);

      const leaderboardOverlay = this.add.rectangle(
          0, 0,
          this.scale.width,
          this.scale.height,
          0x000000,
          0.6
      )
      .setOrigin(0)
      .setDepth(1000)
      .setScrollFactor(0);
    
      const bg = this.add.image(centerX, centerY, 'rating_bg')
          .setScale(0.4)
          .setDepth(1001)
          .setScrollFactor(0);
    
      const header = this.add.image(centerX, centerY - 200, 'rating_header')
          .setScale(0.3)
          .setDepth(1002)
          .setScrollFactor(0);
    
      const table = this.add.image(centerX, centerY + 20, 'rating_table')
          .setScale(0.4)
          .setDepth(1001)
          .setScrollFactor(0);
      
      const scoreText = this.add.text(centerX, centerY + 20, `High Score: ${highScore}`, {
          fontSize: '30px',
          color: '#141414',
          fontStyle: 'bold'
      }).setOrigin(0.5);
    
      const closeBtn = this.add.image(centerX + 230, centerY - 200, 'rating_close')
          .setScale(0.4)
          .setDepth(1003)
          .setScrollFactor(0)
          .setInteractive();
    
      closeBtn.on('pointerdown', () => {
          this.hideLeaderboard();
      });

      this.leaderboardContainer.add([
          leaderboardOverlay, bg, header, table, closeBtn, scoreText
      ]);
    }

    hideLeaderboard() {
      if (this.leaderboardContainer) {
        this.leaderboardContainer.destroy(true);
        this.leaderboardContainer = null;
      }
    }

    updateCharacterDisplay() {
        const char = this.characters[this.currentCharacterIndex];
    
        this.classText.setText(`Class:\n${char.class}`);
        this.subClassText.setText(`SubClass:\n${char.subclass}`);
    
        if (this.currentCharSprite) {
            this.currentCharSprite.destroy();
        }

        const charSystem = new CharacterSystem(this, char.class);
        charSystem.selectedSubclass = char.subclass;
      
        const key = getCharKey(charSystem, "idle", "front");
        const scaleMap = {
            defender: 0.38,
            guard: 0.49,
            specialist: 0.49
        };

        const keyScale = char.class.toLowerCase().replace(/\s+/g, "");

        this.currentCharSprite = this.add.sprite(
          this.scale.width / 2 - 15,
          this.scale.height / 2 - 200,
          key
        )
        .setDepth(102)
        .setScale(scaleMap[keyScale] || 0.25);

        this.currentCharSprite.anims.play(key, true);
        
        let skills = char.skills;

        skills.forEach((skill, index) => {
          let ui = this.skillUI[index];
        
          ui.title.setText(`${skill.name} (${skill.type})`);
          ui.desc.setText(skill.description);
        
          let isUltimate = skill.type === "ultimate";
          let iconKey = isUltimate ? "ultSkillBtn" : "passiveSkillBtn";

          ui.icon.setTexture(iconKey);
          ui.icon.setScale(isUltimate ? 0.25 : 0.4);
        });
    }
}