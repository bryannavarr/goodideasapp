import React from "react";
import * as ideaService from "../services/ideas.service";
import "./IdeaForm.css";
import FileUpload from "./fileupload";

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
      body: idea.body || "",
      image: idea.image || ""
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
      },
      image: {
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
      body: this.state.formData.body.value,
      image: this.state.formData.image.value
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
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <div className="panel panel-default">
                <div className="panel-heading ">
                  <h4>
                    <strong>Idea</strong>
                  </h4>
                </div>
                <div className="panel-body">
                  <form className="form-horizontal" role="form">
                    <div className="form-group">
                      <label htmlFor="title" className="control-label col-sm-3">
                        Title:
                      </label>
                      <div className="col-sm-9">
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
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="title" className="control-label col-sm-3">
                        Body:
                      </label>
                      <div className="col-sm-9">
                        <textarea
                          className="form-control"
                          name="body"
                          placeholder="Body"
                          value={this.state.formData.body.value}
                          onChange={event => this.onChange(event)}
                          type="text"
                        />
                      </div>
                    </div>
                    <div>
                      <FileUpload
                        name="image"
                        value={this.state.formData.image.value}
                        onUpload={this.onChange}
                      />
                    </div>

                    <div className="form-group last">
                      <div className="col-sm-offset-3 col-sm-9">
                        <button
                          type="button"
                          className="CreateIdea-submit btn btn-primary btn-sm"
                          onClick={event => this.onSave(event)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="CreateIdea-submit btn btn-secondary btn-sm"
                          onClick={event =>
                            this.props.onDelete(this.state.formData)
                          }
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="CreateIdea-submit btn btn-danger btn-sm"
                          onClick={this.props.onCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IdeaForm;
