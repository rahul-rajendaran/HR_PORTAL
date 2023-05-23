import React, {
  Children,
  Key,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { get } from "../../src/Api/Apis";

interface IallGetData {
  imageurl: any;
  firstname: string;
  lastname: string;
  dateofbirth: string;
  gender: string;
  district: string;
  pincode?: number;
  number?: number;
  email: string;
  Id?: string;
} 
interface Iplaces{
  id: Key | null | undefined;
  _id:string;
  place:string
}

interface IMyContextType {
  // searchValue: string;
  // setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  // getFunction: React.Dispatch<React.SetStateAction<IallGetData>>;
  getFunction: () => void;
  allData: IallGetData[];
  allPlaces:Iplaces[]
}

export const contexts = createContext<IMyContextType>({
  allData: [],
  getFunction: () => {},
  allPlaces:[]
});

const Contexts = ({ children }: { children: ReactNode }) => {
  const [allData, setAllData] = useState<IallGetData[]>([]);
  const [allPlaces, setAllPlaces] = useState<Iplaces[]>([]);
// console.log(allPlaces);

  // Function to get all data
  const getFunction = async () => {
    let getData = get("/getAllData");
    let places = await get("/getPlaceMongodb");

    setAllData(await getData);
    setAllPlaces(await places);
  };

  useEffect(() => {
    getFunction();
  }, []);

  return (
    <>
      <contexts.Provider value={{ allData, getFunction, allPlaces }}>
        {children}
      </contexts.Provider>
    </>
  );
};
export default Contexts;
