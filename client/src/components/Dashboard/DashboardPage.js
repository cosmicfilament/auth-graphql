import React, { useEffect } from 'react';

import bgnd from '../../shared/images/dashboard.png';
import { useAuthHook } from '../../shared/hooks/authHook';

const Dashboard = () => {
	const [ authenticated, goBack ] = useAuthHook();

	useEffect(
		() => {
			if (!authenticated) {
				goBack();
			}
		},
		[ authenticated, goBack ]
	);

	return (
		<section className='card row' style={{ background: 'lightyellow' }}>
			<div className='card-image col s12'>
				<img src={bgnd} style={{ padding: '5px' }} alt='bird' />
			</div>
		</section>
	);
};

export default Dashboard;
