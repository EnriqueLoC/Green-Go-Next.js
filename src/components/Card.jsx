import Image from 'next/image';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

const Card = ({ i, title, description, src, url, color, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="cardContainerCoupons">
      <motion.div
        style={{ backgroundColor: color, scale, top: `calc(-5vh + ${i * 25}px)` }}
        className="cardCoupons"
      >
        <h2 className='titleCoupon'>{title}</h2>
        <div className="bodyCoupons">
          <div className="buttonsContainerCoupons">
            <motion.button
              className="buttonCoupons"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              10% Off
            </motion.button>
            <motion.button
              className="buttonCoupons"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              20% Off
            </motion.button>
            <motion.button
              className="buttonCoupons"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              30% Off
            </motion.button>
          </div>
          
          <div className="descriptionCoupons">
            <p>{description}</p>
          </div>

          <div className="imageContainerCoupons">
            <motion.div className="inner" style={{ scale: imageScale }}>
              <Image fill src={`/assets/${src}`} alt="image" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
