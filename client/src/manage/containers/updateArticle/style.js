import styled from 'styled-components';

export const ArticleAddWrapper = styled.div`
    width: 100%;
    position: relative;
    min-width: 1020px;
    display: block;
    overflow: hidden;
    background-color: #f6f6f6;
`;

export const AddInfo = styled.div`
    width: 700px;
    min-width: 700px;
    padding: 10px 20px;
    margin: 5px auto;
    border-radius: 5px;
    background: #fff;
`;

export const TitleImgUpload = styled.div`
      width: 100%;
      position: relative;
      .ant-upload{
        width: 100%;
        height: 100%;
        background-color: #f1f1f1;
        border-radius: 5px;
        cursor: pointer;
      }
      .upload-button{
          margin: 0 auto;
          text-align: center;
          min-height: 192px;
          position: relative;
          i{
            position: absolute;
            font-size: 40px;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            color: #bdc3c7;
          }
      }
      .ant-upload.ant-upload-select-picture-card {
          width: 100%;
          height: 100%;
      }
`;

export const DeleteIcon = styled.div`
    float: right;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    font-size: 20px;
    transition: .5s;
    color: #f9f9f9;
    cursor: pointer;
    &:hover{
      color: #f1f1f1;
    }
`;

