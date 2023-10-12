import React from 'react'
import { ILive } from '../../../models/LiveStream';
import { IRadio } from '../../../models/Radio';
import './Controls.css'

type TProps = {
    steam: ILive | IRadio;
    mute: boolean;
    isPlaying: boolean;
    volume: number;
    toggleSettings: () => void;
    togglePlay: () => void;
    toggleMute: () => void;
    toggleFullScreen: () => void;
    handleVolumeChange: (value: number) => void;

}

export default function Controls({steam, isPlaying, mute, volume, togglePlay, toggleSettings, toggleMute, toggleFullScreen, handleVolumeChange: handleVolumeChangeInner }: TProps) {

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        handleVolumeChangeInner(newVolume);
    };

    const backgroundSize = `${volume * 100}% 100%`;


    console.log('!!!!!!!!!!!!!')
    console.log(steam)


    return (
        <div className="controls">
            <div className="row gap-25">
                <button onClick={togglePlay} >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                        {isPlaying ?
                            <>
                                <rect x="3" y="2" width="7" height="20" rx="3.5" fill="white" />
                                <rect x="14" y="2" width="7" height="20" rx="3.5" fill="white" />
                            </>
                            :
                            <path d="M13.9459 5.48294C18.4594 8.17021 20.7162 9.51385 20.9667 11.4761C21.0111 11.8239 21.0111 12.1761 20.9667 12.5239C20.7162 14.4862 18.4594 15.8298 13.9459 18.5171C9.43245 21.2043 7.1757 22.548 5.40253 21.7905C5.0883 21.6563 4.79249 21.4802 4.52266 21.2667C3 20.0618 3 17.3745 3 12C3 6.62546 3 3.93819 4.52266 2.73331C4.79249 2.51979 5.0883 2.34367 5.40253 2.20945C7.1757 1.45203 9.43245 2.79567 13.9459 5.48294Z" fill="white" />
                        }
                    </svg>
                </button>
                <div className="row">
                    <button onClick={toggleMute}>

                        {mute || volume === 0 ?
                            <svg width="32" height="32" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.33331 6.96059C3.49237 6.9606 2 8.45298 2 10.2939V14.6846C2 16.5255 3.49238 18.0179 5.33333 18.0179H7.40773C8.04783 18.0179 8.66657 18.2481 9.15096 18.6666L13.5901 22.5013C15.3178 23.9938 18 22.7664 18 20.4833V4.49508C18 2.21197 15.3178 0.984596 13.5901 2.47709L10 5.57839M28.9902 9.17281L23.3333 14.8297M28.9902 14.8297L23.3333 9.17286" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            :
                            (volume <= 0.7 ?
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.33331 10.96C5.49237 10.96 4 12.4524 4 14.2933V18.6839C4 20.5249 5.49238 22.0173 7.33333 22.0173H9.40773C10.0478 22.0173 10.6666 22.2475 11.151 22.666L15.5901 26.5007C17.3178 27.9932 20 26.7658 20 24.4827V8.49447C20 6.21136 17.3178 4.98399 15.5901 6.47648L12.2825 9.3337" stroke="white" stroke-width="2.5" stroke-linecap="round" />
                                    <path d="M24 20.4893C24.8372 19.375 25.3333 17.9901 25.3333 16.4893C25.3333 14.9884 24.8372 13.6035 24 12.4893" stroke="white" stroke-width="2.5" stroke-linecap="round" />
                                </svg>
                                :

                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.33331 10.9599C5.49237 10.9599 4 12.4523 4 14.2932V18.6838C4 20.5248 5.49238 22.0172 7.33333 22.0172H9.40773C10.0478 22.0172 10.6666 22.2474 11.151 22.6658L15.5901 26.5006C17.3178 27.9931 20 26.7657 20 24.4826V8.49434C20 6.21123 17.3178 4.98386 15.5901 6.47636L12.2825 9.33358" stroke="white" stroke-width="2.5" stroke-linecap="round" />
                                    <path d="M24 20.4893C24.8372 19.375 25.3333 17.9901 25.3333 16.4893C25.3333 14.9884 24.8372 13.6035 24 12.4893" stroke="white" stroke-width="2.5" stroke-linecap="round" />
                                    <path d="M26.6667 24.4893C28.3411 22.2608 29.3334 19.4909 29.3334 16.4893C29.3334 13.4876 28.3411 10.7177 26.6667 8.48926" stroke="white" stroke-width="2.5" stroke-linecap="round" />
                                </svg>
                            )

                        }
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                        style={{ backgroundSize }}
                    />
                </div>
            </div>
            <div className="row gap-25">
             {steam.media?.hls &&  <button onClick={toggleSettings} >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="3" r="3" transform="matrix(-1 0 0 1 15 9)" stroke="white" stroke-width="2" />
                        <path d="M17.7516 5.32987C18.067 5.35581 18.383 5.33129 18.6875 5.2595C19.0155 5.18215 19.3769 5.24076 19.5962 5.49671C20.3974 6.4317 21.0289 7.51632 21.4432 8.70289C21.5684 9.0617 21.3863 9.44185 21.093 9.68352C20.4252 10.2338 19.9995 11.0672 19.9995 12C19.9995 12.9328 20.4252 13.7662 21.093 14.3165C21.3863 14.5581 21.5684 14.9383 21.4432 15.2971C21.029 16.4835 20.3975 17.5681 19.5965 18.503C19.3772 18.759 19.0157 18.8176 18.6876 18.7402C17.9699 18.5709 17.1886 18.6643 16.4995 19.0621C15.7496 19.4951 15.2574 20.2029 15.0765 20.9848C15.0005 21.3136 14.7875 21.6122 14.4603 21.695C13.6731 21.8942 12.8486 22 11.9995 22C11.1503 22 10.3259 21.8942 9.53873 21.695C9.21153 21.6122 8.99855 21.3137 8.9225 20.9848C8.8692 20.7544 8.78886 20.5304 8.68285 20.318M15.3556 3.75789C15.23 3.52319 15.1364 3.27319 15.0766 3.01511C15.0006 2.68633 14.7876 2.38787 14.4604 2.30508C13.6732 2.10585 12.8487 2 11.9995 2C11.1503 2 10.3259 2.10584 9.53865 2.30504C9.21149 2.38783 8.99851 2.6863 8.92244 3.01508C8.74154 3.79691 8.2493 4.5046 7.4995 4.9375C6.81048 5.33531 6.02925 5.42873 5.31152 5.25948C4.98345 5.18212 4.62205 5.24072 4.40272 5.49667C3.60155 6.43167 2.97 7.5163 2.55576 8.70287C2.4305 9.06169 2.61258 9.44184 2.9059 9.68351C3.57371 10.2337 3.99949 11.0671 3.99949 12C3.99949 12.9329 3.57371 13.7663 2.9059 14.3165C2.61258 14.5582 2.4305 14.9383 2.55576 15.2971C2.96995 16.4836 3.60141 17.5681 4.40246 18.503C4.62179 18.759 4.98324 18.8176 5.31134 18.7402C5.65076 18.6601 6.00439 18.6388 6.35576 18.6807" stroke="white" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </button>}

                <button onClick={toggleFullScreen}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.85V5C19 2.79086 17.2091 1 15 1H13.15M19 13.15V15C19 17.2091 17.2091 19 15 19H13.15M6.85 19H5C2.79086 19 1 17.2091 1 15V13.15M1 6.85V5C1 2.79086 2.79086 1 5 1H6.85" stroke="white" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </button>

            </div>
        </div>

    )
}
