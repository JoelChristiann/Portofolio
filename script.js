/* =========================================================
   JOELCHRIS PORTFOLIO
   THREE.JS ROBOT SYSTEM
   FINAL VERSION
   ---------------------------------------------------------
   FIX:
   1. Robot half-body
   2. Robot large
   3. Speech bubble position
   4. Mobile speech responsive
   5. Typing title restored
   6. Robot talking animation
   7. Arm movement
   8. Face / eyes / mouth
   9. Black glossy + green reflection
========================================================= */

import * as THREE from "three";

import {
    GLTFLoader
} from "three/addons/loaders/GLTFLoader.js";


/* =========================================================
   GLOBAL YEAR
========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE MENU
========================================================= */

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


/* =========================================================
   TYPING TITLE SYSTEM
=========================================================

   HTML contoh:

   <h2
      class="large-title typing-title"
      data-text="I build technology to solve real-world problems."
   ></h2>

========================================================= */

function startTypingTitle(element) {

    if (!element) return;

    if (element.dataset.typingStarted === "true") {
        return;
    }

    element.dataset.typingStarted = "true";

    const text =
        element.dataset.text ||
        element.textContent.trim();

    if (!text) return;

    element.textContent = "";

    element.classList.add("typing-active");

    let index = 0;

    const speed = 38;

    function typeNext() {

        if (index < text.length) {

            element.textContent += text.charAt(index);

            index++;

            setTimeout(typeNext, speed);

        } else {

            element.classList.remove("typing-active");

        }

    }

    typeNext();
}


/* =========================================================
   TYPING TITLE OBSERVER
========================================================= */

const typingTitles =
    document.querySelectorAll(".typing-title");

if (typingTitles.length > 0) {

    const typingObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    startTypingTitle(entry.target);

                });

            },

            {
                threshold: 0.05
            }

        );


    typingTitles.forEach(element => {

        typingObserver.observe(element);

    });

}


/* =========================================================
   FAQ
========================================================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const currentItem =
            question.closest(".faq-item");

        if (!currentItem) return;


        document
            .querySelectorAll(".faq-item")
            .forEach(item => {

                if (item !== currentItem) {

                    item.classList.remove("active");

                }

            });


        currentItem.classList.toggle("active");

    });

});


/* =========================================================
   PROJECT DATA
========================================================= */

const projectData = {

    ai: {

        category: "ARTIFICIAL INTELLIGENCE",

        title: "AI Research",

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

        category: "WEB DEVELOPMENT",

        title: "Digital Village",

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

        category: "DATA SCIENCE",

        title: "Data Analytics",

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

        category: "ALGORITHMIC TRADING",

        title: "XAUUSD Trading EA",

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


/* =========================================================
   PROJECT MODAL
========================================================= */

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

    if (!project || !projectModal) {
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

        modalTags.innerHTML = "";

        project.technologies.forEach(
            technology => {

                const tag =
                    document.createElement("span");

                tag.textContent =
                    technology;

                modalTags.appendChild(tag);

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

    document.body.classList.add("modal-open");

}


function closeProject() {

    if (!projectModal) {
        return;
    }

    projectModal.classList.remove("active");

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

        card.addEventListener("click", () => {

            openProject(
                card.dataset.project
            );

        });


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
       FORCE SPEECH POSITION
       Supaya tidak menutup kepala robot
    ===================================================== */

    function positionSpeechBubble() {

        if (!robotSpeech) return;


        robotSpeech.style.position =
            "absolute";

        robotSpeech.style.zIndex =
            "50";

        robotSpeech.style.boxSizing =
            "border-box";

        robotSpeech.style.wordBreak =
            "normal";

        robotSpeech.style.overflowWrap =
            "break-word";


        if (window.innerWidth <= 600) {

            /*
               MOBILE

               Bubble berada di bagian
               atas kanan visual.

               Robot berada lebih rendah.
            */

            robotSpeech.style.top =
                "3%";

            robotSpeech.style.left =
                "5%";

            robotSpeech.style.right =
                "5%";

            robotSpeech.style.width =
                "90%";

            robotSpeech.style.maxWidth =
                "90%";

            robotSpeech.style.transform =
                "none";

            robotSpeech.style.fontSize =
                "13px";

            robotSpeech.style.lineHeight =
                "1.45";

            robotSpeech.style.padding =
                "12px 14px";

        } else {

            /*
               DESKTOP

               Bubble berada di kanan
               atas robot.
            */

            robotSpeech.style.top =
                "8%";

            robotSpeech.style.right =
                "3%";

            robotSpeech.style.left =
                "auto";

            robotSpeech.style.width =
                "min(410px, 38%)";

            robotSpeech.style.maxWidth =
                "410px";

            robotSpeech.style.transform =
                "none";

        }

    }


    positionSpeechBubble();


    window.addEventListener(
        "resize",
        positionSpeechBubble
    );


    /* =====================================================
       THREE SCENE
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
            25,
            containerWidth /
                containerHeight,
            0.01,
            100
        );


    camera.position.set(
        0,
        0.45,
        5
    );


    /* =====================================================
       RENDERER
    ===================================================== */

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
        1.65;


    renderer.setClearColor(
        0x000000,
        0
    );


    /*
       HALF BODY CLIPPING

       Bagian bawah robot akan dipotong.
    */

    renderer.localClippingEnabled =
        true;


    robotContainer.appendChild(
        renderer.domElement
    );


    /* =====================================================
       LIGHTING
    ===================================================== */

    const ambientLight =
        new THREE.HemisphereLight(
            0xffffff,
            0x06120a,
            2.0
        );

    scene.add(
        ambientLight
    );


    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            3.5
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
            0x5cff91,
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


    /* =====================================================
       FACE
    ===================================================== */

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

    let loadingAnimation = true;

    let loadingScale = 1.25;

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

        "HELLO. WELCOME TO JOELCHRIS.",

        "I'M JOEL'S DIGITAL ASSISTANT.",

        "JOEL IS AN INFORMATICS STUDENT EXPLORING ARTIFICIAL INTELLIGENCE.",

        "HE'S INTERESTED IN AI, DATA SCIENCE, COMPUTER VISION, AND WEB DEVELOPMENT.",

        "THIS WEBSITE SHOWS HIS EXPERIMENTS, PROJECTS, AND TECHNOLOGY JOURNEY.",

        "TAKE A LOOK AROUND AND EXPLORE THE PROJECTS.",

        "THANKS FOR VISITING."

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
            "Face"

        ];


        root.traverse(object => {

            if (found) return;


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

        });


        return found;

    }


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


        root.traverse(object => {

            if (found) return;


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

        });


        return found;

    }


    /* =====================================================
       FIND RIGHT ARM
    ===================================================== */

    function findRightArm() {

        if (!robot) return;


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
       ROBOT MATERIAL
    ===================================================== */

    function styleRobotMaterials(root) {

        root.traverse(object => {

            if (!object.isMesh) return;


            const materials =
                Array.isArray(
                    object.material
                )
                    ? object.material
                    : [
                        object.material
                    ];


            materials.forEach(material => {

                if (!material) return;


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

                    if (material.color) {

                        material.color.set(
                            "#49ff82"
                        );

                    }


                    if (
                        "emissive"
                        in material
                    ) {

                        material.emissive.set(
                            "#22ff68"
                        );

                        material.emissiveIntensity =
                            2.8;

                    }


                    if (
                        "metalness"
                        in material
                    ) {

                        material.metalness =
                            0.3;

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
                   BLACK GLOSSY
                */

                if (material.color) {

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

            });

        });

    }


    /* =====================================================
       FRAME ROBOT
       ROBOT BESAR + HALF BODY
    ===================================================== */

    function frameRobot(object) {

        const box =
            new THREE.Box3()
                .setFromObject(object);


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


        if (maxDimension <= 0) {
            return;
        }


        /*
           CENTER MODEL
        */

        object.position.sub(center);


        /*
           ROBOT BESAR
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
           MOBILE
        */

        const isMobile =
            window.innerWidth <= 768;


        /*
           CAMERA

           Kita zoom lebih dekat.
        */

        const cameraDistance =
            isMobile
                ? 5.7
                : 5.15;


        camera.position.set(

            0,

            isMobile
                ? 0.72
                : 0.62,

            cameraDistance

        );


        /*
           LOOK AT BAGIAN DADA,
           BUKAN KAKI.
        */

        camera.lookAt(
            0,
            0.55,
            0
        );


        /*
           ROBOT DITURUNKAN
           supaya kepala + dada dominan.
        */

        object.position.set(

            0,

            isMobile
                ? -0.82
                : -0.70,

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
           START SCALE
        */

        object.scale.setScalar(
            scale * 1.22
        );


        loadingScale =
            1.22;


        /*
           HALF BODY CLIPPING

           Ambil bounding box setelah scale.
        */

        const halfBodyPlane =
            new THREE.Plane(
                new THREE.Vector3(
                    0,
                    1,
                    0
                ),
                -0.48
            );


        renderer.clippingPlanes = [
            halfBodyPlane
        ];

    }


    /* =====================================================
       ROBOT FACE
    ===================================================== */

    function createRobotFace() {

        if (!head) return;


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
                0.98,
                0.58,
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
                    0.04,

                emissive:
                    0x06150b,

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
           GREEN BORDER
        */

        const borderGeometry =
            new THREE.BoxGeometry(
                1.02,
                0.62,
                0.025
            );


        const borderMaterial =
            new THREE.MeshBasicMaterial({

                color:
                    0x39ff73,

                transparent:
                    true,

                opacity:
                    0.20

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
                0.10,
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
            -0.21,
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
            0.21,
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
           EYE GLOW
        */

        const glowGeometry =
            new THREE.SphereGeometry(
                0.16,
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
                0.023,
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
                i * 0.068,
                -0.14,
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
                1.3,
                2.8,
                2
            );


        faceLight.position.set(
            0,
            0,
            0.65
        );


        robotFace.add(
            faceLight
        );

    }


    /* =====================================================
       ROBOT SPEECH START
    ===================================================== */

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


        armRaised =
            true;


        robotSpeech.classList.add(
            "active"
        );


        playSpeechMessage();

    }


    /* =====================================================
       ROBOT SPEECH ENGINE
    ===================================================== */

    function playSpeechMessage() {

        if (
            !robotSpeech ||
            !speechText
        ) {

            return;

        }


        if (
            speechMessageIndex >=
            speechMessages.length
        ) {

            armRaised =
                false;

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


        armRaised =
            true;


        clearInterval(
            speechTimer
        );


        clearTimeout(
            speechPauseTimer
        );


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
                           PAUSE ANTAR KALIMAT
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
                                        160
                                    );

                                },
                                650
                            );

                    }

                },
                28
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
                1.22,
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
            progress >= 0.5 &&
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
                    "ROBOT ONLINE";


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
               SPEECH CEPAT
            */

            setTimeout(
                startRobotSpeech,
                250
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
                "ROBOT LOADED:",
                robot
            );


            /*
               MATERIAL
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
                    "FACE CREATED"
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
               BASE SCALE

               Karena frameRobot memberi
               scale 1.22 saat loading.
            */

            robot.userData.baseScale =
                robot.scale.x /
                1.22;


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
           LOADING
        ================================================= */

        updateLoadingAnimation();


        /* =================================================
           POINTER SMOOTHING
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
           ROBOT BODY
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
                    time * 0.65
                ) *
                THREE.MathUtils.degToRad(
                    0.6
                );

        }


        /* =================================================
           HEAD MOVEMENT
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
                    2
                );


            targetHead.x +=
                Math.sin(
                    time * 0.85
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
           RIGHT ARM
        ================================================= */

        if (
            rightArm &&
            originalRightArmRotation
        ) {

            /*
               TANGAN NAIK
            */

            const targetArmX =
                armRaised
                    ? THREE.MathUtils.degToRad(
                        -52
                    )
                    : 0;


            const targetArmZ =
                armRaised
                    ? THREE.MathUtils.degToRad(
                        -32
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
                        -20
                    )
                    : 0;


            const targetHandX =
                armRaised
                    ? THREE.MathUtils.degToRad(
                        -10
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

            const talking =
                armRaised;


            const eyePulse =
                talking
                    ? 8 +
                        Math.sin(
                            time * 5
                        ) *
                        1.8

                    : 4 +
                        Math.sin(
                            time * 2
                        ) *
                        0.5;


            faceEyes.forEach(eye => {

                if (
                    eye.material &&
                    "emissiveIntensity"
                    in eye.material
                ) {

                    eye.material.emissiveIntensity =
                        eyePulse;

                }

            });


            const glowPulse =
                talking

                    ? 0.18 +
                        Math.sin(
                            time * 5
                        ) *
                        0.08

                    : 0.09 +
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
                    Math.random() * 4;


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
           GREEN LIGHT PULSE
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
                window.devicePixelRatio,
                2
            )
        );


        positionSpeechBubble();

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
