import React from 'react';
import { FaArrowDown } from 'react-icons/fa';  // 내려가는 화살표 아이콘

const ScrollIndicator = () => {
    return (
        <div style={styles.container}>
            {/* <div style={styles.scrollText}>Scroll Down</div> */}
            <FaArrowDown style={styles.arrow} />
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 10,
    },
    scrollText: {
        fontSize: '16px',
        marginBottom: '8px',
    },
    arrow: {
        fontSize: '24px',
        animation: 'bounce 1.5s infinite',
    }
};

export default ScrollIndicator;
