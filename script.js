// --- FORCE SCROLL TO TOP ON REFRESH ---
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}

window.onload = function() {
    window.scrollTo(0, 0);
}

// --- INTRO & TYPING ---
document.addEventListener("DOMContentLoaded", () => {
    const textToType = "MyPersonalPortfolio.js"; 
    const typingSpeed = 100; 
    const delayAfterTyping = 1500; 
    
    const typeElement = document.getElementById("typeName");
    const introOverlay = document.getElementById("introOverlay");
    
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            typeElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            setTimeout(hideIntro, delayAfterTyping);
        }
    }

    function hideIntro() {
        introOverlay.classList.add("slide-up");
        setTimeout(() => {
            introOverlay.style.display = "none";
        }, 1000); 
    }

    setTimeout(typeWriter, 1000);

    // --- SCROLL ANIMATION OBSERVER ---
    const observerOptions = {
        root: null,
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-animate");
            } else {
                entry.target.classList.remove("show-animate");
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        observer.observe(section);
    });
});

// --- PORTFOLIO TABS LOGIC ---
function openCategory(categoryName) {
    const allContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < allContents.length; i++) {
        allContents[i].classList.remove("active-content");
    }

    const allButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove("active");
    }

    document.getElementById(categoryName).classList.add("active-content");
    event.currentTarget.classList.add("active");
}

// --- PROJECT DETAIL SYSTEM ---
const projectsDB = [
    {
        id: 1,
        title: "My Personal Bot",
        category: "JavaScript Automation",
        image: "https://via.placeholder.com/800x400/2a1b3d/d8b4fe?text=Bot+Preview", 
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
        image: "https://via.placeholder.com/800x400/1a0b2e/d8b4fe?text=Ecotourism+Web", 
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

function openProject(id) {
    const project = projectsDB.find(p => p.id === id);

    if (project) {
        localStorage.setItem("currentProject", JSON.stringify(project));
        window.open("project-details.html", "_blank");
    }
}
