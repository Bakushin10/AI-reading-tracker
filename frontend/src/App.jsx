import './styles/App.css'
import './styles/global.css'
import MainLayout from './layouts/MainLayout'
import BookHistorySection from './components/Book/BookHistorySection'

function App() {
  return (
    <div className="app">
      <MainLayout>
        <BookHistorySection />
      </MainLayout>
    </div>
  )
}

export default App
