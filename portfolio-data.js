const portfolioData = {
  siteTitle: "Aarti Krishan Khatri | Portfolio",
  brandName: "Aarti Krishan Khatri",
  hero: {
    status: "Texas Tech University · CS Honors · Dec 2026",
    name: "Aarti Krishan Khatri",
    tagline: "ML Researcher · Software Builder · Data Engineer",
    description:
      "Computer Science student at Texas Tech combining machine learning research, data engineering, and software development to build things that actually work.",
    githubUrl: "https://github.com/Aartikkk",
    resumeUrl: "assets/docs/resume.pdf",
  },
  photo: {
    src: "assets/profile.jpg",
    alt: "Portrait of Aarti Krishan Khatri",
  },
  focus: {
    title: "What this portfolio highlights",
    items: [
      "Applied machine learning and scientific research",
      "Software, automation, and data-driven problem solving",
      "A portfolio with personality, movement, and clarity",
    ],
  },
  about: [
    "I am an honors Computer Science student at Texas Tech University with a Mathematics minor and a current GPA of 3.8. I care about combining rigorous analytical thinking with practical software development that solves real problems.",
    "My experience spans machine learning research, automation in laboratory environments, data science, and student-facing university work. I enjoy working in spaces where software meets experimentation, analysis, and impact.",
    "I am especially interested in software engineering, AI research, data science, and backend systems. This portfolio is designed to show both the technical substance of my work and the energy I bring to building.",
  ],
  profile: {
    gpa: "3.8 / 4.0",
    location: "Lubbock, TX",
    currentRole: "Research Assistant, Plant & Soil Sciences · Texas Tech",
    expectedGraduation: "December 2026",
  },
  education: [
    {
      period: "2023 - 2026",
      school: "Texas Tech University",
      title: "B.S. in Computer Science with Honors",
      detail:
        "Minor in Mathematics with Honors | Expected graduation: December 2026 | Current GPA: 3.8",
    },
  ],
  experience: [
    {
      period: "Oct 2025 – Present",
      role: "Research Assistant",
      organization: "Dept. of Plant & Soil Sciences, Texas Tech University",
      detail:
        "Developed automated data analysis pipelines in Python (Pandas, NumPy, SciPy) to process LI-7815 gas exchange analyzer data, reducing manual analysis time by 80 percent. Built linear regression models and statistical testing workflows to quantify CO₂ and H₂O flux rates, and automated generation of formatted Excel reports and publication-quality visualizations.",
    },
    {
      period: "Oct 2024 – Oct 2025",
      role: "Machine Learning Research Assistant",
      organization: "Srivastava Lab, Texas Tech University",
      detail:
        "Analyzed biomolecular spectral data of cancer exosomes, improving nanosensor sensitivity by 15 percent. Built and optimized models such as LDA, PCA-LDA, and PCA-KNN, achieving over 70 percent prediction accuracy for disease diagnostics. Co-authored research accepted for presentation at BMES 2025.",
    },
    {
      period: "Jun 2025 – Jul 2025",
      role: "Data Science Intern",
      organization: "CASFER, Case Western Reserve University",
      detail:
        "Mapped global soil nutrient patterns with Python and R using kriging interpolation and the WoSIS database. Built Random Forest, Gradient Boosting, XGBoost, and Ridge Regression models to predict peptide UV-Vis absorbance and evaluated 20,000 plus peptide sequences.",
    },
    {
      period: "Jun 2024 – Jul 2024",
      role: "Software & Automation Intern",
      organization: "CASFER, Texas Tech University",
      detail:
        "Automated more than 50 laboratory processes with the Opentrons OT-2 robot, reducing manual workload by 90 percent. Developed Python-based liquid handling protocols with ±0.2 µL accuracy and improved nitrogen capture efficiency by 10 percent.",
    },
  ],
  skills: [
    "Python",
    "Java",
    "C",
    "C++",
    "SQL",
    "R",
    "C#",
    "JavaScript",
    "NumPy",
    "Pandas",
    "Scikit-learn",
    "SciPy",
    "Matplotlib",
    "Geopandas",
    "XGBoost",
    "Biopython",
    "OpenPyXL",
    "terra",
    "sf",
    "GitHub",
    "Power BI",
    "JupyterLab",
    "Machine Learning",
    "Artificial Intelligence",
    "Automation",
    "Bioinformatics",
    "Geospatial Analysis",
    "Scientific Computing",
  ],
  coursework: [
    "Data Structures and Algorithms",
    "Object-Oriented Programming",
    "Software Engineering",
    "Databases",
    "Machine Learning and AI",
    "Data Science",
    "Distributed Systems",
    "Operating Systems",
    "Computer Networks",
    "Autonomous Driving Systems",
  ],
  projects: [
    {
      tag: "Data Engineering",
      title: "Automated Soil Gas Exchange Analysis Pipeline",
      description:
        "Built Python pipelines (Pandas, NumPy, SciPy) to process LI-7815 gas exchange analyzer data, cutting manual analysis time by 80%. Automated segmentation, linear regression, statistical testing, and publication-quality Excel report generation across multiple soil treatment groups.",
      stack: ["Python", "Pandas", "SciPy", "Matplotlib", "OpenPyXL"],
      liveUrl: "#",
      githubUrl: "https://github.com/Aartikkk/licor-li7815-analysis",
      note: "",
    },
    {
      tag: "Research Project",
      title: "Biomineralized SERS Nanotags for Disease Diagnostics",
      description:
        "Built machine learning pipelines to classify SERS spectra with more than 70 percent accuracy. This work was accepted for presentation at BMES 2025 and focused on improving disease diagnostics through computational analysis.",
      stack: ["Python", "Machine Learning", "Spectral Analysis"],
      liveUrl: "#",
      githubUrl: "https://github.com/Aartikkk/sers-ml-classification",
      note: "",
    },
    {
      tag: "Data Science · CASFER",
      title: "Peptide Absorbance Prediction",
      description:
        "ML pipeline developed during the CASFER REU 2025 program at Texas Tech to predict UV-Vis absorbance from 15-amino acid peptide sequences. Engineered 40+ biophysical and compositional features — including GRAVY score, isoelectric point, dipeptide frequencies (PCA-compressed), and positional hydrophobicity — then trained and evaluated Random Forest (R² ≈ 0.86), Gradient Boosting, stacking ensembles, and voting classifiers across 96 experimentally tested sequences.",
      stack: ["Python", "Random Forest", "Gradient Boosting", "K-Means", "scikit-learn"],
      liveUrl: "#",
      githubUrl: "https://github.com/Aartikkk/peptide-absorbance-prediction",
      note: "",
    },
    {
      tag: "Autonomous Systems",
      title: "MonocularVO — Visual Odometry Pipeline",
      description:
        "Built a monocular visual odometry system from scratch for an autonomous driving course. The pipeline uses ORB feature extraction, Essential-matrix pose initialization, PnP reprojection refinement, and Kalman smoothing to produce robust trajectory estimates on KITTI driving sequences.",
      stack: ["Python", "OpenCV", "NumPy", "Computer Vision"],
      liveUrl: "#",
      githubUrl: "https://github.com/Aartikkk/CS4331-005-Final-Project",
      extraLinks: [
        { label: "Read Report", url: "assets/docs/monocular-vo-report.pdf" },
      ],
      note: "",
    },
    {
      tag: "Web App",
      title: "AI Arena — Prompt-Powered Boxing Game",
      description:
        "A browser game where AI personas (ChatGPT, Claude, Gemini, Perplexity) compete through themed challenge rounds: Coding, Writing, Creativity, Logic, Research, and Persuasion. Abstract AI capabilities become animated game mechanics — attacks, crowd reactions, and a switchable ring presentation.",
      stack: ["JavaScript", "HTML", "CSS"],
      liveUrl: "#",
      githubUrl: "https://github.com/Aartikkk/ai-arena",
      note: "",
    },
  ],
  githubProjects: [],
  bmes: {
    title: "BMES 2025 Conference Presentation",
    event: "Biomedical Engineering Society Annual Meeting 2025",
    summary:
      "Presented research on machine learning-driven analysis of surface-enhanced Raman scattering spectra for biomineralized nanotags and disease diagnostics. The work focused on building a computational pipeline for spectral classification, dimensionality reduction, and interpretable analysis of label-free diagnostic signals.",
    abstract:
      "This work investigates how machine learning can improve interpretation of high-dimensional surface-enhanced Raman scattering spectra collected from seven amino-acid biomineralized gold nanotags. The study applies PCA, LDA, PCA plus LDA, t-SNE, and supervised models including PCA plus KNN to reduce noise, separate spectral classes, and improve predictive performance for diagnostic-style classification tasks.",
    posterLabel: "View BMES Poster",
    posterUrl: "assets/docs/bmes-poster-aarti-ak.pdf",
    previewImage: "assets/docs/bmes-poster-preview.jpg",
    abstractLabel: "Read BMES Abstract",
    abstractUrl: "#bmes-abstract",
    highlights: [
      "Applied PCA, LDA, and PCA plus KNN workflows to classify amino-acid biomineralized SERS spectra.",
      "Achieved 100 percent accuracy on labeled train-test sets and 83.50 percent accuracy in the single-blind PCA plus KNN study.",
      "Positioned machine learning as a path toward AI-driven, non-invasive, label-free diagnostics in personalized medicine.",
    ],
  },
  awards: [
    "Presidential Merit Scholarship (2023–Present)",
    "Gopal Lakhani Scholarship (2025)",
    "Zelda Doris Bond Scholarship (2025)",
    "President's List — Spring 2023, 2024",
    "Dean's List — Fall 2024, 2025",
  ],
  links: [
    {
      label: "GitHub",
      value: "@Aartikkk",
      url: "https://github.com/Aartikkk",
    },
    {
      label: "LinkedIn",
      value: "Aarti Krishan Khatri",
      url: "https://www.linkedin.com/in/aarti-krishan-khatri-5104782aa",
    },
    {
      label: "Texas Tech Email",
      value: "aarkhatr@ttu.edu",
      url: "mailto:aarkhatr@ttu.edu",
    },
    {
      label: "Personal Email",
      value: "aartikrk4@gmail.com",
      url: "mailto:aartikrk4@gmail.com",
    },
  ],
  contact: {
    text: "The best way to reach me is by email. You can also explore my GitHub and connect with me on LinkedIn.",
    email: "aarkhatr@ttu.edu",
  },
};
