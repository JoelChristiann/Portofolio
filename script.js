/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", () => {

        mobileNav.classList.toggle("active");

    });


    mobileNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("active");

        });

    });

}


/* =====================================================
   YEAR
===================================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =====================================================
   TYPING EFFECT
===================================================== */

const typingElements = document.querySelectorAll(".typing-title");


function typeText(element) {

    const text = element.dataset.text;

    if (!text) {
        return;
    }

    element.textContent = "";
    element.classList.add("typing-active");

    let index = 0;

    const speed = 45;


    function type() {

        if (index < text.length) {

            element.textContent += text.charAt(index);

            index++;

            setTimeout(type, speed);

        } else {

            element.classList.remove("typing-active");

        }

    }

    type();
}


/*
   Jalankan typing ketika elemen
   masuk ke layar.
*/

const typingObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const element = entry.target;

                if (!element.dataset.typed) {

                    element.dataset.typed = "true";

                    typeText(element);

                }

                observer.unobserve(element);

            }

        });

    },
    {
        threshold: 0.25
    }
);


typingElements.forEach(element => {

    typingObserver.observe(element);

});


/* =====================================================
   PROJECT DATA
===================================================== */

const projects = {

    ai: {

        category: "ARTIFICIAL INTELLIGENCE",

        title: "AI Research",

        description:
            "Eksplorasi Machine Learning dan Artificial Intelligence untuk menyelesaikan permasalahan dunia nyata.",

        details:
            "Project ini menjadi bagian dari eksplorasi saya dalam memahami bagaimana data dapat diproses menjadi model machine learning yang mampu melakukan klasifikasi, prediksi, atau analisis. Fokus pengembangan meliputi preprocessing data, training model, evaluasi, dan eksperimen terhadap berbagai pendekatan.",

        technologies: [
            "Python",
            "Machine Learning",
            "Artificial Intelligence",
            "Data Processing"
        ],

        link: "#"

    },


    web: {

        category: "WEB DEVELOPMENT",

        title: "Digital Village",

        description:
            "Website informasi desa dengan pendekatan modern, responsive, dan mudah digunakan.",

        details:
            "Project ini dikembangkan sebagai platform informasi digital untuk membantu masyarakat mendapatkan informasi mengenai desa. Konsep desain dibuat modern dengan fokus pada struktur informasi, responsive design, navigasi, dan pengalaman pengguna.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design"
        ],

        link: "#"

    },


    data: {

        category: "DATA SCIENCE",

        title: "Data Analytics",

        description:
            "Eksplorasi pengolahan data untuk menghasilkan insight melalui analisis dan visualisasi.",

        details:
            "Project ini berfokus pada proses pengolahan data mulai dari data cleaning, exploratory data analysis, identifikasi pola, hingga visualisasi. Tujuannya adalah mengubah data mentah menjadi informasi yang lebih mudah dipahami dan digunakan untuk pengambilan keputusan.",

        technologies: [
            "Python",
            "Pandas",
            "NumPy",
            "SQL",
            "Data Visualization"
        ],

        link: "#"

    },


    trading: {

        category: "ALGORITHMIC TRADING",

        title: "XAUUSD Trading EA",

        description:
            "Eksperimen Expert Advisor untuk XAUUSD menggunakan MQL5 dan MetaTrader 5.",

        details:
            "Project ini merupakan eksperimen pengembangan Expert Advisor pada MetaTrader 5. Sistem dirancang untuk menguji strategi trading secara sistematis melalui indikator, risk management, spread filter, position management, serta backtesting. Hasil pengujian harus tetap divalidasi melalui data out-of-sample dan akun demo sebelum digunakan pada kondisi nyata.",

        technologies: [
            "MQL5",
            "MetaTrader 5",
            "XAUUSD",
            "Algorithmic Trading",
            "Backtesting"
        ],

        link: "#"

    }

};


/* =====================================================
   PROJECT MODAL
===================================================== */

const projectCards = document.querySelectorAll(".project-card");

const projectModal = document.getElementById("projectModal");

const modalOverlay = document.getElementById("modalOverlay");

const modalClose = document.getElementById("modalClose");

const modalCategory = document.getElementById("modalCategory");

const modalTitle = document.getElementById("modalTitle");

const modalDescription = document.getElementById("modalDescription");

const modalDetails = document.getElementById("modalDetails");

const modalTags = document.getElementById("modalTags");

const modalProjectLink = document.getElementById("modalProjectLink");


function openProject(projectKey) {

    const project = projects[projectKey];

    if (!project) {
        return;
    }


    modalCategory.textContent = project.category;

    modalTitle.textContent = project.title;

    modalDescription.textContent = project.description;

    modalDetails.textContent = project.details;


    modalTags.innerHTML = "";


    project.technologies.forEach(technology => {

        const tag = document.createElement("span");

        tag.textContent = technology;

        modalTags.appendChild(tag);

    });


    modalProjectLink.href = project.link;


    /*
       Kalau link project masih "#",
       tombol dibuat tidak aktif.
    */

    if (project.link === "#") {

        modalProjectLink.style.display = "none";

    } else {

        modalProjectLink.style.display = "inline-flex";

    }


    projectModal.classList.add("active");

    projectModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

}


function closeProject() {

    projectModal.classList.remove("active");

    projectModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

}


/* =====================================================
   CLICK PROJECT
===================================================== */

projectCards.forEach(card => {

    card.addEventListener("click", () => {

        const projectKey = card.dataset.project;

        openProject(projectKey);

    });

});


/* =====================================================
   CLOSE MODAL
===================================================== */

modalClose.addEventListener("click", closeProject);

modalOverlay.addEventListener("click", closeProject);


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeProject();

    }

});


/* =====================================================
   FAQ
===================================================== */

const faqQuestions = document.querySelectorAll(".faq-question");


faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const currentItem = question.parentElement;


        document.querySelectorAll(".faq-item").forEach(item => {

            if (item !== currentItem) {

                item.classList.remove("active");

            }

        });


        currentItem.classList.toggle("active");

    });

});
