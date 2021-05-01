import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

export default function AutoTextSize(props) {
  const { children } = props;

  const MIN_SIZE = 10;
  const MAX_SIZE = 68;

  const [size, setSize] = useState(68);
  const textRef = useRef(null);

  useEffect(() => {
    const parentContainerWidth = textRef.current.parentNode.clientWidth;
    const currentTextWidth = textRef.current.scrollWidth;
    const { fontSize } = getComputedStyle(textRef.current);

    const currentFontSize = parseInt(fontSize, 10);
    const newValue = Math.min(
      Math.max(
        MIN_SIZE,
        (parentContainerWidth / currentTextWidth) * currentFontSize
      ),
      MAX_SIZE
    );
    setSize(newValue);
  }, [children]);

  return (
    <div
      style={{
        fontSize: `${Math.floor(size)}px`,
      }}
      ref={textRef}
    >
      {children}
    </div>
  );
}

AutoTextSize.propTypes = {
  children: PropTypes.number,
};
AutoTextSize.defaultProps = {
  children: 0,
};
