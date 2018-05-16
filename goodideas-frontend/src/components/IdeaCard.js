import React from "react";

class IdeaCard extends React.Component {
  render(props) {
    return (
      <React.Fragment>
        <div className="card-deck">
          <div className="card bg-light text-dark mb-4">
            <div className="card-body">
              <h4 className="card-title" name="title">
                {this.props.title}
                <hr className="hr-light" />
              </h4>
              <p name="body" className="card-text">
                {this.props.body}
              </p>
            </div>
            <div className="card-footer">
              <a
                className="btn btn-outline-info"
                onClick={event => this.props.onSelect(event, this.props.id)}
              >
                Edit
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default IdeaCard;
