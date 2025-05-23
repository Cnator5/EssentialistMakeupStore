// Modal.js
import React from "react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="relative w-full max-w-md rounded-t-lg bg-white shadow-lg mb-10 animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500 font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="p-6">{children}</div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
};

export default Modal;