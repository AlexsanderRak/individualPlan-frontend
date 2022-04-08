import React, { useState } from "react";
import { useParams, Link } from 'react-router-dom'

import "./KnowledgeBasePage.sass";
import config from "../../config";
import CryptoJS from "crypto-js";

import myFetch from "../../utils/myFetch";
import EditIcon from '@material-ui/icons/Edit';
import MyIcons from "../../utils/MyIcons";

function KnowledgeBasePage(props) {
  const [isSending, setIsSending] = useState(false);
  const [pageContent, setPageContent] = useState({});

  const { id } = useParams();
  const username = JSON.parse(localStorage.getItem("user"));

  if (!isSending) {
    setIsSending(true);
      const articleId = CryptoJS.AES.decrypt(id.replace(/Por21Ld/g, '/'), 'rak').toString(CryptoJS.enc.Utf8);
      myFetch(`${config.decisionGetOne}?id=${articleId}`, "GET").then((res) => {
        // console.log(res);
        setPageContent(res[0]);
      });
  }

  const isShowEdit = () => {
    return pageContent.creatorId === username._id || username.role < 13;
  }

  const getUrl = () => {
    return `/knowledgeBase/edit${pageContent?.articleUrl.split('/knowledgeBase/page')[1]}`
  }

  return (
    <div className="knowledgeBasePage">
      <div className="knowledgeBasePage-content">
        <div className="knowledgeBasePage-content-form">
          <div className="knowledgeBasePage-content-form-header">
            <span className="knowledgeBasePage-content-form-header-title">{pageContent?.name}</span>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <span className="knowledgeBasePage-content-form-header-title" style={{marginRight: '20px'}}>{pageContent?.creatingDate && new Date(pageContent?.creatingDate).toLocaleString()}</span>
              {
                isShowEdit() ?
                <Link to={pageContent?.articleUrl && getUrl()}>
                  <MyIcons><EditIcon/></MyIcons>
                </Link>
                : ''
              }
            </div>
          </div>
          <p className="knowledgeBasePage-content-form-description">
            {pageContent?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeBasePage;
