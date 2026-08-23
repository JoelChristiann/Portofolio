/* ============================================================
   JOEL CHRISTIAN — MAIN JAVASCRIPT
   ROBOT STATIC CAMERA + HEAD/SHOULDER LOOK AT
   MOUSE + TOUCH MOBILE
   ============================================================ */

import * as THREE from "three";

import {
    GLTFLoader
} from "three/addons/loaders/GLTFLoader.js";


/* ============================================================
   CONFIG
   ============================================================ */

const MODEL_URL = "./robot.glb";

/*
   Orientasi dasar robot.

   Jika robot menghadap belakang:
   Math.PI

   Pilihan:
   0
   Math.PI
   Math.PI / 2
   -Math.PI / 2
*/
const MODEL_ROTATION_Y = 0;


/* ============================================================
   DOM
   ============================================================ */

const robotContainer =
    document.getElementById("robot-container");

const robotLoading =
    document.getElementById("robot-loading");

const robotStatus =
    document.getElementById("robot-status");

const robotSpeech =
    document.getElementById("robotSpeech");

const speechText =
    document.getElementById("speechText");

const menuToggle =
    document.getElementById("menuToggle");

const mobileNav =
    document.getElementById("mobileNav");

const year =
    document.getElementById("year");


/* ============================================================
   YEAR
   ============================================================ */

if (year) {
    year.textContent =
        new Date().getFullYear();
}


/* ============================================================
   MOBILE MENU
   ============================================================ */

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


/* ============================================================
   THREE.JS VARIABLES
   ============================================================ */

let scene;
let camera;
let renderer;
let robot;
let clock;


/* ============================================================
   ROBOT PARTS
   ============================================================ */

let head = null;
let shoulderLeft = null;
let shoulderRight = null;


/* ============================================================
   ORIGINAL ROTATIONS
   ============================================================ */

let headOriginalRotation = null;
let shoulderLeftOriginalRotation = null;
let shoulderRightOriginalRotation = null;


/* ============================================================
   POINTER
   ============================================================ */

/*
   mouseTarget:
   posisi cursor / jari yang dituju robot.

   mouseCurrent:
   posisi aktual yang digunakan animasi.
*/

const mouseTarget =
    new THREE.Vector2(0, 0);

const mouseCurrent =
    new THREE.Vector2(0, 0);


/* ============================================================
   POINTER ACTIVE STATE
   ============================================================ */

let pointerInsideRobot = false;


/* ============================================================
   UPDATE POINTER POSITION
   ============================================================ */

function updatePointerPosition(
    clientX,
    clientY
) {

    mouseTarget.x =
        (clientX /
            window.innerWidth) * 2 - 1;

    mouseTarget.y =
        -(clientY /
            window.innerHeight) * 2 + 1;

}


/* ============================================================
   DESKTOP + MOBILE POINTER
   ============================================================ */

/*
   pointermove bekerja untuk:

   - Mouse
   - Touch
   - Stylus

   Jadi tidak perlu lagi mousemove khusus.
*/

window.addEventListener(
    "pointermove",
    event => {

        updatePointerPosition(
            event.clientX,
            event.clientY
        );

    },
    {
        passive: true
    }
);


/* ============================================================
   POINTER DOWN
   ============================================================ */

/*
   Saat jari pertama kali menyentuh layar,
   robot langsung melihat titik sentuhan.
*/

window.addEventListener(
    "pointerdown",
    event => {

        updatePointerPosition(
            event.clientX,
            event.clientY
        );

    },
    {
        passive: true
    }
);


/* ============================================================
   POINTER ENTER ROBOT AREA
   ============================================================ */

if (robotContainer) {

    robotContainer.addEventListener(
        "pointerenter",
        () => {

            pointerInsideRobot = true;

        },
        {
            passive: true
        }
    );


    robotContainer.addEventListener(
        "pointerleave",
        () => {

            pointerInsideRobot = false;

        },
        {
            passive: true
        }
    );

}


/* ============================================================
   INITIALIZE ROBOT
   ============================================================ */

function initRobot() {

    if (!robotContainer) {
        return;
    }


    /* ========================================================
       SCENE
       ======================================================== */

    scene =
        new THREE.Scene();

    clock =
        new THREE.Clock();


    /* ========================================================
       CAMERA
       ======================================================== */

    camera =
        new THREE.PerspectiveCamera(
            35,
            robotContainer.clientWidth /
            robotContainer.clientHeight,
            0.1,
            100
        );


    /*
       CAMERA DIKUNCI.

       Tidak menggunakan OrbitControls.
       Tidak bisa drag.
       Tidak bisa rotate.
       Tidak bisa zoom.
    */

    camera.position.set(
        0,
        1.1,
        5.8
    );


    camera.lookAt(
        0,
        1.25,
        0
    );


    /* ========================================================
       RENDERER
       ======================================================== */

    renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        robotContainer.clientWidth,
        robotContainer.clientHeight
    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    renderer.shadowMap.enabled =
        true;


    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;


    /*
       Tidak menggunakan OrbitControls.

       touchAction auto membuat halaman tetap
       bisa menerima gesture touch normal.
    */

    renderer.domElement.style.cursor =
        "default";

    renderer.domElement.style.touchAction =
        "auto";


    robotContainer.appendChild(
        renderer.domElement
    );


    /* ========================================================
       LIGHTING
       ======================================================== */

    const ambient =
        new THREE.HemisphereLight(
            0xffffff,
            0xd8d8d8,
            2.2
        );

    scene.add(
        ambient
    );


    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            3.2
        );

    keyLight.position.set(
        3,
        5,
        5
    );

    keyLight.castShadow =
        true;

    scene.add(
        keyLight
    );


    const fillLight =
        new THREE.DirectionalLight(
            0xdfeeff,
            1.8
        );

    fillLight.position.set(
        -4,
        2,
        3
    );

    scene.add(
        fillLight
    );


    const rimLight =
        new THREE.DirectionalLight(
            0xe8eeee,
            2.2
        );

    rimLight.position.set(
        0,
        4,
        -5
    );

    scene.add(
        rimLight
    );


    /* ========================================================
       GLTF LOADER
       ======================================================== */

    const loader =
        new GLTFLoader();


    loader.load(

        MODEL_URL,


        /* ====================================================
           SUCCESS
           ==================================================== */

        function (gltf) {

            robot =
                gltf.scene;


            /* =================================================
               ROBOT MATERIAL
               ================================================= */

            robot.traverse(
                object => {

                    if (!object.isMesh) {
                        return;
                    }


                    object.castShadow =
                        true;

                    object.receiveShadow =
                        true;


                    if (object.material) {

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

                                if (
                                    material.isMeshStandardMaterial ||
                                    material.isMeshPhysicalMaterial
                                ) {

                                    /*
                                       Material asli GLB
                                       tetap dipertahankan.
                                    */

                                    material.roughness =
                                        0.30;

                                    material.metalness =
                                        0.12;

                                    material.needsUpdate =
                                        true;

                                }

                            }
                        );

                    }

                }
            );


            /* =================================================
               SCALE
               ================================================= */

            robot.scale.set(
                1.35,
                1.35,
                1.35
            );


            /* =================================================
               POSITION
               ================================================= */

            robot.position.set(
                0,
                -1.15,
                0
            );


            /* =================================================
               BASE ORIENTATION
               ================================================= */

            robot.rotation.set(
                0,
                MODEL_ROTATION_Y,
                0
            );


            /* =================================================
               FIND ROBOT PARTS
               ================================================= */

            robot.traverse(
                object => {

                    const name =
                        object.name
                            .toLowerCase()
                            .replace(
                                /[\s_-]/g,
                                ""
                            );


                    /* -----------------------------------------
                       HEAD
                       ----------------------------------------- */

                    if (
                        !head &&
                        (
                            name.includes(
                                "head"
                            ) ||
                            name.includes(
                                "kepala"
                            ) ||
                            name.includes(
                                "face"
                            )
                        )
                    ) {

                        head =
                            object;

                    }


                    /* -----------------------------------------
                       LEFT SHOULDER
                       ----------------------------------------- */

                    if (
                        !shoulderLeft &&
                        (
                            name.includes(
                                "shoulderleft"
                            ) ||
                            name.includes(
                                "leftshoulder"
                            ) ||
                            name.includes(
                                "shoulderl"
                            )
                        )
                    ) {

                        shoulderLeft =
                            object;

                    }


                    /* -----------------------------------------
                       RIGHT SHOULDER
                       ----------------------------------------- */

                    if (
                        !shoulderRight &&
                        (
                            name.includes(
                                "shoulderright"
                            ) ||
                            name.includes(
                                "rightshoulder"
                            ) ||
                            name.includes(
                                "shoulderr"
                            )
                        )
                    ) {

                        shoulderRight =
                            object;

                    }

                }
            );


            /* =================================================
               SAVE ORIGINAL ROTATION
               ================================================= */

            if (head) {

                headOriginalRotation =
                    head.rotation.clone();

            }


            if (shoulderLeft) {

                shoulderLeftOriginalRotation =
                    shoulderLeft.rotation.clone();

            }


            if (shoulderRight) {

                shoulderRightOriginalRotation =
                    shoulderRight.rotation.clone();

            }


            /* =================================================
               DEBUG
               ================================================= */

            console.log(
                "================================"
            );

            console.log(
                "ROBOT LOADED"
            );

            console.log(
                "Head:",
                head
            );

            console.log(
                "Left shoulder:",
                shoulderLeft
            );

            console.log(
                "Right shoulder:",
                shoulderRight
            );

            console.log(
                "Camera controls: DISABLED"
            );

            console.log(
                "Pointer tracking: ENABLED"
            );

            console.log(
                "Mouse + Touch: ENABLED"
            );

            console.log(
                "================================"
            );


            /* =================================================
               ADD ROBOT
               ================================================= */

            scene.add(
                robot
            );


            /* =================================================
               LOADING COMPLETE
               ================================================= */

            if (robotLoading) {

                robotLoading.classList.add(
                    "hidden"
                );

            }


            if (robotStatus) {

                robotStatus.textContent =
                    "AI SYSTEM ONLINE";

            }


            setTimeout(
                startRobotSpeech,
                1200
            );

        },


        /* ====================================================
           LOADING PROGRESS
           ==================================================== */

        function (xhr) {

            if (
                robotLoading &&
                xhr.total
            ) {

                const percent =
                    Math.round(
                        (
                            xhr.loaded /
                            xhr.total
                        ) * 100
                    );


                robotLoading.textContent =
                    `LOADING AI... ${percent}%`;

            }

        },


        /* ====================================================
           ERROR
           ==================================================== */

        function (error) {

            console.error(
                "Robot model error:",
                error
            );


            if (robotLoading) {

                robotLoading.textContent =
                    "ROBOT MODEL NOT FOUND";

            }


            if (robotStatus) {

                robotStatus.textContent =
                    "MODEL ERROR";

            }

        }

    );


    /* ========================================================
       START ANIMATION
       ======================================================== */

    animate();

}


/* ============================================================
   ROBOT LOOK AT CURSOR / TOUCH
   ============================================================ */

function updateRobotLookAt() {

    if (!robot) {
        return;
    }


    /* ========================================================
       SMOOTH POINTER
       ======================================================== */

    mouseCurrent.x +=
        (
            mouseTarget.x -
            mouseCurrent.x
        ) * 0.12;


    mouseCurrent.y +=
        (
            mouseTarget.y -
            mouseCurrent.y
        ) * 0.12;


    /* ========================================================
       HEAD
       ======================================================== */

    if (
        head &&
        headOriginalRotation
    ) {

        /*
           YAW = kiri / kanan

           Pitch = atas / bawah
        */

        const yaw =
            THREE.MathUtils.clamp(
                mouseCurrent.x * 0.55,
                -0.55,
                0.55
            );


        const pitch =
            THREE.MathUtils.clamp(
                mouseCurrent.y * 0.30,
                -0.30,
                0.30
            );


        head.rotation.x =
            headOriginalRotation.x -
            pitch;


        head.rotation.y =
            headOriginalRotation.y +
            yaw;


        head.rotation.z =
            headOriginalRotation.z;

    }


    /* ========================================================
       LEFT SHOULDER
       ======================================================== */

    if (
        shoulderLeft &&
        shoulderLeftOriginalRotation
    ) {

        const shoulderYaw =
            mouseCurrent.x * 0.06;


        const shoulderPitch =
            mouseCurrent.y * 0.035;


        shoulderLeft.rotation.y =
            shoulderLeftOriginalRotation.y +
            shoulderYaw;


        shoulderLeft.rotation.x =
            shoulderLeftOriginalRotation.x -
            shoulderPitch;


        shoulderLeft.rotation.z =
            shoulderLeftOriginalRotation.z;

    }


    /* ========================================================
       RIGHT SHOULDER
       ======================================================== */

    if (
        shoulderRight &&
        shoulderRightOriginalRotation
    ) {

        const shoulderYaw =
            mouseCurrent.x * 0.06;


        const shoulderPitch =
            mouseCurrent.y * 0.035;


        shoulderRight.rotation.y =
            shoulderRightOriginalRotation.y +
            shoulderYaw;


        shoulderRight.rotation.x =
            shoulderRightOriginalRotation.x -
            shoulderPitch;


        shoulderRight.rotation.z =
            shoulderRightOriginalRotation.z;

    }

}


/* ============================================================
   ANIMATION
   ============================================================ */

function animate() {

    requestAnimationFrame(
        animate
    );


    const elapsed =
        clock.getElapsedTime();


    /* ========================================================
       FLOATING
       ======================================================== */

    if (robot) {

        robot.position.y =
            -1.15 +
            Math.sin(
                elapsed * 1.2
            ) * 0.025;

    }


    /* ========================================================
       LOOK AT POINTER
       ======================================================== */

    updateRobotLookAt();


    /* ========================================================
       RENDER
       ======================================================== */

    if (
        renderer &&
        scene &&
        camera
    ) {

        renderer.render(
            scene,
            camera
        );

    }

}


/* ============================================================
   RESIZE
   ============================================================ */

function resizeRobot() {

    if (
        !robotContainer ||
        !camera ||
        !renderer
    ) {
        return;
    }


    const width =
        robotContainer.clientWidth;


    const height =
        robotContainer.clientHeight;


    if (
        width === 0 ||
        height === 0
    ) {
        return;
    }


    camera.aspect =
        width / height;


    camera.updateProjectionMatrix();


    renderer.setSize(
        width,
        height
    );

}


window.addEventListener(
    "resize",
    resizeRobot
);


/* ============================================================
   ROBOT SPEECH
   ============================================================ */

const robotMessages = [

    "Hello. I'm Joel's AI assistant.",

    "Joel is currently exploring Artificial Intelligence.",

    "Computer Vision and Deep Learning are among his main interests.",

    "He also builds web applications and data-driven systems.",

    "Technology is useful when it solves real problems."

];


let speechIndex =
    0;


let typingTimer;


function typeSpeech(message) {

    if (
        !speechText ||
        !robotSpeech
    ) {
        return;
    }


    clearInterval(
        typingTimer
    );


    speechText.textContent =
        "";


    let index =
        0;


    robotSpeech.classList.add(
        "active"
    );


    typingTimer =
        setInterval(
            () => {

                if (
                    index >=
                    message.length
                ) {

                    clearInterval(
                        typingTimer
                    );

                    return;

                }


                speechText.textContent +=
                    message[index];


                index++;

            },
            35
        );

}


function startRobotSpeech() {

    if (!robotSpeech) {
        return;
    }


    typeSpeech(
        robotMessages[
            speechIndex
        ]
    );


    setInterval(
        () => {

            speechIndex =
                (
                    speechIndex + 1
                ) %
                robotMessages.length;


            typeSpeech(
                robotMessages[
                    speechIndex
                ]
            );

        },
        6500
    );

}


/* ============================================================
   SECTION TYPING TITLES
   ============================================================ */

function setupTypingTitles() {

    const titles =
        document.querySelectorAll(
            ".typing-title"
        );


    titles.forEach(
        title => {

            const text =
                title.dataset.text;


            if (!text) {
                return;
            }


            title.textContent =
                "";


            let started =
                false;


            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting &&
                                    !started
                                ) {

                                    started =
                                        true;


                                    typeTitle(
                                        title,
                                        text
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.35
                    }
                );


            observer.observe(
                title
            );

        }
    );

}


function typeTitle(
    element,
    text
) {

    element.classList.add(
        "typing-active"
    );


    let index =
        0;


    const timer =
        setInterval(
            () => {

                if (
                    index >=
                    text.length
                ) {

                    clearInterval(
                        timer
                    );

                    return;

                }


                element.textContent +=
                    text[index];


                index++;

            },
            45
        );

}


/* ============================================================
   FAQ
   ============================================================ */

function setupFAQ() {

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


                    item.classList.toggle(
                        "active"
                    );

                }
            );

        }
    );

}


/* ============================================================
   PROJECT DATA
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
            "Project ini berfokus pada eksperimen machine learning, deep learning dan intelligent systems untuk memahami bagaimana AI dapat diterapkan pada berbagai permasalahan.",

        technologies: [
            "Python",
            "Machine Learning",
            "Deep Learning",
            "AI"
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
            "Project ini berfokus pada data cleaning, exploratory data analysis, visualisasi dan proses mendapatkan insight dari dataset.",

        technologies: [
            "Python",
            "Pandas",
            "NumPy",
            "SQL"
        ],

        link:
            "#"

    },


    cv: {

        category:
            "COMPUTER VISION",

        title:
            "Vision Systems",

        description:
            "Eksperimen Computer Vision dan Deep Learning untuk memahami objek dan pola visual.",

        details:
            "Project ini mengeksplorasi computer vision untuk object detection, image classification dan pemrosesan citra.",

        technologies: [
            "Python",
            "OpenCV",
            "PyTorch",
            "Deep Learning"
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
            "Website informasi desa yang dibangun menggunakan HTML, CSS dan JavaScript dengan fokus pada struktur informasi, responsivitas dan pengalaman pengguna.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        link:
            "#"

    }

};


/* ============================================================
   PROJECT MODAL
   ============================================================ */

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


function openProject(
    projectKey
) {

    const data =
        projectData[
            projectKey
        ];


    if (
        !data ||
        !projectModal
    ) {
        return;
    }


    modalCategory.textContent =
        data.category;


    modalTitle.textContent =
        data.title;


    modalDescription.textContent =
        data.description;


    modalDetails.textContent =
        data.details;


    modalTags.innerHTML =
        "";


    data.technologies.forEach(
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


    modalProjectLink.href =
        data.link;


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
    .forEach(
        card => {

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
                        event.key ===
                            "Enter" ||
                        event.key ===
                            " "
                    ) {

                        event.preventDefault();


                        openProject(
                            card.dataset.project
                        );

                    }

                }
            );

        }
    );


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
            event.key === "Escape"
        ) {

            closeProject();

        }

    }
);


/* ============================================================
   START
   ============================================================ */

initRobot();

setupTypingTitles();

setupFAQ();
