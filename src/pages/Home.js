import { Fragment } from 'react';
import Banner from "../components/Banner";

const Home = () => {
  const data = {
    title: "Shop Until U Drop",
    content: "No money? Why not take some credit?",
    destination: "/products",
    label: "SHOP NOW"
  };
  return (
    <Fragment>
      <Banner prop={data} />
    </Fragment>
    
    // TODO: Highlights: Top 3 best-selling items. 
  )
}

export default Home