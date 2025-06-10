import Head from 'next/head';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../component/layout/navigation';
import axiosInstance from '../utils/axiosInstance';
import Header from '../component/layout/header';
import MyPageHeader from '../component/mypage/header';
import MyPagePosts from '../component/mypage/posts';
import PostDetail from '../component/post/post';
import Pagination from '../component/common/Pagination';
import { useRouter } from 'next/router';
import { usePagination } from '../hooks/usePagination';
import { useToast } from '../component/common/ToastProvider';
import { handleApiError } from '../utils/errorHandler';

import User from '../type/user';
import Post from '../type/post';

const MyPage: React.FC = () => {
    const [userInfo, setUserInfo] = useState<User>();
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openPost, setOpenPost] = useState<boolean>(false);
    const [hoveredPost, setHoveredPost] = useState<number | null>(null);
    const router = useRouter();
    const { showError } = useToast();

    // 페이지네이션
    const {
        currentPage,
        totalPages,
        setCurrentPage,
        itemsPerPage
    } = usePagination({
        totalItems: totalPosts,
        itemsPerPage: 9,
        initialPage: 1
    });

    const handlerPost = (postId: number) => {
        console.log('open Modal', postId);
        setHoveredPost(postId);
        setOpenPost(true);
    };

    const handleCloseModal = () => {
        setOpenPost(false);
    };

    // 사용자 정보 가져오기
    useEffect(() => {
        axiosInstance
            .get('/api/users')
            .then((response) => {
                console.log('/api/users', response.data);
                setUserInfo(response.data);
            })
            .catch((error) => {
                console.log('/api/users error', error);
                showError(handleApiError(error));
            });
    }, []);

    // 사용자 게시물 가져오기
    useEffect(() => {
        setLoading(true);
        axiosInstance
            .get('/api/posts/users/me', {
                params: {
                    page: currentPage,
                    size: itemsPerPage,
                },
            })
            .then((response) => {
                console.log('/api/posts/users/me', response.data);
                // 응답이 페이지네이션 정보를 포함하는 경우
                if (response.data.content) {
                    setUserPosts(response.data.content);
                    setTotalPosts(response.data.totalElements);
                } else {
                    // 응답이 배열인 경우
                    setUserPosts(response.data);
                    setTotalPosts(response.data.length);
                }
            })
            .catch((error) => {
                console.log('/api/posts/users/me', error);
                showError(handleApiError(error));
            })
            .finally(() => {
                setLoading(false);
            });
    }, [currentPage, itemsPerPage]);

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
                <MyPageHeader userInfo={userInfo!} postLength={totalPosts} />
                <DivisionBar />
                <ButtonContainer>
                    <SettingsButton onClick={handleNavigateToSettings}>Go to Settings</SettingsButton>
                </ButtonContainer>
                {loading ? (
                    <LoadingMessage>게시물을 불러오는 중...</LoadingMessage>
                ) : (
                    <>
                        <MyPagePosts userPosts={userPosts} handlerPost={handlerPost} />
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </>
                )}
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

const LoadingMessage = styled.div`
  width: 100%;
  padding: 40px;
  text-align: center;
  font-family: 'GmarketSansMedium';
  font-size: 18px;
  color: #666;
`;
