const express = require("express");
const {uuid} = require("uuidv4");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);
  
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;

  const repositorie = {id : uuid() ,title, url, techs, likes: 0};

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const  {id} = request.params;
  const {title, url, techs, likes } = request.body;

  const  repositoreIndex = repositories.findIndex(repositore => repositore.id === id);

  if(repositoreIndex < 0){
    return response.status(400).json({error: "Project not found"})
  }

  const likeCurrent = repositories[repositoreIndex].likes;

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: likeCurrent
  }

  repositories[repositoreIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const  {id} = request.params;

    const  repositoreIndex = repositories.findIndex(project => project.id === id);

    if(repositoreIndex < 0){
        return response.status(400).json({error: "Project not found"});
    }

    repositories.splice(repositoreIndex, 1);

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const  {id} = request.params;
  const {title, url, techs, likes } = request.body;

  const  repositoreIndex = repositories.findIndex(repositore => repositore.id === id);

  if(repositoreIndex < 0){
    return response.status(400).json({error: "Project not found"})
  }

  const likeAdd = repositories[repositoreIndex].likes;

  const repositorie = {
    id,
    title: repositories[repositoreIndex].title,
    url: repositories[repositoreIndex].url,
    techs: repositories[repositoreIndex].techs,
    likes: likeAdd + 1
  };

  repositories[repositoreIndex].likes = repositorie.likes

  return response.json(repositorie);
});

module.exports = app;
