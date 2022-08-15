const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (convos) =>
  layout(html`<h3>All Convos</h3>
    <hr />
    <ul class="list-unstyled">
      <ul>
        ${convos.map(
          (convo) =>
            html`<li>
                <a class="detail-list" href="/convos/${convo.id}"
                  >${convo.title}</a
                >
                by ${convo.starter.name}
                <form
                  style="display:inline"
                  method="POST"
                  action="/convos/${convo.id}?_method=DELETE"
                >
                  <button class="btn btn-secondary btn-sm">
                    <i class="glyphicon glyphicon-remove"></i>
                  </button>
                </form>
                <p>Started on: ${convo.createdAt}</p>
                <p id="convo-desc">${convo.description}</p>
              </li>
              <hr />`
        )}
      </ul>
    </ul>`);
