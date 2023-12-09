import React, { useState } from 'react';
import styled from 'styled-components';

interface HashTagProps {
  hashTags: string[];
  setHashTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const HashTag: React.FC<HashTagProps> = ({ hashTags, setHashTags }) => {
  const [inputHashTag, setInputHashTag] = useState('');

  const addHashTag = (e: any) => {
    const allowedCommand = ['Comma', 'Enter', 'space', 'NumpadEnter'];
    if (!allowedCommand.includes(e.code)) return;

    if (!e.target.value.trim().length) {
      return setInputHashTag('');
    }

    let newHashTag = e.target.value.trim();
    const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    if (regExp.test(newHashTag)) {
      newHashTag = newHashTag.replace(regExp, '');
    }
    if (newHashTag.includes(',')) {
      newHashTag = newHashTag.split(',').join('');
    }

    if (!newHashTag.length) return;

    if (hashTags.length >= 10) return;

    setHashTags((prevHashTags: any) => {
      if (!prevHashTags.includes(newHashTag)) {
        return [...prevHashTags, newHashTag];
      }
      return prevHashTags;
    });

    setInputHashTag('');
  };

  const changeHashTagInput = (e: any) => {
    setInputHashTag(e.target.value);
  };

  const deleteHashTag = (hashTagToDelete: string) => {
    setHashTags(hashTags.filter((hashTag) => hashTag !== hashTagToDelete));
  };

  return (
    <>
      <div className="hashTags">
        {hashTags.length > 0 &&
          hashTags.map((hashTag: string) => {
            return (
              <HashTagItem key={hashTag} className="tag">
                {`#${hashTag}`}
                <DeleteButton onClick={() => deleteHashTag(hashTag)}>
                  ✕
                </DeleteButton>
              </HashTagItem>
            );
          })}

        <Input
          value={inputHashTag}
          onChange={changeHashTagInput}
          onKeyUp={addHashTag}
          //onKeyDown={keyDownHandler}
          placeholder="#해시태그를 등록해보세요. (최대 10개)"
          className="hashTagInput"
        />
      </div>
    </>
  );
};

export default HashTag;

const HashTagItem = styled.div`
  display: inline-block;
  padding: 0.7vh;
  margin: 1vh 0 0 1vh;
  background-color: rgba(48, 55, 205, 0.7);
  color: #fff;
  border-radius: 4px;
  font-size: 2vh;
  cursor: pointer;
`;

const DeleteButton = styled.span`
  margin-left: 1vh;
  cursor: pointer;
  color: red;
`;

const Input = styled.input`
  display: block;
  width: 40vw;
  border: none;
  outline: none;
  padding: 1.5vh;
  margin-top: 1vh;
  font-size: 2vh;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  &:focus {
    border: solid 1px #999;
    border-radius: 3px;
  }

  @media (max-width: 735px) {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
`;
