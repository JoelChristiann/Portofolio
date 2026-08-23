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
    document.querySelectorAll(
        ".typing-title"
    );


if (typingElements.length > 0) {

    const typingObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

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


                    element.textContent =
                        "";


                    element.classList.add(
                        "typing-active"
                    );


                    let index =
                        0;


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


/* =====================================================
   PROJECT MODAL ELEMENTS
===================================================== */

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


/* =====================================================
   OPEN PROJECT
===================================================== */

function openProject(
    projectId
) {

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


        if (
            project.link === "#"
        ) {

            modalProjectLink.style.display =
                "none";

        } else {

            modalProjectLink.style.display =
                "inline-flex";

        }

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


/* =====================================================
   CLOSE PROJECT
===================================================== */

function closeProject() {

    if (
        !projectModal
    ) {

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


/* =====================================================
   PROJECT CARDS
===================================================== */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(
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

    }
);


/* =====================================================
   CLOSE MODAL
===================================================== */

if (
    modalClose
) {

    modalClose.addEventListener(
        "click",
        closeProject
    );

}


if (
    modalOverlay
) {

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


/* =====================================================
   THREE.JS ROBOT
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

    const camera =
        new THREE.PerspectiveCamera(

            30,

            robotContainer.clientWidth /
            robotContainer.clientHeight,

            0.01,

            100

        );


    camera.position.set(
        0,
        1,
        5
    );


    /* =================================================
       RENDERER
    ================================================== */

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

        robotContainer.clientWidth,
        robotContainer.clientHeight

    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    renderer.toneMapping =
        THREE.ACESFilmicToneMapping;


    renderer.toneMappingExposure =
        1.12;


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

            0xeef3ef,
            0x050706,
            1.55

        );


    scene.add(
        ambientLight
    );


    const keyLight =
        new THREE.DirectionalLight(

            0xffffff,
            2.8

        );


    keyLight.position.set(
        4.5,
        6,
        8
    );


    scene.add(
        keyLight
    );


    const whiteLeft =
        new THREE.PointLight(

            0xffffff,
            2.4,
            11,
            2

        );


    whiteLeft.position.set(
        -4,
        2.8,
        4.5
    );


    scene.add(
        whiteLeft
    );


    const greenRim =
        new THREE.PointLight(

            0x38ff72,
            4.2,
            13,
            2

        );


    greenRim.position.set(
        -4,
        2.3,
        3.2
    );


    scene.add(
        greenRim
    );


    const greenBounce =
        new THREE.PointLight(

            0x16c75a,
            1.9,
            9,
            2

        );


    greenBounce.position.set(
        2.3,
        -2.2,
        3.5
    );


    scene.add(
        greenBounce
    );


    const greenBack =
        new THREE.PointLight(

            0x8affad,
            1.35,
            11,
            2

        );


    greenBack.position.set(
        0,
        1.5,
        -4.5
    );


    scene.add(
        greenBack
    );


    const frontLight =
        new THREE.PointLight(

            0xffffff,
            1.6,
            10,
            2

        );


    frontLight.position.set(
        0,
        1.8,
        5.5
    );


    scene.add(
        frontLight
    );


    /* =================================================
       ROBOT STATE
    ================================================== */

    let robot =
        null;

    let head =
        null;

    let originalHeadRotation =
        null;

    let robotFace =
        null;

    let faceEyes =
        [];

    let faceEyeGlows =
        [];

    let faceMouth =
        null;

    let faceMouthDots =
        [];

    let faceLight =
        null;

    let baseRobotY =
        0;

    let baseRobotZ =
        0;


    /* =================================================
       POINTER
    ================================================== */

    const pointer =
        new THREE.Vector2(
            0,
            0
        );


    const targetHead =
        new THREE.Euler(
            0,
            0,
            0
        );


    const currentHead =
        new THREE.Euler(
            0,
            0,
            0
        );


    let idleTime =
        0;


    /* =================================================
       FIND HEAD
    ================================================== */

    function findHead(root) {

        const possibleNames = [

            "Head",
            "head",
            "HEAD",
            "Head 2",
            "head 2",
            "HEAD 2"

        ];


        let result =
            null;


        root.traverse(
            object => {

                if (result) {
                    return;
                }


                const objectName =
                    (
                        object.name ||
                        ""
                    )
                    .trim()
                    .toLowerCase();


                for (
                    const name
                    of possibleNames
                ) {

                    if (
                        objectName ===
                        name.toLowerCase()
                    ) {

                        result =
                            object;

                        return;

                    }

                }

            }
        );


        return result;

    }


    /* =================================================
       ROBOT MATERIAL
       BLACK CARBON / GLOSSY / GREEN DETAILS
    ================================================== */

    function styleRobotMaterials(
        root
    ) {

        root.traverse(
            object => {

                if (
                    !object.isMesh
                ) {

                    return;

                }


                object.castShadow =
                    true;


                object.receiveShadow =
                    true;


                let materials =
                    object.material;


                if (
                    !materials
                ) {

                    return;

                }


                if (
                    !Array.isArray(
                        materials
                    )
                ) {

                    materials =
                        [
                            materials
                        ];

                }


                materials.forEach(
                    material => {

                        if (
                            !material
                        ) {

                            return;

                        }


                        const materialName =
                            (
                                material.name ||
                                ""
                            )
                            .toLowerCase();


                        const objectName =
                            (
                                object.name ||
                                ""
                            )
                            .toLowerCase();


                        const combinedName =
                            materialName +
                            " " +
                            objectName;


                        /* =================================
                           GREEN DETAILS
                        ================================= */

                        const isGreenDetail =

                            combinedName.includes(
                                "green"
                            ) ||

                            combinedName.includes(
                                "led"
                            ) ||

                            combinedName.includes(
                                "glow"
                            ) ||

                            combinedName.includes(
                                "emission"
                            ) ||

                            combinedName.includes(
                                "neon"
                            );


                        if (
                            isGreenDetail
                        ) {

                            if (
                                material.color
                            ) {

                                material.color.set(
                                    "#52ff80"
                                );

                            }


                            if (
                                "emissive"
                                in material
                            ) {

                                material.emissive.set(
                                    "#38ff72"
                                );

                                material.emissiveIntensity =
                                    2.3;

                            }


                            if (
                                "metalness"
                                in material
                            ) {

                                material.metalness =
                                    0.42;

                            }


                            if (
                                "roughness"
                                in material
                            ) {

                                material.roughness =
                                    0.14;

                            }


                            return;

                        }


                        /* =================================
                           LIGHT PANEL
                        ================================= */

                        const isLightMaterial =

                            combinedName.includes(
                                "white"
                            ) ||

                            combinedName.includes(
                                "silver"
                            ) ||

                            combinedName.includes(
                                "chrome"
                            );


                        if (
                            isLightMaterial
                        ) {

                            if (
                                material.color
                            ) {

                                material.color.set(
                                    "#adb7b1"
                                );

                            }


                            if (
                                "metalness"
                                in material
                            ) {

                                material.metalness =
                                    0.92;

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


                        /* =================================
                           BLACK CARBON
                        ================================= */

                        if (
                            material.color
                        ) {

                            material.color.set(
                                "#111514"
                            );

                        }


                        if (
                            "metalness"
                            in material
                        ) {

                            material.metalness =
                                0.82;

                        }


                        if (
                            "roughness"
                            in material
                        ) {

                            material.roughness =
                                0.23;

                        }

                    }
                );

            }
        );

    }


    /* =================================================
       FRAME ROBOT
    ================================================== */

    function frameRobot(
        object
    ) {

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


        object.position.sub(
            center
        );


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
           CAMERA LEBIH DEKAT
        */

        const fovRadians =
            THREE.MathUtils.degToRad(
                camera.fov
            );


        const cameraDistance =
            (
                desiredSize / 2
            ) /
            Math.tan(
                fovRadians / 2
            );


        camera.position.set(

            0,

            desiredSize * 0.04,

            cameraDistance * 0.88

        );


        camera.lookAt(

            0,

            desiredSize * 0.05,

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

    }


    /* =================================================
       CREATE ROBOT FACE
    ================================================== */

    function createRobotFace() {

        if (!head) {

            return;

        }


        /*
           FACE GROUP
        */

        robotFace =
            new THREE.Group();


        robotFace.name =
            "RobotFace";


        /*
           Penting:
           wajah adalah child dari HEAD.
        */

        head.add(
            robotFace
        );


        /* =============================================
           FACE PANEL
        ============================================== */

        const facePanelGeometry =
            new THREE.BoxGeometry(

                0.72,
                0.42,
                0.035

            );


        const facePanelMaterial =
            new THREE.MeshPhysicalMaterial({

                color:
                    0x070909,

                metalness:
                    0.82,

                roughness:
                    0.17,

                clearcoat:
                    1,

                clearcoatRoughness:
                    0.08

            });


        const facePanel =
            new THREE.Mesh(

                facePanelGeometry,

                facePanelMaterial

            );


        /*
           Posisi panel wajah
        */

        facePanel.position.set(

            0,
            -0.02,
            0.43

        );


        robotFace.add(
            facePanel
        );


        /* =============================================
           EYE
        ============================================== */

        const eyeGeometry =
            new THREE.SphereGeometry(

                0.075,
                20,
                20

            );


        const eyeMaterial =
            new THREE.MeshStandardMaterial({

                color:
                    0x38ff72,

                emissive:
                    0x38ff72,

                emissiveIntensity:
                    3.5,

                metalness:
                    0.25,

                roughness:
                    0.12

            });


        /* LEFT EYE */

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


        /* RIGHT EYE */

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


        /* =============================================
           EYE GLOW
        ============================================== */

        const glowGeometry =
            new THREE.SphereGeometry(

                0.11,
                16,
                16

            );


        const glowMaterial =
            new THREE.MeshBasicMaterial({

                color:
                    0x38ff72,

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


        /* =============================================
           MOUTH
        ============================================== */

        const mouthGeometry =
            new THREE.BoxGeometry(

                0.27,
                0.018,
                0.018

            );


        const mouthMaterial =
            new THREE.MeshBasicMaterial({

                color:
                    0x38ff72

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


        /* =============================================
           MOUTH DOTS
        ============================================== */

        const mouthDotGeometry =
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

                    mouthDotGeometry,

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


        /* =============================================
           FACE LIGHT
        ============================================== */

        faceLight =
            new THREE.PointLight(

                0x38ff72,

                0.8,

                1.5,

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
       LOAD ROBOT GLB
    ================================================== */

    const loader =
        new GLTFLoader();


    loader.load(

        "./assets/robot.glb",


        gltf => {

            robot =
                gltf.scene;


            console.log(
                "Robot GLB berhasil dimuat."
            );


            /*
               Material
            */

            styleRobotMaterials(
                robot
            );


            /*
               Scene
            */

            scene.add(
                robot
            );


            /*
               Head
            */

            head =
                findHead(
                    robot
                );


            if (
                head
            ) {

                originalHeadRotation =
                    head.rotation.clone();


                console.log(
                    "Head ditemukan:",
                    head.name
                );


                /*
                   CREATE FACE
                */

                createRobotFace();

            } else {

                console.warn(
                    "Head tidak ditemukan."
                );

            }


            /*
               Frame
            */

            frameRobot(
                robot
            );


            /*
               Loading
            */

            if (
                robotStatus
            ) {

                robotStatus.textContent =
                    head
                        ? "READY — MOVE CURSOR"
                        : "ROBOT READY";


                setTimeout(
                    () => {

                        robotStatus.classList.add(
                            "hidden"
                        );

                    },
                    900
                );

            }

        },


        /* =============================================
           LOADING PROGRESS
        ============================================== */

        progress => {

            if (
                !robotStatus
            ) {

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


        /* =============================================
           ERROR
        ============================================== */

        error => {

            console.error(
                "Robot gagal dimuat:",
                error
            );


            if (
                robotStatus
            ) {

                robotStatus.textContent =
                    "ROBOT FAILED TO LOAD";

            }

        }

    );


    /* =================================================
       MOUSE
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

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const delta =
            Math.min(
                clock.getDelta(),
                0.05
            );


        idleTime +=
            delta;


        /* =============================================
           BODY IDLE
        ============================================== */

        if (
            robot
        ) {

            /*
               Breathing
            */

            robot.position.y =
                baseRobotY +
                Math.sin(
                    idleTime * 1.2
                ) * 0.008;


            /*
               Micro floating
            */

            robot.position.z =
                baseRobotZ +
                Math.sin(
                    idleTime * 0.7
                ) * 0.003;

        }


        /* =============================================
           HEAD LOOK AT CURSOR
        ============================================== */

        if (
            head &&
            originalHeadRotation
        ) {

            const maxY =
                THREE.MathUtils.degToRad(
                    28
                );


            const maxX =
                THREE.MathUtils.degToRad(
                    12
                );


            targetHead.y =
                pointer.x *
                maxY;


            targetHead.x =
                pointer.y *
                maxX;


            /*
               Natural micro motion
            */

            targetHead.x +=

                Math.sin(
                    idleTime * 1.5
                ) *

                THREE.MathUtils.degToRad(
                    0.4
                );


            targetHead.y +=

                Math.sin(
                    idleTime * 1.1
                ) *

                THREE.MathUtils.degToRad(
                    0.4
                );


            /*
               Smooth
            */

            const smoothing =
                1 -
                Math.exp(
                    -8 * delta
                );


            currentHead.x =
                THREE.MathUtils.lerp(

                    currentHead.x,

                    targetHead.x,

                    smoothing

                );


            currentHead.y =
                THREE.MathUtils.lerp(

                    currentHead.y,

                    targetHead.y,

                    smoothing

                );


            /*
               ONLY HEAD
            */

            head.rotation.x =
                originalHeadRotation.x +
                currentHead.x;


            head.rotation.y =
                originalHeadRotation.y +
                currentHead.y;


            head.rotation.z =
                originalHeadRotation.z;

        }


        /* =============================================
           FACE ANIMATION
        ============================================== */

        if (
            faceEyes.length > 0
        ) {

            /*
               Gentle eye pulse
            */

            const eyePulse =
                2.6 +
                Math.sin(
                    idleTime * 2.0
                ) * 0.65;


            faceEyes.forEach(
                eye => {

                    if (
                        !eye.material
                    ) {

                        return;

                    }


                    if (
                        "emissiveIntensity"
                        in eye.material
                    ) {

                        eye.material.emissiveIntensity =
                            eyePulse;

                    }

                }
            );


            /*
               Glow pulse
            */

            const glowPulse =
                0.07 +
                (
                    0.04 *
                    (
                        0.5 +
                        0.5 *
                        Math.sin(
                            idleTime * 1.8
                        )
                    )
                );


            faceEyeGlows.forEach(
                glow => {

                    if (
                        glow.material
                    ) {

                        glow.material.opacity =
                            glowPulse;

                    }

                }
            );

        }


        /* =============================================
           BLINK
        ============================================== */

        if (
            faceEyes.length === 2
        ) {

            const blinkCycle =
                idleTime % 6;


            const shouldBlink =
                blinkCycle > 5.65 &&
                blinkCycle < 5.83;


            faceEyes.forEach(
                eye => {

                    eye.scale.y =
                        shouldBlink
                            ? 0.12
                            : 1;

                }
            );

        }


        /* =============================================
           MOUTH PULSE
        ============================================== */

        if (
            faceMouth
        ) {

            const mouthPulse =
                0.7 +
                0.3 *
                (
                    0.5 +
                    0.5 *
                    Math.sin(
                        idleTime * 2.4
                    )
                );


            faceMouth.scale.x =
                mouthPulse;

        }


        if (
            faceMouthDots.length > 0
        ) {

            const mouthPulse =
                0.7 +
                0.3 *
                (
                    0.5 +
                    0.5 *
                    Math.sin(
                        idleTime * 2.4
                    )
                );


            faceMouthDots.forEach(
                dot => {

                    dot.scale.setScalar(
                        mouthPulse
                    );

                }
            );

        }


        /* =============================================
           FACE LIGHT PULSE
        ============================================== */

        if (
            faceLight
        ) {

            faceLight.intensity =
                0.55 +
                0.3 *
                (
                    0.5 +
                    0.5 *
                    Math.sin(
                        idleTime * 1.8
                    )
                );

        }


        /* =============================================
           GREEN REFLECTION
        ============================================== */

        const pulse =
            0.5 +
            0.5 *
            Math.sin(
                idleTime * 1.5
            );


        greenRim.intensity =
            4.0 +
            pulse * 1.6;


        greenBounce.intensity =
            1.75 +
            pulse * 0.65;


        greenBack.intensity =
            1.15 +
            pulse * 0.35;


        frontLight.intensity =
            1.5 +
            pulse * 0.2;


        whiteLeft.intensity =
            2.2 +
            pulse * 0.25;


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

            const width =
                robotContainer.clientWidth;


            const height =
                robotContainer.clientHeight;


            camera.aspect =
                width /
                height;


            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
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
