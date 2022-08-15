const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (responses, convo, users) =>
  layout(html`<h3>Join Convo</h3>
    <hr />
    <h4 class="title-blue">${convo.title}</h4>
    <p>by ${convo.user.name} | ${convo.createdAt}</p>
    <p id="convo-desc">${convo.description}</p>
    <hr />
    <div id="detail-div">
      ${responses.map(
        (response) => html`
          <div class="card">
            <div class="card-header"><b>${response.user.name}</b> said:</div>
            <span>${response.createdAt}</span>
            <form
              style="display:inline"
              method="POST"
              action="/convos/details/${response.id}?_method=DELETE"
            >
              <button class="btn btn-secondary btn-sm">
                <i class="glyphicon glyphicon-remove"></i>
              </button>
            </form>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>${response.text}</p>
              </blockquote>
            </div>
          </div>
          <hr />
        `
      )}
      <form method="POST" action="/convos/add/${convo.id}">
        <div class="form-group">
          <label for="name" class="col-sm-2 control-label">User Name</label>
          <div class="col-sm-10">
            <select name="id" type="text" class="form-control">
              <option value="" disabled selected>Select User</option>
              ${users.map(
                (user) => html`<option value=${user.id}>${user.name}</option>`
              )}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="text" class="col-sm-2 control-label">Message</label>
          <div class="col-sm-10">
            <input name="text" type="text" class="form-control" required />
          </div>
        </div>
        <div class="form-group col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-primary">Post</button>
        </div>
      </form>
    </div>`);
