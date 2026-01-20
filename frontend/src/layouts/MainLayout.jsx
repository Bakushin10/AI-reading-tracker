import { useState } from 'react';
import Header from './Header';
import NewEntryModal from '../components/NewEntryModal';

const MainLayout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header onNewItemClick={() => setIsModalOpen(true)} />
      <main className="main">
        {children}
      </main>

      <NewEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default MainLayout;