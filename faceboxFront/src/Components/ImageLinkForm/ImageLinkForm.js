import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmitImage, onImagePressEnter }) => {
	return (
		<div>
			<p className='f3'>
				{'This Magic Box will detect faces in your pictures. Give it a try!'}
			</p>
			<div  className='center'>
				<div className='form pa4 br3 shadow-5 center'>
					<input className="f4 pa2 w-70 center" type='text' onChange={onInputChange} onKeyPress={onImagePressEnter}/>
					<button className='w-30 gro f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmitImage} >Detect</button>
				</div>
			</div>
		</div>
	)
}

export default ImageLinkForm;