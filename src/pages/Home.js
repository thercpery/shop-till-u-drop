import { Fragment } from 'react';
import Banner from "../components/Banner";

const Home = () => {
  const data = {
    title: "Shop Until U Drop",
    content: "No money? Why not take some credit?",
    destination: "/shop",
    label: "SHOP NOW"
  };
  return (
    <Fragment>
      <Banner prop={data} />
    </Fragment>
  )
}

export default Home