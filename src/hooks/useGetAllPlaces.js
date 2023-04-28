import useStreamCollection from "./useStreamCollection";

const useGetAllPlaces = () => {
    return useStreamCollection("places");
};

export default useGetAllPlaces;