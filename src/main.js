import { Template } from 'meteor/templating';
import { Cubes } from './model/cubes'
import { Players, PLAYER_ID } from './model/players'
import { clearGame, createCube} from './boardUtils'

if (Meteor.isClient) {
  Template.world.helpers({
    cubes() {
      return Cubes.find();
    },
    playerScore() {
      const player = Players.findOne({_id: PLAYER_ID});
      return player ? player.score : 0;
    }
  });

  //gameLoop
  setInterval(() => {
    var cube = createCube();

    const id = Cubes.insert({
        ...cube,
        createdAt: new Date()
    });

    setTimeout(() => {
      Cubes.remove({_id: id});
    }, cube.score <= 1 ? 6000 : 2000);
  }, 500);

  Template.world.events({
    'mouseup .cube'(event) {
      Players.upsert({_id: PLAYER_ID},{ $inc: { score:  Number(event.currentTarget.dataset.score)} });
      Cubes.remove({_id: event.currentTarget.id});
    },
    'click #clear-cubes'() {
      clearGame();
    }
  });
}