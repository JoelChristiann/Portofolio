/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const mobileNav =
    document.getElementById("mobileNav");

if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", () => {

        mobileNav.classList.toggle("active");

    });


    mobileNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("active");

            });

        });

}


/* =====================================================
   FAQ
===================================================== */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const item =
            question.closest(".faq-item");

        document
            .querySelectorAll(".faq-item")
            .forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                }

            });

        item.classList.toggle("active");

    });

});


/* =====================================================
   PROJECT DATA
===================================================== */

const projectData = {

    ai: {

        number: "01",

        category:
            "ARTIFICIAL INTELLIGENCE",

        title:
            "AI Research",

        description:
            "Eksplorasi Artificial Intelligence dan Machine Learning untuk memahami bagaimana model dapat digunakan untuk menyelesaikan permasalahan nyata.",

        details:
            "Project ini menjadi bagian dari proses eksplorasi saya dalam Artificial Intelligence. Fokusnya mencakup pengolahan data, eksperimen model Machine Learning, evaluasi performa, serta memahami bagaimana model dapat diterapkan pada permasalahan dunia nyata.",

        tags: [
            "Python",
            "Machine Learning",
            "Artificial Intelligence"
        ],

        github:
            "#"

    },


    web: {

        number: "02",

        category:
            "WEB DEVELOPMENT",

        title:
            "Digital Village",

        description:
            "Website informasi desa dengan pendekatan modern, responsive, dan mudah digunakan oleh masyarakat.",

        details:
            "Project ini dibuat untuk membangun platform informasi digital desa. Website dirancang agar informasi seperti profil desa, layanan, berita, dan informasi masyarakat dapat disajikan secara modern dan mudah diakses.",

        tags: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design"
        ],

        github:
            "#"

    },


    data: {

        number: "03",

        category:
            "DATA SCIENCE",

        title:
            "Data Analytics",

        description:
            "Project analisis data untuk mengubah data mentah menjadi informasi dan insight yang dapat digunakan untuk pengambilan keputusan.",

        details:
            "Proses analisis mencakup data cleaning, exploratory data analysis, pengolahan dataset, visualisasi, serta interpretasi hasil. Tujuannya bukan sekadar membuat grafik, tetapi menemukan pola dan informasi yang relevan dari data.",

        tags: [
            "Python",
            "Pandas",
            "NumPy",
            "SQL",
            "Data Visualization"
        ],

        github:
            "#"

    },


    trading: {

        number: "04",

        category:
            "ALGORITHMIC TRADING",

        title:
            "XAUUSD Trading EA",

        description:
            "Eksperimen Expert Advisor untuk MetaTrader 5 menggunakan MQL5 dengan fokus pada pengujian strategi trading secara sistematis.",

        details:
            "Project ini merupakan eksperimen algorithmic trading menggunakan MQL5. Strategi diuji melalui MetaTrader 5 dengan memperhatikan entry signal, stop loss, take profit, spread, risk management, dan proses backtesting sebelum strategi dipertimbangkan untuk penggunaan lebih lanjut.",

        tags: [
            "MQL5",
            "MetaTrader 5",
            "XAUUSD",
            "Algorithmic Trading"
        ],

        github:
            "#"

    }

};


/* =====================================================
   MODAL ELEMENTS
===================================================== */

const projectModal =
    document.getElementById("projectModal");

const projectModalClose =
    document.getElementById("projectModalClose");

const projectModalOverlay =
    document.querySelector(
        ".project-modal-overlay"
    );

const modalNumber =
    document.getElementById("modalNumber");

const modalCategory =
    document.getElementById("modalCategory");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalDetails =
    document.getElementById("modalDetails");

const modalTags =
    document.getElementById("modalTags");

const modalGithub =
    document.getElementById("modalGithub");


/* =====================================================
   OPEN PROJECT
===================================================== */

function openProject(projectKey) {

    const project =
        projectData[projectKey];

    if (!project) {

        console.error(
            "Project tidak ditemukan:",
            projectKey
        );

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

    modalDetails.textContent =
        project.details;


    /* CLEAR TAGS */

    modalTags.innerHTML = "";


    /* CREATE TAGS */

    project.tags.forEach(tag => {

        const tagElement =
            document.createElement("span");

        tagElement.textContent =
            tag;

        modalTags.appendChild(
            tagElement
        );

    });


    /* PROJECT LINK */

    modalGithub.href =
        project.github;


    /* SHOW MODAL */

    projectModal.classList.add("active");

    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


/* =====================================================
   CLOSE PROJECT
===================================================== */

function closeProject() {

    projectModal.classList.remove(
        "active"
    );

    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* =====================================================
   CLICK PROJECT CARD
===================================================== */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );

projectCards.forEach(card => {

    card.addEventListener(
        "click",
        function(event) {

            /*
             * Kalau klik button,
             * button sendiri yang menangani.
             */

            if (
                event.target.closest(
                    ".project-open"
                )
            ) {

                return;

            }

            const projectKey =
                this.dataset.project;

            if (projectKey) {

                openProject(
                    projectKey
                );

            }

        }
    );

});


/* =====================================================
   CLICK VIEW PROJECT BUTTON
===================================================== */

const projectButtons =
    document.querySelectorAll(
        ".project-open"
    );

projectButtons.forEach(button => {

    button.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            event.stopPropagation();

            const card =
                this.closest(
                    ".project-card"
                );

            if (!card) return;

            const projectKey =
                card.dataset.project;

            if (projectKey) {

                openProject(
                    projectKey
                );

            }

        }
    );

});


/* =====================================================
   CLOSE BUTTON
===================================================== */

if (projectModalClose) {

    projectModalClose.addEventListener(
        "click",
        closeProject
    );

}


/* =====================================================
   CLOSE BY OVERLAY
===================================================== */

if (projectModalOverlay) {

    projectModalOverlay.addEventListener(
        "click",
        closeProject
    );

}


/* =====================================================
   CLOSE BY ESCAPE
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            projectModal.classList.contains(
                "active"
            )
        ) {

            closeProject();

        }

    }
);


/* =====================================================
   YEAR
===================================================== */

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}
