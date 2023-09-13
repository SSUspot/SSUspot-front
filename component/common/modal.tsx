import { ModalBox, ModalContent } from "../../pages/mypage";
import styled from "styled-components";

const Modal = (props: any) => {
  // 전달받은 state 함수
  const { clickModal } = props;

  // 제목 설정
  const isFollowerModal = props.modalType === "팔로워";
  return (
    // 뒷배경을 클릭하면 모달을 나갈 수 있게 뒷 배경 onClick에 state 함수 추가
    <ModalBox onClick={clickModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>{isFollowerModal ? "팔로워" : "팔로잉"}</ModalHeader>
        {/* 팔로워 또는 팔로잉 리스트 추가 */}
      </ModalContent>
    </ModalBox>
  );
};

export default Modal;

const ModalHeader = styled.h1`
  text-align: center;
  font-size: 20px;
  margin: 10px;
  color: white;
`;
