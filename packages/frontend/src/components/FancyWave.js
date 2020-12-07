import React from "react"


const FancyWave = () => {

    return(
        <div class="wave-main-wrapper">
            <div class="waveWrapper waveAnimation">
            <div class="waveWrapperInner bgTop">
                <div class="wave waveTop"></div>
            </div>
            <div class="waveWrapperInner bgMiddle">
            <div class="wave waveMiddle"></div>
            </div>
            <div class="waveWrapperInner bgBottom">
                <div class="wave waveBottom"></div>
            </div>
            </div>
        </div>
    )
}

export default FancyWave;