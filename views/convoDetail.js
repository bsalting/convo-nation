const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (responses, convo) =>
  layout(html`<h3>Join Convo</h3>
    <hr />
    <h4><b>${convo.title}</b></h4>
    <p>by ${convo.user.name} | ${convo.createdAt}</p>
    <p id="convo-desc">${convo.description}</p>
    <hr />
    ${responses.map(
      (response) => html`
        <div class="card">
          <div class="card-header"><b>${response.user.name}</b> said:</div>
          <p>${response.createdAt}</p>
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
          <input
            name="name"
            value="testAccount"
            type="text"
            class="form-control"
            readonly
          />
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
    </form> `);
