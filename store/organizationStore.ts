import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { Organization } from "../app/types";

type OrganizationStoreState = {
  activeOrganization: Organization;
};

type OrganizationStoreActions = {
  setActiveOrganization: (
    activeOrganization: OrganizationStoreState["activeOrganization"]
  ) => void;
  resetActiveOrganization: () => void;
};

type OrganizationStore = OrganizationStoreState & OrganizationStoreActions;

const organizationStore = createStore<OrganizationStore>()(
  persist(
    (set) => ({
      activeOrganization: {
        id: "",
        name: "",
        type: "",
        createdAt: "",
        updatedAt: "",
        ownerId: "",
        owner: {
            id: "",
            email: "",
            name: "",
            password: "",
            role: "",
            createdAt: "",
            updatedAt: "",
            isVerified: false,
            lastLogin: "",
            contactNo: "",
            location: "",
            memberships: [],
            jobTitle: "",
            designation: "",
        },
        users: [],
        workspaces: [],
      },
      setActiveOrganization: (
        activeOrganization: OrganizationStoreState["activeOrganization"]
      ) => set({ activeOrganization }),
      resetActiveOrganization: () => {
        set({ activeOrganization: { id: "", name: "", type: "", createdAt: "", updatedAt: "", ownerId: "", owner: { id: "", email: "", name: "", password: "", createdAt: "", updatedAt: "", isVerified: false, lastLogin: "", contactNo: "", location: "", memberships: [], jobTitle: "", designation: "" }, users: [], workspaces: [] } });
      },
    }),
    { name: "organization-storage" }
  )
);

export default organizationStore;
