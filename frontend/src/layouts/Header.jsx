import { useState } from 'react';
import NewEntryModal from '../components/NewEntryModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="header">
        <h1>Reading Tracker</h1>
        <button
          className="new-item-button"
          onClick={() => setIsModalOpen(true)}
        >
          New item
        </button>
      </header>

      <NewEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;