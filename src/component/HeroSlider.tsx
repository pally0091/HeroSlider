/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaHome, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SlideData {
  subtitle: string;
  Title: string;
  Desc: string;
  bgImage: string;
  image: string;
}

const data: SlideData[] = [
  {
    subtitle: "Beautiful Homes",
    Title: "Find Your Dream Home",
    Desc: "Discover the best homes available in the city. Your dream home awaits!",
    bgImage: "https://via.placeholder.com/800x600.png?text=Beautiful+Homes",
    image: "/download (1).jpeg",
  },
  {
    subtitle: "Luxury Living",
    Title: "Experience Luxury",
    Desc: "Step into a world of luxury with our premium properties designed for comfort and elegance.",
    bgImage: "https://via.placeholder.com/800x600.png?text=Luxury+Living",
    image: "/download (2).jpeg",
  },
  {
    subtitle: "Affordable Prices",
    Title: "Affordable Yet Elegant",
    Desc: "Find beautiful homes that fit your budget without compromising on quality.",
    bgImage: "https://via.placeholder.com/800x600.png?text=Affordable+Prices",
    image: "/download.jpeg",
  },
];

interface ArrowProps {
  currentSlide?: number;
  slideCount?: number;
  onClick?: () => void;
}

const SlickArrowLeft: React.FC<ArrowProps> = ({ currentSlide, ...props }) => (
  <button
    {...props}
    className={`slick-prev slick-arrow ${
      currentSlide === 0 ? "slick-disabled" : ""
    }`}
    aria-hidden="true"
    aria-disabled={currentSlide === 0}
    type="button"
  >
    <FaArrowLeft />
  </button>
);

const SlickArrowRight: React.FC<ArrowProps> = ({
  currentSlide,
  slideCount,
  ...props
}) => (
  <button
    {...props}
    className={`slick-next slick-arrow ${
      currentSlide === slideCount! - 1 ? "slick-disabled" : ""
    }`}
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount! - 1}
    type="button"
  >
    <FaArrowRight />
  </button>
);

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const Herosettings: Settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: true,
    fade: true,
    cssEase: "linear",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    beforeChange: (_oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  useEffect(() => {
    const slides = document.querySelectorAll(".slick-current");
    slides.forEach((slide) => {
      slide.classList.remove("animate-fadeInUp");
      void (slide as HTMLElement).offsetWidth;
      slide.classList.add("animate-fadeInUp");
    });
  }, [currentSlide]);
  return (
    <>
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/path/to/your/background-image.jpg)" }}
      >
        <Slider
          {...Herosettings}
          className="slick-slide-arrow-1 slick-slide-dots-1 h-full"
        >
          {data.map((item, key) => (
            <div
              key={key}
              className="h-full "
            >
              <div
                className="relative py-8 md:py-28 lg:py-36 xl:py-72 h-full flex items-center bg-cover bg-center bg-no-repeat overlay-black-60"
                style={{
                  backgroundImage: `url(${item.bgImage})`,
                  backgroundSize: "cover",
                }}
              >
                {/* animate fadeoutup  */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-12 mx-auto">
                  <div className="container mx-auto px-4 ">
                    <div className="">
                      <div className="p-6 md:p-8 lg:p-12">
                        <div className="space-y-6 text-white">
                          <h6 className="flex items-center space-x-2 text-lg">
                            <FaHome />
                            <span>{item.subtitle}</span>
                          </h6>
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                            {item.Title}
                          </h1>
                          <p className="max-w-xl">{item.Desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src={item.image}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default HeroSlider;
