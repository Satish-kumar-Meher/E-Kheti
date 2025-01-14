// import "./css/about.css"

// export const About = () => {

//     return (
//         <>
//         <div className="main">
//         <section class="about-section">
//         <div class="about-content">
//             <h3>About Greenco</h3>
//             <h1>We Provide Landscaping And <br/> Garden Care Services</h1>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
//             <ul class="features-list">
//                 <li><span class="check-icon">✔</span> Public Liability Insurance</li>
//                 <li><span class="check-icon">✔</span> Environmentally Friendly</li>
//                 <li><span class="check-icon">✔</span> On Time, Every Time</li>
//                 <li><span class="check-icon">✔</span> Beautiful Garden Designs</li>
//                 <li><span class="check-icon">✔</span> Modern Machinery And Tool</li>
//             </ul>
//             <a href="#" class="about-btn">More About Us</a>
//         </div>
//         <div class="about-images">
//             <img src="https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhcm1pbmd8ZW58MHx8MHx8fDA%3D" alt="Gardener Working" class="img1"/>
//             <div class="right-images">
//                 <img src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?cs=srgb&dl=pexels-jk04-2933243.jpg&fm=jpg" alt="Hedge Trimming" class="img2"/>
//                 <img src="https://www.shutterstock.com/image-photo/rear-view-senior-farmer-walking-260nw-2475544393.jpg" alt="Landscaping Design" class="img3"/>
//             </div>
//         </div>
//     </section>

//     <div class="projects">
//         <h3>1,856 +</h3>
//         <p>Projects Completed</p>
//     </div>
//     </div>
//         </>
//     )
// }

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import CountUp from "react-countup";
import "../css/about.css";
import StatisticsBar from "@/components/layout/StatiscsBar";

export const About = () => {
  // Controls for triggering animations
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1, // Trigger when 10% of the section is visible
    triggerOnce: true, // Only trigger the animation once
  });

  // Trigger the animation when the section is in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants for motion components
  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  };

  // Animation variants for the number section
//   const numberAnimationVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 1 } },
//   };

  return (
    <>
    <div className="main">
      <motion.section
        className="about-section"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={animationVariants}
      >
        <motion.div className="about-content">
          <motion.h3
            initial={{ color: "#2f7b4f" }}
            animate={{ color: "#ffc107" }}
            transition={{ duration: 1.5, yoyo: Infinity }}
          >
            About E-Kheti
          </motion.h3>
          <motion.h1 variants={animationVariants}>
            We Provide Landscaping And <br /> Garden Care Services
          </motion.h1>
          <motion.p variants={animationVariants}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
          </motion.p>
          <motion.ul className="features-list" variants={animationVariants}>
          <li><span className="check-icon">✔</span> Public Liability Insurance</li>
               <li><span className="check-icon">✔</span> Environmentally Friendly</li>
                 <li><span className="check-icon">✔</span> On Time, Every Time</li>
                 <li><span className="check-icon">✔</span> Beautiful Garden Designs</li>
                 <li><span className="check-icon">✔</span> Modern Machinery And Tool</li>
            {/* Other list items */}
          </motion.ul>
          <motion.a
            href="#"
            className="about-btn"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            More About Us
          </motion.a>
        </motion.div>

        <motion.div className="about-images">
          <motion.img
            src="https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhcm1pbmd8ZW58MHx8MHx8fDA%3D"
            alt="Gardener Working"
            className="img1"
            variants={animationVariants}
          />
          <div className="right-images">
            <motion.img
              src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?cs=srgb&dl=pexels-jk04-2933243.jpg&fm=jpg"
              alt="Hedge Trimming"
              className="img2"
              variants={animationVariants}
            />
            <motion.img
              src="https://www.shutterstock.com/image-photo/rear-view-senior-farmer-walking-260nw-2475544393.jpg"
              alt="Landscaping Design"
              className="img3"
              variants={animationVariants}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* <motion.div className="projects" ref={ref} initial="hidden" animate={controls} variants={animationVariants}>
        <motion.h3 variants={animationVariants}>1,856 +</motion.h3>
        <motion.p variants={animationVariants}>Projects Completed</motion.p>
      </motion.div> */}

      
    </div>
    <StatisticsBar/>
  </>
  );
};
