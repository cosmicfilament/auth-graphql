import React from 'react';

import bgnd from '../../shared/images/dashboard.png';

const Dashboard = () => {
	return (
		<section className='card row' style={{ background: 'lightyellow' }}>
			<div className='card-image col s12'>
				<img src={bgnd} style={{ padding: '5px' }} alt='bird' />
			</div>
		</section>
	);
};

export default Dashboard;
