import React from 'react';
import SpotForm from '../../component/spot/spotForm';
import Header from '../../component/layout/header';
import Navigation from '../../component/layout/navigation';
import styled from 'styled-components';
const AddSpotPage: React.FC = () => {
    return (
        <>
            <Header />
            <Navigation />
            <PageContainer>
                <SpotForm />
                <br/>
                <br/>
                <br/>
            </PageContainer>
        </>
    );
};

export default AddSpotPage;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;