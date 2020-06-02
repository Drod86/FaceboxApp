import React from 'react';
import './Facebox.css';

const Facebox = ({ imageUrl, box }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
				<div className='bounding-box' 
					style={
						{
							top: box.t,
							right: box.r,
							bottom: box.b,
							left: box.l
						}
					}>
				</div>
			</div>
		</div>
	)
}

export default Facebox;