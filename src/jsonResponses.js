const users = {};

const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);

  const headers = {
    'Content-Type': 'applicaton/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  };

  response.writeHead(status, headers);

  if (request.method !== 'HEAD' && status !== 204) {
    response.write(content);
  }

  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const addUser = (request, response) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  const { name, age } = request.body;

  if (!name || !age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204;

  if (!user[name]) {
    responseCode = 201;
    users[name] = {
      name,
    };
  }

  users[name].age = age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Succefully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSON(request, response, responseCode, {});
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers,
  addUser,
  notFound,
};
