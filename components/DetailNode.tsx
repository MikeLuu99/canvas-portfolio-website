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
      url: "https://justwrite.yboard.ai",
    },
    {
      name: "Search shortcuts",
      description: "Quick search on many websites",
      url: "https://chromewebstore.google.com/detail/search-shortcuts/imkjedockkilpeaglocpalmmfipiieak",
    },
  ],
  Education: [
    {
      degree: "B.S. in Computer Science",
      school: "Chapman University",
      year: "2026",
      logo: "https://yt3.googleusercontent.com/ytc/AIdro_k_MokCOiT2Cs6EQQ6pM8ZqWk5BlVCmdzkWLmB9qo3wxBE=s900-c-k-c0x00ffffff-no-rj",
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
  Contacts: [
    {
      type: "LinkedIn",
      url: "https://www.linkedin.com/in/mike-luu-117147253/",
      logo: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    },
    {
      type: "Twitter",
      url: "https://x.com/mikmikkk6",
      logo: "https://about.twitter.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png",
    },
  ],
};

function DetailNode({ data }: { data: { section: string } }) {
  const details = detailsData[data.section as keyof typeof detailsData] || [];

  return (
    <div className="w-80 h-80 p-4 bg-white rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="text-lg mb-6 text-black font-title font-bold">
        {data.section}
      </div>
      <ul className="pl-5 font-body">
        {details.map((detail, index) => (
          <li key={index} className="text-xs mb-5">
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
        ))}
      </ul>
    </div>
  );
}

export default memo(DetailNode);
