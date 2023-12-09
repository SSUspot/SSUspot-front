import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Navigation from '../../component/layout/navigation';
import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axiosInstance';
import Header from '../../component/layout/header';

const SettingPage: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [userName, setUserName] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileImageLink, setProfileImageLink] = useState('');
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  useEffect(() => {
    // User;
    axiosInstance
      .get('/api/users')
      .then((response) => {
        setNickname(response.data.nickname);
        setUserName(response.data.userName);
        setProfileMessage(response.data.profileMessage);
        setProfileImageLink(response.data.profileImageLink);
      })
      .catch((error) => {
        console.log('/api/users error', error);
      });
  }, []);

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    setUploadedImage(file);
  };

  const handleComplete = async () => {
    let updatedProfileImageLink = profileImageLink;
    if (uploadedImage) {
      const formData = new FormData();
      formData.append('image', uploadedImage);
      const response = await axiosInstance.post('/api/images', formData);
      console.log('/api/images', response.data[0].imageUrl);
      updatedProfileImageLink = response.data[0].imageUrl;
    }
    await axiosInstance
      .patch('/api/users', {
        userName: userName,
        nickname: nickname,
        profileMessage: profileMessage,
        profileImageLink: updatedProfileImageLink,
      })
      .then((response) => {
        console.log('/api/users', response);
      });
    router.push('/main/list');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/');
  };

  return (
    <>
      <Header />
      <Navigation />
      <Container>
        <Content>
          <Ttile> Edit Profile</Ttile>
          <SubTtile> Update your account details </SubTtile>
          <ItemFrame>
            <ItemTitle> Change Avatar </ItemTitle>
            <ItemImput type='file' id='file-input' onChange={handleFileInputChange} />
          </ItemFrame>
          <ItemFrame>
            <ItemTitle> Nickname </ItemTitle>
            <ItemImput
              type='text'
              placeholder={nickname}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </ItemFrame>
          <ItemFrame>
            <ItemTitle> Username </ItemTitle>
            <ItemImput
              type='text'
              placeholder='name'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </ItemFrame>
          <ItemFrame>
            <ItemTitle> Profile Message </ItemTitle>
            <ItemImput
              type='text'
              placeholder='status message'
              value={profileMessage}
              onChange={(e) => setProfileMessage(e.target.value)}
              required
            />
          </ItemFrame>
          <CompleteFrame>
            <Complete onClick={handleComplete}> Save Changes </Complete>
          </CompleteFrame>
        </Content>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Container>
    </>
  );
};

export default SettingPage;

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3%;
  margin-top: 3%;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0.25, 0, 0.25);
  box-sizing: border-box;

  @media (max-width: 735px) {
    width: 80%;
    margin-top: 8%;
  }
`;

const Ttile = styled.div`
  font-size: 3vw;
  font-family: 'GmarketSansBold';

  @media (max-width: 735px) {
    font-size: 6vw;
  }
`;

const SubTtile = styled.div`
  font-size: 1vw;
  font-family: 'GmarketSansMedium';
  color: gray;
  margin-bottom: 10vh;

  @media (max-width: 735px) {
    font-size: 3vw;
    margin-bottom: 5vh;
  }
`;

const ItemFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5vw;
  margin-bottom: 3vh;

  @media (max-width: 735px) {
    margin-bottom: 1vh;
  }
`;

const ItemTitle = styled.div`
  font-size: 1vw;
  font-family: 'GmarketSansMedium';

  @media (max-width: 735px) {
    font-size: 3vw;
  }
`;

const ItemImput = styled.input.attrs({ required: true })`
  width: 100%;
  padding: 10px 0 10px 10px;
  margin-bottom: 20px;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  box-sizing: border-box;

  font-size: 1vw;
  font-family: 'GmarketSansMedium';

  @media (max-width: 735px) {
    font-size: 3vw;
  }
`;

const CompleteFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 10px;
  box-sizing: border-box;
`;

const Complete = styled.div`
  background-color: #3c82f6;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-family: 'GmarketSansBold';
  font-size: 0.8vw;
  cursor: pointer;

  &:hover {
    background-color: #0066cc;
    transition: background-color 0.3s ease;
  }

  @media (max-width: 735px) {
    font-size: 2vw;
  }
`;

const LogoutButton = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  font-size: 1vw;
  border-radius: 5px;
  background-color: #d9d9d9;
  color: white;
  margin-top: 5vh;
  margin-bottom: 20vh;
  cursor: pointer;

  @media (max-width: 735px) {
    width: 30%;
    font-size: 2vw;
  }

  &:hover {
    background-color: #a4a4a4;
    transition: background-color 0.3s ease;
  }
`;
