const Header = ({ onNewItemClick }) => {
  return (
    <header className="header">
      <h1>Reading Tracker</h1>
      <button
        className="new-item-button"
        onClick={onNewItemClick}
      >
        New item
      </button>
    </header>
  );
};

export default Header;