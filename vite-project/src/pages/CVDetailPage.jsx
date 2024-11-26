import React from 'react';
import AddRecommendation from '../../../cv-generator-frontend/vite-project/src/components/AddRecommendation';
import RecommendationList from '../../../cv-generator-frontend/vite-project/src/components/RecommendationList';
import { useParams } from 'react-router-dom';

const CVDetailPage = ({ cvId }) => {
    return (
        <div>
            <h1>Détails du CV</h1>
            {/* Section des recommandations */}
            <h2>Recommandations</h2>
            <AddRecommendation cvId={cvId} onSuccess={() => window.location.reload()} />
            <RecommendationList cvId={cvId} />
        </div>
    );
};

export default CVDetailPage;
