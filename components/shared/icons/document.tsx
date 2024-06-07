/* eslint-disable require-jsdoc */
/* eslint-disable jsdoc/require-jsdoc */
export default function Document({
  width = 22,
  height = 22,
  fill = 'black',
}: {
  width?: number,
  height?: number,
  fill?: string,
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0.00 0.00 512.00 512.00" width={width} height={height}>
      <path fill={fill} d="
  M 101.80 0.00
  L 342.26 0.00
  Q 345.60 0.75 347.43 2.58
  Q 407.16 62.30 466.43 121.83
  Q 469.32 124.74 469.32 128.79
  Q 469.33 290.04 469.33 450.16
  C 469.33 457.92 465.76 460.91 457.97 460.85
  Q 437.94 460.71 418.43 460.82
  A 0.31 0.30 0.0 0 0 418.12 461.12
  Q 418.12 481.99 418.12 502.75
  Q 418.12 510.54 410.18 512.00
  L 50.45 512.00
  Q 42.67 510.47 42.67 503.25
  Q 42.67 278.29 42.67 47.16
  Q 42.67 41.34 43.49 39.33
  C 45.27 34.94 49.44 34.06 53.73 34.08
  Q 75.55 34.17 93.54 34.11
  A 0.35 0.35 0.0 0 0 93.88 33.76
  Q 93.88 21.69 93.96 9.50
  Q 94.02 1.47 101.80 0.00
  Z
  M 341.71 136.52
  C 336.29 136.52 332.80 132.39 332.80 127.00
  Q 332.79 71.25 332.79 17.53
  A 0.49 0.48 90.0 0 0 332.31 17.04
  L 111.59 17.04
  Q 110.96 17.04 110.96 17.66
  L 110.96 443.22
  Q 110.96 443.73 111.47 443.73
  L 452.02 443.73
  A 0.25 0.25 0.0 0 0 452.27 443.48
  L 452.27 137.00
  Q 452.27 136.53 451.80 136.53
  Q 431.72 136.54 341.71 136.52
  Z
  M 350.43 29.68
  A 0.32 0.32 0.0 0 0 349.88 29.90
  L 349.88 119.15
  A 0.32 0.32 0.0 0 0 350.20 119.47
  L 439.41 119.47
  A 0.32 0.32 0.0 0 0 439.63 118.92
  L 350.43 29.68
  Z
  M 103.01 460.80
  C 97.70 460.80 93.88 456.98 93.88 451.65
  Q 93.87 215.23 93.89 51.60
  A 0.40 0.39 0.0 0 0 93.49 51.21
  L 60.26 51.21
  Q 59.73 51.21 59.73 51.74
  L 59.73 494.47
  A 0.49 0.49 0.0 0 0 60.22 494.96
  L 400.54 494.96
  A 0.50 0.50 0.0 0 0 401.04 494.46
  L 401.04 461.21
  A 0.41 0.41 0.0 0 0 400.63 460.80
  Q 253.82 460.78 103.01 460.80
  Z"
      />
      <path fill={fill} d="
  M 213.2858 136.2495
  A 8.86 8.86 0.0 0 1 204.4104 145.0941
  L 153.8505 145.0058
  A 8.86 8.86 0.0 0 1 145.0059 136.1304
  L 145.0942 85.5905
  A 8.86 8.86 0.0 0 1 153.9696 76.7459
  L 204.5295 76.8342
  A 8.86 8.86 0.0 0 1 213.3741 85.7096
  L 213.2858 136.2495
  Z
  M 196.26 94.23
  A 0.35 0.35 0.0 0 0 195.91 93.88
  L 162.47 93.88
  A 0.35 0.35 0.0 0 0 162.12 94.23
  L 162.12 127.65
  A 0.35 0.35 0.0 0 0 162.47 128.00
  L 195.91 128.00
  A 0.35 0.35 0.0 0 0 196.26 127.65
  L 196.26 94.23
  Z"
      />
      <rect fill={fill} x="145.27" y="162.22" width="33.72" height="16.88" rx="8.03"/>
      <rect fill={fill} x="196.39" y="162.13" width="221.60" height="17.06" rx="8.46"/>
      <rect fill={fill} x="-16.85" y="-8.46" transform="translate(162.14,221.87) rotate(-0.1)" width="33.70" height="16.92" rx="8.04"/>
      <rect fill={fill} x="196.39" y="213.33" width="221.60" height="17.08" rx="8.47"/>
      <rect fill={fill} x="-16.85" y="-8.44" transform="translate(162.13,273.05) rotate(0.1)" width="33.70" height="16.88" rx="8.02"/>
      <rect fill={fill} x="196.39" y="264.51" width="221.60" height="17.06" rx="8.45"/>
      <rect fill={fill} x="145.26" y="315.83" width="33.74" height="16.86" rx="8.02"/>
      <rect fill={fill} x="196.39" y="315.74" width="221.62" height="17.04" rx="8.45"/>
      <rect fill={fill} x="145.26" y="367.05" width="33.74" height="16.86" rx="8.01"/>
      <rect fill={fill} x="196.38" y="366.97" width="221.62" height="17.02" rx="8.44"/>
    </svg>
  )
}