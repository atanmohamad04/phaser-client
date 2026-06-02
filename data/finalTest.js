const finalTestQuestions = [

    // ===== Topik 1: Konsep Dasar & Sifat Refleksi (3 soal) =====
    {
        question: "Jarak titik ke cermin dengan jarak bayangannya ke cermin adalah?",
        options: ["Berbeda", "Sama", "Dua kali lipat", "Setengahnya"],
        correct: 1
    },
    {
        question: "Garis yang menghubungkan titik asli dengan bayangannya selalu ... dengan cermin.",
        options: ["Sejajar", "Tegak lurus", "Miring 45°", "Berpotongan"],
        correct: 1
    },
    {
        question: "Jika beberapa titik dicerminkan, garis-garis penghubung titik ke bayangannya bersifat?",
        options: ["Tegak lurus satu sama lain", "Saling sejajar", "Berpotongan di satu titik", "Membentuk sudut 90°"],
        correct: 1
    },

    // ===== Topik 2: Aturan Koordinat Refleksi (4 soal) =====
    {
        question: "Titik A(4, -2) dicerminkan terhadap sumbu X. Bayangannya adalah?",
        options: ["(-4, -2)", "(4, 2)", "(-4, 2)", "(2, 4)"],
        correct: 1
    },
    {
        question: "Titik B(-3, 5) dicerminkan terhadap sumbu Y. Bayangannya adalah?",
        options: ["(-3, -5)", "(3, 5)", "(5, -3)", "(-3, 5)"],
        correct: 1
    },
    {
        question: "Titik C(2, 7) dicerminkan terhadap titik asal O(0,0). Bayangannya adalah?",
        options: ["(2, -7)", "(-2, 7)", "(-2, -7)", "(7, 2)"],
        correct: 2
    },
    {
        question: "Titik P(3, 1) dicerminkan ke garis x = 5. Rumus bayangan x = 2(5) - 3 = ?",
        options: ["7", "8", "13", "2"],
        correct: 0
    },

    // ===== Topik 3: Matriks & Komposisi Refleksi (3 soal) =====
    {
        question: "Matriks refleksi terhadap sumbu Y adalah?",
        options: ["[[1,0],[0,-1]]", "[[-1,0],[0,1]]", "[[0,1],[1,0]]", "[[0,-1],[-1,0]]"],
        correct: 1
    },
    {
        question: "Matriks refleksi terhadap garis y = x adalah?",
        options: ["[[1,0],[0,1]]", "[[-1,0],[0,-1]]", "[[0,1],[1,0]]", "[[0,-1],[-1,0]]"],
        correct: 2
    },
    {
        question: "P(2, -5) dicerminkan ke y = -x, rumusnya (x,y) => (-y, -x). Hasilnya adalah?",
        options: ["(5, -2)", "(-5, 2)", "(2, 5)", "(-2, 5)"],
        correct: 0
    }

];

export default finalTestQuestions;