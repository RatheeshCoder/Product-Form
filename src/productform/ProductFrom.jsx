import React from 'react';
import { useProductFormSubmit } from '../useProductFormSubmit';
import { useEnumOptions } from '../useEnumOptions';
import './ProductForm.style.scss';

const PK = `pk_sq_znc6MZ2yEStyjzPV`;
const SK = `sk_sq_JkH4NbFNr0bVf6OM`;

const TICKET_TYPES = {
    'NEW_REQUIREMENT/ENHANCEMENT': 'New Requirement/Enhancement',
    BUG: 'Bug',
    DESIGN_CHANGE: 'Design Change',
    DOCUMENTATION: 'Document/Manual Correction'
};

const ProductForm = () => {
    const ticketType = useEnumOptions(TICKET_TYPES);
    const apiKeys = {
        publicKey: PK,
        privateKey: SK
    };
    const { isLoading, ...formik } = useProductFormSubmit(apiKeys);
    
    return (
        <div className="product-form-container">
            <h1>Contact our Team</h1>
            <p>Got any questions about the product or scaling on our platform?</p>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email ID</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={formik.touched.email && formik.errors.email ? "input-error" : ""}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="error-message">{formik.errors.email}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="issueType">Issue Type</label>
                    <select
                        id="issueType"
                        name="issueType"
                        className={formik.touched.issueType && formik.errors.issueType ? "input-error" : ""}
                        value={formik.values.issueType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="" disabled>Select Issue Type</option>
                        {ticketType.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {formik.touched.issueType && formik.errors.issueType && (
                        <div className="error-message">{formik.errors.issueType}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className={formik.touched.description && formik.errors.description ? "input-error" : ""}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows="4"
                    ></textarea>
                    {formik.touched.description && formik.errors.description && (
                        <div className="error-message">{formik.errors.description}</div>
                    )}
                </div>

                <div className="button-container">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={formik.resetForm}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;