import { RxCross1 } from "react-icons/rx";
export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative bg-[var(--card)] p-2 rounded-xl shadow-xl">
                <div className="flex justify-end pr-2 pt-1">
                    <button onClick={onClose}>
                       <RxCross1 />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}