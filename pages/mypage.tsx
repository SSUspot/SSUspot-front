import Head from 'next/head';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../component/layout/navigation';
import axiosInstance from '../utils/axiosInstance';
import Header from '../component/layout/header';
import MyPageHeader from '../component/mypage/header';
import MyPagePosts from '../component/mypage/posts';
import PostDetail from '../component/post/post';
import { useRouter } from 'next/router';

import User from '../type/user';
import Post from '../type/post';

const MyPage: React.FC = () => {
    const [userInfo, setUserInfo] = useState<User>();
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [openPost, setOpenPost] = useState<boolean>(false);
    const [hoveredPost, setHoveredPost] = useState<number | null>(null);
    const router = useRouter();

    const handlerPost = (postId: number) => {
        console.log('open Modal', postId);
        setHoveredPost(postId);
        setOpenPost(true);
    };

    const handleCloseModal = () => {
        setOpenPost(false);
    };

    useEffect(() => {
        axiosInstance
            .get('/api/users')
            .then((response) => {
                console.log('/api/users', response.data);
                setUserInfo(response.data);
            })
            .catch((error) => {
                console.log('/api/users error', error);
            });
        axiosInstance
            .get('/api/posts/users/me', {
                params: {
                    page: 1,
                    size: 10,
                },
            })
            .then((response) => {
                console.log('/api/posts/users/me', response.data);
                setUserPosts(response.data);
            })
            .catch((error) => {
                console.log('/api/posts/users/me', error);
            });
    }, []);

    const handleNavigateToSettings = () => {
        router.push('/setting');
    };

    return (
        <>
            <Head>
                <title>SSUspot</title>
                <link rel='icon' href='/favicon.png' />
            </Head>

            <Header />
            <Navigation />
            <Container>
                <MyPageHeader userInfo={userInfo!} postLength={userPosts.length} />
                <DivisionBar />
                <ButtonContainer>
                    <SettingsButton onClick={handleNavigateToSettings}>Go to Settings</SettingsButton>
                </ButtonContainer>
                <MyPagePosts userPosts={userPosts} handlerPost={handlerPost} />
            </Container>
            {openPost && <PostDetail postId={hoveredPost!} handleCloseModal={handleCloseModal} />}
        </>
    );
};

export default MyPage;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DivisionBar = styled.div`
    width: 85%;
    border: 0.5px solid rgba(79, 76, 76, 0.4);
    margin-bottom: 5vh;

    @media (max-width: 735px) {
        margin-bottom: 3vh;
    }
`;

const ButtonContainer = styled.div`
  width: 85%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const SettingsButton = styled.button`
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
