import React, { useState } from "react";

const EditInventoryForm = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState(initialData)

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
            <div className="">
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input name="productName" value={formData.productName} onChange={handleChange} className="input outline rounded text-center outline-offset-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Cost Before Tax</label>
                <input name="costBeforeTax" value={formData.costBeforeTax} onChange={handleChange} className="input outline rounded text-center outline-offset-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Tax Paid</label>
                <input name="taxPaid" value={formData.taxPaid} onChange={handleChange} className="input outline rounded text-center outline-offset-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <input name="size" value={formData.size} onChange={handleChange} className="input outline rounded text-center outline-offset-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Condition</label>
                <input name="condition" value={formData.condition} onChange={handleChange} className="input outline rounded text-center outline-offset-2" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} className="input outline rounded text-center outline-offset-2" placeholder="Any Notes..."/>
            </div>
            
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    )
};

export default EditInventoryForm;