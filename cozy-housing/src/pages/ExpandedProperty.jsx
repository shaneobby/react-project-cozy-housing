import { useState, useEffect } from 'react'
import './ExpandedProperty.css'
import { Link } from 'react-router-dom';


const ExpandedProperty = ({ propertyInfo }) => {
    useEffect(() => {
        // Re-run business logic when properties change
        console.log("Properties updated – re-running logic");
    }, [propertyInfo]);

    return (
        <p></p>
    )
}

export default ExpandedProperty