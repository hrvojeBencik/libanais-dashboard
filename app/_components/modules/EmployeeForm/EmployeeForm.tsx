"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { InputType } from "../../elements/InputField/InputField";
import { FormContext } from "@/app/_contexts/FormContext";
import { SidebarContext } from "@/app/_contexts/SidebarContext";
import { DataContext } from "@/app/_contexts/DataContext";
import { db, storage } from "../../../firebase";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { inputChangeHandler } from "@/app/_utils/inputChangeHandle";
import validateForm from "@/app/_utils/validateForm";
import FormButtons from "../../elements/FormButtons/FormButtons";
import InputField from "../../elements/InputField/InputField";
import ImageInput from "../ImageInput/ImageInput";
import Header from "../../elements/Header/Header";
import DotsLoader from "../../elements/DotsLoader/DotsLoader";

interface EmployeeFormProps {
    className?: string;
    employee?: any;
}

const EmployeeForm = ({ className }: EmployeeFormProps) => {
    const router = useRouter();
    const { setOpenSidebar } = useContext(SidebarContext);
    const { editFormData, setEditFormData } = useContext(FormContext);
    const { refreshData } = useContext(DataContext);
    const [previewPhoto, setPreviewPhoto] = useState(
        editFormData?.imageUrl || ""
    );
    const [formValues, setFormValues] = useState({
        name: editFormData?.name || "",
        rank: editFormData?.rank || "",
        pin: editFormData?.pin || "",
        email: editFormData?.email || "",
        imageUrl: editFormData?.imageUrl || "",
    });
    const [file, setFile] = useState<File | null>(null);
    const [formErrors, setFormErrors] = useState({
        name: false,
        rank: false,
        pin: false,
        email: false,
        imageUrl: false,
    });
    const [sendingForm, setSendingForm] = useState(false);

    useEffect(() => {
        setOpenSidebar(false);
    }, [setOpenSidebar]);

    useEffect(() => {
        if (editFormData) {
            setFormValues({
                name: editFormData.name || "",
                rank: editFormData.rank || "",
                pin: editFormData.pin || "",
                email: editFormData.email || "",
                imageUrl: editFormData.imageUrl || "",
            });
            setPreviewPhoto(editFormData.imageUrl);
        }
    }, [editFormData]);

    const handleInputChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (sendingForm) {
            return;
        }

        const { name } = e.target;

        if ([name]) {
            setFormErrors((previousValues) => ({
                ...previousValues,
                [name]: false,
            }));
        }

        inputChangeHandler(e, setFormValues, setPreviewPhoto, setFile);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (sendingForm) {
            return;
        }

        setSendingForm(true);

        const errors = validateForm(formValues);
        setFormErrors(errors);

        if (Object.values(errors).some((error) => error)) {
            setSendingForm(false);
            return;
        }

        try {
            if (editFormData && editFormData.id) {
                await updateDoc(doc(db, "employeeList", editFormData.id), {
                    ...formValues,
                });

                if (file) {
                    const fileRef = ref(
                        storage,
                        `employees/${editFormData.id}/image.jpeg`
                    );
                    await uploadBytes(fileRef, file);
                    const photoUrl = await getDownloadURL(fileRef);

                    await updateDoc(doc(db, "employeeList", editFormData.id), {
                        imageUrl: photoUrl,
                    });
                }
            } else {
                const docRef = await addDoc(collection(db, "employeeList"), {
                    id: "",
                    ...formValues,
                    date: new Date().toISOString(),
                    imageUrl: "",
                });

                const employeeId = docRef.id;

                if (file) {
                    const fileRef = ref(
                        storage,
                        `employees/${employeeId}/image.jpeg`
                    );
                    await uploadBytes(fileRef, file);
                    const photoUrl = await getDownloadURL(fileRef);

                    await updateDoc(doc(db, "employeeList", docRef.id), {
                        id: docRef.id,
                        imageUrl: photoUrl,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            refreshData();
            handleCloseForm();
            setSendingForm(false);
        }
    };

    const handleCloseForm = () => {
        setFormValues({
            name: "",
            rank: "",
            pin: "",
            email: "",
            imageUrl: "",
        });
        setPreviewPhoto("");
        setEditFormData(null);
        router.push("/employees");
    };

    return (
        <div className={`${className} wrapper pl-[18px] sm:p-4`}>
            <Header
                title={editFormData ? "Edit Employee" : "Add Employee"}
                subtitle={`Hi, Name. Let's ${
                    editFormData ? "edit" : "add"
                } an employee!`}
            />
            <form
                onSubmit={handleSubmit}
                action=""
                className="mt-[58.5px] sm:mt-6"
                name="employeeForm"
            >
                <div className="flex items-center sm:flex-col">
                    <div className="flex flex-col w-[52%] sm:w-full">
                        <InputField
                            inputId="name"
                            label="Full Name"
                            type={InputType.Text}
                            name="name"
                            value={formValues.name}
                            onChange={handleInputChange}
                            placeholder="Employee full name"
                            error={formErrors.name}
                        />
                        <InputField
                            inputId="rank"
                            label="Rank"
                            type={InputType.Text}
                            name="rank"
                            value={formValues.rank}
                            onChange={handleInputChange}
                            placeholder="Employee Rank"
                            error={formErrors.rank}
                        />
                        <InputField
                            inputId="pin"
                            label="4-Digit PIN"
                            type={InputType.Number}
                            name="pin"
                            value={formValues.pin}
                            onChange={handleInputChange}
                            placeholder="Employee PIN"
                            error={formErrors.pin}
                            className="[&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <InputField
                            inputId="email"
                            label="Email Address"
                            type={InputType.Email}
                            name="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            placeholder="Employee email address"
                            error={formErrors.email}
                        />
                    </div>
                    <ImageInput
                        inputId="image"
                        className="pl-[92px] sm:p-0"
                        previewPhoto={previewPhoto}
                        handleInputChange={handleInputChange}
                        error={formErrors.imageUrl}
                    />
                </div>
                {sendingForm && <DotsLoader />}
                <FormButtons
                    text="Employee"
                    handleCloseForm={handleCloseForm}
                    className="mt-[45px]"
                />
            </form>
        </div>
    );
};

export default EmployeeForm;
