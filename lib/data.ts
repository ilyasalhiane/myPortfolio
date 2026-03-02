export const certifications = [
  {
    id: "honoris",
    title: "State Engineer Degree (Diplôme d'Ingénieur d'État)",
    org: "EMSI & Honoris United Universities",
    icon: "coursera",
    link: "[https://certificate.bcdiploma.com/check/E7887938AC4F7976218836632B576C24B3C500787E8CDCC68DA068A3B7416710V2VxWHNRU0pjMEtGdkFKT0R5Y296MWZiNFQ2WFo3dDEwK3NhMFN6THJxeHBuUXNr](https://certificate.bcdiploma.com/check/E7887938AC4F7976218836632B576C24B3C500787E8CDCC68DA068A3B7416710V2VxWHNRU0pjMEtGdkFKT0R5Y296MWZiNFQ2WFo3dDEwK3NhMFN6THJxeHBuUXNr)",
    color: "from-amber-400 to-orange-500"
  },
  {
    id: "ibm-spec",
    title: "DevOps, Cloud, and Agile Foundations Specialization",
    org: "IBM",
    icon: "ibm",
    link: "[https://www.coursera.org/account/accomplishments/specialization/certificate/QK4GW3U4CQ47](https://www.coursera.org/account/accomplishments/specialization/certificate/QK4GW3U4CQ47)",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "ibm-devops",
    title: "Introduction to DevOps",
    org: "IBM",
    icon: "ibm",
    link: "[https://www.coursera.org/account/accomplishments/certificate/PWFT8B7DW6WM](https://www.coursera.org/account/accomplishments/certificate/PWFT8B7DW6WM)",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "ibm-node",
    title: "Developing Back-End Apps with Node.js and Express",
    org: "IBM",
    icon: "ibm",
    link: "[https://www.coursera.org/account/accomplishments/certificate/NBXZTD92TLJJ](https://www.coursera.org/account/accomplishments/certificate/NBXZTD92TLJJ)",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "meta-adv-react",
    title: "Advanced React",
    org: "Meta",
    icon: "meta",
    link: "[https://www.coursera.org/account/accomplishments/certificate/RDYEVZWUYCE6](https://www.coursera.org/account/accomplishments/certificate/RDYEVZWUYCE6)",
    color: "from-sky-400 to-blue-500"
  },
  {
    id: "meta-native",
    title: "React Native",
    org: "Meta",
    icon: "meta",
    link: "[https://www.coursera.org/account/accomplishments/certificate/FXHJAPXVGKKZ](https://www.coursera.org/account/accomplishments/certificate/FXHJAPXVGKKZ)",
    color: "from-sky-400 to-blue-500"
  },
  {
    id: "meta-front",
    title: "Introduction to Front-End Development",
    org: "Meta",
    icon: "meta",
    link: "[https://www.coursera.org/account/accomplishments/certificate/MQP6EVDCJTWV](https://www.coursera.org/account/accomplishments/certificate/MQP6EVDCJTWV)",
    color: "from-sky-400 to-blue-500"
  },
  {
    id: "meta-js",
    title: "Programming with JavaScript",
    org: "Meta",
    icon: "meta",
    link: "[https://www.coursera.org/account/accomplishments/certificate/HT6F9DJGCB88](https://www.coursera.org/account/accomplishments/certificate/HT6F9DJGCB88)",
    color: "from-sky-400 to-blue-500"
  },
  {
    id: "london-ml",
    title: "Machine Learning for All",
    org: "University of London",
    icon: "coursera",
    link: "[https://www.coursera.org/account/accomplishments/certificate/35QJNG5UQCGP](https://www.coursera.org/account/accomplishments/certificate/35QJNG5UQCGP)",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "michigan-py",
    title: "Python Functions, Files, and Dictionaries",
    org: "University of Michigan",
    icon: "python",
    link: "[https://www.coursera.org/account/accomplishments/certificate/GAQ8VXCYASHU](https://www.coursera.org/account/accomplishments/certificate/GAQ8VXCYASHU)",
    color: "from-yellow-400 to-amber-500"
  }
] as const;

export type Certification = (typeof certifications)[number];
