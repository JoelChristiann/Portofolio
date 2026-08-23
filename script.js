/* ============================================================
   JOEL CHRISTIAN — FINAL JAVASCRIPT
   ============================================================ */

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


/* ============================================================
   GLOBAL
============================================================ */

let robotScene = null;
let robotCamera = null;
let robotRenderer = null;
let robotModel = null;

let robotAnimationFrame = null;

let mouseX = 0;
let mouseY = 0;

let targetRotationX = 0;
let targetRotationY = 0;


/* ============================================================
   DOM
============================================================ */

const robotContainer =
    document.getElementById("robotContainer");

const robotLoading =
    document.getElementById("robotLoading");

const robotStatus =
    document.getElementById("robotStatus");

const robotSpeech =
    document.getElementById("robotSpeech");

const speechText =
    document.getElementById("speechText");

const menuToggle =
    document.getElementById("menuToggle");

const mobileNav =
    document.getElementById("mobileNav");

const yearElement =
    document.getElementById("year");


/* ============================================================
   YEAR
============================================================ */

if (yearElement) {
    yearElement.textContent =
        new Date().getFullYear();
}


/* ============================================================
   MOBILE MENU
============================================================ */

if (menuToggle && mobileNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const active =
                mobileNav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                active ? "true" : "false"
            );

        }
    );


    mobileNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileNav.classList.remove("active");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}


/* ============================================================
   THREE.JS ROBOT
============================================================ */

function initRobot() {

    if (!robotContainer) {
        return;
    }


    /*
       SCENE
    */

    robotScene =
        new THREE.Scene();


    /*
       CAMERA
    */

    robotCamera =
        new THREE.PerspectiveCamera(
            32,
            robotContainer.clientWidth /
            robotContainer.clientHeight,
            0.1,
            100
        );


    /*
       Posisi kamera.
       Sedikit lebih jauh supaya robot terlihat
       setengah badan.
    */

    robotCamera.position.set(
        0,
        0.15,
        6.2
    );


    /*
       RENDERER
    */

    robotRenderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });


    robotRenderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    robotRenderer.setSize(
        robotContainer.clientWidth,
        robotContainer.clientHeight
    );


    robotRenderer.outputColorSpace =
        THREE.SRGBColorSpace;


    robotRenderer.toneMapping =
        THREE.ACESFilmicToneMapping;


    robotRenderer.toneMappingExposure =
        1.15;


    robotContainer.appendChild(
        robotRenderer.domElement
    );


    /*
       LIGHTING
    */

    const ambientLight =
        new THREE.AmbientLight(
            0x7cff9d,
            2.0
        );

    robotScene.add(
        ambientLight
    );


    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            3.5
        );

    keyLight.position.set(
        3,
        5,
        5
    );

    robotScene.add(
        keyLight
    );


    const greenLight =
        new THREE.PointLight(
            0x39ff73,
            10,
            10
        );

    greenLight.position.set(
        -2,
        2,
        3
    );

    robotScene.add(
        greenLight
    );


    const rimLight =
        new THREE.PointLight(
            0x72ff9c,
            8,
            8
        );

    rimLight.position.set(
        2,
        1,
        -2
    );

    robotScene.add(
        rimLight
    );


    /*
       LOADER
    */

    const loader =
        new GLTFLoader();


    /*
       =====================================================
       PENTING
       =====================================================

       Ganti URL ini kalau file robot kamu mempunyai
       nama atau lokasi berbeda.

       Contoh:
       models/robot.glb
    */

    const robotURL =
        "robot.glb";


    loader.load(

        robotURL,

        (gltf) => {

            robotModel =
                gltf.scene;


            /*
               HITUNG BOUNDING BOX
            */

            const box =
                new THREE.Box3()
                    .setFromObject(
                        robotModel
                    );


            const size =
                new THREE.Vector3();

            const center =
                new THREE.Vector3();


            box.getSize(size);
            box.getCenter(center);


            /*
               CENTER ROBOT
            */

            robotModel.position.x =
                -center.x;

            robotModel.position.y =
                -center.y;

            robotModel.position.z =
                -center.z;


            /*
               SCALE
               
               Nilai ini membuat robot
               cukup besar untuk terlihat
               setengah badan.
            */

            const maxDimension =
                Math.max(
                    size.x,
                    size.y,
                    size.z
                );


            const targetHeight =
                4.7;


            const scale =
                targetHeight /
                maxDimension;


            robotModel.scale.setScalar(
                scale
            );


            /*
               ROOT GROUP
            */

            const robotGroup =
                new THREE.Group();


            robotGroup.add(
                robotModel
            );


            /*
               Robot sedikit turun.
               
               Jangan mengubah canvas.
               Kita mengatur model langsung.
            */

            robotGroup.position.y =
                -0.55;


            /*
               Sedikit ke depan.
            */

            robotGroup.position.z =
                0;


            robotScene.add(
                robotGroup
            );


            /*
               SIMPAN ROOT
            */

            robotModel.userData.root =
                robotGroup;


            /*
               MATIKAN LOADING
            */

            if (robotLoading) {

                robotLoading
                    .classList
                    .add("hidden");

            }


            if (robotStatus) {

                robotStatus.textContent =
                    "AI SYSTEM ONLINE";

            }


            /*
               SPEECH
            */

            startRobotSpeech();


        },

        undefined,

        (error) => {

            console.error(
                "Robot loading error:",
                error
            );


            if (robotLoading) {

                robotLoading.textContent =
                    "ROBOT MODEL NOT FOUND";

            }


            if (robotStatus) {

                robotStatus.textContent =
                    "CHECK robot.glb";

            }

        }

    );


    /*
       MOUSE
    */

    window.addEventListener(
        "pointermove",
        handleMouseMove,
        {
            passive: true
        }
    );


    /*
       RESIZE
    */

    window.addEventListener(
        "resize",
        resizeRobot
    );


    /*
       START LOOP
    */

    animateRobot();

}


/* ============================================================
   MOUSE MOVEMENT
============================================================ */

function handleMouseMove(event) {

    if (!robotContainer) {
        return;
    }


    const rect =
        robotContainer.getBoundingClientRect();


    const x =
        (
            event.clientX -
            rect.left
        ) / rect.width;


    const y =
        (
            event.clientY -
            rect.top
        ) / rect.height;


    mouseX =
        (x - 0.5) * 2;

    mouseY =
        (y - 0.5) * 2;


    targetRotationY =
        mouseX * 0.28;

    targetRotationX =
        mouseY * 0.12;

}


/* ============================================================
   ANIMATION
============================================================ */

function animateRobot() {

    robotAnimationFrame =
        requestAnimationFrame(
            animateRobot
        );


    if (
        !robotRenderer ||
        !robotScene ||
        !robotCamera
    ) {

        return;

    }


    if (
        robotModel &&
        robotModel.userData.root
    ) {

        const root =
            robotModel.userData.root;


        /*
           Smooth mouse rotation.
        */

        root.rotation.y +=
            (
                targetRotationY -
                root.rotation.y
            ) * 0.045;


        root.rotation.x +=
            (
                targetRotationX -
                root.rotation.x
            ) * 0.025;


        /*
           Idle floating.
        */

        const time =
            performance.now() * 0.001;


        root.position.y =
            -0.55 +
            Math.sin(time * 1.2) * 0.045;

    }


    robotRenderer.render(
        robotScene,
        robotCamera
    );

}


/* ============================================================
   RESIZE
============================================================ */

function resizeRobot() {

    if (
        !robotContainer ||
        !robotRenderer ||
        !robotCamera
    ) {

        return;

    }


    const width =
        robotContainer.clientWidth;

    const height =
        robotContainer.clientHeight;


    if (
        width <= 0 ||
        height <= 0
    ) {

        return;

    }


    robotCamera.aspect =
        width / height;


    robotCamera.updateProjectionMatrix();


    robotRenderer.setSize(
        width,
        height
    );

}


/* ============================================================
   ROBOT SPEECH
============================================================ */

const robotMessages = [

    "Hello. I'm Joel's AI assistant.",

    "Exploring artificial intelligence.",

    "Turning ideas into intelligent systems.",

    "Currently learning Machine Learning and Deep Learning.",

    "Building technology with data and code.",

    "Computer Vision is one of my current interests."

];


let speechIndex = 0;

let typingTimer = null;


/* ============================================================
   START SPEECH
============================================================ */

function startRobotSpeech() {

    if (
        !robotSpeech ||
        !speechText
    ) {

        return;

    }


    setTimeout(
        () => {

            robotSpeech
                .classList
                .add("active");


            typeSpeech(
                robotMessages[
                    speechIndex
                ]
            );

        },
        1200
    );

}


/* ============================================================
   TYPE SPEECH
============================================================ */

function typeSpeech(text) {

    if (!speechText) {
        return;
    }


    clearInterval(
        typingTimer
    );


    speechText.textContent =
        "";


    let index = 0;


    typingTimer =
        setInterval(
            () => {

                speechText.textContent +=
                    text.charAt(index);


                index++;


                if (
                    index >=
                    text.length
                ) {

                    clearInterval(
                        typingTimer
                    );


                    setTimeout(
                        nextSpeech,
                        3200
                    );

                }

            },
            38
        );

}


/* ============================================================
   NEXT SPEECH
============================================================ */

function nextSpeech() {

    if (!robotSpeech) {
        return;
    }


    robotSpeech
        .classList
        .remove("active");


    setTimeout(
        () => {

            speechIndex =
                (
                    speechIndex + 1
                ) %
                robotMessages.length;


            robotSpeech
                .classList
                .add("active");


            typeSpeech(
                robotMessages[
                    speechIndex
                ]
            );

        },
        500
    );

}


/* ============================================================
   TYPING TITLES
============================================================ */

function initTypingTitles() {

    const titles =
        document.querySelectorAll(
            ".typing-title"
        );


    if (!titles.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            (entries, obs) => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        const element =
                            entry.target;


                        if (
                            element.dataset.typed ===
                            "true"
                        ) {

                            return;

                        }


                        element.dataset.typed =
                            "true";


                        const text =
                            element.dataset.text ||
                            "";


                        typeTitle(
                            element,
                            text
                        );


                        obs.unobserve(
                            element
                        );

                    }
                );

            },
            {
                threshold: 0.35
            }
        );


    titles.forEach(
        title => {

            observer.observe(
                title
            );

        }
    );

}


/* ============================================================
   TYPE TITLE
============================================================ */

function typeTitle(
    element,
    text
) {

    let index = 0;


    element.textContent =
        "";


    const timer =
        setInterval(
            () => {

                element.textContent +=
                    text.charAt(index);


                index++;


                if (
                    index >=
                    text.length
                ) {

                    clearInterval(
                        timer
                    );

                }

            },
            42
        );

}


/* ============================================================
   FAQ
============================================================ */

function initFAQ() {

    const questions =
        document.querySelectorAll(
            ".faq-question"
        );


    questions.forEach(
        question => {

            question.addEventListener(
                "click",
                () => {

                    const item =
                        question.closest(
                            ".faq-item"
                        );


                    if (!item) {
                        return;
                    }


                    const wasActive =
                        item.classList.contains(
                            "active"
                        );


                    document
                        .querySelectorAll(
                            ".faq-item.active"
                        )
                        .forEach(
                            activeItem => {

                                activeItem
                                    .classList
                                    .remove(
                                        "active"
                                    );

                            }
                        );


                    if (!wasActive) {

                        item.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );

}


/* ============================================================
   PROJECT MODAL
============================================================ */

const projectData = {

    ai: {

        category:
            "ARTIFICIAL INTELLIGENCE",

        title:
            "AI Research",

        description:
            "Eksplorasi Artificial Intelligence dan Machine Learning untuk menyelesaikan permasalahan dunia nyata.",

        details:
            "Eksperimen pada machine learning, deep learning, computer vision dan intelligent systems.",

        technologies:
            [
                "Python",
                "Machine Learning",
                "AI"
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
            "Website informasi desa dengan desain modern, responsive dan mudah digunakan.",

        details:
            "Website yang dirancang untuk menyajikan informasi desa, layanan masyarakat dan berbagai informasi publik.",

        technologies:
            [
                "HTML",
                "CSS",
                "JavaScript"
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
            "Eksplorasi data untuk menemukan pola, insight dan informasi melalui analisis.",

        details:
            "Eksperimen data analytics menggunakan Python untuk proses cleaning, exploration dan visualization.",

        technologies:
            [
                "Python",
                "Pandas",
                "SQL"
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
            "Sistem trading eksperimental yang menggunakan indikator teknikal, risk management dan backtesting.",

        technologies:
            [
                "MQL5",
                "MetaTrader 5",
                "XAUUSD"
            ],

        link:
            "#"

    }

};


function initProjectModal() {

    const modal =
        document.getElementById(
            "projectModal"
        );

    const overlay =
        document.getElementById(
            "modalOverlay"
        );

    const closeButton =
        document.getElementById(
            "modalClose"
        );

    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    if (!modal) {
        return;
    }


    cards.forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    openProjectModal(
                        card.dataset.project
                    );

                }
            );


            card.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        openProjectModal(
                            card.dataset.project
                        );

                    }

                }
            );

        }
    );


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeProjectModal
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeProjectModal
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeProjectModal();

            }

        }
    );

}


function openProjectModal(
    projectName
) {

    const modal =
        document.getElementById(
            "projectModal"
        );


    const data =
        projectData[
            projectName
        ];


    if (
        !modal ||
        !data
    ) {

        return;

    }


    document.getElementById(
        "modalCategory"
    ).textContent =
        data.category;


    document.getElementById(
        "modalTitle"
    ).textContent =
        data.title;


    document.getElementById(
        "modalDescription"
    ).textContent =
        data.description;


    document.getElementById(
        "modalDetails"
    ).textContent =
        data.details;


    const tags =
        document.getElementById(
            "modalTags"
        );


    tags.innerHTML =
        "";


    data.technologies.forEach(
        technology => {

            const tag =
                document.createElement(
                    "span"
                );


            tag.textContent =
                technology;


            tags.appendChild(
                tag
            );

        }
    );


    document.getElementById(
        "modalProjectLink"
    ).href =
        data.link;


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


function closeProjectModal() {

    const modal =
        document.getElementById(
            "projectModal"
        );


    if (!modal) {
        return;
    }


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


/* ============================================================
   INITIALIZE
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initTypingTitles();

        initFAQ();

        initProjectModal();

        initRobot();

    }
);
