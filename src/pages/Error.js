import { Fragment } from 'react';
import Banner from "../components/Banner";

const Error = () => {
    const data = {
        title: "ARE YOU LOST?",
        content: "Please return to home page.",
        destination: "/",
        label: "GO HOME"
    };
  return (
    <Fragment>
        <Banner prop={data} />
    </Fragment>
  )
}

export default Error