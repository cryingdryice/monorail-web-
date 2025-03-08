import { FaGithub } from "react-icons/fa";

export function GithubIcon(){
    return (
        <a href="https://github.com/cryingdryice/monorail-web-" 
         target="_blank" rel="noopener noreferrer" 
         className="absolute top-16 right-4 text-gray-400 text-3xl transition-transform transform hover:text-white">
        <FaGithub />
      </a>
    );
}