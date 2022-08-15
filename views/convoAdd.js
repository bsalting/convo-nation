const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (users) =>
  layout(html`<h3>New Convo</h3>
    <hr />
    <form method="POST" action="/convos/add">
      <div class="form-group">
        <label for="id" class="col-sm-2 control-label">User</label>
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
        <label for="title" class="col-sm-2 control-label">Title</label>
        <div class="col-sm-10">
          <input name="title" type="text" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label for="text" class="col-sm-2 control-label">Description</label>
        <div class="col-sm-10">
          <input name="description" type="text" class="form-control" required />
        </div>
      </div>
      <div class="form-group col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </form> `);
