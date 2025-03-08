import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export function SoundIcon({isMuted, toggleMute}){
    return (
        <button
            onClick={toggleMute}
            className="absolute top-28 right-4 text-gray-400 text-3xl transition-transform transform hover:text-white"
        >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
    );
};