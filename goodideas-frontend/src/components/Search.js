import React from "react";

class Search extends React.Component {
  handleSearch(event) {
    this.props.searchIdeas(event.target.value);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10">
          <div className="input-field">
            <input
              type="text"
              className="form-control"
              onKeyUp={this.handleSearch.bind(this)}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.handleSearch.bind(this)}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
