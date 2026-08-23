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


    mobileNav
        .querySelectorAll("a")
        .forEach(link => {

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


                    element.textContent =
                        "";


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


                    observer.unobserve(
                        element
                    );

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


/* =====================================================
   OPEN PROJECT
===================================================== */

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


/* =====================================================
   PROJECT CARDS
===================================================== */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(card => {

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


/* =====================================================
   CLOSE MODAL
===================================================== */

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

    const width =
        Math.max(
            robotContainer.clientWidth,
            1
        );


    const height =
        Math.max(
            robotContainer.clientHeight,
            1
        );


    const camera =
        new THREE.PerspectiveCamera(

            30,

            width / height,

            0.01,

            100

        );


    camera.position.set(
        0,
        0.2,
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
            1.75
        )

    );


    renderer.setSize(
        width,
        height
    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    renderer.toneMapping =
        THREE.ACESFilmicToneMapping;


    /*
       Lebih terang
    */

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

    /*
       Ambient lebih terang
    */

    const ambientLight =
        new THREE.HemisphereLight(

            0xffffff,
            0x1a241f,
            2.2

        );


    scene.add(
        ambientLight
    );


    /*
       Main white light
    */

    const keyLight =
        new THREE.DirectionalLight(

            0xffffff,
            3.8

        );


    keyLight.position.set(
        4,
        6,
        8
    );


    scene.add(
        keyLight
    );


    /*
       Front fill
    */

    const frontFill =
        new THREE.PointLight(

            0xffffff,
            3.2,
            14,
            2

        );


    frontFill.position.set(
        0,
        2.5,
        6
    );


    scene.add(
        frontFill
    );


    /*
       Left fill
    */

    const leftFill =
        new THREE.PointLight(

            0xffffff,
            2.6,
            12,
            2

        );


    leftFill.position.set(
        -5,
        3,
        4
    );


    scene.add(
        leftFill
    );


    /*
       Soft green rim
    */

    const greenRim =
        new THREE.PointLight(

            0x38ff72,
            3.0,
            14,
            2

        );


    greenRim.position.set(
        -4,
        2.5,
        2
    );


    scene.add(
        greenRim
    );


    /*
       Green bounce
    */

    const greenBounce =
        new THREE.PointLight(

            0x16c75a,
            1.2,
            10,
            2

        );


    greenBounce.position.set(
        2,
        -2,
        4
    );


    scene.add(
        greenBounce
    );


    /*
       Back light
    */

    const greenBack =
        new THREE.PointLight(

            0x8affad,
            1.1,
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


    let robotBaseRotation =
        null;


    /* =================================================
       POINTER
    ================================================== */

    const pointer =
        new THREE.Vector2(
            0,
            0
        );


    /*
       Smoothed pointer
    */

    const smoothPointer =
        new THREE.Vector2(
            0,
            0
        );


    /* =================================================
       HEAD ROTATION
    ================================================== */

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


    /* =================================================
       TIME
    ================================================== */

    const clock =
        new THREE.Clock();


    let idleTime =
        0;


    /* =================================================
       BLINK SYSTEM
    ================================================== */

    let nextBlink =
        3.5 +
        Math.random() * 3;


    let blinkTimer =
        0;


    let isBlinking =
        false;


    let blinkProgress =
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
            "HEAD 2",
            "Face",
            "face"

        ];


        let result =
            null;


        root.traverse(object => {

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

        });


        return result;

    }


    /* =================================================
       ROBOT MATERIAL
    ================================================== */

    function styleRobotMaterials(root) {

        root.traverse(object => {

            if (!object.isMesh) {
                return;
            }


            object.castShadow =
                false;


            object.receiveShadow =
                false;


            let materials =
                object.material;


            if (!materials) {
                return;
            }


            if (
                !Array.isArray(materials)
            ) {

                materials = [
                    materials
                ];

            }


            materials.forEach(material => {

                if (!material) {
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


                /* =====================================
                   GREEN
                ===================================== */

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
                            "#58ff87"
                        );

                    }


                    if (
                        "emissive"
                        in material
                    ) {

                        material.emissive.set(
                            "#35ff70"
                        );


                        material.emissiveIntensity =
                            1.7;

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
                            0.18;

                    }


                    return;

                }


                /* =====================================
                   WHITE / SILVER
                ===================================== */

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
                            "#cbd4cf"
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
                            0.20;

                    }


                    return;

                }


                /* =====================================
                   DARK GRAPHITE
                ===================================== */

                if (
                    material.color
                ) {

                    material.color.set(
                        "#252b29"
                    );

                }


                if (
                    "metalness"
                    in material
                ) {

                    material.metalness =
                        0.68;

                }


                if (
                    "roughness"
                    in material
                ) {

                    material.roughness =
                        0.30;

                }


                if (
                    "envMapIntensity"
                    in material
                ) {

                    material.envMapIntensity =
                        1.2;

                }

            });

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

            console.error(
                "Ukuran robot tidak valid."
            );

            return;

        }


        object.position.sub(
            center
        );


        /*
           Ukuran robot
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
           Camera
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

            desiredSize * 0.06,

            cameraDistance * 0.88

        );


        camera.lookAt(

            0,

            desiredSize * 0.06,

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


        robotBaseRotation =
            object.rotation.clone();

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


        robotFace.name =
            "RobotFace";


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
                    0x111615,

                metalness:
                    0.72,

                roughness:
                    0.20,

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


        facePanel.position.set(
            0,
            -0.02,
            0.43
        );


        robotFace.add(
            facePanel
        );


        /* =============================================
           EYES
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
                    0x48ff7e,

                emissive:
                    0x35ff70,

                emissiveIntensity:
                    3.0,

                metalness:
                    0.20,

                roughness:
                    0.12

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
                0.65,
                1.8,
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
       LOAD ROBOT
    ================================================== */

    const loader =
        new GLTFLoader();


    const robotModelPath =
        "./robot.glb";


    console.log(
        "Loading robot:",
        robotModelPath
    );


    loader.load(

        robotModelPath,


        /* =============================================
           SUCCESS
        ============================================== */

        gltf => {

            robot =
                gltf.scene;


            console.log(
                "Robot GLB berhasil dimuat."
            );


            /*
               Style
            */

            styleRobotMaterials(
                robot
            );


            /*
               Add scene
            */

            scene.add(
                robot
            );


            /*
               Find head
            */

            head =
                findHead(
                    robot
                );


            if (head) {

                originalHeadRotation =
                    head.rotation.clone();


                console.log(
                    "Head ditemukan:",
                    head.name
                );


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
               Ready
            */

            if (robotStatus) {

                robotStatus.textContent =
                    head
                        ? "READY — MOVE CURSOR"
                        : "ROBOT READY";


                setTimeout(() => {

                    robotStatus.classList.add(
                        "hidden"
                    );

                }, 900);

            }

        },


        /* =============================================
           PROGRESS
        ============================================== */

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


        /* =============================================
           ERROR
        ============================================== */

        error => {

            console.error(
                "ROBOT FAILED TO LOAD",
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


        idleTime +=
            delta;


        /* =============================================
           SMOOTH CURSOR
        ============================================== */

        const pointerSmoothness =
            1 -
            Math.exp(
                -3.5 * delta
            );


        smoothPointer.lerp(
            pointer,
            pointerSmoothness
        );


        /* =============================================
           ROBOT BODY MOTION
        ============================================== */

        if (robot) {

            /*
               Breathing
            */

            const breathing =
                Math.sin(
                    idleTime * 1.15
                );


            /*
               Slow body sway
            */

            const bodySway =
                Math.sin(
                    idleTime * 0.55
                );


            /*
               Small body movement
            */

            robot.position.y =
                baseRobotY +
                breathing * 0.018;


            robot.position.z =
                baseRobotZ +
                Math.sin(
                    idleTime * 0.65
                ) * 0.008;


            /*
               Body rotation
            */

            robot.rotation.y =
                (
                    robotBaseRotation
                        ? robotBaseRotation.y
                        : 0
                ) +
                bodySway *
                THREE.MathUtils.degToRad(
                    1.4
                );


            robot.rotation.z =
                (
                    robotBaseRotation
                        ? robotBaseRotation.z
                        : 0
                ) +
                Math.sin(
                    idleTime * 0.75
                ) *
                THREE.MathUtils.degToRad(
                    0.45
                );

        }


        /* =============================================
           HEAD LOOK
        ============================================== */

        if (
            head &&
            originalHeadRotation
        ) {

            const maxY =
                THREE.MathUtils.degToRad(
                    25
                );


            const maxX =
                THREE.MathUtils.degToRad(
                    10
                );


            /*
               Cursor influence
            */

            targetHead.y =
                smoothPointer.x *
                maxY;


            targetHead.x =
                smoothPointer.y *
                maxX;


            /*
               Natural idle movement
            */

            targetHead.y +=

                Math.sin(
                    idleTime * 0.72
                ) *
                THREE.MathUtils.degToRad(
                    2.0
                );


            targetHead.x +=

                Math.sin(
                    idleTime * 0.93
                ) *
                THREE.MathUtils.degToRad(
                    0.9
                );


            /*
               Head smoothing
            */

            const headSmooth =
                1 -
                Math.exp(
                    -5.5 * delta
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


            /*
               Apply
            */

            head.rotation.x =
                originalHeadRotation.x +
                currentHead.x;


            head.rotation.y =
                originalHeadRotation.y +
                currentHead.y;


            head.rotation.z =
                originalHeadRotation.z +
                Math.sin(
                    idleTime * 0.8
                ) *
                THREE.MathUtils.degToRad(
                    0.35
                );

        }


        /* =============================================
           EYE ANIMATION
        ============================================== */

        if (
            faceEyes.length > 0
        ) {

            const eyePulse =
                2.6 +
                Math.sin(
                    idleTime * 1.7
                ) *
                0.55;


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


            /*
               Glow
            */

            const glowPulse =
                0.055 +
                Math.sin(
                    idleTime * 1.5
                ) *
                0.025;


            faceEyeGlows.forEach(glow => {

                if (
                    glow.material
                ) {

                    glow.material.opacity =
                        glowPulse;

                }

            });

        }


        /* =============================================
           NATURAL BLINK
        ============================================== */

        blinkTimer +=
            delta;


        if (
            !isBlinking &&
            blinkTimer >= nextBlink
        ) {

            isBlinking =
                true;


            blinkProgress =
                0;

        }


        if (
            isBlinking &&
            faceEyes.length === 2
        ) {

            blinkProgress +=
                delta * 8;


            const blinkValue =
                Math.sin(
                    Math.min(
                        blinkProgress,
                        Math.PI
                    )
                );


            const eyeScale =
                THREE.MathUtils.lerp(
                    1,
                    0.12,
                    blinkValue
                );


            faceEyes.forEach(
                eye => {

                    eye.scale.y =
                        eyeScale;

                }
            );


            if (
                blinkProgress >=
                Math.PI
            ) {

                isBlinking =
                    false;


                blinkTimer =
                    0;


                nextBlink =
                    3.0 +
                    Math.random() * 4.5;


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

            const mouthPulse =
                0.88 +
                Math.sin(
                    idleTime * 1.7
                ) *
                0.08;


            faceMouth.scale.x =
                mouthPulse;

        }


        if (
            faceMouthDots.length > 0
        ) {

            const mouthPulse =
                0.88 +
                Math.sin(
                    idleTime * 1.7
                ) *
                0.08;


            faceMouthDots.forEach(
                dot => {

                    dot.scale.setScalar(
                        mouthPulse
                    );

                }
            );

        }


        /* =============================================
           FACE LIGHT
        ============================================== */

        if (faceLight) {

            faceLight.intensity =
                0.55 +
                Math.sin(
                    idleTime * 1.6
                ) *
                0.12;

        }


        /* =============================================
           LIGHT ANIMATION
        ============================================== */

        const lightPulse =
            0.5 +
            0.5 *
            Math.sin(
                idleTime * 1.1
            );


        greenRim.intensity =
            2.8 +
            lightPulse * 0.9;


        greenBounce.intensity =
            1.1 +
            lightPulse * 0.3;


        greenBack.intensity =
            1.0 +
            lightPulse * 0.25;


        frontFill.intensity =
            3.0 +
            lightPulse * 0.25;


        leftFill.intensity =
            2.5 +
            lightPulse * 0.2;


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

            const newWidth =
                Math.max(
                    robotContainer.clientWidth,
                    1
                );


            const newHeight =
                Math.max(
                    robotContainer.clientHeight,
                    1
                );


            camera.aspect =
                newWidth /
                newHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(
                newWidth,
                newHeight
            );


            renderer.setPixelRatio(

                Math.min(
                    window.devicePixelRatio,
                    1.75
                )

            );

        }
    );

}
