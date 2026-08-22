import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import { orangeStar, whiteStar, pizza, chicken, fruits, salade, blackStar } from "../components/Pictures"

const Authentification = () => {
    const [isFlipped, setIsFlipped] = useState(false)
    return (
        <div className="relative bg-[#D28E30] bg-screen w-screen h-screen overflow-hidden">
            <img src={whiteStar} alt="" className="absolute w-[69%] h-screen opacity-90" />
            <div className="absolute h-screen left-20 w-[400px] bg-black/30 backdrop-blur-sm z-10"></div>

            <img src={pizza} alt="pizza" className="absolute bottom-35 left-70 w-[200px] h-[200px] z-21 hover:scale-110 hover:rotate-12 transition-transform duration-500 drop-shadow-2xl cursor-pointer" />
            <img src={chicken} alt="chicken" className="absolute top-15 left-10 w-[400px] h-[400px] z-21 hover:scale-110 hover:-rotate-6 transition-transform duration-500 drop-shadow-2xl cursor-pointer" />
            <img src={fruits} alt="fruits" className="absolute -top-20 -right-20 w-[300px] h-[300px] z-21 hover:scale-110 hover:rotate-6 transition-transform duration-500 drop-shadow-2xl cursor-pointer" />
            <img src={salade} alt="salade" className="absolute bottom-0 left-0 w-[300px] h-[300px] z-21 hover:scale-110 hover:-rotate-12 transition-transform duration-500 drop-shadow-2xl cursor-pointer" />

            <img src={blackStar} alt="" className="absolute top-10 right-20 w-[50px] h-[50px] z-10 animate-pulse" />
            <img src={blackStar} alt="" className="absolute top-1/4 left-1/3 w-[30px] h-[30px] z-10 opacity-70 animate-bounce" style={{ animationDuration: '3s' }} />
            <img src={blackStar} alt="" className="absolute bottom-20 left-1/4 w-[60px] h-[60px] z-10 animate-pulse" style={{ animationDuration: '4s' }} />
            <img src={blackStar} alt="" className="absolute top-1/2 right-[45%] w-[25px] h-[25px] z-10 opacity-80 animate-bounce" style={{ animationDuration: '5s' }} />
            <img src={blackStar} alt="" className="absolute bottom-10 right-1/2 w-[40px] h-[40px] z-10 opacity-70 animate-pulse" />
            <img src={blackStar} alt="" className="absolute top-32 left-10 w-[45px] h-[45px] z-10 opacity-60 animate-bounce" style={{ animationDuration: '4s' }} />
            <img src={blackStar} alt="" className="absolute bottom-25 right-5 w-[45px] h-[45px] z-10 opacity-60 animate-bounce" style={{ animationDuration: '4s' }} />
            <img src={blackStar} alt="" className="absolute top-2 right-[40%] w-[45px] h-[45px] z-10 opacity-60 animate-bounce" style={{ animationDuration: '4s' }} />


            <div className="absolute bottom-0 right-0 w-full h-[90%] bg-[#fff5eb] border border-black/5 shadow-[-20px_0_50px_rgba(0,0,0,0.05)] rounded-tl-[100%] overflow-hidden z-9">
                <img src={orangeStar} alt="" className="absolute bottom-0 left-41 w-[60%] h-[86%] z-1 opacity-90" />

                <div className={`absolute right-32 top-1/2 -translate-y-1/2 z-20 w-[500px] h-[650px] rounded-[20px] border border-[#C25E0A]/50 bg-white shadow-2xl duration-700 transition-all [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""} `}>
                    <Login isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
                    <Register isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
                </div>
            </div >
        </div>
    )
}

export default Authentification