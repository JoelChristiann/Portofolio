/* =====================================================
   THREE.JS
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

                    element.textContent = "";

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

                    observer.unobserve(element);

                });

            },

            {
                threshold: 0.2
            }

        );

    typingElements.forEach(element => {

        typingObserver.observe(element);

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

        if (!currentItem) {
            return;
        }

        document
            .querySelectorAll(".faq-item")
            .forEach(item => {

                if (item !== currentItem) {

                    item.classList.remove(
                        "active"
                    );

                }

            });

        currentItem.classList.toggle(
            "active"
        );

    });

});


/* =====================================================
   PROJECT DATA
===================================================== */

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
   ROBOT
===================================================== */

const robotContainer =
    document.getElementById(
        "robot-container"
    );

const robotStatus =
    document.getElementById(
        "robot-status"
    );


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

            30,

            containerWidth /
            containerHeight,

            0.01,

            100

        );


    camera.position.set(
        0,
        0.15,
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
        1.55;


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
            0x303833,
            3.0
        );

    scene.add(
        ambientLight
    );


    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            4.5
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
            4.2,
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
            0xffffff,
            3.5,
            14,
            2
        );

    leftLight.position.set(
        -5,
        3,
        4
    );

    scene.add(
        leftLight
    );


    const rightLight =
        new THREE.PointLight(
            0xd9ffe6,
            2.4,
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
            2.7,
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
            1.2,
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
       RIGHT ARM VARIABLES
    ================================================== */

    let rightArm = null;

    let rightHand = null;

    let originalRightArmRotation = null;

    let originalRightHandRotation = null;

    let speaking = false;

    let speechTimer = 0;

    let speechIndex = 0;


    /* =================================================
       ROBOT BASE
    ================================================== */

    let baseRobotY = 0;

    let baseRobotZ = 0;

    let baseRobotRotationY = 0;

    let baseRobotRotationZ = 0;


    /* =================================================
       LOADING ZOOM
    ================================================= */

    let loadingZoom = true;

    let loadingProgress = 0;

    let loadingZoomStart = 0;

    const loadingZoomDuration = 1.8;

    const loadingStartScale = 1.75;

    const loadingEndScale = 1;


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
    ================================================= */

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
       TIME
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
       SPEECH TEXT
    ================================================== */

    const speechMessages = [

        {
            title: "HELLO 👋",
            text: "WELCOME TO MY WEBSITE",
            duration: 4.5
        },

        {
            title: "I'M JOEL'S AI ASSISTANT",
            text: "NICE TO MEET YOU",
            duration: 4.5
        },

        {
            title: "LET'S EXPLORE MY WORK",
            text: "TOGETHER →",
            duration: 4.5
        }

    ];


    /* =================================================
       CREATE SPEECH BUBBLE
    ================================================== */

    const speechBubble =
        document.createElement("div");

    speechBubble.className =
        "robot-speech-bubble";


    speechBubble.innerHTML = `

        <div class="speech-line"></div>

        <div class="speech-title">
            HELLO 👋
        </div>

        <div class="speech-text">
            WELCOME TO MY WEBSITE
        </div>

        <div class="speech-cursor"></div>

    `;


    robotContainer.appendChild(
        speechBubble
    );


    const speechTitle =
        speechBubble.querySelector(
            ".speech-title"
        );


    const speechText =
        speechBubble.querySelector(
            ".speech-text"
        );


    /* =================================================
       SPEECH POSITION
    ================================================== */

    function positionSpeechBubble() {

        if (!robot) {
            return;
        }


        const worldPosition =
            new THREE.Vector3(
                1.15,
                0.8,
                0
            );


        robot.localToWorld(
            worldPosition
        );


        const projected =
            worldPosition.clone()
                .project(camera);


        const x =
            (
                projected.x *
                0.5 +
                0.5
            ) *
            robotContainer.clientWidth;


        const y =
            (
                -projected.y *
                0.5 +
                0.5
            ) *
            robotContainer.clientHeight;


        speechBubble.style.left =
            `${x}px`;

        speechBubble.style.top =
            `${y}px`;

    }


    /* =================================================
       SPEECH
    ================================================== */

    function startSpeaking() {

        if (
            speechMessages.length === 0
        ) {
            return;
        }


        const message =
            speechMessages[
                speechIndex
            ];


        speechTitle.textContent =
            message.title;


        speechText.textContent =
            message.text;


        speechBubble.classList.remove(
            "show"
        );


        requestAnimationFrame(() => {

            speechBubble.classList.add(
                "show"
            );

        });


        speaking = true;

        speechTimer =
            message.duration;


        speechIndex++;

        if (
            speechIndex >=
            speechMessages.length
        ) {

            speechIndex = 0;

        }

    }


    /* =================================================
       FIND OBJECT
    ================================================== */

    function findObjectByNames(
        root,
        names
    ) {

        let found = null;


        const normalizedNames =
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


                if (
                    normalizedNames.includes(
                        objectName
                    )
                ) {

                    found = object;

                }

            }
        );


        return found;

    }


    /* =================================================
       FIND HEAD
    ================================================== */

    function findHead(root) {

        return findObjectByNames(
            root,
            [
                "head",
                "Head",
                "HEAD",
                "head 2",
                "Head 2",
                "face",
                "Face"
            ]
        );

    }


    /* =================================================
       FIND RIGHT ARM
    ================================================== */

    function findRightArm(root) {

        return findObjectByNames(
            root,
            [

                "RightArm",
                "right_arm",
                "right arm",
                "Arm_R",
                "arm_r",
                "armR",
                "upperarm_r",
                "UpperArm_R",
                "RightUpperArm",
                "rightupperarm",
                "RightShoulder",
                "rightshoulder",
                "shoulder_r"

            ]
        );

    }


    /* =================================================
       FIND RIGHT HAND
    ================================================== */

    function findRightHand(root) {

        return findObjectByNames(
            root,
            [

                "RightHand",
                "right_hand",
                "right hand",
                "Hand_R",
                "hand_r",
                "handR",
                "righthand",
                "wrist_r",
                "Wrist_R"

            ]
        );

    }


    /* =================================================
       MATERIAL
    ================================================== */

    function styleRobotMaterials(root) {

        root.traverse(object => {

            if (!object.isMesh) {
                return;
            }


            const materials =
                Array.isArray(
                    object.material
                )
                    ? object.material
                    : [object.material];


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


                    /* GREEN */

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
                                "#65ff91"
                            );

                        }


                        if (
                            "emissive"
                            in material
                        ) {

                            material.emissive.set(
                                "#42ff7a"
                            );

                            material.emissiveIntensity =
                                1.4;

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
                                0.2;

                        }


                        return;

                    }


                    /* SILVER */

                    if (
                        name.includes("silver") ||
                        name.includes("chrome") ||
                        name.includes("white")
                    ) {

                        if (
                            material.color
                        ) {

                            material.color.set(
                                "#d4ddd8"
                            );

                        }


                        if (
                            "metalness"
                            in material
                        ) {

                            material.metalness =
                                0.7;

                        }


                        if (
                            "roughness"
                            in material
                        ) {

                            material.roughness =
                                0.22;

                        }


                        return;

                    }


                    /* MAIN ROBOT */

                    if (
                        material.color
                    ) {

                        material.color.set(
                            "#3a413e"
                        );

                    }


                    if (
                        "metalness"
                        in material
                    ) {

                        material.metalness =
                            0.62;

                    }


                    if (
                        "roughness"
                        in material
                    ) {

                        material.roughness =
                            0.28;

                    }


                    if (
                        "envMapIntensity"
                        in material
                    ) {

                        material.envMapIntensity =
                            1.4;

                    }

                }
            );

        });

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


        const desiredSize =
            5.2;


        const scale =
            desiredSize /
            maxDimension;


        object.scale.setScalar(
            scale
        );


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
            0.2,
            distance * 0.86
        );


        camera.lookAt(
            0,
            0.15,
            0
        );


        object.position.set(
            0,
            -0.95,
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
           Start large
        */

        object.scale.setScalar(
            scale *
            loadingStartScale
        );


        loadingZoomStart =
            performance.now();


        loadingZoom =
            true;

    }


    /* =================================================
       FACE
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


        /* PANEL */

        const panelGeometry =
            new THREE.BoxGeometry(
                0.72,
                0.42,
                0.035
            );


        const panelMaterial =
            new THREE.MeshPhysicalMaterial({

                color:
                    0x151b19,

                metalness:
                    0.65,

                roughness:
                    0.20,

                clearcoat:
                    1,

                clearcoatRoughness:
                    0.08

            });


        const panel =
            new THREE.Mesh(
                panelGeometry,
                panelMaterial
            );


        panel.position.set(
            0,
            -0.02,
            0.43
        );


        robotFace.add(
            panel
        );


        /* EYES */

        const eyeGeometry =
            new THREE.SphereGeometry(
                0.075,
                20,
                20
            );


        const eyeMaterial =
            new THREE.MeshStandardMaterial({

                color:
                    0x65ff91,

                emissive:
                    0x42ff7a,

                emissiveIntensity:
                    3.2,

                roughness:
                    0.1

            });


        const leftEye =
            new THREE.Mesh(
                eyeGeometry,
                eyeMaterial.clone()
            );


        leftEye.position.set(
            -0.16,
            0.07,
            0.455
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
            0.16,
            0.07,
            0.455
        );


        robotFace.add(
            rightEye
        );


        faceEyes.push(
            rightEye
        );


        /* GLOW */

        const glowGeometry =
            new THREE.SphereGeometry(
                0.11,
                16,
                16
            );


        const glowMaterial =
            new THREE.MeshBasicMaterial({

                color:
                    0x42ff7a,

                transparent:
                    true,

                opacity:
                    0.08,

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


        /* MOUTH */

        const mouthGeometry =
            new THREE.BoxGeometry(
                0.27,
                0.018,
                0.018
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
            -0.10,
            0.455
        );


        robotFace.add(
            faceMouth
        );


        /* MOUTH DOTS */

        const dotGeometry =
            new THREE.SphereGeometry(
                0.018,
                10,
                10
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
                i * 0.055,
                -0.10,
                0.465
            );


            robotFace.add(
                dot
            );


            faceMouthDots.push(
                dot
            );

        }


        /* FACE LIGHT */

        faceLight =
            new THREE.PointLight(
                0x42ff7a,
                0.7,
                2,
                2
            );


        faceLight.position.set(
            0,
            0,
            0.5
        );


        robotFace.add(
            faceLight
        );

    }


    /* =================================================
       ARM POSE
    ================================================== */

    function updateSpeakingPose() {

        if (
            !rightArm &&
            !rightHand
        ) {
            return;
        }


        /*
           Smooth animation
        */

        const target =
            speaking
                ? 1
                : 0;


        const wave =
            speaking
                ? Math.sin(
                    time * 4
                ) * 0.08
                : 0;


        if (rightArm) {

            if (
                !originalRightArmRotation
            ) {

                originalRightArmRotation =
                    rightArm.rotation.clone();

            }


            const targetX =
                originalRightArmRotation.x -
                THREE.MathUtils.degToRad(
                    25
                ) *
                target;


            const targetZ =
                originalRightArmRotation.z +
                THREE.MathUtils.degToRad(
                    55
                ) *
                target;


            rightArm.rotation.x =
                THREE.MathUtils.lerp(
                    rightArm.rotation.x,
                    targetX + wave,
                    0.08
                );


            rightArm.rotation.z =
                THREE.MathUtils.lerp(
                    rightArm.rotation.z,
                    targetZ,
                    0.08
                );

        }


        if (rightHand) {

            if (
                !originalRightHandRotation
            ) {

                originalRightHandRotation =
                    rightHand.rotation.clone();

            }


            const targetY =
                originalRightHandRotation.y +
                THREE.MathUtils.degToRad(
                    15
                ) *
                target;


            rightHand.rotation.y =
                THREE.MathUtils.lerp(
                    rightHand.rotation.y,
                    targetY,
                    0.08
                );

        }

    }


    /* =================================================
       SPEAKING GLOW
    ================================================== */

    function updateSpeakingGlow() {

        const pulse =
            Math.sin(
                time * 7
            ) * 0.5 + 0.5;


        if (
            faceEyes.length > 0
        ) {

            faceEyes.forEach(
                eye => {

                    if (
                        eye.material &&
                        "emissiveIntensity"
                        in eye.material
                    ) {

                        const target =
                            speaking
                                ? 7 +
                                  pulse * 3
                                : 3 +
                                  Math.sin(
                                      time * 1.4
                                  ) *
                                  0.45;


                        eye.material.emissiveIntensity =
                            THREE.MathUtils.lerp(
                                eye.material.emissiveIntensity,
                                target,
                                0.12
                            );

                    }

                }
            );

        }


        if (
            faceEyeGlows.length > 0
        ) {

            faceEyeGlows.forEach(
                glow => {

                    const target =
                        speaking
                            ? 0.18 +
                              pulse * 0.08
                            : 0.06 +
                              Math.sin(
                                  time * 1.3
                              ) *
                              0.025;


                    glow.material.opacity =
                        THREE.MathUtils.lerp(
                            glow.material.opacity,
                            target,
                            0.12
                        );

                }
            );

        }


        if (faceMouth) {

            faceMouth.material.color.set(
                speaking
                    ? 0x8affad
                    : 0x52ff82
            );


            faceMouth.material.opacity =
                speaking
                    ? 1
                    : 0.85;

        }


        faceMouthDots.forEach(
            dot => {

                dot.material.color.set(
                    speaking
                        ? 0x8affad
                        : 0x52ff82
                );

            }
        );


        if (faceLight) {

            const target =
                speaking
                    ? 2.2 +
                      pulse * 0.8
                    : 0.65 +
                      Math.sin(
                          time * 1.4
                      ) *
                      0.12;


            faceLight.intensity =
                THREE.MathUtils.lerp(
                    faceLight.intensity,
                    target,
                    0.1
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

            }


            /*
               Find right arm
            */

            rightArm =
                findRightArm(
                    robot
                );


            rightHand =
                findRightHand(
                    robot
                );


            if (rightArm) {

                originalRightArmRotation =
                    rightArm.rotation.clone();

                console.log(
                    "Right arm ditemukan:",
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
                    "Right hand ditemukan:",
                    rightHand.name
                );

            }


            frameRobot(
                robot
            );


            if (robotStatus) {

                robotStatus.textContent =
                    "READY — MOVE CURSOR";


                setTimeout(() => {

                    robotStatus.classList.add(
                        "hidden"
                    );

                }, 1000);

            }


            /*
               Start speech after loading zoom
            */

            setTimeout(
                () => {

                    startSpeaking();

                },
                2100
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


                loadingProgress =
                    percent;


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


    /* =================================================
       ANIMATION
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


        /* =============================================
           CURSOR SMOOTHING
        ============================================== */

        const cursorSmooth =
            1 -
            Math.exp(
                -2.8 * delta
            );


        smoothPointer.lerp(
            pointer,
            cursorSmooth
        );


        /* =============================================
           LOADING ZOOM
        ============================================== */

        if (
            robot &&
            loadingZoom
        ) {

            const elapsed =
                (
                    performance.now() -
                    loadingZoomStart
                ) /
                1000;


            let progress =
                Math.min(
                    elapsed /
                    loadingZoomDuration,
                    1
                );


            /*
               Ease Out
            */

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const scaleValue =
                THREE.MathUtils.lerp(
                    loadingStartScale,
                    loadingEndScale,
                    eased
                );


            /*
               Keep original robot scale
            */

            const currentBaseScale =
                robot.userData.baseScale ||
                1;


            robot.scale.setScalar(
                currentBaseScale *
                scaleValue
            );


            /*
               Slight rotation while zooming
            */

            robot.rotation.y =
                baseRobotRotationY +
                THREE.MathUtils.degToRad(
                    8 *
                    (1 - eased)
                );


            if (
                progress >= 1
            ) {

                loadingZoom =
                    false;


                robot.scale.setScalar(
                    currentBaseScale
                );


                robot.rotation.y =
                    baseRobotRotationY;

            }

        }


        /* =============================================
           BODY
        ============================================== */

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
                breathe * 0.025;


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


            /*
               Jangan override zoom rotation
               ketika masih loading
            */

            if (!loadingZoom) {

                robot.rotation.y =
                    baseRobotRotationY +
                    cursorBodyRotation +
                    sway *
                    THREE.MathUtils.degToRad(
                        1.0
                    );

            }


            robot.rotation.z =
                baseRobotRotationZ +
                Math.sin(
                    time * 0.65
                ) *
                THREE.MathUtils.degToRad(
                    0.6
                );

        }


        /* =============================================
           HEAD
        ============================================== */

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
                    -3.8 * delta
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


        /* =============================================
           EYES
        ============================================== */

        if (
            faceEyes.length > 0
        ) {

            const eyePulse =
                speaking
                    ? 7 +
                      Math.sin(
                          time * 7
                      ) *
                      2
                    : 3 +
                      Math.sin(
                          time * 1.4
                      ) *
                      0.45;


            faceEyes.forEach(
                eye => {

                    if (
                        eye.material &&
                        "emissiveIntensity"
                        in eye.material
                    ) {

                        eye.material
                            .emissiveIntensity =
                            THREE.MathUtils.lerp(
                                eye.material
                                    .emissiveIntensity,
                                eyePulse,
                                0.12
                            );

                    }

                }
            );

        }


        /* =============================================
           BLINK
        ============================================== */

        blinkTimer +=
            delta;


        if (
            !blinking &&
            !speaking &&
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
                    Math.random() * 5;


                faceEyes.forEach(
                    eye => {

                        eye.scale.y =
                            1;

                    }
                );

            }

        }


        /* =============================================
           MOUTH
        ============================================== */

        if (faceMouth) {

            faceMouth.scale.x =
                speaking
                    ? 0.85 +
                      Math.sin(
                          time * 8
                      ) *
                      0.22
                    : 0.9 +
                      Math.sin(
                          time * 1.4
                      ) *
                      0.07;

        }


        faceMouthDots.forEach(
            dot => {

                dot.scale.setScalar(

                    speaking
                        ? 0.9 +
                          Math.sin(
                              time * 8
                          ) *
                          0.18
                        : 0.9 +
                          Math.sin(
                              time * 1.4
                          ) *
                          0.07

                );

            }
        );


        /* =============================================
           SPEAKING
        ============================================== */

        if (speaking) {

            speechTimer -=
                delta;


            if (
                speechTimer <= 0
            ) {

                speaking =
                    false;


                speechBubble.classList.remove(
                    "show"
                );


                /*
                   Wait before next sentence
                */

                setTimeout(
                    () => {

                        startSpeaking();

                    },
                    1000
                );

            }

        }


        /* =============================================
           SPEAKING POSE
        ============================================== */

        updateSpeakingPose();


        /* =============================================
           SPEAKING GLOW
        ============================================== */

        updateSpeakingGlow();


        /* =============================================
           FACE LIGHT
        ============================================== */

        if (faceLight) {

            const targetIntensity =
                speaking
                    ? 2.3
                    : 0.65 +
                      Math.sin(
                          time * 1.4
                      ) *
                      0.12;


            faceLight.intensity =
                THREE.MathUtils.lerp(
                    faceLight.intensity,
                    targetIntensity,
                    0.1
                );

        }


        /* =============================================
           LIGHT MOVEMENT
        ============================================== */

        const lightPulse =
            Math.sin(
                time * 0.8
            );


        greenRim.intensity =
            2.6 +
            lightPulse * 0.5;


        greenBack.intensity =
            1.15 +
            lightPulse * 0.2;


        frontLight.intensity =
            4.1 +
            lightPulse * 0.2;


        leftLight.intensity =
            3.4 +
            lightPulse * 0.15;


        /* =============================================
           SPEECH POSITION
        ============================================== */

        if (
            robot &&
            speechBubble.classList.contains(
                "show"
            )
        ) {

            positionSpeechBubble();

        }


        /* =============================================
           RENDER
        ============================================== */

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
