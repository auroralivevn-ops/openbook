import './App.css'
import Hero from './components/Hero'
import FormCOD from './components/FormCOD'
import BookShowcase from './components/BookShowcase'
import Reviews from './components/Reviews'
import BookInfo from './components/BookInfo'
import DiscountCode from './components/DiscountCode'

function App() {
  return (
    <div className="max-w-[430px] mx-auto pb-24 bg-[#FFFBF5] min-h-screen">
      <Hero />
      <BookShowcase />
      <FormCOD />
      <Reviews />
      <BookInfo />
      <DiscountCode />
    </div>
  )
}

export default App