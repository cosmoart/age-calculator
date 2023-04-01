import { useState } from 'react'
import calculateAge from './calculateAge'
import iconArrow from './assets/images/icon-arrow.svg'
import './App.css'

export default function App () {
	const [age, setAge] = useState({ days: null, months: null, years: null })

	const handleError = (t, message = 'Error', type = 'add') => {
		const target = document.querySelector(`[name="${t}"]`)
		target.nextElementSibling.innerHTML = message
		target.nextElementSibling.classList[type === 'add' ? 'remove' : 'add']('info--hidden')

		target.parentElement.classList[type]('input--error')
		target.parentElement.classList[type]('shake')
		target.parentElement.addEventListener('animationend', () => target.parentElement.classList.remove('shake'))
	}

	function checkErrors ({ day, month, year }) {
		if (day.value === '') handleError('day', 'Day is required')
		else {
			const daysInMonth = new Date(year.value, month.value, 0).getDate() || 31
			if (day.value > daysInMonth) handleError('day', `There are only ${daysInMonth} days`)
			else if (day.value < 1) handleError('day', 'Must be a valid day')
			else handleError('day', '', 'remove')
		}
		if (month.value === '') handleError('month', 'Month is required')
		else {
			if (month.value > 12) handleError('month', 'There are only 12 months')
			else if (month.value < 1) handleError('month', 'Must be a valid month')
			else handleError('month', '', 'remove')
		}
		if (year.value === '') handleError('year', 'Year is required')
		else {
			if (year.value > new Date().getFullYear()) handleError('year', 'Must be in the past')
			else if (year.value < 100) handleError('year', 'Must be more than 100')
			else handleError('year', '', 'remove')
		}
	}

	function handleSubmit (e) {
		e.preventDefault()
		const { day, month, year } = e.target.elements
		checkErrors({ day, month, year })

		if (document.querySelectorAll('.input--error').length > 0) return
		setAge(calculateAge(new Date(`${year.value}-${month.value}-${day.value}`)))
	}

	return (
		<main className='App'>
			<h1 className='hidden'>Age calculator</h1>

			<form onSubmit={handleSubmit} className='age-form'>
				<div className='age-form-input'>
					<label>
						<span>Day</span>
						<input type='number' name='day' id='day' placeholder='DD' />
						<p className='error-info info--hidden' aria-live='polite'></p>
					</label>
					<label>
						<span>Month</span>
						<input type='number' name='month' id='month' placeholder='MM' />
						<p className='error-info info--hidden' aria-live='polite'></p>
					</label>
					<label>
						<span>Year</span>
						<input type='number' name='year' id='year' placeholder='YYYY' />
						<p className='error-info info--hidden' aria-live='polite'></p>
					</label>
				</div>
				<div className='submit'>
					<button type='submit' className='age-submit' title='Calculate age'>
						<img src={iconArrow} alt='Calculate age' />
					</button>
				</div>
				<output className='age-result'>
					<span className='purple_text'>{age.years === null ? '--' : age.years}</span> years <br />
					<span className='purple_text'>{age.months === null ? '--' : age.months}</span> months <br />
					<span className='purple_text'>{age.days === null ? '--' : age.days}</span> days
				</output>
			</form>
		</main>
	)
}
