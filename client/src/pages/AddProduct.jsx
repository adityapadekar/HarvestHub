import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAdmin } from "../operations/admin";
export default function AddProduct() {
    const dispatch = useDispatch();

    const [productState, setProductState] = useState({
        productName: "",
        productType: "",
        unit: "",
        image: null,
    });

    const handelProductChange = (e) => {
        const { name, value } = e.target;

        setProductState({
            ...productState,
            [name]: value,
        });
    };

    const handelImage = (e) => {
        setProductState({
            ...productState,
            image: e.target.files[0],
        });
    };

    const handelAddProduct = async (e) => {
        e.preventDefault();

        const data = await dispatch(addProductAdmin(productState));
    };

    return (
        <div className="flex items-center justify-center  ">
            <form
                onSubmit={handelAddProduct}
                className="m-10 flex w-full flex-col items-center justify-center gap-3 rounded-sm border bg-slate-100 pb-2  sm:w-2/3"
            >
                <h1 className="w-full border bg-green-700 py-2 text-center text-2xl font-semibold">
                    Add Product
                </h1>
                <div className="flex flex-col gap-2 p-2 sm:w-1/2 sm:text-center ">
                    <label htmlFor="product name">Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        value={productState?.productName}
                        className="rounded-md border px-2 py-1 text-gray-400 outline-none sm:text-center"
                        placeholder="Enter Your Product Name"
                        onChange={handelProductChange}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 p-2 sm:w-1/2 sm:text-center ">
                    <label htmlFor="product type">Product Type</label>
                    <input
                        type="text"
                        name="productType"
                        value={productState?.productType}
                        className="rounded-md border px-2 py-1 text-gray-400 outline-none sm:text-center"
                        placeholder="Enter Your Product Type"
                        onChange={handelProductChange}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 p-2 sm:w-1/2 sm:text-center ">
                    <label htmlFor="product unit">Product Unit</label>
                    <input
                        type="text"
                        name="unit"
                        value={productState?.unit}
                        className="rounded-md border px-2 py-1 text-gray-400 outline-none sm:text-center"
                        placeholder="Enter Your Product Unit"
                        onChange={handelProductChange}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2 p-2 sm:w-1/2 sm:text-center ">
                    <label htmlFor="product Image">Product Image</label>
                    <input
                        type="file"
                        name="image"
                        className="rounded-md py-1  text-gray-400 outline-none sm:text-center"
                        onChange={handelImage}
                        required
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="rounded-md border bg-green-600 px-10 py-1 text-white "
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
