import React from 'react';
import Tilt from 'react-tilt';
import Cube from './CubeMolecule.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 110, width: 110 }} >
 				<div className="Tilt-inner pa2"><img style={{padding: '2px 0px 0px 2px'}} alt='logo' src={Cube}/></div>
			</Tilt>
		</div>
	)
}

export default Logo;