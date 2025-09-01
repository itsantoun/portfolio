
export const SKILLS = [
    {
        title: "Frontend",
        icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/HTML5_logo_and_wordmark.svg", // Frontend category icon
        skills: [
            { skill: "HTML5",icon:require("../Assets/icons/HTML5.png") }, // HTML5 logo
            { skill: "CSS", icon:require("../Assets/icons/CSS3.png") }, // CSS logo
            { skill: "JavaScript", icon:require("../Assets/icons/JavaScript.png")}, // JS logo
            { skill: "React.js", icon:require("../Assets/icons/React.png") }, // React logo
            { skill: "Angular", icon:require("../Assets/icons/Angular.png") }, // Angular logo
            { skill: "Svelte", icon:require("../Assets/icons/Svelte.png") }, // Svelte logo
        ],
    },
    {
        title: "Backend",
        icon: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Node.js_logo_2015.svg", // Backend category icon
        skills: [
            { skill: "Node.js", icon:require("../Assets/icons/nodejs.png")  }, // Node.js logo
            { skill: "Oracle", icon:require("../Assets/icons/Oracle.png") }, // Oracle logo
            { skill: "SQL Server", icon:require("../Assets/icons/sqlserver.png")  }, // SQL Server logo
            { skill: "SQL Express",icon:require("../Assets/icons/Express.png")  }, // SQL Express logo
            { skill: "MongoDB", icon:require("../Assets/icons/MongoDB.png")  }, // MongoDB logo
            { skill: "Firebase", icon:require("../Assets/icons/Firebase.png")  }, // Firebase logo
        ],
    },
    {
        title: "Tools",
        icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Visual_Studio_Code_1.35_icon.svg", // Tools category icon
        skills: [
            { skill: "Visual Studio Code", icon:require("../Assets/icons/vscode.png") },
            { skill: "Xcode", icon:require("../Assets/icons/Xcode.png") },
            { skill: "Anaconda (Jupyter Notebook, Spider)", icon:require("../Assets/icons/anaconda.png") }, // Anaconda logo
            { skill: "Google Colab", icon:require("../Assets/collab.png") }, // Google Colab logo
            { skill: "Eclipse IDE",  icon:require("../Assets/icons/eclipse.png")  }, // Eclipse logo
            { skill: "Docker",  icon:require("../Assets/icons/Docker.png")  }, // Docker logo
            { skill: "Postman", icon:require("../Assets/icons/Postman.png")  }, // Postman logo
        ],
    },
    {
        title: "Programming Languages",
        icon: "https://upload.wikimedia.org/wikipedia/commons/6/63/Java_icon.svg", // Programming Languages category icon
        skills: [
            { skill: "Java",icon:require("../Assets/icons/Java.png")  }, // Java logo
            { skill: "Python", icon:require("../Assets/icons/Python.png")  }, // Python logo
            { skill: "Swift", icon:require("../Assets/icons/Swift.png")  }, // Swift logo
            { skill: "React",icon:require("../Assets/icons/React.png")  }, // React logo
            { skill: "C", icon:require("../Assets/icons/C.png")  }, // C logo
            { skill: "PHP", icon:require("../Assets/icons/PHP.png")  }, // PHP logo
        ],
    },
    {
        title: "Operating Systems",
        icon: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Windows_logo_-_2012.svg", // Operating Systems category icon
        skills: [
            { skill: "MacOS", icon:require("../Assets/icons/Apple.png")}, // MacOS logo
            { skill: "MS Windows", icon:require("../Assets/icons/Windows 11.png") }, // Windows logo
            { skill: "Linux (Ubuntu, Kali Linux)", icon:require("../Assets/icons/Linux.png")}, // Linux logo
        ],
    },
    {
        title: "Design Tools",
        icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_XD_logo_2019.svg", // Design Tools category icon
        skills: [
            { skill: "Adobe Photoshop", icon:require("../Assets/icons/photoshop.png") }, // Adobe XD logo
            { skill: "Adobe XD", icon:require("../Assets/icons/xd.png")  }, // Photoshop logo
            { skill: "Figma", icon:require("../Assets/icons/Figma.png")  }, // Figma logo
        ],
    },

    {
        title: "Cloud",
        icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_XD_logo_2019.svg", // Design Tools category icon
        skills: [
            { skill: "Amazon Web Services", icon:require("../Assets/icons/AWS.png") }, // Adobe XD logo
            { skill: "Google Cloud", icon:require("../Assets/icons/Google Cloud.png")  }, // Photoshop logo
        ],
    },

    {
        title: "Business Intelligence Tools",
        icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_XD_logo_2019.svg", // Design Tools category icon
        skills: [
            { skill: "Power BI", icon:require("../Assets/icons/powebi.png") }, // Adobe XD logo
        ],
    },
];


export const WORK_EXPERIENCE = [

    {
        title: "Full-Time – IT Specialist:",
        company: "SBI Consultants, Inc.",
        date: "Summer 2022-Present",
        responsibilities: [
           "Managed IT infrastructure and provided technical support for hardware, software, and network systems",
           "Built internal tools for PDF-to-Excel data extraction using .Net, and maintained the company website using WordPress"

        ],
          tools: ["WordPress, .NET ,PHP, CSS, Networking"],
    },
     {
        title: "Full Stack Software Developer & IT Specialist ",
        company: "Elsheikh.INC ",
        date: "Summer 2024 – Present",
        responsibilities: [
            "IT Specialist: Manage server, networking and provide IT support",
            "Software Developer: Buid and design a software for managing oil purchases, keep track of items, and generate monthly reports",
        ],
        tools: ["VS Code, GitHub, Git, ReactJS, CSS, Firebase"]
    },
    {
        title: "University Student Employment- Stage Assistant:",
        company: "Lebanese American Univerity (Beirut-Lebanon)",
        date: "Fall 2022 – Fall 2024",
        responsibilities: [
            "Assistant director.",
            "Operating the lighting and sound console, installing lanterns on the catwalk, operating the sound mixer, and video projector, and installing and setup microphones.",
            "Set up and managed live streaming."
        ],
    },

    {
        title: "Full-Stack Developer with AI",
        company: "Genfusion (Remote-USA)",
        date: "Summer 2024 – Fall 2024",
        responsibilities: [
            "Translated Figma designs into fully responsive and interactive web applications, ensuring seamless user experience and design fidelity across all platforms.",
            "Developed and integrated APIs from various applications to enhance functionality and ensure smooth data exchange between systems.",
        ],
         tools: ["VS Code, Docker, GitHub, Git, Svelte, Svelte Kit, Tailwind CSS."]
    },


    {
        title: "Internship - Room Booking Reservation ",
        company: "Integrated Digital Systems",
        date: "Summer 2023",
        responsibilities: [
            "Website for employees to reserve a room for their upcoming meetings.",
            "Backend: SQL Server",
            "API: Create an API responsible for adding employees, reserving rooms, and storing information on the SQL Database server.",
        ],
         tools:["Visual Studio, VS Code, .NET Core, React JS, CSS, Git"]
    },

    {
        title: "User testing – Event Organizer website:",
         company: "Pronotion",
        date: "Fall 2023",
        responsibilities: [
            "Testing the functionalities of an upgraded website, such as account creation, transaction operations, services, and the design of the website.",
        ],
         tools:["Google Chrome, MS Word."]
    },
];


export const MY_PROJECTS = [
    {
        icon: require("../Assets/melodius.png"),
        title: "Melodius",
        date: "Final Project",
        url: "https://github.com/itsantoun/Melodius-Final-Project.git",
        responsibilities: [
            "A social media platform that connects musicians together with the ability to find jobs, expand their network and show their work."
        ],
        tools:["ReactJS, AWS, NodeJS, CSS, Github, Amazon S3, Amazon RDS, VS Code, POSTMAN."]
    },
    {
        icon: require("../Assets/RoomBookingWebsite.png"),
        title: "Room Booking Website",
        date: "Summer 2023",
        url: "https://github.com/itsantoun/roomBooking-FrontEnd",
        responsibilities: [
            "The room booking website helps employees at companies book rooms online."
        ],
        tools:["ReactJS, SQL Server, .NET Core, CSS, GitHub, VS Code, Visual Studio."]
    },
    {
        icon: require("../Assets/tourinleb.png"),
        title: "Tour in Lebanon",
        date: "Fall 2022",
        url: "https://github.com/itsantoun/Tour-in-Lebanon.git",
        responsibilities: [
            "A basic website using HTML/CSS/JS showing beautiful and historical places of Lebanon"
        ],
        tools:["HTML, CSS, Javascript, GitHub, VS Code."]
    },

];