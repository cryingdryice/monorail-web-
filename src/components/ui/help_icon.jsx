import { HelpCircle } from "lucide-react";

export function HelpIcon({setShowRules}){
    return(
        <div className="absolute top-4 right-4 z-20">
            <button onClick={() => setShowRules(true)} className="text-gray-400 hover:text-white transition-all">
            <HelpCircle size={28} />
            </button>
      </div>
    );
};