import { useState } from 'react'
import iconArrow from './assets/images/icon-arrow.svg'
import './App.css'

export default function App () {
	const [age, setAge] = useState({
		days: null,
		months: null,
		years: null
	})

	const [dateOfBirth, setDateOfBirth] = useState({
		day: null,
		month: null,
		year: null
	})

	function calculateAge (day, month, year) {
		const today = new Date()
		const birthDate = new Date(year, month, day)
		let years = today.getFullYear() - birthDate.getFullYear()
		const months = today.getMonth() - birthDate.getMonth()
		const days = today.getDate() - birthDate.getDate()

		if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
			years--
		}

		return {
			days,
			months,
			years
		}
	}

	function handleInput (e) {
		const { name, value } = e.target

		if (name === 'day') {
			if (value > 31) e.target.value = 31
			if (value < 1) e.target.value = 1
		}

		if (name === 'month') {
			if (value > 12) e.target.value = 12
			if (value < 1) e.target.value = 1
		}

		if (name === 'year') {
			if (value > new Date().getFullYear()) e.target.value = new Date().getFullYear()
			if (value < 100) e.target.value = 100
		}
	}

	const handleError = (t, message = 'Error', type = 'add') => {
		const target = document.querySelector(`[name="${t}"]`)
		target.nextElementSibling.innerHTML = message
		target.nextElementSibling.classList[type === 'add' ? 'remove' : 'add']('info--hidden')
		target.classList[type]('input--error')
	}

	function handleSubmit (e) {
		e.preventDefault()

		if (e.target.elements.day.value === '') return handleError('day', 'Day is required')
		if (e.target.elements.month.value === '') return handleError('month', 'Month is required')
		if (e.target.elements.year.value === '') return handleError('year', 'Year is required')
		const { day, month, year } = e.target.elements
		const age = calculateAge(day.value, month.value, year.value)
		console.log(age)
		setAge(age)
	}

	return (
		<main className='App'>
			<h1 className='hidden'>Age calculator</h1>

			<form onSubmit={handleSubmit} className='age-form'>
				<div className='age-form-input'>
					<label>
						Day
						<input type='number' name='day' id='day' placeholder='DD' onChange={handleInput} />
						<p className='info info--hidden' aria-live='polite'></p>
					</label>
					<label>
						Month
						<input type='number' name='month' id='month' placeholder='MM' onChange={handleInput} />
						<p className='info info--hidden' aria-live='polite'></p>
					</label>
					<label>
						Year
						<input type='number' name='year' id='year' placeholder='YYYY' onChange={handleInput} />
						<p className='info info--hidden' aria-live='polite'></p>
					</label>
				</div>
				<div className='padre'>
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
