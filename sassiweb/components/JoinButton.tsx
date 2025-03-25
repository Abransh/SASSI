"use client";

import { useState } from "react";
import Link from "next/link";
import JoinUsModal from "./JoinUsModal";

interface JoinButtonProps {
  className?: string;
}

export default function JoinButton({ className }: JoinButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className={`px-6 py-3 bg-yellow-400 text-black border-2 border-black rounded-md font-medium transition-all hover:bg-black hover:text-yellow-400 hover:border-yellow-400 ${className}`}
      >
        Join Us
      </button>
      
      <JoinUsModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}