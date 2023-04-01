import { useState } from 'react'
import calculateAge from '../calculateAge'
import iconArrow from '../assets/icons/arrow.svg'

export default function AgeCalculator () {
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
		// Check if the date is valid
		if (day === '') handleError('day', 'Day is required')
		else {
			const daysInMonth = new Date(year, month, 0).getDate() || 31
			if (day > daysInMonth) handleError('day', `There are only ${daysInMonth} days`)
			else if (day < 1) {
				handleError('day', 'Must be a valid day')
				console.log('Error')
			} else handleError('day', '', 'remove')
		}
		if (month === '') handleError('month', 'Month is required')
		else {
			if (month > 12) handleError('month', 'There are only 12 months')
			else if (month < 1) handleError('month', 'Must be a valid month')
			else handleError('month', '', 'remove')
		}
		if (year === '') handleError('year', 'Year is required')
		else {
			if (year > new Date().getFullYear()) handleError('year', 'Must be in the past')
			else if (year < 100) handleError('year', 'Must be more than 100')
			else handleError('year', '', 'remove')
		}

		// Check if the date is in the future
		if (year === new Date().getFullYear()) {
			if (month === new Date().getMonth() + 1) {
				if (day > new Date().getDate()) handleError('day', 'Must be in the past')
			} else if (month > new Date().getMonth() + 1) {
				handleError('month', 'Must be in the past')
			}
		}
	}

	function changueAge ({ year, month, day }) {
		const ageResult = calculateAge(new Date(`${year}-${month}-${day}`))
		let { days, months, years } = age

		// Calculate the max number of interactions to animate the numbers
		const daysInteractions = ageResult.days > days ? ageResult.days - days : days - ageResult.days
		const monthsInteractions = ageResult.months > months ? ageResult.months - months : months - ageResult.months
		const yearsInteractions = ageResult.years > years ? ageResult.years - years : years - ageResult.years
		const maxInteractions = Math.max(daysInteractions, monthsInteractions, yearsInteractions)

		const animateNumbers = setInterval(() => {
			if (days !== ageResult.days) days > ageResult.days ? days-- : days++
			if (months !== ageResult.months) months > ageResult.months ? months-- : months++
			if (years !== ageResult.years) years > ageResult.years ? years-- : years++

			setAge({ days, months, years })

			if (ageResult.days === days && ageResult.months === months && ageResult.years === years) {
				clearInterval(animateNumbers)
			}
		}, Number((300 / maxInteractions).toFixed(1)))
	}

	function handleSubmit (e) {
		e.preventDefault()
		const { day, month, year } = e.target.elements
		const inputDate = {
			day: Number(day.value),
			month: Number(month.value),
			year: Number(year.value)
		}

		checkErrors(inputDate)
		if (document.querySelectorAll('.input--error').length > 0) return
		changueAge(inputDate)
	}

	return (
		<main>
			<form onSubmit={handleSubmit} className='age-form'>
				<div className='age-form-input'>
					<label>
						<span>Day</span>
						<input type='number' name='day' id='day' placeholder='DD' />
						<span className='error-info info--hidden' aria-live='polite'></span>
					</label>
					<label>
						<span>Month</span>
						<input type='number' name='month' id='month' placeholder='MM' />
						<span className='error-info info--hidden' aria-live='polite'></span>
					</label>
					<label>
						<span>Year</span>
						<input type='number' name='year' id='year' placeholder='YYYY' />
						<span className='error-info info--hidden' aria-live='polite'></span>
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
