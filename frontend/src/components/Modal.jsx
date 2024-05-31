// src/components/Modal.jsx
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon

const Modal = ({ isOpen, onClose, children }) => {
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setTimeout(() => setAnimate(true), 10); // Delay to trigger animation
    } else {
      setAnimate(false);
      setTimeout(() => setShowModal(false), 300); // Match the duration of the animation
    }
  }, [isOpen]);

  if (!showModal) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        animate ? "bg-black bg-opacity-50" : "bg-transparent"
      }`}
    >
      <div
        className={`relative bg-white rounded-lg p-4 max-w-lg w-full transform transition-all duration-300 ${
          animate ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 bg-white rounded-full shadow-md p-2"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
