import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const MetaData = (props) => {
  const { title } = props;
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
        </Helmet>
      </div>
    </HelmetProvider>
  );
};

export default MetaData;
