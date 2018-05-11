import React from "react";
import * as ideaService from "../services/ideas.service";

class IdeaForm extends React.Component {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      ideas: [],
      formData: formData
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({ formData: formData });
  }

  convertPropsToFormData(props) {
    const idea = props.formData && props.formData._id ? props.formData : {};

    const initializedIdea = {
      _id: idea._id || "",
      title: idea.title || "",
      body: idea.body || ""
    };

    let formData = {
      _id: {
        originalValue: initializedIdea._id,
        value: initializedIdea._id
      },
      title: {
        originalValue: initializedIdea.title,
        value: initializedIdea.title
      },
      body: {
        originalValue: initializedIdea.body,
        value: initializedIdea.body
      }
    };

    return formData;
  }

  onChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState(prevState => {
      const field = { ...prevState.formData[name] };
      field.value = value;
      const formData = { ...prevState.formData, [name]: field };

      return { formData: formData };
    });
  }



  onSave(event) {
    const that = this;
    let item = {
      title: this.state.formData.title.value,
      body: this.state.formData.body.value
    };

    if (this.state.formData._id.value.length > 0) {
      item._id = this.state.formData._id.value;
      ideaService.update(item).then(data => {
        that.props.onSave(item);
      });
    } else {
      ideaService.create(item).then(data => {
        this.setState(prevState => {
          const field = { ...prevState.formData._id, _id: data };
          const formData = { ...prevState.formData, _id: field };
          return { ...prevState, formData };
        });
        that.props.onSave({ ...item, _id: data.item });
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h3> New Idea</h3>

        <div className="col-md-5">
          <label htmlFor="title">Title:</label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={this.state.formData.title.value}
            placeholder="Title"
            onChange={event => {
              this.onChange(event);
            }}
          />
          <label htmlFor="title">Body:</label>
          <textarea
            className="form-control materialize-textarea"
            name="body"
            placeholder="Body"
            value={this.state.formData.body.value}
            onChange={event => this.onChange(event)}
            type="text"
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            className="CreateIdea-submit btn btn-primary"
            onClick={event => this.onSave(event)}
          >
            Save
          </button>
          <button
            type="button"
            className="CreateIdea-submit btn btn-secondary"
            onClick={event => this.props.onDelete(this.state.formData)}
          >
            Delete
          </button>
          <button
            type="button"
            className="CreateIdea-submit btn btn-danger"
            onClick={this.props.onCancel}
          >
            Cancel
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default IdeaForm;
