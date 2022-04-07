import React from 'react';
import UserCodePythonCard from '../../Components/CodeCard/codeCard';
import ImageCardWithFlip from '../../Components/ImageCard/imageCard';
import HomeHeader from "../../Components/MenuBar/menuBar";
import './landingPage.css';
import Typewriter from 'typewriter-effect';


function LandingPage() {
    return (
        <div>
            <HomeHeader></HomeHeader>
            <section className='landing'>
                <div className='content-fill flex-2'>
                    <div className='content-1'>
                        <ImageCardWithFlip></ImageCardWithFlip>
                    </div>
                    <div className='content-1'>
                        <LandingTextSection></LandingTextSection>
                    </div>
                </div>
                <div className='content-fill flex-1'>
                    <div className='type-writer'>
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter.typeString('Maxwell Martins Dalboni, Software Engineer')                                    
                                    .pauseFor(5000)                                    
                                    .typeString('<br>... and a terrible UI/UX ¯\\_(ツ)_/¯')
                                    .start();
                            }}
                            options={{                                
                                autoStart: true,
                                loop: false,
                                delay: 35
                            }}
                        />
                    </div>
                </div>
            </section>
        </div >
    );
}

function LandingTextSection() {
    const data = {
        name: 'Maxwell M Dalboni',
        varname: 'mdalboni',
        nationality: 'Brazilian',
        livingIn: 'Brazil',
        birthYear: 1992,
        spokenLangs: ['ptBR', 'en'],
        progLangs: ['Python', 'Dart(Flutter)', 'Java', 'Swift'],
        databases: ['SQL', 'noSQL'],
        wishes: 'Great TechLord',
        optional: ' # rich is an option too...'
    }
    return <UserCodePythonCard {...data}></UserCodePythonCard>;
}

export default LandingPage;