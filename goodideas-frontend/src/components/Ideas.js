import React, { Component } from "react";
import IdeaForm from "./IdeaForm";
import IdeaList from "./IdeaList";
import * as ideaService from "../services/ideas.service";

class Ideas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      isFlipped: false
    };

    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    ideaService.readAll().then(data => {
      this.setState({ ideas: data.items });
    });
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.ideas.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.ideas.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.ideas.concat(updatedFormData);
      }
      return {
        ideas: updatedItems,
        formData: null,
        errorMessage: null
      };
    });
  }

  onCancel() {
    this.setState({ formData: null });
  }

  onSelect(item, event) {
    event.preventDefault();
    this.setState({
      formData: item
    });
  }

  onDelete() {
    const formData = this.state.formData;
    ideaService.del(formData._id).then(() => {
      this.setState(prevState => {
        const updatedItems = prevState.ideas.filter(item => {
          return item._id !== formData._id;
        });
        return { ideas: updatedItems };
      });
      this.onCancel();
    });
  }

  render() {
    const ideas = this.state.ideas;

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <IdeaForm
              key="front"
              formData={this.state.formData}
              onSave={this.onSave}
              onDelete={this.onDelete}
              onCancel={this.onCancel}
            />
          </div>
        </div>
        <IdeaList ideas={ideas} select={this.onSelect} />
      </React.Fragment>
    );
  }
}

export default Ideas;
