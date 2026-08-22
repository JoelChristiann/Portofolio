/* =====================================================
   MOBILE MENU
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

                mobileNav.classList.remove(
                    "active"
                );

            });

        });

}


/* =====================================================
   YEAR
===================================================== */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =====================================================
   TYPING EFFECT
===================================================== */

const typingElements =
    document.querySelectorAll(".typing-title");


const typingObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                const element =
                    entry.target;


                if (
                    element.dataset.typed === "true"
                ) {
                    return;
                }


                element.dataset.typed =
                    "true";


                const text =
                    element.dataset.text || "";


                element.textContent =
                    "";


                element.classList.add(
                    "typing-active"
                );


                let index = 0;


                function typeCharacter() {

                    if (index < text.length) {

                        element.textContent +=
                            text.charAt(index);

                        index++;

                        setTimeout(
                            typeCharacter,
                            42
                        );

                    } else {

                        element.classList.remove(
                            "typing-active"
                        );

                    }

                }


                typeCharacter();


                observer.unobserve(
                    element
                );

            });

        },

        {
            threshold: 0.2
        }

    );


typingElements.forEach(element => {

    typingObserver.observe(
        element
    );

});


/* =====================================================
   FAQ
===================================================== */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach(question => {

    question.addEventListener(
        "click",
        () => {

            const currentItem =
                question.closest(
                    ".faq-item"
                );


            document
                .querySelectorAll(
                    ".faq-item"
                )
                .forEach(item => {

                    if (
                        item !==
                        currentItem
                    ) {

                        item.classList.remove(
                            "active"
                        );

                    }

                });


            currentItem.classList.toggle(
                "active"
            );

        }
    );

});


/* =====================================================
   PROJECT DATA
===================================================== */

const projectData = {


    ai: {

        category:
            "ARTIFICIAL INTELLIGENCE",

        title:
            "AI Research",

        description:
            "Eksplorasi Artificial Intelligence dan Machine Learning untuk menyelesaikan permasalahan dunia nyata.",

        details:
            "Project ini berfokus pada eksplorasi proses machine learning mulai dari data preprocessing, eksplorasi dataset, training model, evaluasi performa, sampai analisis hasil. Tujuan utamanya adalah memahami bagaimana model AI dapat diterapkan untuk persoalan nyata.",

        technologies: [
            "Python",
            "Machine Learning",
            "Artificial Intelligence",
            "Pandas",
            "NumPy"
        ],

        link:
            "#"

    },


    web: {

        category:
            "WEB DEVELOPMENT",

        title:
            "Digital Village",

        description:
            "Website informasi desa dengan desain modern, responsive, dan mudah digunakan masyarakat.",

        details:
            "Project ini dibuat sebagai website informasi desa yang menampilkan berbagai informasi publik menggunakan pendekatan desain modern. Website menggunakan HTML, CSS, dan JavaScript serta dirancang agar tetap nyaman digunakan pada desktop maupun smartphone.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design",
            "GitHub Pages"
        ],

        link:
            "#"

    },


    data: {

        category:
            "DATA SCIENCE",

        title:
            "Data Analytics",

        description:
            "Eksplorasi pengolahan data untuk menghasilkan insight melalui analisis dan visualisasi.",

        details:
            "Project ini berfokus pada proses pengolahan data mulai dari data cleaning, exploratory data analysis, identifikasi pola, hingga visualisasi. Tujuannya adalah mengubah data mentah menjadi informasi yang lebih mudah dipahami.",

        technologies: [
            "Python",
            "Pandas",
            "NumPy",
            "SQL",
            "Data Visualization"
        ],

        link:
            "#"

    },


    trading: {

        category:
            "ALGORITHMIC TRADING",

        title:
            "XAUUSD Trading EA",

        description:
            "Eksperimen Expert Advisor untuk XAUUSD menggunakan MQL5 dan MetaTrader 5.",

        details:
            "Project ini merupakan eksperimen algorithmic trading yang mencakup pembuatan entry signal, Stop Loss, Take Profit, spread filter, risk management, pembatasan posisi, dan backtesting. Strategi tetap perlu melalui pengujian out-of-sample dan demo sebelum penggunaan nyata.",

        technologies: [
            "MQL5",
            "MetaTrader 5",
            "XAUUSD",
            "EMA",
            "RSI",
            "ATR",
            "Backtesting"
        ],

        link:
            "#"

    }

};


/* =====================================================
   MODAL ELEMENTS
===================================================== */

const projectModal =
    document.getElementById(
        "projectModal"
    );


const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalCategory =
    document.getElementById(
        "modalCategory"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


const modalDetails =
    document.getElementById(
        "modalDetails"
    );


const modalTags =
    document.getElementById(
        "modalTags"
    );


const modalProjectLink =
    document.getElementById(
        "modalProjectLink"
    );


/* =====================================================
   OPEN PROJECT
===================================================== */

function openProject(projectId) {

    const project =
        projectData[projectId];


    if (!project) {
        return;
    }


    modalCategory.textContent =
        project.category;


    modalTitle.textContent =
        project.title;


    modalDescription.textContent =
        project.description;


    modalDetails.textContent =
        project.details;


    modalTags.innerHTML =
        "";


    project.technologies.forEach(
        technology => {

            const tag =
                document.createElement(
                    "span"
                );

            tag.textContent =
                technology;

            modalTags.appendChild(
                tag
            );

        }
    );


    modalProjectLink.href =
        project.link;


    if (project.link === "#") {

        modalProjectLink.style.display =
            "none";

    } else {

        modalProjectLink.style.display =
            "inline-flex";

    }


    projectModal.classList.add(
        "active"
    );


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
   PROJECT CARDS
===================================================== */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(card => {


    card.addEventListener(
        "click",
        () => {

            openProject(
                card.dataset.project
            );

        }
    );


    card.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();


                openProject(
                    card.dataset.project
                );

            }

        }
    );

});


/* =====================================================
   CLOSE MODAL
===================================================== */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProject
    );

}


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
            projectModal.classList.contains(
                "active"
            )
        ) {

            closeProject();

        }

    }
);
