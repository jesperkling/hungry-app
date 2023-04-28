import useStreamCollection from "./useStreamCollection";

const useGetTips = () => {
    return useStreamCollection("tips");
};

export default useGetTips;