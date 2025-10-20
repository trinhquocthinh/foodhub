import Image from 'next/image';
import Link from 'next/link';

import './HomeSection.scss';

const HomeSection = () => {
  return (
    <section className="home" id="home">
      <div className="home-left">
        <p className="home-subtext">Hi, new friend!</p>
        <h1 className="main-heading">
          We do not cook, we create your emotions!
        </h1>
        <p className="home-text">
          Experience vibrant seasonal dishes crafted by passionate chefs who
          believe every meal should tell a story.
        </p>
        <div className="btn-group">
          <Link href="#menu" className="btn btn-primary btn-icon">
            <Image
              src="/images/menu.svg"
              alt="Our menu"
              width={18}
              height={18}
            />
            Our menu
          </Link>
          <Link href="#about" className="btn btn-secondary btn-icon">
            <Image
              src="/images/arrow.svg"
              alt="About us"
              width={18}
              height={18}
            />
            About us
          </Link>
        </div>
      </div>

      <div className="home-right">
        <Image
          src="/images/food1.png"
          alt="Colorful salad bowl"
          className="food-img food-1"
          width={200}
          height={200}
          priority
        />
        <Image
          src="/images/food2.png"
          alt="Gourmet dish"
          className="food-img food-2"
          width={200}
          height={200}
        />
        <Image
          src="/images/food3.png"
          alt="Fresh dessert"
          className="food-img food-3"
          width={200}
          height={200}
        />

        <Image
          src="/images/dialog-1.svg"
          alt="Foodhub review"
          className="dialog dialog-1"
          width={230}
          height={120}
        />
        <Image
          src="/images/dialog-2.svg"
          alt="Foodhub ratings"
          className="dialog dialog-2"
          width={230}
          height={120}
        />

        <Image
          src="/images/circle.svg"
          alt="Decorative shape"
          className="shape shape-1"
          width={25}
          height={25}
        />
        <Image
          src="/images/circle.svg"
          alt="Decorative shape"
          className="shape shape-2"
          width={15}
          height={15}
        />
        <Image
          src="/images/circle.svg"
          alt="Decorative shape"
          className="shape shape-3"
          width={30}
          height={30}
        />
        <Image
          src="/images/ring.svg"
          alt="Decorative shape"
          className="shape shape-4"
          width={60}
          height={60}
        />
        <Image
          src="/images/ring.svg"
          alt="Decorative shape"
          className="shape shape-5"
          width={40}
          height={40}
        />
      </div>
    </section>
  );
};

export default HomeSection;
