import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './ExpandedProperty.css';

function ExpandedProperty({ propertyInfo = [] }) {
    const { id } = useParams();
    const property = propertyInfo.find(p => p.id === id);

    const [activeTab, setActiveTab] = useState('description');

    // Defensive exit to avoid runtime crashes
    if (!property || !property.pictures) {
        return (
            <div className="expanded-container">
                <h2>Property not found</h2>
                <Link to="/">Back to Home</Link>
            </div>
        );
    }

    // Remove last two images intentionally
    const imagesInGallery = property.pictures.slice(0, -1);

    const galleryImages = imagesInGallery.map(src => ({
        original: src,
        thumbnail: src,
        fullscreen: src
    }));

    return (
        <div className="expanded-container">

            {/* Image Gallery */}
            <div className="expanded-gallery">
                <ImageGallery
                    items={galleryImages}
                    autoPlay
                    slideInterval={4000}
                    slideDuration={500}
                    lazyLoad
                    showPlayButton
                    showFullscreenButton
                    showBullets
                    showIndex
                    pauseOnHover
                    useKeyboardNavigation
                    thumbnailPosition="bottom"
                />
            </div>

            {/* Property Summary */}
            <div className="expanded-info">
                <h1>{property.type}</h1>
                <p>{property.location}</p>
                <h2>£{property.price.toLocaleString()}</h2>
            </div>

            {/* Tabs */}
            <div className="tabs-header">
                <button
                    className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </button>
                <button
                    className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                    onClick={() => setActiveTab('details')}
                >
                    Details
                </button>
                <button
                    className={`tab-btn ${activeTab === 'floorPlan' ? 'active' : ''}`}
                    onClick={() => setActiveTab('floorPlan')}
                >
                    Floor Plan
                </button>
                <button
                    className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
                    onClick={() => setActiveTab('map')}
                >
                    Map
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'description' && (
                    <div className="tab-panel">
                        <p>{property.description}</p>
                    </div>
                )}

                {activeTab === 'details' && (
                    <div className="tab-panel">
                        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                        <p><strong>Tenure:</strong> {property.tenure}</p>
                        <p>
                            <strong>Added:</strong>{' '}
                            {property.added.day} {property.added.month} {property.added.year}
                        </p>
                    </div>
                )}

                {activeTab === 'floorPlan' && (
                    <div className="tab-panel">
                        <img src={property.pictures.slice(-1)} alt="floor plan" />
                    </div>
                )}

                {activeTab === 'map' && (
                    <div className="tab-panel map-panel">
                        <iframe
                            title="Property location"
                            width="100%"
                            height="350"
                            style={{ border: 0 }}
                            loading="lazy"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&z=15&output=embed`}
                        />
                    </div>
                )}
            </div>

        </div>
    );
}

export default ExpandedProperty;