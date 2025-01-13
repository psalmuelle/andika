const clients = [
  {
    id: 1,
    name: "Aboo",
    image: "/company-1.jpg",
  },
  {
    id: 2,
    name: "Virtua Systems",
    image: "/company-2.png",
  },
  {
    id: 4,
    name: "Mon AI",
    image: "/company-4.jpg",
  },
];
const offers = [
  {
    id: 1,
    title: "Effortless Documentation, Exceptional Quality",
    description:
      "Our team crafts clear, concise, and engaging technical content to help your users navigate complex systems with ease.",
    href: "/auth/login",
  },
  {
    id: 2,
    title: "API & SDK Guides That Work",
    description:
      "We create user-friendly API and SDK guides to ensure developers integrate your tools seamlessly and efficiently.",
    href: "/auth/login",
  },
  {
    id: 3,
    title: "Whitepapers That Stand Out",
    description:
      "Deliver high-impact whitepapers that highlight your expertise and help you win over your target audience.",
    href: "/auth/login",
  },
];

const offeringImages = [
  {
    id: 1,
    src: "/andika-step-1.jpg",
    alt: "andika dashboard for managing projects",
  },
  {
    id: 2,
    src: "/andika-step-2.jpg",
    alt: "andika dashboard for managing projects",
  },
  {
    id: 3,
    src: "/andika-step-3.jpg",
    alt: "andika dashboard for managing projects",
  },
];

const stats = [
  {
    id: 1,
    figure: "40+",
    label: "Projects Completed",
  },
  {
    id: 2,
    figure: "100%",
    label: "Satisfaction Rate",
  },
  {
    id: 3,
    figure: "5+",
    label: "Years of Experience",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "CEO, TechWave Inc.",
    image: "/images/testimonial-alex.png",
    comment:
      "Working with this team transformed our documentation process. Their technical writers delivered API guides that are clear, professional, and easy for developers to follow.",
  },
  {
    id: 2,
    name: "Sophia Lee",
    title: "Product Manager, Innovatech",
    image: "/images/testimonial-sophia.png",
    comment:
      "Their whitepapers have been a game-changer for us. The content is engaging, concise, and perfectly captures the essence of our technical solutions.",
  },
  {
    id: 3,
    name: "Michael Rivera",
    title: "Founder, CloudEdge",
    image: "/images/testimonial-michael.png",
    comment:
      "The team's ability to distill complex technical information into user-friendly documentation is unmatched. Highly recommend them for any technical writing needs!",
  },
];

const pricelist = [
  {
    id: 1,
    title: "Technical Articles",
    description: "In-depth articles explaining complex technical concepts.",
    price: "$249",
    unit: "/article",
    features: [
      "SEO-optimized content",
      "Comprehensive technical research",
      "Custom illustrations and diagrams",
    ],
    link: "/auth/login",
  },
  {
    id: 2,
    title: "Whitepapers & API/SDK Docs",
    description: "Clear and detailed API reference documentation.",
    price: "$499",
    unit: "/project",
    features: [
      "Developer-focused clarity",
      "Full API lifecycle coverage",
      "Customizable for your platform",
    ],
    link: "/auth/login",
  },
  {
    id: 3,
    title: "Editing & Proofreading",
    description: "Improve the quality and accuracy of your technical content.",
    price: "$149",
    unit: "/document",
    features: [
      "Grammar and syntax checks",
      "Technical accuracy review",
      "Enhanced readability and flow",
    ],
    link: "/auth/login",
  },
];
export { clients, offers, offeringImages, stats, testimonials, pricelist };
