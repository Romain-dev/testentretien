import { Cubes } from './model/cubes'
import { Players, PLAYER_ID } from './model/players'


export function clearGame(){
    //Call to server
    Meteor.call('cubes.clear');
    Players.remove({_id: PLAYER_ID});
}

//Calculate collisions
function isColliding(newCube, existingCubes) {
  return existingCubes.some(cube => {
    const dx = Math.abs(newCube.x - cube.x);
    const dy = Math.abs(newCube.y - cube.y);
    const dz = Math.abs(newCube.z - cube.z);

    //Margin of one cube
    return (dx < 2 && dy < 2 && dz < 2);
  });
}

export function createCube() {
  const cubes = Cubes.find().fetch();

  let isCubeOk = false;
  //Prevent infinite loop
  let nbTry = 0;
  let candidatCube;
  
  while(!isCubeOk && nbTry < 500) {
    candidatCube = {
      x: (Math.random() * 48) - 24,
      y: (Math.random() * 48) - 24,
      z: (Math.random() -0.5) + 1,
    }

    if(!isColliding(candidatCube, cubes)) {
      isCubeOk = true;
    }

    nbTry++;
  }

  //The board is probably full
  if(nbTry >= 500) {
    alert("You loose");
    clearGame();
  }

  calculateCubeRarity(candidatCube);
  return candidatCube;
}

function calculateCubeRarity(cube) {
  let rarityRandom = Math.random() * 100;

  switch (true) {
    case rarityRandom < 80: {
      cube.score = 1;
      cube.color = '#290DFF';
      break;
    }
    case rarityRandom < 96: {
      cube.score = -3;
      cube.color = '#e71009';
      break;
    }
    default: {
      cube.score = 5;
      cube.color = '#f8e005c2';
    }
  }
}
