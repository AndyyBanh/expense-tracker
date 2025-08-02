import React, { useState } from "react";

const EditSaleForm = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState({
        ...initialData,
        date: initialData?.date? new Date(initialData.date).toISOString().split("T")[0]: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Cost Price</label>
                <input name="costPrice" value={formData.costPrice} onChange={handleChange} className="input outline rounded text-center outline-offset-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Sale Price</label>
                <input name="salePrice" value={formData.salePrice} onChange={handleChange} className="input outline rounded text-center outline-offset-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Sale Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="input outline rounded text-center outline-offset-2" />
            </div>

            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    )
}

export default EditSaleForm;