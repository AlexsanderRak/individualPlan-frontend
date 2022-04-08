import React, { useState } from "react";
import { Route } from "react-router-dom";

import "./KnowledgeBaseMain.sass";

import KnowledgeBaseCreate from "./KnowledgeBaseCreate";
import KnowledgeBasePage from "./KnowledgeBasePage";
import KnowledgeBaseSearch from "./KnowledgeBaseSearch";

function KnowledgeBaseMain(props) {
  return (
    <>
      <Route
        path="/knowledgeBase/create"
        component={KnowledgeBaseCreate}
      />
      <Route
        path="/knowledgeBase/search"
        component={KnowledgeBaseSearch}
      />
      <Route path="/knowledgeBase/edit:id" component={KnowledgeBaseCreate} />
      <Route path="/knowledgeBase/page:id" component={KnowledgeBasePage} />
    </>
  );
}

export default KnowledgeBaseMain;
