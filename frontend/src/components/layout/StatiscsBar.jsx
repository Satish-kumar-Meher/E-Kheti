import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import "../../css/about.css"; // Add separate CSS for the stats section

const StatisticsBar = () => {
  const [ref, inView] = useInView({
    threshold: 0.1, // Trigger when 10% of the section is visible
    triggerOnce: true,
  });

  // Animation variants for the number section
  const numberAnimationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div
      className="stats-section"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={numberAnimationVariants}
    >
      <div className="stat">
        <h3>
          <CountUp start={0} end={20} duration={2} />+
        </h3>
        <p>Years of Experience</p>
      </div>
      <div className="stat">
        <h3>
          <CountUp start={0} end={1856} duration={2.5} />+
        </h3>
        <p>Projects Completed</p>
      </div>
      <div className="stat">
        <h3>
          <CountUp start={0} end={2850} duration={3} />+
        </h3>
        <p>Happy Customers</p>
      </div>
      <div className="stat">
        <h3>
          <CountUp start={0} end={64} duration={1.5} />+
        </h3>
        <p>Expert Landscapers</p>
      </div>
    </motion.div>
  );
};

export default StatisticsBar;
