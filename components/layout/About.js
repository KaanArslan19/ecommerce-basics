import classes from "./About.module.css";
import Image from "next/image";

const About = () => {
  return (
    <section className={classes.container}>
      <div className={classes.imgContainer}>
        <Image src="/images/about.jpg" alt="about" fill={true} />
      </div>
      <div className={classes.content}>
        <h3>About</h3>
        <p>
          We strive to produce timeless work by showcasing an aesthetic that is
          wholly our own, with a heavy emphasis on simple yet effective design.
        </p>
      </div>
    </section>
  );
};

export default About;
