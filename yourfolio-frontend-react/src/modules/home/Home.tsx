import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPortfolios } from "src/api/elementRequests";

const Home = () => {
  const query = useQuery({
    queryKey: ["getPortfolios"],
    queryFn: () => getPortfolios(),
  });
  return (
    <>
      {query.data?.map((portfolio) => (
        <div>{portfolio.name}</div>
      ))}
    </>
  );
};

export default Home;
