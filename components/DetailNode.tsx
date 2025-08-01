import { memo } from "react";
import Image from "next/image";

const detailsData = {
  Projects: [
    {
      name: "Yboard",
      description: "A canvas for note-taking",
      url: "https://yboard.ai",
    },
    {
      name: "Just Write",
      description: "A focused text editor",
      url: "https://justwrite.mikeluu.xyz",
    },
    {
      name: "Search shortcuts",
      description: "Quick search on many websites",
      url: "https://chromewebstore.google.com/detail/search-shortcuts/imkjedockkilpeaglocpalmmfipiieak",
    },
    {
      name: "AI Storyboard",
      description: "Generate storyboards with Diffusion Model",
      url: "https://aistoryboard.streamlit.app/",
    },
    {
      name: "Groq AI Voice Agent",
      description: "A voice agent using Groq API and LiveKit Cloud",
      url: "https://github.com/MikeLuu99/groq-voice-agent",
    },
    {
      name: "Doctor Sandie",
      description:
        "A real-time collaborative health challenges website with AI doctor.",
      url: "https://doctor-sandie.mikeluu.xyz",
    },
    {
      name: "Japanese Genki Vocab",
      description:
        "Astro website to practice all the main vocab in the Genki textbooks",
      url: "https://genki-vocab.mikeluu.xyz",
    },
  ],
  Education: [
    {
      degree: "B.S in Applied and Computational Mathematics",
      school: "University of Southern California",
      year: "2027",
      logo: "https://sportslogohistory.com/wp-content/uploads/2018/04/southern_california_trojans_1880-2015-w.png",
    },
    {
      degree: "B.S. in Computer Science",
      school: "Chapman University",
      year: "2025",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKtelhma20KapddOaYZ2pjEVu3B-uItkuVHA&s",
    },
    {
      degree: "s5 gaudmire",
      school: "buildspace",
      year: "2024",
      logo: "https://photos.wellfound.com/startups/i/7964549-22922e6b8b8f65176fb2278b5ddc0be4-medium_jpg.jpg?buster=1680559591",
    },
  ],
  Experiences: [
    {
      role: "Undergraduate Researcher",
      company: "Chapman University ESSDSL",
      logo: "https://yt3.googleusercontent.com/ytc/AIdro_k_MokCOiT2Cs6EQQ6pM8ZqWk5BlVCmdzkWLmB9qo3wxBE=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      role: "Software Engineer & IT Intern",
      company: "Pac-Dent",
      logo: "https://media.licdn.com/dms/image/v2/C560BAQEMZ3PtWYiF3g/company-logo_200_200/company-logo_200_200/0/1642795447014/pac_dent_inc_logo?e=2147483647&v=beta&t=i5jS91rG6KRmxQMNQhaRotTX5Y0Cmgwetkmni3CTepU",
    },
  ],
  Links: [
    {
      type: "LinkedIn",
      url: "https://www.linkedin.com/in/mike-l%C6%B0u-117147253/",
      logo: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    },
    {
      type: "Twitter",
      url: "https://x.com/mikmikkk6",
      logo: "https://about.twitter.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png",
    },
    {
      type: "Github",
      url: "https://github.com/MikeLuu99",
      logo: "https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png",
    },
    {
      type: "Resume",
      url: "https://mikeluu.xyz/resume.pdf",
      logo: "./resume.svg",
    },
  ],
};

function DetailNode({ data }: { data: { section: string } }) {
  const details = detailsData[data.section as keyof typeof detailsData] || [];

  return (
    <div className="w-80 h-full p-4 bg-white rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="text-lg mb-6 text-black font-title font-bold">
        {data.section}
      </div>
      <ul className="pl-5 font-body text-black">
        {details.map((detail, index) => {
          // Create a unique key based on content rather than index
          const uniqueKey =
            "type" in detail
              ? `link-${detail.type}`
              : "role" in detail
                ? `exp-${detail.company}-${detail.role}`
                : "name" in detail
                  ? `proj-${detail.name}`
                  : "degree" in detail
                    ? `edu-${detail.school}-${detail.degree}`
                    : `item-${index}`;

          return (
            <li key={uniqueKey} className="text-xs mb-5">
              {typeof detail === "string" ? (
                detail
              ) : "type" in detail ? (
                <div className="flex items-center">
                  <a
                    href={detail.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80"
                  >
                    <Image
                      src={detail.logo}
                      alt={detail.type}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    <span className="underline">{detail.type}</span>
                  </a>
                </div>
              ) : "role" in detail ? (
                <div className="flex items-center gap-2">
                  <Image
                    src={detail.logo}
                    alt={detail.company}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <span>
                    {detail.role}, {detail.company}
                  </span>
                </div>
              ) : "name" in detail ? (
                <a
                  href={detail.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <span className="underline">{detail.name}</span>:{" "}
                  {detail.description}
                </a>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={detail.logo}
                    alt={detail.school}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <span>
                    {detail.degree}, {detail.school}, {detail.year}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(DetailNode);
