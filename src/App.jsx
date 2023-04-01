import AgeCalculator from './components/AgeCalculator'
import Footer from './components/Footer'
import './styles/App.css'

export default function App () {
	return (
		<>
			<h1 className='hidden'>Age calculator</h1>
			<AgeCalculator />
			<Footer />
		</>
	)
}
