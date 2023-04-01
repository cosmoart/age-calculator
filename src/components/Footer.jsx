import { useState } from 'react'
import infoIcon from '../assets/icons/info.svg'
import linkIcon from '../assets/icons/link.svg'
import '../styles/Footer.css'

export default function Footer () {
	const [showInfo, setShowInfo] = useState(false)

	return (
		<footer className='footer'>
			<button className='info' onClick={() => setShowInfo(!showInfo)}>
				<img src={infoIcon} alt='Info' />
			</button>
			<p className={showInfo ? '' : 'info-hidden'}>
				<span>Created by </span>
				<a href='https://github.com/cosmoart' target='_blank' rel='noreferrer'>
					<span className='purple_text'>Cosmo</span>
				</a>
				<span> - </span>
				<a href='https://github.com/cosmoart/age-calculator' target='_blank' rel='noreferrer'>
					<span className='purple_text'>Repository </span>
					<img src={linkIcon} alt='' />
				</a>
			</p>
		</footer>
	)
}
