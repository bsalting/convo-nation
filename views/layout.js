const html = require("html-template-tag");

module.exports = (content) => html`<html>
  <head>
    <title>Convo-Nation</title>
    <link
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link href="/style.css" rel="stylesheet" />
  </head>
  <body>
    <div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle"
            data-toggle="collapse"
            data-target="#nav-items"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Convo-Nation</a>
        </div>
        <div id="nav-items" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a href="/convos">Convos</a></li>
            <li><a href="/convos/add">Start Convo</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="/users""><span class="glyphicon glyphicon-user"></span> Sign In</a>
            </li>
            <li>
              <a href="/users/add"> Create User </a>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
    <div class="container content">$${content}</div>
  </body>
</html>`;
