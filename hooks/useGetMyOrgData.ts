import organizationStore from "@/store/organizationStore";
import axios from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

interface QueryResponse {
  message: string;
  data: any;
}

const useGetMyOrgData = () => {
  const {setActiveOrganization} = organizationStore.getState()

  const {
    data,
    isLoading: myOrgLoading,
    error: errorLoadingMyOrg,
  } = useQuery<QueryResponse, Error>({
    queryKey: ["my-org"],
    queryFn: async () => {
      const res = await axios.get<QueryResponse>(`/organization/myorg`);
      setActiveOrganization(res.data.data);
      return res.data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const myOrgData = data?.data;

  return { myOrgData, myOrgLoading, errorLoadingMyOrg };
};
export default useGetMyOrgData;
