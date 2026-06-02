// ============================================================
//  MATERI 1: Konsep Dasar & Sifat-Sifat Refleksi
// ============================================================
const konsepRefleksi = [

  // ================= Slide 1 =================
  {
    title: "Kamu pasti pernah bercermin!",
    content: [
      "Coba berdiri di depan cermin. Angkat tangan kanan, bayangan kamu angkat tangan kiri.",
      "Bayangan itu ada di sisi yang berlawanan, tapi jaraknya ke cermin sama persis dengan jarak kamu ke cermin.",
      "Nah, dalam matematika, konsep itulah yang disebut Refleksi atau Pencerminan."
    ],
    interaction: {
      type: "button",
      action: "showMirrorIllustration",
      button: [
        { label: "Lihat Ilustrasi" }
      ],
      description: null
    }
  },

  // ================= Slide 2 =================
  {
    title: "Jadi apa aturannya?",
    content: [
      "Dari ilustrasi tadi, kamu bisa lihat 3 hal yang selalu berlaku saat refleksi:",
      "1. Jarak kamu ke cermin = jarak bayangan ke cermin. Selalu sama!",
      "2. Garis yang menghubungkan kamu dengan bayanganmu selalu tegak lurus cermin.",
      "3. Kalau ada beberapa titik, garis-garis yang menghubungkan titik asli ke bayangannya semuanya sejajar.",
      "Tiga hal ini adalah sifat refleksi yang berlaku di mana saja, termasuk di bidang matematika."
    ],
    interaction: null
  },

  // ================= Slide 3 =================
  {
    title: "Coba kamu cocokkan!",
    content: [
      "Sekarang kita lihat apakah kamu sudah paham sifat-sifat refleksi.",
      "Pasangkan setiap pernyataan di kiri dengan penjelasan yang tepat di kanan."
    ],
    interaction: {
      type: "match",
      action: "matchRefleksiSifat",
      description: "Cocokkan sifat refleksi dengan penjelasannya",
      pairs: [
        { left: "Jarak titik ke cermin", right: "Sama dengan jarak bayangan ke cermin" },
        { left: "Garis AA' dengan cermin", right: "Selalu tegak lurus" },
        { left: "Garis-garis penghubung A ke A'", right: "Saling sejajar satu sama lain" }
      ]
    }
  },

  // ================= Slide 4 =================
  {
    title: "Quiz Singkat",
    content: [
      "Rafi berdiri 80 cm di depan cermin.",
      "Berapa jarak bayangan Rafi dari cermin?"
    ],
    interaction: {
      type: "clickOption",
      options: ["40 cm", "160 cm", "80 cm", "20 cm"],
      correct: "80 cm",
      feedback: {
        correct: "Tepat! Jarak bayangan ke cermin selalu sama dengan jarak benda ke cermin.",
        wrong: "Ingat — bayangan ada di sisi lain cermin, tapi jaraknya ke cermin sama persis."
      }
    }
  },

  // ================= Slide 5 =================
  {
    title: "Tips Singkat",
    content: [
      "Refleksi = pencerminan. Bayangan ada di sisi lain garis cermin.",
      "Cara mudah ingat sifatnya:",
      "• Jarak? Sama!",
      "• Sudut dengan cermin? Tegak lurus (90°)!",
      "• Banyak titik? Semua garis penghubungnya sejajar!",
      "Kalau kamu ingat ketiga ini, kamu sudah menguasai dasar refleksi."
    ],
    interaction: null
  }
];

// ============================================================
//  MATERI 2: Aturan Koordinat Refleksi
// ============================================================
const aturanKoordinat = [

  // ================= Slide 1 =================
  {
    title: "Bayangan itu ada di mana tepatnya?",
    content: [
      "Oke, kita sudah tahu konsep refleksi dari kehidupan sehari-hari.",
      "Sekarang pertanyaannya: kalau titik A ada di koordinat (3, 3), bayangannya ada di mana?",
      "Jawabannya tergantung, cerminnya di mana? Di sumbu X? Sumbu Y? Atau garis lain?",
      "Yuk kita lihat satu per satu. Tidak ada yang perlu dihafal dulu, cukup perhatikan polanya!"
    ],
    interaction: null
  },

  // ================= Slide 2 =================
  {
    title: "Cermin di Sumbu X dan Sumbu Y",
    content: [
      "Bayangkan cermin dipasang tepat di sumbu X (garis horizontal di tengah). Titik A(3, 3) dicerminkan, bayangannya A'(3, -3). Nilai x tidak berubah, y tinggal dibalik tandanya.",
      "Sekarang cerminnya di sumbu Y (garis vertikal di tengah). Titik A(3, 3) dicerminkan, bayangannya A'(-3, 3). Nilai y tidak berubah, x yang dibalik tandanya."
    ],
    interaction: {
      type: "custom",
      action: "showAxisReflection",
      button: [
        { label: "Sumbu X", value: "sumbux" },
        { label: "Sumbu Y", value: "sumbuy" }
      ],
      mode: "choice",
      description: null
    }
  },

  // ================= Slide 3 =================
  {
    title: "Cermin di garis lain? Bisa juga!",
    content: [
      "Cermin tidak harus tepat di sumbu. Bisa di garis x = 2, atau y = -1, atau di mana saja.",
      "Kalau cermin di garis x = h, rumusnya: bayangan x = 2h - x (y tetap).",
      "Kalau cermin di garis y = k, rumusnya: bayangan y = 2k - y (x tetap).",
      "Kalau cermin di titik asal O(0,0), kedua koordinat tinggal dibalik: (x, y) => (-x, -y).",
      "Kedengarannya rumit? Tenang, coba dulu soal berikut, perlahan-lahan."
    ],
    interaction: null
  },

  // ================= Slide 4 =================
  {
    title: null,
    content: [],
    interaction: {
      type: "multiStepQuiz",
      action: "koordinatQuizFlow",
      steps: [
        {
          question: "Titik A(3, 5) dicerminkan ke garis x = 2. Rumusnya: bayangan x = 2(2) - 3 = ?",
          options: ["1", "-1", "4", "7"],
          correct: "1",
          stepFeedback: {
            correct: "Benar! 2×2 - 3 = 4 - 3 = 1. Jadi bayangan x-nya 1, y tetap 5.",
            wrong: "Coba hitung lagi: 2 × h - x = 2 × 2 - 3 = ?"
          }
        },
        {
          question: "Titik B(4, 6) dicerminkan ke garis y = 1. Rumusnya: bayangan y = 2(1) - 6 = ?",
          options: ["-4", "-6", "2", "-2"],
          correct: "-4",
          stepFeedback: {
            correct: "Tepat! 2×1 - 6 = 2 - 6 = -4. Jadi bayangan y-nya -4, x tetap 4.",
            wrong: "Coba hitung lagi: 2 × k - y = 2 × 1 - 6 = ?"
          }
        },
        {
          question: "Titik C(2, 5) dicerminkan ke titik asal O(0,0). Hasilnya adalah...",
          options: ["(-2, 5)", "(2, -5)", "(-2, -5)", "(2, 5)"],
          correct: "(-2, -5)",
          stepFeedback: {
            correct: "Benar! Cermin di O(0,0) berarti kedua tanda dibalik: C'(-2, -5).",
            wrong: "Kalau cerminnya di titik asal, kedua koordinat x dan y berubah tanda."
          }
        }
      ],
      feedback: {
        correct: "Keren! Kamu paham cara menghitung koordinat bayangan.",
        wrong: "Coba lagi pelan-pelan. Perhatikan rumus di slide sebelumnya.",
        tryAgain: "Salah, coba lagi."
      }
    }
  },

  // ================= Slide 5 =================
  {
    title: "Quiz Singkat",
    content: [
      "Titik P(5, -3) dicerminkan terhadap sumbu Y.",
      "Di mana koordinat bayangannya?"
    ],
    interaction: {
      type: "clickOption",
      options: ["(5, 3)", "(-5, -3)", "(-5, 3)", "(3, -5)"],
      correct: "(-5, -3)",
      feedback: {
        correct: "Betul! Cermin di sumbu Y, x berubah tanda sementara y tetap. Jadi P'(-5, -3).",
        wrong: "Ingat: cermin di sumbu Y hanya mengubah tanda x. Nilai y tidak berubah."
      }
    }
  },

  // ================= Slide 6 =================
  {
    title: "Tips Singkat",
    content: [
      "Cara cepat ingat aturan koordinat refleksi:",
      "• Sumbu X, y yang dibalik sementara x tetap",
      "• Sumbu Y, x yang dibalik sementara y tetap",
      "• Titik O, dua-duanya dibalik",
      "• Garis x = h, pakai rumus 2h - x",
      "• Garis y = k, pakai rumus 2k - y",
      "Triknya: lihat cerminnya horizontal atau vertikal, yang tegak lurus cermin itulah yang berubah."
    ],
    interaction: null
  }
];

// ============================================================
//  MATERI 3: Representasi Matriks & Komposisi Refleksi
// ============================================================
const matriksRefleksi = [

  // ================= Slide 1 =================
  {
    title: "Cara lain menghitung refleksi, pakai matriks!",
    content: [
      "Kamu sudah bisa hitung bayangan pakai rumus. Tapi ada cara lain yang lebih rapi: matriks.",
      "Matriks itu seperti 'mesin', kamu masukkan koordinat, keluar koordinat bayangan.",
      "Setiap jenis refleksi punya matriksnya sendiri. Tinggal pilih yang sesuai, lalu kalikan.",
      "Kedengarannya ribet? Sebenarnya tidak, kita lihat pelan-pelan."
    ],
    interaction: null
  },

  // ================= Slide 2 =================
  {
    title: "Matriks mana untuk refleksi mana?",
    content: [
      "Ini daftar matriks untuk tiap jenis refleksi. Coba pasangkan dulu sebelum lanjut!"
    ],
    interaction: {
      type: "match",
      action: "matchRefleksiMatriks",
      description: null,
      matrices: [
        { label: "Sumbu X",  rows: [[ 1,  0], [ 0, -1]] },
        { label: "Sumbu Y",  rows: [[-1,  0], [ 0,  1]] },
        { label: "y = x",    rows: [[ 0,  1], [ 1,  0]] },
        { label: "y = \u2212x", rows: [[ 0, -1], [-1,  0]] }
      ],
      pairs: [
        { left: "Sumbu X",    right: "[[1,0],[0,-1]]"  },
        { left: "Sumbu Y",    right: "[[-1,0],[0,1]]"  },
        { left: "Garis y = x",  right: "[[0,1],[1,0]]"   },
        { left: "Garis y = \u2212x", right: "[[0,-1],[-1,0]]" }
      ]
    }
  },

  // ================= Slide 3 =================
  {
    title: "Sekarang coba hitung!",
    content: [
      "Cara pakai matriks: kalikan baris matriks dengan kolom koordinat.",
      "Contoh: P(3, 2) dicerminkan ke sumbu X pakai matriks:"
    ],
    interaction: {
      type: "inlineMatrix",
      action: "showSingleMatriks",
      label: "Sumbu X",
      rows: [[1, 0], [0, -1]],
      caption: [
        "bayangan x = 1\u00d73 + 0\u00d72 = 3",
        "bayangan y = 0\u00d73 + (\u22121)\u00d72 = \u22122",
        "Hasilnya P'(3, \u22122). Sama seperti pakai rumus biasa!"
      ]
    }
  },

  // ================= Slide 4 =================
  {
    title: null,
    content: [],
    interaction: {
      type: "multiStepQuiz",
      action: "koordinatQuizFlow",
      steps: [
        {
          question: "P(3, 2) direfleksikan ke garis y = x. Matriks yang dipakai adalah...",
          options: ["[[1,0],[0,-1]]", "[[0,1],[1,0]]", "[[-1,0],[0,1]]", "[[0,-1],[-1,0]]"],
          correct: "[[0,1],[1,0]]",
          stepFeedback: {
            correct: "Benar! Refleksi y = x → matriks [[0,1],[1,0]]. Koordinat x dan y ditukar.",
            wrong: "Ingat: refleksi y = x itu menukar x dan y. Matriksnya [[0,1],[1,0]]."
          }
        },
        {
          question: "Pakai matriks [[0,1],[1,0]], hitung bayangan P(3, 2):\nx' = 0×3 + 1×2 = ?\ny' = 1×3 + 0×2 = ?",
          options: ["P'(3, 2)", "P'(2, 3)", "P'(-3, 2)", "P'(-2, -3)"],
          correct: "P'(2, 3)",
          stepFeedback: {
            correct: "Tepat! x' = 2, y' = 3. Jadi P'(2, 3). x dan y memang ditukar!",
            wrong: "Hitung satu per satu: x' = 0×3 + 1×2, lalu y' = 1×3 + 0×2."
          }
        },
        {
          question: "Masih pakai matriks yang sama, hitung bayangan Q(-1, 0).",
          options: ["Q'(-1, 0)", "Q'(0, -1)", "Q'(1, 0)", "Q'(0, 1)"],
          correct: "Q'(0, -1)",
          stepFeedback: {
            correct: "Benar! x' = 0×(-1) + 1×0 = 0, y' = 1×(-1) + 0×0 = -1. Jadi Q'(0, -1).",
            wrong: "Coba lagi: x' = 0×(-1) + 1×0 = ?, y' = 1×(-1) + 0×0 = ?"
          }
        }
      ],
      feedback: {
        correct: "Keren! Kamu sudah bisa pakai matriks untuk refleksi.",
        wrong: "Coba ulangi. Kalikan baris pertama matriks dengan koordinat untuk x', baris kedua untuk y'.",
        tryAgain: "Belum tepat, coba lagi."
      }
    }
  },

  // ================= Slide 5 =================
  {
    title: "Tips Singkat",
    content: [
      "Ingat matriks berikut untuk jenis-jenis refleksi yang umum:",
    ],
    interaction: {
      type: "tipsMatrix",
      action: "showTipsMatriks",
      matrices: [
        { label: "Sumbu X",  rows: [[ 1,  0], [ 0, -1]] },
        { label: "Sumbu Y",  rows: [[-1,  0], [ 0,  1]] },
        { label: "y = x",    rows: [[ 0,  1], [ 1,  0]] },
        { label: "y = \u2212x", rows: [[ 0, -1], [-1,  0]] }
      ]
    }
  }
];

// ============================================================
//  MAPPING MATERI KE MONUMENT
// ============================================================
const materialsData = {
  statueLeft1:  konsepRefleksi,
  statueRight1: konsepRefleksi,
  statueLeft2:  aturanKoordinat,
  statueRight2: aturanKoordinat,
  statueLeft3:  matriksRefleksi,
  statueRight3: matriksRefleksi,
};

export default materialsData;