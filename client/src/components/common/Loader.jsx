import { motion } from 'framer-motion';
import './Loader.css';

const Loader = ({ type = 'spinner', text = 'Loading...', fullScreen = false }) => {
  if (type === 'spinner') {
    return (
      <div className={`loader ${fullScreen ? 'loader--full-screen' : ''}`}>
        <motion.div
          className="loader__spinner"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {text && <p className="loader__text">{text}</p>}
      </div>
    );
  }

  if (type === 'dots') {
    return (
      <div className={`loader ${fullScreen ? 'loader--full-screen' : ''}`}>
        <div className="loader__dots">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="loader__dot"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
        {text && <p className="loader__text">{text}</p>}
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <div className={`loader ${fullScreen ? 'loader--full-screen' : ''}`}>
        <motion.div
          className="loader__pulse"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
        {text && <p className="loader__text">{text}</p>}
      </div>
    );
  }

  if (type === 'bars') {
    return (
      <div className={`loader ${fullScreen ? 'loader--full-screen' : ''}`}>
        <div className="loader__bars">
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="loader__bar"
              animate={{
                scaleY: [1, 2, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.1,
              }}
            />
          ))}
        </div>
        {text && <p className="loader__text">{text}</p>}
      </div>
    );
  }

  return null;
};

export default Loader;
