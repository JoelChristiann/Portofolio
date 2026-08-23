/* =========================================================
   THREE.JS ROBOT PORTFOLIO SYSTEM
   FINAL VERSION
   BLACK GLOSSY + GREEN CYBER ROBOT
   LARGE HALF-BODY + TALKING ROBOT
========================================================= */

import * as THREE from "three";

import {
    GLTFLoader
} from "three/addons/loaders/GLTFLoader.js";


/* =========================================================
   GLOBAL ERROR HANDLER
========================================================= */

window.addEventListener("error", (event) => {
    console.error(
        "JavaScript Error:",
        event.error || event.message
    );
});


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
   TYPING TITLE
========================================================= */

const typingElements =
    document.querySelectorAll(
        ".typing-title"
    );

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
                        element.dataset.typed ===
                        "true"
                    ) {
                        return;
                    }

                    element.dataset.typed =
                        "true";

                    const text =
                        element.dataset.text ||
                        element.textContent ||
                        "";

                    element.textContent =
                        "";

                    element.classList.add(
                        "typing-active"
                    );

                    let index = 0;

                    function typeCharacter() {

                        if (
                            index <
                            text.length
                        ) {

                            element.textContent +=
                                text.charAt(index);

                            index++;

                            setTimeout(
                                typeCharacter,
                                38
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
                threshold: 0.15
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


/* =========================================================
   CREATE SPEECH UI AUTOMATICALLY
   JADI TIDAK TERGANTUNG HTML LAMA
========================================================= */

let robotSpeech =
    document.getElementById(
        "robotSpeech"
    );

let speechText =
    document.getElementById(
        "speechText"
    );


function createSpeechUI() {

    /*
       Jika HTML sudah punya speech bubble,
       gunakan yang lama.
    */

    if (
        robotSpeech &&
        speechText
    ) {

        return;

    }


    /*
       Kalau belum ada,
       kita buat otomatis.
    */

    robotSpeech =
        document.createElement(
            "div"
        );

    robotSpeech.id =
        "robotSpeech";


    speechText =
        document.createElement(
            "div"
        );

    speechText.id =
        "speechText";


    robotSpeech.appendChild(
        speechText
    );


    /*
       STYLE LANGSUNG DARI JS
       supaya bubble PASTI terlihat
       walaupun CSS lama berbeda.
    */

    Object.assign(
        robotSpeech.style,
        {

            position:
                "absolute",

            zIndex:
                "50",

            left:
                "50%",

            top:
                "10%",

            transform:
                "translateX(-50%)",

            width:
                "min(620px, 88%)",

            minHeight:
                "58px",

            padding:
                "16px 22px",

            boxSizing:
                "border-box",

            border:
                "1px solid rgba(57,255,115,.65)",

            borderRadius:
                "18px",

            background:
                "rgba(2,8,5,.92)",

            backdropFilter:
                "blur(14px)",

            WebkitBackdropFilter:
                "blur(14px)",

            boxShadow:
                "0 0 25px rgba(57,255,115,.18)",

            color:
                "#8dffb1",

            fontFamily:
                "Inter, Arial, sans-serif",

            fontSize:
                "15px",

            fontWeight:
                "600",

            lineHeight:
                "1.55",

            textAlign:
                "center",

            opacity:
                "0",

            visibility:
                "hidden",

            transition:
                "opacity .25s ease, transform .25s ease"

        }

    );


    Object.assign(
        speechText.style,
        {

            display:
                "block",

            width:
                "100%",

            whiteSpace:
                "normal",

            overflowWrap:
                "anywhere",

            wordBreak:
                "break-word",

            color:
                "#b7ffca",

            textShadow:
                "0 0 8px rgba(57,255,115,.55)"

        }

    );


    if (
        robotContainer
    ) {

        robotContainer.appendChild(
            robotSpeech
        );

    }

}


/*
   Buat speech UI sebelum robot mulai.
*/

if (robotContainer) {

    createSpeechUI();

}


/* =========================================================
   SPEECH CSS OVERRIDE
========================================================= */

function forceSpeechVisible() {

    if (!robotSpeech) {
        return;
    }


    robotSpeech.classList.add(
        "active"
    );


    robotSpeech.style.opacity =
        "1";

    robotSpeech.style.visibility =
        "visible";

    robotSpeech.style.transform =
        "translateX(-50%) translateY(0)";

}


/* =========================================================
   CHECK ROBOT CONTAINER
========================================================= */

if (!robotContainer) {

    console.error(
        "Element #robot-container tidak ditemukan."
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
        0,
        4
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
            window.devicePixelRatio || 1,
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
       LIGHTING
    ===================================================== */

    const ambientLight =
        new THREE.HemisphereLight(
            0xffffff,
            0x041108,
            2.0
        );

    scene.add(
        ambientLight
    );


    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            3.2
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
            3.5,
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
            0x7dffad,
            4.0,
            16,
            2
        );

    leftLight.position.set(
        -5,
        2.5,
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
            3.0,
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

    let baseRobotY = 0;

    let baseRobotZ = 0;

    let baseRobotRotationY = 0;

    let baseRobotRotationZ = 0;


    /* =====================================================
       LOADING
    ===================================================== */

    let loadingScale = 1.35;

    let loadingAnimation = true;

    let loadingStartTime =
        performance.now();

    const loadingDuration =
        1200;


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
       HEAD
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
       TIME
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

        "HELLO. WELCOME TO JOEL'S DIGITAL WORLD.",

        "I'M JOEL'S DIGITAL ASSISTANT.",

        "HE IS AN INFORMATICS STUDENT WHO LOVES TECHNOLOGY.",

        "HIS MAIN INTERESTS ARE ARTIFICIAL INTELLIGENCE, DATA SCIENCE, AND WEB DEVELOPMENT.",

        "HE BUILDS DIGITAL PROJECTS USING CODE, DATA, AND ARTIFICIAL INTELLIGENCE.",

        "YOU CAN EXPLORE HIS PROJECTS, RESEARCH, AND TECHNOLOGY EXPERIMENTS BELOW.",

        "TAKE YOUR TIME. THERE IS SOMETHING INTERESTING TO DISCOVER.",

        "THANK YOU FOR VISITING JOEL'S PORTFOLIO."

    ];


    let speechMessageIndex = 0;

    let speechCharIndex = 0;

    let speechTimer = null;

    let speechPauseTimer = null;

    let speechStarted = false;


    /* =====================================================
       FIND HEAD
    ===================================================== */

    function findHead(root) {

        let found = null;


        const names = [

            "head",
            "Head",
            "HEAD",
            "head 2",
            "Head 2",
            "face",
            "Face",
            "robothead",
            "RobotHead"

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
                                n.toLowerCase()
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


    /* =====================================================
       FIND OBJECT BY NAMES
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
       FIND RIGHT ARM
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
                    "rightshoulder",
                    "shoulder_r",
                    "rightforearm",
                    "forearmright"

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
                "Right arm tidak ditemukan."
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
       BLACK GLOSSY MATERIAL
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


                        /*
                           GREEN MATERIAL
                        */

                        const isGreen =
                            name.includes(
                                "green"
                            ) ||
                            name.includes(
                                "led"
                            ) ||
                            name.includes(
                                "glow"
                            ) ||
                            name.includes(
                                "neon"
                            ) ||
                            name.includes(
                                "emission"
                            ) ||
                            name.includes(
                                "light"
                            ) ||
                            name.includes(
                                "eye"
                            );


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
                                    2.8;

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


                        /*
                           BLACK GLOSSY BODY
                        */

                        if (
                            material.color
                        ) {

                            material.color.set(
                                "#050706"
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
                                0.12;

                        }


                        if (
                            "envMapIntensity"
                            in material
                        ) {

                            material.envMapIntensity =
                                2.8;

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
                                0.04;

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       FRAME ROBOT
       LARGE HALF BODY
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


        object.position.sub(
            center
        );


        /*
           Robot dibuat besar.
        */

        const desiredSize =
            5.2;


        const scale =
            desiredSize /
            maxDimension;


        object.scale.setScalar(
            scale
        );


        /*
           CAMERA CLOSE-UP
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


        const isMobile =
            window.innerWidth <= 768;


        if (isMobile) {

            camera.fov =
                34;

            camera.position.set(
                0,
                0.15,
                distance * 0.95
            );

        } else {

            camera.fov =
                30;

            camera.position.set(
                0,
                0.20,
                distance * 0.88
            );

        }


        camera.updateProjectionMatrix();


        camera.lookAt(
            0,
            0.15,
            0
        );


        /*
           ROBOT POSISI
        */

        object.position.set(
            0,
            isMobile
                ? -0.72
                : -0.62,
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
           Start sedikit lebih besar
        */

        object.scale.setScalar(
            scale * 1.30
        );


        loadingScale =
            1.30;

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
                1.12,
                0.68,
                0.045
            );


        const panelMaterial =
            new THREE.MeshPhysicalMaterial({

                color:
                    0x020403,

                metalness:
                    0.90,

                roughness:
                    0.08,

                clearcoat:
                    1,

                clearcoatRoughness:
                    0.03,

                emissive:
                    0x061b0c,

                emissiveIntensity:
                    0.35

            });


        const panel =
            new THREE.Mesh(
                panelGeometry,
                panelMaterial
            );


        panel.position.set(
            0,
            -0.02,
            0.50
        );


        robotFace.add(
            panel
        );


        /*
           GREEN BORDER
        */

        const borderGeometry =
            new THREE.BoxGeometry(
                1.18,
                0.74,
                0.025
            );


        const borderMaterial =
            new THREE.MeshBasicMaterial({

                color:
                    0x39ff73,

                transparent:
                    true,

                opacity:
                    0.24

            });


        const border =
            new THREE.Mesh(
                borderGeometry,
                borderMaterial
            );


        border.position.set(
            0,
            -0.02,
            0.475
        );


        robotFace.add(
            border
        );


        /*
           EYES
        */

        const eyeGeometry =
            new THREE.SphereGeometry(
                0.115,
                32,
                32
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
                    0.05

            });


        const leftEye =
            new THREE.Mesh(
                eyeGeometry,
                eyeMaterial.clone()
            );


        leftEye.position.set(
            -0.24,
            0.10,
            0.55
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
            0.24,
            0.10,
            0.55
        );


        robotFace.add(
            rightEye
        );


        faceEyes.push(
            rightEye
        );


        /*
           EYE GLOW
        */

        const glowGeometry =
            new THREE.SphereGeometry(
                0.19,
                20,
                20
            );


        const glowMaterial =
            new THREE.MeshBasicMaterial({

                color:
                    0x39ff73,

                transparent:
                    true,

                opacity:
                    0.12,

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
                0.40,
                0.035,
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
            -0.17,
            0.55
        );


        robotFace.add(
            faceMouth
        );


        /*
           MOUTH DOTS
        */

        const dotGeometry =
            new THREE.SphereGeometry(
                0.026,
                14,
                14
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
                i * 0.075,
                -0.17,
                0.56
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
                3,
                2
            );


        faceLight.position.set(
            0,
            0,
            0.7
        );


        robotFace.add(
            faceLight
        );

    }


    /* =====================================================
       ROBOT SPEECH
    ===================================================== */

    function startRobotSpeech() {

        if (
            speechStarted
        ) {

            return;

        }


        if (!robotSpeech) {

            createSpeechUI();

        }


        if (!speechText) {

            console.error(
                "speechText tidak tersedia."
            );

            return;

        }


        speechStarted =
            true;


        speechMessageIndex =
            0;


        armRaised =
            true;


        forceSpeechVisible();


        playSpeechMessage();

    }


    /* =====================================================
       PLAY SPEECH MESSAGE
    ===================================================== */

    function playSpeechMessage() {

        if (
            !robotSpeech ||
            !speechText
        ) {

            return;

        }


        /*
           Semua pesan selesai.
        */

        if (
            speechMessageIndex >=
            speechMessages.length
        ) {

            armRaised =
                false;


            speechText.textContent =
                "SYSTEM ONLINE • THANK YOU FOR VISITING.";


            setTimeout(
                () => {

                    /*
                       Ulangi dari awal setelah
                       beberapa detik.
                    */

                    speechMessageIndex =
                        0;

                    armRaised =
                        true;

                    playSpeechMessage();

                },
                2500
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


        armRaised =
            true;


        forceSpeechVisible();


        clearInterval(
            speechTimer
        );


        clearTimeout(
            speechPauseTimer
        );


        /*
           Typing cepat.
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
                           Jeda singkat.
                        */

                        speechPauseTimer =
                            setTimeout(
                                () => {

                                    speechMessageIndex++;


                                    /*
                                       Turunkan tangan
                                       sebentar.
                                    */

                                    armRaised =
                                        false;


                                    setTimeout(
                                        () => {

                                            armRaised =
                                                true;


                                            playSpeechMessage();

                                        },
                                        220
                                    );


                                },
                                650
                            );

                    }

                },
                24
            );

    }


    /* =====================================================
       LOADING ANIMATION
    ===================================================== */

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
            progress >= 0.65 &&
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
                    "READY — AI ONLINE";


                robotStatus.classList.remove(
                    "hidden"
                );


                setTimeout(
                    () => {

                        robotStatus.classList.add(
                            "hidden"
                        );

                    },
                    1000
                );

            }


            /*
               Speech dimulai.
            */

            setTimeout(
                () => {

                    startRobotSpeech();

                },
                300
            );

        }

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
                "ROBOT BERHASIL DIMUAT:",
                robot
            );


            /*
               STYLE ROBOT
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
                    "ROBOT FACE BERHASIL DIBUAT."
                );

            } else {

                console.warn(
                    "HEAD ROBOT TIDAK DITEMUKAN."
                );

            }


            /*
               FRAME
            */

            frameRobot(
                robot
            );


            /*
               BASE SCALE
            */

            robot.userData.baseScale =
                robot.scale.x /
                1.30;


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
               Jika speech belum berjalan,
               jalankan setelah robot siap.
            */

            setTimeout(
                () => {

                    startRobotSpeech();

                },
                500
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
                "ROBOT GAGAL DIMUAT:",
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

        }
    );


    /* =====================================================
       TOUCH SUPPORT
    ===================================================== */

    window.addEventListener(
        "touchmove",
        event => {

            if (
                !event.touches ||
                !event.touches.length
            ) {

                return;

            }


            const touch =
                event.touches[0];


            pointer.x =
                (
                    touch.clientX /
                    window.innerWidth
                ) * 2 - 1;


            pointer.y =
                -(
                    (
                        touch.clientY /
                        window.innerHeight
                    ) * 2 - 1
                );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       ANIMATION LOOP
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
           LOADING
        ================================================= */

        updateLoadingAnimation();


        /* =================================================
           POINTER SMOOTH
        ================================================= */

        const cursorSmooth =
            1 -
            Math.exp(
                -3.2 *
                delta
            );


        smoothPointer.lerp(
            pointer,
            cursorSmooth
        );


        /* =================================================
           BODY
        ================================================= */

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
                    4
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
           RIGHT ARM
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
           RIGHT HAND
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
            faceEyes.length > 0
        ) {

            const talkingIntensity =
                armRaised
                    ? 8.5
                    : 4.2;


            const eyePulse =
                talkingIntensity +
                Math.sin(
                    time * 5
                ) *
                (
                    armRaised
                        ? 1.8
                        : 0.7
                );


            faceEyes.forEach(
                eye => {

                    if (
                        eye.material &&
                        "emissiveIntensity"
                        in eye.material
                    ) {

                        eye.material
                            .emissiveIntensity =
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
                        0.09

                    : 0.10 +
                        Math.sin(
                            time * 1.5
                        ) *
                        0.03;


            faceEyeGlows.forEach(
                glow => {

                    glow.material.opacity =
                        glowPulse;

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
           MOUTH TALKING
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
                    1.0 +
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
           LIGHT MOVEMENT
        ================================================= */

        const lightPulse =
            Math.sin(
                time * 0.8
            );


        greenRim.intensity =
            4.0 +
            lightPulse *
            0.8;


        greenBack.intensity =
            2.6 +
            lightPulse *
            0.5;


        rightLight.intensity =
            3.0 +
            lightPulse *
            0.4;


        leftLight.intensity =
            3.5 +
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
                window.devicePixelRatio || 1,
                2
            )

        );


        /*
           Reposition camera berdasarkan layar.
        */

        const isMobile =
            window.innerWidth <= 768;


        camera.fov =
            isMobile
                ? 34
                : 30;


        camera.updateProjectionMatrix();

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


    /* =====================================================
       FORCE SPEECH START
       Backup kalau loading callback bermasalah.
    ===================================================== */

    setTimeout(
        () => {

            if (
                !speechStarted &&
                robot
            ) {

                console.log(
                    "BACKUP SPEECH START"
                );


                startRobotSpeech();

            }

        },
        2500
    );

}
