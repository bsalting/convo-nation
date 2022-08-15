const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () =>
  layout(html`<h3>New User</h3>
    <hr />
    <form method="POST" action="/users/add">
      <div class="form-group">
        <label for="name" class="col-sm-2 control-label">User Name</label>
        <div class="col-sm-10">
          <input
            name="name"
            type="text"
            class="form-control"
            placeholder="Username must not be taken..."
          />
        </div>
      </div>
      <div class="form-group">
        <label for="emailAddress" class="col-sm-2 control-label"
          >Email Address</label
        >
        <div class="col-sm-10">
          <input
            name="emailAddress"
            type="text"
            class="form-control"
            placeholder="Invalid email will be rejected..."
          />
        </div>
      </div>
      <div class="form-group col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </form> `);
