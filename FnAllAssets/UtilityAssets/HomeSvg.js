import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      width={props.width}
      height={props.height}
      viewBox="0 0 1456 1453"
      {...props}>
      <Path
        d="M339.132 3.777l852.553 127.648C1341.129 153.801 1456 286.62 1456 427.4v1017.053c0 4.721-3.828 8.547-8.555 8.547H11.687C5.236 1453 0 1448.523 0 1443V253C0 87.088 155.914-23.656 339.132 3.777z"
        fill="#1c1c1b"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default SvgComponent;
