import React from "react";
import IdeaCard from "./IdeaCard";

export default function IdeaList(props) {
  const ideas = props.ideas;
  const mappedIdeas = ideas.map(idea => (
    
      <div className="col-md-4">
        <IdeaCard
          title={idea.title}
          body={idea.body}
          key={idea._id}
          onSelect={props.select.bind(this, idea)}
          id={idea._id}
        />
      </div>
  ));

  return mappedIdeas;
}
