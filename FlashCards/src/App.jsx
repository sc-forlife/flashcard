//This file has been logic checked and commented

import { createContext } from "react";
import Home from "./Home/Home.jsx";
import Cards from "./ManageCards/cards.jsx";
import CardManagement from "./ManageCards/CardManagement.jsx";
import AddCard from "./ManageCards/AddCard.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditCard from "./ManageCards/EditCard.jsx";
import HomeTopicManage from "./ManageTopic/HomeTopicManage.jsx";
import AddTopic from "./ManageTopic/AddTopic.jsx";
import EditTopic from "./ManageTopic/EditTopic.jsx";
import ReviceCards from "./ReviceCards/ReviceCards.jsx";
import ReviceQuestion from "./ReviceCards/ReviceQuestion.jsx";
import Stats from "./Stats/Stats.jsx";
import StatsCard from "./Stats/StatsCard.jsx";

export const userCards = createContext();

function App() {
  // all components will be using this port
  const PORT = "http://localhost:5000";

  return (
    <>
      <userCards.Provider value={PORT}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cards" element={<Cards />} />
            <Route path="/Cards/:id" element={<CardManagement />} />
            <Route path="/AddCard/:id" element={<AddCard />} />
            <Route path="/Edit/:id/:topicId" element={<EditCard />} />
            <Route path="/ManageTopic" element={<HomeTopicManage />} />
            <Route path="/AddTopic" element={<AddTopic />} />
            <Route path="/EditTopic/:id" element={<EditTopic />} />
            <Route path="/ReviceCards" element={<ReviceCards />} />
            <Route
              path="/ReviceQuestion/:topicId/:index"
              element={<ReviceQuestion />}
            />
            <Route path="/Stats" element={<Stats />} />
            <Route path="/StatsCard/:id" element={<StatsCard />} />
          </Routes>
        </BrowserRouter>
      </userCards.Provider>
    </>
  );
}

export default App;
