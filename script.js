/* =====================================================
   NAVBAR
===================================================== */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;


        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    },
    {
        passive: true
    }
);



/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById(
        "menuToggle"
    );


const mobileNav =
    document.getElementById(
        "mobileNav"
    );


if (
    menuToggle &&
    mobileNav
) {

    menuToggle.addEventListener(
        "click",
        () => {

            mobileNav.classList.toggle(
                "open"
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
                        "open"
                    );

                }
            );

        });

}



/* =====================================================
   TYPING TITLES
===================================================== */

const typingTitles =
    document.querySelectorAll(
        ".typing-title"
    );


function startTyping(element) {

    if (!element) return;


    if (
        element.dataset.started === "true"
    ) {

        return;

    }


    element.dataset.started = "true";


    const text =
        element.dataset.text || "";


    if (!text) return;


    element.classList.add(
        "visible"
    );


    element.classList.add(
        "typing"
    );


    element.textContent = "";


    let index = 0;


    function write() {

        if (index < text.length) {

            element.textContent +=
                text[index];

            index++;


            setTimeout(
                write,
                38
            );

        } else {

            /*
             * Jangan hapus text.
             *
             * Hanya matikan cursor.
             */

            element.classList.remove(
                "typing"
            );

        }

    }


    write();

}



/* =====================================================
   INTERSECTION OBSERVER
===================================================== */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        startTyping(
                            entry.target
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


typingTitles.forEach(
    title => {

        title.textContent = "";

        observer.observe(title);

    }
);



/* =====================================================
   FAQ
===================================================== */

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(
    item => {

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


                /*
                 * Tutup semua
                 */

                faqItems.forEach(
                    other => {

                        other.classList.remove(
                            "active"
                        );


                        const otherAnswer =
                            other.querySelector(
                                ".faq-answer"
                            );


                        otherAnswer.style.maxHeight =
                            null;

                    }
                );


                /*
                 * Buka yang dipilih
                 */

                if (!isActive) {

                    item.classList.add(
                        "active"
                    );


                    answer.style.maxHeight =
                        answer.scrollHeight +
                        "px";

                }

            }
        );

    }
);



/* =====================================================
   SMOOTH SCROLL
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const id =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !id ||
                    id === "#"
                ) return;


                const target =
                    document.querySelector(
                        id
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });



/* =====================================================
   HERO PARALLAX
===================================================== */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


if (heroVisual) {

    document.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 800
            ) return;


            const x =
                (
                    event.clientX /
                    window.innerWidth
                ) - .5;


            const y =
                (
                    event.clientY /
                    window.innerHeight
                ) - .5;


            heroVisual.style.transform =
                `
                perspective(1000px)
                rotateY(${x * 2}deg)
                rotateX(${y * -1.5}deg)
                `;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            heroVisual.style.transform =
                "none";

        }
    );

}



/* =====================================================
   YEAR
===================================================== */

const year =
    document.getElementById(
        "year"
    );


if (year) {

    year.textContent =
        new Date().getFullYear();

}



/* =====================================================
   REDUCED MOTION
===================================================== */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    prefersReducedMotion.matches
) {

    typingTitles.forEach(
        element => {

            element.textContent =
                element.dataset.text;

            element.classList.add(
                "visible"
            );

        }
    );

}