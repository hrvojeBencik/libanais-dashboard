import { Employee } from "@/app/_interfaces/Employee";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "@/app/firebase";
import EmployeeForm from "@/app/_components/modules/EmployeeForm/EmployeeForm";

export async function generateStaticParams() {
    const snapshot = await getDocs(query(collection(db, "employeeList")));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data.map((employee) => ({
        id: employee.id,
    }));
}

const EditEmployee = ({ employee }: { employee: Employee }) => {
    return <EmployeeForm employee={employee} />;
};

export default EditEmployee;
