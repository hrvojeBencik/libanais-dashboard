"use client";
import {
    createContext,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
} from "react";
import { loadData } from "../_utils/loadData";
import removeOldData from "../_utils/removeOldData";
import { Employee } from "../_interfaces/Employee";
import { Recipe } from "../_interfaces/Recipe";

interface DataContextType {
    employeeList: Employee[];
    setEmployeeList: Dispatch<SetStateAction<Employee[]>>;
    recipeList: Recipe[];
    setRecipeList: Dispatch<SetStateAction<Recipe[]>>;
    employeeSummary: any[];
    setEmployeeSummary: Dispatch<SetStateAction<any[]>>;
    recipeSummary: any[];
    setRecipeSummary: Dispatch<SetStateAction<any[]>>;
    refreshData: () => void;
}

export const DataContext = createContext<DataContextType>({
    employeeList: [],
    setEmployeeList: () => {},
    recipeList: [],
    setRecipeList: () => {},
    employeeSummary: [],
    setEmployeeSummary: () => {},
    recipeSummary: [],
    setRecipeSummary: () => {},
    refreshData: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [employeeList, setEmployeeList] = useState<Employee[]>([]);
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);
    const [employeeSummary, setEmployeeSummary] = useState<any[]>([]);
    const [recipeSummary, setRecipeSummary] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            await removeOldData("employeeSummary");
            await removeOldData("recipeSummary");

            await loadData("recipeList", setRecipeList);
            await loadData("employeeList", setEmployeeList);
            await loadData("employeeSummary", setEmployeeSummary);
            await loadData("recipeSummary", setRecipeSummary);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshData = () => {
        fetchData();
    };

    return (
        <DataContext.Provider
            value={{
                employeeList,
                setEmployeeList,
                recipeList,
                setRecipeList,
                employeeSummary,
                setEmployeeSummary,
                recipeSummary,
                setRecipeSummary,
                refreshData,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
