/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       YEAR
    ================================================== */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }



    /* =================================================
       NAVBAR SCROLL
    ================================================== */

    const navbar =
        document.querySelector(".navbar");

    function updateNavbar() {

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();



    /* =================================================
       MOBILE MENU
    ================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileNav =
        document.getElementById("mobileNav");


    if (menuToggle && mobileNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                mobileNav.classList.toggle(
                    "active"
                );

            }
        );


        mobileNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileNav.classList.remove(
                            "active"
                        );

                    }
                );

            });

    }



    /* =================================================
       TYPING EFFECT
    ================================================== */

    const typingElements =
        document.querySelectorAll(
            ".typing-title"
        );


    const typingObserver =
        new IntersectionObserver(
            entries => {

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


                    function type() {

                        if (index < text.length) {

                            element.textContent +=
                                text.charAt(index);

                            index++;

                            setTimeout(
                                type,
                                35
                            );

                        } else {

                            element.classList.remove(
                                "typing-active"
                            );

                        }

                    }


                    type();

                    typingObserver.unobserve(
                        element
                    );

                });

            },
            {
                threshold: 0.25
            }
        );


    typingElements.forEach(
        element => {

            typingObserver.observe(
                element
            );

        }
    );



    /* =================================================
       FAQ
    ================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );

        const answer =
            item.querySelector(
                ".faq-answer"
            );


        question.addEventListener(
            "click",
            () => {

                const isActive =
                    item.classList.contains(
                        "active"
                    );


                faqItems.forEach(
                    otherItem => {

                        otherItem.classList.remove(
                            "active"
                        );

                        const otherAnswer =
                            otherItem.querySelector(
                                ".faq-answer"
                            );

                        otherAnswer.style.maxHeight =
                            null;

                    }
                );


                if (!isActive) {

                    item.classList.add(
                        "active"
                    );

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                }

            }
        );

    });



    /* =================================================
       PROJECT DATA
    ================================================== */

    const projects = {

        ai: {

            number: "01",

            category:
                "ARTIFICIAL INTELLIGENCE",

            title:
                "AI Research",

            imageText:
                "AI",

            description:
                "Eksplorasi Artificial Intelligence dan Machine Learning untuk memahami bagaimana model berbasis data dapat digunakan untuk menyelesaikan permasalahan nyata.",

            status:
                "In Progress",

            technology:
                "Python · Machine Learning · AI",

            tags: [
                "Python",
                "Machine Learning",
                "Artificial Intelligence",
                "Data"
            ],

            demo:
                "#",

            github:
                "#"

        },


        village: {

            number: "02",

            category:
                "WEB DEVELOPMENT",

            title:
                "Digital Village",

            imageText:
                "WEB",

            description:
                "Website informasi desa dengan pendekatan modern, responsive, dan mudah digunakan untuk membantu masyarakat memperoleh informasi serta layanan desa.",

            status:
                "Completed",

            technology:
                "HTML · CSS · JavaScript",

            tags: [
                "HTML",
                "CSS",
                "JavaScript",
                "Responsive Web"
            ],

            demo:
                "#",

            github:
                "#"

        },


        data: {

            number: "03",

            category:
                "DATA SCIENCE",

            title:
                "Data Analytics",

            imageText:
                "DATA",

            description:
                "Proyek pengolahan data untuk melakukan data cleaning, exploratory analysis, visualisasi, dan menemukan insight yang dapat digunakan untuk pengambilan keputusan.",

            status:
                "In Progress",

            technology:
                "Python · Pandas · NumPy · SQL",

            tags: [
                "Python",
                "Pandas",
                "NumPy",
                "SQL",
                "Visualization"
            ],

            demo:
                "#",

            github:
                "#"

        },


        trading: {

            number: "04",

            category:
                "ALGORITHMIC TRADING",

            title:
                "XAUUSD Trading EA",

            imageText:
                "EA",

            description:
                "Eksperimen Expert Advisor pada MetaTrader 5 menggunakan MQL5 untuk menguji strategi trading XAUUSD secara sistematis melalui backtest dan optimasi parameter.",

            status:
                "Testing",

            technology:
                "MQL5 · MetaTrader 5",

            tags: [
                "MQL5",
                "MT5",
                "XAUUSD",
                "Algorithmic Trading"
            ],

            demo:
                "#",

            github:
                "#"

        }

    };



    /* =================================================
       MODAL ELEMENTS
    ================================================== */

    const modal =
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

    const modalNumber =
        document.getElementById(
            "modalNumber"
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

    const modalStatus =
        document.getElementById(
            "modalStatus"
        );

    const modalTech =
        document.getElementById(
            "modalTech"
        );

    const modalTags =
        document.getElementById(
            "modalTags"
        );

    const modalDemo =
        document.getElementById(
            "modalDemo"
        );

    const modalGithub =
        document.getElementById(
            "modalGithub"
        );

    const modalImageText =
        document.getElementById(
            "modalImageText"
        );



    /* =================================================
       OPEN PROJECT
    ================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    function openProject(projectId) {

        const project =
            projects[projectId];


        if (!project) {

            console.warn(
                "Project tidak ditemukan:",
                projectId
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


        modalStatus.textContent =
            project.status;


        modalTech.textContent =
            project.technology;


        modalImageText.textContent =
            project.imageText;


        /* TAGS */

        modalTags.innerHTML =
            "";


        project.tags.forEach(
            tag => {

                const element =
                    document.createElement(
                        "span"
                    );

                element.textContent =
                    tag;

                modalTags.appendChild(
                    element
                );

            }
        );


        /* LINKS */

        modalDemo.href =
            project.demo;


        modalGithub.href =
            project.github;


        /* OPEN */

        modal.classList.add(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );

    }



    /* =================================================
       PROJECT CARD CLICK
    ================================================== */

    projectCards.forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    const projectId =
                        card.dataset.project;

                    openProject(
                        projectId
                    );

                }
            );


            /* Keyboard */

            card.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        const projectId =
                            card.dataset.project;

                        openProject(
                            projectId
                        );

                    }

                }
            );

        }
    );



    /* =================================================
       CLOSE MODAL
    ================================================== */

    function closeModal() {

        modal.classList.remove(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    modalOverlay.addEventListener(
        "click",
        closeModal
    );



    /* =================================================
       ESCAPE
    ================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );

});

/* =====================================================
   PROJECT MODAL
===================================================== */

const projectData = {

    ai: {

        number: "01",

        category: "ARTIFICIAL INTELLIGENCE",

        title: "AI Research",

        description:
            "Eksplorasi Machine Learning untuk menyelesaikan permasalahan dunia nyata. Proyek ini menjadi bagian dari proses saya memahami bagaimana model AI dapat digunakan untuk menganalisis data dan menghasilkan solusi.",

        tags: [
            "Python",
            "Machine Learning",
            "Artificial Intelligence"
        ],

        status: "In Progress",

        technology:
            "Python · ML · AI",

        link: "#"

    },


    desa: {

        number: "02",

        category: "WEB DEVELOPMENT",

        title: "Digital Village",

        description:
            "Website informasi desa yang dirancang dengan pendekatan modern, responsive, dan mudah digunakan masyarakat. Website ini dibuat untuk menyajikan informasi desa secara lebih terstruktur dan digital.",

        tags: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design"
        ],

        status: "Completed",

        technology:
            "HTML · CSS · JavaScript",

        link: "#"

    },


    data: {

        number: "03",

        category: "DATA SCIENCE",

        title: "Data Analytics",

        description:
            "Eksperimen pengolahan data untuk menemukan pola, insight, dan informasi yang dapat digunakan sebagai dasar pengambilan keputusan.",

        tags: [
            "Python",
            "Pandas",
            "NumPy",
            "SQL"
        ],

        status: "In Progress",

        technology:
            "Python · Pandas · SQL",

        link: "#"

    },


    trading: {

        number: "04",

        category: "ALGORITHMIC TRADING",

        title: "XAUUSD Trading EA",

        description:
            "Eksperimen Expert Advisor untuk MetaTrader 5 menggunakan MQL5. Sistem dikembangkan untuk menguji strategi trading secara sistematis melalui backtest dan evaluasi performa.",

        tags: [
            "MQL5",
            "MetaTrader 5",
            "XAUUSD",
            "Algorithmic Trading"
        ],

        status: "Experimental",

        technology:
            "MQL5 · MT5",

        link: "#"

    }

};



function openProject(projectName) {

    const project = projectData[projectName];

    if (!project) return;


    document.getElementById("modalNumber").textContent =
        project.number;


    document.getElementById("modalCategory").textContent =
        project.category;


    document.getElementById("modalTitle").textContent =
        project.title;


    document.getElementById("modalDescription").textContent =
        project.description;


    document.getElementById("modalStatus").textContent =
        project.status;


    document.getElementById("modalTechnology").textContent =
        project.technology;


    document.getElementById("modalLink").href =
        project.link;


    const tagsContainer =
        document.getElementById("modalTags");


    tagsContainer.innerHTML = "";


    project.tags.forEach(function(tag) {

        const span =
            document.createElement("span");

        span.textContent = tag;

        tagsContainer.appendChild(span);

    });


    const modal =
        document.getElementById("projectModal");


    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow = "hidden";

}



function closeProject() {

    const modal =
        document.getElementById("projectModal");


    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow = "";

}



/* ESC untuk menutup */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeProject();

        }

    }
);
