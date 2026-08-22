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
   CURRENT YEAR
===================================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}



/* =====================================================
   TYPING EFFECT
===================================================== */

const typingElements =
    document.querySelectorAll(".typing-title");


function typeText(element) {

    if (element.dataset.typed === "true") {
        return;
    }

    const text =
        element.getAttribute("data-text");

    if (!text) {
        return;
    }

    element.dataset.typed = "true";

    element.innerHTML = "";

    let index = 0;


    const cursor = document.createElement("span");

    cursor.className = "typing-cursor";

    cursor.textContent = "|";


    function type() {

        if (index < text.length) {

            element.insertBefore(
                document.createTextNode(
                    text.charAt(index)
                ),
                cursor
            );

            index++;

            setTimeout(type, 35);

        } else {

            setTimeout(() => {

                cursor.classList.add("typing-finished");

            }, 800);

        }

    }


    element.appendChild(cursor);

    type();

}



/* =====================================================
   TYPING CURSOR STYLE
===================================================== */

const typingStyle =
    document.createElement("style");

typingStyle.textContent = `

    .typing-cursor {

        display: inline-block;

        margin-left: 4px;

        color: #38ff72;

        font-weight: 400;

        animation:
            typingCursorBlink
            0.8s
            infinite;

    }


    .typing-cursor.typing-finished {

        opacity: 0;

        transition: opacity 0.5s ease;

    }


    @keyframes typingCursorBlink {

        0%,
        50% {

            opacity: 1;

        }

        51%,
        100% {

            opacity: 0;

        }

    }

`;

document.head.appendChild(typingStyle);



/* =====================================================
   TYPING OBSERVER
===================================================== */

if ("IntersectionObserver" in window) {

    const typingObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        typeText(entry.target);

                        typingObserver.unobserve(
                            entry.target
                        );

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

} else {

    typingElements.forEach(element => {

        typeText(element);

    });

}



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
            .querySelectorAll(".faq-item.active")
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

        category:
            "ARTIFICIAL INTELLIGENCE",

        title:
            "AI Research",

        description:
            "Eksplorasi Artificial Intelligence dan Machine Learning untuk memahami bagaimana model dapat digunakan dalam menyelesaikan permasalahan dunia nyata.",

        overview:
            "Project ini berfokus pada proses eksperimen AI mulai dari pengumpulan dan preprocessing data, eksplorasi algoritma, training model, evaluasi performa, hingga analisis hasil.",

        technologies: [
            "Python",
            "Machine Learning",
            "Artificial Intelligence",
            "Data Processing"
        ],

        status:
            "Research & Experiment",

        link:
            "#"

    },


    village: {

        number: "02",

        category:
            "WEB DEVELOPMENT",

        title:
            "Digital Village",

        description:
            "Website informasi desa dengan desain modern, responsif, dan mudah digunakan oleh masyarakat.",

        overview:
            "Project ini dirancang sebagai platform informasi digital desa yang dapat menampilkan informasi, berita, kegiatan, layanan, serta berbagai informasi publik secara lebih modern.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design"
        ],

        status:
            "Development",

        link:
            "#"

    },


    data: {

        number: "03",

        category:
            "DATA SCIENCE",

        title:
            "Data Analytics",

        description:
            "Eksperimen pengolahan data untuk menemukan pola, insight, dan informasi yang dapat digunakan sebagai dasar pengambilan keputusan.",

        overview:
            "Project ini mencakup data cleaning, exploratory data analysis, transformasi data, visualisasi, serta interpretasi hasil menggunakan pendekatan statistik dan data science.",

        technologies: [
            "Python",
            "Pandas",
            "NumPy",
            "SQL",
            "Data Visualization"
        ],

        status:
            "Research & Experiment",

        link:
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

        overview:
            "Project ini mengeksplorasi pembuatan Expert Advisor untuk XAUUSD, termasuk signal generation, risk management, spread filtering, stop loss, take profit, backtesting, dan evaluasi strategi.",

        technologies: [
            "MQL5",
            "MetaTrader 5",
            "XAUUSD",
            "Algorithmic Trading",
            "Backtesting"
        ],

        status:
            "Experimental / Backtesting",

        link:
            "#"

    }

};



/* =====================================================
   PROJECT MODAL ELEMENTS
===================================================== */

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

const modalStatus =
    document.getElementById("modalStatus");

const modalProjectLink =
    document.getElementById("modalProjectLink");



/* =====================================================
   OPEN PROJECT MODAL
===================================================== */

function openProject(projectID) {

    const project =
        projects[projectID];

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


    modalStatus.textContent =
        project.status;


    modalTags.innerHTML = "";


    project.technologies.forEach(technology => {

        const tag =
            document.createElement("span");

        tag.textContent =
            technology;

        modalTags.appendChild(tag);

    });


    modalProjectLink.href =
        project.link;


    /*
       Kalau project belum memiliki link,
       tombol tidak dibuat seolah-olah
       memiliki halaman.
    */

    if (
        !project.link ||
        project.link === "#"
    ) {

        modalProjectLink.style.display =
            "none";

    } else {

        modalProjectLink.style.display =
            "inline-flex";

    }


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
   CLOSE PROJECT MODAL
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
   PROJECT CARD CLICK
===================================================== */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(card => {

    card.addEventListener(
        "click",
        event => {

            /*
               Kalau yang diklik adalah
               link/button di dalam card,
               tetap buka modal.
            */

            const projectID =
                card.dataset.project;

            openProject(projectID);

        }
    );


    /*
       Bisa dibuka dengan keyboard
       menggunakan Enter atau Space.
    */

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
   CLOSE BUTTON
===================================================== */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProject
    );

}



/* =====================================================
   CLICK OUTSIDE MODAL
===================================================== */

if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeProject
    );

}



/* =====================================================
   ESC TO CLOSE
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
