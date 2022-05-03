import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;

const PostMeta = ({ className = "", data = "Mar 23", authorName = "Andiez Le", to = "" }) => {
  return (
    <PostMetaStyles className={className}>
      <span className="post-time">{data}</span>
      <span className="post-dot">
        <NavLink to={to} />
      </span>
      <span className="post-author">{authorName}</span>
    </PostMetaStyles>
  );
};

export default PostMeta;
