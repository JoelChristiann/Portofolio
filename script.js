/* =====================================================
   YEAR
===================================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


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
   TYPING EFFECT
===================================================== */

const typingElements = document.querySelectorAll(".typing-title");

const typingSpeed = 35;

const typingObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const element = entry.target;

            if (element.dataset.typed === "true") {
                return;
            }

            element.dataset.typed = "true";

            const text = element.dataset.text || "";

            element.textContent = "";

            let index = 0;

            function typeText() {

                if (index < text.length) {

                    element.textContent += text.charAt(index);

                    index++;

                    setTimeout(typeText, typingSpeed);

                }

            }

            typeText();

            typingObserver.unobserve(element);

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
   FAQ
===================================================== */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const currentItem =
            question.closest(".faq-item");

        document
            .querySelectorAll(".faq-item")
            .forEach(item => {

                if (item !== currentItem) {
                    item.classList.remove("active");
                }

            });

        currentItem.classList.toggle("active");

    });

});


/* =====================================================
   PROJECT DATA
===================================================== */

const projects = {

    ai: {

        number: "01",

        category: "ARTIFICIAL INTELLIGENCE",

        title: "AI Research",

        description:
            "Eksplorasi Artificial Intelligence dan Machine Learning untuk memahami bagaimana model dapat digunakan untuk menyelesaikan permasalahan dunia nyata.",

        overview:
            "Project ini berfokus pada proses eksperimen AI mulai dari memahami dataset, melakukan preprocessing, membangun model, melakukan training, mengevaluasi performa, hingga menganalisis hasil.",

        technologies: [
            "Python",
            "Scikit-learn",
            "Pandas",
            "NumPy",
            "Machine Learning",
            "AI"
        ],

        work: [
            "Data preprocessing",
            "Eksplorasi dataset",
            "Training machine learning model",
            "Evaluasi performa model",
            "Analisis hasil eksperimen"
        ],

        github: "#",

        demo: "#"

    },


    website: {

        number: "02",

        category: "WEB DEVELOPMENT",

        title: "Digital Village",

        description:
            "Website informasi desa dengan desain modern, responsive, dan mudah digunakan oleh masyarakat.",

        overview:
            "Project ini dibuat untuk menyediakan informasi desa secara digital. Struktur website dirancang agar informasi penting dapat ditemukan dengan mudah melalui perangkat desktop maupun smartphone.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design",
            "GitHub Pages"
        ],

        work: [
            "Membuat struktur halaman website",
            "Membangun responsive layout",
            "Membuat navigasi interaktif",
            "Membuat komponen informasi",
            "Deploy website menggunakan GitHub Pages"
        ],

        github: "#",

        demo: "#"

    },


    data: {

        number: "03",

        category: "DATA SCIENCE",

        title: "Data Analytics",

        description:
            "Project analisis data yang mengubah data mentah menjadi informasi dan insight yang lebih mudah dipahami.",

        overview:
            "Project ini berfokus pada proses pengolahan data mulai dari data cleaning, exploratory data analysis, visualisasi, hingga interpretasi hasil.",

        technologies: [
            "Python",
            "Pandas",
            "NumPy",
            "Matplotlib",
            "SQL",
            "Data Analysis"
        ],

        work: [
            "Data cleaning",
            "Exploratory Data Analysis",
            "Data transformation",
            "Data visualization",
            "Interpretasi insight"
        ],

        github: "#",

        demo: "#"

    },


    trading: {

        number: "04",

        category: "ALGORITHMIC TRADING",

        title: "XAUUSD Trading EA",

        description:
            "Eksperimen Expert Advisor untuk XAUUSD menggunakan MQL5 dan MetaTrader 5.",

        overview:
            "Project ini merupakan eksperimen algorithmic trading yang berfokus pada pengujian strategi secara sistematis. EA dirancang untuk membaca kondisi market dan mengeksekusi transaksi berdasarkan aturan yang telah ditentukan.",

        technologies: [
            "MQL5",
            "MetaTrader 5",
            "XAUUSD",
            "EMA",
            "RSI",
            "ATR"
        ],

        work: [
            "Membuat struktur Expert Advisor",
            "Membuat entry signal",
            "Mengatur Stop Loss dan Take Profit",
            "Membuat risk management",
            "Melakukan backtest",
            "Mengevaluasi hasil strategi"
        ],

        github: "#",

        demo: "#"

    }

};


/* =====================================================
   PROJECT MODAL
===================================================== */

const projectCards =
    document.querySelectorAll(".project-clickable");

const projectModal =
    document.getElementById("projectModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");

const modalNumber =
    document.getElementById("modalNumber");

const modalCategory =
    document.getElementById("modalCategory");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalOverview =
    document.getElementById("modalOverview");

const modalTags =
    document.getElementById("modalTags");

const modalWork =
    document.getElementById("modalWork");

const modalGithub =
    document.getElementById("modalGithub");

const modalDemo =
    document.getElementById("modalDemo");


/* =====================================================
   OPEN MODAL
===================================================== */

function openProject(projectId) {

    const project = projects[projectId];

    if (!project) {
        return;
    }

    modalNumber.textContent =
        project.number;

    modalCategory.textContent =
        project.category;

    modalTitle.textContent =
        project.title;

    modalDescription.textContent =
        project.description;

    modalOverview.textContent =
        project.overview;


    /* TAGS */

    modalTags.innerHTML = "";

    project.technologies.forEach(technology => {

        const tag =
            document.createElement("span");

        tag.textContent = technology;

        modalTags.appendChild(tag);

    });


    /* WORK */

    modalWork.innerHTML = "";

    project.work.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        modalWork.appendChild(li);

    });


    /* LINKS */

    modalGithub.href =
        project.github;

    modalDemo.href =
        project.demo;


    /* SHOW */

    projectModal.classList.add("active");

    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeProject() {

    projectModal.classList.remove("active");

    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


/* =====================================================
   CLICK PROJECT
===================================================== */

projectCards.forEach(card => {

    card.addEventListener("click", () => {

        const projectId =
            card.dataset.project;

        openProject(projectId);

    });


    /* KEYBOARD */

    card.addEventListener("keydown", event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            const projectId =
                card.dataset.project;

            openProject(projectId);

        }

    });

});


/* =====================================================
   CLOSE BUTTON
===================================================== */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProject
    );

}


/* =====================================================
   CLICK OUTSIDE
===================================================== */

if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeProject
    );

}


/* =====================================================
   ESCAPE
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            projectModal.classList.contains("active")
        ) {

            closeProject();

        }

    }
);
