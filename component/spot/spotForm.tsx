import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axiosInstance';

declare global {
    interface Window {
        kakao: any;
    }
}

const SpotForm: React.FC = () => {
    const [spotName, setSpotName] = useState('');
    const [spotThumbnailImageLink, setSpotThumbnailImageLink] = useState('');
    const [spotAddress, setSpotAddress] = useState('');
    const [spotInfo, setSpotInfo] = useState('');
    const [spotLevel, setSpotLevel] = useState(0);
    const [latitude, setLatitude] = useState(33.450701); // Default latitude
    const [longitude, setLongitude] = useState(126.570667); // Default longitude
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const router = useRouter();
    const mapRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=56e45c147a8df3b30d57a33f5378f3d3&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = mapRef.current;
                const options = {
                    center: new window.kakao.maps.LatLng(latitude, longitude),
                    level: 3,
                };

                const map = new window.kakao.maps.Map(container, options);
                const marker = new window.kakao.maps.Marker({
                    position: map.getCenter(),
                });

                marker.setMap(map);

                window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
                    const latlng = mouseEvent.latLng;
                    setLatitude(latlng.getLat());
                    setLongitude(latlng.getLng());
                    marker.setPosition(latlng);
                });
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleFileInputChange = (e: any) => {
        const file = e.target.files[0];
        setUploadedImage(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let updatedThumbnailImageLink = spotThumbnailImageLink;
        if (uploadedImage) {
            const formData = new FormData();
            formData.append('image', uploadedImage);
            const response = await axiosInstance.post('/api/images', formData);
            updatedThumbnailImageLink = response.data[0].imageUrl;
        }
        await axiosInstance.post('/api/spots', {
            spotName,
            spotThumbnailImageLink: updatedThumbnailImageLink,
            spotAddress,
            spotInfo,
            spotLevel,
            latitude,
            longitude,
        });
        router.push('/main/list');
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Title>Add New Spot</Title>
            <FormItem>
                <Label>Spot Name</Label>
                <Input
                    type="text"
                    value={spotName}
                    onChange={(e) => setSpotName(e.target.value)}
                    required
                />
            </FormItem>
            <FormItem>
                <Label>Spot Address</Label>
                <Input
                    type="text"
                    value={spotAddress}
                    onChange={(e) => setSpotAddress(e.target.value)}
                    required
                />
            </FormItem>
            <FormItem>
                <Label>Spot Info</Label>
                <Input
                    type="text"
                    value={spotInfo}
                    onChange={(e) => setSpotInfo(e.target.value)}
                    required
                />
            </FormItem>
            <FormItem>
                <Label>Spot Level</Label>
                <Input
                    type="number"
                    value={spotLevel}
                    onChange={(e) => setSpotLevel(Number(e.target.value))}
                    required
                />
            </FormItem>
            <FormItem>
                <Label>Latitude</Label>
                <Input type="number" value={latitude} readOnly required />
            </FormItem>
            <FormItem>
                <Label>Longitude</Label>
                <Input type="number" value={longitude} readOnly required />
            </FormItem>
            <MapContainer ref={mapRef} id="map" />
            <FormItem>
                <Label>Thumbnail Image</Label>
                <Input type="file" onChange={handleFileInputChange} />
            </FormItem>
            <SubmitButton type="submit">Add Spot</SubmitButton>
        </FormContainer>
    );
};

export default SpotForm;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Title = styled.h2`
    margin-bottom: 20px;
`;

const FormItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const Label = styled.label`
    margin-bottom: 5px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    border: none;
    background-color: #0070f3;
    color: white;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #005bb5;
    }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 350px;
  margin-bottom: 20px;
`;
