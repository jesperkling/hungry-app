import useStreamDocument from './useStreamDocument';

const useGetPlace = (id) => {
    return useStreamDocument("places", id);
};

export default useGetPlace;
