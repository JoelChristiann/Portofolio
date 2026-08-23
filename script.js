/* =========================================================
   ROBOT PORTFOLIO SYSTEM
   FINAL VERSION
   THREE.JS + GLTF
   BLACK GLOSSY / GREEN CYBER
========================================================= */

import * as THREE from "three";

import {
    GLTFLoader
} from "three/addons/loaders/GLTFLoader.js";


/* =========================================================
   GLOBAL SAFE HELPERS
========================================================= */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    document.querySelectorAll(selector);


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mobileNav =
    document.getElementById("mobileNav");

if (menuToggle && mobileNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            mobileNav.classList.toggle("active");

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


/* =========================================================
   YEAR
========================================================= */

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   TYPING TITLES
   IMPORTANT:
   Tidak bergantung kepada robot.
========================================================= */

function initTypingTitles() {

    const elements =
        document.querySelectorAll(
            ".typing-title"
        );


    if (!elements.length) {
        return;
    }


    elements.forEach(element => {

        /*
           Ambil teks dari data-text.

           Jika tidak ada data-text,
           gunakan teks asli HTML.
        */

        let text =
            element.dataset.text ||
            element.textContent.trim();


        if (!text) {
            return;
        }


        /*
           Simpan teks asli.
        */

        element.dataset.originalText =
            text;


        /*
           Jangan menjalankan typing
           berkali-kali.
        */

        if (
            element.dataset.typingReady ===
            "true"
        ) {
            return;
        }


        element.dataset.typingReady =
            "true";


        element.textContent =
            "";


        /*
           Cursor typing.
        */

        element.classList.add(
            "typing-active"
        );


        let index = 0;


        /*
           Kecepatan typing.
        */

        const speed =
            38;


        function typeTitle() {

            if (
                index <
                text.length
            ) {

                element.textContent +=
                    text.charAt(index);

                index++;


                setTimeout(
                    typeTitle,
                    speed
                );

            } else {

                /*
                   Selesai mengetik.
                */

                setTimeout(
                    () => {

                        element.classList.remove(
                            "typing-active"
                        );

                    },
                    250
                );

            }

        }


        /*
           Jalankan ketika terlihat.
        */

        if (
            "IntersectionObserver"
            in window
        ) {

            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting &&
                                    !element.dataset.typed
                                ) {

                                    element.dataset.typed =
                                        "true";

                                    typeTitle();

                                    observer.unobserve(
                                        element
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.05
                    }
                );


            observer.observe(
                element
            );

        } else {

            element.dataset.typed =
                "true";

            typeTitle();

        }

    });

}


initTypingTitles();


/* =========================================================
   FAQ
========================================================= */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach(
    question => {

        question.addEventListener(
            "click",
            () => {

                const currentItem =
                    question.closest(
                        ".faq-item"
                    );


                if (!currentItem) {
                    return;
                }


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

    }
);


/* =========================================================
   PROJECT DATA
========================================================= */

const projectData = {

    ai: {

        category:
            "ARTIFICIAL INTELLIGENCE",

        title:
            "AI Research",

        description:
            "Eksplorasi Artificial Intelligence dan Machine Learning untuk menyelesaikan permasalahan dunia nyata.",

        details:
            "Project ini berfokus pada eksplorasi proses machine learning mulai dari data preprocessing, eksplorasi dataset, training model, evaluasi performa, sampai analisis hasil.",

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
            "Project ini dibuat sebagai website informasi desa yang menampilkan berbagai informasi publik dengan pendekatan desain modern dan responsive.",

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
            "Project ini berfokus pada data cleaning, exploratory data analysis, identifikasi pola, hingga visualisasi.",

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
            "XAUUSD TRADING EA",

        description:
            "Eksperimen Expert Advisor untuk XAUUSD menggunakan MQL5 dan MetaTrader 5.",

        details:
            "Project ini merupakan eksperimen algorithmic trading yang mencakup entry signal, Stop Loss, Take Profit, spread filter, risk management, pembatasan posisi, dan backtesting.",

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


/* =========================================================
   PROJECT MODAL
========================================================= */

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


function openProject(projectId) {

    const project =
        projectData[projectId];


    if (
        !project ||
        !projectModal
    ) {
        return;
    }


    if (modalCategory) {

        modalCategory.textContent =
            project.category;

    }


    if (modalTitle) {

        modalTitle.textContent =
            project.title;

    }


    if (modalDescription) {

        modalDescription.textContent =
            project.description;

    }


    if (modalDetails) {

        modalDetails.textContent =
            project.details;

    }


    if (modalTags) {

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

    }


    if (modalProjectLink) {

        modalProjectLink.href =
            project.link;


        modalProjectLink.style.display =
            project.link === "#"
                ? "none"
                : "inline-flex";

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


function closeProject() {

    if (!projectModal) {
        return;
    }


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


document
    .querySelectorAll(
        ".project-card"
    )
    .forEach(card => {

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


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            projectModal &&
            projectModal.classList.contains(
                "active"
            )
        ) {

            closeProject();

        }

    }
);


/* =========================================================
   ROBOT ELEMENTS
========================================================= */

const robotContainer =
    document.getElementById(
        "robot-container"
    );

const robotStatus =
    document.getElementById(
        "robot-status"
    );

const robotLoading =
    document.getElementById(
        "robot-loading"
    );

const robotSpeech =
    document.getElementById(
        "robotSpeech"
    );

const speechText =
    document.getElementById(
        "speechText"
    );


/* =========================================================
   ROBOT
========================================================= */

if (!robotContainer) {

    console.error(
        "ERROR: #robot-container tidak ditemukan."
    );

} else {


    /* =====================================================
       SCENE
    ===================================================== */

    const scene =
        new THREE.Scene();


    /* =====================================================
       CAMERA
    ===================================================== */

    let containerWidth =
        Math.max(
            robotContainer.clientWidth,
            1
        );

    let containerHeight =
        Math.max(
            robotContainer.clientHeight,
            1
        );


    const camera =
        new THREE.PerspectiveCamera(
            30,
            containerWidth /
            containerHeight,
            0.01,
            100
        );


    camera.position.set(
        0,
        0.25,
        4.3
    );


    /* =====================================================
       RENDERER
    ===================================================== */

    const renderer =
        new THREE.WebGLRenderer({

            antialias:
                true,

            alpha:
                true,

            powerPreference:
                "high-performance"

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        containerWidth,
        containerHeight
    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    renderer.toneMapping =
        THREE.ACESFilmicToneMapping;


    renderer.toneMappingExposure =
        1.65;


    renderer.setClearColor(
        0x000000,
        0
    );


    robotContainer.appendChild(
        renderer.domElement
    );


    /* =====================================================
       LIGHTS
    ===================================================== */

    const ambientLight =
        new THREE.HemisphereLight(
            0xffffff,
            0x03150b,
            2.4
        );


    scene.add(
        ambientLight
    );


    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            4
        );


    keyLight.position.set(
        4,
        6,
        8
    );


    scene.add(
        keyLight
    );


    const frontLight =
        new THREE.PointLight(
            0xffffff,
            3.4,
            18,
            2
        );


    frontLight.position.set(
        0,
        2.5,
        6
    );


    scene.add(
        frontLight
    );


    const leftLight =
        new THREE.PointLight(
            0x39ff73,
            4,
            16,
            2
        );


    leftLight.position.set(
        -5,
        2,
        4
    );


    scene.add(
        leftLight
    );


    const rightLight =
        new THREE.PointLight(
            0x39ff73,
            3.5,
            15,
            2
        );


    rightLight.position.set(
        5,
        1.5,
        3
    );


    scene.add(
        rightLight
    );


    const greenRim =
        new THREE.PointLight(
            0x39ff73,
            4.5,
            16,
            2
        );


    greenRim.position.set(
        -4,
        2,
        -2
    );


    scene.add(
        greenRim
    );


    const greenBack =
        new THREE.PointLight(
            0x65ff94,
            3,
            14,
            2
        );


    greenBack.position.set(
        2,
        2,
        -5
    );


    scene.add(
        greenBack
    );


    /* =====================================================
       ROBOT VARIABLES
    ===================================================== */

    let robot = null;

    let head = null;

    let originalHeadRotation = null;

    let robotFace = null;

    let faceEyes = [];

    let faceEyeGlows = [];

    let faceMouth = null;

    let faceMouthDots = [];

    let faceLight = null;


    /* =====================================================
       ARM
    ===================================================== */

    let rightArm = null;

    let rightHand = null;

    let originalRightArmRotation = null;

    let originalRightHandRotation = null;

    let armRaised = false;


    /* =====================================================
       ROBOT POSITION
    ===================================================== */

    let baseRobotY = -0.55;

    let baseRobotZ = 0;

    let baseRobotRotationY = 0;

    let baseRobotRotationZ = 0;

    let robotBaseScale = 1;


    /* =====================================================
       POINTER
    ===================================================== */

    const pointer =
        new THREE.Vector2(
            0,
            0
        );


    const smoothPointer =
        new THREE.Vector2(
            0,
            0
        );


    /* =====================================================
       HEAD TARGET
    ===================================================== */

    const targetHead =
        new THREE.Vector3(
            0,
            0,
            0
        );


    const currentHead =
        new THREE.Vector3(
            0,
            0,
            0
        );


    /* =====================================================
       CLOCK
    ===================================================== */

    const clock =
        new THREE.Clock();


    let time = 0;


    /* =====================================================
       BLINK
    ===================================================== */

    let blinkTimer = 0;

    let nextBlink =
        2.5 +
        Math.random() * 3;

    let blinking = false;

    let blinkProgress = 0;


    /* =====================================================
       SPEECH
    ===================================================== */

    const speechMessages = [

        "HELLO, WELCOME TO MY DIGITAL SPACE.",

        "I'M JOEL'S DIGITAL ASSISTANT.",

        "JOEL IS AN INFORMATICS STUDENT.",

        "HE IS INTERESTED IN ARTIFICIAL INTELLIGENCE AND DATA SCIENCE.",

        "HE BUILDS DIGITAL PROJECTS USING CODE, DATA, AND AI.",

        "EXPLORE THE WEBSITE AND TAKE A LOOK AT HIS PROJECTS.",

        "THANKS FOR VISITING."

    ];


    let speechMessageIndex = 0;

    let speechCharIndex = 0;

    let speechTimer = null;

    let speechPauseTimer = null;

    let speechStarted = false;


    /* =====================================================
       FIND OBJECT
    ===================================================== */

    function findObjectByNames(
        root,
        names
    ) {

        let found = null;


        const normalized =
            names.map(
                name =>
                    name
                        .toLowerCase()
                        .replace(
                            /[\s_-]/g,
                            ""
                        )
            );


        root.traverse(
            object => {

                if (found) {
                    return;
                }


                const objectName =
                    (
                        object.name ||
                        ""
                    )
                    .toLowerCase()
                    .replace(
                        /[\s_-]/g,
                        ""
                    );


                for (
                    const searchName
                    of normalized
                ) {

                    if (
                        objectName.includes(
                            searchName
                        )
                    ) {

                        found =
                            object;

                        return;

                    }

                }

            }
        );


        return found;

    }


    /* =====================================================
       FIND HEAD
    ===================================================== */

    function findHead(root) {

        return findObjectByNames(
            root,
            [
                "head",
                "head2",
                "face",
                "robothead"
            ]
        );

    }


    /* =====================================================
       FIND ARMS
    ===================================================== */

    function findRightArm() {

        if (!robot) {
            return;
        }


        rightArm =
            findObjectByNames(
                robot,
                [
                    "rightarm",
                    "armright",
                    "rarm",
                    "rightupperarm",
                    "upperarmright",
                    "arm_r",
                    "shoulderright",
                    "rightshoulder"
                ]
            );


        rightHand =
            findObjectByNames(
                robot,
                [
                    "righthand",
                    "handright",
                    "rhand",
                    "hand_r"
                ]
            );


        if (rightArm) {

            originalRightArmRotation =
                rightArm.rotation.clone();

            console.log(
                "RIGHT ARM FOUND:",
                rightArm.name
            );

        } else {

            console.warn(
                "RIGHT ARM NOT FOUND"
            );

        }


        if (rightHand) {

            originalRightHandRotation =
                rightHand.rotation.clone();

            console.log(
                "RIGHT HAND FOUND:",
                rightHand.name
            );

        }

    }


    /* =====================================================
       MATERIAL
    ===================================================== */

    function styleRobotMaterials(root) {

        root.traverse(
            object => {

                if (!object.isMesh) {
                    return;
                }


                const materials =
                    Array.isArray(
                        object.material
                    )
                        ? object.material
                        : [
                            object.material
                        ];


                materials.forEach(
                    material => {

                        if (!material) {
                            return;
                        }


                        const name =
                            (
                                (
                                    material.name ||
                                    ""
                                ) +
                                " " +
                                (
                                    object.name ||
                                    ""
                                )
                            )
                            .toLowerCase();


                        const isGreen =
                            name.includes("green") ||
                            name.includes("led") ||
                            name.includes("glow") ||
                            name.includes("neon") ||
                            name.includes("emission") ||
                            name.includes("light");


                        if (isGreen) {

                            if (
                                material.color
                            ) {

                                material.color.set(
                                    "#49ff82"
                                );

                            }


                            if (
                                "emissive"
                                in material
                            ) {

                                material.emissive.set(
                                    "#20ff68"
                                );


                                material.emissiveIntensity =
                                    3.2;

                            }


                            if (
                                "metalness"
                                in material
                            ) {

                                material.metalness =
                                    0.35;

                            }


                            if (
                                "roughness"
                                in material
                            ) {

                                material.roughness =
                                    0.12;

                            }


                            return;

                        }


                        if (
                            material.color
                        ) {

                            material.color.set(
                                "#050807"
                            );

                        }


                        if (
                            "metalness"
                            in material
                        ) {

                            material.metalness =
                                0.88;

                        }


                        if (
                            "roughness"
                            in material
                        ) {

                            material.roughness =
                                0.13;

                        }


                        if (
                            "envMapIntensity"
                            in material
                        ) {

                            material.envMapIntensity =
                                2.5;

                        }


                        if (
                            "clearcoat"
                            in material
                        ) {

                            material.clearcoat =
                                1;

                        }


                        if (
                            "clearcoatRoughness"
                            in material
                        ) {

                            material.clearcoatRoughness =
                                0.06;

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       FRAME ROBOT
       HALF BODY MODE
    ===================================================== */

    function frameRobot(object) {

        const box =
            new THREE.Box3()
                .setFromObject(
                    object
                );


        const size =
            box.getSize(
                new THREE.Vector3()
            );


        const center =
            box.getCenter(
                new THREE.Vector3()
            );


        const maxDimension =
            Math.max(
                size.x,
                size.y,
                size.z
            );


        if (
            maxDimension <= 0
        ) {

            return;

        }


        /*
           CENTER MODEL
        */

        object.position.sub(
            center
        );


        /*
           BESARKAN MODEL
        */

        const desiredSize =
            window.innerWidth <= 768
                ? 5.2
                : 5.0;


        const scale =
            desiredSize /
            maxDimension;


        object.scale.setScalar(
            scale
        );


        robotBaseScale =
            scale;


        /*
           HALF BODY POSITION

           Kita sengaja menaikkan robot
           supaya bagian bawah tubuh
           keluar dari frame.
        */

        const isMobile =
            window.innerWidth <= 768;


        object.position.set(
            0,
            isMobile
                ? -0.25
                : -0.15,
            0
        );


        /*
           CAMERA DEKAT
        */

        camera.position.set(
            0,
            isMobile
                ? 0.45
                : 0.35,
            isMobile
                ? 4.25
                : 4.05
        );


        camera.lookAt(
            0,
            0.55,
            0
        );


        baseRobotY =
            object.position.y;


        baseRobotZ =
            object.position.z;


        baseRobotRotationY =
            object.rotation.y;


        baseRobotRotationZ =
            object.rotation.z;

    }


    /* =====================================================
       CREATE ROBOT FACE
    ===================================================== */

    function createRobotFace() {

        if (!head) {
            return;
        }


        robotFace =
            new THREE.Group();


        head.add(
            robotFace
        );


        /*
           FACE PANEL
        */

        const panelGeometry =
            new THREE.BoxGeometry(
                0.92,
                0.55,
                0.045
            );


        const panelMaterial =
            new THREE.MeshPhysicalMaterial({

                color:
                    0x020504,

                metalness:
                    0.9,

                roughness:
                    0.10,

                clearcoat:
                    1,

                clearcoatRoughness:
                    0.03,

                emissive:
                    0x061b0d,

                emissiveIntensity:
                    0.3

            });


        const panel =
            new THREE.Mesh(
                panelGeometry,
                panelMaterial
            );


        panel.position.set(
            0,
            -0.02,
            0.46
        );


        robotFace.add(
            panel
        );


        /*
           BORDER
        */

        const borderGeometry =
            new THREE.BoxGeometry(
                0.96,
                0.59,
                0.025
            );


        const borderMaterial =
            new THREE.MeshBasicMaterial({

                color:
                    0x39ff73,

                transparent:
                    true,

                opacity:
                    0.18

            });


        const border =
            new THREE.Mesh(
                borderGeometry,
                borderMaterial
            );


        border.position.set(
            0,
            -0.02,
            0.438
        );


        robotFace.add(
            border
        );


        /*
           EYES
        */

        const eyeGeometry =
            new THREE.SphereGeometry(
                0.095,
                24,
                24
            );


        const eyeMaterial =
            new THREE.MeshStandardMaterial({

                color:
                    0x65ff91,

                emissive:
                    0x39ff73,

                emissiveIntensity:
                    5,

                roughness:
                    0.04,

                metalness:
                    0.1

            });


        const leftEye =
            new THREE.Mesh(
                eyeGeometry,
                eyeMaterial.clone()
            );


        leftEye.position.set(
            -0.20,
            0.085,
            0.49
        );


        robotFace.add(
            leftEye
        );


        faceEyes.push(
            leftEye
        );


        const rightEye =
            new THREE.Mesh(
                eyeGeometry,
                eyeMaterial.clone()
            );


        rightEye.position.set(
            0.20,
            0.085,
            0.49
        );


        robotFace.add(
            rightEye
        );


        faceEyes.push(
            rightEye
        );


        /*
           GLOW
        */

        const glowGeometry =
            new THREE.SphereGeometry(
                0.15,
                18,
                18
            );


        const glowMaterial =
            new THREE.MeshBasicMaterial({

                color:
                    0x39ff73,

                transparent:
                    true,

                opacity:
                    0.10,

                depthWrite:
                    false

            });


        const leftGlow =
            new THREE.Mesh(
                glowGeometry,
                glowMaterial
            );


        leftGlow.position.copy(
            leftEye.position
        );


        robotFace.add(
            leftGlow
        );


        faceEyeGlows.push(
            leftGlow
        );


        const rightGlow =
            new THREE.Mesh(
                glowGeometry,
                glowMaterial.clone()
            );


        rightGlow.position.copy(
            rightEye.position
        );


        robotFace.add(
            rightGlow
        );


        faceEyeGlows.push(
            rightGlow
        );


        /*
           MOUTH
        */

        const mouthGeometry =
            new THREE.BoxGeometry(
                0.34,
                0.026,
                0.025
            );


        const mouthMaterial =
            new THREE.MeshBasicMaterial({

                color:
                    0x52ff82

            });


        faceMouth =
            new THREE.Mesh(
                mouthGeometry,
                mouthMaterial
            );


        faceMouth.position.set(
            0,
            -0.13,
            0.49
        );


        robotFace.add(
            faceMouth
        );


        /*
           MOUTH DOTS
        */

        const dotGeometry =
            new THREE.SphereGeometry(
                0.022,
                12,
                12
            );


        for (
            let i = -2;
            i <= 2;
            i++
        ) {

            const dot =
                new THREE.Mesh(
                    dotGeometry,
                    mouthMaterial.clone()
                );


            dot.position.set(
                i * 0.065,
                -0.13,
                0.50
            );


            robotFace.add(
                dot
            );


            faceMouthDots.push(
                dot
            );

        }


        /*
           FACE LIGHT
        */

        faceLight =
            new THREE.PointLight(
                0x39ff73,
                1.5,
                2.5,
                2
            );


        faceLight.position.set(
            0,
            0,
            0.6
        );


        robotFace.add(
            faceLight
        );

    }


    /* =====================================================
       SPEECH
    ===================================================== */

    function startRobotSpeech() {

        if (
            !robotSpeech ||
            !speechText
        ) {

            console.warn(
                "robotSpeech atau speechText tidak ditemukan."
            );

            return;

        }


        if (speechStarted) {
            return;
        }


        speechStarted =
            true;


        speechMessageIndex =
            0;


        robotSpeech.classList.add(
            "active"
        );


        /*
           FORCE MOBILE SAFE
        */

        if (
            window.innerWidth <= 768
        ) {

            robotSpeech.style.position =
                "fixed";

            robotSpeech.style.left =
                "50%";

            robotSpeech.style.right =
                "auto";

            robotSpeech.style.transform =
                "translateX(-50%)";

            robotSpeech.style.width =
                "calc(100vw - 30px)";

            robotSpeech.style.maxWidth =
                "420px";

            robotSpeech.style.zIndex =
                "9999";

        }


        playSpeechMessage();

    }


    /* =====================================================
       PLAY SPEECH
    ===================================================== */

    function playSpeechMessage() {

        if (
            !robotSpeech ||
            !speechText
        ) {
            return;
        }


        clearInterval(
            speechTimer
        );


        clearTimeout(
            speechPauseTimer
        );


        if (
            speechMessageIndex >=
            speechMessages.length
        ) {

            armRaised =
                false;


            robotSpeech.classList.remove(
                "active"
            );


            /*
               Mulai lagi setelah beberapa detik.
            */

            setTimeout(
                () => {

                    speechMessageIndex =
                        0;

                    speechStarted =
                        false;

                    startRobotSpeech();

                },
                3500
            );


            return;

        }


        const message =
            speechMessages[
                speechMessageIndex
            ];


        speechText.textContent =
            "";


        speechCharIndex =
            0;


        robotSpeech.classList.add(
            "active"
        );


        /*
           ANGKAT TANGAN
        */

        armRaised =
            true;


        /*
           TYPING SPEECH
        */

        speechTimer =
            setInterval(
                () => {

                    if (
                        speechCharIndex <
                        message.length
                    ) {

                        speechText.textContent +=
                            message.charAt(
                                speechCharIndex
                            );


                        speechCharIndex++;

                    } else {

                        clearInterval(
                            speechTimer
                        );


                        speechTimer =
                            null;


                        /*
                           PAUSE PENDEK
                        */

                        speechPauseTimer =
                            setTimeout(
                                () => {

                                    armRaised =
                                        false;


                                    speechMessageIndex++;


                                    setTimeout(
                                        () => {

                                            armRaised =
                                                true;

                                            playSpeechMessage();

                                        },
                                        220
                                    );

                                },
                                700
                            );

                    }

                },
                28
            );

    }


    /* =====================================================
       LOAD ROBOT
    ===================================================== */

    const loader =
        new GLTFLoader();


    loader.load(

        "./robot.glb",


        gltf => {

            robot =
                gltf.scene;


            console.log(
                "ROBOT LOADED:",
                robot
            );


            /*
               STYLE
            */

            styleRobotMaterials(
                robot
            );


            scene.add(
                robot
            );


            /*
               HEAD
            */

            head =
                findHead(
                    robot
                );


            if (head) {

                originalHeadRotation =
                    head.rotation.clone();


                createRobotFace();


                console.log(
                    "ROBOT FACE READY"
                );

            } else {

                console.warn(
                    "HEAD NOT FOUND"
                );

            }


            /*
               FRAME
            */

            frameRobot(
                robot
            );


            /*
               ARM
            */

            findRightArm();


            /*
               STATUS
            */

            if (robotStatus) {

                robotStatus.textContent =
                    "ROBOT ONLINE";

            }


            /*
               MULAI SPEECH
               TANPA MENUNGGU TERLALU LAMA
            */

            setTimeout(
                () => {

                    startRobotSpeech();

                },
                700
            );

        },


        progress => {

            if (!robotStatus) {
                return;
            }


            if (
                progress.total > 0
            ) {

                const percent =
                    Math.round(
                        (
                            progress.loaded /
                            progress.total
                        ) * 100
                    );


                robotStatus.textContent =
                    `LOADING ROBOT ${percent}%`;

            } else {

                robotStatus.textContent =
                    "LOADING ROBOT...";

            }

        },


        error => {

            console.error(
                "ROBOT LOAD ERROR:",
                error
            );


            if (robotStatus) {

                robotStatus.textContent =
                    "ROBOT FAILED TO LOAD";

            }


            if (robotLoading) {

                robotLoading.textContent =
                    "ROBOT FAILED";

            }

        }

    );


    /* =====================================================
       POINTER
    ===================================================== */

    window.addEventListener(
        "pointermove",
        event => {

            pointer.x =
                (
                    event.clientX /
                    window.innerWidth
                ) * 2 - 1;


            pointer.y =
                -(
                    (
                        event.clientY /
                        window.innerHeight
                    ) * 2 - 1
                );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       ANIMATION
    ===================================================== */

    function animate() {

        requestAnimationFrame(
            animate
        );


        const delta =
            Math.min(
                clock.getDelta(),
                0.05
            );


        time +=
            delta;


        /* =================================================
           POINTER SMOOTH
        ================================================= */

        const smoothFactor =
            1 -
            Math.exp(
                -3.5 *
                delta
            );


        smoothPointer.lerp(
            pointer,
            smoothFactor
        );


        /* =================================================
           ROBOT BODY
        ================================================= */

        if (robot) {

            const breathe =
                Math.sin(
                    time * 1.05
                );


            const sway =
                Math.sin(
                    time * 0.45
                );


            robot.position.y =
                baseRobotY +
                breathe *
                0.025;


            robot.position.z =
                baseRobotZ +
                Math.sin(
                    time * 0.7
                ) *
                0.008;


            robot.rotation.y =
                baseRobotRotationY +
                smoothPointer.x *
                THREE.MathUtils.degToRad(
                    4
                ) +
                sway *
                THREE.MathUtils.degToRad(
                    1
                );


            robot.rotation.z =
                baseRobotRotationZ +
                Math.sin(
                    time * 0.6
                ) *
                THREE.MathUtils.degToRad(
                    0.5
                );

        }


        /* =================================================
           HEAD
        ================================================= */

        if (
            head &&
            originalHeadRotation
        ) {

            targetHead.y =
                smoothPointer.x *
                THREE.MathUtils.degToRad(
                    20
                );


            targetHead.x =
                smoothPointer.y *
                THREE.MathUtils.degToRad(
                    8
                );


            targetHead.y +=
                Math.sin(
                    time * 0.6
                ) *
                THREE.MathUtils.degToRad(
                    2
                );


            targetHead.x +=
                Math.sin(
                    time * 0.8
                ) *
                THREE.MathUtils.degToRad(
                    1
                );


            const headSmooth =
                1 -
                Math.exp(
                    -4 *
                    delta
                );


            currentHead.x =
                THREE.MathUtils.lerp(
                    currentHead.x,
                    targetHead.x,
                    headSmooth
                );


            currentHead.y =
                THREE.MathUtils.lerp(
                    currentHead.y,
                    targetHead.y,
                    headSmooth
                );


            head.rotation.x =
                originalHeadRotation.x +
                currentHead.x;


            head.rotation.y =
                originalHeadRotation.y +
                currentHead.y;


            head.rotation.z =
                originalHeadRotation.z +
                smoothPointer.x *
                THREE.MathUtils.degToRad(
                    -1.5
                );

        }


        /* =================================================
           ARM
        ================================================= */

        if (
            rightArm &&
            originalRightArmRotation
        ) {

            const targetArmX =
                armRaised
                    ? THREE.MathUtils.degToRad(
                        -48
                    )
                    : 0;


            const targetArmZ =
                armRaised
                    ? THREE.MathUtils.degToRad(
                        -28
                    )
                    : 0;


            const armSmooth =
                1 -
                Math.exp(
                    -5 *
                    delta
                );


            rightArm.rotation.x =
                THREE.MathUtils.lerp(
                    rightArm.rotation.x,
                    originalRightArmRotation.x +
                    targetArmX,
                    armSmooth
                );


            rightArm.rotation.z =
                THREE.MathUtils.lerp(
                    rightArm.rotation.z,
                    originalRightArmRotation.z +
                    targetArmZ,
                    armSmooth
                );

        }


        /* =================================================
           HAND
        ================================================= */

        if (
            rightHand &&
            originalRightHandRotation
        ) {

            const targetHandZ =
                armRaised
                    ? THREE.MathUtils.degToRad(
                        -18
                    )
                    : 0;


            const targetHandX =
                armRaised
                    ? THREE.MathUtils.degToRad(
                        -8
                    )
                    : 0;


            const handSmooth =
                1 -
                Math.exp(
                    -5 *
                    delta
                );


            rightHand.rotation.z =
                THREE.MathUtils.lerp(
                    rightHand.rotation.z,
                    originalRightHandRotation.z +
                    targetHandZ,
                    handSmooth
                );


            rightHand.rotation.x =
                THREE.MathUtils.lerp(
                    rightHand.rotation.x,
                    originalRightHandRotation.x +
                    targetHandX,
                    handSmooth
                );

        }


        /* =================================================
           EYES
        ================================================= */

        if (
            faceEyes.length
        ) {

            const pulse =
                armRaised
                    ? 8 +
                        Math.sin(
                            time * 5
                        ) *
                        1.5

                    : 4 +
                        Math.sin(
                            time * 2
                        ) *
                        0.6;


            faceEyes.forEach(
                eye => {

                    if (
                        eye.material &&
                        "emissiveIntensity"
                        in eye.material
                    ) {

                        eye.material.emissiveIntensity =
                            pulse;

                    }

                }
            );


            const glow =
                armRaised
                    ? 0.20 +
                        Math.sin(
                            time * 5
                        ) *
                        0.08

                    : 0.10 +
                        Math.sin(
                            time * 1.5
                        ) *
                        0.03;


            faceEyeGlows.forEach(
                eye => {

                    eye.material.opacity =
                        glow;

                }
            );

        }


        /* =================================================
           BLINK
        ================================================= */

        blinkTimer +=
            delta;


        if (
            !blinking &&
            blinkTimer >=
            nextBlink
        ) {

            blinking =
                true;


            blinkProgress =
                0;

        }


        if (
            blinking &&
            faceEyes.length === 2
        ) {

            blinkProgress +=
                delta * 10;


            const blinkAmount =
                Math.sin(
                    Math.min(
                        blinkProgress,
                        Math.PI
                    )
                );


            const scaleY =
                THREE.MathUtils.lerp(
                    1,
                    0.08,
                    blinkAmount
                );


            faceEyes.forEach(
                eye => {

                    eye.scale.y =
                        scaleY;

                }
            );


            if (
                blinkProgress >=
                Math.PI
            ) {

                blinking =
                    false;


                blinkTimer =
                    0;


                nextBlink =
                    2.5 +
                    Math.random() *
                    4;


                faceEyes.forEach(
                    eye => {

                        eye.scale.y =
                            1;

                    }
                );

            }

        }


        /* =================================================
           MOUTH
        ================================================= */

        if (faceMouth) {

            if (armRaised) {

                faceMouth.scale.x =
                    1.15 +
                    Math.sin(
                        time * 16
                    ) *
                    0.25;


                faceMouth.scale.y =
                    1 +
                    Math.sin(
                        time * 13
                    ) *
                    0.35;

            } else {

                faceMouth.scale.x =
                    0.95 +
                    Math.sin(
                        time * 1.4
                    ) *
                    0.08;


                faceMouth.scale.y =
                    1;

            }

        }


        /* =================================================
           MOUTH DOTS
        ================================================= */

        faceMouthDots.forEach(
            dot => {

                if (armRaised) {

                    dot.scale.setScalar(
                        1.2 +
                        Math.sin(
                            time * 15
                        ) *
                        0.18
                    );

                } else {

                    dot.scale.setScalar(
                        0.95 +
                        Math.sin(
                            time * 1.4
                        ) *
                        0.08
                    );

                }

            }
        );


        /* =================================================
           FACE LIGHT
        ================================================= */

        if (faceLight) {

            faceLight.intensity =
                armRaised
                    ? 2.3 +
                        Math.sin(
                            time * 6
                        ) *
                        0.7

                    : 0.9 +
                        Math.sin(
                            time * 1.5
                        ) *
                        0.15;

        }


        /* =================================================
           LIGHT PULSE
        ================================================= */

        const lightPulse =
            Math.sin(
                time * 0.8
            );


        greenRim.intensity =
            4.2 +
            lightPulse *
            0.8;


        greenBack.intensity =
            2.8 +
            lightPulse *
            0.5;


        rightLight.intensity =
            3.1 +
            lightPulse *
            0.4;


        leftLight.intensity =
            3.6 +
            lightPulse *
            0.3;


        frontLight.intensity =
            3.5 +
            lightPulse *
            0.2;


        /* =================================================
           RENDER
        ================================================= */

        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* =====================================================
       RESIZE
    ===================================================== */

    function resizeRobot() {

        containerWidth =
            Math.max(
                robotContainer.clientWidth,
                1
            );


        containerHeight =
            Math.max(
                robotContainer.clientHeight,
                1
            );


        camera.aspect =
            containerWidth /
            containerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            containerWidth,
            containerHeight
        );


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );


        /*
           Re-frame robot ketika
           ukuran layar berubah.
        */

        if (robot) {

            frameRobot(
                robot
            );

        }


        /*
           Speech mobile.
        */

        if (
            robotSpeech &&
            window.innerWidth <= 768
        ) {

            robotSpeech.style.position =
                "fixed";

            robotSpeech.style.left =
                "50%";

            robotSpeech.style.right =
                "auto";

            robotSpeech.style.transform =
                "translateX(-50%)";

            robotSpeech.style.width =
                "calc(100vw - 30px)";

            robotSpeech.style.maxWidth =
                "420px";

        }

    }


    window.addEventListener(
        "resize",
        resizeRobot
    );


    window.addEventListener(
        "orientationchange",
        () => {

            setTimeout(
                resizeRobot,
                300
            );

        }
    );

}
