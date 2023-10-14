import React, { useState } from "react";
import styled from "styled-components";
const HashTag: React.FC = () => {
  const [inputHashTag, setInputHashTag] = useState("");
  const [hashTags, setHashTags] = useState([]);

  const addHashTag = (e: any) => {
    const allowedCommand = ["Comma", "Enter", "space", "NumpadEnter"];
    if (!allowedCommand.includes(e.code)) return;

    if (!e.target.value.trim().length) {
      return setInputHashTag("");
    }

    let newHashTag = e.target.value.trim();
    const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    if (regExp.test(newHashTag)) {
      newHashTag = newHashTag.replace(regExp, "");
    }
    if (newHashTag.includes(",")) {
      newHashTag = newHashTag.split(",").join("");
    }

    if (!newHashTag.length) return;

    if (hashTags.length >= 10) return;

    setHashTags((prevHashTags: any) => {
      if (!prevHashTags.includes(newHashTag)) {
        return [...prevHashTags, newHashTag];
      }
      return prevHashTags;
    });

    setInputHashTag("");
  };

  // const keyDownHandler = (e: any) => {
  //   if (e.code !== "Enter" && e.code !== "NumpadEnter") return;
  //   e.preventDefault();

  //   const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
  //   if (!regExp.test(e.target.value)) {
  //     setInputHashTag("");
  //   }
  // };

  const changeHashTagInput = (e: any) => {
    setInputHashTag(e.target.value);
  };

  return (
    <>
      <div className="hashTags">
        {hashTags.length > 0 &&
          hashTags.map((hashTag) => {
            return (
              <HashTagItem key={hashTag} className="tag">
                {`#${hashTag}`}
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
  padding: 5px 7px;
  margin: 5px 0px 0px 5px;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const Input = styled.input`
  display: block;
  width: 550px;
  border: none;
  outline: none;
  padding: 10px;
  margin-top: 5px;
  font-size: 18px;
  color: #676767;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  &:focus {
    border: solid 1px #999;
    border-radius: 3px;
  }
`;
