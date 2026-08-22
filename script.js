/* =====================================================
   NAVBAR
===================================================== */

const navbar =
    document.getElementById("navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const mobileNav =
    document.getElementById("mobileNav");


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



/* =====================================================
   TYPING TITLE
===================================================== */

const typingTitles =
    document.querySelectorAll(".typing-title");


function typeElement(element) {

    if (
        element.dataset.typed === "true"
    ) {
        return;
    }


    const text =
        element.dataset.text || "";


    element.dataset.typed =
        "true";


    element.classList.add(
        "typing-active"
    );


    element.textContent = "";


    let index = 0;


    const speed = 45;


    function type() {

        if (index < text.length) {

            element.textContent +=
                text.charAt(index);

            index++;

            setTimeout(
                type,
                speed
            );

        } else {

            setTimeout(() => {

                element.classList.remove(
                    "typing-active"
                );

            }, 500);

        }

    }


    type();

}


/* =====================================================
   INTERSECTION OBSERVER
===================================================== */

const typingObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    typeElement(
                        entry.target
                    );

                    typingObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .25
        }
    );


typingTitles.forEach(element => {

    typingObserver.observe(
        element
    );

});



/* =====================================================
   FAQ
===================================================== */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(item => {

    const question =
        item.querySelector(
            ".faq-question"
        );


    question.addEventListener(
        "click",
        () => {

            const isActive =
                item.classList.contains(
                    "active"
                );


            faqItems.forEach(otherItem => {

                otherItem.classList.remove(
                    "active"
                );


                const answer =
                    otherItem.querySelector(
                        ".faq-answer"
                    );


                answer.style.maxHeight =
                    null;

            });


            if (!isActive) {

                item.classList.add(
                    "active"
                );


                const answer =
                    item.querySelector(
                        ".faq-answer"
                    );


                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        }
    );

});



/* =====================================================
   PROJECT DATA
===================================================== */

const projects = {


    ai: {

        number:
            "01",

        category:
            "ARTIFICIAL INTELLIGENCE",

        title:
            "AI Research",

        description:
            "Eksplorasi Machine Learning dan Artificial Intelligence untuk menyelesaikan permasalahan dunia nyata melalui pendekatan berbasis data.",

        tags: [
            "Python",
            "Machine Learning",
            "AI"
        ],

        status:
            "In Progress",

        github:
            "#",

        demo:
            "#"

    },


    village: {

        number:
            "02",

        category:
            "WEB DEVELOPMENT",

        title:
            "Digital Village",

        description:
            "Website informasi desa dengan pendekatan modern, responsive, dan interaktif untuk membantu masyarakat mendapatkan informasi secara lebih mudah.",

        tags: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        status:
            "Completed",

        github:
            "#",

        demo:
            "#"

    },


    data: {

        number:
            "03",

        category:
            "DATA SCIENCE",

        title:
            "Data Analytics",

        description:
            "Eksplorasi data menggunakan proses cleaning, analysis, visualization, dan statistical thinking untuk menghasilkan insight yang dapat digunakan.",

        tags: [
            "Python",
            "Pandas",
            "NumPy",
            "SQL"
        ],

        status:
            "In Progress",

        github:
            "#",

        demo:
            "#"

    },


    trading: {

        number:
            "04",

        category:
            "ALGORITHMIC TRADING",

        title:
            "XAUUSD Trading EA",

        description:
            "Eksperimen Expert Advisor untuk MetaTrader 5 menggunakan MQL5 dengan pendekatan pengujian strategi, risk management, dan evaluasi performa.",

        tags: [
            "MQL5",
            "MT5",
            "Trading"
        ],

        status:
            "Experimental",

        github:
            "#",

        demo:
            "#"

    }

};



/* =====================================================
   PROJECT MODAL ELEMENTS
===================================================== */

const projectModal =
    document.getElementById(
        "projectModal"
    );


const projectModalClose =
    document.getElementById(
        "projectModalClose"
    );


const projectModalOverlay =
    document.querySelector(
        ".project-modal-overlay"
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


const modalTags =
    document.getElementById(
        "modalTags"
    );


const modalStatus =
    document.getElementById(
        "modalStatus"
    );


const modalGithub =
    document.getElementById(
        "modalGithub"
    );


const modalDemo =
    document.getElementById(
        "modalDemo"
    );



/* =====================================================
   OPEN PROJECT
===================================================== */

function openProject(projectId) {


    const project =
        projects[projectId];


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


    modalStatus.textContent =
        project.status;


    modalGithub.href =
        project.github;


    modalDemo.href =
        project.demo;


    modalTags.innerHTML =
        "";


    project.tags.forEach(tag => {


        const tagElement =
            document.createElement(
                "span"
            );


        tagElement.textContent =
            tag;


        modalTags.appendChild(
            tagElement
        );


    });


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
             Jika suatu saat card
             memiliki link internal,
             jangan buka modal ketika
             link tersebut diklik.
            */

            if (
                event.target.closest("a")
            ) {

                return;

            }


            const projectId =
                card.dataset.project;


            openProject(
                projectId
            );


        }
    );


});



/* =====================================================
   CLOSE BUTTON
===================================================== */

projectModalClose.addEventListener(
    "click",
    closeProject
);



/* =====================================================
   CLOSE CLICK OUTSIDE
===================================================== */

projectModalOverlay.addEventListener(
    "click",
    closeProject
);



/* =====================================================
   CLOSE WITH ESC
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



/* =====================================================
   YEAR
===================================================== */

const year =
    document.getElementById(
        "year"
    );


year.textContent =
    new Date().getFullYear();



/* =====================================================
   HERO VISUAL PARALLAX
===================================================== */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


if (heroVisual) {


    heroVisual.addEventListener(
        "mousemove",
        event => {


            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const rotateX =
                ((y / rect.height) - .5)
                * -4;


            const rotateY =
                ((x / rect.width) - .5)
                * 4;


            heroVisual.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;


        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {


            heroVisual.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg)";


        }
    );

}



/* =====================================================
   SMOOTH ANCHOR
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {


        link.addEventListener(
            "click",
            event => {


                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth"
                });


            }
        );


    });
