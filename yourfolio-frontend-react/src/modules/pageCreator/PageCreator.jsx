import DefaultHead from "../../components/DefaultHead";
import { NavBar } from "./components/navBar/NavBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getElement } from "../../api/element";


export const PageCreator = () => {
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ['getElement'], queryFn: getElement})


  return (
    <>
      <DefaultHead></DefaultHead>
      {query.data && (
        <NavBar
          title={query.data.name}
          tabs={query.data.elements
            .sort((a, b) => a.position - b.position)
            .map((tab) => ({ name: tab.name, index: tab.id }))}
        ></NavBar>
      )}
    </>
  );
};
