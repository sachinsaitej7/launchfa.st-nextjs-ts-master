import React from 'react'

const IconHamburger: React.FC = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <polyline
        fill="none"
        strokeWidth="1.2"
        points="2 12, 16 12"
        strokeLinecap="round"
        strokeLinejoin="round"
        id="globalnav-menutrigger-bread-bottom"
        className="globalnav-menutrigger-bread globalnav-menutrigger-bread-bottom stroke-launchfast"
      >
        <animate
          dur="0.24s"
          fill="freeze"
          calcMode="spline"
          begin="indefinite"
          keyTimes="0;0.5;1"
          attributeName="points"
          keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
          values=" 2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5"
          id="globalnav-anim-menutrigger-bread-bottom-open"
        ></animate>
        <animate
          dur="0.24s"
          fill="freeze"
          calcMode="spline"
          keyTimes="0;0.5;1"
          begin="indefinite"
          attributeName="points"
          keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
          values=" 3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12"
          id="globalnav-anim-menutrigger-bread-bottom-close"
        ></animate>
      </polyline>
      <polyline
        fill="none"
        strokeWidth="1.2"
        points="2 5, 16 5"
        strokeLinecap="round"
        strokeLinejoin="round"
        id="globalnav-menutrigger-bread-top"
        className="globalnav-menutrigger-bread globalnav-menutrigger-bread-top stroke-launchfast"
      >
        <animate
          dur="0.24s"
          fill="freeze"
          calcMode="spline"
          keyTimes="0;0.5;1"
          begin="indefinite"
          attributeName="points"
          keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
          id="globalnav-anim-menutrigger-bread-top-open"
          values=" 2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15"
        ></animate>
        <animate
          dur="0.24s"
          fill="freeze"
          calcMode="spline"
          begin="indefinite"
          keyTimes="0;0.5;1"
          attributeName="points"
          keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"
          values=" 3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5"
          id="globalnav-anim-menutrigger-bread-top-close"
        ></animate>
      </polyline>
    </svg>
  )
}

export default IconHamburger
