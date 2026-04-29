export const profile = {
  name: "Gunjan Paul",
  greeting: "Hi, I'm Gunjan",
  title: "Robotics Engineer | Eyecandy Robotics",
  companyUrl: "https://eyecandyrobotics.com",
  companyLogo: "/assets/images/eyecandy.png",
  location: "Bengaluru, India",
  avatar: "/assets/images/profile_img.jpg",
  bio: `I've built robots that reimagine warehouses, and AI wearables that give people with disabilities a stronger voice, and took these ideas to national and international stages. I\'ve helped FPV Labs get started with Egocentric Data for Spatial Intelligence, and now I\'m in Eyecandy Robotics where we imagine and create robots that are fun and entertaining.`,
  email: "gunjanpaul.dev@gmail.com",
  social: [
    {
      name: "Twitter",
      url: "https://x.com/build_plate",
      icon: "twitter",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/gunjanpaul",
      icon: "linkedin",
    },
    {
      name: "GitHub",
      url: "https://github.com/G-Paul",
      icon: "github",
    },
  ],
};

export const projects = [
  {
    id: 1,
    title: "6-DoF Robot Arm for Warehouse Package Processing",
    dates: "Aug 2023 – Jan 2024",
    images: ["/assets/images/arctos_gif.gif", "/assets/images/arctos_image.jpg"],
    links: [
      {
        label: "Video Demo",
        url: "https://youtube.com/playlist?list=PL9RIgjsgJZquakKV6ovYzIavj0fWWvemc&si=JKBAvQygXXbrhQ49",
      },
      {
        label: "Feature Post",
        url: "https://www.linkedin.com/posts/gunjanpaul_flipkart-grid-50-robotics-finale-activity-7158046412255948800-O81a",
      },
    ],
    tech: ["ROS2", "YOLOv8", "FreeRTOS", "Linux"],
    isWip: false,
    description: [
      "Constructed a <strong>3D Printed 6-DOF Arm</strong> with Suction Grippers that detects and picks up individual parcels from a pile, reorients it so that the shipping label faces upwards, and places it on a designated spot.",
      "Built for <strong>Flipkart Grid 5.0 [Robotics Track]</strong>. Qualified for National Finals. Presented in IIT Madras.",
      "Modded OS used for CNC machines to run the 6 joints of the arm smoothly.",
      "Custom built Pneumatic Suction Gripper system with sensor based feedback mechanism for grip detection.",
    ],
  },
  {
    id: 2,
    title: "FOC BLDC Actuator with Stackable Gearbox",
    dates: "Jul 2025 – Sept 2025",
    images: ["/assets/images/foc_gb_gif1.gif","/assets/images/foc_gb_gif2.gif","/assets/images/FOC_GB_exp_2.png", "/assets/images/FOC_GB_exp_1.png", "/assets/images/FOC_PCB_1.jpg", "/assets/images/FOC_PCB_2.jpg"],
    links: [
       
    ],
    tech: ["Field Oriented Control", "SimpleFOC", "Magnetic Encoders", "CAD Design", "PCB Design"],
    isWip: true,
    description: [
      "Project to explore the world of Robotics Actuator by learning BLDC Field Oriented Control (FOC) and Gearbox design principles.",
      "Designed a modular, stackable planetary gearbox system with each GB module being a 4:1 reduction gearbox. Motor module contains a 2805 Gimbal Motor.",
      "Designed a SPI based Magnetic Encoder board using the MA702 IC for high-speed position feedback for closed loop FOC.",
      "Used SimpleFOC to perform position and velocity based FOC control of the gearbox.",
      "In Progress: Custom implementation of position, velocity and torque control using STM32 based ESC dev board"
    ],
  },
  {
    id: 3,
    title: "Nai-Awaz: Sign Language to Speech Gloves",
    dates: "Jan 2023 – Sept 2023",
    images: ["/assets/images/gloves_pic.jpg"],
    links: [
      {
        label: "Pitch Deck",
        url: "https://www.canva.com/design/DAFqHFHswuk/gH7jhVfqH0nBQmKB3sfABA/view",
      },
    ],
    tech: ["C++", "Embedded Linux", "PyTorch", "TFLite"],
    isWip: false,
    description: [
      "Built Nai-Awaz [The New Voice]: Gloves that can translate sign-language to speech/text in real time.",
      "Novel Approach: Using <strong>Hall-Effect sensors + IMU</strong> instead of flex sensors, to improve accuracy and longevity.",
      "Presented in <strong>Regional Finals [APAC] of Oppo Inspiration Challenge 2023, Bangkok</strong> [Top-15 from 687 proposals from 68 countries]. <strong>Winner</strong> in Innovation Challenge, Kshitij 2023, IIT-KGP.",
    ],
  },
  {
    id: 4,
    title: "MotoNav: Offline GPS navigation device for Motorbikes",
    dates: "Aug 2025 – Oct 2025",
    images: ["/assets/images/map_puc.jpg"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/G-Paul/motonav_arduino",
      },
    ],
    tech: ["LVGL", "FreeRTOS", "OpenStreetMap", "C++", "Python", "ESP32S3"],
    isWip: false,
    description: [
      "MotoNav is a small [2 inch] device that uses built in GPS and Compass for offline phone-free navigation.",
      "Intended to mount on a motorcycle's handlebar. The user can set the route through mobile app, and then the route is displayed on the screen. Smartphone only required for initiating navigation - rest is on device.",
      "Built using a ESP32S3 AMOLED module. Uses Arduino + LVGL for rendering map. Uses GPS + Compass + IMU for navigation. Uses map tiles from OpenStreetMap, rendered in game-like minimap designa through a custom pipeline.",
    ],
  },
  // {
  //   id: 4,
  //   title: "Talent Sprint Classes App",
  //   dates: "Mar 2023 – July 2023",
  //   images: ["/assets/images/TSC App.png"],
  //   links: [
  //     {
  //       label: "Demo Video",
  //       url: "https://youtube.com/shorts/jdrRjJHKxLk?si=xa_G7MKcOoXxK13-",
  //     },
  //   ],
  //   tech: ["Flutter", "Firebase", "Android"],
  //   isWip: false,
  //   description: [
  //     "App made for Talent Sprint Classes, Odisha as a companion app for their teachers and students.",
  //     "Students can view class schedule, academic details, performance details; download class materials and pay fees. Teachers can view student performance, upload class notes and marks, and see their schedule.",
  //     "Flutter app, directly integrated with Firebase back-end to enable User Authentication and CRUD Operations.",
  //     "Reached a user-base of 500+ students and teachers.",
  //   ],
  // },
];

export const experience = [
  {
    id: 1,
    company: "Eyencandy Robotics",
    role: "Robotics Enginner",
    dates: "April 2026 – present",
    logo: "/assets/images/eyecandy_orange.png",
    url: "https://eyecandyrobotics.com",
    description:
      "At Eyecandy Robotics, I'm part of an incredible team who believe that robots can be cool and entertaining. Here, I build the hardware and software of robots that blend engineering with personality — machines that don't just work, but genuinely delight.",
    isCurrent: true,
  },
  {
    id: 2,
    company: "FPV Labs",
    role: "Founding Engineer",
    dates: "Sept 2025 – Mar 2026",
    logo: "/assets/images/fpv.png",
    url: "https://fpvlabs.ai",
    // description:
    //   "As part of the founding team at FPV Labs, my work mostly focussed on working on hardware - researching, developing and validating hardware solutions for detailed multi-modal Egocentric Data recording, VIO, SLAM and related stuff. I also contributed to developing several internal software tools, maintaining the data backend , and in general, embracing the beautiful chaos of building something from scratch.",
    isCurrent: false,
  },
  {
    id: 3,
    company: "TransUnion GTC India",
    role: "SDE - Backend",
    dates: "Feb 2024 – Sept 2025",
    logo: "/assets/images/transunion_logo.jpg",
    url: "https://www.transunion.com",
    description:
      "Part of the initial team building TruAudience™ - TransUnion's latest gen data-driven marketing and measurement solution. Helped build the product's core backend services - from initial ideations to onboarding our first set of enterprise customers.",
    isCurrent: false,
  },
  {
    id: 4,
    company: "Glovi-Fi",
    role: "Co-Founder",
    dates: "Feb 2023 – Jan 2024",
    logo: "/assets/images/glovifi_logo.png",
    description:
      "Co-Founded Glovi-Fi while I was in college. Here, we built Nai-Awaz: Sign Language to Speech Gloves. We built it using a novel hardware and software stack. Presented our product and company in Oppo Inspiration Challenge 2023 Finals in Bangkok in front of a panel of judges from tech-research and investment-banking background. Received praise for our approach to solving a problem that affects millions worldwide.",
    isCurrent: false,
  },
];
