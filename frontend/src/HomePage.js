import React from 'react'
import Header from './Header'
import StopWatch from './StopWatch';
import video from './video/VV.mp4';

const HomePage = () => {
    return (
    <>
        <Header/>
        <video src={video} width="100%" controls autoPlay loop />
        <StopWatch />
    </>
    )
}

export default HomePage