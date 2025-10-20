import Image from 'next/image';

import './AboutSection.scss';

const AboutSection = () => {
  return (
    <section className="about" id="about">
      <div className="about-left">
        <div className="img-box">
          <Image
            src="/images/about-image.jpg"
            alt="Foodhub interior"
            className="about-img"
            width={250}
            height={250}
          />
        </div>
        <div className="abs-content-box">
          <div className="dotted-border">
            <p className="number-lg">17</p>
            <p className="text-md">
              Years <br /> Experience
            </p>
          </div>
        </div>
        <Image
          src="/images/circle.svg"
          alt="Decorative shape"
          className="shape shape-6"
          width={20}
          height={20}
        />
        <Image
          src="/images/circle.svg"
          alt="Decorative shape"
          className="shape shape-7"
          width={30}
          height={30}
        />
        <Image
          src="/images/ring.svg"
          alt="Decorative shape"
          className="shape shape-8"
          width={35}
          height={35}
        />
        <Image
          src="/images/ring.svg"
          alt="Decorative shape"
          className="shape shape-9"
          width={80}
          height={80}
        />
      </div>

      <div className="about-right">
        <h2 className="section-title">We are doing more than you expect</h2>
        <p className="section-text">
          Foodhub blends culinary artistry with warm hospitality. From the
          moment you step inside, our team curates a tailored experience filled
          with bold flavors, seasonal ingredients, and thoughtful details that
          make every visit memorable.
        </p>
        <p className="section-text">
          We partner with local farms to source responsibly grown produce,
          support sustainable practices, and bring the freshest ingredients
          directly to your table.
        </p>
        <Image
          src="/images/signature.png"
          alt="Chef signature"
          className="signature"
          width={150}
          height={40}
        />
      </div>
    </section>
  );
};

export default AboutSection;
