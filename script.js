/* =====================================================
   THREE.JS ROBOT PORTFOLIO
   FULL VERSION
===================================================== */

import * as THREE from "three";

import {
    GLTFLoader
} from "three/addons/loaders/GLTFLoader.js";


/* =====================================================
   MOBILE MENU
===================================================== */

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

                    mobileNav.classList.remove("active");

                }
            );

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
   TYPING TITLE
===================================================== */

const typingElements =
    document.querySelectorAll(".typing-title");

if (typingElements.length > 0) {

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

                        if (
                            index < text.length
                        ) {

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

    typingElements.forEach(
        element => {

            typingObserver.observe(
                element
            );

        }
    );

}


/* =====================================================
   FAQ
===================================================== */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(
    question => {

        question.addEventListener(
            "click",
            () => {

                const currentItem =
                    question.closest(".faq-item");

                if (!currentItem) {
                    return;
                }

                document
                    .querySelectorAll(".faq-item")
                    .forEach(item => {

                        if (
                            item !== currentItem
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
            "Project ini berfokus pada eksplorasi proses machine learning mulai dari data preprocessing, eksplorasi dataset, training model, evaluasi performa, sampai analisis hasil.",

        technologies: [
            "Python",
            "Machine Learning",
            "Artificial Intelligence",
            "Pandas",
            "NumPy"
        ],

        link: "#"

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

        link: "#"

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

        link: "#"

    },


    trading: {

        category:
            "ALGORITHMIC TRADING",

        title:
            "XAUUSD Trading EA",

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

        link: "#"

    }

};


/* =====================================================
   PROJECT MODAL
===================================================== */

const projectModal =
    document.getElementById("projectModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");

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

const modalProjectLink =
    document.getElementById("modalProjectLink");


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
                    document.createElement("span");

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

    projectModal.classList.add("active");

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
    .querySelectorAll(".project-card")
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
            projectModal.classList.contains("active")
        ) {

            closeProject();

        }

    }
);


/* =====================================================
   ROBOT ELEMENTS
===================================================== */

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


/* =====================================================
   ROBOT
===================================================== */

if (!robotContainer) {

    console.error(
        "Element #robot-container tidak ditemukan."
    );

} else {


    /* =================================================
       SCENE
    ================================================== */

    const scene =
        new THREE.Scene();


    /* =================================================
       CAMERA
    ================================================== */

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
            27,
            containerWidth / containerHeight,
            0.01,
            100
        );


    camera.position.set(
        0,
        0.05,
        5
    );


    /* =================================================
       RENDERER
    ================================================== */

    const renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            alpha: true,

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
        1.35;


    renderer.setClearColor(
        0x000000,
        0
    );


    robotContainer.appendChild(
        renderer.domElement
    );


    /* =================================================
       LIGHTING
    ================================================== */

    const ambientLight =
        new THREE.HemisphereLight(
            0xffffff,
            0x06100b,
            2.2
        );

    scene.add(
        ambientLight
    );


    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            3.6
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
            3.2,
            15,
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
            0x3cff78,
            4.0,
            14,
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
            0x65ff94,
            3.0,
            12,
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
            4.0,
            14,
            2
        );

    greenRim.position.set(
        -4,
        2,
        2
    );

    scene.add(
        greenRim
    );


    const greenBack =
        new THREE.PointLight(
            0x65ff94,
            2.0,
            12,
            2
        );

    greenBack.position.set(
        1,
        2,
        -5
    );

    scene.add(
        greenBack
    );


    /* =================================================
       ROBOT VARIABLES
    ================================================== */

    let robot = null;

    let head = null;

    let originalHeadRotation = null;

    let robotFace = null;

    let faceEyes = [];

    let faceEyeGlows = [];

    let faceMouth = null;

    let faceMouthDots = [];

    let faceLight = null;


    /* =================================================
       ARM VARIABLES
    ================================================== */

    let rightArm = null;

    let rightHand = null;

    let originalRightArmRotation = null;

    let originalRightHandRotation = null;

    let armRaised = false;


    /* =================================================
       ROBOT BASE
    ================================================== */

    let baseRobotY = 0;

    let baseRobotZ = 0;

    let baseRobotRotationY = 0;

    let baseRobotRotationZ = 0;


    /* =================================================
       LOADING
    ================================================== */

    let loadingScale = 1.0;

    let loadingAnimation = true;

    let loadingStartTime =
        performance.now();

    const loadingDuration = 1800;


    /* =================================================
       POINTER
    ================================================== */

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


    /* =================================================
       HEAD MOTION
    ================================================== */

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


    /* =================================================
       CLOCK
    ================================================== */

    const clock =
        new THREE.Clock();

    let time = 0;


    /* =================================================
       BLINK
    ================================================== */

    let blinkTimer = 0;

    let nextBlink =
        3 +
        Math.random() * 4;

    let blinking = false;

    let blinkProgress = 0;


    /* =================================================
       SPEECH
    ================================================== */

    const speechMessages = [

        "HELLO, WELCOME TO MY WEBSITE.",

        "I'M JOEL CHRISTIAN.",

        "I'M A COMPUTER SCIENCE STUDENT.",

        "I'M INTERESTED IN ARTIFICIAL INTELLIGENCE, DATA SCIENCE, AND WEB DEVELOPMENT.",

        "I BUILD DIGITAL PROJECTS AND EXPERIMENT WITH NEW TECHNOLOGIES.",

        "MY GOAL IS TO TURN IDEAS INTO REAL DIGITAL PRODUCTS.",

        "FEEL FREE TO EXPLORE MY PORTFOLIO.",

        "THANK YOU FOR VISITING."

    ];


    let speechMessageIndex = 0;

    let speechIndex = 0;

    let speechTimer = null;

    let speechStarted = false;


    /* =================================================
       FIND HEAD
    ================================================== */

    function findHead(root) {

        let found = null;

        const names = [

            "head",
            "Head",
            "HEAD",
            "head 2",
            "Head 2",
            "face",
            "Face"

        ];


        root.traverse(
            object => {

                if (found) {
                    return;
                }

                const name =
                    (
                        object.name ||
                        ""
                    )
                    .trim()
                    .toLowerCase();


                if (
                    names
                        .map(
                            n =>
                                n
                                    .toLowerCase()
                        )
                        .includes(name)
                ) {

                    found =
                        object;

                }

            }
        );


        return found;

    }


    /* =================================================
       FIND OBJECT
    ================================================== */

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


    /* =================================================
       FIND ARM
    ================================================== */

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
                    "right_arm",
                    "shoulderright",
                    "rightshoulder",
                    "shoulder_r"

                ]
            );


        rightHand =
            findObjectByNames(
                robot,
                [

                    "righthand",
                    "handright",
                    "rhand",
                    "hand_r",
                    "right_hand"

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
                "RIGHT ARM TIDAK DITEMUKAN."
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


    /* =================================================
       MATERIAL STYLE
    ================================================== */

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


                        /* =========================
                           GREEN / LED
                        ========================= */

                        if (
                            name.includes("green") ||
                            name.includes("led") ||
                            name.includes("glow") ||
                            name.includes("neon") ||
                            name.includes("emission")
                        ) {

                            if (
                                material.color
                            ) {

                                material.color.set(
                                    "#4dff82"
                                );

                            }


                            if (
                                "emissive"
                                in material
                            ) {

                                material.emissive.set(
                                    "#39ff70"
                                );

                                material.emissiveIntensity =
                                    2.0;

                            }


                            if (
                                "metalness"
                                in material
                            ) {

                                material.metalness =
                                    0.45;

                            }


                            if (
                                "roughness"
                                in material
                            ) {

                                material.roughness =
                                    0.16;

                            }


                            return;

                        }


                        /* =========================
                           BLACK / MAIN BODY
                        ========================= */

                        if (
                            material.color
                        ) {

                            material.color.set(
                                "#080d0b"
                            );

                        }


                        if (
                            "metalness"
                            in material
                        ) {

                            material.metalness =
                                0.78;

                        }


                        if (
                            "roughness"
                            in material
                        ) {

                            material.roughness =
                                0.16;

                        }


                        if (
                            "envMapIntensity"
                            in material
                        ) {

                            material.envMapIntensity =
                                2.0;

                        }


                        if (
                            "clearcoat"
                            in material
                        ) {

                            material.clearcoat =
                                0.75;

                        }


                        if (
                            "clearcoatRoughness"
                            in material
                        ) {

                            material.clearcoatRoughness =
                                0.08;

                        }

                    }
                );

            }
        );

    }


    /* =================================================
       FRAME ROBOT
    ================================================== */

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


        object.position.sub(
            center
        );


        /*
           ROBOT LEBIH BESAR
        */

        const desiredSize =
            5.35;


        const scale =
            desiredSize /
            maxDimension;


        object.scale.setScalar(
            scale
        );


        /*
           CAMERA LEBIH DEKAT
        */

        const fov =
            THREE.MathUtils.degToRad(
                camera.fov
            );


        const distance =
            (
                desiredSize / 2
            ) /
            Math.tan(
                fov / 2
            );


        camera.position.set(
            0,
            0.0,
            distance * 1.02
        );


        camera.lookAt(
            0,
            0.15,
            0
        );


        /*
           POSISI ROBOT
        */

        object.position.set(
            0,
            -0.78,
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


        /*
           LOADING SCALE
        */

        object.scale.setScalar(
            scale * 1.30
        );


        loadingScale =
            1.30;

    }


    /* =================================================
       CREATE ROBOT FACE
    ================================================== */

    function createRobotFace() {

        if (!head) {
            return;
        }


        robotFace =
            new THREE.Group();


        head.add(
            robotFace
        );


        /* =========================
           FACE PANEL
        ========================= */

        const panelGeometry =
            new THREE.BoxGeometry(
                0.92,
                0.55,
                0.045
            );


        const panelMaterial =
            new THREE.MeshPhysicalMaterial({

                color:
                    0x020403,

                metalness:
                    0.88,

                roughness:
                    0.12,

                clearcoat:
                    1,

                clearcoatRoughness:
                    0.04

            });


        const panel =
            new THREE.Mesh(
                panelGeometry,
                panelMaterial
            );


        panel.position.set(
            0,
            -0.02,
            0.47
        );


        robotFace.add(
            panel
        );


        /* =========================
           EYES
        ========================= */

        const eyeGeometry =
            new THREE.SphereGeometry(
                0.105,
                24,
                24
            );


        const eyeMaterial =
            new THREE.MeshStandardMaterial({

                color:
                    0x72ff9b,

                emissive:
                    0x39ff70,

                emissiveIntensity:
                    5.0,

                roughness:
                    0.05,

                metalness:
                    0.05

            });


        const leftEye =
            new THREE.Mesh(
                eyeGeometry,
                eyeMaterial.clone()
            );


        leftEye.position.set(
            -0.205,
            0.085,
            0.505
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
            0.205,
            0.085,
            0.505
        );


        robotFace.add(
            rightEye
        );


        faceEyes.push(
            rightEye
        );


        /* =========================
           EYE GLOW
        ========================= */

        const glowGeometry =
            new THREE.SphereGeometry(
                0.155,
                20,
                20
            );


        const glowMaterial =
            new THREE.MeshBasicMaterial({

                color:
                    0x39ff70,

                transparent:
                    true,

                opacity:
                    0.14,

                depthWrite:
                    false

            });


        const leftGlow =
            new THREE.Mesh(
                glowGeometry,
                glowMaterial.clone()
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


        /* =========================
           MOUTH
        ========================= */

        const mouthGeometry =
            new THREE.BoxGeometry(
                0.36,
                0.028,
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
            -0.14,
            0.51
        );


        robotFace.add(
            faceMouth
        );


        /* =========================
           MOUTH DOTS
        ========================= */

        const dotGeometry =
            new THREE.SphereGeometry(
                0.025,
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
                i * 0.07,
                -0.14,
                0.52
            );


            robotFace.add(
                dot
            );


            faceMouthDots.push(
                dot
            );

        }


        /* =========================
           FACE LIGHT
        ========================= */

        faceLight =
            new THREE.PointLight(
                0x39ff70,
                1.5,
                3,
                2
            );


        faceLight.position.set(
            0,
            0,
            0.8
        );


        robotFace.add(
            faceLight
        );

    }


    /* =================================================
       SPEECH
    ================================================== */

    function startRobotSpeech() {

        if (
            speechStarted ||
            !robotSpeech ||
            !speechText
        ) {
            return;
        }


        speechStarted =
            true;


        speechMessageIndex =
            0;


        showNextSpeech();

    }


    function showNextSpeech() {

        if (
            !robotSpeech ||
            !speechText
        ) {
            return;
        }


        const message =
            speechMessages[
                speechMessageIndex
            ];


        speechText.textContent =
            "";


        robotSpeech.classList.add(
            "active"
        );


        /*
           ANGKAT TANGAN
        */

        armRaised =
            true;


        speechIndex =
            0;


        if (speechTimer) {

            clearInterval(
                speechTimer
            );

        }


        speechTimer =
            setInterval(
                () => {

                    if (
                        speechIndex <
                        message.length
                    ) {

                        speechText.textContent +=
                            message.charAt(
                                speechIndex
                            );

                        speechIndex++;

                    } else {

                        clearInterval(
                            speechTimer
                        );

                        speechTimer =
                            null;


                        /*
                           Tahan gesture.
                        */

                        setTimeout(
                            () => {

                                robotSpeech.classList.remove(
                                    "active"
                                );

                                armRaised =
                                    false;


                                speechMessageIndex++;


                                if (
                                    speechMessageIndex >=
                                    speechMessages.length
                                ) {

                                    speechMessageIndex =
                                        0;

                                }


                                /*
                                   Jeda lalu
                                   bicara lagi.
                                */

                                setTimeout(
                                    showNextSpeech,
                                    1800
                                );

                            },
                            2200
                        );

                    }

                },
                42
            );

    }


    /* =================================================
       LOADING ANIMATION
    ================================================== */

    function updateLoadingAnimation() {

        if (
            !robot ||
            !loadingAnimation
        ) {
            return;
        }


        const elapsed =
            performance.now() -
            loadingStartTime;


        const progress =
            Math.min(
                elapsed /
                loadingDuration,
                1
            );


        const ease =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        loadingScale =
            THREE.MathUtils.lerp(
                1.30,
                1.0,
                ease
            );


        const baseScale =
            robot.userData.baseScale ||
            1;


        robot.scale.setScalar(
            baseScale *
            loadingScale
        );


        if (
            progress >= 0.75 &&
            robotStatus
        ) {

            robotStatus.classList.add(
                "hidden"
            );

        }


        if (
            progress >= 1
        ) {

            loadingAnimation =
                false;


            loadingScale =
                1;


            robot.scale.setScalar(
                baseScale
            );


            if (robotLoading) {

                robotLoading.classList.add(
                    "hidden"
                );

            }


            if (robotStatus) {

                robotStatus.textContent =
                    "READY — MOVE CURSOR";


                robotStatus.classList.remove(
                    "hidden"
                );


                setTimeout(
                    () => {

                        robotStatus.classList.add(
                            "hidden"
                        );

                    },
                    1200
                );

            }


            /*
               Mulai bicara.
            */

            setTimeout(
                startRobotSpeech,
                700
            );

        }

    }


    /* =================================================
       LOAD GLB
    ================================================== */

    const loader =
        new GLTFLoader();


    loader.load(

        "./robot.glb",

        gltf => {

            robot =
                gltf.scene;


            console.log(
                "Robot berhasil dimuat."
            );


            styleRobotMaterials(
                robot
            );


            scene.add(
                robot
            );


            head =
                findHead(
                    robot
                );


            if (head) {

                originalHeadRotation =
                    head.rotation.clone();


                createRobotFace();

            } else {

                console.warn(
                    "HEAD robot tidak ditemukan."
                );

            }


            frameRobot(
                robot
            );


            /*
               Simpan normal scale.
            */

            robot.userData.baseScale =
                robot.scale.x /
                1.30;


            /*
               Cari tangan.
            */

            findRightArm();


            if (robotStatus) {

                robotStatus.textContent =
                    "ROBOT ONLINE";

            }

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
                        ) *
                        100
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
                "Robot gagal dimuat:",
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


    /* =================================================
       POINTER
    ================================================== */

    window.addEventListener(
        "pointermove",
        event => {

            pointer.x =
                (
                    event.clientX /
                    window.innerWidth
                ) *
                2 -
                1;


            pointer.y =
                -(
                    (
                        event.clientY /
                        window.innerHeight
                    ) *
                    2 -
                    1
                );

        }
    );


    /* =================================================
       ANIMATION LOOP
    ================================================== */

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


        /* =========================
           LOADING
        ========================= */

        updateLoadingAnimation();


        /* =========================
           POINTER SMOOTHING
        ========================= */

        const cursorSmooth =
            1 -
            Math.exp(
                -2.8 *
                delta
            );


        smoothPointer.lerp(
            pointer,
            cursorSmooth
        );


        /* =========================
           BODY
        ========================= */

        if (robot) {

            const breathe =
                Math.sin(
                    time * 1.05
                );


            const sway =
                Math.sin(
                    time * 0.48
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


            const cursorBodyRotation =
                smoothPointer.x *
                THREE.MathUtils.degToRad(
                    3.5
                );


            robot.rotation.y =
                baseRobotRotationY +
                cursorBodyRotation +
                sway *
                THREE.MathUtils.degToRad(
                    1
                );


            robot.rotation.z =
                baseRobotRotationZ +
                Math.sin(
                    time * 0.65
                ) *
                THREE.MathUtils.degToRad(
                    0.6
                );

        }


        /* =========================
           HEAD
        ========================= */

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
                    time * 0.65
                ) *
                THREE.MathUtils.degToRad(
                    2.5
                );


            targetHead.x +=
                Math.sin(
                    time * 0.85
                ) *
                THREE.MathUtils.degToRad(
                    1.1
                );


            const headSmooth =
                1 -
                Math.exp(
                    -3.8 *
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
           RIGHT ARM
        ================================================== */

        if (
            rightArm &&
            originalRightArmRotation
        ) {

            /*
               Gesture lebih kuat.
            */

            const targetArmX =
                armRaised
                    ? THREE.MathUtils.degToRad(
                        -55
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
                    -3.2 *
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
           RIGHT HAND
        ================================================== */

        if (
            rightHand &&
            originalRightHandRotation
        ) {

            const targetHandZ =
                armRaised
                    ? THREE.MathUtils.degToRad(
                        -20
                    )
                    : 0;


            const handSmooth =
                1 -
                Math.exp(
                    -3.5 *
                    delta
                );


            rightHand.rotation.z =
                THREE.MathUtils.lerp(
                    rightHand.rotation.z,
                    originalRightHandRotation.z +
                    targetHandZ,
                    handSmooth
                );

        }


        /* =================================================
           EYES
        ================================================== */

        if (
            faceEyes.length > 0
        ) {

            const talkingIntensity =
                armRaised
                    ? 8.0
                    : 4.5;


            const eyePulse =
                talkingIntensity +
                Math.sin(
                    time * 5
                ) *
                (
                    armRaised
                        ? 1.5
                        : 0.5
                );


            faceEyes.forEach(
                eye => {

                    if (
                        eye.material &&
                        "emissiveIntensity"
                        in eye.material
                    ) {

                        eye.material.emissiveIntensity =
                            eyePulse;

                    }

                }
            );


            const glowPulse =
                armRaised
                    ? 0.20 +
                        Math.sin(
                            time * 5
                        ) *
                        0.08
                    : 0.10 +
                        Math.sin(
                            time * 1.3
                        ) *
                        0.025;


            faceEyeGlows.forEach(
                glow => {

                    glow.material.opacity =
                        glowPulse;

                }
            );

        }


        /* =================================================
           BLINK
        ================================================== */

        blinkTimer +=
            delta;


        if (
            !blinking &&
            blinkTimer >= nextBlink
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
                delta * 9;


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
                    3 +
                    Math.random() *
                    5;


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
        ================================================== */

        if (faceMouth) {

            if (armRaised) {

                faceMouth.scale.x =
                    1.20 +
                    Math.sin(
                        time * 13
                    ) *
                    0.22;

                faceMouth.scale.y =
                    1.2 +
                    Math.sin(
                        time * 13
                    ) *
                    0.15;

            } else {

                faceMouth.scale.x =
                    0.95 +
                    Math.sin(
                        time * 1.4
                    ) *
                    0.05;

                faceMouth.scale.y =
                    1;

            }

        }


        faceMouthDots.forEach(
            dot => {

                if (armRaised) {

                    dot.scale.setScalar(
                        1.20 +
                        Math.sin(
                            time * 13
                        ) *
                        0.15
                    );

                } else {

                    dot.scale.setScalar(
                        0.95
                    );

                }

            }
        );


        /* =================================================
           FACE LIGHT
        ================================================== */

        if (faceLight) {

            faceLight.intensity =
                armRaised
                    ? 2.2 +
                        Math.sin(
                            time * 5
                        ) *
                        0.6
                    : 1.0 +
                        Math.sin(
                            time * 1.4
                        ) *
                        0.15;

        }


        /* =================================================
           LIGHT MOVEMENT
        ================================================== */

        const lightPulse =
            Math.sin(
                time * 0.8
            );


        greenRim.intensity =
            3.7 +
            lightPulse *
            0.6;


        greenBack.intensity =
            1.8 +
            lightPulse *
            0.3;


        frontLight.intensity =
            3.1 +
            lightPulse *
            0.25;


        leftLight.intensity =
            3.8 +
            lightPulse *
            0.2;


        /* =================================================
           RENDER
        ================================================== */

        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* =================================================
       RESIZE
    ================================================== */

    window.addEventListener(
        "resize",
        () => {

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

        }
    );

}
