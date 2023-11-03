import Navigation from "./Navigation";
import View from "./View";
import Themes from "./Themes";
import { useState } from 'react'
import kofi from '../assets/kofi-logo.png'
type ProfileProps = {
  logout: (p: string | null) => void,
}

export default function Profile({ logout }: ProfileProps) {

  const [feature, setFeature] = useState('home')


  return (
    <div className="flex h-screen w-full">

      <div className="grid bg-base-300 px-2 py-3">
        {/* Nav & Logo container */}
        <span className="place-self-start justify-self-center text-center w-full">
          <span className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 281.000000 109.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,109.000000) scale(0.100000,-0.100000)" fill="#4086f7" stroke="none">
                <path d="M2463 979 c-65 -69 -93 -117 -93 -162 0 -73 52 -52 108 42 22 38 27 41 33 25 11 -29 10 -330 -2 -403 -12 -74 -50 -159 -88 -195 -40 -38 -195 -52 -379 -36 -74 7 -148 13 -166 14 -20 1 -31 7 -30 17 1 7 20 90 43 183 36 149 40 172 27 185 -12 12 -18 12 -30 2 -19 -16 -30 -55 -52 -173 -9 -48 -20 -86 -24 -83 -4 2 -30 51 -58 107 -58 119 -86 158 -112 158 -30 0 -30 -27 -1 -63 15 -20 44 -76 65 -126 24 -57 48 -100 67 -115 46 -39 38 -96 -13 -96 -84 0 -170 -55 -189 -120 -23 -78 13 -122 101 -122 30 0 62 7 82 19 28 16 36 30 54 93 l21 75 39 -1 c21 -1 96 -7 165 -13 134 -12 273 -8 353 10 34 8 60 23 88 51 79 79 108 192 108 418 l0 130 40 -26 c49 -32 107 -37 124 -11 9 15 7 21 -8 33 -11 8 -30 14 -42 14 -37 0 -74 39 -114 125 -21 45 -46 85 -54 88 -10 4 -32 -12 -63 -44z m71 -41 c26 -37 20 -49 -13 -30 -28 16 -31 15 -50 -2 -28 -25 -27 -11 2 24 27 35 41 37 61 8z m-760 -750 c-26 -86 -47 -109 -99 -111 -48 -1 -61 14 -46 51 9 22 28 37 69 56 72 32 85 33 76 4z" />
                <path d="M2139 877 c-58 -31 -91 -89 -98 -176 -6 -61 -8 -67 -36 -81 l-30 -15 33 -3 32 -3 0 -97 c0 -120 -5 -138 -39 -151 -20 -7 -2 -9 74 -9 69 0 90 2 68 8 -59 14 -63 22 -63 141 l0 109 45 0 c38 0 45 3 45 20 0 17 -7 20 -46 20 l-47 0 5 85 c4 71 8 89 27 109 31 32 65 37 108 15 29 -15 39 -16 45 -6 14 22 8 37 -18 47 -38 15 -56 12 -105 -13z" />
                <path d="M105 599 c-38 -115 -78 -217 -87 -226 -31 -28 -20 -33 60 -32 71 1 74 2 39 11 -21 6 -41 16 -44 24 -3 7 7 49 22 94 l27 80 73 0 c60 0 74 -3 80 -17 4 -10 18 -48 30 -85 26 -74 24 -79 -35 -96 -29 -8 -14 -10 80 -11 l115 0 -35 17 c-37 18 -29 -2 -166 380 -25 69 -27 72 -58 72 l-31 -1 -70 -210z m119 77 c36 -95 36 -96 -29 -96 -30 0 -55 3 -55 7 0 13 52 164 55 161 2 -2 15 -34 29 -72z" />
                <path d="M1228 800 c19 -4 38 -12 44 -18 14 -14 11 -392 -4 -409 -6 -7 -25 -17 -42 -22 -22 -6 22 -9 145 -10 l175 -1 24 48 c36 70 36 71 -8 25 l-40 -43 -86 0 c-47 0 -86 3 -86 8 -5 201 -4 396 1 404 4 6 27 15 51 18 29 5 1 8 -82 8 -82 0 -114 -3 -92 -8z" />
                <path d="M2236 650 c-41 -42 -45 -50 -27 -50 20 0 21 -4 21 -114 0 -112 1 -115 26 -135 35 -28 56 -26 93 5 42 35 39 48 -5 22 -53 -31 -62 -16 -66 115 l-3 107 53 0 c45 0 52 3 52 20 0 17 -7 20 -51 20 l-51 0 6 30 c3 17 4 30 3 30 -1 0 -24 -23 -51 -50z" />
                <path d="M505 642 c-47 -24 -48 -26 -25 -32 l25 -6 3 -222 2 -221 -27 -15 c-27 -15 -24 -15 60 -16 56 0 86 4 82 10 -3 6 -14 10 -24 10 -33 0 -41 22 -41 108 l0 83 44 -6 c120 -18 208 108 162 230 -32 81 -86 103 -161 65 -22 -11 -40 -20 -41 -20 -2 0 -4 13 -6 29 l-3 29 -50 -26z m159 -32 c41 -15 66 -66 66 -133 0 -96 -49 -140 -128 -114 l-37 12 0 110 c0 107 1 110 25 122 30 15 41 16 74 3z" />
                <path d="M878 646 c-53 -23 -59 -33 -25 -38 22 -3 22 -3 25 -226 l2 -222 -27 -12 c-27 -12 -27 -13 20 -16 26 -2 67 -2 90 0 l42 3 -35 11 -35 10 -3 93 -3 93 40 -7 c111 -19 203 95 172 212 -25 91 -83 121 -164 85 l-46 -20 -3 27 -3 27 -47 -20z m161 -41 c37 -19 61 -71 61 -134 0 -42 -5 -56 -29 -83 -22 -25 -36 -32 -63 -31 -73 2 -78 11 -78 133 l0 108 28 10 c38 14 49 14 81 -3z" />
              </g>
            </svg>
            {/* Ko-fi logo */}
            <div className="mt-3 hover:animate-bounce">
              <a href="https://ko-fi.com/AppLyft" target="_blank">
                <img src={kofi} width="28px" alt="ko-fi logo link to support page" />
              </a>
            </div>
          </span>
          <div className="divider mt-0 mb-2"></div>
          <Navigation toggleFeature={setFeature} />
        </span>
        {/* Themes container */}
        <span className="place-self-end flex flex-col">
          <Themes />
          <button className="btn btn-sm btn-error mt-2" onClick={() => logout(null)}>Logout</button>
        </span>
      </div>

      <div className="divider divider-horizontal "></div>
      {/* View container */}
      <div className="grid h-screen flex-grow card place-items-center">
        <View feature={feature} setFeature={setFeature} />
      </div>
    </div>
  )
}