// AUTO-GENERATED — do not edit by hand.
// Edit profile/profile.json, then run: npm run profile:sync
import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: "project-smartvalyou",
    title: "AI Knowledge-Graph Platform — Smart Decision",
    description: "Built high-performance Azure Functions in Python that serve graph data from Neo4j on-demand, cutting query latency and boosting UI responsiveness. Designed Dockerised AI agents that autonomously analyse, create, update, and delete nodes/relationships in Neo4j to keep the knowledge base current. Implemented AI-powered report generation, intelligent search, and integrated Azure Blob Storage for scalable cloud data handling.",
    impact: "Production Azure Functions + Neo4j graph APIs; Dockerised AI agents autonomously maintain the knowledge graph.",
    image: "/assets/images/smartvalyou_logo.svg",
    technologies: ["Python","Azure Functions","Neo4j","Docker","LangChain","Azure Blob Storage","FastAPI"],
    links: [
          {
                "type": "external",
                "url": "https://www.smartvalyou.ai/",
                "label": "SmartValyou Platform"
          }
    ],
    featured: true,
  },
  {
    id: "project-phenomenal",
    title: "Generative Video Platform — Phenomenal AI",
    description: "Led end-to-end development of an AI-driven generative video platform, integrating frontend, backend, and cloud components. Optimised an open-source video generation model and built an AI-powered chatbot called \"Director\" that lets users interactively craft video scenes through natural-language conversation.",
    impact: "End-to-end generative video platform; built Director chatbot for interactive scene authoring in production.",
    image: "/assets/images/phenomenal_ai_logo.png",
    technologies: ["Python","FastAPI","GenAI","Docker","Cloud","Streamlit"],
    links: [
          {
                "type": "external",
                "url": "https://www.phenomenalai.in/",
                "label": "Phenomenal AI"
          }
    ],
    featured: true,
  },
  {
    id: "project-chatbot",
    title: "ChatBot: AI-powered Conversational Agent",
    description: "A real-time interactive chatbot built using the Meta-Llama-3-8B-Instruct model with customisable system prompts and efficient memory management. Deployed via Streamlit for seamless user interaction, robust context retrieval, and a streamlined conversation experience.",
    impact: "Implemented a real-time interactive chatbot featuring customizable system prompts and efficient memory management using the Meta-Llama-3-8B-Instruct model.",
    image: "/assets/images/new-portfolio_image.jpg",
    technologies: ["Python","Meta-Llama-3-8B","Streamlit","NLP","AI"],
    links: [
          {
                "type": "github",
                "url": "https://github.com/KishanMunjpara/-ChatBot-AI-powered-Conversational-Agent.git",
                "label": "GitHub Repository"
          }
    ],
    featured: true,
  },
  {
    id: "project-rag",
    title: "Optimized Context Retrieval System for LLM-based Chatbots",
    description: "Developed an advanced context retrieval system integrating Dense Passage Retrieval (DPR) with GPT and LLAMA models. Leverages Meta LLAMA 2 and Hugging Face embeddings for precise, context-aware information retrieval, significantly improving response relevance and user experience.",
    impact: "Built a chatbot by integrating Dense Passage Retrieval with GPT and LLAMA, achieving precise context-based information retrieval.",
    image: "/assets/images/portfolio4.jpg",
    technologies: ["Python","DPR","GPT","LLAMA 2","Hugging Face","NLP"],
    links: [
          {
                "type": "pdf",
                "url": "/assets/pdfs/CP_Project_Kishan.pdf",
                "label": "Project Report"
          }
    ],
    featured: true,
  },
  {
    id: "project-cline",
    title: "Cline.AI — Clickbait News Detector",
    description: "Led a five-member team to build an NLP system achieving 93% accuracy on real-world news headlines. Ranked #18 on Product Hunt and listed on the Chrome Web Store with 230+ organic users. Built a custom Flask API back-end and JavaScript Chrome extension.",
    impact: "Led a five-member team to build an NLP system achieving 93% accuracy on real-world news headlines.",
    image: "/assets/images/portfolio2.png",
    technologies: ["Python","LSTM","Flask","JavaScript","Chrome Extension","NLP"],
    links: [
          {
                "type": "chrome",
                "url": "https://chromewebstore.google.com/detail/cline-clickbait-news-dete/bcbooidlhpmjncblopcnechegopiamil",
                "label": "Chrome Web Store"
          },
          {
                "type": "github",
                "url": "https://github.com/KishanMunjpara/Cline.AI",
                "label": "GitHub Repository"
          }
    ],
    featured: true,
  }
];
