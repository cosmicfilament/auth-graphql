import React from 'react';
import bgnd from '../../shared/images/sandpiper.png';

const LandingPage = props => {
	return (
		<section className='card row' style={{ background: 'lightyellow' }}>
			<div className='card-image col s12'>
				<img src={bgnd} style={{ padding: '5px' }} alt='bird' />
			</div>
		</section>
	);
};

export default LandingPage;
