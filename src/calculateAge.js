export default function calculateAge (birthDate) {
	const NOW = new Date(0)
	const NOW_YEAR = NOW.getUTCFullYear()
	const NOW_MONTH = NOW.getUTCMonth()
	const NOW_DAY = NOW.getUTCDate()

	const diff = new Date(Date.now() - birthDate.getTime())

	return {
		years: Math.abs(diff.getUTCFullYear() - NOW_YEAR),
		months: Math.abs(diff.getUTCMonth() - NOW_MONTH),
		days: Math.abs(diff.getUTCDate() - NOW_DAY)
	}
}
