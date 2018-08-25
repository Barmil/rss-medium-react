import React from 'react';
import SleepingImage from '../../resources/images/sleeping.svg';
import UfoImage from '../../resources/images/ufo.svg';
import {ResponseStatuses} from '../../ApiGateway/AxiosApiGateway';
import './error.css';
import SnowStorm from 'react-snowstorm';

const errorTemplate = {
	[ResponseStatuses.NotFound]: {
		title: 'Ohh!',
		message: 'The page you were looking for is missing',
		image: SleepingImage
	},
	[ResponseStatuses.OtherError]: {
		title: 'Damn!',
		message: 'Couldn\'t get the feed, try again?',
		image: UfoImage
	}
}

const notFoundError = ({status}) => {
	let templateFromStatus = errorTemplate[status];
	if(!templateFromStatus)
	{
		console.warn('Unsopported status in error component, using default');
		templateFromStatus = errorTemplate[ResponseStatuses.OtherError]
	}
	return (<div className="error-componenet">
		<SnowStorm />
		<img className="error-image" src={templateFromStatus.image} alt="error executing" />
		<div>
			<h1>{templateFromStatus.title}</h1>
			<p>{templateFromStatus.message}</p>
		</div>
	</div>);
}
	
export default notFoundError;