import {Component} from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./index.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 1279, min: 769 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 768, min: 481 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1
  }
};

export default class TechnicianCarousel extends Component {
  state = {
    technicians: [],
    loading: true,
  };

  componentDidMount() {
    this.getTechnicians();
  }

  getTechnicians = async () => {
    try {
      const response = await axios.get("http://localhost:3001/featured-technicians/");
      this.setState({ technicians: response.data.result[0], loading: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { technicians, loading } = this.state;

    return (
      <>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <Carousel responsive={responsive} className="carousel-container">
            {technicians.map(t=>
              <div className="technitian-card" key={t.id}>
                <div className="inner-technitian-top">
                  <img src={t.photo} alt={t.name} className="techincian-image" />
                  <p className="technician-name">{t.name}</p>
                </div>
                <div className="inner-technitian-bottom">
                  <div className="techintian-props">
                    <p className="props-count">10</p>
                    <p className="props-name">Services</p>
                  </div>
                  <div className="techintian-props">
                    <p className="props-count">{t.rating}</p>
                    <p className="props-name">Rating</p>
                  </div>
                  <div className="techintian-props">
                    <p className="props-count">100</p>
                    <p className="props-name">Reviews</p>
                  </div>
                  <p className="show-more-p">Show more</p>
                </div>
              </div>
            )}

          </Carousel>
        )}
      </>
    );
  }
}