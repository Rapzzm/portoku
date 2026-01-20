// --- FORCE SCROLL TO TOP ON REFRESH ---
// Mematikan fitur browser yang mengingat posisi scroll terakhir
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

// Paksa scroll ke titik 0,0 saat halaman dimuat
window.onload = function() {
    window.scrollTo(0, 0);
}
document.addEventListener("DOMContentLoaded", () => {
    // --- KONFIGURASI ---
    const textToType = "MyPersonalPortfolio.js"; // Nama website yang akan diketik
    const typingSpeed = 100; // Kecepatan mengetik (ms)
    const delayAfterTyping = 1500; // Waktu tunggu sebelum slide pindah (ms)
    
    // --- ELEMEN ---
    const typeElement = document.getElementById("typeName");
    const introOverlay = document.getElementById("introOverlay");
    
    let charIndex = 0;

    // Fungsi Mengetik
    function typeWriter() {
        if (charIndex < textToType.length) {
            typeElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Setelah selesai mengetik, tunggu sebentar lalu pindah slide
            setTimeout(hideIntro, delayAfterTyping);
        }
    }

    // Fungsi Pindah Slide (Hapus Overlay)
    function hideIntro() {
        introOverlay.classList.add("slide-up");
        
        // Opsional: Hapus elemen dari DOM agar tidak berat setelah animasi selesai
        setTimeout(() => {
            introOverlay.style.display = "none";
        }, 1000); // Sesuai durasi transisi CSS
    }

    // Mulai animasi setelah jeda singkat agar halaman siap
    setTimeout(typeWriter, 1000);
});



// --- PORTFOLIO TABS LOGIC ---
function openCategory(categoryName) {
    // 1. Sembunyikan semua konten tab
    const allContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < allContents.length; i++) {
        allContents[i].classList.remove("active-content");
    }

    // 2. Hilangkan status 'active' dari semua tombol
    const allButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove("active");
    }

    // 3. Tampilkan konten yang dipilih
    document.getElementById(categoryName).classList.add("active-content");

    // 4. Tambahkan status 'active' ke tombol yang diklik
    // (Kita cari tombol yang mentrigger event ini)
    event.currentTarget.classList.add("active");
}

// --- SCROLL ANIMATION OBSERVER ---
document.addEventListener("DOMContentLoaded", () => {
    
    // Opsi: threshold 0.3 artinya animasi jalan saat 30% section terlihat
 // --- 3. SCROLL ANIMATION OBSERVER (DIPERBAIKI) ---
 const observerOptions = {
    root: null,
    // Threshold 0.1: Begitu 10% bagian section muncul, animasi jalan.
    // rootMargin: Mengatur area pandang. '-50px' artinya animasi jalan sedikit sebelum benar-benar mentok atas/bawah agar lebih smooth.
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Jika masuk layar (walau sedikit)
        if (entry.isIntersecting) {
            entry.target.classList.add("show-animate");
        } 
        // Jika keluar layar
        else {
            entry.target.classList.remove("show-animate");
        }
    });
}, observerOptions);

const sections = document.querySelectorAll("section");
sections.forEach(section => {
    observer.observe(section);
});
});

// --- PROJECT DETAIL SYSTEM ---

// 1. Database Proyek (Simpan data di sini)
const projectsDB = [
    {
        id: 1,
        title: "My Personal Bot",
        category: "JavaScript Automation",
        image: "https://via.placeholder.com/800x400/2a1b3d/d8b4fe?text=Bot+Preview", // Ganti URL Foto
        description: "Bot otomatisasi yang terintegrasi dengan API Premiumku. Bot ini mampu mengelola transaksi, mengecek stok realtime, dan menghitung profit secara otomatis. Dibuat untuk mempermudah manajemen penjualan produk digital.",
        features: [
            "Integrasi API Premiumku",
            "Sistem Cek Stok Realtime",
            "Kalkulasi Profit Otomatis",
            "Respon Cepat & Ringan"
        ],
        tech: ["Node.js", "JavaScript", "API Integration", "JSON"]
    },
    {
        id: 2,
        title: "Ecotourism Web",
        category: "School Project",
        image: "https://via.placeholder.com/800x400/1a0b2e/d8b4fe?text=Ecotourism+Web", // Ganti URL Foto
        description: "Website edukasi mengenai pariwisata ramah lingkungan di Indonesia. Menampilkan destinasi wisata, dampak lingkungan, dan solusi pelestarian alam. Didesain dengan antarmuka yang bersih dan mudah dibaca.",
        features: [
            "Responsive Design",
            "Galeri Foto Wisata",
            "Artikel Edukasi",
            "Navigasi Interaktif"
        ],
        tech: ["HTML5", "CSS3", "Canva Design"]
    }
];

// 2. Fungsi saat kartu diklik
function openProject(id) {
    // Cari data proyek berdasarkan ID
    const project = projectsDB.find(p => p.id === id);

    if (project) {
        // Simpan data ke LocalStorage browser sementara
        localStorage.setItem("currentProject", JSON.stringify(project));

        // Buka halaman detail di TAB BARU ('_blank')
        window.open("project-details.html", "_blank");
    }
}