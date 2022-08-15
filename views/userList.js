const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (users) =>
  layout(html`<h3>All Users</h3>
    <hr />
    <p>
      Scope: Simulating logged in user via form drop-downs for inserts...
      Simulating admin access for deletes...
    </p>
    <hr />
    <ul class="list-unstyled">
      <ul>
        ${users.map(
          (user) =>
            html`<li>
              <p><b>${user.name}</b> (${user.emailAddress})</p>
            </li>`
        )}
      </ul>
    </ul>
    <hr /> `);
