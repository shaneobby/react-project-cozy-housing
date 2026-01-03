import { useState, useEffect } from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";



const Home = ({ propertyInfo }) => {
    const [properties, setProperties] = useState(propertyInfo);
    const [startDate, setStartDate] = useState(null);


    useEffect(() => {
        setProperties(propertyInfo || []);
    }, [propertyInfo]);

    //sorting the properties with given user choices

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const choices = {
            type: formData.get('type'),
            minPrice: formData.get('minPrice'),
            maxPrice: formData.get('maxPrice'),
            minBedrooms: formData.get('minBedrooms'),
            maxBedrooms: formData.get('maxBedrooms'),
            postcode: formData.get('postcode')?.trim(),
            dateAdded: startDate ? startDate.toISOString().split('T')[0] : ''
        };

        const filtered = propertyInfo.filter(property => {
            if (choices.type !== 'any' && property.type !== choices.type) return false;
            if (choices.minPrice && property.price < Number(choices.minPrice)) return false;
            if (choices.maxPrice && property.price > Number(choices.maxPrice)) return false;
            if (choices.minBedrooms && property.bedrooms < Number(choices.minBedrooms)) return false;
            if (choices.maxBedrooms && property.bedrooms > Number(choices.maxBedrooms)) return false;
            if (choices.postcode && !property.postcode.toLowerCase().includes(choices.postcode.toLowerCase())) return false;
            if (choices.dateAdded) { if (new Date(property.dateAdded) < new Date(choices.dateAdded)) return false; }

            return true;
        });

        setProperties(filtered);
    };




    return (
        <>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-form__inputs">

                    {/* Property Type */}
                    <label className="search-form__label">
                        Property Type
                        <select name="type" className="search-form__select">
                            <option value="any">Any</option>
                            <option value="House">House</option>
                            <option value="Flat">Flat</option>
                            <option value="Bungalow">Bungalow</option>
                        </select>
                    </label>

                    {/* Price Range */}
                    <label className="search-form__label">
                        Price (£)
                        <div className="search-form__range-group">
                            <input
                                type="number"
                                name="minPrice"
                                placeholder="Min"
                                min="0"
                                className="search-form__input search-form__input--short"
                            />
                            <span>-</span>
                            <input
                                type="number"
                                name="maxPrice"
                                placeholder="Max"
                                min="0"
                                className="search-form__input search-form__input--short"
                            />
                        </div>
                    </label>

                    {/* Bedrooms Range */}
                    <label className="search-form__label">
                        Bedrooms
                        <div className="search-form__range-group">
                            <input
                                type="number"
                                name="minBedrooms"
                                placeholder="Min"
                                min="0"
                                className="search-form__input search-form__input--tiny"
                            />
                            <span>-</span>
                            <input
                                type="number"
                                name="maxBedrooms"
                                placeholder="Max"
                                min="0"
                                className="search-form__input search-form__input--tiny"
                            />
                        </div>
                    </label>

                    {/* Postcode */}
                    <label className="search-form__label">
                        Postcode
                        <input
                            type="text"
                            name="postcode"
                            placeholder="e.g. BR1"
                            className="search-form__input search-form__input--short"
                        />
                    </label>

                    {/* DatePicker (reverted to original) */}
                    <div className="search-form__group">
                        <label className="search-form__label">Added After</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Select Date"
                            customInput={<input className="search-form__input" style={{ width: '100%' }} />}
                        />
                    </div>

                    <button type="submit" className="search-form__submit">Search</button>
                </div>
            </form>

            <div className="property-list">
                {properties.map((property) => (

                    <div key={property.id} className="property-card">
                        <div className="property-image">
                            {property.pictures && property.pictures.length > 0 && (
                                <img
                                    src={property.pictures[0]}
                                    alt={property.type}
                                />
                            )}
                        </div>

                        <div className="property-details">
                            <div className="property-type">{property.type}</div>
                            <div className="property-location">{property.location}</div>
                            <div className="property-price">
                                £{property.price.toLocaleString()}
                            </div>
                        </div>
                        <Link to={`/property/${property.id}`}>
                            <button>view property</button>
                        </Link>
                    </div>

                ))}
            </div>
        </>
    );
}

export default Home